const getContent = require('../helpers/getcontent');

module.exports = {
  method: 'GET',
  path: '/content',
  handler: (request, reply) => {
    getContent((err, result) => {
      const posts = result.rows[0];
      console.log(posts);
      reply.view('blog', posts);
    });
  },
};
