'use strict';

const Boom = require('boom');
const User = require('../models/User');
const createUserSchema = require('../schemas/createUser');
const generateUUID = require('../../../methods/generateUUID');
const formatUser = require('../util/userFunctions').formatUser;
const verifyUniqueUser = require('../util/userFunctions').verifyUniqueUser;
const createToken = require('../util/token');

module.exports = [{
  method: 'POST',
  path: '/users/new',
  config: {
    // Validate the payload against the Joi schema
    validate: {
      payload: createUserSchema
    },
    // Before the route handler runs, verify that
    // the user is unique and assign the result to 'user'
    pre: [{
      method: verifyUniqueUser,
      assign: 'user'
    }],
    // to register user does not need any authentication
    auth: false
  },
  handler: (req, res) => {
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
  }
}, {
  /**
   * Update user by ID
   */
  method: 'PUT',
  path: '/users/{id}',
  config: {
    auth: 'jwt'
  },
  handler: (req, res) => {
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
  }
}, {
  /**
   * Get all users or one user by id
   */
  method: 'GET',
  path: '/users/{id?}',
  config: {
    auth: 'jwt'
  },
  handler: (req, res) => {
    if (req.params.id) {
      User.findById(req.params.id, function (err, user) {
        if (err) return console.error(err);
        res(formatUser(user, 'users')).code(200);
      });
    } else {
      User.find(function (err, users) {
        if (err) return console.error(err);
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
  }
}, {
  /**
   * Get all users or one user by id
   */
  method: 'GET',
  path: '/users/me',
  config: {
    auth: 'jwt'
  },
  handler: (req, res) => {
    User.findById(req.Token.id, (err, user) => {
      if (err || !user) {
        res(Boom.unauthorized('user not found'));
      } else {
        res(formatUser(user, 'user'));
      }
    });
  }
}, {
  /**
   * Update user by ID
   */
  method: 'DELETE',
  path: '/users/{id}',
  config: {
    auth: 'jwt'
  },
  handler: (req, res) => {
    if (req.Token.id === req.params.id || req.Token.scope === 'admin') {
      User.findByIdAndRemove(req.params.id, (err, user) => {
        if (err) {
          console.error(err);
          res(Boom.wrap(err, 400));
        }
        if (user) {
          res(formatUser(user, 'user')).code(200);
        } else {
          res(Boom.notFound('User not found'));
        }
      });
    } else {
      res(Boom.unauthorized('you cannot delete account that is not yours'));
    }
  }
}];
