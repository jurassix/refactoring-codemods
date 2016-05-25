'use strict';

var _testUtils = require('jscodeshift/dist/testUtils');

var options = {
  prevFilePath: './bar',
  nextFilePath: './new/path/to/bar',
  printOptions: {
    trailingComma: true,
    quote: 'single'
  },
  'inline-single-expressions': true
};

(0, _testUtils.defineTest)(__dirname, 'import-declaration-transform', options);