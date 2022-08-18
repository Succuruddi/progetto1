'use strict';

/**
 * locationmenu router.
 */

const {
  createCoreRouter
} = require('@strapi/strapi').factories;
module.exports = createCoreRouter('api::locationmenu.locationmenu', {
  prefix: '',
  only: ['find'],
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
