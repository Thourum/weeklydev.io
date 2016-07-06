var _ = require('../handler');
var teamSchema = require('../schemas/teamSchema');

module.exports = [{
  method: 'GET',
  path: '/teams',
  config: {
    auth: 'jwt'
  },
  handler: _.getTeams
}, {
  method: 'POST',
  path: '/teams',
  config: {
    validate: {
      payload: teamSchema
    },
    // pre: [{
    //   method: TODO: add method that checks if team name and projects are taken
    // }],
    auth: 'jwt'
  },
  handler: _.addTeam
}, {
  method: 'PUT',
  path: '/teams/{id}',
  config: {
    validate: {
      payload: teamSchema
    },
    auth: 'jwt'
  },
  handler: _.updateTeam
}, {
  method: 'DELETE',
  path: '/teams/{id}',
  config: {
    auth: 'jwt'
  },
  handler: _.deleteTeam
}];
