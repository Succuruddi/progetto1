'use strict';

/**
 * restaurant service.
 */
const {
  createCoreService
} = require('@strapi/strapi').factories;

module.exports = createCoreService('api::restaurant.restaurant', ({
  strapi
}) => ({



  buildSharedRestaurantCardHTML(restaurant) {
    let restaurantImage = (restaurant.entity.logo != null) ? "https://vivelaapp.es" + restaurant.entity.logo.url : restaurant.entity.coverImage != null ? restaurant.entity.coverImage : "https://vivelaapp.es/download/logo.png";
    let restaurantLogo = restaurant.entity.logo != null ? '<div class="col-2 text-center"><img width="50px" height="50px" src=https://vivelaapp.es' + restaurant.entity.logo.url + ' class="rounded-circle"/></div>' : "";
    let email = restaurant.entity.email != null ? restaurant.entity.email : "soporte@vivelaapp.es";

    let restaurantMedia = "";
    if (restaurant.entity.backgroundVideoURL != null) {
      restaurantMedia = `<video class="w-100  d-block viveVideo" controls autoplay loop>
        <source
          src="` + restaurant.entity.backgroundVideoURL + `"
          type="video/mp4"></video>`;
    } else {
      restaurantMedia = `<img class="w-100  d-block viveVideo"
    
          src="` + restaurant.entity.backgroundImage.url + `"
          /<`;
    }
    let htmlResult =
      `<html prefix="og: https://ogp.me/ns#">
<head>

<link rel="shortcut icon" type="image/png" href="https://vivelaapp.es/download/logo.png"/>
<link rel="image_src" href="` + restaurantImage + `"/>
<!-- HTML Meta Tags -->
<title>` + restaurant.entity.name + `</title>
<meta name="description" content="` + restaurant.entity.bio + `"/>

<!-- Facebook Meta Tags -->
<meta property="og:title" content="` + restaurant.entity.name + `"/>
<meta property="og:description" content="` + restaurant.entity.bio + `"/>
<meta property="og:image" itemprop="image" content="` + restaurantImage + `"/>
<meta property="og:url" content="https://vivelaapp.es/restaurante/` + restaurant.entity.slug + `"/>
<meta property="og:type" content="article"/>
<meta property="fb:app_id" content="414593617194637" />



<!-- Twitter Meta Tags -->
<meta name="twitter:card" content="summary_large_image"/>
<meta property="twitter:domain" content="vivelaapp.es"/>
<meta property="twitter:url" content="https://vivelaapp.es/restaurante/` + restaurant.entity.slug + `"/>
<!-- <meta name="twitter:title" content="` + restaurant.entity.name + `"/>
<meta name="twitter:description" content="` + restaurant.entity.bio + `"/>
<meta name="twitter:image" content="` + restaurantImage + `"/>-->

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
` + buildJSONLDStructured(restaurant) + `
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
    
    <div class="d-md-block d-lg-none py-3 pl-4">
    <div class="d-flex d-lg-none">
      ` + restaurantLogo + `  
      <div class="coll-8"> 
        <h4 class="mb-0">` + restaurant.entity.name + `</h4>
        <small class="pb-0">📍 <a href="` + restaurant.entity.places[0].googleMapsURL + `" target="_blank">` + restaurant.entity.places[0].formattedAddress + `<a/>
        <p class="pb-0 mb-0">` + printRestaurantTypes(restaurant) + `</p>

        </small>
     </div>
     </div>
    </div>
    
    
    <div class="w-100 p-0 viveVideo">
      ` + restaurantMedia + `

    </div>
  </div>
  <div class="col-lg-7 px-5 px-lg-1 pl-lg-3 bg-secondary ">
    <div class="px-3 pt-3">
      <div class=" d-none d-lg-flex">
      ` + restaurantLogo + `  
      <div class="coll-8"> 
          <div class="d-none d-lg-block pb-0">
            <h3 class="mb-0">` + restaurant.entity.name + `</h3>
            
            <small class="pb-0">📍 <a href="` + restaurant.entity.places[0].googleMapsURL + `" target="_blank">` + restaurant.entity.places[0].formattedAddress + `<a/>
            <p class="pb-0 mb-0">` + printRestaurantTypes(restaurant) + `</p>
            </small>
          

          </div>
        </div>
    </div>
      <hr class="d-none d-lg-block">
      <div class="pr-4 pl-2 mw">

        <p style="min-heigth:300px">` + restaurant.entity.bio + `</p>
    

      </div>
     
      <div class="pr-4 pl-2 mw">
        <h4 class="text-center">Carta</h4>    
      ` + buildMenu(restaurant) + `
      <p class="text-center">¿Te es dificil leer esta carta?</p>
      <p class="text-center"><a href="mailto:` + email + `?subject=Un cliente quiere que añadas tu carta a VIVE&body=Hola ${restaurant.entity.name}, \n\n Soy usuari@ de VIVE, me gustaría solicitarte que añadas tu carta digitalizada en VIVE para que sea mas facil de leer. Ponte en contacto con soporte@vivelaapp.es para ello. \n\n¡Gracias!" "target="_blank">Solicita al Restaurante que la añada a VIVE<a/></p>
      <div class="text-center p-5 m5-5 w-100">
      <a role="button" class="text-center btn btn-outline-primary rounded-pill" style="width: 230px !important;" href="` + restaurant.bookingMethod + `" target="_blank">Reservar</a> 
    </div>
      
      </div>    </div>
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
  buildSharedRestaurantCardHTMLNoDetail(restaurant) {
    let restaurantImage = /*"https://vivelaapp.es"*/ "https://vivelaapp.es" + restaurant.entity.coverImage.url;

    let htmlResult =
      `<html prefix="og: https://ogp.me/ns#">
<head>

<link rel="shortcut icon" type="image/png" href="https://vivelaapp.es/download/logo.png"/>
<link rel="image_src" href="` + restaurantImage + `"/>
<!-- HTML Meta Tags -->
<title>` + restaurant.entity.name + `</title>
<meta name="description" content="Vive ` + restaurant.entity.name + `"/>

<!-- Facebook Meta Tags -->
<meta property="og:title" content="` + restaurant.entity.name + `"/>
<meta property="og:description" content="Vive ` + restaurant.entity.name + `"/>
<meta property="og:image" itemprop="image" content="` + restaurantImage + `"/>
<meta property="og:url" content="https://vivelaapp.es/restaurante/` + restaurant.entity.slug + `"/>
<meta property="og:type" content="article"/>
<meta property="fb:app_id" content="414593617194637" />



<!-- Twitter Meta Tags -->
<meta name="twitter:card" content="summary_large_image"/>
<meta property="twitter:domain" content="vivelaapp.es"/>
<meta property="twitter:url" content="https://vivelaapp.es/restaurante/` + restaurant.entity.slug + `"/>
<!-- <meta name="twitter:title" content="` + restaurant.entity.name + `"/>
<meta name="twitter:description" content="VIVE ` + restaurant.entity.name + `"/>
<meta name="twitter:image" content="` + restaurantImage + `"/>-->

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
` + buildJSONLDStructured(restaurant) + `
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
    
    <div class="d-md-block d-lg-none py-3 pl-4">
    <div class="d-flex d-lg-none">
        
      <div class="coll-8"> 
        <h4>` + restaurant.entity.name + `</h4>
        <p><small class="">📍 <a href="` + restaurant.entity.places[0].googleMapsURL + `" target="_blank">` + restaurant.entity.places[0].formattedAddress + `<a/></small></p>
     </div>
     </div>
    </div>
    
    
    <div class="w-100 p-0 viveVideo">
    <img class="w-100 h-100  d-block viveVideo" src="` + restaurantImage + `"/>
    </div>
  </div>
  <div class="col-lg-7 px-5 px-lg-1 pl-lg-3 bg-secondary ">
    <div class="px-3 pt-3">
      <div class="d-none d-lg-flex">
      <div class="coll-8"> 
          <div class="d-none d-lg-block">
            <h3 >` + restaurant.entity.name + `</h3>
            <p>
              <small class="font-weight-bold">📍 <a href="` + restaurant.entity.places[0].googleMapsURL + `" target="_blank">` + restaurant.entity.places[0].formattedAddress + `<a/></small>
            </p>
          </div>
        </div>
    </div>
     
      <div class="pr-4 pl-2 mw">
      <hr class="d-none d-lg-block">
      <div class="pr-4 pl-2 mw">
        <p style="min-heigth:300px">Este Restaurante aún no tiene toda su información en VIVE</p>
        <p style="min-heigth:300px">Si los conoces, dile que nos escriba y nos lo pase!</p>
        
    </div>
      
      </div>    </div>
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
  }
}));



