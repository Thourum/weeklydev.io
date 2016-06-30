// authentication check middleware
// sets req.auth = true if we have a token.
// checks for a cookie named weeklydev_auth_token, and if it exists, add its value to res.locals.token

// access these variables in node via res.locals.auth and res.locals.token
// access them in views by just referencing auth and token.
module.exports = function () {
  return function (req, res, next) {
    // if the token cookie exists, export app.locals.auth and app.locals.token
    if (req.session.user && req.session.user.logged_in && (typeof req.session.user.token) === 'string') {
      res.locals.auth = true;
    } else {
      res.locals.auth = false;
    }

    // this is middlware - move on down the chain.
    next();
  };
};
