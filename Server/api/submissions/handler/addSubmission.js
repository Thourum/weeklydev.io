'use strict';

const Boom = require('boom');
const Submission = require('../models/Submission');

module.exports = (req, res) => {
  let submission = new Submission();
  let p = req.payload;
  submission.project = p.project;
  submission.team = p.team;
  submission.repo_url = p.repo_url;
  if (p.thumbnail) {
    submission.thumbnail = p.thumbnail;
  }
  if (p.images) {
    submission.images = p.images;
  }
  if (p.date) {
    submission.date.due = p.date;
  }

  submission.save((err, submission) => {
    if (err) {
      res(Boom.badRequest(err));
    }
    res(submission);
  });
};
