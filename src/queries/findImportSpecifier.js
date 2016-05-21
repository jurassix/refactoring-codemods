// @flow
import type {
  AST,
  Identifier,
  JSCodeshift,
} from '../types';

// import {RENAME_THIS as no} from './example';

export const findImportSpecifier = (
  j: JSCodeshift,
  root: AST,
  name: string
): Array<Identifier> =>
  root
    .find(j.ImportDeclaration)
    .find(j.ImportSpecifier)
    .find(j.Identifier, {name})
    .paths();
