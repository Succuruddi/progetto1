'use strict';

/**
 *  promoter controller
 */

const {
  createCoreController
} = require('@strapi/strapi').factories;

module.exports = createCoreController('api::userv.userv', ({
  strapi
}) => ({

  async findOne(ctx) {
    return await strapi.controller('plugin::users-permissions.user').findOne(ctx);
  },

  async delete(ctx) {
    return await strapi.controller('plugin::users-permissions.user').destroy(ctx);
  },
  async update(ctx) {
    return await strapi.controller('plugin::users-permissions.user').update(ctx);
  },

  async register(ctx) {
    return await strapi.controller('plugin::users-permissions.auth').register(ctx);
  },
  async login(ctx) {
    return await strapi.controller('plugin::users-permissions.auth').callback(ctx);
  }

}));
