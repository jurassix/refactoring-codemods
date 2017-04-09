import bar from './new/path/to/bar';
import foo from './new/path/to/foo';
import baz from '../new/baz';
import bazQux from './new/baz.qux';

export * from './new/path/to/bar';
export {default as bar} from './new/path/to/bar';
export {default as foo} from './new/path/to/foo';
export * from '../new/baz';
export * from './new/baz.qux';
export const num = 1;
export const filePath = './bar';

bar();
foo();
