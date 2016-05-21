// @flow
import type {
  AST,
  JSCodeshift,
  Literal,
} from '../types';

// import {example as no} from './RENAME_THIS';

export const findImportDeclaration = (
  j: JSCodeshift,
  root: AST,
  filePathName: string
): Array<Literal> =>
  root
    .find(j.ImportDeclaration)
    .find(j.Literal, {value: filePathName})
    .paths();
