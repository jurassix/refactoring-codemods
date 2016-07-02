'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = importSpecifierTransform;

var _path = require('path');

var renameIdentifier = function renameIdentifier(j, newName) {
  return function (path) {
    j(path).replaceWith(function () {
      return j.identifier(newName);
    });
  };
};

var removeExtention = function removeExtention(filePath) {
  var ext = (0, _path.extname)(filePath);
  if (ext.length === 0) return filePath;
  return filePath.slice(0, -1 * ext.length);
};

var filterMatchingPaths = function filterMatchingPaths(basedir, filePath) {
  return function (path) {
    var testPath = removeExtention((0, _path.normalize)((0, _path.resolve)(basedir, path.value.value)));
    return testPath === removeExtention(filePath);
  };
};
function importSpecifierTransform(file, api, options) {
  var filePath = file.path;
  var source = file.source;
  var j = api.jscodeshift;
  var prevSpecifier = options.prevSpecifier;
  var nextSpecifier = options.nextSpecifier;
  var declarationFilePath = options.declarationFilePath;
  var _options$printOptions = options.printOptions;
  var printOptions = _options$printOptions === undefined ? {} : _options$printOptions;


  var root = j(source);
  var basedir = (0, _path.normalize)((0, _path.resolve)(filePath, '..' + _path.sep));
  var matchesPath = filterMatchingPaths(basedir, (0, _path.normalize)(declarationFilePath));

  var requires = root.find(j.VariableDeclarator, {
    id: { type: 'Identifier' },
    init: { callee: { name: 'require' } }
  }).find(j.Literal).filter(matchesPath);

  var imports = root.find(j.ImportDeclaration).find(j.Literal).filter(matchesPath);

  var noop = [].concat(requires.paths(), imports.paths()).length <= 0;
  if (noop) return null;

  var importSpecifiers = root.find(j.ImportDeclaration).find(j.ImportSpecifier).find(j.Identifier, { name: prevSpecifier });

  var importDefaultSpecifiers = root.find(j.ImportDeclaration).find(j.ImportDefaultSpecifier).find(j.Identifier, { name: prevSpecifier });

  var identifiers = root.find(j.Identifier, { name: prevSpecifier });

  [].concat(importSpecifiers.paths(), importDefaultSpecifiers.paths(), identifiers.paths()).forEach(renameIdentifier(j, nextSpecifier));

  return root.toSource(printOptions);
}