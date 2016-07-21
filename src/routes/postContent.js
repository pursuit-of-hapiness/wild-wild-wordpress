const postContent = require('../helpers/postcontent');

module.exports = {
  method: 'POST',
  path: '/content',
  handler: (request, reply) => {
    postContent(request.payload, (err, result) => {
      reply(result).code(201);
    });
  },
};
