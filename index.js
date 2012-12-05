// main

var _ = require('underscore'),
    api = require('./lib/api');

module.exports = function() {

  var config = {
    site: null,
    username: null,
    password: null,
    activeWebhooks: false
  };

  var configurations = {
    default: function() {}
  };

  var TribeHR = {

    _getConfig: function() {
      return config;
    },

    configure: function() {
      var args = arguments;

      if(_.isString(args[0])) {
        if(_.isFunction(args[1])) {
          configurations[args[0]] = args[1];
        }
      } else {
        if(_.isFunction(args[0])) {
          configurations.default = args[0];
        } else {
          throw new Error('configure takes [String, Function] or [Function] as input');
        }
      }
    },

    // Set configuration properties
    set: function(prop, value) {
      config[prop] = value;
    },

    listen: function() {
      var NODE_ENV = (process.env.NODE_ENV) ? process.env.NODE_ENV : 'development';

      configurations.default();

      if(configurations.hasOwnProperty(NODE_ENV)) {
        configurations[NODE_ENV]();
      }

      api.configure(config);
    },

    get: function(command, data, cb) {
      if(api.commands.hasOwnProperty(command)) {
        api.commands[command].get(data, cb);
      } else {
        cb(new Error(command+' not implemented.'));
      }
    },

    list: function(command, cb) {
      if(api.commands.hasOwnProperty(command)) {
        api.commands[command].list(cb);
      } else {
        cb(new Error(command+' not implemented.'));
      }
    },

    create: function(command, data, cb) {
      if(api.commands.hasOwnProperty(command)) {
        api.commands[command].create(data, cb);
      } else {
        cb(new Error(command+' not implemented.'));
      }
    },

    update: function(command, data, cb) {
      if(api.commands.hasOwnProperty(command)) {
        api.commands[command].update(data, cb);
      } else {
        cb(new Error(command+' not implemented.'));
      }
    },

    delete: function(command, data, cb) {
      if(api.commands.hasOwnProperty(command)) {
        api.commands[command].delete(data, cb);
      } else {
        cb(new Error(command+' not implemented.'));
      }
    }
  };

  return TribeHR;
};
