'use strict';

/**
 * event service.
 */
const {
  createCoreService
} = require('@strapi/strapi').factories;
const {
  Client
  // ,auth    l'ho cambito io percghè sull'altro file non c'era auth

} = require('twitter-api-sdk');

//import got from 'got';
const axios = require('axios').default;

const crypto = require('crypto');
const OAuth = require('oauth-1.0a');
const {
  time
} = require('console');

module.exports = createCoreService('api::event.event', ({
  strapi
}) => ({

  sortEventsRangeByDateAndHour(events) {
    let orderByIndexDate = events.map(function (event, i) {
      const endOfDay = new Date();
      endOfDay.setUTCHours(23, 59, 59, 999);
      let value
      const eventDate = new Date(event.date);
      if (eventDate <= endOfDay) {
        let eventTransformedDateToToday = new Date(endOfDay);
        eventTransformedDateToToday.setUTCHours(eventDate.getUTCHours(), eventDate.getUTCMinutes());
        value = padLeadingZeros(eventDate.getUTCHours(), 2) + padLeadingZeros(eventDate.getUTCMinutes(), 2);
      } else {
        value = eventDate.getTime();
      }
      return {
        index: i,
        value: value,
      };

    });

    orderByIndexDate.sort((a, b) => a.value - b.value);
    var sortedEventsByDate = orderByIndexDate.map(function (e) {
      return events[e.index];
    });
    return sortedEventsByDate;
  },

  buildSharedEventCardHTML(event) {
    let eventImage = (event.image != null && event.image != null && event.image.length > 0) ? "https://vivelaapp.es" + event.image[0].url : "https://vivelaapp.es/download/logo.png";
    let date = formateDate(event.date, event.endDate);
    let htmlResult =
      `<html prefix="og: https://ogp.me/ns#">
<head>

<link rel="shortcut icon" type="image/png" href="https://vivelaapp.es/download/logo.png"/>
<link rel="image_src" href="` + eventImage + `"/>
<!-- HTML Meta Tags -->
<title>` + event.title + `</title>
<meta name="description" content="` + event.shortDescription + `"/>

<!-- Facebook Meta Tags -->
<meta property="og:title" content="` + event.title + `"/>
<meta property="og:description" content="` + event.shortDescription + `"/>
<meta property="og:image" content="` + eventImage + `"/>
<meta property="og:url" content="https://vivelaapp.es/evento/` + event.slug + `"/>
<meta property="og:type" content="article"/>
<meta property="fb:app_id" content="414593617194637" />



<!-- Twitter Meta Tags -->
<meta name="twitter:card" content="summary_large_image"/>
<meta property="twitter:domain" content="vivelaapp.es"/>
<meta property="twitter:url" content="https://vivelaapp.es/evento/` + event.slug + `"/>
<!-- <meta name="twitter:title" content="` + event.title + `"/>
<meta name="twitter:description" content="` + event.shortDescription + `"/>
<meta name="twitter:image" content="` + eventImage + `"/>-->

<!-- Meta Tags Generated via https://www.opengraph.xyz -->
      

<meta property="og:image:width" content="1080"/>
<meta property="og:image:height" content="1080"/>
<link rel="icon" href="https://vivelaapp.es/download/logo.png"/>

<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="/share/css/bootstrap.min.css">
<style>
  @media (max-width: 1000px) {
    .marginTopNav {
      margin: 0 auto;
      padding: 150px 0px 150px 0px !important;
    }

    .viveVideo {
      height: 478px !important;
    }
  }


  @media (max-width: 450px) {
    .viveVideo {
      height: 600px !important;
    }
  }



  @media (max-width: 380px) {
    .viveVideo {
      height: 450px !important;
    }

    .marginTopNav {
      margin: 0 auto;
      padding: 165px 0px 165px 0px !important;
    }
  }

  .marginTopNav {
    margin: 0 auto;
    padding: 130px 0px 130px 0px;
  }
</style>
<script type="application/ld+json">
` + buildJSONLDStructured(event) + `
</script>
</head>

<body class="bg-light">
<nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
<div class="container">
<a class="navbar-brand navbar-dark-active-color" href="#"><img src="/share/assets/vive_logo_blanco_transparent.png" width="54"
  height="30" alt="" loading="lazy"></a>
<!-- <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button> -->
<!-- <div class="collapse navbar-collapse" id="navbarSupportedContent"> -->
<div class="" id="navbarSupportedContent"></div>
<p class=" ml-auto me-auto mb-2 mb-lg-0 text-white">Para una mejor experiencia descárgate nuestra app</p>
<ul class="navbar-nav ml me-auto mb-2 mb-lg-0 d-inline-block">

<li class="nav-item d-inline-block">
  <a class="nav-link active" aria-current="page" href="https://apps.apple.com/gb/app/vive-tu-ciudad/id1617890494"><img src="/share/assets/apple_badge.png" width="125" height="42"
      alt="" loading="lazy"></a>
</li>
<li class="nav-item d-inline-block">
  <a class="nav-link" href="https://play.google.com/store/apps/details?id=com.scintillam.vive"><img src="/share/assets/google_badge.png" width="125" height="42" alt="" loading="lazy"></a>
</li>
</ul>
</div>
<!-- </div> -->
</div>
</nav>


<!-- <div class="container" style="  margin: 0 auto;
padding: 200px 0px 200px 0px;"> -->
<div class="container marginTopNav">
<div class="row">
<div class="col-lg-1">

</div>
<div class="col-lg-10 border">
<!-- <div class="row flex-column-reverse flex-lg-row"> -->
<div class="row">
  <!-- <div class="col-lg-0" data-bs-toggle="collapse" id="titleTarget">

  </div> -->
  <div class="col-lg-5 px-0 bg-secondary">
    <h4 class="d-md-block d-lg-none py-3 pl-4">` + event.title + `</h4>
    <div class="w-100 p-0 viveVideo">
      <video class="w-100  d-block viveVideo" controls autoplay loop>
        <source
          src="` + event.videoURL + `"
          type="video/mp4"></video>

    </div>
  </div>
  <div class="col-lg-7 px-5 px-lg-1 pl-lg-3 bg-secondary ">
    <div class="px-3 pt-3">
      <h3 class="d-none d-lg-block">` + event.title + `</h3>
      <hr class="d-none d-lg-block">
      <div class="pr-4 pl-2 mw">
        <p style="min-heigth:300px">` + event.description + `</p>
        <p class="text-right "><small class="font-weight-bold">` + date + ` 🕑</small></p>

        <!-- <p>👤: DON'T LOOK HERE</p>
        <p>📍: DON'T LOOK HERE</p> 
        <p>🕑: 22 Abril - 22:00</p>-->

      </div>
      <div class="text-center p-5 m5-5 w-100">
        <a role="button" class="text-center btn btn-outline-primary rounded-pill" style="width: 230px !important;" href="` + event.inscriptionURL + `" target="_blank">Vívelo</a> </div>
    </div>
  </div>
</div>
</div>
<div class="col-lg-1"></div>
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js"
integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossorigin="anonymous">
</script>
</body>

</html>
        `;
    return htmlResult;
  },

  async publicEventsToSocialMedia(startDate, endDate) {
    console.log("The start date is: " + startDate);
    console.log("The end date is: " + endDate);
    let event = await strapi.entityService.findMany('api::event.event', {

      populate: ['organisers', 'performers'],
      filters: {
        $and: [{
            date: {
              $gt: startDate
            },
          },
          {
            date: {
              $lte: endDate
            }

          }
        ]
      }
    });
    console.log(new Date() + "I've searched for the events");
    if (event != null && event.length > 0) {
      console.log(event);

      for (var i = 0; i < event.length; i++) {

        var performersTwitterAccounts = "👤:";
        var organisersTwitterAccounts = "📍:";
        var description = event[i].description;
        var shortDescription = event[i].shortDescription
        var date = new Date(event[i].date);
        var hour = date.getHours();
        var minutes = date.getMinutes();
        var title = event[i].title;
        if (event[i].performers != null && event[i].performers.length > 0) {
          for (var z = 0; z < event[i].performers.length; z++) {
            if (event[i].performers[z].twitter == null || event[i].performers[z].twitter == "") {
              performersTwitterAccounts += " " + event[i].performers[z].name;
            } else {
              performersTwitterAccounts += " " + event[i].performers[z].twitter;
            }
          }
        } else {
          performersTwitterAccounts = "";
        }
        if (event[i].organisers != null && event[i].organisers.length > 0) {
          for (var x = 0; x < event[i].organisers.length; x++) {

            if (event[i].organisers[x].twitter == null || event[i].organisers[x].twitter == "") {
              organisersTwitterAccounts += " " + event[i].organisers[x].name;
            } else {
              organisersTwitterAccounts += " " + event[i].organisers[x].twitter + " ";
            }
          }
        } else if (event[i].seo != null && event[i].seo.locationName != null && event[i].seo.locationName != "") {
          organisersTwitterAccounts = event[i].seo.locationName;
        } else {
          organisersTwitterAccounts = "";
        }



        var hastag = "#vive #badajoz #viveBadajoz #turismo #eventos #planes #viveapp";
        var time = "🕑 : " + " " + hour + ":" + minutes;
        var url = "https://vivelaapp.es/evento/" + event[i].slug;
        var tweet = title + "\n" + performersTwitterAccounts + "\n" + organisersTwitterAccounts +
          "\n" + time + "\n\n" + shortDescription + "\n\n" + hastag +
          "\n\n" + url + "\n";


        if (tweet.length < 281) {
          console.log(new Date() + "I'm going to print the tweet with current time: ");
          var delayBetweenTweet = 120000 + Math.floor(Math.random() * 60000);
          setTimeout(delay, delayBetweenTweet, tweet);


        } else {
          console.log("error: tweet length maximum reached")
        }

      }
    }
  },






  async createTweet(tweet) {
    const cronTasks = require("./cron-task");

    module.exports = ({
    
      env
    
    }) => ({
    
     
    
    
    
    
    
   
    
    host: env('HOST', '0.0.0.0'),
    
      port: env.int('PORT', 1337),
    
    
    const oauth = OAuth({

      consumer: {

        key: env('CONSUMER_KEY'),//'0PX0GSx4f4l0p8iLVJJVNqdH5',

        secret: env('CONSUMER_KEY_SECRET')//'ncuTssIPzDpVB6Nx8WR1xOpQ8J3I6DjJpvE1W0aBqQGMrYBcaN'

      },

      signature_method: 'HMAC-SHA1',

      hash_function: (baseString, key) => crypto.createHmac('sha1', key).update(baseString).digest('base64')

    });



    const token = {

      key: env(ACCESS_TOKEN)//'1555201215352504320-m8mrgpbn1GI17ej1YBInanDQTG7yVp',

      secret:env(ACCESS_TOKEN_SECRET) //'5VLtHB967vlEyPHLNtD4fm2iNVQJMG7q4Ie4bhDN0w3fA',

    };
  })

    const authHeader = oauth.toHeader(oauth.authorize({

      url: 'https://api.twitter.com/2/tweets',

      method: 'POST'

    }, token));



    try {
      const req = await axios.post('https://api.twitter.com/2/tweets', {

        "text": tweet
      }, {

        headers: {

          Authorization: authHeader["Authorization"],

          'user-agent': "v2CreateTweetJS",

          'content-type': "application/json",

          'accept': "application/json"

        }

      });

    } catch (error) {

      console.log(error);

    }

  },

  async createTweet2() {
    console.log("Gello");
  }
}));

