var express = require('express');
// var request = require('request'); // HTTP request library
var router = express.Router();

// GET
router.get('/', function (req, res, next) {
  if (res.locals.auth) {
    res.render('pages/profile', {username: req.session.user.username});
  } else {
    res.redirect('/auth/login?url=/profile');
  }
});

module.exports = router;
