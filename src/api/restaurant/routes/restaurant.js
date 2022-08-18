'use strict';

/**
 * restaurant router.
 */

const {
  createCoreRouter
} = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::restaurant.restaurant', {
  prefix: '',
  //only: ['find', 'findOne', "create"],
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
