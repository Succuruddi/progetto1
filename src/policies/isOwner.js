module.exports = async (policyContext, config, {
  strapi
}) => {
  if (policyContext.state.user.id == policyContext.request.params.id) {
    return true;
  } else {
    return false;
  }
};
