module.exports = {  
  '*/1,2,3,4,5,6,7,8,9,10 * * * *': async ({ strapi }) => {
    console.log('cron running');
    strapi.service('api::pub.pub').createTweet();

}}