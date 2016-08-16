import foo from './foo';
import goo from '../../goo';

export * from './foo';
export {default as foo} from './foo';
export {default as goo} from '../../goo';
export const num = 1;
export const filePath = './foo';

foo();
goo();
