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
import initialTokens from "@kickstartds/style-dictionary/branding-token.json";
import Worker from "./worker.ts?worker";
import { expose } from "worky-turkey";

export interface ITokenContext {
  setTokens: Dispatch<SetStateAction<any>>;
  tokens: any;
  cssString?: string;
}

const TokenContext = createContext<ITokenContext>({
  setTokens() {},
  tokens: initialTokens,
});

export const TokenContextProvider: FC<PropsWithChildren> = (props) => {
  const [cssString, setCssString] = useState<string>();
  const styleTag = useRef(document.createElement("style"));
  const worker = useRef(
    expose(
      {
        updateCss(cssString: string) {
          setCssString(cssString);
          styleTag.current.textContent = cssString;
        },
      },
      new Worker()
    )
  );
  const [tokens, setTokens] = useState(initialTokens);

  useEffect(() => {
    styleTag.current.setAttribute("data-tokens", "");
    document.head.appendChild(styleTag.current);

    return () => {
      styleTag.current.remove();
    };
  }, []);

  useEffect(() => {
    worker.current.updateBrandingTokens(tokens);
  }, [tokens]);

  return (
    <TokenContext.Provider
      {...props}
      value={{ tokens, setTokens, cssString }}
    />
  );
};

export const useToken = () => useContext(TokenContext);
