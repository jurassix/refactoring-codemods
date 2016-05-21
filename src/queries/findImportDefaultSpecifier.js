// @flow
import type {
  AST,
  Identifier,
  JSCodeshift,
} from '../types';

// import RENAME_THIS from './example';

export const findImportDefaultSpecifier = (
  j: JSCodeshift,
  root: AST,
  name: string
): Array<Identifier> =>
  root
    .find(j.ImportDeclaration)
    .find(j.ImportDefaultSpecifier)
    .find(j.Identifier, {name})
    .paths();
