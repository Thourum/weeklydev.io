'use strict';

const Hapi = require('Hapi');
const mongoose = require('mongoose');
const Boom = require('boom');
const glob = require('glob');
const path = require('path');
const jwt = require('jsonwebtoken');
const secret = require('./config');
const server = new Hapi.Server();
const validate = require('./verify.js');

// Setup hapi server
server.connection({
	port: process.env.PORT || 1337,
	routes: {cors: true}
});

const dbUrl = 'mongodb://localhost:27017/WOIP-backend';

// Register the jwt auth plugin
server.register(require('hapi-auth-jwt2'), (err) => {

	server.auth.strategy('jwt', 'jwt',{
		key: secret,          		// Never Share your secret key
		validateFunc: validate,   // validate function defined above
		verifyOptions: { 
			algorithms: [ 'HS256' ] // pick a strong algorithm
		}
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
	}
	else {
		console.log("Server Started");
	}
	// Make a connection to the mongodb server
	mongoose.connect(dbUrl, {}, (err) => {
		if (err) {
			throw err;
		}
		else {
			console.log("Connected to MongoDB");
		}
	});

});
