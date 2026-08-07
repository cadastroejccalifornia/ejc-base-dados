import React from "react";
export function SearchInput({ placeholder = "Buscar…", icon, value, onChange, style, ...rest }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10, background: "var(--surface)",
      borderRadius: "var(--r-pill)", padding: "11px 18px", boxShadow: "var(--shadow-sm)",
      minWidth: 240, ...style,
    }}>
      <span style={{ color: "var(--text-3)", display: "inline-flex" }}>{icon || "⌕"}</span>
      <input value={value} onChange={(e) => onChange && onChange(e.target.value)} placeholder={placeholder}
        style={{ border: "none", outline: "none", background: "transparent", flex: 1,
          fontFamily: "var(--font-sans)", fontSize: "14px", color: "var(--text)" }} {...rest} />
    </div>
  );
}
