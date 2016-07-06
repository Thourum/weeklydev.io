var _ = require('../handler');
var projectSchema = require('../schemas/projectSchema');

module.exports = [{
  // Return all documents from the projects collection
  method: 'GET',
  path: '/projects',
  config: {
    auth: 'jwt'
  },
  handler: _.getProjects
}, {
  // Get a project by that project's object ID
  method: 'GET',
  path: '/projects/{id}',
  config: {
    auth: 'jwt'
  },
  handler: _.getProject
}, {
  method: 'POST',
  path: '/projects/add',
  config: {
    validate: {
      payload: projectSchema
    },
    auth: 'jwt'
  },
  handler: _.addProject
}, {
  method: 'PUT',
  path: '/projects/{id}',
  config: {
    validate: {
      payload: projectSchema
    },
    auth: 'jwt'
  },
  handler: _.updateProject
}];
