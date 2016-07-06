'use strict';

const Boom = require('boom');
const User = require('../../models/User');
const generateUUID = require('../../../../methods/generateUUID');
const formatUser = require('../../util/userFunctions').formatUser;
const createToken = require('../../util/token');

module.exports = (req, res) => {
  let user = new User();
  user.email = req.payload.email;
  user.username = req.payload.username;
  user.admin = false;
  user.password = req.payload.password;
  user.token.uuid = generateUUID();
  user.token.full = createToken(user);
  user.token.valid = true;
  // user.token_expire.expire = (Date.now() + (24 * 60 * 60))
  user.save((err, user) => {
    if (err) {
      throw Boom.badRequest(err);
    }
    // If the user is saved successfully, Send a JWT
    res(formatUser(user, 'user')).code(201);
  });
};
