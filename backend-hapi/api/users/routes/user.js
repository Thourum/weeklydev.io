'use strict';

const Boom = require('boom');
const User = require('../models/User');
const createUserSchema = require('../schemas/createUser');
const verifyUniqueUser = require('../util/userFunctions').verifyUniqueUser;
const createToken = require('../util/token');

// function hashPassword(password, cb) {
// 	// Generate a salt at level 10 strength
// 	bcrypt.genSalt(10, (err, salt) => {
// 		bcrypt.hash(password, salt, (err, hash) => {
// 			return cb(err, hash);
// 		});
// 	});
// }

module.exports = {
	method: 'POST',
	path: '/api/users',
	config: {
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
			user.save((err, user) => {
				if (err) {
					throw Boom.badRequest(err);
				}
				// If the user is saved successfully, Send a JWT
				res({
					id_token: createToken(user)
				}).code(201);
			});
		},

		// Validate the payload against the Joi schema
		validate: {
			payload: createUserSchema
		}
	}
}
