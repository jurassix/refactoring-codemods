'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isRelativePath;
function isRelativePath() {
  var filePath = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

  return filePath[0] === '.';
}