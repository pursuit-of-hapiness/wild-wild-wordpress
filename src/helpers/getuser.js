const pgClient = require('./pgclient.js');

const getUser = (username, callback) => {
  const client = pgClient();
  client.query(`SELECT * FROM users
                WHERE username = $1
                ORDER BY id DESC`,
                [username],
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      callback(err, result);
    }
    client.end();
  });
};

module.exports = getUser;
