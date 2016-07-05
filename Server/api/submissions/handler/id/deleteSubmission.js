'use strict';

const Boom = require('boom');
const Submission = require('../../models/Submission');

module.exports = (req, res) => {
  Submission.findByIdAndDelete(req.params.id, (err, submissions) => {
    if (err) {
      res(Boom.badRequest(err));
    }
    res(submissions);
  });
};
