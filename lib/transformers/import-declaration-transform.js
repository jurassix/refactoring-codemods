'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = importDeclarationTransform;

var _queries = require('../queries');

var _mutators = require('../mutators');

function importDeclarationTransform(_ref, _ref2, _ref3) {
  var source = _ref.source;
  var j = _ref2.jscodeshift;
  var prevFilePath = _ref3.prevFilePath;
  var nextFilePath = _ref3.nextFilePath;
  var _ref3$printOptions = _ref3.printOptions;
  var printOptions = _ref3$printOptions === undefined ? {} : _ref3$printOptions;

  var root = j(source);
  var literals = [].concat((0, _queries.findImportDeclaration)(j, root, prevFilePath), (0, _queries.findRequires)(j, root, prevFilePath));

  literals.forEach((0, _mutators.renameLiteral)(j, nextFilePath));

  return root.toSource(printOptions);
}