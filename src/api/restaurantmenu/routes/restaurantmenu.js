'use strict';

/**
 * restaurantmenu router.
 */

const {
  createCoreRouter
} = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::restaurantmenu.restaurantmenu', {
  prefix: '',
  except: [],
  config: {
    find: {
      policies: [{
        name: 'global::has-access-token',

      }],
      middlewares: [],
    },
    findOne: {
      policies: [{
        name: 'global::has-access-token',

      }],
    },

    create: {},
    update: {},
    delete: {},
  },
});
