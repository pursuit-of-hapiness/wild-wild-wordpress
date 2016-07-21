const updateContent = require('../helpers/updatecontent');

module.exports = {
  method: 'PUT',
  path: '/content/{id}',
  handler: (request, reply) => {
    const id = request.params.id;
    const payload = Object.assign({}, request.payload);
    payload.postid = id;
    updateContent(payload, (err, result) => {
      reply(result).code(204);
    });
  },
};
