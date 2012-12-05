// users.js

var urlUtil = require('url'),
    request = require('request');

var config = null;

function getUrl(command) {
  var base = urlUtil.parse('https://'+config.site+'.mytribehr.com');

  base.auth = config.username + ":" + config.password;

  switch(command) {
    case 'get':
    case 'update':
    case 'delete':
      base.pathname = '/users/{id}.json';
    break;
    case 'list':
    case 'create':
      base.pathname = '/users.json';
    break;
  }

  return urlUtil.format(base);
}


module.exports = {

  configure: function(configuration) {
    config = configuration;
  },

  get: function(data, cb) {
    var url = getUrl('get').replace('{id}', data.id);

    var opts = {
      url: url,
      json: true
    };

    request(opts, function(err, data) {
      cb(err, data.body);
    });
  },

  list: function(cb) {
    var url = getUrl('list');

    var opts = {
      url: url,
      json: true
    };

    request(opts, function(err, data) {
      cb(err, data.body);
    });
  },

  create: function(data, cb) {
    cb();
  },

  update: function(data, cb) {
    cb();
  },

  delete: function(data, cb) {
    cb();
  }

};
