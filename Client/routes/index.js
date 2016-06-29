var express = require('express');
var request = require('request'); // HTTP request library
var router = express.Router();

// authentication check middleware
// sets req.auth = true if we have a token.
router.get('/*', function(req, res, next)
{
  if (req.cookies.weeklydev_auth_token && req.cookies.weeklydev_auth_token != 'undefined')
  {
    req.auth = true;
    req.token = req.cookies.weeklydev_auth_token;
  }
  else
  {
    req.auth = false;
  }

  next();
})

// GET
router.get('/', function(req, res, next)
{
  res.render('pages/index');
});

router.get('/profile', function(req, res, next)
{
  if(req.auth)
  {
    res.render('pages/profile', {token: req.token});
  }
  else
  {
    res.redirect('/auth/login?url=/profile');
  }
});

module.exports = router;