module.exports = {
  method: 'GET',
  path: '/login',
  handler: (request, reply) => {
    reply.view('login');
  },
};
