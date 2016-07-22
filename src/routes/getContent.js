const getContent = require('../helpers/getcontent');

module.exports = {
  method: 'GET',
  path: '/content',
  handler: (request, reply) => {
    if (!request.state.session || (Date.now() - request.state.session.last) > 30 * 60 * 1000) {
      return reply.view('login').code(401);
    }
    getContent((err, result) => {
      const posts = result.rows;
      return reply.view('blog', { posts });
    });
  },
};
