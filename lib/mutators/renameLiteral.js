'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var renameLiteral = exports.renameLiteral = function renameLiteral(j, newName) {
  return function (path) {
    j(path).replaceWith(function () {
      return j.literal(newName);
    });
  };
};