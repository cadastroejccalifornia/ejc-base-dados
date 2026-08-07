import React from "react";
export function RatingBar({ value = 0, max = 5, size = 18, showValue = true, style }) {
  const stars = [];
  for (let i = 1; i <= max; i++) {
    const fill = Math.max(0, Math.min(1, value - (i - 1)));
    stars.push(
      <span key={i} style={{ position: "relative", fontSize: size, lineHeight: 1, color: "var(--surface-3)" }}>
        ★
        <span style={{ position: "absolute", left: 0, top: 0, width: fill * 100 + "%", overflow: "hidden", color: "var(--brand-yellow)" }}>★</span>
      </span>
    );
  }
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, ...style }}>
      <span style={{ display: "inline-flex", gap: 2 }}>{stars}</span>
      {showValue && <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: size * 0.8, color: "var(--text)" }}>{value.toFixed(1)}</span>}
    </span>
  );
}
