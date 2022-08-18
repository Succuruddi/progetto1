"use strict";

/**
 *  appstate controller
 */

const {
  createCoreController
} = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::appstate.appstate",
  ({
    strapi
  }) => ({
    async find(ctx) {

      let appState;
      if (ctx.request.header.appversion && ctx.request.header.accesstoken) {
        appState = await strapi.db.query('api::appstate.appstate').findOne({
          select: ['id', 'appVersion'],
          where: {
            'accessToken': ctx.request.header.accesstoken,
            'appVersion': ctx.request.header.appversion
          }
        });
        /*let result = await strapi.entityService.findMany('api::festival.festival', {
          filters: {
            $and: [{
              showOnMenu: true,
            }],
          },
          sort: {
            menuOrder: 'asc'
          }
        });
        appState.menu = result; 
      }*/
      if (appState) {
        return appState;
      } else {
        return ctx.unauthorized(`You can't access`);
      }
    }
  }})
);
