var express = require('express');
var app = express();

// authentication check middleware
// sets req.auth = true if we have a token.
// checks for a cookie named weeklydev_auth_token, and if it exists, add its value to res.locals.token

// access these variables in node via res.locals.auth and res.locals.token
// access them in views by just referencing auth and token.
module.exports = function()
{
  return function (req, res, next)
  {

    // if the token cookie exists, export app.locals.auth and app.locals.token
    if (req.cookies.weeklydev_auth_token && req.cookies.weeklydev_auth_token != 'undefined')
    {
      res.locals.auth = true;
      res.locals.token = req.cookies.weeklydev_auth_token;
    }

    // if the token doesn't exist, set app.locals.auth and app.locals.token to false.
    else
    {
      res.locals.auth = false;
      res.locals.token = "";
    }

    // this is middlware - move on down the chain.
    next();
  }
};