'use strict';

/**
 *  festival controller
 */

const {
  createCoreController
} = require('@strapi/strapi').factories;

module.exports = createCoreController('api::festival.festival', ({
  strapi
}) => ({
    //I think this is deprecated
    async buildFestivalMenu(ctx) {
      let result = await strapi.entityService.findMany('api::festival.festival', {
        filters: {
          $and: [{
            showOnMenu: true,
          }],
        },
      });
      return result;
    },

    async getFestivalEvents(ctx) {
      const {
        id
      } = ctx.params;
      let events = await strapi.db.query('api::event.event').findMany({
        select: '*', //['id', 'name'],
        where: {

          festival: {
            id: id
          },
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
        limit: 100,
      });
      let sortedEventsByDate = strapi.service('api::event.event').sortEventsRangeByDateAndHour(events);

      return sortedEventsByDate;
    }

  }

));
