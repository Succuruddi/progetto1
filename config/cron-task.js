module.exports = {
  '*/1,2,3,4,5,6,7,8,9,10 * * * *': async ({
    strapi
  }) => {
    console.log('cron running');
    //strapi.service('api::pub.pub').createTweet();

    var nowDate=new Date();
    
    var nextDate= new Date();
    nextDate.setHours(nowDate.getHours()+6);
     
    console.log(nowDate);
    console.log(nextDate);

    let event = await strapi.entityService.findMany('api::event.event', { // predno un evento dopo passo alla funzione create tweet descrizione titolo
     
      populate: ['organisers', 'performers'],
      filters: { 
        $and:[
          {
         date:{
          $gt:nowDate} ,
          },
         {
          date:{
            $lte: nextDate}
        
          }]
         
        
     
   
  }
});

    if (event != null && event.length > 0) {
      
      for(var i=0; i < event.length; i++){
        var performers="";
        var organisers="";
        var description = event[i].description;
        var date=event[i].date;
        var c=date.split(":");
        var hour=c[1]; 
        console.log(hour);
        var title= event[i].title;
        
        console.log(event[0]);
          for(var z=0; z < event[i].performers.length; z++){

          performers= performers +  event[i].performers[z].twitter + " ";
         
          }
          for(var x=0; x < event[i].organisers.length; x++){

          organisers= organisers + event[i].organisers[x].twitter + " ";
          
          }
        
       console.log(event[i]) 
      //strapi.service('api::event.event').createTweet(title, performers, organisers,hour,description);
    }
      
    }

    ;

  }
}
