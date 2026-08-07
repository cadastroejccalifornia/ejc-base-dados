import * as React from "react";
/** Dropdown trigger (pill). Presentational — wire your own menu. */
export interface SelectProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  value?: React.ReactNode;
  /** @default "solid" */
  variant?: "solid" | "plain";
  chevron?: React.ReactNode;
}
export declare function Select(props: SelectProps): JSX.Element;
