import type { DesignTokens } from "style-dictionary";
import { tokens } from "./tokens";
import { createEditor } from "./editor";

import "@kickstartds/base/lib/global/base.js";
import "@kickstartds/base/lib/global/base.css";
import "./styles.scss";
import "./preview";

const styleTag = document.createElement("style");
styleTag.setAttribute("data-tokens", "");
document.head.appendChild(styleTag);

const worker = new Worker(
  new URL("npm:style-dictionary-worker", import.meta.url),
  {
    type: "module",
  }
);

worker.addEventListener("message", (event: MessageEvent<string>) => {
  styleTag.textContent = event.data;
});
const updateTokens = (tokens: DesignTokens) => worker.postMessage(tokens);

updateTokens(tokens);
createEditor(
  document.getElementById("editor")!,
  { json: tokens },
  updateTokens
);
