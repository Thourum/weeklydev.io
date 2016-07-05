var User = require('./api/users/models/User');
var validateEmail = require('./methods/validateEmail');
var Boom = require('boom');

function jwtAuth (decoded, request, callback) {
  // do your checks to see if the person is valid
  if (decoded.exp >= Date.now()) {
    callback('Token Expired', false);
  }
  request.Token = decoded;
  return User.findById(decoded.id, function (err, user) {
    if (err || !user) {
      callback(null, false);
    }else {
      if (!user.token.valid) {
        callback(null, false);
      } else {
        if (decoded.uuid !== user.token.uuid) {
          callback(null, false);
        }else {
          callback(null, true);
        }
      }
    }
  });
}

function basicAuth (request, Username, password, callback) {
  if (!validateEmail(Username)) {
    User.findOne({
      username: Username
    }, (err, user) => {
      if (err) {
        callback(err);
        return;
      }
      if (!user) {
        callback(Boom.unauthorized('user not found'));
        return;
      }
      user.authenticate(password, (err, res) => {
        if (err) {
          callback(err);
        }
        callback(null, res, {
          id: user._id,
          username: user.username
        });
      });
    });
  } else {
    User.findOne({
      email: Username
    }, (err, user) => {
      if (err) {
        callback(err);
        return;
      }
      if (!user) {
        callback(Boom.unauthorized('user not found'));
        return;
      }
      user.authenticate(password, (err, res) => {
        if (err) {
          callback(err);
        }
        var credentials = {
          id: user._id,
          username: user.username
        };
        callback(null, res, credentials);
      });
    });
  }
}

module.exports = {
  jwt: jwtAuth,
  basic: basicAuth
};
