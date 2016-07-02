import path from 'path';
import {defineTest} from 'jscodeshift/dist/testUtils';

const basedir = path.resolve(__dirname, `..${path.sep}__testfixtures__`)

const options = {
  prevSpecifier: 'foo',
  nextSpecifier: 'fooPrime',
  declarationFilePath: `${basedir}${path.sep}bar.js`,
  printOptions: {
    trailingComma: true,
    quote: 'single',
  },
  'inline-single-expressions': true,
};

defineTest(__dirname, 'import-specifier-transform', options);
