var _ = require('../handler');
var createNewSurvey = require('../util/surveySchema');
var surveySchema = require('../schemas/surveySchema');
// const surveySchema = require('../schemas/survey')

module.exports = [{
  method: 'GET',
  path: '/surveys',
  config: {
    // Validate the payload against the Joi schema
    // NOTE: Do we need this?
    validate: {
      // payload: surveySchema
    },
    auth: 'jwt'
  },
  handler: _.getSurvey
}, {
  method: 'PUT',
  path: '/surveys',
  config: {
    // Validate the payload against the Joi schema
    validate: {
      payload: surveySchema
    },
    auth: 'jwt'
  },
  handler: _.updateSurvey
}, {
  method: 'POST',
  path: '/surveys',
  config: {
    // Validate the payload against the Joi schema
    validate: {
      payload: surveySchema
    },
    auth: 'jwt'
  },
  handler: _.addSurvey
}];
