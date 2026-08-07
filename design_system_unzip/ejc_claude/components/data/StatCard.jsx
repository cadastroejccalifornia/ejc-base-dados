import React from "react";
export function StatCard({ label, value, unit, delta, deltaTone = "success", accent = "var(--cat-brown)", icon, style }) {
  const tone = deltaTone === "success" ? "var(--success)" : deltaTone === "danger" ? "var(--danger)" : "var(--text-2)";
  return (
    <div style={{
      background: "var(--surface)", borderRadius: "var(--r-lg)", padding: "var(--card-pad)",
      boxShadow: "var(--shadow-sm)", display: "flex", flexDirection: "column", gap: 14, minWidth: 0, ...style,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 500, color: "var(--text-2)" }}>{label}</span>
        {icon && <span style={{ width: 38, height: 38, borderRadius: "var(--r-pill)", background: accent, color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" }}>{icon}</span>}
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
        <span style={{ fontFamily: "var(--font-sans)", fontSize: 34, fontWeight: 800, letterSpacing: "-.02em", color: "var(--text)", lineHeight: 1 }}>{value}</span>
        {unit && <span style={{ fontSize: 15, fontWeight: 600, color: "var(--text-3)" }}>{unit}</span>}
      </div>
      {delta && <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600, color: tone }}>{delta}</span>}
    </div>
  );
}
