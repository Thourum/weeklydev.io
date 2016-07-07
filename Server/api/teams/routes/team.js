var _ = require('../handler');
var teamSchema = require('../schemas/teamSchema');

module.exports = [{
  // Lists all Teams (disabled or not)
  method: 'GET',
  path: '/teams',
  config: {
    auth: 'jwt'
  },
  handler: _.getTeams
}, {
  // Create a new team
  method: 'POST',
  path: '/teams',
  config: {
    validate: {
      payload: teamSchema
    },
    // pre: [{
    //   method: 
    // TODO: add method that checks if team name and projects are taken
    // NOTE: also check if team name is taken, the owner of the team can create only 3 team max.
    // }],
    auth: 'jwt'
  },
  handler: _.addTeam
}, {
  // Bulk update
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
  // Delete a team by ID if you are the owner or admin 
  // TODO: autodelete the team after some period of inactivity
  method: 'DELETE',
  path: '/teams/{id}',
  config: {
    auth: 'jwt'
  },
  handler: _.deleteTeam
}, {
  // Add a user to team (only owner)
  method: 'POST',
  path: '/teams/{id}/add',
  config: {
    // validate: {
    //   payload: teamSchema // TOOD: add a new validation otherwise this will not work
    // },
    auth: 'jwt'
  },
  handler: _.addUserToTeam
}, {
  // Request a join to a team (every User)
  method: 'POST',
  path: '/teams/{id}/join',
  config: {
    // validate: {
    //   payload: teamSchema // TOOD: add a new validation otherwise this will not work
    // },
    auth: 'jwt'
  },
  handler: _.requestJoinToTeam
}];
