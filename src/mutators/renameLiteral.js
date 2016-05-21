// @flow
import type {
  JSCodeshift,
  Path,
} from '../types';

export const renameLiteral = (
  j: JSCodeshift,
  newName: string
): Function => (path: Path): void => {
  j(path).replaceWith(() => j.literal(newName));
};
