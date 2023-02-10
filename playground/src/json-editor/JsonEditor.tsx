import { useEffect, useRef } from "react";
import { JSONEditor, toJSONContent } from "vanilla-jsoneditor";
import type { DesignTokens } from "style-dictionary";
import { useToken } from "../token/TokenContext";
import "./JsonEditor.scss";

export const JsonEditor = () => {
  const { tokens, setTokens } = useToken();
  const refContainer = useRef<HTMLDivElement>(null);
  const refEditor = useRef<JSONEditor | null>(null);

  useEffect(() => {
    if (!refContainer.current) return;

    // create editor
    refEditor.current = new JSONEditor({
      target: refContainer.current,
      props: {
        content: { json: tokens },
        onChange(updatedContent) {
          const { json } = toJSONContent(updatedContent);
          if (json) {
            setTokens(json as DesignTokens);
          }
        },
      },
    });

    return () => {
      // destroy editor
      if (refEditor.current) {
        refEditor.current.destroy();
        refEditor.current = null;
      }
    };
  }, []);

  return <div className="jsoneditor" ref={refContainer}></div>;
};
