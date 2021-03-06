/*global describe, beforeEach, it*/
'use strict';

var path  = require('path');
var yeoman  = require('yeoman-generator');
var helpers = yeoman.test;
var assert  = yeoman.assert;
var createAppGenerator = require('../helpers/create-generator').createAppGenerator;
var createSubGenerator = require('../helpers/create-generator').createSubGenerator;

describe('Factory sub-generator', function() {
  beforeEach(function(done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function(err) {
      if (err) {
        return done(err);
      }

      this.app = createAppGenerator();

      done();
    }.bind(this));
  });

  describe('Create factory files with Angular', function() {
    it('Handles defaults', function(done) {
      // Filename
      var factory = 'myfactory';
      var filesToTest = [
        'client/app/' + factory + '/' + factory + '.factory.js',
        'client/app/' + factory + '/' + factory + '.factory.spec.js'
      ];

      helpers.mockPrompt(this.app, {
        jsFramework: 'angular',
        singlePageApplication: true
      });
      this.app.run([], function() {
        createSubGenerator('factory', factory, {}, {
          // mock prompt data
          factoryFile: 'client/app'
        }, function() {
          assert.file(filesToTest);
          done();
        });
      });
    });
    it('Handles funky path', function(done) {
      // Filename
      var funkyPath = '/////funkypath/////';
      var filesToTest = [
        'client/app/funkypath/funkypath.factory.js',
        'client/app/funkypath/funkypath.factory.spec.js'
      ];

      helpers.mockPrompt(this.app, {
        jsFramework: 'angular',
        singlePageApplication: true
      });
      this.app.run([], function() {
        createSubGenerator('factory', funkyPath, {}, {
          // mock prompt data
          factoryFile: 'client/app',
        }, function() {
          assert.file(filesToTest);
          done();
        });
      });
    });
  });
});
