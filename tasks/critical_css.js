/*
 * grunt-critical-css
 * https://github.com/attilab/grunt-critical-css
 *
 * Copyright (c) 2015 Attila Beregszaszi
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks
  var criticalCss = require('critical-css');

  grunt.registerMultiTask('critical_css', 'Grunt task to extract Above the Fold CSS for a URL', function() {
    if (!this.data.url) {
      throw new TypeError('Missing url parameter.');
    }
    if (!this.data.dest) {
      throw new TypeError('Missing dest parameter.');
    }

    var done = this.async();
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      width: 1200,
      height: 900,
      excludeSelectors: [],
      enabledOrigins: [],
      keepInlineStyles: false,
      ignoreConsole: true,
      maxBuffer: 800*1024,
    });
    // Preserve task-specific data for the callback.
    var data = {
      url: this.data.url,
      dest: this.data.dest
    };

    criticalCss.generate(data.url, options, function(err, output) {
      if (err) {
        throw new Error(err.message);
      }

      grunt.file.write(data.dest, output);
      grunt.log.writeln('\u000aCritical CSS extracted to "' + data.dest + '".');
      done();
    });
  });
};
