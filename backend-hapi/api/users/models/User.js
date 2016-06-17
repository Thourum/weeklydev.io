'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserModel = new Schema({
	email: {
		type: String,
		required: true,
		index: {
			unique: true
		}
	},
	username: {
		type: String,
		required: true,
		index: {
			unique: true
		}
	},
	admin: {
		type: Boolean,
		required: true
	}
});

module.exports = mongoose.model('User', UserModel, 'users');
