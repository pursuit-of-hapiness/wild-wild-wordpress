const getContent = require('../helpers/getcontent');

module.exports = {
  method: 'GET',
  path: '/',
  config: {
    auth: 'session',
    handler: (request, reply) => {
      getContent((err, result) => {
        const posts = result.rows;
        return reply.view('blog', {
          posts,
          msg: 'Hello there ' + request.auth.credentials.username,
        });
      });
    },
  },
};
