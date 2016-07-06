'use strict';

const Boom = require('boom');
const User = require('../../models/User');
const formatUser = require('../../util/userFunctions').formatUser;

module.exports = (req, res) => {
  User.findById(req.Token.id, (err, user) => {
    if (err || !user) {
      res(Boom.unauthorized('user not found'));
    } else {
      res(formatUser(user, 'user'));
    }
  });
};
