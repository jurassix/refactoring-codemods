import { resolve, sep } from 'path';
import { defineTest } from 'jscodeshift/dist/testUtils';

const basedir = resolve(__dirname, `..${sep}__testfixtures__`);

const options = {
  paths: [
    {
      prevFilePath: `${basedir}/style.css`,
      nextFilePath: `${basedir}/new/path/to/style.css`,
    },
    {
      prevFilePath: `${basedir}/bang/index.js`,
      nextFilePath: `${basedir}/new/path/to/bang/index.js`,
    },
    {
      prevFilePath: `${basedir}/boom/index.js`,
      nextFilePath: `${basedir}/index.js`,
    },
    {
      prevFilePath: `${basedir}/bar.js`,
      nextFilePath: `${basedir}/new/path/to/bar.js`,
    },
    {
      prevFilePath: `${basedir}/foo.js`,
      nextFilePath: `${basedir}/new/path/to/foo.js`,
    },
    {
      prevFilePath: `${basedir}/goo.js`,
      nextFilePath: `${basedir}/new/path/to/goo.js`,
    },
    {
      prevFilePath: `${basedir}/../old/baz.js`,
      nextFilePath: `${basedir}/../new/baz.js`,
    },
    {
      prevFilePath: `${basedir}/old/baz.qux.js`,
      nextFilePath: `${basedir}/new/baz.qux.js`,
    },
  ],
  printOptions: {
    trailingComma: true,
    quote: 'single',
  },
  'inline-single-expressions': true,
};

defineTest(__dirname, 'import-declaration-transform', options);
