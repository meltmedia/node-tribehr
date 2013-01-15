var express = require('express');
var app = express();
var TribeHR = require('./index');

var tribeHR = new TribeHR();

tribeHR.configure(function() {
  tribeHR.set('site', '');
  tribeHR.set('username', '');
  tribeHR.set('password', '');
});

tribeHR.on('User', function(action, id) {
  console.log(action, id);
});

tribeHR.listen(app);

app.listen(3001);