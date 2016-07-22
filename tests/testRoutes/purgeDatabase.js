const pgClient = require('../../src/helpers/pgclient');
const client = pgClient();

module.exports = {
  method: 'DELETE',
  path: '/purge',
  handler: (request, reply) => {
    client.query('TRUNCATE users, posts, tags RESTART IDENTITY',
    (err) => {
      if (err) throw err;
      return reply().code(200);
    });
  },
};
