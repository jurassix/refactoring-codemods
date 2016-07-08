'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = importRelativeTransform;

var _path = require('path');

var _fileHelpers = require('./fileHelpers');

var renameLiteral = function renameLiteral(j, preFileDir, nextFileDir) {
  return function (path) {
    var absolutePath = (0, _path.resolve)(preFileDir, path.value.value);
    var nextRelativePath = (0, _path.relative)(nextFileDir, absolutePath);
    j(path).replaceWith(function () {
      return j.literal(nextRelativePath);
    });
  };
};

function importRelativeTransform(file, api, options) {
  var source = file.source;
  var j = api.jscodeshift;
  var prevFilePath = options.prevFilePath;
  var nextFilePath = options.nextFilePath;
  var _options$printOptions = options.printOptions;
  var printOptions = _options$printOptions === undefined ? {} : _options$printOptions;


  var root = j(source);
  var prevFileDir = (0, _path.dirname)(prevFilePath);
  var nextFileDir = (0, _path.dirname)(nextFilePath);
  var filterNonRelativePaths = function filterNonRelativePaths(path) {
    return (0, _fileHelpers.isRelativePath)(path.value.value);
  };

  var requires = root.find(j.VariableDeclarator, {
    id: { type: 'Identifier' },
    init: { callee: { name: 'require' } }
  }).find(j.Literal).filter(filterNonRelativePaths);

  var imports = root.find(j.ImportDeclaration).find(j.Literal).filter(filterNonRelativePaths);

  var nodesToUpdate = [].concat(requires.paths(), imports.paths());

  var noop = nodesToUpdate.length <= 0;
  if (noop) return null;

  nodesToUpdate.forEach(renameLiteral(j, prevFileDir, nextFileDir));

  return root.toSource(printOptions);
}