function buildMenu(restaurant) {
  let html = "";
  if (restaurant.menuImages !== null && restaurant.menuImages.length > 0) {
    html = '<div class=row pr-4 pl-2 mw">';
    for (let i = 0; i < restaurant.menuImages.length; i++) {
      html += '<img src="https://vivelaapp.es' + restaurant.menuImages[i].url + '" style="max-width:100%;" class="pb-3">';
    }
    html += "</div>"
  } else {
    html = '<a href=' + restaurant.menuURL + 'target="_blank">Clica para ver la carta en una web externa</a>'
  }
  return html;
}

function printRestaurantTypes(restaurant) {
  let restaurantTypes = "";
  if (restaurant.restauranttypes != null) {
    for (var i = 0; i < restaurant.restauranttypes.length; i++) {
      restaurantTypes += restaurant.restauranttypes[i].name + " ";
    }
  }
  return restaurantTypes;
}

function buildJSONLDStructured(restaurant) {

  //let restaurantImage = (restaurant.image != null && restaurant.image != null && restaurant.image.length > 0) ? "https://vivelaapp.es" + restaurant.image[0].url : "https://vivelaapp.es/download/logo.png";
  let restaurantType = printRestaurantTypes(restaurant);


  let jsonld = {
    "@context": "https://schema.org/",
    "@type": "Restaurant",
    "name": restaurant.entity.name,
    "image": [
      "https://vivelaapp.es/" + restaurant.entity.coverImage.url,

    ],
    "priceRange": restaurant.priceLevel,
    "servesCuisine": restaurantType,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": restaurant.entity.places[0].route,
      "addressLocality": restaurant.entity.places[0].locality,
      "addressRegion": restaurant.entity.places[0].administrativeAreaLevel1,
      "postalCode": restaurant.entity.places[0].postCode,
      "addressCountry": restaurant.entity.places[0].country
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": restaurant.entity.places[0].lat,
      "longitude": restaurant.entity.places[0].lng
    },
    "url": "https://vivelaapp.es/restaurante/" + restaurant.entity.slug,
    "menu": "https://vivelaapp.es/restaurante/" + restaurant.entity.slug,
    "telephone": restaurant.entity.places[0].phoneNumber,

  }
  return JSON.stringify(jsonld);

}
