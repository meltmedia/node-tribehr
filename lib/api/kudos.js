// kudos.js

var urlUtil = require('url'),
    request = require('request');

var config = null;

function getUrl(command) {
  var base = urlUtil.parse('http://'+config.site+'.mytrbehr.com');

  switch(command) {
    case 'get':
    case 'update':
    case 'remove':
      base.path = '/kudos/{id}.json';
    break;
    case 'list':
    case 'create':
      base.path = '/kudos.json';
    break;
  }
}

module.exports = {

  configure: function(configuration) {
    config = configuration;
  },

  get: function(data, cb) {
    cb();
  },

  list: function(cb) {
    cb();
  },

  create: function(data, cb) {
    cb();
  },

  update: function(data, cb) {
    cb();
  },

  remove: function(data, cb) {
    cb();
  }

};