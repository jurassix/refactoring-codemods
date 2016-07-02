'use strict';

var _path = require('path');

var _testUtils = require('jscodeshift/dist/testUtils');

var basedir = (0, _path.resolve)(__dirname, '..' + _path.sep + '__testfixtures__');

var options = {
  prevFilePath: basedir + '/bar.js',
  nextFilePath: basedir + '/new/path/to/bar.js',
  printOptions: {
    trailingComma: true,
    quote: 'single'
  },
  'inline-single-expressions': true
};

(0, _testUtils.defineTest)(__dirname, 'import-declaration-transform', options);