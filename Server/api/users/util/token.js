'use strict';

const jwt = require('jsonwebtoken');
const secret = require('../../../config');

function createToken(user) {
	let scopes;
	// Check if the user object passed in
	// has admin set to true, and if so, set
	// scopes to admin
	if (user.admin) {
		scopes = 'admin';
	}
	// Sign the JWT
	return jwt.sign({
		id: user._id,
		username: user.username,
		scope: scopes,
		random: user.makeSalt(Math.floor(Math.random() * (99 - 10) + 10)).toString('Base64') // a bit of randomization // TODO: should be more random then this...
	}, secret, {
		algorithm: 'HS256',
		expiresIn: "24h"
	});
}

module.exports = createToken;
