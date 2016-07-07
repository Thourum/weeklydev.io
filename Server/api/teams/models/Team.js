'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamModel = new Schema({
  project: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'Project',
    dafault: null
  },
  submission: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'Submission',
    dafault: null
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
  }],
  requests: [{
    user: Schema.Types.ObjectId,
    role: String,
    msg: String
  }],
  meta: {
    created: {type: Date, default: Date.now()},
    disband: Date,
    members: [{
      id: Schema.Types.ObjectId,
      date: {
        joined: {type: Date, default: Date.now()},
        leave: Date
      }
    }]
  }
});

module.exports = mongoose.model('Team', TeamModel, 'teams');
