import {relative, resolve} from 'path';
import {isRelativePath} from './fileHelpers';

const renameLiteral = (j, prevFilePath, nextFilePath) => (path) => {
  const absolutePath = resolve(prevFilePath, path.value.value);
  const nextRelativePath = relative(nextFilePath, absolutePath);
  console.log('ABS:: ', absolutePath);
  console.log('NEXT:: ', nextRelativePath);
  j(path).replaceWith(() => j.literal(nextRelativePath));
};

export default function importRelativeTransform(file, api, options) {
  const {path: filePath, source} = file;
  const {jscodeshift: j} = api;
  const {prevFilePath, nextFilePath, printOptions = {}} = options;

  const root = j(source);
  const filterNonRelativePaths = (path) => isRelativePath(path.value.value);

  const requires = root
    .find(j.VariableDeclarator, {
      id: {type: 'Identifier'},
      init: {callee: {name: 'require'}},
    })
    .find(j.Literal)
    .filter(filterNonRelativePaths);

  const imports = root
    .find(j.ImportDeclaration)
    .find(j.Literal)
    .filter(filterNonRelativePaths);

  const nodesToUpdate = [].concat(requires.paths(), imports.paths());

  const noop = nodesToUpdate.length <= 0;
  if (noop) return null;

  nodesToUpdate.forEach(
    renameLiteral(j, prevFilePath, nextFilePath)
  );

  return root.toSource(printOptions);
}
