# grunt-critical-css

[![Build Status](https://api.travis-ci.org/attila/grunt-critical-css.svg?branch=master)](https://travis-ci.org/attila/grunt-critical-css)

Grunt task using [critical-css](https://github.com/attila/critical-css) to
extract Above the Fold styles from URLs.


## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out
the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains
how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as
install and use Grunt plugins. Once you're familiar with that process, you may
install this plugin with this command:

```shell
npm install grunt-critical-css --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-critical-css');
```

## The "critical_css" task

### Overview
In your project's Gruntfile, add a section named `critical_css` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  critical_css: {
    options: {
      width: 1200,
      height: 900,
    },
    your_target: {
      url: 'http://localhost:3000/', // Parse this page.
      dest: 'dist/critical.css',     // Path to save critical css to.
    },
  },
});
```

### Options

#### options.width
Type: `Integer`
Default value: `1200`

The width of the viewport used in the browser. Used to determine what is "above
the fold", i.e what is visible during rendering the page initially.

#### options.height
Type: `Integer`
Default value: `900`

The height of the viewport used in the browser. Used to determine what is "above
the fold", i.e what is visible during rendering the page initially.

#### options.excludeSelectors
Type: `Array`
Default value: `[]`

An array of CSS selectors or basically any pattern. These are matched against
every individual style declaration and if the patterns provided here match the
style rule is discarded from the output.

#### options.enabledOrigins
Type: `Array`
Default value: `[]`

An array of host names to serve as a whitelist where CSS can originate from. Any
`CSSRuleList` objects with `parentStyleSheet.href` not having this host name are
excluded from the critical CSS.

This can be useful to exclude certain styles supplied by 3rd party widgets that
are loaded asynchronously anyways.

#### options.keepInlineStyles
Type: `Boolean`
Default value: `false`

Controls whether non-external styles should be included. These are usually rules
which are already inlined or are set by JavaScript. These are excluded by
default.

#### options.ignoreConsole

Type: `Boolean` Default value: `true`

Controls console output from the headless browser should be added to the output.
Useful for debugging purposes.

#### options.maxBuffer

Type: `Integer` Default value: `819200`

Sets the output buffer for the child process.


### Usage Examples

#### Default Options
In this example, the default options are used to generate the critical CSS from
a development server. The generated stylesheet is then saved to a file under the
specified path.

```js
grunt.initConfig({
  critical_css: {
    dist: {
      url: 'http://localhost:3000/'
      file: 'dist/critical.css'
    },
  },
});
```

#### Custom Options, multiple targets
In this example, custom options are used to fetch from two different URLs whilst
sharing some custom options.

```js
grunt.initConfig({
  options: {
    excludeSelectors: [
      'html, body, div' // Prevent the CSS reset from appearing inline.
    ],
    enabledOrigins: [
      'localhost'       // Only include locally hosted styles.
    ]
  }
  desktop: {
    options: {
      width: 1200,
      height: 760,
    },
    url: 'http://www.example.com/'
    file: 'dist/critical-desktop.css'
  },
  mobile: {
    options: {
      width: 400,
      height: 800,
    },
    url: 'http://www.example.com/'
    file: 'dist/critical-mobile.css'
  },
});
```

__Pro tip:__ You can add the `grunt-inline` plugin to your build pipeline for
embedding the resulting critical stylesheets in your html file or template.


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code
using [Grunt](http://gruntjs.com/).


## Changelog

* 0.1.1 - Initial release


## License

Copyright (c) 2015 Attila Beregszaszi
Licensed under the MIT license.

## Plug

Development was sponsored by [Front Seed Labs](http://frontseed.com/) and
[Dennis Publishing](http://www.dennis.co.uk/)
