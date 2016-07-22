module.exports = {
  method: 'GET',
  path: '/test',
  handler: (request, reply) => {
    const session = { user: 1 };
    session.last = Date.now();
    return reply().state('session', session).code(202);
  },
};
