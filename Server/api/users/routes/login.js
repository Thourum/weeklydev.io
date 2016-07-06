var _ = require('../handler');
var authenticateUser = require('../util/userFunctions').authenticateUser;

module.exports = {
  method: 'POST',
  path: '/login',
  config: {
    pre: [{
      method: authenticateUser,
      assign: 'user'
    }],
    auth: 'userPass' // Requires basic auth (username:password)
  },
  handler: _.login
};
