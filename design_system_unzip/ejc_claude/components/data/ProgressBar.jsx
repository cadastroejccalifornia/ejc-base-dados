import React from "react";
export function ProgressBar({ value = 0, max = 100, color = "var(--brand-brown)", label, showValue, height = 10, style }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div style={{ width: "100%", ...style }}>
      {(label || showValue) && (
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7, fontFamily: "var(--font-sans)", fontSize: 13 }}>
          {label && <span style={{ color: "var(--text-2)", fontWeight: 500 }}>{label}</span>}
          {showValue && <span style={{ color: "var(--text)", fontWeight: 700 }}>{Math.round(pct)}%</span>}
        </div>
      )}
      <div style={{ height, borderRadius: "var(--r-pill)", background: "var(--surface-3)", overflow: "hidden" }}>
        <div style={{ width: pct + "%", height: "100%", borderRadius: "var(--r-pill)", background: color, transition: "width .4s ease" }} />
      </div>
    </div>
  );
}
