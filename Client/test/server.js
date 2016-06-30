var chai = require('chai');
var expect = require('chai').expect;

var chaiHttp = require('chai-http'); // used for testing HTTP
var nock = require('nock'); // used for mocking HTTP requests. Useful for testing database interactions.
var app = require('../app.js');

chai.use(chaiHttp);

describe('Validate server is up and running', function () {
  it('/ is accessable', (done) => {
    chai.request(app)
      .get('/')
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });

  it('/auth/login is accessable', (done) => {
    chai.request(app)
      .get('/auth/login')
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });

  it('/profile redirects when unauthorized', (done) => {
    chai.request(app)
      .get('/profile')
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.redirect;
        done();
      });
  });
});
