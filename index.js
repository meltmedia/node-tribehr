// main

var _ = require('underscore'),
    util = require('util'),
    api = require('./lib/api'),
    model = require('./lib/model'),
    webhook = require('./lib/webhook'),
    EventEmitter = require('events').EventEmitter;

var TribeHR = function() {

  EventEmitter.call(this);

  var config = {
    site: null,
    username: null,
    password: null,
    activeWebhooks: false
  };

  var configurations = {
    'default': function () {}
  };

  var TribeMethods = {

    // EventEmitter Methods
    addListener: this.addListener,
    on: this.on,
    once: this.once,
    removeListener: this.removeListener,
    removeAllListeners: this.removeAllListeners,
    emit: this.emit,
    listeners: this.listeners,

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
          configurations['default'] = args[0];
        } else {
          throw new Error('configure takes [String, Function] or [Function] as input');
        }
      }
    },

    // Set configuration properties
    set: function(prop, value) {
      config[prop] = value;
    },

    listen: function(server) {
      var NODE_ENV = (process.env.NODE_ENV) ? process.env.NODE_ENV : 'development';

      configurations['default']();

      if(configurations.hasOwnProperty(NODE_ENV)) {
        configurations[NODE_ENV]();
      }

      api.configure(config);
      if(server) {
        webhook.configure(config, server, this);
      }
    },

    get: function(record, cb) {
      if(api.commands.hasOwnProperty(record._type)) {
        api.commands[record._type].get(record, cb);
      } else {
        cb(new Error(record._type+' not implemented.'));
      }
    },

    list: function(record, cb) {
      if(api.commands.hasOwnProperty(record._type)) {
        api.commands[record._type].list(cb);
      } else {
        cb(new Error(record._type+' not implemented.'));
      }
    },

    create: function(record, cb) {
      if(api.commands.hasOwnProperty(record._type)) {
        api.commands[record._type].create(record, cb);
      } else {
        cb(new Error(record._type+' not implemented.'));
      }
    },

    update: function(record, cb) {
      if(api.commands.hasOwnProperty(record._type)) {
        api.commands[record._type].update(record, cb);
      } else {
        cb(new Error(record._type+' not implemented.'));
      }
    },

    remove: function(record, cb) {
      if(api.commands.hasOwnProperty(record._type)) {
        api.commands[record._type].remove(record, cb);
      } else {
        cb(new Error(record._type+' not implemented.'));
      }
    },

    User: model.User,
    LeaveRequest: model.LeaveRequest

  };

  return TribeMethods;
};

util.inherits(TribeHR, EventEmitter);
module.exports = TribeHR;