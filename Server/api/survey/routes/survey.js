'use strict';

const Boom = require('boom');
const Survey = require('../models/Survey');
const User = require('../../users/models/User');
const createNewSurvey = require('../util/surveySchema');
const surveySchema = require('../schemas/surveySchema');
// const surveySchema = require('../schemas/survey')

module.exports = [{
  method: 'GET',
  path: '/surveys',
  config: {
    // Validate the payload against the Joi schema
    // NOTE: Do we need this?
    validate: {
      // payload: surveySchema
    },
    auth: 'jwt'
  },
  handler: (req, res) => {
    Survey.findOne({
      user_id: req.Token.id
    }, (err, survey) => {
      res(((survey) ? survey : {
        msg: 'No Survey found!'
      })).code(200);
    });
  }
}, {
  method: 'PUT',
  path: '/surveys',
  config: {
    // Validate the payload against the Joi schema
    validate: {
      payload: surveySchema
    },
    auth: 'jwt'
  },
  handler: (req, res) => {
    let payload = req.payload;
    Survey.findOneAndUpdate({
      user_id: req.Token.id
    }, {
      user_id: req.Token.id,
      preferred_role: payload.role,
      project_manager: payload.projectManager,
      skill_level: payload.skill,
      project_size: payload.size,
      timezone: payload.timezone
    }, (err, survey) => {
      if (err) {
        res(Boom.badRequest(err));
      }
      if (!survey) {
        res(Boom.unauthorized('Survey not found'));
      }
      User.findByIdAndUpdate(req.Token.id, {
        survey_id: survey.id
      }, (err, user) => {
        if (err) {
          res(Boom.badRequest(err));
        }
        if (!user) {
          res(Boom.unauthorized('User not found'));
        }
        user.save((err) => {
          if (err) {
            res(Boom.badRequest(err));
          }
          res(survey);
        });
      });
    });
  }
}, {
  method: 'POST',
  path: '/surveys',
  config: {
    // Validate the payload against the Joi schema
    validate: {
      payload: surveySchema
    },
    auth: 'jwt'
  },
  handler: (req, res) => {
    let payload = req.payload;

    var survey = new Survey();
    survey.user_id = req.Token.id;
    survey.preferred_role = payload.role;
    survey.project_manager = payload.projectManager;
    survey.skill_level = payload.skill;
    survey.project_size = payload.size;
    survey.timezone = payload.timezone;
    survey.save((err, survey) => {
      if (err) {
        throw Boom.badRequest(err);
      }
      User.findByIdAndUpdate(req.Token.id, {
        survey_id: survey.id
      }, (err, user) => {
        if (err) {
          res(Boom.badRequest(err));
        }
        if (!user) {
          res(Boom.unauthorized('User not found'));
        }
        user.save((err) => {
          if (err) {
            res(Boom.badRequest(err));
          }
        });
      });
      res(survey);
      return;
    });
  }
}];
