const server = require('../src/server.js');
const test = require('tape');

test('Valid register URL handled correctly', (t) => {
  const payload = {
    username: 'testuser',
    password: 'testpassword',
  };

  const options = {
    method: 'POST',
    url: '/user/create',
    payload,
  };

  server.inject(options, (response) => {
    t.equal(response.statusCode, 201, 'returns correct status code');
    server.stop(t.end);
  });
});

test('Valid user login URL handled correctly', (t) => {
  const payload = {
    username: 'testuser',
    password: 'testpassword',
  };

  const options = {
    method: 'POST',
    url: '/user/login',
    payload,
  };

  server.inject(options, (response) => {
    t.equal(response.statusCode, 202, 'returns correct status code');
    server.stop(t.end);
  });
});
