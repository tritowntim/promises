
function appendDatedText(text) {
  var date = new Date(),
      text = [text, date.valueOf(), date].join(' '),
         p = document.createElement('p');
  p.appendChild(document.createTextNode(text));
  document.getElementsByTagName('body')[0].appendChild(p);
}

function doSomething(callback, text) {
  callback(text);
}

doSomething(appendDatedText, 'callback');

function doSomethingReturnsPojo(callback) {
  return {
    then: function(callback) {
      var text = 'pojo';
      callback(text);
    }
  };
}

doSomethingReturnsPojo().then(appendDatedText);

// Promises capture the notion of an eventual value into an object

function PromiseOutOfOrder(fn) {
  var callback = null;

  this.then = function(cb) {
    callback = cb;
  };

  function resolve(value) {
    callback(value);
  }

  fn(resolve);
}

function doSomethingReturnsPromiseOutOfOrder() {
  return new PromiseOutOfOrder(function(resolve) {
    var text = 'promise-out-of-order';
    resolve(text);
  });
}

// errors because fn calls resolve before callback is set during then
// errors because faux-async action resolves before callback is set during then()
// doSomethingReturnsPromiseOutOfOrder().then(appendDatedText);

function PromiseEventLoop(fn) {
  var callback = null;

  this.then = function(cb) {
    callback = cb;
  };

  function resolve(value) {
    setTimeout(function() { callback(value) }, 1);
  }

  fn(resolve);
}

function doSomethingReturnsPromiseEventLoop() {
  return new PromiseEventLoop(function(resolve) {
    var text = 'promise-event-loop';
    resolve(text);
  });
}

doSomethingReturnsPromiseEventLoop().then(appendDatedText);



function doSomethingReturnsPromiseEventLoopFromGet() {
  return new PromiseEventLoop(function(resolve) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'stuff.txt');
    xhr.onload = function() { resolve(xhr.response); }
    xhr.send();
  });
}

doSomethingReturnsPromiseEventLoopFromGet().then(appendDatedText);













 // ....
