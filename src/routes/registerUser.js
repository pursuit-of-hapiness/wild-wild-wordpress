const bcrypt = require('bcryptjs');
const createUser = require('../helpers/createuser');

module.exports = {
  method: 'POST',
  path: '/user/create',
  handler: (request, reply) => {
    const username = request.payload.username;
    bcrypt.hash(request.payload.password, 10, (err, hash) => {
      const password = hash;
      const user = {
        username,
        password,
      };
      createUser(user, (createError, response) => {
        const session = { user: response.rows[0].id };
        session.last = Date.now();
        return reply().state('session', session).code(201);
      });
    });
  },
};
