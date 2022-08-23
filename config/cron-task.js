module.exports = {
  '*/1,2,3,4,5,6,7,8,9,10 * * * *': async ({
    strapi
  }) => {
    console.log('cron running');
    //strapi.service('api::pub.pub').createTweet();

    var startDate=new Date();
    
    var endDate= new Date();
    endDate.setHours(startDate.getHours()+6); //imposto il lasso di tempo
     
    console.log(startDate);
    console.log(endDate);
    strapi.service('api::event.event').publicEventsToSocialMedia(startDate,endDate);

   
    
      
    

    

  }
}
