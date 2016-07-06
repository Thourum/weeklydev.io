'use strict';

const User = require('../models/User');
const Boom = require('boom');

module.exports = (req, res) => {
  User.findOne({'token.full': req.auth.token}, (err, user) => {
    if (err || !user) {
      res(Boom.unauthorized('user not found'));
    }else {
      if (!user.token.valid) {
        res(Boom.unauthorized('user already logged out'));
      }else {
        user.token.valid = false;
        user.save((err, done) => {
          if (err) {
            throw Boom.badRequest(err);
          }
          res({
            succes: true,
            message: 'successfully logged out'
          });
        });
      }
    }
  });
};
