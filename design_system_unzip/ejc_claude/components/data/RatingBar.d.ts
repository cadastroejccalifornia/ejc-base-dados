import * as React from "react";
/** Star rating for team & talk evaluations. Supports fractional fill. */
export interface RatingBarProps {
  value?: number;
  /** @default 5 */
  max?: number;
  /** star px @default 18 */
  size?: number;
  /** @default true */
  showValue?: boolean;
  style?: React.CSSProperties;
}
export declare function RatingBar(props: RatingBarProps): JSX.Element;
