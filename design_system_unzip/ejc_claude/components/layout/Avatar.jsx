import React from "react";
const SIZES = { sm: 34, md: 44, lg: 56, xl: 72 };
export function Avatar({ src, name = "", size = "md", ring, badge, style }) {
  const d = typeof size === "number" ? size : (SIZES[size] || SIZES.md);
  const initials = name.split(" ").filter(Boolean).slice(0, 2).map((n) => n[0]).join("").toUpperCase();
  return (
    <span style={{ position: "relative", display: "inline-flex", flex: "0 0 auto" }}>
      <span style={{
        width: d, height: d, borderRadius: "50%", overflow: "hidden", display: "inline-flex",
        alignItems: "center", justifyContent: "center", background: "var(--brand-brown-soft)",
        color: "var(--brand-brown)", fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: d * 0.36,
        boxShadow: ring ? "0 0 0 3px var(--surface), 0 0 0 5px var(--brand-yellow)" : "var(--shadow-xs)", ...style,
      }}>
        {src ? <img src={src} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : initials}
      </span>
      {badge != null && (
        <span style={{
          position: "absolute", top: -2, right: -2, minWidth: 18, height: 18, padding: "0 5px",
          borderRadius: "var(--r-pill)", background: "var(--brand-red)", color: "#fff", fontSize: 11,
          fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid var(--surface)",
        }}>{badge}</span>
      )}
    </span>
  );
}
