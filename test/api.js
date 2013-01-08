// api test

var assert = require('assert'),
    _ = require('underscore'),
    User = require('../lib/model/user'),
    TribeHR = require('../index');

describe('API', function() {

  describe('Users', function() {

    var tribeHR;

    before(function() {
      tribeHR = TribeHR();

      tribeHR.configure(function() {
        tribeHR.set('site', 'meltiest');
        tribeHR.set('username', 'ncrohn');
        tribeHR.set('password', 'aae95328676c034a25742ab00eac361852e03170');
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