var Project = require('../models/Project');

module.exports = [{
	// Return all documents from the projects collection
	method: 'GET',
	path: '/projects',
	config: {
		auth: false
	},
	handler: function (req, res) {
		Project.find(function(err, projects){
				if (err) return console.error(err);
				res( projects );
			});
	}
}, {
	// Get a project by that project's object ID
	method: 'GET',
	path: '/projects/{id}',
	config: {
		auth: false
	},
	handler: function (req, res) {
		Project.findById(req.params.id, function(err, project){
			if (err) return console.error(err);
			res( project );
		})
	}
}, {
	// Method for adding will be changed to POST and will require auth
	// It's set to GET for testing purposes
	method: 'GET',
	path: '/projects/add',
	config: {
		auth: false
	},
	handler: function(req, res) {
		var newProject = new Project ({
			title: req.query.title, 
			details: req.query.details
		});
		newProject.save(function (err, newProject) {
			if (err) return console.log(err);
			res(newProject);
		});
		
	}
}];