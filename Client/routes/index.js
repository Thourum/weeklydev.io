var express = require('express');
var router = express.Router();

// GET /
router.get('/', function(req, res, next)
{
  res.render('pages/index');
});

<<<<<<< HEAD
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
})

=======
router.get('/register', function(req, res, next){
	res.render('pages/register')
});

router.get('/login', function(req, res, next){
	res.render('pages/index')
});

>>>>>>> e44839d07a2f8b3e8839de3f11e8f01c24994d17

module.exports = router;