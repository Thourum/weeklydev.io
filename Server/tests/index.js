'use strict';

const assert = require('chai').assert;
const expect = require('chai').expect;
const server = require('../app.js');

describe('Tests api functionality', () => {
  describe('/', () => {
    it('Should respond with a 200 OK', (done) => {
      server.inject({
        method: 'GET',
        url: '/'
      }, res => {
        expect(res.statusCode).to.equal(200);
      });
      done();
    });
  });
});
