import { lazy, Suspense } from "react";
import { TokenContextProvider } from "../token/TokenContext";
import "./Editor.scss";

const JsonEditor = lazy(() =>
  import("../json-editor/JsonEditor").then((mod) => ({
    default: mod.JsonEditor,
  }))
);

export const Editor = () => {
  return (
    <TokenContextProvider>
      <div className="editor">
        <Suspense>
          <JsonEditor />
        </Suspense>
      </div>
    </TokenContextProvider>
  );
};
