const getContent = require('../helpers/getcontent')

module.exports = {
  method: 'GET',
  path: '/content',
  handler: (request, reply) => {
    if (!request.state.session) {
      reply('Please log in to execute request').code(401);
    }
    getContent((err, result) => {
      reply(result);
    });
  },
};
