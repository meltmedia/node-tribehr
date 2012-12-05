// api test

var assert = require('assert'),
    _ = require('underscore'),
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
      this.timeout(5000);

      it('should not error', function(done) {
        tribeHR.get('users', {id: 2}, function(err, data) {
          assert.equal(null, err);
          done();
        });
      });

      it('should return a users record', function(done) {
        tribeHR.get('users', {id: 2}, function(err, data) {
          assert.ok(_.isObject(data));
          done();
        });
      });

    });

    describe('#list', function() {
      this.timeout(5000);

      it('should not error', function(done) {
        tribeHR.list('users', function(err, data) {
          assert.equal(null, err);
          done();
        });
      });

      it('should return a list of users', function(done) {
        tribeHR.list('users', function(err, data) {
          assert.ok(data.length > 0);
          assert.ok(_.isArray(data));
          done();
        });
      });

    });

    describe('#create', function() {
      this.timeout(5000);

      it('should return json');
      it('should return successfully');

    });

    describe('#update', function() {
      this.timeout(5000);

      it('should return json');
      it('should return successfully');

    });

    describe('#delete', function() {
      this.timeout(5000);

      it('should return json');
      it('should return successfully');

    });

  });

});