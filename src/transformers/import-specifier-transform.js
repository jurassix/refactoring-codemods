import {dirname} from 'path';
import {filterMatchingPaths} from './fileHelpers';

const renameIdentifier = (j, newName) => (path) => {
  j(path).replaceWith(() => j.identifier(newName));
};

export default function importSpecifierTransform(file, api, options) {
  const {path: filePath, source} = file;
  const {jscodeshift: j} = api;
  const {prevSpecifier, nextSpecifier, declarationFilePath, printOptions = {}} = options;

  const root = j(source);
  const basedir = dirname(filePath);
  const matchesPath = filterMatchingPaths(basedir, declarationFilePath);

  const requireDeclarations = root
    .find(j.VariableDeclarator, {
      id: {type: 'Identifier'},
      init: {callee: {name: 'require'}},
    })
    .find(j.Literal)
    .filter(matchesPath);

  const importDeclarations = root
    .find(j.ImportDeclaration)
    .find(j.Literal)
    .filter(matchesPath);

  const exportDeclarations = root
    .find(j.ExportNamedDeclaration)
    .filter((path) => path.value.source !== null)
    .find(j.Literal)
    .filter(matchesPath);

  const noop = [].concat(
    requireDeclarations.paths(),
    importDeclarations.paths(),
    exportDeclarations.paths()
  ).length <= 0;
  if (noop) return null;

  const importSpecifiers = root
    .find(j.ImportDeclaration)
    .find(j.ImportSpecifier)
    .find(j.Identifier, {name: prevSpecifier});

  const importDefaultSpecifiers = root
    .find(j.ImportDeclaration)
    .find(j.ImportDefaultSpecifier)
    .find(j.Identifier, {name: prevSpecifier});

  const exportSpecifiers = root
    .find(j.ExportDeclaration)
    .find(j.ExportSpecifier)
    .find(j.Identifier, {name: prevSpecifier});

  const exportDefaultSpecifiers = root
    .find(j.ExportDeclaration)
    .find(j.ExportDefaultSpecifier)
    .find(j.Identifier, {name: prevSpecifier});

  const identifiers = root
    .find(j.Identifier, {name: prevSpecifier});

  [].concat(
    importSpecifiers.paths(),
    importDefaultSpecifiers.paths(),
    exportSpecifiers.paths(),
    exportDefaultSpecifiers.paths(),
    identifiers.paths(),
  ).forEach(
    renameIdentifier(j, nextSpecifier)
  );

  return root.toSource(printOptions);
}
