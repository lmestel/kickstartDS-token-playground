import { Preview } from "./preview";
import { Editor } from "./editor/Editor";
import "./App.scss";

export const App = () => (
  <main className="content">
    <div className="content__preview">
      <Preview />
    </div>
    <div className="content__editor">
      <div className="content__editor-inner">
        <Editor />
      </div>
    </div>
  </main>
);
