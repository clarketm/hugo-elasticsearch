import fs from "fs";
import glob from "glob";
import matter from "gray-matter";
import toml from "toml";
import removeMd from "remove-markdown";
import striptags from "striptags";
import path from "path";

class HugoElasticsearch {
  ////////////////////////////////////////////
  // Constructor
  ////////////////////////////////////////////

  constructor(config = {}) {
    this.indexMeta = { index: {} };

    // DEFAULTS
    this.input = config.input || "content/**";
    this.output = config.output || "public/elasticsearch.json";
    this.language = config.language || "toml";
    this.delimiter = config.delimiter;
    this.indexName = config.indexName;
  }

  ////////////////////////////////////////////
  // Setters
  ////////////////////////////////////////////

  setInput(input) {
    this.input = input;
  }

  setOutput(output) {
    this.output = output;
  }

  setLanguage(language) {
    this.language = language;
  }

  setDelimiter(delimiter) {
    this.delimiter = delimiter;
  }

  setIndexName(indexName) {
    this.indexName = indexName;
  }

  setLanguageConfig(language, delimiter) {
    switch (true) {
      case language.toLowerCase() === "yaml":
        this.delimiter = delimiter || "---";
        this.languageConfig = {
          delims: this.delimiter,
          lang: "yaml"
        };
        break;
      default:
      case language.toLowerCase() === "toml":
        this.delimiter = delimiter || "+++";
        this.languageConfig = {
          delims: this.delimiter,
          lang: "toml",
          engines: {
            toml: toml.parse.bind(toml)
          }
        };
        break;
    }
  }

  setIndexMetaId(id) {
    this.indexMeta.index._id = id || this.id++;
  }

  setIndexMetaIndex(indexName) {
    this.indexMeta.index._index = indexName;
  }

  writeIndexStream(input, output, indexMeta) {
    this.id = 1;
    this.list = [];
    this.baseDir = path.dirname(this.input);

    if (this.indexName) this.setIndexMetaIndex(this.indexName);
    this.setLanguageConfig(this.language, this.delimiter);
    this.readInputDirectory(input);

    if (this.list.length <= 0) {
      global.console.error(`No content found for specified input path: "${this.input}"`);
      global.process.exit(1);
    }

    this.createOutputDirectory(output);
    this.stream = fs.createWriteStream(output);
    for (let i = 0; i < this.list.length; i++) {
      this.setIndexMetaId();
      this.stream.write(JSON.stringify(indexMeta));
      this.stream.write("\n");
      this.stream.write(JSON.stringify(this.list[i]));
      this.stream.write("\n");
    }
    this.stream.write("\n");
    this.stream.end();
  }

  ////////////////////////////////////////////
  // Methods
  ////////////////////////////////////////////

  createOutputDirectory(output) {
    const dir = path.dirname(output);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  }

  readInputDirectory(path) {
    const files = glob.sync(path);

    for (let file of files) {
      const stats = fs.lstatSync(file);
      if (!stats.isDirectory()) this.readInputFile(file);
    }
  }

  readInputFile(filePath) {
    const ext = path.extname(filePath);
    const meta = matter.read(filePath, this.languageConfig);

    // Check if is a draft
    if (meta.data.draft) return;

    const tags = meta.data.tags || [];
    let content;

    // Content
    if (ext === ".md") content = removeMd(meta.content);
    else content = striptags(meta.content);

    // Uri
    let uri = `/${filePath.substring(0, filePath.lastIndexOf("."))}`.replace(`${this.baseDir}/`, "");

    if (meta.data.slug) uri = path.dirname(uri) + meta.data.slug;

    if (meta.data.url) uri = meta.data.url;

    this.list.push({ ...meta.data, uri, content, tags });
  }

  index() {
    this.writeIndexStream(this.input, this.output, this.indexMeta);
  }
}

module.exports = HugoElasticsearch;
