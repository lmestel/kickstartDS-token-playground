const path = require("path");
const esbuild = require("esbuild");
const { inlineTemplatesPlugin } = require("./inlineTemplatesPlugin");
const { removeJson5Plugin } = require("./removeJson5Plugin");

(async () => {
  await esbuild.build({
    entryPoints: ["index.js"],
    outdir: "dist",
    bundle: true,
    platform: "browser",
    format: "esm",
    minify: true,
    inject: ["./build/processShim.js"],
    define: {
      global: "self",
      __dirname: "''",
    },
    alias: {
      chalk: "ansi-colors-browserify",
      assert: "assert",
      buffer: "buffer",
      constants: "constants-browserify",
      events: "events",
      fs: "memfs",
      path: "path-browserify",
      process: "process",
      stream: "stream-browserify",
      util: "util",
      browserslist: path.join(__dirname, "./browserslistShim.js"),
    },
    logLevel: "info",
    plugins: [inlineTemplatesPlugin, removeJson5Plugin],
  });
})();
