var res;
var user = {
  username: 'crazymouse553',
  password: 'vectra',
  email: 'philip.barnes@example.com'
};
describe('Creating new user', () => {
  it('POST new user data', (done) => {
    server.inject({
      method: 'POST',
      url: '/users/new',
      payload: {
        username: user.username,
        password: user.password,
        email: user.email
      }
    }, (result) => {
      res = result.result;
      expect(result.statusCode).to.not.equal(200);
      done();
    });
  });

  it('Response matches with user data', () => {
    expect(res.username).to.equal(user.username);
    expect(res.email).to.equal(user.email);
  });

  it('Respond with ID', () => {
    expect(res.id).to.be.a('string');
    expect(res).to.include.keys('id');
  });
  it('Respond with Token', () => {
    expect(res.token).to.be.a('string');
    expect(res).to.include.keys('token');
  });

  it('User is not admin', () => {
    expect(res.admin).to.be.false;
  });

  it('User is not in team', () => {
    expect(res.team).to.be.a('array');
    expect(res.team).to.have.length.below(1);
  });

  it('User does not have any projects', () => {
    expect(res.project).to.be.a('array');
    expect(res.project).to.have.length.below(1);
  });
});

describe('Login ', () => {
  var loginRes;
  it('user with username', (done) => {
    server.inject({
      method: 'POST',
      url: '/login',
      headers: {
        Authorization: 'Basic ' + (new Buffer(user.username + ':' + user.password, 'utf8')).toString('base64')
      }
    }, (res) => {
      loginRes = res.result;
      expect(res.statusCode).to.be.equal(200);
      done();
    });
  });

  it('user with email', (done) => {
    server.inject({
      method: 'POST',
      url: '/login',
      headers: {
        Authorization: 'Basic ' + (new Buffer(user.email + ':' + user.password, 'utf8')).toString('base64')
      }
    }, (res) => {
      expect(res.statusCode).to.be.equal(200);
      done();
    });
  });

  it('user with wrong username', (done) => {
    server.inject({
      method: 'POST',
      url: '/login',
      headers: {
        Authorization: 'Basic ' + (new Buffer('Invalid' + ':' + user.password, 'utf8')).toString('base64')
      }
    }, (res) => {
      loginRes = res.result;
      expect(res.statusCode).to.be.equal(401);
      done();
    });
  });

  it('user with wrong email', (done) => {
    server.inject({
      method: 'POST',
      url: '/login',
      headers: {
        Authorization: 'Basic ' + (new Buffer('invalid@someRussina.email' + ':' + user.password, 'utf8')).toString('base64')
      }
    }, (res) => {
      loginRes = res.result;
      expect(res.statusCode).to.be.equal(401);
      done();
    });
  });

  it('user with wrong password ( username )', (done) => {
    server.inject({
      method: 'POST',
      url: '/login',
      headers: {
        Authorization: 'Basic ' + (new Buffer(user.username + ':' + '123456ShittyPassword', 'utf8')).toString('base64')
      }
    }, (res) => {
      loginRes = res.result;
      expect(res.statusCode).to.be.equal(401);
      done();
    });
  });

  it('user with wrong password ( email )', (done) => {
    server.inject({
      method: 'POST',
      url: '/login',
      headers: {
        Authorization: 'Basic ' + (new Buffer(user.email + ':' + '123456ShittyPassword', 'utf8')).toString('base64')
      }
    }, (res) => {
      loginRes = res.result;
      expect(res.statusCode).to.be.equal(401);
      done();
    });
  });
});

describe('Deleting user :', () => {

  var deleteRes;

  it('Respond with succes', (done) => {
    server.inject({
      method: 'DELETE',
      url: '/users/' + res.id
    }, (res) => {
      deleteRes = res.result;
      expect(res.statusCode).to.be.equal(200);
      done();
    });
  });

  it('Respond with ID', () => {
    expect(deleteRes.id).to.be.a('string');
    expect(deleteRes).to.include.keys('id');
  });

  it('Respond with Token', () => {
    expect(res.token).to.be.a('string');
    expect(deleteRes).to.include.keys('token');
  });

  it('Respond with Username and Email', () => {
    expect(deleteRes.username).to.be.a('string');
    expect(deleteRes.username).to.be.equal(user.username);
    expect(deleteRes.email).to.be.a('string');
    expect(deleteRes.email).to.be.equal(user.email);
  });

  it('Invalidate Token', (done) => {
    server.inject({
      method: 'GET',
      url: '/users/me',
      headers: {
        Authorization: 'bearer ' + res.token
      }
    }, (res) => {
      expect(res.statusCode).to.be.equal(401);
      expect(res.result.message).to.be.equal('user not found');
      expect(res.result.error).to.be.equal('Unauthorized');

      done();
    });
  });

  it('Login after deleted with username', (done) => {
    server.inject({
      method: 'POST',
      url: '/login',
      headers: {
        Authorization: 'Basic ' + (new Buffer(user.username + ':' + user.password, 'utf8')).toString('base64')
      }
    }, (res) => {
      expect(res.statusCode).to.be.equal(401);
      expect(res.result.error).to.be.equal('Unauthorized');
      expect(res.result.message).to.be.equal('user not found');
      done();
    });
  });

  it('Login after deleted with email', (done) => {
    server.inject({
      method: 'POST',
      url: '/login',
      headers: {
        Authorization: 'Basic ' + (new Buffer(user.email + ':' + user.password, 'utf8')).toString('base64')
      }
    }, (res) => {
      expect(res.statusCode).to.be.equal(401);
      expect(res.result.error).to.be.equal('Unauthorized');
      expect(res.result.message).to.be.equal('user not found');
      done();
    });
  });
});
