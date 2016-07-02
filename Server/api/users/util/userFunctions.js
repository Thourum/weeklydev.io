'use strict';

const Boom = require('boom');
const User = require('../models/User');
const createToken = require('./token');
const validateEmail = require('../../../methods/validateEmail');
const generateUUID = require('../../../methods/generateUUID');

function verifyUniqueUser (req, res) {
  // Find an entry from the database that
  // matches either the email or username
  User.findOne({
    $or: [{
      email: req.payload.email
    }, {
      username: req.payload.username
    }]
  }, (err, user) => {
    // Check whether the username or email
    // is already taken and error out if so
    if (user) {
      if (user.username === req.payload.username) {
        res(Boom.badRequest('Username taken'));
      }
      if (user.email === req.payload.email) {
        res(Boom.badRequest('Email taken'));
      }
    }
    // If no username or email is found send it on
    // to the route handler
    res(req.payload);
  });
}

function authenticateUser (req, res) {
  // TODO: [1] remove all of this shit and rewrite it all
  User.findById(req.Credentials.id, (err, user) => {
    if (err) {
      console.error(err);
      res(Boom.wrap(err, 400));
    }
    if (!user) {
      res(Boom.badRequest('User not found!'));
      return;
    }
    user.token.uuid = generateUUID();
    user.save((err, user) => {
      if (err) {
        console.log('-- Something went wrong:');
        console.log(err);
        res(Boom.wrap(Boom.create(500, 'Internal Server Error', {
          timestamp: Date.now()
        })));
      }
      res(req.payload);
    });
  });
}

function userModel (user) {
  let obj = {
    id: user.id,
    email: user.email,
    username: user.username,
    admin: user.admin,
    team: user.team,
    project: user.project,
    token: user.token.full
  };
  return obj;
}

module.exports = {
  verifyUniqueUser: verifyUniqueUser,
  authenticateUser: authenticateUser,
  formatUser: userModel
};
