function makeXhrRequest(params, method, endpoint, contentType, cb) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      cb(JSON.parse(xhr.responseText));
    } else if (xhr.readyState === 4 && xhr.status === 201) {
      cb();
    } else if (xhr.readyState === 4 && xhr.status === 400) {
      console.log(xhr.responseText);
      window.alert(xhr.responseText);
    }
  };
  xhr.open(method, endpoint, true);
  xhr.setRequestHeader('Content-Type', contentType);
  xhr.send(params);
}
