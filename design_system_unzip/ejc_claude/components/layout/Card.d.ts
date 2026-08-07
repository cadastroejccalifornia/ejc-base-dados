import * as React from "react";
/**
 * Base surface container — rounded, soft-shadowed. Optional header with title/action.
 * @startingPoint section="Layout" subtitle="Card base com cabeçalho opcional" viewport="380x220"
 */
export interface CardProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  /** node rendered at header right (ex.: Select, IconButton, "Ver todos") */
  action?: React.ReactNode;
  pad?: string | number;
  radius?: string | number;
  /** inset variant: gray fill, no shadow */
  inset?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Card(props: CardProps): JSX.Element;
