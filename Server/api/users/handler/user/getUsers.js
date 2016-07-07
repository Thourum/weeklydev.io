'use strict';

const Boom = require('boom');
const User = require('../../models/User');
const formatUser = require('../../util/userFunctions').formatUser;

module.exports = (req, res) => {
  User.find(function (err, users) {
    if (err) {
      res(Boom.badRequest(err));
    }
    if (req.Token.scope == 'admin') {
      res(users).code(200);
    } else {
      var Users = [];
      users.forEach((user) => {
        Users.push(formatUser(user, 'users'));
      });
      res(Users);
    }
  });
};
