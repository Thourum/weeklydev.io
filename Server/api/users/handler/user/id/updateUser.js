'use strict';

const Boom = require('boom');
const User = require('../../../models/User');
const formatUser = require('../../../util/userFunctions').formatUser;

module.exports = (req, res) => {
  User.findByIdAndUpdate(req.params.id, {
    $set: {
      username: req.payload.username,
      email: req.payload.email,
      admin: req.payload.admin,
      password: req.payload.password
    }
  }, function (err, user) {
    if (err) return console.error(err);
    res(formatUser(user), 'user');
  });
};
