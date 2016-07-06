'use strict';

const Project = require('../models/Project');

module.exports = (req, res) => {
  Project.find((err, projects) => {
    if (err) return console.error(err);
    res(projects);
  });
};
