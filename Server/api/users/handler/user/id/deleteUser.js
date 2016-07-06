'use strict';

const Boom = require('boom');
const User = require('../../../models/User');
const formatUser = require('../../../util/userFunctions').formatUser;

module.exports = (req, res) => {
  if (req.Token.id === req.params.id || req.Token.scope === 'admin') {
    User.findByIdAndRemove(req.params.id, (err, user) => {
      if (err) {
        console.error(err);
        res(Boom.wrap(err, 400));
      }
      if (user) {
        res(formatUser(user, 'user')).code(200);
      } else {
        res(Boom.notFound('User not found'));
      }
    });
  } else {
    res(Boom.unauthorized('you cannot delete account that is not yours'));
  }
};
