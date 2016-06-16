# divvy
Quest for IDE refactoring support within JavaScript via js-codemods

## Transforms

### import-declaration-transform

Rename the filePath of an import or requires. Used for file location refactoring: moving, renaming, etc.

_Note: prevFilePath and nextFilePath are absolute_

```js
> jscodeshift -t import-declaration-transform fileA fileB --prevFilePath=/Users/jurassic/example/bar --nextFilePath=/Users/jurassic/example/new/path/to/bar
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

_Note: declarationFilePath is absolute_

```js
> jscodeshift -t import-specifier-transform fileA fileB --prevSpecifier=foo --nextSpecifier=fooPrime --declarationFilePath=/Users/jurassic/example/bar
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

### Run tests
```js
> npm test
```
