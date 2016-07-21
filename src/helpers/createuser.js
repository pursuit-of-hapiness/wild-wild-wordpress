const pgClient = require('./pgclient.js');

const createUser = (user, callback) => {
  const username = user.username;
  const hashedPassword = user.password;
  console.log(hashedPassword);
  const client = pgClient();
  client.query(`INSERT INTO users (username, password)
                VALUES ($1, $2)`,
                [username, hashedPassword],
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      callback(err, result);
    }
    client.end();
  });
};

module.exports = createUser;
