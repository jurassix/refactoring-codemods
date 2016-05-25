import {defineTest} from 'jscodeshift/dist/testUtils';

const options = {
  prevFilePath: './bar',
  nextFilePath: './new/path/to/bar',
  printOptions: {
    trailingComma: true,
    quote: 'single',
  },
  'inline-single-expressions': true,
};

defineTest(__dirname, 'import-declaration-transform', options);
