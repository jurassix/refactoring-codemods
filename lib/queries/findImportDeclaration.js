'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


// import {example as no} from './RENAME_THIS';

var findImportDeclarationLiteral = exports.findImportDeclarationLiteral = function findImportDeclarationLiteral(j, root, filePath) {
  return root.find(j.ImportDeclaration).find(j.Literal, { value: filePath }).paths();
};

var findImportDeclaration = exports.findImportDeclaration = function findImportDeclaration(j, root, filePath) {
  var filter = {
    source: {
      type: 'Literal',
      value: filePath
    }
  };
  return root.find(j.ImportDeclaration, filter).paths();
};