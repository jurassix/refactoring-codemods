// @flow
import type {
  AST,
  Identifier,
  JSCodeshift,
} from '../types';

// imports, expressions, variables
// too liberal with renaming -- needs to change variables coming from import declarations

export const findIdentifiers = (
  j: JSCodeshift,
  root: AST,
  name: string
): Array<Identifier> =>
  root
    .find(j.Identifier, {name})
    .paths();
