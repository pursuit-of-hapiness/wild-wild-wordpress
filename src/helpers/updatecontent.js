const pgClient = require('./pgclient.js');

const updateContent = (updatedPost, callback) => {
  const id = updatedPost.id;
  const updatedContent = updatedPost.contentBody;
  const client = pgClient();
  client.query(`UPDATE content
                SET content_body = $2
                WHERE id = $1`,
                [id, updatedContent],
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      callback(err, result);
    }
    client.end();
  });
};

module.exports = updateContent;
