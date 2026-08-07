import React from "react";
export function Select({ label, value, variant = "solid", chevron = "▾", style, ...rest }) {
  const solid = variant === "solid";
  return (
    <button style={{
      display: "inline-flex", alignItems: "center", gap: 8, borderRadius: "var(--r-pill)",
      border: "none", cursor: "pointer", padding: "10px 16px", fontFamily: "var(--font-sans)",
      fontSize: "14px", fontWeight: 600, color: "var(--text)",
      background: solid ? "var(--surface)" : "transparent",
      boxShadow: solid ? "var(--shadow-sm)" : "none", ...style,
    }} {...rest}>
      {label && <span style={{ color: "var(--text-3)", fontWeight: 500 }}>{label}</span>}
      <span>{value}</span>
      <span style={{ color: "var(--text-3)", fontSize: 12 }}>{chevron}</span>
    </button>
  );
}
