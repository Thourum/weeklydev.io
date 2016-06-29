'use strict';

const Survey = require('../models/Survey');
const Boom = require('boom');
const validateRole = require('../util/validateRole');
const createNewSurvey = require('../util/surveySchema');
// const surveySchema = require('../schemas/survey');

module.exports = [{
	method: 'GET',
	path: '/surveys',
	config:{
		// Validate the payload against the Joi schema
		// NOTE: Do we need this?
		validate: {
			// payload: surveySchema; 
		},
		auth: 'jwt', // TODO: Add Session auth
	},
	handler: (req, res) => {
		Survey.findOne({ user_id: req.Token.id }, (err, survey) =>{
			res(((survey)? survey: {msg: "No Survey found!"})).code(200);
		})
	}
},{
	method: 'PUT',
	path: '/surveys',
	config:{
		// Validate the payload against the Joi schema
		// pre: [{
		// 	method: createNewSurvey,
		// }],

		validate: {
			// payload: surveySchema; 
		},
		auth: 'jwt',
	},
	handler: (req, res) => {
		let payload = req.payload;
		Survey.findOneAndUpdate({user_id : req.Token.id},{
			//TODO: move checks
			user_id: req.Token.id,
			preferred_role: validateRole(payload.role),
			project_manager: payload.projectManager,
			skill_level: ((payload.skill >= 1 && payload.skill 		<= 5) 	? payload.skill : 1),
			project_size: ((payload.size >= 5 && payload.size 		<= 20) 	? payload.size : 5),
			timezone: ((payload.timezone >= 0 && payload.timezone <= 24)	? payload.timezone : 12),
		},(err, survey) => {
			if (err) {
				res(Boom.badRequest(err));
			}
			if (!survey) {
				res(Boom.unauthorized('Survey not found'));
			}
			User.findByIdAndUpdate(req.Token.id, {survey_id: survey.id}, (err, user) => {
				if (err) {
					res(Boom.badRequest(err));
				}
				if (!user){
					res(Boom.unauthorized('User not found'));
				}
				user.save((err)=> {
					if (err) {
						res(Boom.badRequest(err));
					}
					res(survey);
				});
			});
		});
	}
},{
	method: 'POST',
	path: '/surveys',
	config:{
		// Validate the payload against the Joi schema
		pre: [{
			method: createNewSurvey,
		}],

		validate: {
			// TODO: do survey post validation schema
			// payload: surveySchema; 
		},
		auth: 'jwt', // TODO: Add Session auth
	},
	handler: (req, res) => {
		let payload = req.payload;

		var survey = new Survey();
		survey.user_id = req.Token.id;
		survey.preferred_role = validateRole(payload.role);
		survey.project_manager = payload.projectManager;
		survey.skill_level = ((payload.skill >= 1 && payload.skill 		<= 5) 	? payload.skill : 1);
		survey.project_size = ((payload.size >= 5 && payload.size 		<= 20) 	? payload.size : 5);
		survey.timezone = ((payload.timezone >= 0 && payload.timezone <= 24)	? payload.timezone : 12);
		survey.save((err, user) => {
			if (err) {
				throw Boom.badRequest(err);
			}
			res(survey);
			return
		});	
	}
}]
