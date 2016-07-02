import path from 'path';
import {defineTest} from 'jscodeshift/dist/testUtils';

const basedir = path.resolve(__dirname, `..${path.sep}__testfixtures__`)

const options = {
  prevFilePath: `${basedir}/bar.js`,
  nextFilePath: `${basedir}/new/path/to/bar.js`,
  printOptions: {
    trailingComma: true,
    quote: 'single',
  },
  'inline-single-expressions': true,
};

defineTest(__dirname, 'import-declaration-transform', options);
