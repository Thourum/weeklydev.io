var _ = require('../handler');

module.exports = {
  method: 'get',
  path: '/logout',
  config: {
    auth: 'jwt'
  },
  handler: _.logout
};
