'use strict';

const Project = require('../models/Project');
const projectSchema = require('../schemas/projectSchema');

module.exports = [{
  // Return all documents from the projects collection
  method: 'GET',
  path: '/projects',
  config: {
    auth: 'jwt'
  },
  handler: (req, res) => {
    Project.find((err, projects) => {
      if (err) return console.error(err);
      res(projects);
    });
  }
}, {
  // Get a project by that project's object ID
  method: 'GET',
  path: '/projects/{id}',
  config: {
    auth: 'jwt'
  },
  handler: (req, res) => {
    Project.findById(req.params.id, (err, project) => {
      if (err) return console.error(err);
      res(project);
    });
  }
}, {
  method: 'POST',
  path: '/projects/add',
  config: {
    validate: {
      payload: projectSchema
    },
    auth: 'jwt'
  },
  handler: (req, res) => {
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
  }
}, {
  method: 'PUT',
  path: '/projects/{id}',
  config: {
    validate: {
      payload: projectSchema
    },
    auth: 'jwt'
  },
  handler: (req, res) => {
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
  }
}];
