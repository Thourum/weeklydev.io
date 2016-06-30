'use strict';

const Joi = require('joi');

const createUserSchema = Joi.object({
  username: Joi.string().alphanum().min(5).max(40).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

module.exports = createUserSchema;
