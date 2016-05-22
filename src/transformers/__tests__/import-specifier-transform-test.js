import {defineTest} from 'jscodeshift/dist/testUtils';

const options = {
  prevExportName: 'SUCCESS',
  nextExportName: 'AWESOME',
  printOptions: {
    trailingComma: true,
    quote: 'single',
  },
  'inline-single-expressions': true,
};

defineTest(__dirname, 'import-specifier-transform', options);
