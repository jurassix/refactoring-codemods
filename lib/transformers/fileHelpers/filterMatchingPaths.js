'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = filterMatchingPaths;

var _path = require('path');

var _removeExtension = require('./removeExtension');

var _removeExtension2 = _interopRequireDefault(_removeExtension);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function filterMatchingPaths(basedir, filePath) {
  var normalizedFilePath = (0, _removeExtension2.default)(filePath);
  return function (path) {
    var testPath = (0, _removeExtension2.default)((0, _path.resolve)(basedir, path.value.value));
    return testPath === normalizedFilePath;
  };
}