function padLeadingZeros(num, size) {
  var s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}


function delay(tweet) {
  console.log(new Date() + "now I'm in delay about to print the tweet: ");
  console.log(tweet);
  //strapi.service('api::event.event').createTweet(tweet)
}

function formateDate(startDate, endDate) {
  let dateString;

  startDate = new Date(startDate);

  var timeString = startDate.toISOString().substr(11, 5);
  console.log(startDate);
  let offSet = -1 * (startDate.getTimezoneOffset() / 60);
  //workround for those days where the event starts at 22.00 ... I defenetyl need to separate hours from date.
  startDate.setHours(startDate.getHours() - offSet);
  console.log(startDate);
  console.log(timeString)
  if (endDate == null || endDate == undefined) {
    dateString = startDate.toLocaleDateString('es-ES') + " " + timeString;

  } else if (eventStartsAndEndsThisDay(startDate, endDate)) {
    dateString = startDate.toLocaleDateString();
    dateString += " " + timeString + " a " + endDate.toISOString().substr(11, 5);
  } else {
    endDate = new Date(endDate);
    dateString = "Del " + startDate.toLocaleDateString() + " al " + endDate.toLocaleDateString();
    dateString += " " + timeString + " a " + endDate.toISOString().substr(11, 5);

  }
  return dateString;
}

