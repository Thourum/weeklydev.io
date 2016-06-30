'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ProjectModel = new Schema({
  title: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  deadline: {
    type: String,
    required: false
  },
  created_on: {
    type: Date,
    required: false
  }
});

module.exports = mongoose.model('Project', ProjectModel);
