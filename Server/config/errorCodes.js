// This can be used for easy identification of a problem
// and not scrathing your head what happend and why are 
// you getting that error that just says the same thing
// over and over again

// error code organization
// 	Register			: 	1xx
// 	Login					: 	2xx
// 	User 					: 	3xx
// 	Survey 				: 	4xx
// 	Team 					: 	5xx
// 	Projects 			: 	6xx
// 	Submissions 	: 	7xx
'use strict';
const Boom = require('boom');
function applyErroCode (error) {
  error.output.payload.errorCode = error.data.errorCode;
  return error;
}
module.exports = {
  notOwner: applyErroCode(Boom.create(401, 'You are not owner of this team', { errorCode: 500})),
  userInTeam: applyErroCode(Boom.create(400, 'User already on team', { errorCode: 501 })),
  maxUsersInRole: applyErroCode(Boom.create(400, 'Maximum users in role reached', { errorCode: 502 })),
  maxRequestsReached: applyErroCode(Boom.create(400, 'Maximum requests reached', { errorCode: 505 })),
  alreadyRequested: applyErroCode(Boom.create(400, 'You already requested to join this team', { errorCode: 506}))
};
