'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = importRelativeTransform;

var _path = require('path');

var _fileHelpers = require('./fileHelpers');

var renameLiteral = function renameLiteral(j, prevFilePath, nextFilePath) {
  return function (path) {
    var absolutePath = (0, _path.resolve)(prevFilePath, path.value.value);
    var nextRelativePath = (0, _path.relative)(nextFilePath, absolutePath);
    console.log('ABS:: ', absolutePath);
    console.log('NEXT:: ', nextRelativePath);
    j(path).replaceWith(function () {
      return j.literal(nextRelativePath);
    });
  };
};

function importRelativeTransform(file, api, options) {
  var filePath = file.path;
  var source = file.source;
  var j = api.jscodeshift;
  var prevFilePath = options.prevFilePath;
  var nextFilePath = options.nextFilePath;
  var _options$printOptions = options.printOptions;
  var printOptions = _options$printOptions === undefined ? {} : _options$printOptions;


  var root = j(source);
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

  nodesToUpdate.forEach(renameLiteral(j, prevFilePath, nextFilePath));

  return root.toSource(printOptions);
}