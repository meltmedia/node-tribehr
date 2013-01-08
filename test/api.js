// api test

var assert = require('assert'),
    _ = require('underscore'),
    User = require('../lib/model/user'),
    TribeHR = require('../index'),
    config = require('./config.json');

describe('API', function() {

  describe('Users', function() {

    var tribeHR, user;

    before(function() {
      tribeHR = TribeHR();

      tribeHR.configure(function() {
        tribeHR.set('site', config.site);
        tribeHR.set('username', config.username);
        tribeHR.set('password', config.password);
      });

      tribeHR.listen();

      user = new User({
        "group_id": 3,
        "skip_invite": 1,
        "employee_record": {
          "first_name": "John",
          "middle_name": "M",
          "last_name": "Doe",
          "phone": "480-390-9440"
        },
        "assignment_record": {
          "effective_date": "2012-9-10",
          "date_hired": "2012-9-10",
          "status": 0,
          "pay_type": 1
        }
      });
    });

    describe('#get', function() {
      this.timeout(15000);

      var error, user;

      before(function(done) {
        tribeHR.get(new User({id: 2}), function(err, data) {
          error = err;
          user = data;
          done();
        });
      });

      it('should not error', function() {
        assert.equal(null, error);
      });

      it('should return a users record', function() {
        assert.ok(_.isObject(user));
      });

    });

    describe('#list', function() {
      this.timeout(15000);

      var error, users;

      before(function(done) {
        tribeHR.list(new User({}), function(err, data) {
          error = err;
          users = data;
          done();
        });
      });

      it('should not error', function() {
        assert.equal(null, error);
      });

      it('should return a list of users', function() {
        assert.ok(users.length > 0);
        assert.ok(_.isArray(users));
      });

    });

    describe('#create', function() {
      this.timeout(15000);

      var error;

      before(function(done) {
        tribeHR.create(user, function(err) {
          error = err;
          done();
        });
      });

      it('should not error', function() {
        assert.equal(null, error);
      });

      it('should return successfully', function() {
        assert.notEqual(null, user.get('id'));
        assert.equal(user.get('full_name'), 'John Doe');
      });

    });

    describe('#update', function() {
      this.timeout(15000);

      var error;

      before(function(done) {
        user.set('twitter_username', 'johndoe');

        tribeHR.update(user, function(err) {
          error = err;
          done();
        });
      });

      it('should not error', function() {
        assert.equal(null, error);
      });

      it('should return successfully', function() {
        assert.notEqual(null, user.get('id'));
        assert.equal(user.get('twitter_username'), 'johndoe');
      });

    });

    describe('#remove', function() {
      this.timeout(15000);

      var error;

      before(function(done) {
        tribeHR.remove(user, function(err) {
          error = err;
          done();
        });
      });

      it('should not error', function() {
        assert.equal(null, error);
      });

    });

  });

});