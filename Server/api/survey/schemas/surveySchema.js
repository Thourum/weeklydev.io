'use strict';

const Joi = require('joi');

const surveySchema = Joi.object({
  role: Joi.array().items(Joi.string().allow(['frontend', 'backend', 'project manager'])).min(1).max(3).required(),
  projectManager: Joi.boolean().required(),
  skill: Joi.number().min(0).max(5).required(),
  size: Joi.number().min(3).max(5).required(),
  timezone: Joi.number().min(-12).max(12).required()
});

module.exports = surveySchema;
