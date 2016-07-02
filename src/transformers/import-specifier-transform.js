import {extname, normalize, resolve, sep} from 'path';

const renameIdentifier = (j, newName) => (path) => {
  j(path).replaceWith(() => j.identifier(newName));
};

const removeExtention = (filePath) => {
  const ext = extname(filePath);
  if (ext.length === 0) return filePath;
  return filePath.slice(0, (-1 * ext.length));
};

const filterMatchingPaths = (basedir, filePath) => (path) => {
  const testPath = removeExtention(normalize(resolve(basedir, path.value.value)));
  return testPath === removeExtention(filePath);
};
export default function importSpecifierTransform(file, api, options) {
  const {path: filePath, source} = file;
  const {jscodeshift: j} = api;
  const {prevSpecifier, nextSpecifier, declarationFilePath, printOptions = {}} = options;

  const root = j(source);
  const basedir = normalize(resolve(filePath, `..${sep}`));
  const matchesPath = filterMatchingPaths(basedir, normalize(declarationFilePath));

  const requires = root
    .find(j.VariableDeclarator, {
      id: {type: 'Identifier'},
      init: {callee: {name: 'require'}},
    })
    .find(j.Literal)
    .filter(matchesPath);

  const imports = root
    .find(j.ImportDeclaration)
    .find(j.Literal)
    .filter(matchesPath);

  const noop = [].concat(requires.paths(), imports.paths()).length <= 0;
  if (noop) return null;

  const importSpecifiers = root
    .find(j.ImportDeclaration)
    .find(j.ImportSpecifier)
    .find(j.Identifier, {name: prevSpecifier});

  const importDefaultSpecifiers = root
    .find(j.ImportDeclaration)
    .find(j.ImportDefaultSpecifier)
    .find(j.Identifier, {name: prevSpecifier});

  const identifiers = root
    .find(j.Identifier, {name: prevSpecifier});

  [].concat(
    importSpecifiers.paths(),
    importDefaultSpecifiers.paths(),
    identifiers.paths(),
  ).forEach(
    renameIdentifier(j, nextSpecifier)
  );

  return root.toSource(printOptions);
}
