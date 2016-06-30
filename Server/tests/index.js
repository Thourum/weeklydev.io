const assert = require('chai').assert;
const expect = require('chai').expect;
const server = require('../app.js');

describe('Tests api functionality', () => {
			describe('/', () => {
				it('Should respond with a 200 OK', () => {
					server.inject({
						method: 'GET',
						url: '/api'
					}, res => {
						expect(res.statusCode).to.equal(200);
					});
				});
			});
