import type { DesignTokens } from "style-dictionary";
import deepmerge from "deepmerge";

import backgroundColor from "./background-color.json";
import borderColor from "./border-color.json";
import border from "./border.json";
import boxShadown from "./box-shadow.json";
import breakpoints from "./breakpoints.json";
import color from "./color.json";
import deprecated from "./deprecated.json";
import depth from "./deprecated.json";
import spacing from "./spacing.json";
import textColor from "./text-color.json";
import transition from "./transition.json";
import typo from "./typo.json";

export const tokens = deepmerge.all([
  backgroundColor,
  borderColor,
  border,
  boxShadown,
  breakpoints,
  color,
  deprecated,
  depth,
  spacing,
  textColor,
  transition,
  typo,
]) as DesignTokens;
