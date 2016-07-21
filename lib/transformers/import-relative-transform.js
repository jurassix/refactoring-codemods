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
    var nextRelativePath = (0, _fileHelpers.ensureDotSlash)((0, _path.relative)(nextFileDir, absolutePath));
    j(path).replaceWith(function () {
      return j.literal(nextRelativePath);
    });
  };
};

function importRelativeTransform(file, api, options) {
  var filePath = file.path;
  var source = file.source;
  var j = api.jscodeshift;
  var paths = options.paths;
  var _options$printOptions = options.printOptions;
  var printOptions = _options$printOptions === undefined ? {} : _options$printOptions;


  var prevFilePath = void 0;
  if (!Array.isArray(paths)) {
    prevFilePath = options.prevFilePath;
  } else {
    var found = paths.find(function (_ref) {
      var nextFilePath = _ref.nextFilePath;
      return filePath === nextFilePath;
    });
    if (found) prevFilePath = found.prevFilePath;
  }

  // noop
  if (prevFilePath == null) return null;

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

  var prevFileDir = (0, _path.dirname)(prevFilePath);
  var nextFileDir = (0, _path.dirname)(filePath);
  nodesToUpdate.forEach(renameLiteral(j, prevFileDir, nextFileDir));

  return root.toSource(printOptions);
}