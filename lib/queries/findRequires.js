'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


/**
  const example = requrire('./RENAME_THIS');
*/

var findRequires = exports.findRequires = function findRequires(j, root) {
  return root.find(j.VariableDeclarator, {
    id: { type: 'Identifier' },
    init: { callee: { name: 'require' } }
  }).find(j.Literal).paths();
};