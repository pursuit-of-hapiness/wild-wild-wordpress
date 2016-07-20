const pgClient = require('./pgclient.js');

const deleteContent = (postToDelete, callback) => {
  const id = postToDelete.id;
  const client = pgClient();
  client.query(`DELETE FROM content
                WHERE id = $1`,
                [id],
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
