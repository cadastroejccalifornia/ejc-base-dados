import * as React from "react";
/** Segmented tabs. `pill` = filled active pill; `underline` = text tabs with brown underline. */
export interface SegmentedControlProps {
  options: (string | { value: string; label: React.ReactNode })[];
  value?: string;
  onChange?: (value: string) => void;
  /** @default "pill" */
  variant?: "pill" | "underline";
  style?: React.CSSProperties;
}
export declare function SegmentedControl(props: SegmentedControlProps): JSX.Element;
