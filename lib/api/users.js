// users.js

var urlUtil = require('url'),
    util = require('util'),
    request = require('request'),
    _ = require('underscore'),
    xml2js = require('xml2js'),
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

function http_build_query (formdata, numeric_prefix, arg_separator) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Legaev Andrey
  // +   improved by: Michael White (http://getsprink.com)
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +    revised by: stag019
  // +   input by: Dreamer
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: MIO_KODUKI (http://mio-koduki.blogspot.com/)
  // %        note 1: If the value is null, key and value is skipped in http_build_query of PHP. But, phpjs is not.
  // -    depends on: urlencode
  // *     example 1: http_build_query({foo: 'bar', php: 'hypertext processor', baz: 'boom', cow: 'milk'}, '', '&amp;');
  // *     returns 1: 'foo=bar&amp;php=hypertext+processor&amp;baz=boom&amp;cow=milk'
  // *     example 2: http_build_query({'php': 'hypertext processor', 0: 'foo', 1: 'bar', 2: 'baz', 3: 'boom', 'cow': 'milk'}, 'myvar_');
  // *     returns 2: 'php=hypertext+processor&myvar_0=foo&myvar_1=bar&myvar_2=baz&myvar_3=boom&cow=milk'
  var value, key, tmp = [],
      that = this;

  var _http_build_query_helper = function (key, val, arg_separator) {
    var k, tmp = [];
    if (val === true) {
      val = "1";
    } else if (val === false) {
      val = "0";
    }
    if (val != null) {
      if(typeof(val) === "object") {
        for (k in val) {
          if (val[k] != null) {
            tmp.push(_http_build_query_helper(key + "[" + k + "]", val[k], arg_separator));
          }
        }
        return tmp.join(arg_separator);
      } else if (typeof(val) !== "function") {
        return encodeURI(key) + "=" + encodeURI(val);
      } else {
        throw new Error('There was an error processing for http_build_query().');
      }
    } else {
      return '';
    }
  };

  if (!arg_separator) {
    arg_separator = "&";
  }
  for (key in formdata) {
    value = formdata[key];
    if (numeric_prefix && !isNaN(key)) {
      key = String(numeric_prefix) + key;
    }
    var query=_http_build_query_helper(key, value, arg_separator);
    if(query != '') {
      tmp.push(query);
    }
  }

  return tmp.join(arg_separator);
}

function parseResponse(response, cb) {
  var headers = response.headers;
  var contentType = headers['content-type'].split(';').shift();
  var parsedResponse;

  if(!response.hasOwnProperty('body')) {
    return cb(false);
  }

  switch(contentType) {
    case 'application/xml':

    var parser = new xml2js.Parser({
      mergeAttrs: true
    });

    parser.addListener('end', function(result) {
      cb(result);
    });

    parser.parseString(response.body);

    break;
    case 'application/json':

    var body;

    try {
      body = JSON.parse( response.body.replace(/[\r\n]/ig, ' ') );
    } catch(err) {
      body = response.body;
    }

    cb(body);

    break;
    default:
    cb(response.body);
    break;
  }
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
