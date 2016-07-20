
const server = require('../src/server.js');
const test = require('tape');

test('Basic / route test', (t) => {
  const options = {
    method: 'GET',
    url: '/',
  };

  server.inject(options, (response) => {
    t.equal(response.statusCode, 200);
    t.ok(response.headers['content-type'].includes('html'));
    t.ok(response.payload.includes('<!DOCTYPE html>'));
    server.stop(t.end);
  });
});

test('Handles content requests without auth', (t) => {
  const options = {
    method: 'GET',
    url: '/content',
  };

  server.inject(options, (response) => {
    t.equal(response.statusCode, 200);
    server.stop(t.end);
  });
});
