"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _glob = require("glob");

var _glob2 = _interopRequireDefault(_glob);

var _grayMatter = require("gray-matter");

var _grayMatter2 = _interopRequireDefault(_grayMatter);

var _toml = require("toml");

var _toml2 = _interopRequireDefault(_toml);

var _removeMarkdown = require("remove-markdown");

var _removeMarkdown2 = _interopRequireDefault(_removeMarkdown);

var _striptags = require("striptags");

var _striptags2 = _interopRequireDefault(_striptags);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _minimist = require("minimist");

var _minimist2 = _interopRequireDefault(_minimist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HugoElasticsearch = function () {
  ////////////////////////////////////////////
  // Constructor
  ////////////////////////////////////////////

  function HugoElasticsearch() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, HugoElasticsearch);

    var argv = (0, _minimist2.default)(process.argv.slice(2));

    this.indexMeta = { index: {} };

    // DEFAULTS
    this.input = config.input || "content/**";
    this.output = config.output || "public/elasticsearch.json";
    this.language = config.language || "toml";
    this.delimiter = config.delimiter;
    this.indexName = config.indexName; // 'posts';

    // Input
    if (argv["i"]) this.setInput(argv["i"]);
    if (argv["input"]) this.setInput(argv["input"]);

    // Output
    if (argv["o"]) this.setOutput(argv["o"]);
    if (argv["output"]) this.setOutput(argv["output"]);

    // Language
    if (argv["l"]) this.setLanguage(argv["l"]);
    if (argv["language"]) this.setLanguage(argv["language"]);

    // Delimiter
    if (argv["d"]) this.setDelimiter(argv["d"]);
    if (argv["delimiter"]) this.setDelimiter(argv["delimiter"]);

    // Index Name
    if (argv["n"]) this.setIndexName(argv["n"]);
    if (argv["name"]) this.setIndexName(argv["name"]);
  }

  ////////////////////////////////////////////
  // Setters
  ////////////////////////////////////////////

  _createClass(HugoElasticsearch, [{
    key: "setInput",
    value: function setInput(input) {
      this.input = input;
    }
  }, {
    key: "setOutput",
    value: function setOutput(output) {
      this.output = output;
    }
  }, {
    key: "setLanguage",
    value: function setLanguage(language) {
      this.language = language;
    }
  }, {
    key: "setDelimiter",
    value: function setDelimiter(delimiter) {
      this.delimiter = delimiter;
    }
  }, {
    key: "setIndexName",
    value: function setIndexName(indexName) {
      this.indexName = indexName;
    }
  }, {
    key: "setLanguageConfig",
    value: function setLanguageConfig(language, delimiter) {
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
              toml: _toml2.default.parse.bind(_toml2.default)
            }
          };
          break;
      }
    }
  }, {
    key: "setIndexMetaId",
    value: function setIndexMetaId(id) {
      this.indexMeta.index._id = id || this.id++;
    }
  }, {
    key: "setIndexMetaIndex",
    value: function setIndexMetaIndex(indexName) {
      this.indexMeta.index._index = indexName;
    }
  }, {
    key: "writeIndexStream",
    value: function writeIndexStream(input, output, indexMeta) {
      this.id = 1;
      this.list = [];
      this.baseDir = _path2.default.dirname(this.input);

      if (this.indexName) this.setIndexMetaIndex(this.indexName);
      this.setLanguageConfig(this.language, this.delimiter);
      this.readInputDirectory(input);

      if (this.list.length <= 0) {
        global.console.error("No content found for specified input path: \"" + this.input + "\"");
        global.process.exit(1);
      }

      this.createOutputDirectory(output);
      this.stream = _fs2.default.createWriteStream(output);
      for (var i = 0; i < this.list.length; i++) {
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

  }, {
    key: "createOutputDirectory",
    value: function createOutputDirectory(output) {
      var dir = _path2.default.dirname(output);
      if (!_fs2.default.existsSync(dir)) _fs2.default.mkdirSync(dir);
    }
  }, {
    key: "readInputDirectory",
    value: function readInputDirectory(path) {
      var files = _glob2.default.sync(path);

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var file = _step.value;

          var stats = _fs2.default.lstatSync(file);
          if (!stats.isDirectory()) this.readInputFile(file);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: "readInputFile",
    value: function readInputFile(filePath) {
      var ext = _path2.default.extname(filePath);
      var meta = _grayMatter2.default.read(filePath, this.languageConfig);

      // Check if is a draft
      if (meta.data.draft) return;

      var tags = meta.data.tags || [];
      var content = void 0;

      // Content
      if (ext === ".md") content = (0, _removeMarkdown2.default)(meta.content);else content = (0, _striptags2.default)(meta.content);

      // Uri
      var uri = ("/" + filePath.substring(0, filePath.lastIndexOf("."))).replace(this.baseDir + "/", "");

      if (meta.data.slug) uri = _path2.default.dirname(uri) + meta.data.slug;

      if (meta.data.url) uri = meta.data.url;

      this.list.push(_extends({}, meta.data, { uri: uri, content: content, tags: tags }));
    }
  }, {
    key: "index",
    value: function index() {
      this.writeIndexStream(this.input, this.output, this.indexMeta);
    }
  }]);

  return HugoElasticsearch;
}();

module.exports = HugoElasticsearch;