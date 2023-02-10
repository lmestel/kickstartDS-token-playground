const fs = require("fs");

const removeJson5Plugin = {
  name: "remove json5",
  setup(build) {
    build.onLoad({ filter: /\/style-dictionary\/lib\/.*\.js$/ }, (args) => {
      const source = fs.readFileSync(args.path, "utf-8");
      const contents = source
        .replace("require('json5/lib/register');", "")
        .replace(
          /require\.extensions\["\.jsonc"\] = require\(".*"\)\.register;/g,
          ""
        );
      return { contents };
    });
  },
};

module.exports = { removeJson5Plugin };
