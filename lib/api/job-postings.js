// job-postings.js

var urlUtil = require('url'),
    request = require('request');

var config = null;

function getUrl(command) {
  var base = urlUtil.parse('http://'+config.site+'.mytrbehr.com');

  switch(command) {
    case 'get':
    case 'update':
    case 'delete':
      base.path = '/job_postings/{id}.json';
    break;
    case 'list':
    case 'create':
      base.path = '/job_postings.json';
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

  delete: function(data, cb) {
    cb();
  }

};