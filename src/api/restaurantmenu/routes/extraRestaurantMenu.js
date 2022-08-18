module.exports = {
  routes: [{ // Path defined with a URL parameter
      method: 'GET',
      path: '/restaurantmenus/restaurant/:id',
      handler: 'restaurantmenu.findMenusByRestaurantId',
      config: {

        policies: [{
          name: 'global::has-access-token',

        }],

      }
    },



  ]
}
