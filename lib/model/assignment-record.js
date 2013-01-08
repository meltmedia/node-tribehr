/**
 * TribeHR Assignment Record
 * From: http://developers.tribehr.com/api/available-api-objects/users/
 *
 * A note on READONLY propeties:
 * All readonly properties will be stripped when record is saved and can only be set on User creation.
 */

var _ = require('underscore'),
    Record = require('./record');

module.exports = function(props) {

  this._READONLY = 'date_terminated'.split(', ');

  var properties = {
    id: null, // the ID of the this historical record
    user_id: null, // the ID of the User
    effective_date: null, // the date that this historical record went into effect
    job_id: null, // the ID of the Job associated with this User (optional)
    department_id: null, // the ID of the Department associated with this User (optional)
    manager_id: null, // the ID of the User identified as this user’s manager (optional)
    employee_class_id: null, // the ID of the EmployeeClass associated with this User (optional, Administrators may disable this field within TribeHR)
    status: null, // the User’s employment status (Currently Employed = 0, Suspended = 1, Terminated = 2, default: 0)
    pay_type: null, // the salary type for the User (Annual = 1, Hourly = 2, Monthly = 3, default: 1)
    pay_rate: null, // the User’s payment amount per period defined in pay_type, in the currency configured in TribeHR (Numeric, optional)
    full_time: null, // is the User full or part-time? (Full-time = 1, Part-time = 2, default: 1)
    phone: null, // the work telephone number where the User can be reached (Text, optional)
    ext: null, // the extension associated with the User’s phone number (Text, optional)
    employee_num: null, // your company-assigned identifier for this User (Text, optional)
    date_hired: null, // the User’s date of employement (YYYY-MM-DD, default: 0000-00-00)
    date_terminated: null, // date User’s employment was terminated (YYYY-MM-DD, default: 0000-00-00, read only)
    created: null, // date and time record was created (YYYY-MM-DD HH:MM:SS, optional)
    modified: null // date and time record was last modified (YYYY-MM-DD HH:MM:SS, optional)
  };

  var AssignmentRecord = _.extend(Record(this, properties, props), {

  });

  AssignmentRecord.init();

  return AssignmentRecord;

};