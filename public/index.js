// const logIn = document.getElementById('log-in');
// const register = document.getElementById('register');


window.addEventListener('load', getContent)
// logIn.addEventListener('click', userLogIn);
// register.addEventListener('click', userRegister);

function getContent() {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = (request, response) => {
    xhr.open('GET', '/content', true);
    xhr.setRequestHeader({'Content-Type': 'application/json'});
    xhr.send();
  };
}
