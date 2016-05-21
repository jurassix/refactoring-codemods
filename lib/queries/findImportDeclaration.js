'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


// import {example as no} from './RENAME_THIS';

var findImportDeclaration = exports.findImportDeclaration = function findImportDeclaration(j, root, filePathName) {
  return root.find(j.ImportDeclaration).find(j.Literal, { value: filePathName }).paths();
};