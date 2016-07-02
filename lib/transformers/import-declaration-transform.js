'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = importDeclarationTransform;

var _path = require('path');

var _fileHelpers = require('./fileHelpers');

var renameLiteral = function renameLiteral(j, newName) {
  return function (path) {
    j(path).replaceWith(function () {
      return j.literal(newName);
    });
  };
};

function importDeclarationTransform(file, api, options) {
  var filePath = file.path;
  var source = file.source;
  var j = api.jscodeshift;
  var prevFilePath = options.prevFilePath;
  var nextFilePath = options.nextFilePath;
  var _options$printOptions = options.printOptions;
  var printOptions = _options$printOptions === undefined ? {} : _options$printOptions;


  var root = j(source);
  var basedir = (0, _path.resolve)(filePath, '..' + _path.sep);
  var matchesPath = (0, _fileHelpers.filterMatchingPaths)(basedir, prevFilePath);
  var relativeNextFilePath = (0, _fileHelpers.ensureDotSlash)((0, _fileHelpers.removeExtension)((0, _path.relative)(basedir, nextFilePath)));

  if (relativeNextFilePath === '') return null;

  var requires = root.find(j.VariableDeclarator, {
    id: { type: 'Identifier' },
    init: { callee: { name: 'require' } }
  }).find(j.Literal).filter(matchesPath);

  var imports = root.find(j.ImportDeclaration).find(j.Literal).filter(matchesPath);

  var nodesToUpdate = [].concat(requires.paths(), imports.paths());

  var noop = nodesToUpdate.length <= 0;
  if (noop) return null;

  nodesToUpdate.forEach(renameLiteral(j, relativeNextFilePath));

  return root.toSource(printOptions);
}