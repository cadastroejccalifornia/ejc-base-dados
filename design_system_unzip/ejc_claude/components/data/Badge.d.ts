import * as React from "react";
/** Status pill. */
export interface BadgeProps {
  /** @default "neutral" */
  tone?: "neutral" | "brand" | "yellow" | "success" | "warning" | "danger" | "info";
  dot?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Badge(props: BadgeProps): JSX.Element;
