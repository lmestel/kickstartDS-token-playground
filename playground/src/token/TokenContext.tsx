import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { DesignTokens } from "style-dictionary";
import Worker from "./worker.ts?worker";
import { tokens as initialTokens } from "../../tokens";

const TokenContext = createContext<{
  setTokens: Dispatch<SetStateAction<DesignTokens>>;
  tokens: DesignTokens;
}>({
  setTokens() {},
  tokens: initialTokens,
});

export const TokenContextProvider: FC<PropsWithChildren> = (props) => {
  const worker = useRef(new Worker());
  const styleTag = useRef(document.createElement("style"));
  const [tokens, setTokens] = useState(initialTokens);

  useEffect(() => {
    styleTag.current.setAttribute("data-tokens", "");
    document.head.appendChild(styleTag.current);

    const messageHandler = (event: MessageEvent<string>) => {
      styleTag.current.textContent = event.data;
    };
    worker.current.addEventListener("message", messageHandler);

    return () => {
      styleTag.current.remove();
      worker.current.removeEventListener("message", messageHandler);
    };
  }, []);

  useEffect(() => {
    worker.current.postMessage(tokens);
  }, [tokens]);

  return <TokenContext.Provider {...props} value={{ tokens, setTokens }} />;
};

export const useToken = () => useContext(TokenContext);
