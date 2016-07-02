import {resolve} from 'path';
import removeExtension from './removeExtension';

export default function filterMatchingPaths(basedir, filePath) {
  const normalizedFilePath = removeExtension(filePath);
  return (path) => {
    const testPath = removeExtension(resolve(basedir, path.value.value));
    return testPath === normalizedFilePath;
  };
}
