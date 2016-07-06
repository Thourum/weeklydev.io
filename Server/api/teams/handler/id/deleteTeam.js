'use strict';

const Boom = require('boom');
const Team = require('../../models/Team');

module.exports = (req, res) => {
  Team.findByIdAndRemove(req.params.id, (err, team) => {
    res({msg: 'succes', team: team});
  });
};
