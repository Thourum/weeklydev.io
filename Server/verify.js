var User = require('./api/users/models/User');

module.exports = function (decoded, request, callback) {
  // do your checks to see if the person is valid
  return User.findById(decoded.id, function (err, user) {
    if (err) {
			callback(null, false);
    } else {
    	callback(null, true);
  	}
  });
};