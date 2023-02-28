import { Dispatch, FC, SetStateAction, useEffect, useRef } from "react";
import { JSONEditor, toJSONContent } from "vanilla-jsoneditor";
import "./JsonEditor.scss";

export const JsonEditor: FC<{
  initialData: any;
  setData: Dispatch<SetStateAction<any>>;
}> = ({ initialData, setData }) => {
  const refContainer = useRef<HTMLDivElement>(null);
  const refEditor = useRef<JSONEditor | null>(null);

  useEffect(() => {
    if (!refContainer.current) return;

    // create editor
    refEditor.current = new JSONEditor({
      target: refContainer.current,
      props: {
        content: { json: initialData },
        onChange(updatedContent) {
          const { json } = toJSONContent(updatedContent);
          if (json) {
            setData(json);
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
