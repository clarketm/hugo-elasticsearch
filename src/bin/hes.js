#!/usr/bin/env node

import hes from '../';
import commander from 'commander';

commander
  .version('1.0.1')
  .option('-i, --input [path]', 'Input path.', 'content/**')
  .option('-o, --output [path]', 'Output path.', 'public/elasticsearch.json')
  .option('-l, --language [lang]', 'Language [toml | yaml].', 'toml')
  .option('-d, --delimiter [delim]', 'Delimiter [toml: +++ | yaml: ---].  (optional)')
  .option('-n, --index-name [name]', 'Index name. (optional)')
  .parse(process.argv);

const {input, output, language, delimiter, indexName} = commander;

new hes({input, output, language, delimiter, indexName}).index();

