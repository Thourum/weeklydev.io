'use strict';
const Boom = require('boom');
const Submission = require('../models/Submission');
const submissionSchema = require('../schemas/submissionSchema');
const newSubmissionSchema = require('../schemas/newSubmissionSchema');

module.exports = [{
  method: 'GET',
  path: '/submissions',
  config: {
    auth: 'jwt'
  },
  handler: (req, res) => {
    Submission.find((err, submissions) => {
      if (err) {
        res(Boom.badRequest(err));
      }
      res(submissions);
    });
  }
}, {
  method: 'POST',
  path: '/submissions/new',
  config: {
    validate: {
      payload: newSubmissionSchema
    },
    auth: 'jwt'
  },
  handler: (req, res) => {
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
  }
}, {
  method: 'PUT',
  path: '/submissions/{id}',
  config: {
    validate: {
      payload: submissionSchema // TOOD: make new schema
    },
    auth: 'jwt'
  },
  handler: (req, res) => {
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
    Submission.findByIdAndUpdate(req.params.id, update(), (err, submissions) => {
      if (err) {
        res(Boom.badRequest(err));
      }
      res(submissions);
    });
  }
}, {
  method: 'DELETE',
  path: '/submissions/{id}',
  config: {
    auth: 'jwt'
  },
  handler: (req, res) => {
    Submission.findByIdAndDelete(req.params.id, (err, submissions) => {
      if (err) {
        res(Boom.badRequest(err));
      }
      res(submissions);
    });
  }
}];
