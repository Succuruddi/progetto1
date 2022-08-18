module.exports = {
  routes: [{ // Path defined with a URL parameter
      method: 'GET',
      path: '/places/createPlace',
      handler: 'place.createPlacesByFile',
    },
    { // Path defined with a URL parameter
      method: 'GET',
      path: '/places/createEntityByPlaceId',
      handler: 'place.createEntityByPlaceId',
    },
    { // Path defined with a URL parameter
      method: 'GET',
      path: '/places/createRestaurantByPlaceId',
      handler: 'place.createRestaurantByPlaceId',
    },
    { // Path defined with a URL parameter
      method: 'GET',
      path: '/places/createRestaurantByEntityId',
      handler: 'place.createRestaurantByEntityID',
    },
    { // Path defined with a URL parameter
      method: 'GET',
      path: '/places/fixphone',
      handler: 'place.fixPhoneNumber',
    },
    { // Path defined with a URL parameter
      method: 'GET',
      path: '/places/fixslug',
      handler: 'place.fixSlug',
    },
    { // Path defined with a URL parameter
      method: 'GET',
      path: '/places/fixservicelevel',
      handler: 'place.fixServiceLevel',
    },
    { // Path defined with a URL parameter
      method: 'POST',
      path: '/places/createPlaceByJSON',
      handler: 'place.createPlacesByJSON',
    },


  ]
}
