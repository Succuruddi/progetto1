'use strict';

/**
 *  locationmenu controller
 */

const {
  createCoreController
} = require('@strapi/strapi').factories;

module.exports = createCoreController('api::locationmenu.locationmenu', ({
  strapi
}) => ({

  async find(ctx) {
    let result = await strapi.entityService.findMany('api::locationmenu.locationmenu', {
      populate: '*',
      orderBy: {
        menuOrder: 'asc'
      }
    });
    return result;
  },


}));
