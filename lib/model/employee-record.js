/**
 * TribeHR Employee Record
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
    id: null, // the ID of the this historical record
    user_id: null, // the ID of the User
    effective_date: null, // the date that this historical record went into effect
    first_name: null, // the User’s given name (Text)
    middle_name: null, // the User’s middle name (Text, optional)
    last_name: null, // the User’s family name (Text)
    phone: null, // the User’s home telephone number (Text, optional)
    address1: null, // the User’s home address, line 1 (Text, optional)
    address2: null, // the User’s home address, line 2 (Text, optional)
    city: null, // the city where the User lives (Text, optional)
    state: null, // the State/Province/etc. where the User lives (Text, optional)
    country: null, // the User’s country of residence (Text, optional)
    postal: null, // the postal identifier for the User’s mailing address (Text, optional)
    birthdate: null, // the User’s date of birth (YYYY-MM-DD, default: 0000-00-00)
    gender_id: null, // the ID of the Gender entry associated with this User (optional, Administrators may disable this field within TribeHR)
    government_id: null, // the government ID number (SSN, SIN, etc.) for this User (optional, Administrators may disable this field within TribeHR)
    emergency_name: null, // the name of the User’s emergency contact (Text, optional)
    emergency_number: null, // the telephone number for the User’s emergency contact (Text, optional)
    created: null, // date and time record was created (YYYY-MM-DD HH:MM:SS, optional)
    modified: null // date and time record was last modified (YYYY-MM-DD HH:MM:SS, optional)
  };

  var EmployeeRecord = _.extend(Record(this, properties, props), {

  });

  EmployeeRecord.init();

  return EmployeeRecord;

};