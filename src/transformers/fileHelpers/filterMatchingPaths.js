import { normalize, resolve } from 'path';
import removeExtension from './removeExtension';

export default function filterMatchingPaths(basedir, filePath) {
  const normalizedFilePath = removeExtension(normalize(filePath));
  return path => {
    const testPath = resolve(basedir, path.value.value);
    return testPath === normalizedFilePath;
  };
}
