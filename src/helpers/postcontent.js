const pgClient = require('./pgclient.js');

const postContent = (post, callback) => {
  const title = post.title;
  const content = post.contentBody;
  const client = pgClient();
  client.query('INSERT INTO content(title, content_body) VALUES ($1, $2)',
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

const fakePost = {
  title: 'Post Title',
  contentBody: 'This is the content of the post',
};

const logResult = (err, response) => {
  console.log(response);
};

postContent(fakePost, logResult);
