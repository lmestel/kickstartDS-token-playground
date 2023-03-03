import { lazy, Suspense } from "react";
import { CodeIcon } from "@radix-ui/react-icons";
import { Tabs } from "../controls/tabs/Tabs";
import { useToken } from "../token/TokenContext";
import { ColorsEditor } from "./colors/ColorsEditor";
import "./Editor.scss";

const JsonEditor = lazy(() =>
  import("../json-editor/JsonEditor").then((mod) => ({
    default: mod.JsonEditor,
  }))
);

export const Editor = () => {
  const tokenContext = useToken();
  return (
    <div className="editor">
      <Tabs
        tabs={[
          {
            trigger: "Colors",
            content: <ColorsEditor {...tokenContext} />,
          },
          {
            trigger: "Typography",
            content: "Hello Typography!",
          },

          {
            trigger: "Surfaces",
            content: "Hello Surfaces!",
          },

          {
            trigger: <CodeIcon aria-label="Raw JSON code" />,
            content: (
              <Suspense>
                <JsonEditor
                  initialData={tokenContext.tokens}
                  setData={tokenContext.setTokens}
                />
              </Suspense>
            ),
          },
        ]}
      />
    </div>
  );
};
