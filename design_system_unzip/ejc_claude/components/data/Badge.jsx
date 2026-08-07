import React from "react";
const TONES = {
  neutral: { bg: "var(--surface-2)", fg: "var(--text-2)" },
  brand:   { bg: "var(--brand-brown-soft)", fg: "var(--brand-brown)" },
  yellow:  { bg: "var(--brand-yellow-soft)", fg: "var(--on-yellow)" },
  success: { bg: "var(--success-soft)", fg: "var(--success)" },
  warning: { bg: "var(--warning-soft)", fg: "var(--warning)" },
  danger:  { bg: "var(--danger-soft)", fg: "var(--danger)" },
  info:    { bg: "var(--info-soft)", fg: "var(--info)" },
};
export function Badge({ tone = "neutral", dot, children, style }) {
  const t = TONES[tone] || TONES.neutral;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6, background: t.bg, color: t.fg,
      fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 600,
      padding: "5px 11px", borderRadius: "var(--r-pill)", ...style,
    }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor" }} />}
      {children}
    </span>
  );
}
