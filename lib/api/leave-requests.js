// leave-requests.js

var urlUtil = require('url'),
    util = require('util'),
    request = require('request'),
    http_build_query = require('../util/http-build-query'),
    parseResponse = require('../util/parse-response'),
    LeaveRequest = require('../model/leave-request');

var config = null;

function getUrl(command, record, type) {
  var base = urlUtil.parse('https://'+config.site+'.mytribehr.com');

  base.auth = config.username + ":" + config.password;

  switch(command) {
    case 'get':
    case 'update':
    case 'remove':
      base.pathname = util.format('/leave_requests/%s.xml', record.get('id'));
    break;
    case 'list':
      base.pathname = util.format('/leave_requests%s.xml', type || '');
    case 'create':
      base.pathname = '/leave_requests.xml';
    break;
  }

  return urlUtil.format(base);
}

module.exports = {

  configure: function(configuration) {
    config = configuration;
  },

  get: function(record, cb) {
    var url = getUrl('get', record);

    var opts = {
      url: url,
      json: true
    };

    request(opts, function(err, response) {
      parseResponse(response, function(body) {
        var leaveRequest = new LeaveRequest(body.leave_request.leave_request.shift());

        cb(err, leaveRequest);
      });
    });
  },

  list: function(cb, type) {
    var url = getUrl('list', null, type);

    var opts = {
      url: url,
      json: true
    };

    request(opts, function(err, response) {
      parseResponse(response, function(body) {
        body = body.leave_requests.leave_request;
        var leaveRequests = [];

        for (var i=0;i<body.length;i++) {
          leaveRequests.push(new LeaveRequest(body[i]));
        }

        cb(err, leaveRequests);
      });
    });
  },

  listPending: function(cb) {
    this.list(cb, 'pending');
  },

  listAll: function(cb) {
    this.list(cb, 'all');
  },

  listApproved: function(cb) {
    this.list(cb, 'approved');
  },

  listRejected: function(cb) {
    this.list(cb, 'rejected');
  },

  create: function(record, cb) {
    var url = getUrl('create');
    var payload = http_build_query(record.toJSON(), '', '&');

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
          body = body.leave_request.leave_request.shift();
          if(record.validate(body)) {
            record.saved();
            cb();
          } else {
            cb('LeaveRequest validation failed');
          }
        }
      });
    });
  },

  update: function(record, cb) {
    var url = getUrl('update', record);
    var payload = http_build_query(record.getChanged(), '', '&');

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
          if(record.validate(body)) {
            record.saved();
            cb();
          } else {
            cb('LeaveRequest validation failed');
          };
        }
      });
    });
  },

  remove: function(record, cb) {
    var url = getUrl('remove', record);

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