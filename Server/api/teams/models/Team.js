'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamModel = new Schema({
  project_id: {
    type: ObjectId,
    required: true
  },
  project_submission_id: {
    type: ObjectId,
    required: true
  },
  project_manager: {
    type: ObjectId,
    required: true
  },
  lead_frontend: {
    type: ObjectId,
    required: true
  },
  frontend: {
    type: ObjectId,
    required: true
  },
  lead_backend: {
    type: ObjectId,
    required: true
  },
  backend: {
    type: ObjectId,
    required: true
  }
});

module.exports = mongoose.model('Team', TeamModel, 'teams');
