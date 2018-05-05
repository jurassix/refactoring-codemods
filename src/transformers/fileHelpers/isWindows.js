import { platform } from 'os';

const isWindows = platform() === 'win32';
export default isWindows;
