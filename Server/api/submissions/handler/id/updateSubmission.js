'use strict';

const Boom = require('boom');
const Submission = require('../../models/Submission');

module.exports = (req, res) => {
  let p = req.payload;
  function update () {
    // TODO: for the love of all holy make this something nicer
    let response = { };
    if (p.project) {
      response.project = p.project;
    }
    if (p.team) {
      response.team = p.team;
    }
    if (p.repo_url) {
      response.repo_url = p.team;
    }
    if (p.thumbnail) {
      response.thumbnail = p.thumbnail;
    }
    if (p.date) {
      response.date.due = p.date;
    }
    return response;
  }
  // TODO: instead of using a function try passing in req.params it self
  Submission.findByIdAndUpdate(req.params.id, update(), (err, submissions) => {
    if (err) {
      res(Boom.badRequest(err));
    }
    res(submissions);
  });
};
