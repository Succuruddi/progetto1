module.exports = {
  //'*/29 */2,8,14,20 * * *': async ({ 
  '*/1,2 * * * *': async ({
    strapi
  }) => {
    console.log(new Date() + 'cron running');
    var startDate = new Date();
    startDate.setHours(startDate.getHours() + 2);
    var endDate = new Date();
    endDate.setHours(startDate.getHours() + 6); //imposto il lasso di tempo
    strapi.service('api::event.event').publicEventsToSocialMedia(startDate, endDate);
  }
}
