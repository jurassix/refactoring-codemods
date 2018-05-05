import isWindows from './isWindows';

export default function normalizePath(filePath = '', sep = '/') {
  if (isWindows) {
    return filePath.replace(/\\/g, sep);
  }
  return filePath;
}
