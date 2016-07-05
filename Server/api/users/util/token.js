'use strict';

const jwt = require('jsonwebtoken');
const secret = require('../../../config').JWT_SECRET;

function createToken (user, expires) {
  let scopes = 'user';
  // Check if the user object passed in
  // has admin set to true, and if so, set
  // scopes to admin
  if (user.admin) {
    scopes = 'admin';
  }

  expires = expires || '365 days';

  // Sign the JWT
  return jwt.sign({
    id: user._id,
    uuid: user.token.uuid,
    scope: scopes
  }, secret, {
    algorithm: 'HS256',
    expiresIn: expires // exp: in 24H
  });
}

module.exports = createToken;
