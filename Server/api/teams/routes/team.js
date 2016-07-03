'use strict';

const Boom = require('boom');
const Team = require('../models/Team');
const User = require('../../users/models/User');

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
    // pre: [{
    //   method: 
    // }],

    validate: {
      // payload: surveySchema
    },
    auth: 'jwt'
  },
  handler: (req, res) => {
    let team = new Team();
    team.manager.push({user: req.payload.manager, role: req.payload.manager_role});
    team.frontend.push({user: req.payload.frontend, role: req.payload.frontend_role});
    team.frontend.push({user: req.payload.backend, role: req.payload.backend_role});
    team.save((err, team) => {
      if (err) {
        console.log(err);
        res(err);
      }else {
        res({msg: 'created', id: team.id});
      }
    });
  }
}, {
  method: 'PUT',
  path: '/teams',
  config: {
    // Validate the payload against the Joi schema
    // pre: [{
    //   method: 
    // }],

    validate: {
      // payload: surveySchema
    },
    auth: 'jwt'
  },
  handler: (req, res) => {
    res();
  }
}, {
  method: 'DELETE',
  path: '/teams',
  config: {
    // Validate the payload against the Joi schema
    // pre: [{
    //   method: 
    // }],

    validate: {
      // payload: surveySchema
    },
    auth: 'jwt'
  },
  handler: (req, res) => {
    res();
  }
}];
