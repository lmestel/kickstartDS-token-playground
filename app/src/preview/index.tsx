import { createRoot } from "react-dom/client";
import { ContentSection } from "./ContentSection";

const Preview = () => (
  <>
    <ContentSection />
  </>
);

createRoot(document.getElementById("preview")!).render(<Preview />);
