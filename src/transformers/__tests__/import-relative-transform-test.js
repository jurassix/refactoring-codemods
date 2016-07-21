import {resolve} from 'path';
import {defineTest} from 'jscodeshift/dist/testUtils';

const basedir = resolve(__dirname, `../__testfixtures__`);

const options = {
  paths: [{
    nextFilePath: `${basedir}/import-relative-transform.input.js`,
    prevFilePath: `${basedir}/old/path/to/import-relative-transform.input.js`,
  }],
  printOptions: {
    trailingComma: true,
    quote: 'single',
  },
  'inline-single-expressions': true,
};

defineTest(__dirname, 'import-relative-transform', options);
