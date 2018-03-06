#!/usr/bin/env node

const hes = require('../');

// ARGS
// input
// output
// language
// delimiter
// indexName

// DEFAULTS
// input: content/**
// output: public/elasticsearch.json
// language: toml

// OPTIONAL
// delimiter: +++ (toml) --- (yaml)
// indexName

const Indexer = new hes({
  input: 'content/test-yaml.md',
  output: 'public/elasticsearch-api-params.json',
  language: 'yaml',
  delimiter: '---',
  indexName: 'posts'
});

Indexer.index();

// YAML
Indexer.setInput('content/test-yaml.md');
Indexer.setOutput('public/elasticsearch-api-yaml.json');
Indexer.setLanguage('yaml');
Indexer.setDelimiter('---');
Indexer.setIndexName('posts');
Indexer.index();

// TOML
Indexer.setInput('content/test-toml.md');
Indexer.setOutput('public/elasticsearch-api-toml.json');
Indexer.setLanguage('toml');
Indexer.setDelimiter('+++');
Indexer.setIndexName('posts');
Indexer.index();
