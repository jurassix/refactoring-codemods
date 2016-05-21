'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


// imports, expressions, variables
// too liberal with renaming -- needs to change variables coming from import declarations

var findIdentifiers = exports.findIdentifiers = function findIdentifiers(j, root, name) {
  return root.find(j.Identifier, { name: name }).paths();
};