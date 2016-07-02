'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ensureDotSlash;

var _path = require('path');

function ensureDotSlash() {
  var filePath = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

  if (filePath[0] !== '.') {
    return '.' + _path.sep + filePath;
  }
  return filePath;
}