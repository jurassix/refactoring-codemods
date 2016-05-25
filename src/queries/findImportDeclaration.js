// @flow
import type {
  AST,
  ImportDeclaration,
  JSCodeshift,
  Literal,
} from '../types';

// import {example as no} from './RENAME_THIS';

export const findImportDeclaration = (
  j: JSCodeshift,
  root: AST,
  filePath: string
): Array<Literal> =>
  root
    .find(j.ImportDeclaration)
    .find(j.Literal, {value: filePath})
    .paths();
