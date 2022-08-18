'use strict';

/**
 * promoter router.
 */

const {
  createCoreRouter
} = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::userv.userv', {
  prefix: '',
  only: ['find', 'findOne', 'delete', 'update', 'register'],
  except: [],
  config: {
    find: {
      policies: [{
        name: 'global::has-access-token',
        name: 'global::isOwner'

      }],
      middlewares: [],
    },
    findOne: {
      policies: [{
        name: 'global::has-access-token',
        name: 'global::isOwner'

      }],
    },
    create: {},
    update: {
      policies: [{
        name: 'global::has-access-token',
        name: 'global::isOwner'

      }],
    },
    delete: {
      policies: [{
        name: 'global::has-access-token',
        name: 'global::isOwner'

      }],
    },
  },
});
