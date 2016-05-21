'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = transformer;
// https://astexplorer.net/#/3qfKe0vrRn/3

var prevName = 'SUCCESS';
var nextName = 'AWESOME';
var prevFilePath = '../../constants';
var nextFilePath = '../../constants/status';

function transformer(file, _ref) {
  var j = _ref.jscodeshift;

  var root = j(file.source);

  var renameIdentifier = function renameIdentifier(newName) {
    return function (path) {
      j(path).replaceWith(function () {
        return j.identifier(newName);
      });
    };
  };

  var renameLiteral = function renameLiteral(newName) {
    return function (path) {
      j(path).replaceWith(function () {
        return j.literal(newName);
      });
    };
  };

  // import {RENAME_THIS as no} from './example';
  // UNUSED
  root.find(j.ImportDeclaration).find(j.ImportSpecifier).find(j.Identifier, { name: prevName }).forEach(renameIdentifier(nextName));

  // import RENAME_THIS from './example';
  // UNUSED
  root.find(j.ImportDeclaration).find(j.ImportDefaultSpecifier).find(j.Identifier, { name: prevName }).forEach(renameIdentifier(nextName));

  // imports, expressions, variables
  // too liberal with renaming -- needs to change variables coming from import declarations
  root.find(j.Identifier, { name: prevName }).forEach(renameIdentifier(nextName));

  // import {example as no} from './RENAME_THIS';
  root.find(j.ImportDeclaration).find(j.Literal, { value: prevFilePath }).forEach(renameLiteral(nextFilePath));

  // const example = requrire('./RENAME_THIS');
  root.find(j.VariableDeclarator, {
    id: { type: 'Identifier' },
    init: { callee: { name: 'require' } }
  }).find(j.Literal).forEach(renameLiteral(nextFilePath));

  return root.toSource();
}