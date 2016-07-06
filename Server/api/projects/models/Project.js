'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ProjectModel = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  deadline: {
    type: Date,
    required: false
  },
  created_on: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Project', ProjectModel);
