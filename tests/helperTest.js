const tape = require('tape');
const postContent = require('../src/helpers/postcontent.js');
const getContent = require('../src/helpers/getcontent.js');

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

tape('tests that getContent returns a SELECT command', (t) => {
  const testGetContent = (err, response) => {
    t.equal(response.command, 'SELECT', 'Should return a SELECT command from the table');
    t.end();
  };
  getContent(testGetContent);
});
