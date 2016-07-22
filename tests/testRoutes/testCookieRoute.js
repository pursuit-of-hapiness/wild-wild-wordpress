module.exports = {
  method: 'POST',
  path: '/test',
  handler: (request, reply) => {
    const session = { user: 1 };
    session.last = request.payload.sessionStart;
    return reply().state('session', session).code(202);
  },
};
