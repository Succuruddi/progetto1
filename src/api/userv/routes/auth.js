module.exports = {
  routes: [

    { // I have to change the path to /feeds/ so that I do not depend on route file name loading first
      //Routes files are loaded in alphabetical order. To load custom routes before core routes, make sure to name custom routes appropriately (e.g. 01-custom-routes.js and 02-core-routes.js).
      method: 'POST',
      path: '/usersv/auth/local/register',
      handler: 'userv.register',
      config: {
        policies: [{
          name: 'global::has-access-token',
        }],
      }
    },
    { // I have to change the path to /feeds/ so that I do not depend on route file name loading first
      //Routes files are loaded in alphabetical order. To load custom routes before core routes, make sure to name custom routes appropriately (e.g. 01-custom-routes.js and 02-core-routes.js).
      method: 'POST',
      path: '/usersv/auth/local',
      handler: 'userv.login',
      config: {
        policies: [{
          name: 'global::has-access-token',
        }],
      }
    }
  ]
}
