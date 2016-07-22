import foo from './foo';
import goo from '../../goo';

export * from './foo';
export {default as foo} from './foo';
export {default as goo} from '../../goo';

foo();
goo();
