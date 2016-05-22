'use strict';

var _testUtils = require('jscodeshift/dist/testUtils');

var options = {
  prevExportName: 'SUCCESS',
  nextExportName: 'AWESOME',
  printOptions: {
    trailingComma: true,
    quote: 'single'
  },
  'inline-single-expressions': true
};

(0, _testUtils.defineTest)(__dirname, 'import-specifier-transform', options);