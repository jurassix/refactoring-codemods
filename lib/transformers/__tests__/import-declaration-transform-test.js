'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _testUtils = require('jscodeshift/dist/testUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var basedir = _path2.default.resolve(__dirname, '..' + _path2.default.sep + '__testfixtures__');

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