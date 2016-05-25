// @flow
import type {
  AST,
  Identifier,
  JSCodeshift,
} from '../types';

import {
  findIdentifiers,
  findImportDeclaration,
  findImportDefaultSpecifier,
  findImportSpecifier,
} from '../queries';

import {
  renameIdentifier,
} from '../mutators';

export default function importSpecifierTransform(
  {source}: {source: string},
  {jscodeshift: j}: {jscodeshift: JSCodeshift},
  {
    prevExportName,
    nextExportName,
    filePath,
    printOptions = {},
  }: {
    prevExportName: string,
    nextExportName: string,
    filePath: string,
    printOptions: Object,
  }
): ?string {
  const root: AST = j(source);
  const noop: boolean = findImportDeclaration(j, root, filePath).length <= 0;

  if (!noop) {
    const identifiers: Array<Identifier> = [].concat(
      findImportSpecifier(j, root, prevExportName),
      findImportDefaultSpecifier(j, root, prevExportName),
      findIdentifiers(j, root, prevExportName)
    );

    identifiers.forEach(
      renameIdentifier(j, nextExportName)
    );
  }

  return root.toSource(printOptions);
}
