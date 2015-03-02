/*
 * grunt-critical-css
 * https://github.com/attilab/grunt-critical-css
 *
 * Copyright (c) 2015 Attila Beregszaszi
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var path = require('path');

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    connect: {
      server: {
        options: {
          hostname: '127.0.0.1',
          port: 8998,
          base: path.join('node_modules', 'critical-css', 'tests', 'fixtures')
        }
      }
    },

    // Configuration to be run (and then tested).
    critical_css: {
      default_options: {
        options: {
        },
        url: 'http://<%= connect.server.options.hostname %>:<%= connect.server.options.port %>/site.html',
        dest: 'tmp/default_options.css'
      },
      custom_options: {
        options: {
          keepInlineStyles: true,
        },
        url: 'http://<%= connect.server.options.hostname %>:<%= connect.server.options.port %>/site.html',
        dest: 'tmp/custom_options.css'
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['jshint', 'clean', 'connect', 'critical_css', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['test']);

};
