import {dirname, relative} from 'path';
import {ensureDotSlash, filterMatchingPaths, removeExtension} from './fileHelpers';

const renameLiteral = (j, newName) => (path) => {
  j(path).replaceWith(() => j.literal(newName));
};

export default function importDeclarationTransform(file, api, options) {
  const {path: filePath, source} = file;
  const {jscodeshift: j} = api;
  let {paths, printOptions = {}} = options;

  if (!Array.isArray(paths)) paths = [{ ...options }];

  const root = j(source);
  const basedir = dirname(filePath);

  const requireDeclarations = root
    .find(j.VariableDeclarator, {
      id: {type: 'Identifier'},
      init: {callee: {name: 'require'}},
    })
    .find(j.Literal);

  const importDeclarations = root
    .find(j.ImportDeclaration)
    .find(j.Literal);

  const exportDeclarations = root
    .find(j.ExportNamedDeclaration)
    .filter((path) => path.value.source !== null)
    .find(j.Literal);

  const exportAllDeclarations = root
    .find(j.ExportAllDeclaration)
    .find(j.Literal);

  const allPaths = [].concat(
    requireDeclarations.paths(),
    importDeclarations.paths(),
    exportDeclarations.paths(),
    exportAllDeclarations.paths()
  );

  paths.forEach(({prevFilePath, nextFilePath}) => {
    const matchesPath = filterMatchingPaths(basedir, prevFilePath);
    const relativeNextFilePath = ensureDotSlash(removeExtension(relative(basedir, nextFilePath)));

    const nodesToUpdate = j(allPaths).filter(matchesPath);

    const noop = nodesToUpdate.length <= 0;
    if (noop) return;

    nodesToUpdate.forEach(
      renameLiteral(j, relativeNextFilePath)
    );
  });

  return root.toSource(printOptions);
}
