/**
 * Base Record Object Class
 * Provides the base getters and setters for all records
 */

var _ = require('underscore');

module.exports = function(self, properties, props) {

  self._properties = _.clone(properties);

  function _set(prop, value) {
    if(_.contains(self._READONLY, prop)) {
      return false;
    } else {
      return self._properties[prop] = value;
    }
  }

  var Record = {

    _type: 'record',

    init: function() {
      for(var k in props) {
        if(props.hasOwnProperty(k) &&
           self._properties.hasOwnProperty(k)) {
          this.set(k, props[k]);
        }
      }
    },

    propertyKeys: function() {
      return _.keys(self._properties);
    },

    readOnlyKeys: function() {
      return _.keys(self._READONLY);
    },

    get: function(prop) {
      return self._properties[prop];
    },

    _set: _set,

    set: function(prop, value) {
      _set(prop, value);
    },

    // Should model data[field]

    toJSON: function() {

      var data = {};
      var keys = this.propertyKeys();

      for(var i=0;i<keys.length;i++) {
        var key = keys[i];
        var value = this.get(key);

        if(!_.isNull(value)) {
          if(_.isObject(value)) {
            if(value.toJSON) {
              data[key] = value.toJSON();
            } else {
              data[key] = value;
            }
          } else {
            data[key] = value;
          }
        }
      }

      return data;
    }

  };

  return Record;

};