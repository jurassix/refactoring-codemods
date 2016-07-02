import {resolve, sep} from 'path';
import {defineTest} from 'jscodeshift/dist/testUtils';

const basedir = resolve(__dirname, `..${sep}__testfixtures__`);

const options = {
  prevSpecifier: 'foo',
  nextSpecifier: 'fooPrime',
  declarationFilePath: `${basedir}${sep}bar.js`,
  printOptions: {
    trailingComma: true,
    quote: 'single',
  },
  'inline-single-expressions': true,
};

defineTest(__dirname, 'import-specifier-transform', options);
defineTest(__dirname, 'import-specifier-transform', options, 'import-specifier-transform-alias');
