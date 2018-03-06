# Hugo-Elasticsearch (HES)

Generate [Elasticsearch](https://www.elastic.co/products/elasticsearch) indexes for [Hugo](https://gohugo.io/) static sites by parsing front matter.

## Installation

### Install with npm
```shell
$ npm install hugo-elasticsearch
```

## Usage

### CLI
```bash
##############################################################################################
# Command
##############################################################################################
# hugo-elasticsearch | hes

##############################################################################################
# Options
##############################################################################################
# -i | --input        input [path]                          (default: "content/**")
# -o | --output       output [path]                         (default: "public/elasticsearch.json")
# -l | --language     language [toml | yaml]                (default: "toml")
# -d | --delimiter    delimiter [toml: +++ | yaml: ---]     (optional)
# -n | --name         index name [string]                   (optional)
```

```bash
##############################################################################################
# Examples
##############################################################################################

# Long form (defaults)
$ hugo-elasticsearch \
> --input "content/**" \
> --output "public/elasticsearch.json" \
> --language "toml"

# Short form (defaults)
$ hes \
> -i "content/**" \
> -o "public/elasticsearch.json" \
> -l "toml"
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

```shell
$ npm run index
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
