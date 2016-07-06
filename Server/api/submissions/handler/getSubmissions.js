'use strict';

const Boom = require('boom');
const Submission = require('../models/Submission');

module.exports = (req, res) => {
  Submission.find((err, submissions) => {
    if (err) {
      res(Boom.badRequest(err));
    }
    res(submissions);
  });
};
