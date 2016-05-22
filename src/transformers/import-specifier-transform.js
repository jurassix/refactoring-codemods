// @flow
import type {
  AST,
  Identifier,
  JSCodeshift,
} from '../types';

import {
  findIdentifiers,
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
    printOptions = {},
  }: {prevExportName: string, nextExportName: string, printOptions: Object}
): ?string {
  const root: AST = j(source);
  const identifiers: Array<Identifier> = [].concat(
    findImportSpecifier(j, root, prevExportName),
    findImportDefaultSpecifier(j, root, prevExportName),
    findIdentifiers(j, root, prevExportName)
  );

  identifiers.forEach(
    renameIdentifier(j, nextExportName)
  );

  return root.toSource(printOptions);
}
