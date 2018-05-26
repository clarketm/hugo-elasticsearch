#!/usr/bin/env node
'use strict';

var _ = require('../');

var _2 = _interopRequireDefault(_);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../package.json'),
    version = _require.version;

_commander2.default.version(version).option('-i, --input [path]', 'Input path.', 'content/**').option('-o, --output [path]', 'Output path.', 'public/elasticsearch.json').option('-l, --language [lang]', 'Language [toml | yaml].', 'toml').option('-d, --delimiter [delim]', 'Delimiter [toml: +++ | yaml: ---].  (optional)').option('-n, --index-name [name]', 'Index name. (optional)').parse(process.argv);

var input = _commander2.default.input,
    output = _commander2.default.output,
    language = _commander2.default.language,
    delimiter = _commander2.default.delimiter,
    indexName = _commander2.default.indexName;


new _2.default({ input: input, output: output, language: language, delimiter: delimiter, indexName: indexName }).index();