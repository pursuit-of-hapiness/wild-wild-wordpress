const tape = require('tape');
const postContent = require('../src/helpers/postcontent.js');
const getContent = require('../src/helpers/getcontent.js');
const updateContent = require('../src/helpers/updatecontent.js');
const deleteContent = require('../src/helpers/deletecontent.js');

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
  const oldPost = {
    title: 'Test title',
    contentBody: 'This is the old content body',
  };
  const getIdFromTestPost = (err, result) => {
    const testId = result.rows[0].id;
    const newPost = {
      id: testId,
      title: 'Test title',
      contentBody: 'This is the new content body',
    };
    const testUpdateContent = (err, response) => {
      t.equal(response.command, 'UPDATE', 'Should return UPDATE command');
      t.end();
    };
    updateContent(newPost, testUpdateContent);
  };
  postContent(oldPost, getIdFromTestPost);
});

tape('tests that deleteContent return the DELETE command', (t) => {
  const randomTitle = 'Test random title ' + String(Math.random());
  const postToDelete = {
    title: randomTitle,
    contentBody: 'This will be deleted',
  };
  postContent(postToDelete, () => {});
  const testDeleteContent = (err, response) => {
    t.equal(response.command, 'DELETE', 'Should return DELETE command');
    t.end();
  };
  deleteContent(postToDelete, testDeleteContent);
});
