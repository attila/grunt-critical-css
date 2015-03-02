(function(exports) {

  var grunt = require('grunt');
  var path = require('path');

  /*
    ======== A Handy Little Nodeunit Reference ========
    https://github.com/caolan/nodeunit

    Test methods:
      test.expect(numAssertions)
      test.done()
    Test assertions:
      test.ok(value, [message])
      test.equal(actual, expected, [message])
      test.notEqual(actual, expected, [message])
      test.deepEqual(actual, expected, [message])
      test.notDeepEqual(actual, expected, [message])
      test.strictEqual(actual, expected, [message])
      test.notStrictEqual(actual, expected, [message])
      test.throws(block, [error], [message])
      test.doesNotThrow(block, [error], [message])
      test.ifError(value)
  */

  exports.critical_css = {
    setUp: function(done) {
      // setup here if necessary
      done();
    },

    default_options: function(test) {
      test.expect(1);
      var actual = grunt.file.read(path.join(__dirname, '..', 'tmp', 'default_options.css'));
      var expected = grunt.file.read('test/expected/default_options.css');
      test.equal(actual, expected, 'Output should match using default options.');
      test.done();
    },

    custom_options: function(test) {
      test.expect(1);
      var actual = grunt.file.read(path.join(__dirname, '..', 'tmp', 'custom_options.css'));
      var expected = grunt.file.read('test/expected/custom_options.css');
      test.equal(actual, expected, 'Output should match using custom options.');
      test.done();
    },
  };

}(typeof exports === 'object' && exports || this));
