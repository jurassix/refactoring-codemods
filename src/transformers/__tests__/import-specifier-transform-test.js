import {defineTest} from 'jscodeshift/dist/testUtils';

const printOptions = {
  trailingComma: true,
};

defineTest(__dirname, 'import-specifier-transform', {
  'inline-single-expressions': true,
  printOptions,
});
