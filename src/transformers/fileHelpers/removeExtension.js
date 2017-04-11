import { extname } from 'path';

export default function removeExtension(filePath) {
  const ext = extname(filePath);
  if (ext.length === 0) return filePath;
  return filePath.slice(0, -1 * ext.length);
}
