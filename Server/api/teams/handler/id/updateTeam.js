'use strict';

const Boom = require('boom');
const Team = require('../../models/Team');

module.exports = (req, res) => {
  Team.findById(req.params.id, (err, team) => {
    if (req.Token.id !== team.owner) {
      res(Boom.unauthorized('only team owner can update team details'));
    }else {
      if (req.payload.owner) {
        team.owner = req.payload.owner;
      }
      if (req.payload.manager && req.payload.manager_role) {}
      team.manager.push({user: req.payload.manager, role: req.payload.manager_role});
      team.frontend.push({user: req.payload.frontend, role: req.payload.frontend_role});
      team.backend.push({user: req.payload.backend, role: req.payload.backend_role});
    }
  });
};
