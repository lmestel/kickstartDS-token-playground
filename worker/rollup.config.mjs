import path from "path";
import fs from "fs";
import { createRequire } from "module";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import inject from "@rollup/plugin-inject";
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";

const require = createRequire(import.meta.url);
const pathToStyleDictionary = path.dirname(require.resolve("style-dictionary"));

const nodeResolve = resolve({
  preferBuiltins: false,
  mainFields: ["module", "jsnext:main", "browser"],
  custom: {},
});

const EMPTY_MODULE_ID = "$empty$";
const BROWSERIFY_ALIASES = {
  assert: "assert",
  events: "events",
  fs: "memfs",
  module: EMPTY_MODULE_ID,
  path: "path-browserify",
  process: "process",
  util: "util",
  buffer: "buffer",
  constants: "constants-browserify",
  stream: "stream-browserify",
  chalk: "ansi-colors-browserify",
};

const browserify = {
  name: "browserify",
  resolveId(source, importer, options) {
    if (source in BROWSERIFY_ALIASES) {
      if (BROWSERIFY_ALIASES[source] === EMPTY_MODULE_ID)
        return EMPTY_MODULE_ID;
      return nodeResolve.resolveId.handler.call(
        this,
        BROWSERIFY_ALIASES[source],
        importer,
        options
      );
    }
    if (source === EMPTY_MODULE_ID) return EMPTY_MODULE_ID;
  },
  load(id) {
    if (id === EMPTY_MODULE_ID) return EMPTY_MODULE;
  },
};

const inlineFs = {
  name: "inline-fs",
  transform(code, id) {
    return code.replace(
      /fs.readFileSync\(\s*__dirname\s*\+\s*'\/templates\/(.*)'\)/g,
      (match, $1) => {
        const tpl = path.join(
          pathToStyleDictionary,
          "lib/common/templates",
          $1
        );
        return JSON.stringify(fs.readFileSync(tpl, "utf8"));
      }
    );
  },
};

const plugins = [
  commonjs(),
  browserify,
  inject({ process: "process" }),
  nodeResolve,
  json(),
  inlineFs,
  terser(),
];

export default {
  input: "index.js",
  output: {
    format: "es",
    file: "dist/index.js",
    globals: {
      lodash: "_",
    },
  },
  plugins,
};
