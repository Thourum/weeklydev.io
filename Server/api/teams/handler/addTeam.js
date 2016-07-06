'use strict';

const Boom = require('boom');
const Team = require('../models/Team');
const getRoles = require('../util/teamFunctions').getRoles;
const arrayChecker = require('../util/teamFunctions').arrayChecker;

module.exports = (req, res) => {
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
};
