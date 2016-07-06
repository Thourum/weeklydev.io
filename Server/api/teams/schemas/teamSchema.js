'use strict';

const Joi = require('joi');

const teamSchema = Joi.object({
  manager: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)).length(1).required(),
  backend: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)).min(1).max(3).required(),
  frontend: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)).min(1).max(3).required(),
  manager_role: Joi.array().items(Joi.number().min(0).max(5)).required(),
  backend_role: Joi.array().items(Joi.number().min(0).max(5)).required(),
  frontend_role: Joi.array().items(Joi.number().min(0).max(5)).required()
});

module.exports = teamSchema;
