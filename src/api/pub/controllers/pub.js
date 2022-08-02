'use strict';
/**
* restaurant controller
*/
const {
createCoreController
} = require('@strapi/strapi').factories;
module.exports = createCoreController('api:pub.pub', ({
strapi
}) => ({
//I think this is deprecated
async find(ctx) {
let result = await strapi.entityService.findMany('api:pub.pub', {
filters: {
$and: [{
hide: false,
}],
},

populate: ['id', 'name', 'address', 'picture', 'avgPrice']
});

return pub;

//return result;
},
}
));