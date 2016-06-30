'use strict';

const Hapi = require('Hapi');
const mongoose = require('mongoose');
const Boom = require('boom');
const glob = require('glob');
const path = require('path');
const jwt = require('jsonwebtoken');
const validateJwt = require('./validation.js').jwt;
const validateUserPass = require('./validation.js').basic;
const secret = require('./config');
const server = new Hapi.Server();

// Setup hapi server
server.connection({
  port: process.env.PORT || 1337,
  routes: {
    cors: true
  }
});

const dbUrl = 'mongodb://localhost:27017/WOIP-backend';

// Register the jwt auth plugin
server.register([require('hapi-auth-jwt2'), require('hapi-auth-basic-weeklydev-login')], (err) => {

  server.auth.strategy('jwt', 'jwt', {
    key: secret, // Never Share your secret key
    validateFunc: validateJwt, // validate function defined above
    verifyOptions: {
      algorithms: ['HS256'] // pick a strong algorithm
    }
  });

  server.auth.strategy('userPass', 'basic', {
    validateFunc: validateUserPass
  });

  server.auth.default('jwt');
  // Look through the routes in
  // all the subdirectories of API
  // and create a new route for each
  glob.sync('api/**/routes/*.js', {
    root: __dirname
  }).forEach(file => {
    const route = require(path.join(__dirname, file));
    server.route(route);
  });
});

// Start the server
server.start((err) => {
  if (err) {
    throw err;
  } else {
    console.log('Server Started');
  }
  // Make a connection to the mongodb server
  mongoose.connect(dbUrl, {}, (err) => {
    if (err) {
      throw err;
    } else {
      console.log('Connected to MongoDB');
    }
  });
});

module.exports = server;
