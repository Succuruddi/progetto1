'use strict';
/**
* restaurant controller
*/
const {
createCoreController
} = require('@strapi/strapi').factories;
module.exports = createCoreController('api::pub.pub', ({
strapi
}) => ({
//I think this is deprecated
async find(ctx) {
let result = await strapi.entityService.findMany('api::pub.pub', {


populate: ['picture']
});

return result;

//return result;
},
}
));