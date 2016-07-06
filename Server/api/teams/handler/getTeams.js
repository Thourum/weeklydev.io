'use strict';

const Boom = require('boom');
const Team = require('../models/Team');

module.exports = (req, res) => {
  Team.find().populate('manager.user frontend.user backend.user', 'id username is_searching project team').exec((err, team) => {
    res(team);
  });
};
