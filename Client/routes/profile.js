var express = require('express');
// var request = require('request'); // HTTP request library
var router = express.Router();

// authentication middleware
router.get('/*', function (req, res, next) {
  // protectPage automatically calls next.
  res.protectPage(req, res, next);
});

// GET
router.get('/', function (req, res, next) {
  res.render('pages/profile', {username: req.session.user.username});
});

module.exports = router;
