// api/index.js

var users = require('./users'),
    jobPostings = require('./job-postings'),
    jobApplications = require('./job-applications'),
    leaveRequests = require('./leave-requests'),
    kudos = require('./kudos'),
    departments = require('./departments');

module.exports = {

  configure: function(config) {
    users.configure(config);
    jobPostings.configure(config);
    jobApplications.configure(config);
    leaveRequests.configure(config);
    kudos.configure(config);
    departments.configure(config);
  },

  commands: {
    users: users,
    jobPostings: jobPostings,
    jobApplications: jobApplications,
    leaveRequests: leaveRequests,
    kudos: kudos,
    departments: departments
  }
};