'use strict';

var _path = require('path');

var _testUtils = require('jscodeshift/dist/testUtils');

var basedir = (0, _path.resolve)(__dirname, '../__testfixtures__');

var options = {
  paths: [{
    nextFilePath: basedir + '/import-relative-transform.input.js',
    prevFilePath: basedir + '/old/path/to/import-relative-transform.input.js'
  }],
  printOptions: {
    trailingComma: true,
    quote: 'single'
  },
  'inline-single-expressions': true
};

(0, _testUtils.defineTest)(__dirname, 'import-relative-transform', options);