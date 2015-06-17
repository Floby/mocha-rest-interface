/**
 * Module dependencies.
 */

var Suite = require('mocha/lib/suite')
  , Test = require('mocha/lib/test')
  , utils = require('mocha/lib/utils')
  , escapeRe = require('escape-string-regexp')
  , supertest = require('supertest')
  , assembler = require('url-assembler')


/**
 * an API style interface
 *
 *   api('hello world JS', function () {
 *     endpoint('/hello', function () {
 *       method('GET', function () {
 *         it('says hello', function (done) {
 *           this.api()
 *             .expect(200)
 *             .expect('Hello World!\n')
 *             .end(done)
 *         });
 *       });
 *     })
 *   })
 */

module.exports = function(suite){
  var suites = [suite];

  suite.on('pre-require', function(context, file, mocha) {

    var common = require('mocha/lib/interfaces/common')(suites, context);

    function describe (title, fn) {
      var suite = Suite.create(suites[0], title);
      suite.file = file;
      suites.unshift(suite);
      fn.call(suite);
      suites.shift();
      return suite;
    }

    context.api = function (title, fn) {
      var suite = Suite.create(suites[0], title);
      suite.file = file;
      suites.unshift(suite);

      suite.ctx._apiName = title;
      suite.ctx._apiUrl = assembler();
      suite.ctx.api = ApiHelper();
      suite.ctx.api.at = function (location) {
        suite.ctx._apiHost = location;
      }


      fn.call(suite);

      suites.shift();
      return suite;
    };

    context.method = function (title, fn) {
      var method = title;
      var suite = Suite.create(suites[0], title);
      suite.file = file;
      suites.unshift(suite);

      suite.ctx._apiMethod = method.toLowerCase().trim();

      fn.call(suite);
      suites.shift();
      return suite;
    }

    context.endpoint = function (title, fn) {
      var endpoint = title;
      var suite = Suite.create(suites[0], title);
      suite.file = file;
      suites.unshift(suite);

      suite.ctx._apiUrl = suite.ctx._apiUrl.segment(endpoint);

      fn.call(suite);
      suites.shift();
      return suite;
    }

    context.endpoint = describe;


    context.it = context.specify = function(title, fn) {
      var suite = suites[0];
      if (suite.pending) fn = null;
      var test = new Test(title, fn);
      test.file = file;
      suite.addTest(test);
      return test;
    };
    context.before = common.before;
    context.after = common.after;
    context.beforeEach = common.beforeEach;
    context.afterEach = common.afterEach;

    /// NOT EXPORTED ///
    return;

    context.before = common.before;
    context.after = common.after;
    context.beforeEach = common.beforeEach;
    context.afterEach = common.afterEach;
    context.run = mocha.options.delay && common.runWithSuite(suite);
    /**
     * Describe a "suite" with the given `title`
     * and callback `fn` containing nested suites
     * and/or tests.
     */

    context.describe = context.context = function(title, fn){
      var suite = Suite.create(suites[0], title);
      suite.file = file;
      suites.unshift(suite);
      fn.call(suite);
      suites.shift();
      return suite;
    };

    /**
     * Pending describe.
     */

    context.xdescribe =
    context.xcontext =
    context.describe.skip = function(title, fn){
      var suite = Suite.create(suites[0], title);
      suite.pending = true;
      suites.unshift(suite);
      fn.call(suite);
      suites.shift();
    };

    /**
     * Exclusive suite.
     */

    context.describe.only = function(title, fn){
      var suite = context.describe(title, fn);
      mocha.grep(suite.fullTitle());
      return suite;
    };

    /**
     * Describe a specification or test-case
     * with the given `title` and callback `fn`
     * acting as a thunk.
     */

    context.it = context.specify = function(title, fn){
      var suite = suites[0];
      if (suite.pending) fn = null;
      var test = new Test(title, fn);
      test.file = file;
      suite.addTest(test);
      return test;
    };

    /**
     * Exclusive test-case.
     */

    context.it.only = function(title, fn){
      var test = context.it(title, fn);
      var reString = '^' + escapeRe(test.fullTitle()) + '$';
      mocha.grep(new RegExp(reString));
      return test;
    };

    /**
     * Pending test case.
     */

    context.xit =
    context.xspecify =
    context.it.skip = function(title){
      context.it(title);
    };

  });
};



function ApiHelper () {
  return function () {
    var context = this;
    var method = context._apiMethod;
    var host = context._apiHost;
    if (!host) throw Error('You did not specify where to find your api')
    return supertest(host)[method]('/hello')
  }
}
