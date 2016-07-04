'use strict';

const Boom = require('boom');
const Team = require('../models/Team');
const User = require('../../users/models/User');
const teamSchema = require('../schemas/teamSchema');
const Functions = require('../util/teamFunctions');
const getRoles = Functions.getRoles;
const arrayChecker = Functions.arrayChecker;

module.exports = [{
  method: 'GET',
  path: '/teams',
  config: {
    auth: 'jwt'
  },
  handler: (req, res) => {
    Team.find().populate('manager.user frontend.user backend.user', 'id username is_searching project team').exec((err, team) => {
      res(team);
    });
  }
}, {
  method: 'POST',
  path: '/teams',
  config: {
    // Validate the payload against the Joi schema
    validate: {
      payload: teamSchema
    },
    // pre: [{
    //   method: 
    // }],
    auth: 'jwt'
  },
  handler: (req, res) => {
    let team = new Team();
    let p = req.payload;
    console.log(p);
    if (!arrayChecker([p.manager , p.backend, p.frontend], [p.manager_role, p.backend_role, p.frontend_role])) {
      res(Boom.badRequest('arrays of "role" and "*_role" must be the same length'));
      return;
    }else {
      team.owner = req.Token.id;
      team.manager = getRoles(p.manager, p.manager_role);
      team.backend = getRoles(p.backend, p.backend_role);
      team.frontend = getRoles(p.frontend, p.frontend_role);
      team.save((err, team) => {
        if (err) {
          console.log(err);
          res(err);
        }else {
          res({msg: 'created', id: team.id});
        }
      });
    }
  }
}, {
  method: 'PUT',
  path: '/teams/{id}',
  config: {
    // Validate the payload against the Joi schema
    // pre: [{
    //   method: 
    // }],

    validate: {
      payload: teamSchema
    },
    auth: 'jwt'
  },
  handler: (req, res) => {
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
  }
}, {
  method: 'DELETE',
  path: '/teams/{id}',
  config: {
    // Validate the payload against the Joi schema
    auth: 'jwt'
  },
  handler: (req, res) => {
    Team.findByIdAndRemove(req.params.id, (err, team) => {
      res({msg: 'succes', team: team});
    });
  }
}];
