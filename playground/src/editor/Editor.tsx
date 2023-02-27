import { lazy, Suspense } from "react";
import "./Editor.scss";

const JsonEditor = lazy(() =>
  import("../json-editor/JsonEditor").then((mod) => ({
    default: mod.JsonEditor,
  }))
);

export const Editor = () => {
  return (
    <div className="editor">
      <Suspense>
        <JsonEditor />
      </Suspense>
    </div>
  );
};
