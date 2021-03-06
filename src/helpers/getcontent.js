const pgClient = require('./pgclient.js');

const getContent = (callback) => {
  const client = pgClient();
  client.query(`SELECT * FROM content
                ORDER BY id DESC
                LIMIT 20`,
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      callback(err, result);
    }
    client.end();
  });
};

module.exports = getContent;
