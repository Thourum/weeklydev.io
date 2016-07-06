'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubmissionModel = new Schema({
  project: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Project'
  },
  team: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Team'
  },
  repo_url: { type: String, required: true },
  thumbnail: String,
  images: [String],
  date: {
    created: { type: Date, default: Date.now },
    due: Date
  }
});

module.exports = mongoose.model('Submission', SubmissionModel, 'submissions');
