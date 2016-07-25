
module.exports = {
  method: 'GET',
  path: '/logout/',
  handler: (request, reply) => {
    request.cookieAuth.clear();
    return reply.redirect('/');
  },
};
