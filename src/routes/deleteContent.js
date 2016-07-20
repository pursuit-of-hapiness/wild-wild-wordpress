const deleteContent = require('../helpers/deletecontent')

module.exports = {
  method: 'DELETE',
  path: '/content',
  handler: (request, reply) => {
    deleteContent(request.payload, (err, result) => {
      reply(result).code(204);
    });
  },
};
