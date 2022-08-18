'use strict';

/**
 *  restaurantmenu controller
 */

const {
  createCoreController
} = require('@strapi/strapi').factories;

module.exports = createCoreController('api::restaurantmenu.restaurantmenu', {

  async findMenusByRestaurantId(ctx) {
    console.log("heheheh");
    console.log(ctx.params)
    let menus = await strapi.entityService.findMany('api::restaurantmenu.restaurantmenu', {
      filters: {
        restaurant: {
          id: ctx.params.id
        }

      },
      //populate: ['restaurant']
      //fields: ['restaurant'],
      populate: ['restaurantmenusections.foodanddrinks.image', 'restaurantmenusections.foodanddrinks.allergenics', 'restaurantmenusections.restaurantmenusectiontype']


    });
    /*let menus = await strapi.entityService.findMany('api::restaurantmenu.restaurantmenu', {
      filters: {
        retaurant: ctx.params
      },

      populate: ['restaurant']
    });*/
    return menus;
  }

});
