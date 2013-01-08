/**
 * TribeHR Custom Field Record
 * From: http://developers.tribehr.com/api/available-api-objects/users/
 *
 * A note on READONLY propeties:
 * All readonly properties will be stripped when record is saved and can only be set on User creation.
 */

var _ = require('underscore'),
    Record = require('./record');

module.exports = function(props) {

  this._READONLY = ''.split(', ');

  var properties = {
    id: null, // the ID of the this CustomFieldRecord entry
    custom_field_id: null, // the ID of the CustomField associated with this CustomFieldRecord
    user_id: null, // the ID of the User
    content: null // the value stored in the CustomFieldRecord (Text, optional)
  };

  var CustomFieldRecord = _.extend(Record(this, properties, props), {

  });

  return CustomFieldRecord;

};