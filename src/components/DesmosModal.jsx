import { useEffect, useRef } from "react";

export default function DesmosModal({ isOpen, onClose }) {
  const containerRef = useRef(null);
  const calculatorRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const script = document.getElementById("desmos-script");
    const initDesmos = () => {
      if (containerRef.current && window.Desmos && !calculatorRef.current) {
        calculatorRef.current = window.Desmos.GraphingCalculator(containerRef.current, {
          keypad: true, expressions: true, settingsMenu: true,
          zoomButtons: true, expressionsTopbar: true,
        });
      }
    };
    if (window.Desmos) {
      initDesmos();
    } else if (!script) {
      const s = document.createElement("script");
      s.id = "desmos-script";
      s.src = "https://www.desmos.com/api/v1.8/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6";
      s.async = true;
      s.onload = initDesmos;
      document.head.appendChild(s);
    }
    return () => {
      if (calculatorRef.current) {
        calculatorRef.current.destroy();
        calculatorRef.current = null;
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={e => e.stopPropagation()}>
        <div style={styles.header}>
          <span style={styles.title}>📐 Desmos Graphing Calculator</span>
          <button onClick={onClose} style={styles.closeBtn}>✕ Close</button>
        </div>
        <div ref={containerRef} style={styles.calculator} />
      </div>
    </div>
  );
}

const styles = {
  overlay: { position:"fixed", inset:0, background:"rgba(0,0,0,0.7)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center" },
  modal: { background:"#1e293b", borderRadius:16, width:"85vw", maxWidth:900, height:"80vh", display:"flex", flexDirection:"column", border:"1px solid #334155" },
  header: { display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 20px", borderBottom:"1px solid #334155" },
  title: { color:"white", fontWeight:700, fontSize:16 },
  closeBtn: { background:"#ef4444", color:"white", border:"none", borderRadius:8, padding:"6px 14px", cursor:"pointer", fontWeight:600 },
  calculator: { flex:1, borderRadius:"0 0 16px 16px", overflow:"hidden" }
};