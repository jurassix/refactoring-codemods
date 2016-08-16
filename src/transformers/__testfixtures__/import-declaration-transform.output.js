import bar from './new/path/to/bar';
import foo from './new/path/to/foo';

export * from './new/path/to/bar';
export {default as bar} from './new/path/to/bar';
export {default as foo} from './new/path/to/foo';
export const num = 1;
export const filePath = './bar';

bar();
foo();
