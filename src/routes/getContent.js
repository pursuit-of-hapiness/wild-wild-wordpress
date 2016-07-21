const getContent = require('../helpers/getcontent');

module.exports = {
  method: 'GET',
  path: '/content',
  handler: (request, reply) => {
    getContent((err, result) => {
      reply(result);
    });
  },
};
