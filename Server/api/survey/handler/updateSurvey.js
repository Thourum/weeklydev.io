'use strict';

const Boom = require('boom');
const Survey = require('../models/Survey');
const User = require('../../users/models/User');

module.exports = (req, res) => {
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
};
