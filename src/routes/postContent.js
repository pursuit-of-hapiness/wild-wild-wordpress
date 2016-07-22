const postContent = require('../helpers/postcontent');

module.exports = {
  method: 'POST',
  path: '/content',
  handler: (request, reply) => {
    postContent(request.payload, (err, result) => {
      console.log(request.payload);
      reply(result).code(201);
    });
  },
};
