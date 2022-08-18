'use strict';

/**
 * appstate router.
 */

const {
  createCoreRouter
} = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::appstate.appstate', {
  prefix: '',
  only: ['find', 'findOne'],
  except: [],
  config: {
    find: {
      auth: false,
      policies: [{
        name: 'global::has-access-token',
      }],
      middlewares: [],
    },
    findOne: {},
    create: {},
    update: {},
    delete: {},
  },
});
