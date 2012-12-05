// leave-requests.js

var config = null;

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