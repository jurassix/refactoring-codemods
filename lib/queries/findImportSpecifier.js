'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


// import {RENAME_THIS as no} from './example';

var findImportSpecifier = exports.findImportSpecifier = function findImportSpecifier(j, root, name) {
  return root.find(j.ImportDeclaration).find(j.ImportSpecifier).find(j.Identifier, { name: name }).paths();
};