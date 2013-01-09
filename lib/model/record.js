/**
 * Base Record Object Class
 * Provides the base getters and setters for all records
 */

var _ = require('underscore');

module.exports = function(self, properties, props) {

  self._changed = [];
  self._properties = _.clone(properties);

  function _set(prop, value, isOverride) {
    if(_.contains(self._READONLY, prop) && !isOverride) {
      return false;
    } else {
      if(!isOverride) {
        self._changed.push(prop);
      }
      return self._properties[prop] = value;
    }
  }

  var Record = {

    _type: 'record',

    init: function() {
      for(var k in props) {
        if(props.hasOwnProperty(k) &&
           self._properties.hasOwnProperty(k)) {
          this._set(k, props[k], true);
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

    getChanged: function() {
      var changed = {};
      var changedKeys = self._changed;

      for(var i=0;i<changedKeys.length;i++) {
        changed[changedKeys[i]] = this.get(changedKeys[i]);
      }

      changed.id = this.get('id');

      return changed;
    },

    saved: function() {
      self._changed = [];
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