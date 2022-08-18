module.exports = {
  routes: [{ // Path defined with a URL parameter
      method: 'GET',
      path: '/restaurants/:slug',
      handler: 'restaurant.findBySlug',
      config: {

        policies: [{
          name: 'global::has-access-token',

        }],

      }
    }, { // Path defined with a URL parameter
      method: 'GET',
      path: '/restaurante/:slug',
      handler: 'restaurant.buildSharedRestaurantCardHTML',
    },



  ]
}
