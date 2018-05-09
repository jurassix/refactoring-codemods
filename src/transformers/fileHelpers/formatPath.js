
export default function normalizePath(filePath = '', sep = '/') {
  return filePath.replace(/\\/g, sep);
}
