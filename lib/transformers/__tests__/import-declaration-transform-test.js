'use strict';

var _testUtils = require('jscodeshift/dist/testUtils');

var options = {
  prevFilePath: '../../constants',
  nextFilePath: '../../nextConstants',
  printOptions: {
    trailingComma: true,
    quote: 'single'
  },
  'inline-single-expressions': true
};

(0, _testUtils.defineTest)(__dirname, 'import-declaration-transform', options);