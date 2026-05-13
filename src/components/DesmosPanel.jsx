import { useState, useEffect } from "react";

export default function DesmosPanel({ isOpen, onClose }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!isOpen || loaded) return;
    const init = () => {
      const el = document.getElementById("desmos-side-panel");
      if (el && window.Desmos) {
        window.Desmos.GraphingCalculator(el, { keypad: true, expressions: true, zoomButtons: true });
        setLoaded(true);
      }
    };
    if (window.Desmos) { init(); return; }
    const existing = document.getElementById("desmos-script");
    if (!existing) {
      const s = document.createElement("script");
      s.id = "desmos-script";
      s.src = "https://www.desmos.com/api/v1.8/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6";
      s.async = true;
      s.onload = init;
      document.head.appendChild(s);
    }
  }, [isOpen, loaded]);

  if (!isOpen) return null;
  return (
    <div style={{ width: 450, background: "white", borderLeft: "1px solid #e2e8f0", display: "flex", flexDirection: "column", flexShrink: 0, zIndex: 10, boxShadow: "-4px 0 15px rgba(0,0,0,0.03)" }}>
      <div style={{ padding: "12px 16px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: "#0f172a", fontWeight: 700, fontSize: 14 }}>📐 Desmos Calculator</span>
        {onClose && (
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", fontSize: 18, padding: "0 4px" }}>✕</button>
        )}
      </div>
      <div id="desmos-side-panel" style={{ flex: 1 }} />
    </div>
  );
}