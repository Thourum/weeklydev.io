var express = require('express');
var router = express.Router();

// GET /
router.get('/', function(req, res, next)
{
  res.render('pages/index');
});

router.get('/register', function(req, res, next){
	res.render('pages/register')
});

router.get('/login', function(req, res, next){
	res.render('pages/index')
});


module.exports = router;