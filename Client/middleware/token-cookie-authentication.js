// authentication check middleware
// sets req.auth = true if we have a token.
// checks for a cookie named weeklydev_auth_token, and if it exists, add its value to res.locals.token

// USAGE
// To protect a page at any path, add res.protectPage(req, res, next); to the request.

// authentication function
function protectPage (req, res, next) {
  if (res.locals.auth) {
    return next();
  } else {
    res.redirect('/auth/login?url=' + req.url);
  }
}

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

    res.protectPage = protectPage;

    // this is middlware - move on down the chain.
    next();
  };
};
