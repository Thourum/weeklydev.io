var express = require('express');
var request = require('request'); // HTTP request library
var router = express.Router();
var serverHost = require('../config').SERVER_HOST;

// GET
router.get('/login', function (req, res, next) {
  res.render('pages/login');
});

router.get('/register', function (req, res, next) {
  res.render('pages/register');
});

router.get('/logout', function (req, res, next) {
  // to logout, clear the cookie and redirect to home.
  req.session.destroy();
  res.redirect('/');
});

// POST

// User Login
router.post('/login', function (req, res, next) {
  var email = req.body.email;
  var password = req.body.password;

  if (!email || !password) {
    res.render('pages/login', {error: 'Please enter both an email and a password'});
  }

  // API HTTP request options
  var requestOptions = {
    url: serverHost + '/login',
    headers: {
      'Authorization': 'Basic ' + (new Buffer(email.toLowerCase() + ':' + password).toString('base64'))
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

    // set the session.
    req.session.user = {logged_in: true, id: jsonBody.id, token: jsonBody.token, username: jsonBody.username};

    if (req.params.url) {
      res.redirect(req.params.url);
    } else {
      res.redirect('/profile');
    }
  });
});

// User Registration
router.post('/register', function (req, res, next) {
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;

  if (!email || !username || !password) {
    res.render('pages/register', {error: 'Please fill out all required fields'});
  }

  // API HTTP request options
  var requestOptions = {
    url: serverHost + '/users/new',
    form: {email: email.toLowerCase(), username: username, password: password}
  };

  // send request to API
  request.post(requestOptions, function (error, response, body) {
    // if there are database errors, send an error message.
    if (error) {
      console.log('/auth/register error - ' + error.Error);
      res.render('pages/register', {error: "Couldn't connect to the database. Please contact a system administrator."});
      return;
    }

    // parse body for easier value retrieval.
    var jsonBody = JSON.parse(body);

    // if we got a registration error from the API, log that message.
    if (jsonBody.error) {
      console.log('/auth/register error - ' + jsonBody.message);
      res.render('pages/register', { error: jsonBody.message });
      return;
    }

    // registration was successful - now redirect to login.
    res.redirect('/auth/login');
  });
});

module.exports = router;
