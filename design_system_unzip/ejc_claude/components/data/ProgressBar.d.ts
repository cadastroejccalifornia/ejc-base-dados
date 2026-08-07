import * as React from "react";
/** Horizontal progress / completion meter. */
export interface ProgressBarProps {
  value?: number;
  /** @default 100 */
  max?: number;
  /** fill color, use a token @default var(--brand-brown) */
  color?: string;
  label?: React.ReactNode;
  showValue?: boolean;
  /** px @default 10 */
  height?: number;
  style?: React.CSSProperties;
}
export declare function ProgressBar(props: ProgressBarProps): JSX.Element;
