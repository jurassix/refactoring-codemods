import {defineTest} from 'jscodeshift/dist/testUtils';

const printOptions = {
  trailingComma: true,
};

defineTest(__dirname, 'import-declaration-transform', {
  'inline-single-expressions': true,
  printOptions,
});
