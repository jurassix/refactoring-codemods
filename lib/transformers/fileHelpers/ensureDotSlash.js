'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ensureDotSlash;

var _path = require('path');

var _isRelativePath = require('./isRelativePath');

var _isRelativePath2 = _interopRequireDefault(_isRelativePath);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ensureDotSlash() {
  var filePath = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

  if (!(0, _isRelativePath2.default)(filePath)) {
    return '.' + _path.sep + filePath;
  }
  return filePath;
}