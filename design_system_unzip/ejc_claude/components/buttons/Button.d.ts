import * as React from "react";
/**
 * Primary action button. Pill-shaped, soft shadow, subtle press-scale.
 * @startingPoint section="Buttons" subtitle="Botão de ação pill com variantes" viewport="700x150"
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. @default "primary" */
  variant?: "primary" | "secondary" | "ghost" | "danger" | "yellow";
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  /** Full width */
  block?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
}
export declare function Button(props: ButtonProps): JSX.Element;
