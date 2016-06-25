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
		auth: false,
		pre: [{
			method: authenticateUser,
			assign: 'user'
		}],
		handler: (req, res) => {
			User.findOne({username: req.payload.username}).exec()
				.then( user => {
					user.authenticate(req.payload.password, (err, result) => {
						if (result) {
							// Refresh  token
							user.token = createToken(user);
							user.token_Expire.Expire = (Date.now() + (24 * 60 * 60));

							res({
								id_token: user.token // send new token
							}).code(200);	
						}else {
							res(Boom.unauthorized('Invalid password'));
						}
					});
			});
		},
		
				// Validate the payload against the Joi schema
		validate: {
			payload: loginUserSchema
		}
	}
};
