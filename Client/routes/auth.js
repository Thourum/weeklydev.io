var express = require('express');
var request = require('request'); // HTTP request library
var router = express.Router();

// GET
router.get('/login', function (req, res, next) {
  res.render('pages/login');
});

router.get('/register', function (req, res, next) {
  res.render('pages/register');
});

router.get('/logout', function (req, res, next) {
  // to logout, clear the cookie and redirect to home.
  res.clearCookie('weeklydev_auth_token');
  res.redirect('/');
});

// POST

router.post('/login', function (req, res, next) {
  var username = req.body.email;
  var password = req.body.password;

  if (!username || !password) {
    res.render('pages/login', {error: 'Please enter both a username and a password'});
  }

  // API HTTP request options
  var requestOptions = {
    url: 'http://localhost:1337/login',
    headers: {
      'Authorization': 'Basic ' + (new Buffer(username + ':' + password).toString('base64'))
    }
  };

  // send request to API
  request.post(requestOptions, function (error, response, body) {
    // if there are database errors, send an error message.
    if (error) {
      console.log('/Login error - ' + error.Error);
      res.render('pages/login', {error: "Couldn't connect to the database. Please contact a system administrator."});
      return;
    }

    // parse body for easier value retrieval.
    var jsonBody = JSON.parse(body);

    // if we got a login error from the API, log that message.
    if (jsonBody.error) {
      console.log('Login error - ' + jsonBody.message);
      res.render('pages/login', { error: 'Invalid email or password.' });
      return;
    }

    // set token cookie. Lasts for 24 hours.
    res.cookie('weeklydev_auth_token', jsonBody.token, {maxAge: 24 * 60 * 60});

    if (req.params.url) {
      res.redirect(req.params.url);
    } else {
      res.redirect('/profile');
    }
  });
});

module.exports = router;
