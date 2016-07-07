'use strict';

const Boom = require('boom');
const User = require('../../../models/User');
const formatUser = require('../../../util/userFunctions').formatUser;

module.exports = (req, res) => {
  User.findById(req.params.id, function (err, user) {
    if (err) {
      res(Boom.badRequest(err));
    }
    res(formatUser(user, 'users')).code(200);
  });
};
