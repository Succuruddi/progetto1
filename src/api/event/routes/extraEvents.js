module.exports = {
  routes: [{ // Path defined with a URL parameter
      method: 'GET',
      path: '/event',
      handler: 'event.buildShareEventCardByUID',
    },
    { // Path defined with a URL parameter TO BE DECOMMISIONED BY EVENTO
      method: 'GET',
      path: '/event/:slug',
      handler: 'event.buildShareEventCard',
    },
    { // Path defined with a URL parameter
      method: 'GET',
      path: '/evento/:slug',
      handler: 'event.buildShareEventCard',
    },

    { // I have to change the path to /feeds/ so that I do not depend on route file name loading first
      //Routes files are loaded in alphabetical order. To load custom routes before core routes, make sure to name custom routes appropriately (e.g. 01-custom-routes.js and 02-core-routes.js).
      method: 'GET',
      path: '/feed/events',
      handler: 'event.getEventsFeed',
      config: {
        policies: [{
          name: 'global::has-access-token',
        }],
      }
    }
  ]
}
