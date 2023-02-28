import { lazy, Suspense } from "react";
import { useToken } from "../token/TokenContext";
import "./Editor.scss";

const JsonEditor = lazy(() =>
  import("../json-editor/JsonEditor").then((mod) => ({
    default: mod.JsonEditor,
  }))
);

export const Editor = () => {
  const { tokens, setTokens } = useToken();
  return (
    <div className="editor">
      <Suspense>
        <JsonEditor initialData={tokens} setData={setTokens} />
      </Suspense>
    </div>
  );
};
