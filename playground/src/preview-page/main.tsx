import React from "react";
import ReactDOM from "react-dom/client";
import "@kickstartds/base/lib/global/base.js";
import "@kickstartds/base/lib/global/base.css";
import { ContentSection } from "./ContentSection";

const styleTag = document.createElement("style");
styleTag.setAttribute("data-tokens", "");
document.head.appendChild(styleTag);

window.addEventListener("message", (event: MessageEvent<string>) => {
  styleTag.textContent = event.data;
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ContentSection />
  </React.StrictMode>
);
