'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = removeExtension;

var _path = require('path');

function removeExtension(filePath) {
  var ext = (0, _path.extname)(filePath);
  if (ext.length === 0) return filePath;
  return filePath.slice(0, -1 * ext.length);
}