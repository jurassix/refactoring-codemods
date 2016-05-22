'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = importSpecifierTransform;

var _queries = require('../queries');

var _mutators = require('../mutators');

function importSpecifierTransform(_ref, _ref2, _ref3) {
  var source = _ref.source;
  var j = _ref2.jscodeshift;
  var prevExportName = _ref3.prevExportName;
  var nextExportName = _ref3.nextExportName;

  var root = j(source);
  var identifiers = [].concat((0, _queries.findImportSpecifier)(j, root, prevExportName), (0, _queries.findImportDefaultSpecifier)(j, root, prevExportName), (0, _queries.findIdentifiers)(j, root, prevExportName));

  identifiers.forEach((0, _mutators.renameIdentifier)(j, nextExportName));

  return root.toSource();
}