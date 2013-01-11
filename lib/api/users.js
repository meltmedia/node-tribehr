// users.js

var urlUtil = require('url'),
    util = require('util'),
    request = require('request'),
    _ = require('underscore'),
    http_build_query = require('../util/http-build-query'),
    parseResponse = require('../util/parse-response'),
    User = require('../model/user');

var config = null;

function getUrl(command, record) {
  var base = urlUtil.parse('https://'+config.site+'.mytribehr.com');

  base.auth = config.username + ":" + config.password;

  switch(command) {
    case 'get':
    case 'update':
    case 'remove':
      base.pathname = util.format('/users/%s.json', record.get('id'));
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

  get: function(user, cb) {
    //var user = new User(data);
    var url = getUrl('get', user);

    var opts = {
      url: url,
      json: true
    };

    request(opts, function(err, response, body) {
      var user = new User(body.User);

      cb(err, user);
    });
  },

  list: function(cb) {
    var url = getUrl('list');

    var opts = {
      url: url,
      json: true
    };

    request(opts, function(err, response, body) {

      var users = [];

      for (var i=0;i<body.length;i++) {
        users.push(new User(body[i]));
      }

      cb(err, users);
    });
  },

  create: function(user, cb) {
    var url = getUrl('create', user);
    var payload = http_build_query(user.toJSON(), '', '&');

    var opts = {
      url: url,
      followAllRedirects: true,
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Accepts': 'application/json'
      },
      body: payload,
      method: 'POST'
    };

    request(opts, function(err, response) {

      parseResponse(response, function(body) {

        if(err || body.hasOwnProperty('error')) {
          cb(err || body.error);
        } else {

          body = body.user.user.shift();
          if(user.validate(body)) {
            user.saved();
            cb();
          } else {
            cb('User validation failed');
          }
        }
      });
    });
  },

  update: function(user, cb) {
    var url = getUrl('update', user);
    var payload = http_build_query(user.getChanged(), '', '&');

    var opts = {
      url: url,
      followAllRedirects: true,
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Accepts': 'application/json'
      },
      body: payload,
      method: 'PUT'
    };

    request(opts, function(err, response) {

      parseResponse(response, function(body) {
        if(err || body.hasOwnProperty('error')) {
          cb(err || body.error);
        } else {
          if(user.validate(body)) {
            user.saved();
            cb();
          } else {
            cb('User validation failed');
          };
        }
      });
    });
  },

  remove: function(user, cb) {
    var url = getUrl('remove', user);

    var opts = {
      url: url,
      followAllRedirects: true,
      headers: {
        'Accepts': 'application/json'
      },
      method: 'DELETE'
    };

    request(opts, function(err, response) {
      parseResponse(response, function(body) {
        if(err || body.hasOwnProperty('error')) {
          cb(err || body.error);
        } else {
          cb();
        }
      });
    });
  }

};
