// webhook/index.js

var routes = require('./routes');

module.exports = {

  configure: function(config, server, context) {
    routes.configure(config, server, context);
  }

};
