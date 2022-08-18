'use strict';

/**
 * appstate service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::appstate.appstate');
