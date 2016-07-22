const bcrypt = require('bcryptjs');
const createUser = require('../helpers/createuser');
const createSession = require('../auth/createSession');
const getContent = require('../helpers/getcontent');

module.exports = {
  method: 'POST',
  path: '/user/create',
  handler: (request, reply) => {
    const username = request.payload.username;
    bcrypt.hash(request.payload.password, 10, (err, hash) => {
      const user = {
        username,
        password: hash,
      };
      createUser(user, (createUserError, response) => {
        if (createUserError) {
          reply().code(500);
        }
        const userid = response.rows[0].id;
        const session = createSession(userid);
        getContent((err, result) => {
          const posts = result.rows;
          return reply.view('default', { posts });
        });
      });
    });
  },
};
