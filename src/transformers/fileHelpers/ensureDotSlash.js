import {sep} from 'path';

export default function ensureDotSlash(filePath = '') {
  if (filePath[0] !== '.') {
    return `.${sep}${filePath}`;
  }
  return filePath;
}
