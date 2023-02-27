import { useEffect, useRef, useState } from "react";
import { useToken } from "../token/TokenContext";
import { Select } from "../controls/select/Select";
import "./Preview.scss";

const widths = ["100%", "400px", "800px"];

export const Preview = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [width, setWidth] = useState(widths[0]);
  const { cssString } = useToken();

  useEffect(() => {
    if (iframeRef.current && cssString) {
      iframeRef.current.contentWindow?.postMessage(cssString);
    }
  }, [iframeRef, cssString]);

  return (
    <div className="preview">
      <div className="preview__toolbar">
        <Select
          options={widths.map((w) => ({ value: w, label: w }))}
          value={width}
          onValueChange={setWidth}
          label="viewport:"
        />
      </div>
      <div className="preview__iframe-container">
        <iframe
          className="preview__iframe"
          ref={iframeRef}
          src="./preview.html"
          title="Preview"
          style={{ width }}
        />
      </div>
    </div>
  );
};
