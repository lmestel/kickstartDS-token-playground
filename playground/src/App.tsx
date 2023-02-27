import { useState } from "react";
import classNames from "classnames";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { Preview } from "./preview/Preview";
import { Editor } from "./editor/Editor";
import { TokenContextProvider } from "./token/TokenContext";
import { Toggle } from "./controls/toggle/Toggle";
import { useMatchMediaQuery } from "./utils/useMatchMediaQuery";
import "./App.scss";

export const App = () => {
  const isLargeScreen = useMatchMediaQuery("(min-width: 35em)");
  const [showEditor, setShowEditor] = useState(true);

  return (
    <>
      <nav className="toolbar">
        <Toggle
          aria-label="show editor"
          pressed={showEditor}
          onPressedChange={setShowEditor}
        >
          <MixerHorizontalIcon />
        </Toggle>
      </nav>
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
            <Preview />
          </div>
        </TokenContextProvider>
      </main>
    </>
  );
};
