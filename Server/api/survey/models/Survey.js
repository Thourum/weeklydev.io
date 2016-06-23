'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const SurveyModel = new Schema({
	user_id: {
		type: ObjectId,
		required: true
	},
	preferred_role: {
		type: String,
		required: true
	}
	willing_project_manager: {
		type: Boolean,
		required: true
	},
	skill_level: {
		type: Number,
		required: true
	},
	project_size: {
		type: Number,
		required: true
	},
	timezone: {
		type: Number,
		required: true
	}
});

module.exports = mongoose.model('Survey', SurveyModel, 'survey');
