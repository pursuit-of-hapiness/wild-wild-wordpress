const pgClient = require('./pgclient.js');

const updateContent = (updatedPost, callback) => {
  const title = updatedPost.title;
  const updatedContent = updatedPost.contentBody;
  const client = pgClient();
  client.query(`UPDATE content
                SET content_body = $2
                WHERE title = $1`,
                [title, updatedContent],
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
