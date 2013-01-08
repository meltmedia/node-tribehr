/**
 * TribeHR Custom Field
 * From: http://developers.tribehr.com/api/available-api-objects/users/
 *
 * A note on READONLY propeties:
 * All readonly properties will be stripped when record is saved and can only be set on User creation.
 */

var _ = require('underscore'),
    Record = require('./record');

module.exports = function(props) {

  this._READONLY = 'encrypted, visibility'.split(', ');

  var properties = {
    id: null, // the ID of this CustomField definition
    name: null, // the label given to this CustomField (Text)
    type: null, // the input field type for this CustomField (Text, Textarea)
    encrypted: null, // indicates if the CustomField is stored encrypted in the database (Binary, read only)
    order: null, // the order in which this CustomField is presented on the app page, relative to other CustomField entities (Numeric)
    visibility: null, // a value indicating who has permission to see the contents of the CustomField (Numeric, read only)
    created: null, // date and time record was created (YYYY-MM-DD HH:MM:SS, optional)
    modified: null // date and time record was last modified (YYYY-MM-DD HH:MM:SS, optional)
  };

  var CustomField = _.extend(Record(this, properties, props), {

  });

  return CustomField;

};