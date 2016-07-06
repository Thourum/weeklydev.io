var _ = require('../handler');
var submissionSchema = require('../schemas/submissionSchema');
var newSubmissionSchema = require('../schemas/newSubmissionSchema');

module.exports = [{
  method: 'GET',
  path: '/submissions',
  config: {
    auth: 'jwt'
  },
  handler: _.getSubmissions
}, {
  method: 'POST',
  path: '/submissions/new',
  config: {
    validate: {
      payload: newSubmissionSchema
    },
    auth: 'jwt'
  },
  handler: _.addSubmission
}, {
  method: 'PUT',
  path: '/submissions/{id}',
  config: {
    validate: {
      payload: submissionSchema // TOOD: make new schema
    },
    auth: 'jwt'
  },
  handler: _.updateSubmission
}, {
  method: 'DELETE',
  path: '/submissions/{id}',
  config: {
    auth: 'jwt'
  },
  handler: _.deleteSubmission
}];
