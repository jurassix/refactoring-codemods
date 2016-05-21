'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var renameIdentifier = exports.renameIdentifier = function renameIdentifier(j, newName) {
  return function (path) {
    j(path).replaceWith(function () {
      return j.identifier(newName);
    });
  };
};