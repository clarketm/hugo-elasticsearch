const fs = require("fs");
const mockfs = require("mock-fs");

global.console.error = jest.fn();
global.process.exit = jest.fn();

describe("hes api", () => {
  const root = fs.realpathSync(process.cwd());
  const hes = require(root);

  describe("#constructor (language) ~ toml", () => {
    const input = "content/**";
    const output = "public/elasticsearch.json";
    const language = "toml";
    const delimiter = "+++";
    const indexName = "index";
    let Indexer;

    beforeAll(() => {
      process.chdir(root);

      mockfs({ "public/elasticsearch.json": mockfs.file() });
      Indexer = new hes({ language, indexName });
      Indexer.index();
      mockfs.restore();
    });

    it("should set `input` property", () => {
      expect(Indexer.input).toEqual(input);
    });

    it("should set `output` property", () => {
      expect(Indexer.output).toEqual(output);
    });

    it("should set `language` property", () => {
      expect(Indexer.language).toEqual(language);
    });

    it("should set `delimiter` property", () => {
      expect(Indexer.delimiter).toEqual(delimiter);
    });

    it("should set `indexName` property", () => {
      expect(Indexer.indexName).toEqual(indexName);
    });
  });

  describe("#constructor (language) ~ yaml", () => {
    const input = "content/**";
    const output = "public/elasticsearch.json";
    const language = "yaml";
    const delimiter = "---";
    const indexName = "index";
    let Indexer;

    beforeAll(() => {
      process.chdir(root);

      mockfs({ "public/elasticsearch.json": mockfs.file() });
      Indexer = new hes({ language, indexName });
      Indexer.index();
      mockfs.restore();
    });

    it("should set `input` property", () => {
      expect(Indexer.input).toEqual(input);
    });

    it("should set `output` property", () => {
      expect(Indexer.output).toEqual(output);
    });

    it("should set `language` property", () => {
      expect(Indexer.language).toEqual(language);
    });

    it("should set `delimiter` property", () => {
      expect(Indexer.delimiter).toEqual(delimiter);
    });

    it("should set `indexName` property", () => {
      expect(Indexer.indexName).toEqual(indexName);
    });
  });

  describe("#constructor (input, output, language, delimiter)", () => {
    const input = "content/test-yaml.md";
    const output = "public/elasticsearch-api-constructor-all.json";
    const language = "yaml";
    const delimiter = "---";
    const indexName = "index";
    let Indexer;

    beforeAll(() => {
      process.chdir(root);

      Indexer = new hes({ input, output, language, delimiter, indexName });
      Indexer.index(input, output, language, delimiter);
    });

    it("should set `input` property", () => {
      expect(Indexer.input).toEqual(input);
    });

    it("should set `output` property", () => {
      expect(Indexer.output).toEqual(output);
    });

    it("should set `language` property", () => {
      expect(Indexer.language).toEqual(language);
    });

    it("should set `delimiter` property", () => {
      expect(Indexer.delimiter).toEqual(delimiter);
    });

    it("should set `indexName` property", () => {
      expect(Indexer.indexName).toEqual(indexName);
    });
  });

  describe("#setters (input, output, language, delimiter) ~ toml", () => {
    const input = "content/test-toml.md";
    const output = "public/elasticsearch-api-setters-toml.json";
    const language = "toml";
    const delimiter = "+++";
    const indexName = "index";
    let Indexer;

    beforeAll(() => {
      process.chdir(root);

      Indexer = new hes();
      Indexer.setInput(input);
      Indexer.setOutput(output);
      Indexer.setLanguage(language);
      Indexer.setDelimiter(delimiter);
      Indexer.setIndexName(indexName);
      Indexer.index();
    });

    it("should set `input` property", () => {
      expect(Indexer.input).toEqual(input);
    });

    it("should set `output` property", () => {
      expect(Indexer.output).toEqual(output);
    });

    it("should set `language` property", () => {
      expect(Indexer.language).toEqual(language);
    });

    it("should set `delimiter` property", () => {
      expect(Indexer.delimiter).toEqual(delimiter);
    });

    it("should set `indexName` property", () => {
      expect(Indexer.indexName).toEqual(indexName);
    });
  });

  describe("#setters (input, output, language, delimiter) ~ yaml", () => {
    const input = "content/test-yaml.md";
    const output = "public/elasticsearch-api-setters-yaml.json";
    const language = "yaml";
    const delimiter = "---";
    const indexName = "index";
    let Indexer;

    beforeAll(() => {
      process.chdir(root);

      Indexer = new hes();
      Indexer.setInput(input);
      Indexer.setOutput(output);
      Indexer.setLanguage(language);
      Indexer.setDelimiter(delimiter);
      Indexer.setIndexName(indexName);
      Indexer.index();
    });

    it("should set `input` property", () => {
      expect(Indexer.input).toEqual(input);
    });

    it("should set `output` property", () => {
      expect(Indexer.output).toEqual(output);
    });

    it("should set `language` property", () => {
      expect(Indexer.language).toEqual(language);
    });

    it("should set `delimiter` property", () => {
      expect(Indexer.delimiter).toEqual(delimiter);
    });

    it("should set `indexName` property", () => {
      expect(Indexer.indexName).toEqual(indexName);
    });
  });
});
