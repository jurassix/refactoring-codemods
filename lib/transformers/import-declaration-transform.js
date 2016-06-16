'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = importDeclarationTransform;

var _path = require('path');

var renameLiteral = function renameLiteral(j, newName) {
  return function (path) {
    j(path).replaceWith(function () {
      return j.literal(newName);
    });
  };
};

var filterMatchingPaths = function filterMatchingPaths(basedir, filePath) {
  return function (path) {
    return (0, _path.normalize)((0, _path.resolve)(basedir, path.value.value)) === filePath;
  };
};

var ensureDotSlash = function ensureDotSlash() {
  var filePath = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

  if (filePath[0] !== '.') {
    return '.' + _path.sep + filePath;
  }
  return filePath;
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
  var basedir = (0, _path.normalize)((0, _path.resolve)(filePath, '../'));
  var matchesPath = filterMatchingPaths(basedir, (0, _path.normalize)(prevFilePath));
  var relativeNextFilePath = ensureDotSlash((0, _path.relative)(basedir, nextFilePath));

  if (relativeNextFilePath === '') return null;

  var requires = root.find(j.VariableDeclarator, {
    id: { type: 'Identifier' },
    init: { callee: { name: 'require' } }
  }).find(j.Literal).filter(matchesPath);

  var imports = root.find(j.ImportDeclaration).find(j.Literal).filter(matchesPath);

  [].concat(requires.paths(), imports.paths()).forEach(renameLiteral(j, relativeNextFilePath));

  return root.toSource(printOptions);
}