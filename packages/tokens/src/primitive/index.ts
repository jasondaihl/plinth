import { color } from "./color.js";
import { space } from "./space.js";
import { radius } from "./radius.js";
import { typography } from "./typography.js";
import { shadow } from "./shadow.js";

export const primitive = {
  color,
  space,
  radius,
  typography,
  shadow,
} as const;

export type Primitive = typeof primitive;
