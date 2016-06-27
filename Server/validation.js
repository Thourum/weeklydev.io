var User = require('./api/users/models/User');

function jwtAuth (decoded, request, callback) {
  // do your checks to see if the person is valid
  return User.findById(decoded.id, function (err, user) {
    if (err) {
			callback(null, false);
    } else {
    	callback(null, true);
  	}
  });
};


function basicAuth (request, Username, password, callback) {
	User.findOne({username: Username}, (err, user) => {
		if (err) {
			callback(err);
		}
		user.authenticate(password, (err, res) =>{
			if (err){
				callback(err);
			}
			callback(null,res,{ id: user._id, username: user.username })
		})
	});
};

module.exports = {
	jwt 	: jwtAuth,
	basic : basicAuth,
}