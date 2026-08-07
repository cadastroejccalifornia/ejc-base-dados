import React from "react";
export function NavRail({ logoSrc, items = [], activeId, onSelect, footer, style }) {
  return (
    <nav style={{
      width: "var(--rail-w)", background: "var(--surface)", borderRadius: "var(--r-2xl)",
      boxShadow: "var(--shadow-rail)", padding: "16px 0", display: "flex", flexDirection: "column",
      alignItems: "center", gap: 6, ...style,
    }}>
      {logoSrc && (
        <span style={{ width: 46, height: 46, borderRadius: "50%", overflow: "hidden", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 14, boxShadow: "var(--shadow-xs)", background: "var(--surface)" }}>
          <img src={logoSrc} alt="EJC" style={{ width: "86%", height: "86%", objectFit: "contain" }} />
        </span>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
        {items.map((it) => {
          const active = it.id === activeId;
          return (
            <button key={it.id} title={it.label} aria-label={it.label} onClick={() => onSelect && onSelect(it.id)}
              style={{
                position: "relative", width: 46, height: 46, borderRadius: "var(--r-pill)", border: "none",
                cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center",
                background: active ? "var(--brand-brown)" : "transparent",
                color: active ? "var(--on-brand)" : "var(--text-2)", transition: "all .15s ease",
              }}
              onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "var(--surface-2)"; }}
              onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}
            >
              {it.icon}
              {it.badge != null && (
                <span style={{ position: "absolute", top: 4, right: 4, minWidth: 16, height: 16, padding: "0 4px", borderRadius: "var(--r-pill)", background: "var(--brand-red)", color: "#fff", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{it.badge}</span>
              )}
            </button>
          );
        })}
      </div>
      {footer && <div style={{ marginTop: 8 }}>{footer}</div>}
    </nav>
  );
}
