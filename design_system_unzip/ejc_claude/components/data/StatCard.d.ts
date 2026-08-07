import * as React from "react";
/**
 * Dashboard KPI card — big number, label, optional delta and accent icon.
 * @startingPoint section="Dashboard" subtitle="Card de indicador (KPI)" viewport="320x150"
 */
export interface StatCardProps {
  label: React.ReactNode;
  value: React.ReactNode;
  unit?: React.ReactNode;
  /** ex.: "+12 esta semana" */
  delta?: React.ReactNode;
  /** @default "success" */
  deltaTone?: "success" | "danger" | "neutral";
  /** icon-circle color, use a --cat-* token */
  accent?: string;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function StatCard(props: StatCardProps): JSX.Element;
