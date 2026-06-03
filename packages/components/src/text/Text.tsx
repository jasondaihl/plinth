import { clsx } from "clsx";
import type { ComponentPropsWithRef, ElementType, ReactNode } from "react";

export type TextSize =
  | "xs"
  | "sm"
  | "base"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl";

export type TextWeight = "regular" | "medium" | "semibold" | "bold";

export type TextTone = "default" | "muted" | "inverse";

export type TextLeading = "tight" | "normal" | "relaxed";

export type TextElement =
  | "p"
  | "span"
  | "div"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "label"
  | "strong"
  | "em";

const SIZE_CLASSES: Record<TextSize, string> = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
};

const WEIGHT_CLASSES: Record<TextWeight, string> = {
  regular: "font-regular",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

const TONE_CLASSES: Record<TextTone, string> = {
  default: "text-text",
  muted: "text-text-muted",
  inverse: "text-text-inverse",
};

const LEADING_CLASSES: Record<TextLeading, string> = {
  tight: "leading-tight",
  normal: "leading-normal",
  relaxed: "leading-relaxed",
};

type TextOwnProps<E extends TextElement> = {
  as?: E;
  size?: TextSize;
  weight?: TextWeight;
  tone?: TextTone;
  leading?: TextLeading;
  className?: string;
  children?: ReactNode;
};

export type TextProps<E extends TextElement = "p"> = TextOwnProps<E> &
  Omit<ComponentPropsWithRef<E>, keyof TextOwnProps<E>>;

export function Text<E extends TextElement = "p">({
  as,
  size = "base",
  weight = "regular",
  tone = "default",
  leading = "normal",
  className,
  children,
  ...rest
}: TextProps<E>) {
  const Component = (as ?? "p") as ElementType;
  return (
    <Component
      className={clsx(
        SIZE_CLASSES[size],
        WEIGHT_CLASSES[weight],
        TONE_CLASSES[tone],
        LEADING_CLASSES[leading],
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
