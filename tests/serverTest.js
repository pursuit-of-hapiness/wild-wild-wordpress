
const server = require('../src/server.js');
const test = require('tape');
const shot = require('shot');

let cookie = ''
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
    cookie = response.headers['set-cookie'][0].split(';')[0];
    t.equal(response.statusCode, 202, 'returns correct status code');
    server.stop(t.end);
  });
});


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
  const payload = {
    userid: 1,
  };

  const options = {
    method: 'GET',
    url: '/content',
    payload,
    headers: {
      Cookie: cookie,
    },
  };
  server.inject(options, (response) => {
    const respayload = JSON.parse(response.payload);
    t.equal(response.statusCode, 200);
    t.ok(respayload.rows[0].id > 0);
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
    headers: {
      Cookie: cookie,
    },
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
    headers: {
      Cookie: cookie,
    },
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
    headers: {
      Cookie: cookie,
    },
  };

  server.inject(options, (response) => {
    t.equal(response.statusCode, 204);
    server.stop(t.end);
  });
});


test('Delete unsuccessful if no valid session cookie', (t) => {
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
    t.equal(response.statusCode, 401, '401 response');
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
