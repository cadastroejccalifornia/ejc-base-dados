import React from "react";

const SIZES = {
  sm: { padding: "8px 14px", font: "13px", height: 34 },
  md: { padding: "10px 18px", font: "14px", height: 42 },
  lg: { padding: "13px 24px", font: "15px", height: 50 },
};

const VARIANTS = {
  primary:   { background: "var(--brand-brown)", color: "var(--on-brand)", boxShadow: "var(--shadow-sm)" },
  secondary: { background: "var(--surface)", color: "var(--text)", boxShadow: "var(--shadow-sm)" },
  ghost:     { background: "transparent", color: "var(--text-2)", boxShadow: "none" },
  danger:    { background: "var(--brand-red)", color: "#fff", boxShadow: "var(--shadow-sm)" },
  yellow:    { background: "var(--brand-yellow)", color: "var(--on-yellow)", boxShadow: "var(--shadow-sm)" },
};

export function Button({ variant = "primary", size = "md", iconLeft, iconRight, block, disabled, children, style, ...rest }) {
  const s = SIZES[size] || SIZES.md;
  const v = VARIANTS[variant] || VARIANTS.primary;
  return (
    <button
      disabled={disabled}
      style={{
        display: block ? "flex" : "inline-flex", width: block ? "100%" : "auto",
        alignItems: "center", justifyContent: "center", gap: 8,
        fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: s.font,
        padding: s.padding, borderRadius: "var(--r-pill)", border: "none",
        cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1,
        transition: "transform .12s ease, filter .15s ease, background .15s ease",
        ...v, ...style,
      }}
      onMouseDown={(e) => !disabled && (e.currentTarget.style.transform = "scale(.97)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      {...rest}
    >
      {iconLeft}<span>{children}</span>{iconRight}
    </button>
  );
}
