import * as React from "react";
/** On/off toggle. Brown when on, inset gray when off. */
export interface SwitchProps {
  checked?: boolean;
  onChange?: (next: boolean) => void;
  disabled?: boolean;
  /** @default "md" */
  size?: "sm" | "md";
  style?: React.CSSProperties;
}
export declare function Switch(props: SwitchProps): JSX.Element;
