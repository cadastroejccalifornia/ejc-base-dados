import React from "react";
export function Card({ title, subtitle, action, pad = "var(--card-pad)", radius = "var(--r-lg)", inset, children, style }) {
  return (
    <section style={{
      background: inset ? "var(--surface-2)" : "var(--surface)", borderRadius: radius,
      boxShadow: inset ? "none" : "var(--shadow-sm)", padding: pad, ...style,
    }}>
      {(title || action) && (
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, gap: 12 }}>
          <div>
            {title && <h3 style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: "var(--fs-title)", fontWeight: 600, color: "var(--text)" }}>{title}</h3>}
            {subtitle && <p style={{ margin: "3px 0 0", fontSize: 13, color: "var(--text-2)" }}>{subtitle}</p>}
          </div>
          {action}
        </header>
      )}
      {children}
    </section>
  );
}
