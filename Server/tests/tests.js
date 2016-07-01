global.server = require('../app.js');
global.chai = require('chai');
global.expect = global.chai.expect;

// ----- Definition here
global.URL = 'http://localhost:1337';

function generateRandomUser (cb) {
  var http = require('http');
  var NewUser;
  http.get('http://api.randomuser.me/?inc=login,email', (res) => {
    var user = res.body.results;
    NewUser.username = user.login.username;
    NewUser.password = user.login.password;
    NewUser.email = user.email;
    cb(NewUser);
  });
}
// chai.use(require('chai-http'))

require('./user/server-test');
require('./user/user-test');
