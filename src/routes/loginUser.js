const bcrypt = require('bcryptjs');
const getUser = require('../helpers/getuser');
const createSession = require('../auth/createSession');

module.exports = {
  method: 'POST',
  path: '/user/login',
  handler: (request, reply) => {
    const username = request.payload.username;
    const submittedPassword = request.payload.password;
    getUser(username, (err, response) => {
      const storedPassword = response.rows[0].password;
      bcrypt.compare(submittedPassword, storedPassword, (compareErr, result) => {
        if (!result) {
          return reply().code(401);
        }
        const userid = response.rows[0].id;
        const session = createSession(userid);
        return reply().state('session', session).code(202);
      });
    });
  },
};
