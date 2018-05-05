import isRelativePath from './isRelativePath';

export default function ensureDotSlash(filePath = '') {
  if (!isRelativePath(filePath)) {
    return `./${filePath}`;
  }
  return filePath;
}
