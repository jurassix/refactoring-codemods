'use strict';

var _testUtils = require('jscodeshift/dist/testUtils');

var options = {
  prevExportName: 'foo',
  nextExportName: 'fooPrime',
  filePath: './bar',
  printOptions: {
    trailingComma: true,
    quote: 'single'
  },
  'inline-single-expressions': true
};

(0, _testUtils.defineTest)(__dirname, 'import-specifier-transform', options);
(0, _testUtils.defineTest)(__dirname, 'import-specifier-transform', options, 'noop-unmatched-imports');