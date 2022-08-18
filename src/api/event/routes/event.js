'use strict';

/**
 * event router.
 */

const {
  createCoreRouter
} = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::event.event', {
  prefix: '',
  only: ['find', 'findOne', "create"],
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
