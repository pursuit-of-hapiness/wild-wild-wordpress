const bcrypt = require('bcryptjs');
const getUser = require('../helpers/getuser');

module.exports = {
  method: 'POST',
  path: '/user/login',
  handler: (request, reply) => {
    const username = request.payload.username;
    const password = request.payload.password;
    getUser(username, (err, response) => {
      bcrypt.compare(password, response.rows[0].password, (compareErr, result) => {
        const session = { user: response.rows[0].id };
        session.last = Date.now();
        reply().state('session', session).code(202);
      });
    });
  },
};
