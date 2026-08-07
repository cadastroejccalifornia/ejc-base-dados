import React from "react";
export function Tag({ color = "var(--cat-brown)", children, style }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 7, background: "var(--surface)",
      boxShadow: "var(--shadow-xs)", fontFamily: "var(--font-sans)", fontSize: "13px",
      fontWeight: 500, color: "var(--text)", padding: "6px 12px", borderRadius: "var(--r-pill)", ...style,
    }}>
      <span style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
      {children}
    </span>
  );
}
