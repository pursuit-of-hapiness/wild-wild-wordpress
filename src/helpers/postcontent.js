const pgClient = require('./pgclient.js');

const postContent = (post, callback) => {
  const title = post.title;
  const content = post.contentBody;
  const client = pgClient();
  client.query(`INSERT INTO content(title, content_body)
                VALUES ($1, $2)
                RETURNING id, userid, title, content_body, date_created, date_updated, published`,
  [title, content],
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      callback(err, result);
    }
    client.end();
  });
};

module.exports = postContent;
