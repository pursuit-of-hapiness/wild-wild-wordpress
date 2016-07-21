const deleteContent = require('../helpers/deletecontent');

module.exports = {
  method: 'DELETE',
  path: '/content/{id}',
  handler: (request, reply) => {
    const id = request.params.id;
    const payload = Object.assign({}, request.payload);
    payload.postid = id;
    deleteContent(payload, (err) => {
      if (err) {
        return reply().code(500);
      }
      return reply().code(204);
    });
  },
};
