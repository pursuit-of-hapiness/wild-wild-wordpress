const bcrypt = require('bcryptjs');
const createUser = require('../helpers/createuser');

module.exports = {
  method: ['GET', 'POST'],
  path: '/register/',
  config: {
    handler: (request, reply) => {
      if (request.method === 'post') {
        const submittedUsername = request.payload.username;
        const submittedPassword = request.payload.password;
        bcrypt.hash(submittedPassword, 10, (err, hash) => {
          const user = {
            submittedUsername,
            password: hash,
          };
          createUser(user, (createUserError, response) => {
            if (createUserError) {
              return reply().code(500);
            }
            request.cookieAuth.set({
              username: response.rows[0].username,
              id: response.rows[0].id,
              last: Date.now(),
            });
          });
        });

      // if GET
      } else if (request.method === 'get') {
        return reply.view('register', { });
      }
    },
    auth: {
      mode: 'try',
    },
    plugins: {
      'hapi-auth-cookie': {
        redirectTo: false,
      },
    },
  },
};
