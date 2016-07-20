const pg = require('pg');

const pgClient = () => {
  const connectionString = 'postgres://qvggfurt:r3jWdQxJdDGRxpuPXrstJb2KlfQ9Gtdn@horton.elephantsql.com:5432/qvggfurt';
  const client = new pg.Client(connectionString);
  client.connect((err) => {
    if (err) {
      console.log(err);
    }
  });
  return client;
};

module.exports = pgClient;
