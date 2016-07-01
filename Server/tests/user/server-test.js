describe('Validate Server is up and running', () => {
  it('Respond with 200', (done) => {
    server.inject({
      method: 'GET',
      url: '/'
    }, (res) => {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });

  it('Respond is JSON', (done) => {
    server.inject({
      method: 'GET',
      url: '/'
    }, (res) => {
      expect(res.result).to.be.an('object');
      done();
    });
  });

  it('Respond with "Succes" true', (done) => {
    server.inject({
      method: 'GET',
      url: '/'
    }, (res) => {
      expect(res.result.success).to.be.true;
      expect(res.result).to.include.keys('success');
      done();
    });
  });

  it('Respond with with message', (done) => {
    server.inject({
      method: 'GET',
      url: '/'
    }, (res) => {
      expect(res.result).to.include.keys('message');
      expect(res.result.message).to.equal('Server is running!');
      done();
    });
  });
});
