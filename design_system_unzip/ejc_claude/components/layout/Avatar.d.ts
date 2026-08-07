import * as React from "react";
/** Circular avatar — photo or initials. Optional yellow ring and count badge. */
export interface AvatarProps {
  src?: string;
  /** used for initials + alt */
  name?: string;
  /** @default "md" — or a px number */
  size?: "sm" | "md" | "lg" | "xl" | number;
  ring?: boolean;
  /** count badge (number or node) */
  badge?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Avatar(props: AvatarProps): JSX.Element;
