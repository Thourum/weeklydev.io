'use strict';

const Boom = require('boom');
const User = require('../models/User');
const createToken = require('./token');

function verifyUniqueUser(req, res) {
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
function authenticateUser(req, res) {
	if (req.payload.token) {
		User.findOne({token: req.payload.token}, (err, user) =>{
			if (err) {
				res(Boom.badRequest('Invalid token'));
			}
			if (user.token_Expire.Expire >= Date.now()) {
				res(Boom.unauthorized('Token expired'))
			}
			// refresh token and send a new one
			var newToken = createToken(user);
			user.token = newToken;
			user.token_Expire.set = Date.now();
			user.token_Expire.Expire = (Date.now() + 24 * 60 * 60);
			user.save((err,user) => {
				if (err) {
					console.log('something went wrong');
					console.log(err);
					res(Boom.wrap(Boom.create(500, 'Internal Server Error', { timestamp: Date.now() })));
				}
				res({
					id_token: user.token // send new token
				});
			})
		});
	}else{
		User.findOne({username: req.payload.username}, (err, user) => {
			if (err) {
				res(Boom.badRequest('Incorrect username'));
			}
			// NOTE: this should catch if username is incorrect so later on we can count on that the username is corret however some error may still apear
			res(req.payload);
		});
	}
}

module.exports = {
	verifyUniqueUser: verifyUniqueUser,
	authenticateUser: authenticateUser,
}
