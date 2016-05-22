import {defineTest} from 'jscodeshift/dist/testUtils';

const options = {
  prevFilePath: '../../constants',
  nextFilePath: '../../nextConstants',
  printOptions: {
    trailingComma: true,
    quote: 'single',
  },
  'inline-single-expressions': true,
};

defineTest(__dirname, 'import-declaration-transform', options);
