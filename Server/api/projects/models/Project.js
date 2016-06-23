'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ProjectModel = new Schema({
	title: {
		type: String,
		required: true
	},
	details: {
		type: String,
		required: true
	},
	deadline: {
		type: String,
		required: true
	},
	init_timestamp: {
		type: Date,
		required: true
	}
});

module.exports = mongoose.model('Project', ProjectModel, 'projects');
