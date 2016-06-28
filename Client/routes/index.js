var express = require('express');
var router = express.Router();

// GET /
router.get('/', function(req, res, next)
{
  res.render('pages/index');
});

router.get('/login', function(req, res, next)
{
  res.render('pages/login');
});

router.get('/register', function(req, res, next)
{
  res.render('pages/register');
});

router.get('/profile', function(req, res, next)
{
  // temporarily redirect to login for now.
  res.redirect('/login');
});

module.exports = router;