var express = require('express');
var request = require('request'); // HTTP request library
var router = express.Router();

router.get('/', function(req, res, next)
{
  res.render('pages/register');
});

module.exports = router;