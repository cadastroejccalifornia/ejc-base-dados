import React from "react";
export function ListRow({ icon, iconColor = "var(--cat-brown)", avatar, title, subtitle, trailing, onClick, style }) {
  return (
    <div onClick={onClick} style={{
      display: "flex", alignItems: "center", gap: 14, background: "var(--surface-2)",
      borderRadius: "var(--r-md)", padding: "12px 16px", cursor: onClick ? "pointer" : "default",
      transition: "background .15s ease", ...style,
    }}
      onMouseEnter={(e) => onClick && (e.currentTarget.style.background = "var(--surface-3)")}
      onMouseLeave={(e) => onClick && (e.currentTarget.style.background = "var(--surface-2)")}
    >
      {avatar}
      {icon && !avatar && (
        <span style={{ width: 38, height: 38, borderRadius: "var(--r-pill)", background: iconColor, color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" }}>{icon}</span>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 15, color: "var(--text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{title}</div>
        {subtitle && <div style={{ fontSize: 13, color: "var(--text-2)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{subtitle}</div>}
      </div>
      {trailing && <div style={{ flex: "0 0 auto", display: "flex", alignItems: "center", gap: 10 }}>{trailing}</div>}
    </div>
  );
}
