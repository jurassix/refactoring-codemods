// @flow

export type AST = {
  find: Function,
  toSource: Function,
};

export type Identifier = {
  type: string,
  name: string,
};

export type JSCodeshift = any;
//   ImportDeclaration: any,
//   ImportDefaultSpecifier: any,
//   ImportSpecifier: any,
//   Identifier: any,
//   Literal: any,
//   VariableDeclarator: any,
//   identifier: Function,
// };

export type Literal = {
  type: string,
  value: string,
  raw: string,
};

export type ImportDefaultSpecifier = {
  Identifier: Identifier,
};

export type ImportDeclaration = {
  Literal: Literal,
  ImportDefaultSpecifier: ImportDefaultSpecifier,
};

export type Path = {};
