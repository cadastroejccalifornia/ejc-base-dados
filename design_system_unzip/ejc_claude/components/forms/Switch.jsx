import React from "react";
export function Switch({ checked, onChange, disabled, size = "md", style, ...rest }) {
  const dims = size === "sm" ? { w: 40, h: 24, k: 18 } : { w: 50, h: 30, k: 24 };
  return (
    <button role="switch" aria-checked={!!checked} disabled={disabled}
      onClick={() => !disabled && onChange && onChange(!checked)}
      style={{
        width: dims.w, height: dims.h, borderRadius: "var(--r-pill)", border: "none",
        position: "relative", cursor: disabled ? "not-allowed" : "pointer", padding: 0,
        background: checked ? "var(--brand-brown)" : "var(--surface-3)",
        transition: "background .2s ease", opacity: disabled ? 0.5 : 1, ...style,
      }} {...rest}>
      <span style={{
        position: "absolute", top: (dims.h - dims.k) / 2, left: checked ? dims.w - dims.k - (dims.h - dims.k) / 2 : (dims.h - dims.k) / 2,
        width: dims.k, height: dims.k, borderRadius: "50%", background: "#fff",
        boxShadow: "0 2px 6px rgba(74,46,26,.25)", transition: "left .2s ease",
      }} />
    </button>
  );
}
