const bcrypt = require('bcryptjs');
const getUser = require('../helpers/getuser');

module.exports = {
  method: ['GET', 'POST'],
  path: '/login/',
  config: {
    handler: (request, reply) => {
      if (request.method === 'post') {

        const submittedUsername = request.payload.username;
        const submittedPassword = request.payload.password;

        getUser(submittedUsername, (err, response) => {
          if (response.rows.length === 0) {
            return reply.view('login', { error: 'No User' });
          }

          const storedPassword = response.rows[0].password;
          bcrypt.compare(submittedPassword, storedPassword, (compareErr, result) => {
            if (!result) {
              return reply.view('login', { error: 'Does not match' });
            }

            const rowUserId = response.rows[0].id;
            const rowUsername = response.rows[0].username;
            request.cookieAuth.set({
              username: rowUsername,
              id: rowUserId,
              last: Date.now(),
            });
            return reply.redirect(request.query.next || '/');
          });
        });

      // if GET
      } else if (request.method === 'get') {
        return reply.view('login', { });
      }
    },
    auth: {
      // mode: 'try',
    },
    plugins: {
      'hapi-auth-cookie': {
        redirectTo: false,
      },
    },
  },
};
