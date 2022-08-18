'use strict';

/**
 * foodanddrink service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::foodanddrink.foodanddrink');
