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
  var basedir = (0, _path.normalize)((0, _path.resolve)(filePath, '..' + _path.sep));
  var matchesPath = filterMatchingPaths(basedir, (0, _path.normalize)(prevFilePath));
  var relativeNextFilePath = ensureDotSlash(removeExtention((0, _path.relative)(basedir, nextFilePath)));

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