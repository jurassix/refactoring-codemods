import {resolve} from 'path';
import removeExtension from './removeExtension';

export default function filterMatchingPaths(basedir, filePath) {
  const normalizedFilePath = removeExtension(filePath);
  return (path) => {
    const value = path.value.value;
    if (typeof value !== 'string') {
      return false;
    }

    const testPath = removeExtension(resolve(basedir, value));
    return testPath === normalizedFilePath;
  };
}
