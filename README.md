# [Hugo-Elasticsearch (HES)](https://www.npmjs.com/package/hugo-elasticsearch)

[![npm-badge](https://img.shields.io/npm/v/hugo-elasticsearch.svg)](https://www.npmjs.com/package/hugo-elasticsearch)
[![codacy-badge](https://api.codacy.com/project/badge/Grade/1ce2505fd16c4e5ab284c7b36b666a08)](https://www.codacy.com/app/clarketm/hugo-elasticsearch?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=clarketm/hugo-elasticsearch&amp;utm_campaign=Badge_Grade)
[![circleci-badge](https://circleci.com/gh/clarketm/hugo-elasticsearch.svg?style=shield)](https://circleci.com/gh/clarketm/hugo-elasticsearch)

Generate [Elasticsearch](https://www.elastic.co/products/elasticsearch) indexes for [Hugo](https://gohugo.io/) static sites by parsing front matter.

## Installation

### Install with npm
```bash
$ npm install hugo-elasticsearch
```

## Usage

### CLI
```bash

NAME:
    hugo-elasticsearch
    hes (alias)

SYNOPSIS:
    hes [ opts... ]

DESCRIPTION:
    Generate Elasticsearch indexes from Hugo front matter.

OPTIONS:
    -i, --input path            Input path.                         (default: "content/**")
    -o, --output path           Output path.                        (default: "public/elasticsearch.json")
    -l, --language lang         Language [toml | yaml].             (default: "toml")
    -d, --delimiter delim       Delimiter [toml: +++ | yaml: ---].  (optional)
    -n, --name name             Index name.                         (optional)

```

##### Long form
```bash
$ hugo-elasticsearch \
 --input "content/**" \
 --output "public/elasticsearch.json" \
 --language "toml" \
 --delimiter "+++" \
 --index-name "posts"
```

##### Short form
```bash
$ hes \
 -i "content/**" \
 -o "public/elasticsearch.json" \
 -l "toml" \
 -d "+++" \
 -n "posts"
```

### NPM Scripts
```javascript
...
"scripts": {
  "index": "hes -i 'content/**' -o 'public/elasticsearch.json'"
  "index:toml": "hes -i 'content/toml/**' -o 'public/toml/elasticsearch.json' -l 'toml' -d '+++'"
  "index:yaml": "hes -i 'content/yaml/**' -o 'public/yaml/elasticsearch.json' -l 'yaml' -d '---'"
},
...
```


### API
```javascript
const hes = require('hugo-elasticsearch');

const Indexer = new hes({
  input: 'content/blog/**',
  output: 'public/static/elasticsearch.json',
  language: 'yaml',
  delimiter: '---',
  indexName: 'posts'
});

// Create index
Indexer.index()

// Setters
Indexer.setInput('content/blog/**');
Indexer.setOutput('public/static/elasticsearch.json');
Indexer.setLanguage('yaml');
Indexer.setDelimiter('---');
Indexer.setIndexName('posts');
```

## Example

1. Create a markdown file with `toml` front matter in a directory named `content`.
```bash
$ touch 'content/test-toml.md'
```

```markdown
+++
title = "Sample title"
description = "Sample description"
tags = [ "tag1" ]
+++

# Sample content header
Sample content body
```

2. Generate an newline delimited json file for indexing in Elasticsearch and output it to a file named `public/elasticsearch.json`.
```bash
$ hes -i 'content/**' -o 'public/elasticsearch.json'
```

3. [Bulk](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-bulk.html) upload your json file to a running Elasticsearch instance.
```bash
$ HOST="localhost"
$ PORT="9200"
$ INDEX="index"
$ TYPE="type"

$ curl \
  -H "Content-Type: application/x-ndjson" \
  -XPOST "$HOST:$PORT/$INDEX/$type/_bulk" \
  --data-binary "@./public/elasticsearch.json"
```

```json
{
  "took": 137,
  "errors": false,
  "items": [
    ...
  ]
}
```

4. You content is now successfully indexed in Elasticsearch 👍. Happy elastic searching!

> Refer to the `content` directory in the root of *this* project for examples of both *yaml* and *toml* content (i.e. `.md` files).
> Refer to the `public` directory in the root of *this* project for examples of ndjson files (i.e. Elasticsearch index files) generated from both *yaml* and *toml* content.

## Sites using hugo-elasticsearch
* https://blog.travismclarke.com/

## License
Apache-2.0 © [Travis Clarke](https://www.travismclarke.com/)
