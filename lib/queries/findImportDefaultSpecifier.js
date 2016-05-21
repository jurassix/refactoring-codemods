'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


// import RENAME_THIS from './example';

var findImportDefaultSpecifier = exports.findImportDefaultSpecifier = function findImportDefaultSpecifier(j, root, name) {
  return root.find(j.ImportDeclaration).find(j.ImportDefaultSpecifier).find(j.Identifier, { name: name }).paths();
};