// @flow
import type {
  AST,
  JSCodeshift,
  Literal,
} from '../types';

/**
  const example = requrire('./RENAME_THIS');
*/

export const findRequires = (
  j: JSCodeshift,
  root: AST
): Array<Literal> =>
  root
    .find(j.VariableDeclarator, {
      id: {type: 'Identifier'},
      init: {callee: {name: 'require'}},
    })
    .find(j.Literal)
    .paths();
