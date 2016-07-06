'use strict';

const Joi = require('joi');

const submissionSchema = Joi.object({
  team: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
  project: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
  repo_url: Joi.string().regex(require('../util/urlRegEx')(['github', 'bitbucket', 'gitlab'], ['com', 'org'])).required(),
  // TODO: add url regex
  images: Joi.string(),
  thumbnail: Joi.string(),
  date: Joi.date().min('now')
});

module.exports = submissionSchema;
