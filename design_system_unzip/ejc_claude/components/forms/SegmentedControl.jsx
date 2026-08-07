import React from "react";
export function SegmentedControl({ options = [], value, onChange, variant = "pill", style }) {
  const isPill = variant === "pill";
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: isPill ? 4 : 22,
      background: isPill ? "var(--surface)" : "transparent",
      borderRadius: "var(--r-pill)", padding: isPill ? 4 : 0,
      boxShadow: isPill ? "var(--shadow-sm)" : "none", ...style,
    }}>
      {options.map((o) => {
        const val = typeof o === "string" ? o : o.value;
        const label = typeof o === "string" ? o : o.label;
        const active = val === value;
        return (
          <button key={val} onClick={() => onChange && onChange(val)}
            style={{
              border: "none", cursor: "pointer", fontFamily: "var(--font-sans)",
              fontSize: "14px", fontWeight: active ? 700 : 500,
              padding: isPill ? "8px 16px" : "4px 0", borderRadius: "var(--r-pill)",
              color: active ? (isPill ? "var(--on-brand)" : "var(--text)") : "var(--text-2)",
              background: active && isPill ? "var(--brand-brown)" : "transparent",
              borderBottom: !isPill ? (active ? "2px solid var(--brand-brown)" : "2px solid transparent") : "none",
              transition: "all .15s ease",
            }}>{label}</button>
        );
      })}
    </div>
  );
}
