/**
 * Tribe HR User Record
 * From: http://developers.tribehr.com/api/available-api-objects/users/
 *
 * A note on READONLY propeties:
 * All readonly properties will be stripped when record is saved and can only be set on User creation.
 */

var _ = require('underscore'),
    util = require('util'),
    Record = require('./record'),
    AssignmentRecord = require('./assignment-record'),
    EmployeeRecord = require('./employee-record'),
    CustomField = require('./custom-field');

module.exports = function(props) {

  this._READONLY = 'group_name, full_name, incomplete_goal_count, skills_count, notes_received, kudos_received, values_supported'.split(', ');

  var properties = {
    id: null,  // the ID of the User
    group_id: null,  // the User’s role ID (Administrators = 1, Managers = 2, Employees = 3)
    access: null, // the User’s account state (Active = 0, Suspended = 1, Terminated = 2, default: 0)
    group_name: null, // the human-readable name of the User’s group_id (Text, read only)
    username: null, // the unique name associated with this User, can be used for login (Text)
    full_name: null, // the combination of the User’s first and last names (Text, read only)
    email: null, // the User’s unique email address (Email)
    twitter_username: null, // the User’s unique name for the Twitter service (Text, optional)
    linkedin_url: null, // the URL for the User’s LinkedIn profile (URL, optional)
    blog_url: null, // the URL for the User’s public blog (URL, optional)
    incomplete_goal_count: null, // number of incomplete Goals (Numeric, read only)
    skills_count: null, // number of Notes for this User (Numeric, read only)
    notes_received: null, // number of Notes for this User (Numeric, read only)
    kudos_received: null, // number of Kudos given to this User (Numeric, read only)
    values_supported: null, // number of Values supported by this User’s actions (Numeric, read only)
    created: null, // date and time record was created (YYYY-MM-DD HH:MM:SS, optional)
    modified: null, // date and time record was last modified (YYYY-MM-DD HH:MM:SS, optional)
    skip_invite: null, // specify this attribute to skip sending an invite email to the employee (write only, optional)
    assignment_record: null,
    employee_record: null,
    custom_field_record: null
  };

  var User = _.extend(Record(this, properties, props), {

    _type: 'users',

    set: function(prop, value) {

      switch(prop) {
        case 'assignment_record':
          this._set(prop, new AssignmentRecord(value));
        break;
        case 'employee_record':
          this._set(prop, new EmployeeRecord(value));
        break;
        case 'custom_field_record':

        break;
        default:
          this._set(prop, value);
        break;
      }

    },

    validate: function(data) {
      // Validate that the record was saved correctly

      return true;
    }

  });

  User.init();

  return User;

};