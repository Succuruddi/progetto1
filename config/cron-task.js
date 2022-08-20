module.exports = {  
  '*/1,2,3,4,5,6,7,8,9,10 * * * *': async ({ strapi }) => {
    console.log('cron running');
    //strapi.service('api::pub.pub').createTweet();
   
   
    let event = await strapi.entityService.findOne('api::event.event',1 ,{ // predno un evento dopo passo alla funzione create tweet descrizione titolo
     
    });

    console.log(event);
    
    var verifica= event.description;
    strapi.service('api::event.event').createTweet(verifica);
   
   
    ;  

}}