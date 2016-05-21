'use strict';

var _testUtils = require('jscodeshift/dist/testUtils');

var printOptions = {
  trailingComma: true
};

(0, _testUtils.defineTest)(__dirname, 'import-specifier-transform', {
  'inline-single-expressions': true,
  printOptions: printOptions
});