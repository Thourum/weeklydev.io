var express = require('express');
var request = require('request'); // HTTP request library
var app = express();
var router = express.Router();

// GET
router.get('/', function(req, res, next)
{
  res.render('pages/index');
});

router.get('/profile', function(req, res, next)
{
  if(res.locals.auth)
  {
    res.render('pages/profile');
  }
  else
  {
    res.redirect('/auth/login?url=/profile');
  }
});

module.exports = router;