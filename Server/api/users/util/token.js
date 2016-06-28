'use strict';

const jwt = require('jsonwebtoken');
const secret = require('../../../config');

function createToken(user, expires) {
	let scopes = 'user';
	// Check if the user object passed in
	// has admin set to true, and if so, set
	// scopes to admin
	if (user.admin) {
		scopes = 'admin';
	}

	expires = expires || '24H';

	// Sign the JWT
	return jwt.sign({
		id: user._id,
		uuid: user.token_uuid,
		username: user.username,
		scope: scopes,
	}, secret, {
		algorithm: 'HS256',
		expiresIn: expires // exp: in 24H
	});
}

module.exports = createToken;
