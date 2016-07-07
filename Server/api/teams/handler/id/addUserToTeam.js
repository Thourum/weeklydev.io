'use strict';

const Boom = require('boom');
const Team = require('../../models/Team');
const Code = require('../../../../config/errorCodes');
const findUserInTeam = require('../../util/teamFunctions').findUserInTeam;
// TOOD: figure out a way to store a config admin can edit on the website
// NOTE: ex. (Max manager in a team: 2, Max backend developers in a team: 4, max time team can be inacive before deletion: 2W )

module.exports = (req, res) => {
  Team.findOneById(req.params.id, (err, team) => {
    if (req.Token.id === team.owner) {
      if (findUserInTeam(user, [team.manager, team.backend, team.frontend])) {
        res(Code.userInTeam);
      }else {
        switch (req.payload.role) {
          case 'manager':
            if (team.manager.lenght >= 1) {
              res(Code.maxUsersInRole);
            } else {
              team.manager.push({user: req.payload.user, role: req.payload.level});
            }
            break;
          case 'backend':
            if (team.backend.lenght >= 2) {
              res(Code.maxUsersInRole);
            }else {
              team.backend.push({user: req.payload.user, role: req.payload.level});
            }
            break;
          case 'frontend':
            if (team.frontend.lenght >= 2) {
              res(Code.maxUsersInRole);
            }else {
              team.frontend.push({user: req.payload.user, role: req.payload.level});
            }
            break;
          default:
            // This shouldn't happend
            console.log(req.payload);
        }
        team.meta.members.push({id: req.payload.user});
        res(team);
      }
    }
  });
};
