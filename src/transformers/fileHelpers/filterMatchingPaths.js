import { normalize, resolve, sep } from 'path';
import removeExtension from './removeExtension';

const indexRegex = new RegExp('\\' + sep + 'index$');

export default function filterMatchingPaths(basedir, filePath) {
  const normalizedFilePath = removeExtension(normalize(filePath));
  const normalizedFilePathNoIndex = normalizedFilePath.replace(indexRegex, '')
  
  return path => {
    const testPath = resolve(basedir, path.value.value);
    return testPath === normalizedFilePath || testPath === normalizedFilePathNoIndex;
  };
}
