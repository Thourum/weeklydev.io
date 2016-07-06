'use strict';

const Project = require('../../models/Project');

module.exports = (req, res) => {
  function update () {
    let obj = {};
    if (req.payload.title) {
      obj.title = req.payload.title;
    }
    if (req.payload.details) {
      obj.details = req.payload.title;
    }
    if (req.payload.deadline) {
      obj.deadline = req.payload.deadline;
    }
    return obj;
  }
  Project.findByIdAndUpdate(req.params.id, update, (err, project) => {
    if (err) {
      res(Boom.badRequest('project not found!'));
    }else {
      res(project);
    }
  });
};
