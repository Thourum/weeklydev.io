'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TeamModel = new Schema({
	project_id: {
		type: String,
		required: true
	},
	project_submission_id: {
		type: String,
		required: true
	},
	project_manager: {
		type: String,
		required: true
	},
	lead_frontend: {
		type: String,
		required: true
	},
	frontend: {
		type: String,
		required: true
	},
	lead_backend: {
		type: String,
		required: true
	},
	backend: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('Team', TeamModel, 'teams');
