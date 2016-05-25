import {defineTest} from 'jscodeshift/dist/testUtils';

const options = {
  prevExportName: 'foo',
  nextExportName: 'fooPrime',
  filePath: './bar',
  printOptions: {
    trailingComma: true,
    quote: 'single',
  },
  'inline-single-expressions': true,
};

defineTest(__dirname, 'import-specifier-transform', options);
defineTest(__dirname, 'import-specifier-transform', options, 'noop-unmatched-imports');
