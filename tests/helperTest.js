const tape = require('tape');
const postContent = require('../src/helpers/postcontent.js');

tape('tests that postContent generates INSERT command', (t) => {
  const fakePost = {
    title: 'Post Title',
    contentBody: 'This is the content of the post',
  };
  const testPostContent = (err, response) => {
    t.equal(response.command, 'INSERT', 'Should return an INSERT command');
    t.end();
  };
  postContent(fakePost, testPostContent);
});
