
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
    const payload = JSON.parse(response.payload);
    t.equal(response.statusCode, 200);
    t.ok(payload.rows[0].id > 0);
    server.stop(t.end);
  });
});

test('Posts content requests without auth', (t) => {
  const payload = {
    title: 'Post title',
    contentBody: 'This is a blog post',
  };
  const options = {
    method: 'POST',
    url: '/content',
    payload,
  };

  server.inject(options, (response) => {
    t.equal(response.statusCode, 201);
    t.ok(response.payload.includes('content_body'));
    server.stop(t.end);
  });
});

test('Posts content requests without auth', (t) => {
  const payload = {
    title: 'Post title',
    contentBody: 'This is a blog post',
  };
  const options = {
    method: 'PUT',
    url: '/content/1',
    payload,
  };

  server.inject(options, (response) => {
    t.equal(response.statusCode, 204);
    server.stop(t.end);
  });
});
test('Deletes succesfully', (t) => {
  const payload = {
    title: 'Post title',
    contentBody: 'This is a blog post',
  };
  const options = {
    method: 'DELETE',
    url: '/content/{id}',
    payload,
  };

  server.inject(options, (response) => {
    t.equal(response.statusCode, 204);
    server.stop(t.end);
  });
});

// test('Test statusCode is 500 if deletion fails', (t) => {
//
//   const options = {
//     method: 'DELETE',
//     url: '/content/{id}',
//   };
//
//   server.inject(options, (response) => {
//     t.equal(response.statusCode, 500);
//     server.stop(t.end);
//   });
// });
