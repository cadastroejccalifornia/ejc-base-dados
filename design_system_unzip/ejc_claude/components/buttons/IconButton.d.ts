import * as React from "react";
/** Circular icon button — floating actions (add, search, filter) and rail entries. */
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** @default "default" (white). "dark" = brown fill, "soft" = inset gray */
  variant?: "default" | "dark" | "soft";
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  /** Accessible label (aria-label + title) */
  label?: string;
  children?: React.ReactNode;
}
export declare function IconButton(props: IconButtonProps): JSX.Element;
