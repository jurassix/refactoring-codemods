'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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
  var paths = options.paths;
  var _options$printOptions = options.printOptions;
  var printOptions = _options$printOptions === undefined ? {} : _options$printOptions;


  if (!Array.isArray(paths)) paths = [_extends({}, options)];

  var root = j(source);
  var basedir = (0, _path.dirname)(filePath);

  var requires = root.find(j.VariableDeclarator, {
    id: { type: 'Identifier' },
    init: { callee: { name: 'require' } }
  }).find(j.Literal);

  var imports = root.find(j.ImportDeclaration).find(j.Literal);

  var allPaths = [].concat(requires.paths(), imports.paths());

  paths.forEach(function (_ref) {
    var prevFilePath = _ref.prevFilePath;
    var nextFilePath = _ref.nextFilePath;

    var matchesPath = (0, _fileHelpers.filterMatchingPaths)(basedir, prevFilePath);
    var relativeNextFilePath = (0, _fileHelpers.ensureDotSlash)((0, _fileHelpers.removeExtension)((0, _path.relative)(basedir, nextFilePath)));

    var nodesToUpdate = j(allPaths).filter(matchesPath);

    var noop = nodesToUpdate.length <= 0;
    if (noop) return;

    nodesToUpdate.forEach(renameLiteral(j, relativeNextFilePath));
  });

  return root.toSource(printOptions);
}