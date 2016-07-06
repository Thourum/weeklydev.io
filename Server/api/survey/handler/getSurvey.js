'use strict';

const Boom = require('boom');
const Survey = require('../models/Survey');
const User = require('../../users/models/User');

module.exports = (req, res) => {
  Survey.findOne({
    user_id: req.Token.id
  }, (err, survey) => {
    res(((survey) ? survey : {
      msg: 'No Survey found!'
    })).code(200);
  });
};
