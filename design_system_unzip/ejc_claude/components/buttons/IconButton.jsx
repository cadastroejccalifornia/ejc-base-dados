import React from "react";

const SIZES = { sm: 34, md: 42, lg: 48 };
const VARIANTS = {
  default: { background: "var(--surface)", color: "var(--text)", boxShadow: "var(--shadow-sm)" },
  dark:    { background: "var(--brand-brown)", color: "var(--on-brand)", boxShadow: "var(--shadow-sm)" },
  soft:    { background: "var(--surface-2)", color: "var(--text-2)", boxShadow: "none" },
};

export function IconButton({ variant = "default", size = "md", label, children, style, ...rest }) {
  const d = SIZES[size] || SIZES.md;
  const v = VARIANTS[variant] || VARIANTS.default;
  return (
    <button aria-label={label} title={label}
      style={{
        width: d, height: d, display: "inline-flex", alignItems: "center", justifyContent: "center",
        borderRadius: "var(--r-pill)", border: "none", cursor: "pointer",
        transition: "transform .12s ease, filter .15s ease", ...v, ...style,
      }}
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(.9)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      {...rest}
    >{children}</button>
  );
}
