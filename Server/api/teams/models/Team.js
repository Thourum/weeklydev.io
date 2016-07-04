'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamModel = new Schema({
  project: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'Project'
  },
  submission: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'Submission'
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  manager: [{
    role: Number,
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  }],
  frontend: [{
    role: Number,
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  }],
  backend: [{
    role: Number,
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  }]
});

module.exports = mongoose.model('Team', TeamModel, 'teams');
