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
  var filePath = _ref3.filePath;
  var _ref3$printOptions = _ref3.printOptions;
  var printOptions = _ref3$printOptions === undefined ? {} : _ref3$printOptions;

  var root = j(source);
  var noop = (0, _queries.findImportDeclaration)(j, root, filePath).length <= 0;

  if (!noop) {
    var identifiers = [].concat((0, _queries.findImportSpecifier)(j, root, prevExportName), (0, _queries.findImportDefaultSpecifier)(j, root, prevExportName), (0, _queries.findIdentifiers)(j, root, prevExportName));

    identifiers.forEach((0, _mutators.renameIdentifier)(j, nextExportName));
  }

  return root.toSource(printOptions);
}