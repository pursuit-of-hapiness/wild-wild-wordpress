const pgClient = require('./pgclient.js');

const deleteContent = (postToDelete, callback) => {
  const title = postToDelete.title;
  const client = pgClient();
  client.query(`DELETE FROM content
                WHERE title = $1`,
                [title],
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      callback(err, result);
    }
    client.end();
  });
};

module.exports = deleteContent;
