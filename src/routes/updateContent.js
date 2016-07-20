const updateContent = require('../helpers/updatecontent')

module.exports = {
  method: 'PUT',
  path: '/content',
  handler: (request, reply) => {
    updateContent(request.payload, (err, result) => {
      reply(result).code(204);
    });
  },
};
