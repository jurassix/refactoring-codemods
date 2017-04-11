import bar from './bar';
import foo from './foo';
import baz from '../old/baz';
import bazQux from './old/baz.qux';

export * from './bar';
export { default as bar } from './bar';
export { default as foo } from './foo';
export * from '../old/baz';
export * from './old/baz.qux';
export const num = 1;
export const filePath = './bar';

var requiredFoo = require('./foo');
require('./foo');
require('./foo')();

bar();
foo();
