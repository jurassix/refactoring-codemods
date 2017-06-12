# refactoring-codemods

Quest for IDE refactoring support within JavaScript via jscodeshift codemods.

Refactoring a large JavaScript codebase is no fun. Moving files around, renaming files or renaming exported functions simply breaks all dependents import/require paths, and is a huge pain to correct. Simple search and replace is NOT a good solution.

Codemods to the rescue :rocket: With the power of an AST we can determine which files in our project have previously depended on either the rename/moved file or renamed export, and automatically update the dependent code.

Three transforms are provided as low-level AST transforms for achieve either a file rename/move or a file export rename.

_The API of this library is designed to be integrated with an IDE that leverages these transforms to update user code transparently._

### Install

Install **codemods** via npm:

```javascript
> yarn add refactoring-codemods
```

## Transforms

### import-declaration-transform

Fix all dependent import/require paths when a file has been renamed/moved.

Call this transform on your source/test files and all dependents import/require paths will be updated to match the new file name/location.

_Note: prevFilePath and nextFilePath are absolute_

```sh
> jscodeshift \
  -t import-declaration-transform \
  fileA fileB \
  --prevFilePath=/Users/jurassix/example/bar.js \
  --nextFilePath=/Users/jurassix/example/new/path/to/bar.js
```

Example:

```js
import foo from './bar';
```

 becomes

 ```js
import foo from './new/path/to/bar';
 ```

### import-relative-transform

Fix all relative import/require paths when a file has been renamed/moved.

Call this transform on the single file that is being moved to a new location and all relative import/require paths will be updated to match the new file name/location.

_Note: prevFilePath and nextFilePath are absolute_

```sh
> jscodeshift \
  -t import-relative-transform \
  bar.js \
  --prevFilePath=/Users/jurassix/example/old/path/to/bar.js \
  --nextFilePath=/Users/jurassix/example/new/path/to/bar.js
```

Example:

```js
import foo from '../../foo';
```

 becomes

 ```js
import foo from '../../../../old/path/foo';
 ```

### import-specifier-transform

Fix all dependent import/require variables when a file export been renamed.

Call this transform on your source/test files and all dependents import/require variables will be updated to match the new file export name.

_Note: declarationFilePath is absolute_

```js
> jscodeshift \
  -t import-specifier-transform \
  fileA fileB \
  --prevSpecifier=foo \
  --nextSpecifier=fooPrime \
  --declarationFilePath=/Users/jurassix/example/bar.js
```

Example:

```js
import foo from './bar';

foo();
```

 becomes

 ```js
import fooPrime from './bar';

fooPrime();
 ```

## Contribute

### Build
```sh
> yarn build
```

### Run tests
```sh
> yarn test
```
