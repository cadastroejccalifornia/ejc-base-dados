import * as React from "react";
/** Chip with a colored dot — team/category labels. */
export interface TagProps {
  /** Dot color (use a --cat-* token). */
  color?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Tag(props: TagProps): JSX.Element;
