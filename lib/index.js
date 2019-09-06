const { parsers } = require("prettier/parser-babylon");
const { format } = require("prettier-package-json");
const parser = parsers["json-stringify"];

exports.parsers = {
  "json-stringify": {
    ...parser,
    preprocess(text, options) {
      text = parser.preprocess ? parser.preprocess(text, options) : text;

      if (
        options.filepath &&
        /(^|\\|\/)package\.json$/.test(options.filepath)
      ) {
        return format(JSON.parse(text));
      }

      return text;
    }
  }
};
