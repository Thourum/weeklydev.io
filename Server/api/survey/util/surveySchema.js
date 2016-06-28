'use strict';

const Survey = require('../models/Survey');
const Boom = require('boom');

module.exports = (req, res) => {
	Survey.findOne({ user_id: req.Token.id }, (err, survey) => {
		if (err) {
			res(Boom.badRequest('Invalid query'));
		}
		console.log(survey);
		if (!survey || !survey == null) {
			res(req.payload);
			return;
		} else {
			res(Boom.badRequest('To update your survey use PUT!'));
		}
	});
}