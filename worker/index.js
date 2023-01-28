import StyleDictionary from "style-dictionary";
import cssKdsVariablesFormat from "@kickstartds/style-dictionary/formats/css/kds-variables";
import { vol } from "memfs";

const format = {
  [cssKdsVariablesFormat.name]: cssKdsVariablesFormat.formatter,
};
const platforms = {
  css: {
    transformGroup: "css",
    files: [
      {
        format: "css/kds-variables",
        destination: "tokens.css",
        options: {
          outputReferences: true,
        },
      },
    ],
  },
};

self.addEventListener("message", (event) => {
  try {
    console.group("style-dictionary");
    console.time("⏱");

    StyleDictionary.extend({
      format,
      platforms,
      tokens: event.data,
    }).buildAllPlatforms();

    const allFiles = vol.toJSON();
    const contents = Object.values(allFiles).join("\n\n");

    self.postMessage(contents);
  } finally {
    console.timeEnd("⏱");
    console.groupEnd();
  }
});
