module.exports = async (policyContext, config, {
  strapi
}) => {
  /*const entity = await strapi.service('api::appstate.appstate').find({
    accessToken: policyContext.request.header.accesstoken,
    appVersion: policyContext.request.header.appVersion
  });*/
  const entity = await strapi.db.query('api::appstate.appstate').findOne({
    select: ['accessToken', 'appVersion'],
    where: {
      'accessToken': policyContext.request.header.accesstoken,
      'appVersion': policyContext.request.header.appversion
    }
  });

  //if (entity != null && entity.results.length > 0 && entity.results[0].accessToken == policyContext.request.header.accesstoken && entity.results[0].appVersion == policyContext.request.header.appVersion) {
  if (entity != null && entity.accessToken == policyContext.request.header.accesstoken && entity.appVersion == policyContext.request.header.appversion) {
    // if a session is open
    // go to next policy or reach the controller's action
    return true;
  }
  return false; // If you return nothing, Strapi considers you didn't want to block the request and will let it pass
};
