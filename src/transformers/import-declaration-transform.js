// @flow
import type {
  AST,
  JSCodeshift,
  Literal,
} from '../types';

import {
  findImportDeclaration,
  findRequires,
} from '../queries';

import {
  renameLiteral,
} from '../mutators';

export default function importDeclarationTransform(
  {source}: {source: string},
  {jscodeshift: j}: {jscodeshift: JSCodeshift},
  {prevFilePath, nextFilePath}: {prevFilePath: string, nextFilePath: string}
): ?string {
  const root: AST = j(source);
  const literals: Array<Literal> = [].concat(
    findImportDeclaration(j, root, prevFilePath),
    findRequires(j, root, prevFilePath)
  );

  literals.forEach(
    renameLiteral(j, nextFilePath)
  );

  root.toSource();
}
