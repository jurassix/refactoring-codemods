// @flow
import type {
  AST,
  JSCodeshift,
  Literal,
} from '../types';

import {
  findImportDeclarationLiteral,
  findRequires,
} from '../queries';

import {
  renameLiteral,
} from '../mutators';

export default function importDeclarationTransform(
  {source}: {source: string},
  {jscodeshift: j}: {jscodeshift: JSCodeshift},
  {
    prevFilePath,
    nextFilePath,
    printOptions = {},
  }: {prevFilePath: string, nextFilePath: string, printOptions: Object}
): ?string {
  const root: AST = j(source);
  const literals: Array<Literal> = [].concat(
    findImportDeclarationLiteral(j, root, prevFilePath),
    findRequires(j, root, prevFilePath)
  );

  literals.forEach(
    renameLiteral(j, nextFilePath)
  );

  return root.toSource(printOptions);
}
