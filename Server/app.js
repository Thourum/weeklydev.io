'use strict';

const Hapi = require('Hapi');
const mongoose = require('mongoose');
const Boom = require('boom');
const glob = require('glob');
const path = require('path');
const secret = require('./config');
const server = new Hapi.Server();

// Setup hapi server
server.connection({
	port: process.env.PORT || 1337
});

const dbUrl = 'mongodb://localhost:27017/WOIP-backend';

// Register the jwt auth plugin
server.register(require('hapi-auth-jwt'), (err) => {

	// We're giving the strategy both a name
	// and scheme of 'jwt'
	server.auth.strategy('jwt', 'jwt', {
		key: secret,
		verifyOptions: {
			algorithms: ['HS256']
		}
server.register(require('hapi-auth-jwt2'), (err) => {
	});

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
	}
	// Make a connection to the mongodb server
	mongoose.connect(dbUrl, {}, (err) => {
		if (err) {
			throw err;
		}
	});

});
