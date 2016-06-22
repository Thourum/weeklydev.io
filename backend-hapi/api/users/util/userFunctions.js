'use strict';

const Boom = require('boom');
const User = require('../models/User');

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

module.exports = {
	verifyUniqueUser: verifyUniqueUser
}
