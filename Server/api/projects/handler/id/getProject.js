'use strict';

const Project = require('../../models/Project');

module.exports = (req, res) => {
  Project.findById(req.params.id, (err, project) => {
    if (err) return console.error(err);
    res(project);
  });
};
