'use strict';

const Joi = require('joi');

const LoginUser = Joi.object({
	username: Joi.string().max(30).required(),
	password: Joi.string().max(30).required(),
	token: Joi.string()
});

module.exports = LoginUser;
