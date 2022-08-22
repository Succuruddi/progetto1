module.exports = {
  '*/1,2,3,4,5,6,7,8,9,10 * * * *': async ({
    strapi
  }) => {
    console.log('cron running');
    //strapi.service('api::pub.pub').createTweet();


    let event = await strapi.entityService.findMany('api::event.event', { // predno un evento dopo passo alla funzione create tweet descrizione titolo
      populate: ['organisers', 'performers']
    });

    console.log(event);
    if (event != null && event.length > 0) {
      var verifica = event[0].description;
      strapi.service('api::event.event').createTweet(verifica);
    }

    ;

  }
}
