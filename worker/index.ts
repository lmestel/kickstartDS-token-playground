import createTokens from "@kickstartds/style-dictionary/createTokens";
import deepmerge from "deepmerge";
import { DesignTokens } from "style-dictionary";
import { expose } from "worky-turkey";
import { buildStyleDictionary } from "./styleDictionary";

const ui = expose({
  updateBrandingTokens(brandingTokens: any) {
    const allTokens = Object.fromEntries(createTokens(brandingTokens));
    const mergedTokens = deepmerge.all(Object.values(allTokens));
    const files = buildStyleDictionary(mergedTokens as DesignTokens);
    const cssString = Object.entries(files)
      .filter(([fileName]) => fileName.endsWith(".css"))
      .map(([_, contents]) => contents)
      .join("\n\n");

    ui.updateCss(cssString);
  },
});
