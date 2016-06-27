'use strict';

const User = require('../models/User');
const loginUserSchema = require('../schemas/loginUser');
const authenticateUser = require('../util/userFunctions').authenticateUser;
const createToken = require('../util/token');
const Boom = require('boom');


module.exports = {
	method: 'POST',
	path: '/login',
	config: {
		// Validate the payload against the Joi schema
		validate: {
			payload: loginUserSchema
		},
		pre: [{
			method: authenticateUser,
			assign: 'user'
		}],
		auth: 'userPass', // Requires basic auth (username:password)
	},
	handler: (req, res) => {
		User.findOne({username: req.payload.username}, (err, user) => {
			// returns some non-sensitive informations about the user
			// TODO: [2] Should alse set cookie with the jwt
			res({
				id: user.id,
				role: ((user.admin) ? 'admin': 'user'),
				username: user.username,
				token: user.token,
			}).code(200);
		});
	},
};
