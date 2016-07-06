'use strict';

const Project = require('../models/Project');

module.exports = (req, res) => {
  let project = new Project();

  project.title = req.payload.title,
  project.details = req.payload.details;
  if (req.payload.deadline) {
    project.deadline = req.payload.deadline;
  }

  project.save((err, project) => {
    if (err) return console.log(err);
    res(newProject);
  });
};
