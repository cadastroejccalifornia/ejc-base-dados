import * as React from "react";
/**
 * Soft pill row for lists — member, team, talk, or device rows. Leading icon-circle or avatar; trailing controls.
 * @startingPoint section="Layout" subtitle="Linha de lista com ícone e ação" viewport="480x66"
 */
export interface ListRowProps {
  /** leading glyph (rendered inside a colored circle) */
  icon?: React.ReactNode;
  /** circle color when using `icon` */
  iconColor?: string;
  /** leading Avatar node (overrides icon) */
  avatar?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  /** right-aligned node (Switch, RatingBar, Badge, value…) */
  trailing?: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
}
export declare function ListRow(props: ListRowProps): JSX.Element;
