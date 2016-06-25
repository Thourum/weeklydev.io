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
		auth: false,
		// Before the route handler runs, verify that
		// the user is unique and assign the result to 'user'
		pre: [{
			method: verifyUniqueUser,
			assign: 'user'
		}],
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

		// Validate the payload against the Joi schema
		validate: {
			payload: createUserSchema
		}
	}
}, {
	method: 'GET',
	path: '/users',
	config: {
		auth: false
	},
	handler: (req, res) => {
		res({
			success: true,
			message: "List of users"
		});
	}
}];