import StyleDictionary, { DesignTokens } from "style-dictionary";
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
export const buildStyleDictionary = (tokens: DesignTokens) => {
  try {
    console.group("style-dictionary");
    console.time("⏱");

    StyleDictionary.extend({
      format,
      platforms,
      tokens,
    }).buildAllPlatforms();

    return vol.toJSON();
  } finally {
    console.timeEnd("⏱");
    console.groupEnd();
  }
};
