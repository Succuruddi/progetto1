'use strict';

/**
 *  restaurant controller
 */

const {
  createCoreController
} = require('@strapi/strapi').factories;

module.exports = createCoreController('api::restaurant.restaurant', ({
  strapi
}) => ({
    async find(ctx) {

      let result = await strapi.entityService.findMany('api::restaurant.restaurant', {
        filters: {
          $and: [{
            hide: false,

          }],
        },
        //sort: "entity.name:asc",
        sort: [{
            sortPosition: 'asc'
          },
          {
            entity: {
              name: 'asc'
            }
          }
        ],
        populate: ['dishesShowroom', 'restauranttypes', 'entity', 'entity.places', 'entity.coverImage', 'entity.backgroundImage', 'entity.logo', 'menuImages', ]
      });
      return result.map(restaurant => {
        restaurant.entity.places.map(place => {
          delete place.googleJson
        });
        return restaurant;
      });




      //return result;
    },

    async findBySlug(ctx) {
      if (ctx.params) {

        let result = await strapi.entityService.findMany('api::restaurant.restaurant', {
          filters: {
            $and: [{
              hide: false,
              entity: {
                slug: ctx.params.slug
              }
            }],

          },

          populate: ['dishesShowroom', 'restauranttypes', 'entity', 'entity.places', 'entity.coverImage', 'entity.backgroundImage', 'entity.logo', 'menuImages']
        });
        return result.map(restaurant => {
          restaurant.entity.places.map(place => {
            delete place.googleJson
          });
          return restaurant;
        });
      }
      // return ":)";



      //return result;
    },
    async buildSharedRestaurantCardHTML(ctx) {

      let restaurants = await this.findBySlug(ctx)

      if (restaurants.length > 0) {
        let htmlResult = ''
        console.log(restaurants[0].entity.hasDetailedView);
        if (restaurants[0].entity.hasDetailedView) {
          htmlResult = strapi.service('api::restaurant.restaurant').buildSharedRestaurantCardHTML(restaurants[0]);
        } else {
          htmlResult = strapi.service('api::restaurant.restaurant').buildSharedRestaurantCardHTMLNoDetail(restaurants[0]);
        }

        ctx.type = 'html';
        ctx.body = htmlResult;
        // return oldCTX.send();
        return ctx;
      }
      ctx.redirect("/");
    },
  }

));
