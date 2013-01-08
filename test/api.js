// api test

var assert = require('assert'),
    _ = require('underscore'),
    User = require('../lib/model/user'),
    TribeHR = require('../index'),
    config = require('./config.json');

describe('API', function() {

  describe('Users', function() {

    var tribeHR;

    before(function() {
      tribeHR = TribeHR();

      tribeHR.configure(function() {
        tribeHR.set('site', config.site);
        tribeHR.set('username', config.username);
        tribeHR.set('password', config.password);
      });

      tribeHR.listen();
    });

    describe('#get', function() {
      this.timeout(15000);

      it('should not error', function(done) {
        tribeHR.get(new User({id: 2}), function(err, data) {
          assert.equal(null, err);
          done();
        });
      });

      it('should return a users record', function(done) {
        tribeHR.get(new User({id: 2}), function(err, data) {
          assert.ok(_.isObject(data));
          done();
        });
      });

    });

    describe('#list', function() {
      this.timeout(15000);

      it('should not error', function(done) {
        tribeHR.list(new User({}), function(err, data) {
          assert.equal(null, err);
          done();
        });
      });

      it('should return a list of users', function(done) {
        tribeHR.list(new User({}), function(err, data) {
          assert.ok(data.length > 0);
          assert.ok(_.isArray(data));
          done();
        });
      });

    });

    describe('#create', function() {
      this.timeout(15000);

      it('should not error');
      it('should return successfully');

    });

    describe('#update', function() {
      this.timeout(15000);

      it('should not error');
      it('should return successfully');

    });

    describe('#remove', function() {
      this.timeout(15000);

      it('should not error');
      it('should return successfully');

    });

  });

});