'use strict';

const Boom = require('boom');
const User = require('../models/User');
const createUserSchema = require('../schemas/createUser');
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
		auth: false,
	},
	handler: (req, res) => {

			let user = new User();
			user.email = req.payload.email;
			user.username = req.payload.username;
			user.admin = false;
			user.password = req.payload.password;
			user.token = createToken(user);
			user.token_Expire.Expire = (Date.now() + (24 * 60 * 60));
			user.save((err, user) => {
				if (err) {
					throw Boom.badRequest(err);
				}
				// If the user is saved successfully, Send a JWT
				res({
					id_token: user.token,
				}).code(201);
			});
		},
	}, {
	/**
	 * Update user by ID
	 */
	method: 'PUT',
	path: '/users/{id}',
	config: {
		auth: false
	},
	handler: (req, res) => {
		var id = req.params.id;
		User.findByIdAndUpdate(id, { $set: {
			username: req.payload.username,
			email: req.payload.email,
			admin: req.payload.admin,
			password: req.payload.password
			}}, function (err, user) {
			if (err) return console.error(err);
			res( user );
		});
	}
}, {
	/**
	 * Get all users or one user by id
	 */
	method: 'GET',
	path: '/users/{id?}',
	config: {
		auth: false
	},
	handler: (req, res) => {
		if (req.params.id){
			User.findById(req.params.id, function (err, user) {
				if (err) return console.error(err);
				res( user );
			});
		}
		else {
			User.find(function(err, users){
				if (err) return console.error(err);
				res( users );
			});
		};
	}
},{
	/**
	 * Update user by ID
	 */
	method: 'DELETE',
	path: '/users/{id}',
	config: {
		auth: false
	},
	handler: (req, res) => {
		var id = req.params.id;
		User.findByIdAndRemove(id, (err, user) => {
			if (err) {
				console.error(err);
				res(Boom.wrap(err, 400));
			}
			if (user) {
				res(user).code(200);
			}else{
				res(Boom.notFound('User not found'));
			}
		});
	}
}];