import * as React from "react";
/**
 * Vertical icon rail — app chrome. Logo top, icon items (active = brown pill), footer node (avatar) bottom.
 * @startingPoint section="Navegação" subtitle="Rail lateral de ícones do app" viewport="76x520"
 */
export interface NavRailItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: React.ReactNode;
}
export interface NavRailProps {
  logoSrc?: string;
  items: NavRailItem[];
  activeId?: string;
  onSelect?: (id: string) => void;
  /** bottom node, typically an Avatar */
  footer?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function NavRail(props: NavRailProps): JSX.Element;
