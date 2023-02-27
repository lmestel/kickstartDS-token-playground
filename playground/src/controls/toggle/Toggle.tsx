import { FC } from "react";
import { Root, ToggleProps } from "@radix-ui/react-toggle";
import "./Toggle.scss";

export const Toggle: FC<ToggleProps> = (props) => (
  <Root className="Toggle" {...props} />
);
