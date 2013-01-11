/**
 * Tribe HR Leave Request Record
 * From: http://developers.tribehr.com/api/available-api-objects/rest-leave-requests/
 *
 * A note on READONLY propeties:
 * All readonly properties will be stripped when record is saved and can only be set on Leave Request creation.
 */

var _ = require('underscore'),
    util = require('util'),
    Record = require('./record');

module.exports = function(props) {

  this._READONLY = ''.split(', ');

  var properties = {
    id: null, // the ID of the Leave Request
    leave_type_id: null, // the type of time off (Vacation: 1, Sick: 2)
    user_id: null, // the ID of the employee making the request
    date_start: null, // the date the time starts
    date_end: null, // the date the time ends
    days: null, // the number of days to use for this request (Int)
    status: null, // the status of the request (Pending: 0, Rejected: -1, Approved: 1)
    created: null, // date and time record was created
    modified: null // date and time record was last modified
  };

  var LeaveRequest = _.extend(Record(this, properties, props), {

    _type: 'leaveRequests',

    validate: function(data) {
      // Validate that the record was saved correctly

      for(var k in data) {
        this._set(k, data[k], true);
      }

      return true;
    }

  });

  LeaveRequest.init();

  return LeaveRequest;

};