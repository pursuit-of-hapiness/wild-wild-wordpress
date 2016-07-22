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

const userLogIn = () => {
  const userName = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const loginQueryString = `username=${userName}&password=${password}`;
  makeXhrRequest(loginQueryString, 'POST', '/user/login', 'application/x-www-form-urlencoded');
}

const userRegister = () => {
  const userName = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const registerQueryString = `username=${userName}&password=${password}`;
  makeXhrRequest(registerQueryString, 'POST', '/user/create', 'application/x-www-form-urlencoded');
}

window.addEventListener('load', getContent);
document.getElementById('log-in').addEventListener('click', userLogIn);
document.getElementById('register').addEventListener('click', userRegister);
// document.getElementById('send-post').addEventListener('click', postContent);
