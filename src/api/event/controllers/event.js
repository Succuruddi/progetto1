'use strict';

/**
 *  event controller
 */

const {
  createCoreController
} = require('@strapi/strapi').factories;

module.exports = createCoreController('api::event.event', ({
  strapi
}) => ({

  //TO BE DEPRECATED AS IT IS USED IN V1.0.9 AND BELOW. I WILL CREATE SPECIFIC FIND FUNCTIONS AND LEAVE STRAPI CORE AS IT IS. FOR BETTER GRANULAITY, DATA CONTROL AND PERFORMANCE.
  async find(ctx) {
    console.log(ctx.query);
    ctx.query = {
      ...ctx.query,
      populate: '*',

      fields: ['id', 'title', 'description', 'shortDescription', 'date', 'locale', 'inscriptionURL', 'videoURL', 'endDate', 'slug']
    }
    switch (ctx.query.eventTime) {
      case "newEvents":
        ctx.query = {
          ...ctx.query,
          filters: {
            $and: [

              {
                date: {
                  $gt: new Date()
                },
              },
            ],
          },
        }
        break;
      case "pastEvents":
        ctx.query = {
          ...ctx.query,
          filters: {
            $and: [

              {
                date: {
                  $lt: new Date()
                },
              },
            ],
          },
        }
        break;
      default:
        break;
    }
    /*if (ctx.query.eventTime === "true") {
      ctx.query = {
        ...ctx.query,
        filters: {
          $and: [

            {
              date: {
                $gt: new Date()
              },
            },
          ],
        },
      }
    }*/
    const {
      data,
      meta
    } = await super.find(ctx, {
      fields: ['id', 'title', 'description', 'shortDescription', 'date', 'locale', 'inscriptionURL', 'videoURL', 'promoters', 'image', 'endDate', 'slug'],

    });
    let sanitzedData = data.map(entity => {
      const event = sanitizeEntity(entity);

      let promoters = [];
      for (var i = 0; i < event.promoters.data.length; i++) {
        promoters.push(sanitizeEntity(event.promoters.data[i]));
      }
      event.promoters = promoters;

      let categories = [];
      for (var i = 0; i < event.categories.data.length; i++) {
        categories.push(sanitizeEntity(event.categories.data[i]));
      }
      event.categories = categories;
      return event;
    });
    if (ctx.query.eventTime === "all") {
      let newEvents = [];
      let pastEvents = [];
      let currentDate = new Date();
      for (var i = 0; i < sanitzedData.length; i++) {
        if (Date.parse(sanitzedData[i].date) > currentDate) {
          newEvents.push(sanitzedData[i]);
        } else {
          pastEvents.push(sanitzedData[i]);
        }
      }
      return newEvents.concat(pastEvents);
    } else {
      return sanitzedData;
    }



    //return entity;

  },


  async buildShareEventCardByUID(ctx) {
    //const { id: slug } = ctx.params;
    if (ctx.query.uid != undefined && ctx.query.uid != null && ctx.query.uid > 0) {

      let oldCTX = ctx;
      /*ctx = {
        ...ctx,
        params: {
          id: ctx.query.uid
        },
        query: {
          populate: 'image,seo'
        }
      };*/
      //let event = await super.findOne(ctx);
      const event = await strapi.service('api::event.event').findOne(ctx.query.uid, {
        populate: {
          image: true,
          seo: true
        }
      });
      console.log(event);
      if (event != null) {
        let htmlResult = strapi.service('api::event.event').buildSharedEventCardHTML(event);

        oldCTX.type = 'html';
        oldCTX.body = htmlResult;
      } else {
        return "Hi";
      }
    } else {
      ctx.redirect("/");
      return "Bye";

    }
  },

  async buildShareEventCard(ctx) {

    if (ctx.params != null) {
      console.log(ctx.params);
      let oldCTX = ctx;
      ctx = {
        ...ctx,
        query: {
          filters: {
            slug: {
              $eq: ctx.params.slug
            }

          },
          populate: 'image,seo',
        }
      };
      console.log(ctx.query);
      const event = await strapi.service('api::event.event').find(ctx.query);
      if (event != null && event != undefined && event.results.length > 0) {

        let htmlResult = strapi.service('api::event.event').buildSharedEventCardHTML(event.results[0]);

        oldCTX.type = 'html';
        oldCTX.body = htmlResult;
        // return oldCTX.send();
      } else {
        oldCTX.redirect("/");
        return "Hi";
      }
    } else {
      ctx.redirect("/");
      return "Bye";

    }
  },

  async getEventsFeed(ctx) {
    const pagination = 100;
    let events = await strapi.db.query('api::event.event').findMany({
      select: '*',
      where: {
        $or: [{
            date: {
              $gt: new Date()
            }
          },
          {
            endDate: {
              $gt: new Date()
            }
          }
        ]

      },
      orderBy: {
        date: 'asc'
      },
      populate: ['categories'],
      limit: pagination,
    });
    if (events != null) {

      let sortedEventsByDate = strapi.service('api::event.event').sortEventsRangeByDateAndHour(events);
      if (events.length < pagination) {
        let pastEvents = await strapi.db.query('api::event.event').findMany({
          select: '*',
          where: {

            $and: [{
                date: {
                  $lt: new Date()
                }
              },
              {
                $or: [{
                    endDate: {
                      $lt: new Date()
                    }
                  },
                  {
                    endDate: {
                      $eq: null
                    }
                  }
                ]
              }
            ]
          },
          orderBy: {
            date: 'desc'
          },
          populate: ['categories'],
          limit: pagination - events.length,
        });
        sortedEventsByDate = sortedEventsByDate.concat(pastEvents);
      }
      return sortedEventsByDate;

    }
    return events;
  }

}));

function sanitizeEntity(entity) {
  const sanitazedEntity = entity.attributes;
  sanitazedEntity.id = entity.id;
  return sanitazedEntity;
}
