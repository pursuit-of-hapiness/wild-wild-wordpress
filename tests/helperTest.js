const tape = require('tape');
const postContent = require('../src/helpers/postcontent.js');
const getContent = require('../src/helpers/getcontent.js');
const updateContent = require('../src/helpers/updatecontent.js');

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

tape('tests that updateContent returns UPDATE command', (t) => {
  const randomTitle = String(Math.random());
  const oldPost = {
    title: randomTitle,
    contentBody: 'This is the old content body',
  };
  postContent(oldPost, () => {});
  const newPost = {
    title: randomTitle,
    contentBody: 'This is the new content body',
  };
  const testUpdateContent = (err, response) => {
    t.equal(response.command, 'UPDATE', 'Should return UPDATE command');
    t.end();
  };
  updateContent(newPost, testUpdateContent);
});
