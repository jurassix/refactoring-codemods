import {extname, normalize, relative, resolve, sep} from 'path';

const renameLiteral = (j, newName) => (path) => {
  j(path).replaceWith(() => j.literal(newName));
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

const ensureDotSlash = (filePath = '') => {
  if (filePath[0] !== '.') {
    return `.${sep}${filePath}`;
  }
  return filePath;
};

export default function importDeclarationTransform(file, api, options) {
  const {path: filePath, source} = file;
  const {jscodeshift: j} = api;
  const {prevFilePath, nextFilePath, printOptions = {}} = options;

  const root = j(source);
  const basedir = normalize(resolve(filePath, `..${sep}`));
  const matchesPath = filterMatchingPaths(basedir, normalize(prevFilePath));
  const relativeNextFilePath = ensureDotSlash(removeExtention(relative(basedir, nextFilePath)));

  if (relativeNextFilePath === '') return null;

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

  const nodesToUpdate = [].concat(requires.paths(), imports.paths());

  const noop = nodesToUpdate.length <= 0;
  if (noop) return null;

  nodesToUpdate.forEach(
    renameLiteral(j, relativeNextFilePath)
  );

  return root.toSource(printOptions);
}
