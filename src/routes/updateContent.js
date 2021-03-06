const updateContent = require('../helpers/updatecontent');

module.exports = {
  method: 'PUT',
  path: '/content/{id}',
  handler: (request, reply) => {
    if (!request.state.session || (Date.now() - request.state.session.last) > 30 * 60 * 1000) {
      return reply('Please log in to execute request').code(401);
    }
    const id = request.params.id;
    const payload = Object.assign({}, request.payload);
    payload.postid = id;
    updateContent(payload, (err, result) => {
      return reply(result).code(200);
    });
  },
};
