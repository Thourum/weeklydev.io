'use strict';

const Boom = require('boom');
const User = require('../models/User');
const createToken = require('../util/token');
const generateUUID = require('../../../methods/generateUUID');
const formatUser = require('../util/userFunctions').formatUser;

module.exports = (req, res) => {
  User.findById(req.Credentials.id, (err, user) => {
    if (err || !user) {
      res(Boom.unauthorized('user not found'));
    }
    user.token.valid = true;
    user.token.uuid = generateUUID();
    user.token.full = createToken(user);
    user.save((err, done) => {
      if (err) {
        throw Boom.badRequest(err);
      }
      res(formatUser(user, 'user')).code(200);
    });
  });
};
