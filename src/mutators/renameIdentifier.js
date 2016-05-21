// @flow
import type {
  JSCodeshift,
  Path,
} from '../types';

export const renameIdentifier = (
  j: JSCodeshift,
  newName: string
): Function => (path: Path): void => {
  j(path).replaceWith(() => j.identifier(newName));
};
