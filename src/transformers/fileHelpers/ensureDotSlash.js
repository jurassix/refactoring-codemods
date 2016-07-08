import {sep} from 'path';
import isRelativePath from './isRelativePath';

export default function ensureDotSlash(filePath = '') {
  if (!isRelativePath(filePath)) {
    return `.${sep}${filePath}`;
  }
  return filePath;
}
