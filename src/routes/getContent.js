const getContent = require('../helpers/getcontent');

module.exports = {
  method: 'GET',
  path: '/content',
  handler: (request, reply) => {
    getContent((err, result) => {
      const data = {posts: ''};
      data.posts = result.rows;
      reply.view('blog', data);
    });
  },
};
