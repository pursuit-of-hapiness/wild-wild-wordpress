
const server = require('../src/server.js');
const test = require('tape');

const testCookieRoute = require('./testRoutes/testCookieRoute');
const testPurgeDatabase = require('./testRoutes/purgeDatabase');

server.route(testCookieRoute);
server.route(testPurgeDatabase);

function getCookie(sessionCreation, callback) {
  let cookie = '';

  const payload = {
    sessionStart: `${sessionCreation}`,
  };

  const cookieOptions = {
    method: 'POST',
    url: '/test',
    payload,
  };

  server.inject(cookieOptions, (response) => {
    cookie = response.headers['set-cookie'][0].split(';')[0];
    server.stop();
    callback(cookie);
  });
}

function purgeDatabase(callback) {
  const purgeOptions = {
    method: 'DELETE',
    url: '/purge',
  };

  server.inject(purgeOptions, () => {
    server.stop();
    callback();
  });
}

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
    // cookie = response.headers['set-cookie'][0].split(';')[0];
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

test('Handles content requests with session cookie', (t) => {
  getCookie(Date.now(), (cookie) => {
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
      const respayload = response.payload;
      t.equal(response.statusCode, 200);
      t.ok(respayload.includes('<!DOCTYPE html>'));
      server.stop(t.end);
    });
  });
});

test('Redirects to login if session cookie has expired', (t) => {
  getCookie(Date.now() - (31 * 60 * 1000), (cookie) => {
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
      t.equal(response.statusCode, 401);
      server.stop(t.end);
    });
  });
});

test('Redirects to login if session cookie is invalid', (t) => {
  getCookie(Date.now(), (cookie) => {
    const payload = {
      userid: 1,
    };
    const options = {
      method: 'GET',
      url: '/content',
      payload,
      headers: {
        Cookie: cookie.substring(1),
      },
    };

    server.inject(options, (response) => {
      t.equal(response.statusCode, 401);
      server.stop(t.end);
    });
  });
});

test('Content request unsuccessful without session cookie', (t) => {
  const payload = {
    userid: 1,
  };
  const options = {
    method: 'GET',
    url: '/content',
    payload,
  };
  server.inject(options, (response) => {
    t.equal(response.statusCode, 401);
    server.stop(t.end);
  });
});

test('Update content requests successful with valid session cookie', (t) => {
  getCookie(Date.now(), (cookie) => {
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
      t.equal(response.statusCode, 200);
      server.stop(t.end);
    });
  });
});

test('Update content unsuccessful without valid session cookie', (t) => {
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
    t.equal(response.statusCode, 401);
    server.stop(t.end);
  });
});

test('Posts content successful with valid session cookie', (t) => {
  getCookie(Date.now(), (cookie) => {
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
});

test('Post content unsuccessful without session cookie', (t) => {
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
    t.equal(response.statusCode, 401);
    server.stop(t.end);
  });
});

test('Deletes succesfully with valid session cookie', (t) => {
  getCookie(Date.now(), (cookie) => {
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
      t.equal(response.statusCode, 200);
      server.stop(t.end);
    });
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
