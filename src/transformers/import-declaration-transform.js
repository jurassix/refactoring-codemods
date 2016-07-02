import {relative, resolve, sep} from 'path';
import {ensureDotSlash, filterMatchingPaths, removeExtension} from './fileHelpers';

const renameLiteral = (j, newName) => (path) => {
  j(path).replaceWith(() => j.literal(newName));
};

export default function importDeclarationTransform(file, api, options) {
  const {path: filePath, source} = file;
  const {jscodeshift: j} = api;
  const {prevFilePath, nextFilePath, printOptions = {}} = options;

  const root = j(source);
  const basedir = resolve(filePath, `..${sep}`);
  const matchesPath = filterMatchingPaths(basedir, prevFilePath);
  const relativeNextFilePath = ensureDotSlash(removeExtension(relative(basedir, nextFilePath)));

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
