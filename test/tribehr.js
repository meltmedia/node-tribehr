// tribehr.js

var assert = require('assert'),
    _ = require('underscore'),
    Record = require('../lib/model/record'),
    User = require('../lib/model/user'),
    TribeHR = require('../index'),
    config = require('./config.json');

describe('TribeHR Module', function() {

  describe('setup', function() {

    describe('#set', function() {

      var tribeHR;

      beforeEach(function() {
        tribeHR = TribeHR();
      });

      it('should set site', function() {
        tribeHR.set('site', 'test-site');
        var config = tribeHR._getConfig();

        assert.equal('test-site', config.site);
      });

      it('should set username', function() {
        tribeHR.set('username', 'test-user');
        var config = tribeHR._getConfig();

        assert.equal('test-user', config.username);
      });

      it('should set password', function() {
        tribeHR.set('password', 'test-password');
        var config = tribeHR._getConfig();

        assert.equal('test-password', config.password);
      });

    });

    describe('#configure default', function() {

      var tribeHR;

      before(function() {
        tribeHR = TribeHR();

        tribeHR.configure(function() {
          tribeHR.set('site', 'test-site');
          tribeHR.set('username', 'test-user');
          tribeHR.set('password', 'test-password');
        });

        tribeHR.listen();
      });

      it('should set site', function() {
        var config = tribeHR._getConfig();
        assert.equal('test-site', config.site);
      });

      it('should set username', function() {
        var config = tribeHR._getConfig();
        assert.equal('test-user', config.username);
      });

      it('should set password', function() {
        var config = tribeHR._getConfig();
        assert.equal('test-password', config.password);
      });

    });

    describe('#configure development', function() {

      var tribeHR;

      before(function() {
        tribeHR = TribeHR();

        tribeHR.configure('development', function() {
          tribeHR.set('site', 'test-site');
          tribeHR.set('username', 'test-user');
          tribeHR.set('password', 'test-password');
        });

        tribeHR.listen();
      });

      it('should set site', function() {
        var config = tribeHR._getConfig();
        assert.equal('test-site', config.site);
      });

      it('should set username', function() {
        var config = tribeHR._getConfig();
        assert.equal('test-user', config.username);
      });

      it('should set password', function() {
        var config = tribeHR._getConfig();
        assert.equal('test-password', config.password);
      });

    });

    describe('#configure custom', function() {

      var tribeHR;

      before(function() {
        tribeHR = TribeHR();

        tribeHR.configure(function() {
          tribeHR.set('site', 'test-site');
        });

        tribeHR.configure('development', function() {
          tribeHR.set('site', 'test-dev-site');
          tribeHR.set('username', 'test-dev-user');
        });

        tribeHR.configure('production', function() {
          tribeHR.set('site', 'test-prod-site');
          tribeHR.set('username', 'test-prod-user');
          tribeHR.set('password', 'test-prod-password');
        });

        tribeHR.listen();
      });

      it('should set site', function() {
        var config = tribeHR._getConfig();
        assert.equal('test-dev-site', config.site);
      });

      it('should set username', function() {
        var config = tribeHR._getConfig();
        assert.equal('test-dev-user', config.username);
      });

      it('should not set password', function() {
        var config = tribeHR._getConfig();
        assert.equal(null, config.password);
      });

    });

  });

});