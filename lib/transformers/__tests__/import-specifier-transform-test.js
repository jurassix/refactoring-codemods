'use strict';

var _path = require('path');

var _testUtils = require('jscodeshift/dist/testUtils');

var basedir = (0, _path.resolve)(__dirname, '..' + _path.sep + '__testfixtures__');

var options = {
  prevSpecifier: 'foo',
  nextSpecifier: 'fooPrime',
  declarationFilePath: '' + basedir + _path.sep + 'bar.js',
  printOptions: {
    trailingComma: true,
    quote: 'single'
  },
  'inline-single-expressions': true
};

(0, _testUtils.defineTest)(__dirname, 'import-specifier-transform', options);
(0, _testUtils.defineTest)(__dirname, 'import-specifier-transform', options, 'import-specifier-transform-alias');