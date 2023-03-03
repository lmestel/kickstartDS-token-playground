import { useState } from "react";
import classNames from "classnames";
import { Root as Toggle } from "@radix-ui/react-toggle";
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Preview } from "./preview/Preview";
import { Editor } from "./editor/Editor";
import { TokenContextProvider } from "./token/TokenContext";
import { useMatchMediaQuery } from "./utils/useMatchMediaQuery";
import "./App.scss";

export const App = () => {
  const isLargeScreen = useMatchMediaQuery("(min-width: 35em)");
  const [showEditor, setShowEditor] = useState(true);

  return (
    <main className="content">
      <TokenContextProvider>
        <div
          className={classNames(
            "content__pane content__editor-pane",
            !showEditor && "content__editor-pane--hidden"
          )}
        >
          <Editor />
        </div>
        <div
          className={classNames(
            "content__pane content__preview-pane",
            !isLargeScreen && showEditor && "content__preview-pane--shrunk"
          )}
        >
          <Toggle
            aria-label={(showEditor ? "hide" : "show") + " editor"}
            title={(showEditor ? "hide" : "show") + " editor"}
            pressed={showEditor}
            onPressedChange={setShowEditor}
            className="content__editor-toggle"
          >
            {showEditor ? <DoubleArrowLeftIcon /> : <DoubleArrowRightIcon />}
          </Toggle>
          <Preview />
        </div>
      </TokenContextProvider>
    </main>
  );
};
