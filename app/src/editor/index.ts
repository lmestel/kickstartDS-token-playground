import {
  JSONEditor,
  Mode,
  toTextContent,
  toJSONContent,
} from "vanilla-jsoneditor";
import type { Content, MenuItem, JSONValue } from "vanilla-jsoneditor";
import { faCopy, faSave } from "@fortawesome/free-regular-svg-icons";
import { copyToClipboard, download } from "./utils";
import "./jse-theme-kds.scss";

export const createEditor = <C = JSONValue>(
  target: HTMLElement,
  content: Content,
  onChange: (data: C) => void
) => {
  const copyButton: MenuItem = {
    onClick() {
      const { text } = toTextContent(content);
      if (text) copyToClipboard(text);
    },
    icon: faCopy,
    title: "Copy document to clipboard",
    type: "button",
  };
  const saveButton: MenuItem = {
    onClick() {
      const { text } = toTextContent(content);
      if (text) download(text, "foo.json");
    },
    icon: faSave,
    title: "Save document to disk",
    type: "button",
  };

  return new JSONEditor({
    target,
    props: {
      content,
      mode: Mode.text,
      onChange(updatedContent) {
        content = updatedContent;

        const { json } = toJSONContent(updatedContent);
        if (json) {
          onChange(json as C);
        }
      },
      onRenderMenu(items) {
        return items.concat(copyButton, saveButton);
      },
    },
  });
};
