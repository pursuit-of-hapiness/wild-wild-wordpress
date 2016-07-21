const bcrypt = require('bcryptjs');
const getUser = require('../helpers/getuser');

module.exports = {
  method: 'POST',
  path: '/user/login',
  handler: (request, reply) => {
    const username = request.payload.username;
    const password = request.payload.password;
    getUser(username, (err, result) => {
      bcrypt.compare(password, result.rows[0].password, (compareErr, res) => {
        reply().code(202);
      })
    })
  },
};
