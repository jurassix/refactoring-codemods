import boom from './index';
import bang from './new/path/to/bang';
import bar from './new/path/to/bar';
import foo from './new/path/to/foo';
import baz from '../new/baz';
import bazQux from './new/baz.qux';
import './style.css';

export * from './new/path/to/bar';
export { default as bar } from './new/path/to/bar';
export { default as foo } from './new/path/to/foo';
export * from '../new/baz';
export * from './new/baz.qux';
export const num = 1;
export const filePath = './bar';

var requiredFoo = require('./new/path/to/foo');
require('./new/path/to/foo');
require('./new/path/to/foo')();

bar();
foo();
