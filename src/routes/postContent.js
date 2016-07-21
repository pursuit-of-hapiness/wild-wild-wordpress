const postContent = require('../helpers/postcontent')

module.exports = {
  method: 'POST',
  path: '/content',
  handler: (request, reply) => {
    if (!request.state.session) {
      reply('Please log in to execute request').code(401);
    }
    postContent(request.payload, (err, result) => {
      reply(result).code(201);
    });
  },
};
