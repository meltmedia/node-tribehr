// routes.js

var config = null,
    server = null,
    context = null;

function setRoutes() {

  server.post('/tribe-hr/webhook', function(req, res, next) {
    var data = '';

    req.on('data', function(chunk) {
      data += chunk.toString('utf8');
    });

    req.on('end', function() {
      data = decodeURIComponent(data);
      data = data.split('&');

      var obj = {};

      for(var i=0;i<data.length;i++) {
        var kv = data[i].split('=');
        obj[kv[0]] = kv[1];
      }

      var eventHash = obj.hook.split('.');
      context.emit.apply(context, eventHash);

      next();
    });
  });
}

module.exports = {

  configure: function(configuration, _server, _context) {
    config = configuration;
    server = _server;
    context = _context;
    setRoutes();
  }

};