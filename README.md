# divvy
Quest for IDE refactoring support within JavaScript via js-codemods

## Transforms

### import-declaration-transform

Rename the filePath of an import or requires. Used for file location refactoring: moving, renaming, etc.

```js
> jscodeshift -t import-declaration-transform fileA fileB --prevFilePath=./bar --nextFilePath=./new/path/to/bar
```

Example:

```js
import foo from './bar';
```

 becomes

 ```js
import foo from './new/path/to/bar';
 ```

### import-specifier-transform

Rename the imported variable. Used for file exports refactoring.

```js
> jscodeshift -t import-specifier-transform fileA fileB --prevExportName=foo --nextExportName=fooPrime --filePath=./bar
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
```js
> npm run build
```

### Flow
```js
> npm run flow
```

### Run tests
```js
> npm test
```
