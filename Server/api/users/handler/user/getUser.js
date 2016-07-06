'use strict';

const Boom = require('boom');
const User = require('../../models/User');
const generateUUID = require('../../../../methods/generateUUID');
const formatUser = require('../../util/userFunctions').formatUser;
const createToken = require('../../util/token');

module.exports = (req, res) => {
  if (req.params.id) {
    User.findById(req.params.id, function (err, user) {
      if (err) {
        res(Boom.badRequest(err));
      }
      res(formatUser(user, 'users')).code(200);
    });
  } else {
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
  }
};
