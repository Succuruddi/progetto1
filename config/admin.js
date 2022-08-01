module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'ce7c6ff8e0a5bb1653057dbeb3caae3b'),
  },
});