function eventStartsAndEndsThisDay(startDate, endDate) {
  endDate = new Date(endDate);
  return endDate != null &&
    startDate.getFullYear() == endDate.getFullYear() &&
    startDate.getMonth() == endDate.getMonth() &&
    startDate.getDate() == endDate.getDate();

}

function buildJSONLDStructured(event) {
  console.log(event.seo);
  let startDate = new Date(event.date);
  var timeString = startDate.toISOString().substr(11, 5);

  let offSet = -1 * (startDate.getTimezoneOffset() / 60);
  //workround for those days where the event starts at 22.00 ... I defenetyl need to separate hours from date.
  startDate.setHours(startDate.getHours() - offSet);
  console.log("offset: " + offSet + ":00");
  let endDate = "";
  let endingDate;
  if (event.endDate != null) {
    endingDate = new Date(event.endDate);
    endDate = endingDate.toLocaleDateString('es-ES') + "T" + endingDate.toISOString().substr(11, 5) + "+" + offSet + ":00";
  }
  let eventImage = (event.image != null && event.image != null && event.image.length > 0) ? "https://vivelaapp.es" + event.image[0].url : "https://vivelaapp.es/download/logo.png";

  let jsonld = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": event.title,
    "startDate": startDate.toLocaleDateString('es-ES') + "T" + timeString + "+02:00",
    endDate,
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
    "location": {
      "@type": "Place",
      "name": event.seo != null && event.seo.locationName != null ? event.seo.locationName : "Badajoz",
      "address": {
        "@type": "PostalAddress",
        //"streetAddress": "100 West Snickerpark Dr",
        "addressLocality": "Badajoz",
        // "postalCode": "19019",
        "addressRegion": "Badajoz",
        "addressCountry": "ES"
      }
    },
    "image": [
      eventImage
    ],
    "description": event.title,
    // "offers": {
    //   "@type": "Offer",
    //   "url": "https://www.example.com/event_offer/12345_201803180430",
    //   "price": "30",
    //   "priceCurrency": "USD",
    //   "availability": "https://schema.org/InStock",
    //   "validFrom": "2024-05-21T12:00"
    // },
    // "performer": {
    //   "@type": "PerformingGroup",
    //   "name": "Kira and Morrison"
    // },
    // "organizer": {
    //   "@type": "Organization",
    //   "name": "Kira and Morrison Music",
    //   "url": "https://kiraandmorrisonmusic.com"
    // }
  }
  return JSON.stringify(jsonld);

}
