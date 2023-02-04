const fs = require("fs");
const path = require("path");

const pathToStyleDictionary = path.dirname(require.resolve("style-dictionary"));
const inlineTemplatesPlugin = {
  name: "inline templates",
  setup(build) {
    build.onLoad(
      { filter: /\/style-dictionary\/lib\/common\/formats\.js$/ },
      (args) => {
        const source = fs.readFileSync(args.path, "utf-8");
        const contents = source.replace(
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
        return { contents };
      }
    );
  },
};

module.exports = { inlineTemplatesPlugin };
