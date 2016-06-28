var express = require('express');
var request = require('request'); // HTTP request library
var router = express.Router();

router.get('/', function(req, res, next)
{
  res.render('pages/login');
});

router.post('/', function(req, res, next)
{
  var username = req.body.email;
  var password = req.body.password;

  if(!username || !password)
  {
    res.render('pages/login', {error: "Please enter both a username and a password"});
  }

  var requestOptions = 
  {
    url: 'http://localhost:1337/login',
    headers: 
    {
      'Authorization' : 'Basic ' + (new Buffer(username + ':' + password).toString('base64'))
    }
  }

  // send request to API
  request.post(requestOptions, function(error, response, body)
  {
    if(error || body.error)
    {
      res.redirect('/login');
    }

    // set token cookie. Lasts for 24 hours.
    res.cookie('weeklydev_auth_token', JSON.parse(body).token, {maxAge: 24*60*60});
    res.redirect('/profile');
  });

});

module.exports = router;