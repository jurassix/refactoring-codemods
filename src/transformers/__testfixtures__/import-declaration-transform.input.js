import bar from './bar';
import foo from './foo';

export * from './bar';
export {default as bar} from './bar';
export {default as foo} from './foo';

bar();
foo();
