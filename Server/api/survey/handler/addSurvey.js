'use strict';

const Boom = require('boom');
const Survey = require('../models/Survey');
const User = require('../../users/models/User');

module.exports = (req, res) => {
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
};
