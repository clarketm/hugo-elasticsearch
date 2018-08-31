const fs = require("fs");
const assert = require("yeoman-assert");
const shell = require("shelljs");

describe("hes bin", () => {
  const root = fs.realpathSync(process.cwd());

  describe("#hes (-i, -o, -l, -d) ~ yaml", () => {
    beforeAll(() => {
      shell.exec(`rm -f "${root}/public/elasticsearch-yaml.json"`);
      shell.exec(
        `node "${root}/bin/hes.js" -i "${root}/content/test-yaml.md" -o "${root}/public/elasticsearch-yaml.json" -l "yaml" -d "---" -n "indexx"`
      );
    });

    it("should create `output` file", () => {
      assert.file(`${root}/public/elasticsearch-yaml.json`);
    });

    it("should parse the correct `_index` key", () => {
      assert.fileContent(`${root}/public/elasticsearch-yaml.json`, '"_index":"indexx"');
    });

    it("should parse the correct `title` key", () => {
      assert.fileContent(`${root}/public/elasticsearch-yaml.json`, '"title":"Sample title"');
    });

    it("should parse the correct `description` key", () => {
      assert.fileContent(`${root}/public/elasticsearch-yaml.json`, '"description":"Sample description"');
    });

    it("should parse the correct `tags` key", () => {
      assert.fileContent(`${root}/public/elasticsearch-yaml.json`, '"tags":["tag1"]');
    });

    it("should parse the correct `uri` key", () => {
      assert.fileContent(`${root}/public/elasticsearch-yaml.json`, '"uri":"/test-yaml"');
    });

    it("should parse the correct `content` key", () => {
      assert.fileContent(`${root}/public/elasticsearch-yaml.json`, '"content":"\\nSample content header\\nSample content body"');
    });
  });

  describe("#hes (-i, -o, -l, -d) ~ toml", () => {
    beforeAll(() => {
      shell.exec(`rm -f "${root}/public/elasticsearch-toml.json"`);
      shell.exec(
        `node "${root}/bin/hes.js" -i "${root}/content/test-toml.md" -o "${root}/public/elasticsearch-toml.json" -l "toml" -d "+++" -n "indexx"`
      );
    });

    it("should create `output` file", () => {
      assert.file(`${root}/public/elasticsearch-toml.json`);
    });

    it("should parse the correct `_index` key", () => {
      assert.fileContent(`${root}/public/elasticsearch-toml.json`, '"_index":"indexx"');
    });

    it("should parse the correct `title` key", () => {
      assert.fileContent(`${root}/public/elasticsearch-toml.json`, '"title":"Sample title"');
    });

    it("should parse the correct `description` key", () => {
      assert.fileContent(`${root}/public/elasticsearch-toml.json`, '"description":"Sample description"');
    });

    it("should parse the correct `tags` key", () => {
      assert.fileContent(`${root}/public/elasticsearch-toml.json`, '"tags":["tag1"]');
    });

    it("should parse the correct `uri` key", () => {
      assert.fileContent(`${root}/public/elasticsearch-toml.json`, '"uri":"/test-toml"');
    });

    it("should parse the correct `content` key", () => {
      assert.fileContent(`${root}/public/elasticsearch-toml.json`, '"content":"\\nSample content header\\nSample content body"');
    });
  });
});
