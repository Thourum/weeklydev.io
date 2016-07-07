'use strict';

const Boom = require('boom');
const Team = require('../../models/Team');
const Code = require('../../../../config/errorCodes');

module.exports = (req, res) => {
  Team.findOneById(req.params.id, (err, team) => {
    if (team.requests.lenght >= 10) {
      res(Code.maxRequestsReached);
    }else {
      if (team.requests.indexof(req.payload.user) >= 0) {
        res(Code.alreadyRequested);
      }else {
        team.requests.push({user: req.payload.user, role: req.payload.role, msg: req.payload.msg});
        res({msg: 'Success'}).code(200);
      }
    }
  });
};
