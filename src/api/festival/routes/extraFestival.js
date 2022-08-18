module.exports = {
  routes: [{ // Path defined with a URL parameter
      method: 'GET',
      path: '/festivals/events/:id',
      handler: 'festival.getFestivalEvents',

      //TODO commented until most users have been upgraded to a newer version where policy is in place in the app
      // config: {
      //   policies: ['global::has-access-token']
      // },
    },
    // {
    //   method: 'GET',
    //   path: '/festivals/menu',
    //   handler: 'festival.buildFestivalMenu',
    //   config: {
    //     policies: ['global::has-access-token']
    //   }
    // },

  ]
}
