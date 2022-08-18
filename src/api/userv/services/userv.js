'use strict';

/**
 * promoter service.
 */

const {
  createCoreService
} = require('@strapi/strapi').factories;

module.exports = createCoreService('api::userv.userv');
