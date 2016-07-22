// const logIn = document.getElementById('log-in');
// const register = document.getElementById('register');
const getContent = () => {
  makeXhrRequest('', 'GET', '/content', 'application/json');
};

const postContent = () => {
  const contentTitle = document.getElementById('post-title').value;
  const contentBody = document.getElementById('post-body').value;
  document.getElementById('post-title').value = null;
  document.getElementById('post-body').value = null;
  const queryString = `title=${contentTitle}&content_body=${contentBody}`;
  makeXhrRequest(queryString, 'POST', '/content', 'application/x-www-form-urlencoded', getContent);
};

window.addEventListener('load', getContent);
document.getElementById('send-post').addEventListener('click', postContent);
// logIn.addEventListener('click', userLogIn);
// register.addEventListener('click', userRegister);
