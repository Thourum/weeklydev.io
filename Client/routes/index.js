var express = require('express');
// var request = require('request'); // HTTP request library
var router = express.Router();

// GET
router.get('/', function (req, res, next) {
  res.render('pages/index');
});

module.exports = router;
