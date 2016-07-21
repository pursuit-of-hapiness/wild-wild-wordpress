const deleteContent = require('../helpers/deletecontent');

module.exports = {
  method: 'DELETE',
  path: '/content/{id}',
  handler: (request, reply) => {
    if (!request.state.session) {
      return reply('Please log in to execute request').code(401);
    }
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
