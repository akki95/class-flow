import { useState, useEffect, useRef, useCallback } from "react";
import MathText from "../components/MathText";
import { SEQUENCES_META, SEQUENCES_TOPICS } from "../data/sequencesAndSeries";

// ─── ClassFlow brand palette ───────────────────────────────────────────────────
const CF = {
  green:   "#00d4aa",
  green2:  "#0be5bc",
  greenBg: "rgba(0,212,170,0.10)",
  greenBorder: "rgba(0,212,170,0.35)",
  dark:    "#0a0f1e",
  card:    "#0f1c2e",
  border:  "rgba(255,255,255,0.09)",
  text:    "#f0f6ff",
  sub:     "#94a3b8",
  muted:   "#64748b",
};

// Topic accent colors — all in the green family for brand consistency
const TOPIC_COLORS = [
  "#00d4aa", // Arithmetic Sequence — teal mint
  "#10b981", // Arithmetic Series — emerald
  "#34d399", // Geometric Sequence — light emerald
  "#00b894", // Geometric Series — deep teal
  "#0be5a0", // Infinite Series — bright mint
  "#4ade80", // Sigma Notation — green
];

const TOPICS_WITH_COLOR = SEQUENCES_TOPICS.map((t, i) => ({
  ...t,
  color: TOPIC_COLORS[i],
}));

// ─── Desmos Sidebar ────────────────────────────────────────────────────────────
function DesmosSidebar({ isOpen, onClose, expressions, note }) {
  const containerRef = useRef(null);
  const calcRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const init = () => {
      if (!containerRef.current || !window.Desmos) return;
      if (calcRef.current) { calcRef.current.destroy(); calcRef.current = null; }
      calcRef.current = window.Desmos.GraphingCalculator(containerRef.current, {
        keypad: false, expressions: true, settingsMenu: false, zoomButtons: true,
        expressionsTopbar: true,
      });
      if (expressions?.length) calcRef.current.setExpressions(expressions);
    };

    if (window.Desmos) {
      init();
    } else {
      const existing = document.getElementById("desmos-script");
      if (existing) { existing.addEventListener("load", init); }
      else {
        const s = document.createElement("script");
        s.id = "desmos-script";
        s.src = "https://www.desmos.com/api/v1.8/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6";
        s.async = true; s.onload = init;
        document.head.appendChild(s);
      }
    }
    return () => { if (calcRef.current) { calcRef.current.destroy(); calcRef.current = null; } };
  }, [isOpen, expressions]);

  return (
    <div style={{
      position: "fixed", right: 0, top: 0, bottom: 0, width: 420,
      background: "#111827", borderLeft: `2px solid ${CF.greenBorder}`,
      zIndex: 200, display: "flex", flexDirection: "column",
      transform: isOpen ? "translateX(0)" : "translateX(100%)",
      transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
      boxShadow: isOpen ? "-8px 0 40px rgba(0,0,0,0.5)" : "none",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px", borderBottom: `1px solid ${CF.border}`, background: "#0f1c2e" }}>
        <span style={{ color: CF.green, fontWeight: 700, fontSize: 14, fontFamily: "'Segoe UI', sans-serif" }}>📐 Desmos Explorer</span>
        <button onClick={onClose} style={{ background: "rgba(255,255,255,0.08)", border: "none", color: CF.sub, borderRadius: 8, padding: "5px 11px", cursor: "pointer", fontSize: 15, fontWeight: 700 }}>✕</button>
      </div>
      {note && (
        <div style={{ padding: "10px 16px", background: CF.greenBg, borderBottom: `1px solid ${CF.greenBorder}`, color: CF.sub, fontSize: 13, fontFamily: "'Segoe UI', sans-serif", lineHeight: 1.5 }}>
          <MathText text={note} />
        </div>
      )}
      <div ref={containerRef} style={{ flex: 1, overflow: "hidden" }} />
    </div>
  );
}

// ─── GeoGebra Sidebar ─────────────────────────────────────────────────────────
// GeoGebra topics per sequence topic (by index)
const GEOGEBRA_URLS = [
  "https://www.geogebra.org/graphing",        // Arithmetic sequence — function graph
  "https://www.geogebra.org/graphing",        // Arithmetic series — partial sums
  "https://www.geogebra.org/graphing",        // Geometric sequence
  "https://www.geogebra.org/graphing",        // Geometric series
  "https://www.geogebra.org/graphing",        // Infinite series
  "https://www.geogebra.org/calculator",      // Sigma / general calc
];

function GeoGebraSidebar({ isOpen, onClose, topicIdx }) {
  const url = GEOGEBRA_URLS[topicIdx] + "?lang=en&border=888888";

  return (
    <div style={{
      position: "fixed", right: 0, top: 0, bottom: 0, width: 460,
      background: "#111827", borderLeft: `2px solid ${CF.greenBorder}`,
      zIndex: 200, display: "flex", flexDirection: "column",
      transform: isOpen ? "translateX(0)" : "translateX(100%)",
      transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
      boxShadow: isOpen ? "-8px 0 40px rgba(0,0,0,0.5)" : "none",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px", borderBottom: `1px solid ${CF.border}`, background: "#0f1c2e" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 18 }}>📐</span>
          <span style={{ color: CF.green, fontWeight: 700, fontSize: 14, fontFamily: "'Segoe UI', sans-serif" }}>GeoGebra Explorer</span>
          <span style={{ background: CF.greenBg, color: CF.green, fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 5, border: `1px solid ${CF.greenBorder}` }}>BETA</span>
        </div>
        <button onClick={onClose} style={{ background: "rgba(255,255,255,0.08)", border: "none", color: CF.sub, borderRadius: 8, padding: "5px 11px", cursor: "pointer", fontSize: 15, fontWeight: 700 }}>✕</button>
      </div>
      <div style={{ padding: "8px 16px", background: CF.greenBg, borderBottom: `1px solid ${CF.greenBorder}`, color: CF.sub, fontSize: 12, fontFamily: "'Segoe UI', sans-serif" }}>
        Full CAS algebra, geometry & 3D. Use the + menu to add functions, sliders, or points.
      </div>
      {isOpen && (
        <iframe
          key={topicIdx}
          src={url}
          title="GeoGebra"
          style={{ flex: 1, border: "none", background: "white" }}
          allow="fullscreen"
        />
      )}
    </div>
  );
}

// ─── Custom Visualizations ─────────────────────────────────────────────────────

function ArithmeticViz() {
  const a = 2, d = 3;
  const terms = Array.from({ length: 6 }, (_, i) => a + i * d);
  const max = Math.max(...terms);
  const [animated, setAnimated] = useState(false);
  useEffect(() => { const t = setTimeout(() => setAnimated(true), 100); return () => clearTimeout(t); }, []);

  return (
    <div style={vz.wrapper}>
      <div style={vz.label}>Sequence ($a=2,\ d=3$): &nbsp;<strong style={{ color: CF.green }}>2, 5, 8, 11, 14, 17</strong></div>
      <div style={vz.barRow}>
        {terms.map((val, i) => (
          <div key={i} style={vz.barCol}>
            <div style={{ ...vz.barVal, color: CF.text }}>{val}</div>
            <div style={{
              ...vz.bar,
              height: animated ? `${(val / max) * 150}px` : "0px",
              background: `linear-gradient(to top, ${CF.green}, ${CF.green2})`,
              opacity: 0.6 + i * 0.07,
              transitionDelay: `${i * 80}ms`,
            }} />
            {i > 0 && <div style={{ color: CF.green, fontSize: 11, fontWeight: 700 }}>+d</div>}
            <div style={vz.nLabel}>n={i + 1}</div>
          </div>
        ))}
      </div>
      <div style={vz.caption}>Constant difference $d=3$ between every consecutive pair of terms</div>
    </div>
  );
}

function ArithmeticSeriesViz() {
  const a = 3, d = 4;
  const [n, setN] = useState(5);
  const partials = Array.from({ length: n }, (_, i) => {
    const k = i + 1;
    return (k / 2) * (2 * a + (k - 1) * d);
  });
  const last = partials[partials.length - 1];

  return (
    <div style={vz.wrapper}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, flexWrap: "wrap" }}>
        <span style={{ color: CF.sub, fontSize: 14, fontWeight: 600 }}>Show first</span>
        <input type="range" min={1} max={12} value={n} onChange={e => setN(Number(e.target.value))}
          style={{ accentColor: CF.green, width: 130 }} />
        <span style={{ color: CF.text, fontWeight: 800, fontSize: 16 }}>{n} terms</span>
        <span style={{ color: CF.green, fontWeight: 700, fontSize: 14 }}>S{n} = {Math.round(last)}</span>
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 140 }}>
        {partials.map((s, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
            <div style={{ fontSize: 11, color: CF.sub, marginBottom: 2, fontWeight: 600 }}>{Math.round(s)}</div>
            <div style={{ width: "100%", background: `linear-gradient(to top, ${CF.green}, ${CF.green2})`, borderRadius: "4px 4px 0 0", height: `${(s / (last || 1)) * 120}px`, transition: "height 0.4s ease", opacity: 0.55 + i * 0.04 }} />
            <div style={{ fontSize: 11, color: CF.muted, marginTop: 3, fontWeight: 600 }}>S{i + 1}</div>
          </div>
        ))}
      </div>
      <div style={vz.caption}>Partial sums $S_n$ grow quadratically — drag the slider to explore</div>
    </div>
  );
}

function GeometricViz() {
  const [rMode, setRMode] = useState("grow");
  const a = 1, r = rMode === "grow" ? 2 : 0.5;
  const terms = Array.from({ length: 7 }, (_, i) => a * Math.pow(r, i));
  const max = Math.max(...terms);
  const [animated, setAnimated] = useState(false);
  useEffect(() => { setAnimated(false); const t = setTimeout(() => setAnimated(true), 80); return () => clearTimeout(t); }, [rMode]);
  const fmt = v => v >= 1 ? v.toFixed(0) : v.toFixed(2);

  return (
    <div style={vz.wrapper}>
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        {[["grow", "r = 2 (growth)"], ["decay", "r = 0.5 (decay)"]].map(([mode, label]) => (
          <button key={mode} onClick={() => setRMode(mode)} style={{
            ...vz.modeBtn,
            background: rMode === mode ? CF.green : "rgba(255,255,255,0.06)",
            color: rMode === mode ? "#0a1a14" : CF.sub,
            fontWeight: rMode === mode ? 800 : 600,
            border: rMode === mode ? "none" : `1px solid ${CF.border}`,
          }}>{label}</button>
        ))}
      </div>
      <div style={vz.barRow}>
        {terms.map((val, i) => (
          <div key={i} style={vz.barCol}>
            <div style={{ ...vz.barVal, fontSize: 11, color: CF.text }}>{fmt(val)}</div>
            <div style={{
              ...vz.bar,
              height: animated ? `${Math.max((val / (max || 1)) * 150, 4)}px` : "0px",
              background: `linear-gradient(to top, ${CF.green}, ${CF.green2})`,
              opacity: rMode === "grow" ? 0.4 + i * 0.09 : 1 - i * 0.09,
              transitionDelay: `${i * 70}ms`,
            }} />
            {i > 0 && <div style={{ color: CF.green, fontSize: 11, fontWeight: 700 }}>×r</div>}
            <div style={vz.nLabel}>n={i + 1}</div>
          </div>
        ))}
      </div>
      <div style={vz.caption}>
        {rMode === "grow" ? "Exponential growth — each term doubles (r=2)" : "Exponential decay — each term halves (r=0.5), approaching 0"}
      </div>
    </div>
  );
}

function GeometricSeriesViz() {
  const [n, setN] = useState(6);
  const a = 2, r = 2;
  const partials = Array.from({ length: n }, (_, i) => {
    const k = i + 1;
    return a * (Math.pow(r, k) - 1) / (r - 1);
  });
  const last = partials[partials.length - 1];

  return (
    <div style={vz.wrapper}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
        <span style={{ color: CF.sub, fontSize: 14, fontWeight: 600 }}>n =</span>
        <input type="range" min={1} max={10} value={n} onChange={e => setN(Number(e.target.value))}
          style={{ accentColor: CF.green, width: 130 }} />
        <span style={{ color: CF.text, fontWeight: 800, fontSize: 16 }}>{n}</span>
        <span style={{ color: CF.green, fontWeight: 700, fontSize: 14 }}>S{n} = {partials[n - 1]?.toLocaleString()}</span>
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 150 }}>
        {partials.map((s, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
            <div style={{ width: "100%", background: `linear-gradient(to top, ${CF.green}, ${CF.green2})`, borderRadius: "4px 4px 0 0", height: `${(s / (last || 1)) * 130}px`, transition: "height 0.4s ease", opacity: 0.45 + i * 0.07 }} />
            <div style={{ fontSize: 11, color: CF.muted, marginTop: 3, fontWeight: 600 }}>S{i + 1}</div>
          </div>
        ))}
      </div>
      <div style={vz.caption}>GP sums grow exponentially fast ($a=2, r=2$) — drag slider to see $S_n$ rocket up</div>
    </div>
  );
}

function InfiniteSeriesViz() {
  const a = 8, r = 0.5;
  const sInf = a / (1 - r);
  const n = 12;
  const partials = Array.from({ length: n }, (_, i) => {
    const k = i + 1;
    return a * (1 - Math.pow(r, k)) / (1 - r);
  });

  return (
    <div style={vz.wrapper}>
      <div style={{ position: "relative", height: 165, margin: "8px 0" }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: "4%", height: 2, background: CF.green, opacity: 0.8, borderRadius: 1 }} />
        <div style={{ position: "absolute", right: 8, top: "-4px", color: CF.green, fontSize: 12, fontWeight: 800 }}>
          S∞ = {sInf}
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: "100%", paddingTop: 20 }}>
          {partials.map((s, i) => {
            const pct = (s / sInf) * 100;
            return (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
                <div style={{
                  width: "100%",
                  background: `linear-gradient(to top, ${CF.green}, ${CF.green2})`,
                  borderRadius: "4px 4px 0 0",
                  height: `${pct}%`,
                  transition: `height 0.5s ease ${i * 50}ms`,
                  opacity: 0.4 + (i / n) * 0.55,
                }} />
                <div style={{ fontSize: 9, color: CF.muted, marginTop: 2, fontWeight: 600 }}>S{i + 1}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div style={vz.caption}>
        $S_1=8,\ S_2=12,\ S_3=14,\ \ldots$ — bars converge toward the green line at $S_\infty = 16$
      </div>
    </div>
  );
}

function SigmaViz() {
  const [step, setStep] = useState(0);
  const terms = [2, 5, 8, 11, 14];
  const total = terms.reduce((a, b) => a + b, 0);
  const labels = ["r=1", "r=2", "r=3", "r=4", "r=5"];

  return (
    <div style={vz.wrapper}>
      <div style={{ textAlign: "center", marginBottom: 14 }}>
        <div style={{ color: CF.green, fontSize: 26, fontFamily: "serif", fontWeight: 700 }}>
          Σ <span style={{ fontSize: 16 }}>(3r − 1)</span>
        </div>
        <div style={{ fontSize: 12, color: CF.sub, fontWeight: 600, marginTop: 2 }}>r = 1 to 5</div>
      </div>
      <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap", marginBottom: 14 }}>
        {terms.map((val, i) => (
          <div key={i} style={{
            background: i <= step ? CF.greenBg : "rgba(255,255,255,0.04)",
            border: `1px solid ${i <= step ? CF.greenBorder : CF.border}`,
            borderRadius: 10, padding: "8px 16px", textAlign: "center",
            transition: "all 0.3s ease",
          }}>
            <div style={{ fontSize: 12, color: i <= step ? CF.green : CF.muted, fontWeight: 700 }}>{labels[i]}</div>
            <div style={{ color: i <= step ? CF.text : CF.muted, fontWeight: 800, fontSize: 20 }}>{i <= step ? val : "?"}</div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", color: CF.green, fontWeight: 800, fontSize: 17, marginBottom: 14, minHeight: 26 }}>
        {step >= 4 ? `= ${terms.slice(0, step + 1).join(" + ")} = ${total}` : `= ${terms.slice(0, step + 1).join(" + ")} + …`}
      </div>
      <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
        {[
          ["← Prev", () => setStep(s => Math.max(s - 1, 0)), step === 0],
          ["Next →", () => setStep(s => Math.min(s + 1, 4)), step === 4],
          ["Reset", () => setStep(0), false],
        ].map(([label, handler, disabled]) => (
          <button key={label} onClick={handler} disabled={disabled} style={{
            ...vz.modeBtn, opacity: disabled ? 0.35 : 1,
            background: label === "Next →" ? CF.green : "rgba(255,255,255,0.07)",
            color: label === "Next →" ? "#0a1a14" : CF.sub,
            fontWeight: label === "Next →" ? 800 : 600,
          }}>{label}</button>
        ))}
      </div>
      <div style={{ ...vz.caption, marginTop: 12 }}>
        <MathText text={'Click "Next →" to expand $\\sum_{r=1}^{5}(3r-1)$ one term at a time'} />
      </div>
    </div>
  );
}

const vz = {
  wrapper: { background: "rgba(0,212,170,0.04)", border: `1px solid ${CF.greenBorder}`, borderRadius: 14, padding: "18px 22px", marginTop: 4 },
  label: { color: CF.sub, fontSize: 14, fontWeight: 600, marginBottom: 12, fontFamily: "'Segoe UI', sans-serif" },
  barRow: { display: "flex", alignItems: "flex-end", gap: 8, height: 190, marginBottom: 6 },
  barCol: { display: "flex", flexDirection: "column", alignItems: "center", flex: 1, gap: 4 },
  barVal: { color: CF.text, fontSize: 13, fontWeight: 700 },
  bar: { width: "100%", borderRadius: "6px 6px 0 0", transition: "height 0.55s cubic-bezier(0.34,1.56,0.64,1)", minHeight: 4 },
  nLabel: { color: CF.muted, fontSize: 12, fontWeight: 600 },
  caption: { color: CF.sub, fontSize: 13, marginTop: 10, fontFamily: "'Segoe UI', sans-serif", lineHeight: 1.6, fontWeight: 500 },
  modeBtn: { background: "rgba(255,255,255,0.07)", border: `1px solid ${CF.border}`, color: CF.sub, borderRadius: 8, padding: "7px 16px", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "'Segoe UI', sans-serif" },
};

const VIZ_MAP = {
  arithmetic: ArithmeticViz,
  arithmeticSeries: ArithmeticSeriesViz,
  geometric: GeometricViz,
  geometricSeries: GeometricSeriesViz,
  infinite: InfiniteSeriesViz,
  sigma: SigmaViz,
};

// ─── Formula Card ──────────────────────────────────────────────────────────────
function FormulaCard({ formula, color }) {
  return (
    <div style={{ background: `${color}10`, border: `1px solid ${color}45`, borderRadius: 14, padding: "16px 18px", marginBottom: 12 }}>
      <div style={{ color, fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 10 }}>{formula.label}</div>
      <div style={{ background: "rgba(0,0,0,0.25)", borderRadius: 10, padding: "12px 16px", marginBottom: formula.note ? 10 : 0 }}>
        <MathText text={`$$${formula.latex}$$`} style={{ color: CF.text }} />
      </div>
      {formula.note && (
        <div style={{ color: CF.sub, fontSize: 13, fontWeight: 500, lineHeight: 1.5 }}>
          <MathText text={formula.note} />
        </div>
      )}
    </div>
  );
}

// ─── Example Card ──────────────────────────────────────────────────────────────
function ExampleCard({ example, color }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${CF.border}`, borderRadius: 14, padding: "18px 20px" }}>
      <div style={{ color: CF.sub, fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 12 }}>
        Worked Example
      </div>
      <div style={{ color: CF.text, fontSize: 16, lineHeight: 1.85, fontWeight: 500, marginBottom: 16 }}>
        <MathText text={example.question} />
      </div>
      {!revealed ? (
        <button onClick={() => setRevealed(true)} style={{ ...btn.reveal, borderColor: color + "70", color }}>
          Show Solution ▼
        </button>
      ) : (
        <div style={{ borderTop: `1px solid ${CF.border}`, paddingTop: 16 }}>
          {example.steps.map((step, i) => (
            <div key={i} style={{ display: "flex", gap: 12, marginBottom: 12 }}>
              {step.label && (
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: color, marginTop: 8, flexShrink: 0 }} />
              )}
              <div style={{ flex: 1 }}>
                {step.label && (
                  <div style={{ color: CF.text, fontSize: 14, fontWeight: 600, marginBottom: 6 }}>{step.label}</div>
                )}
                <div style={{ background: `${color}12`, border: `1px solid ${color}30`, borderRadius: 10, padding: "10px 14px" }}>
                  <MathText text={`$$${step.math}$$`} style={{ color: CF.text }} />
                </div>
              </div>
            </div>
          ))}
          <button onClick={() => setRevealed(false)} style={{ ...btn.reveal, borderColor: CF.border, color: CF.muted, marginTop: 4 }}>
            Hide Solution ▲
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Practice Card ─────────────────────────────────────────────────────────────
function PracticeCard({ practice, color }) {
  const [show, setShow] = useState(false);

  return (
    <div style={{ background: `${color}0d`, border: `1px solid ${color}40`, borderRadius: 14, padding: "18px 20px" }}>
      <div style={{ color, fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 12 }}>
        Practice Question
      </div>
      <div style={{ color: CF.text, fontSize: 17, lineHeight: 1.85, fontWeight: 600, marginBottom: 18 }}>
        <MathText text={practice.question} />
      </div>
      {!show ? (
        <button onClick={() => setShow(true)} style={{ ...btn.primary, background: color, color: "#051a12" }}>
          Reveal Solution
        </button>
      ) : (
        <>
          <div style={{ borderTop: `1px solid ${color}35`, paddingTop: 16, marginBottom: 14 }}>
            {practice.solution.map((item, i) => (
              <div key={i} style={{ marginBottom: 12 }}>
                {item.step && (
                  <div style={{ color: CF.text, fontSize: 14, fontWeight: 600, marginBottom: 6 }}>{item.step}</div>
                )}
                <div style={{ background: "rgba(0,0,0,0.3)", border: `1px solid ${color}25`, borderRadius: 10, padding: "10px 14px" }}>
                  <MathText text={`$$${item.math}$$`} style={{ color: CF.text }} />
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => setShow(false)} style={{ ...btn.reveal, borderColor: CF.border, color: CF.muted }}>
            Hide Solution ▲
          </button>
        </>
      )}
    </div>
  );
}

const btn = {
  primary: { border: "none", borderRadius: 10, padding: "11px 26px", cursor: "pointer", fontWeight: 800, fontSize: 15, fontFamily: "'Segoe UI', sans-serif" },
  reveal: { background: "transparent", border: "1px solid", borderRadius: 8, padding: "9px 20px", cursor: "pointer", fontSize: 14, fontWeight: 700, fontFamily: "'Segoe UI', sans-serif" },
};

// ─── Agenda View ───────────────────────────────────────────────────────────────
function AgendaView({ completed, onStart }) {
  return (
    <div style={ag.container}>
      <div style={ag.card}>
        <div style={ag.header}>
          <div style={ag.logo}>CF</div>
          <div>
            <div style={ag.appName}>ClassFlow</div>
            <div style={ag.boardLabel}>A-Level Edexcel · Pure Mathematics</div>
          </div>
        </div>

        <h1 style={ag.title}>{SEQUENCES_META.title}</h1>
        <p style={ag.sub}>{SEQUENCES_META.subtitle}</p>

        <div style={ag.progressRow}>
          <span style={{ color: CF.sub, fontSize: 13, fontWeight: 600 }}>{completed.size} of {TOPICS_WITH_COLOR.length} topics completed</span>
          <div style={ag.progressBar}>
            <div style={{ ...ag.progressFill, width: `${(completed.size / TOPICS_WITH_COLOR.length) * 100}%` }} />
          </div>
        </div>

        <div style={ag.grid}>
          {TOPICS_WITH_COLOR.map((topic, i) => {
            const done = completed.has(topic.id);
            return (
              <button key={topic.id} onClick={() => onStart(i)} style={{ ...ag.topicCard, borderColor: done ? topic.color + "70" : CF.border }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ ...ag.topicIcon, background: topic.color + "20", color: topic.color }}>{topic.icon}</div>
                  <div style={{ ...ag.badge, background: done ? topic.color + "20" : "rgba(255,255,255,0.04)", color: done ? topic.color : CF.muted, border: done ? `1px solid ${topic.color}40` : "none" }}>
                    {done ? "✓ Done" : `${i + 1}/${TOPICS_WITH_COLOR.length}`}
                  </div>
                </div>
                <div style={ag.topicTitle}>{topic.title}</div>
                <div style={ag.topicSub}>{topic.subtitle}</div>
              </button>
            );
          })}
        </div>

        <div style={{ textAlign: "center", marginTop: 28 }}>
          <button onClick={() => onStart(0)} style={{ ...btn.primary, background: CF.green, fontSize: 16, padding: "14px 40px" }}>
            {completed.size > 0 ? "Continue Learning →" : "Start Learning →"}
          </button>
        </div>
      </div>
    </div>
  );
}

const ag = {
  container: { minHeight: "100vh", background: `linear-gradient(135deg, ${CF.dark} 0%, #0d1b2e 100%)`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Segoe UI', sans-serif", padding: 24 },
  card: { background: "rgba(255,255,255,0.04)", border: `1px solid ${CF.border}`, borderRadius: 24, padding: "40px 44px", width: "100%", maxWidth: 800, color: "white" },
  header: { display: "flex", alignItems: "center", gap: 14, marginBottom: 30 },
  logo: { width: 44, height: 44, borderRadius: 10, background: `linear-gradient(135deg, ${CF.green}, ${CF.green2})`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 15, color: "#051a12", flexShrink: 0 },
  appName: { fontWeight: 800, fontSize: 18, color: "white" },
  boardLabel: { fontSize: 12, color: CF.muted },
  title: { fontSize: 30, fontWeight: 900, margin: "0 0 6px", color: CF.text },
  sub: { color: CF.muted, fontSize: 15, margin: "0 0 22px", fontWeight: 500 },
  progressRow: { display: "flex", alignItems: "center", gap: 14, marginBottom: 26 },
  progressBar: { flex: 1, height: 7, background: "rgba(255,255,255,0.07)", borderRadius: 4, overflow: "hidden" },
  progressFill: { height: "100%", background: `linear-gradient(90deg, ${CF.green}, ${CF.green2})`, borderRadius: 4, transition: "width 0.5s ease" },
  grid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 },
  topicCard: { background: "rgba(255,255,255,0.03)", border: "1px solid", borderRadius: 14, padding: "16px", textAlign: "left", cursor: "pointer", color: "white", transition: "all 0.2s", fontFamily: "'Segoe UI', sans-serif" },
  topicIcon: { width: 38, height: 38, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 800, marginBottom: 10 },
  topicTitle: { fontSize: 14, fontWeight: 700, marginBottom: 3, color: CF.text },
  topicSub: { fontSize: 12, color: CF.muted, fontWeight: 500 },
  badge: { borderRadius: 6, padding: "3px 8px", fontSize: 11, fontWeight: 700 },
};

// ─── Topic View ────────────────────────────────────────────────────────────────
function TopicView({ topic, topicIdx, totalTopics, onBack, onNext, onPrev, onMarkDone, isDone, activeTool, setActiveTool }) {
  const VizComponent = VIZ_MAP[topic.visualization];
  const scrollRef = useRef(null);
  const sidebarWidth = activeTool ? (activeTool === "geogebra" ? 460 : 420) : 0;

  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = 0; }, [topicIdx]);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: CF.dark }}>
      {/* Main scrollable content */}
      <div style={{ flex: 1, overflowY: "auto", marginRight: sidebarWidth, transition: "margin-right 0.3s ease" }} ref={scrollRef}>

        {/* Header */}
        <div style={tv.header}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button onClick={onBack} style={tv.backBtn}>← Agenda</button>
            <div style={tv.logo}>CF</div>
            <span style={{ color: CF.muted, fontSize: 13, fontWeight: 600 }}>Sequences &amp; Series</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={tv.progressDots}>
              {TOPICS_WITH_COLOR.map((t, i) => (
                <div key={i} style={{
                  width: i === topicIdx ? 22 : 8, height: 8, borderRadius: 4,
                  background: i === topicIdx ? topic.color : i < topicIdx ? CF.green : "rgba(255,255,255,0.15)",
                  transition: "all 0.3s",
                }} />
              ))}
            </div>
            <span style={{ color: CF.muted, fontSize: 12, fontWeight: 600 }}>{topicIdx + 1}/{totalTopics}</span>
          </div>
        </div>

        {/* Topic hero */}
        <div style={{ ...tv.hero, background: `${topic.color}12`, borderBottom: `1px solid ${topic.color}30` }}>
          <div style={{ ...tv.topicIconLg, background: topic.color + "25", color: topic.color }}>{topic.icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{ color: CF.sub, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 4 }}>
              Topic {topicIdx + 1} of {totalTopics}
            </div>
            <h2 style={{ color: CF.text, fontSize: 24, fontWeight: 900, margin: 0 }}>{topic.title}</h2>
            <div style={{ color: topic.color, fontSize: 14, marginTop: 4, fontWeight: 600 }}>{topic.subtitle}</div>
          </div>
          <div style={{ display: "flex", gap: 8, marginLeft: "auto", flexShrink: 0 }}>
            {[
              { id: "desmos", label: "📐 Desmos" },
              { id: "geogebra", label: "📊 GeoGebra" },
            ].map(({ id, label }) => {
              const active = activeTool === id;
              return (
                <button key={id} onClick={() => setActiveTool(active ? null : id)} style={{
                  border: `1px solid ${active ? topic.color : topic.color + "55"}`,
                  borderRadius: 10, padding: "9px 18px", cursor: "pointer",
                  fontSize: 13, fontWeight: 700, fontFamily: "'Segoe UI', sans-serif",
                  transition: "all 0.2s",
                  background: active ? topic.color : "transparent",
                  color: active ? "#051a12" : topic.color,
                }}>{label}</button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div style={tv.content}>
          <Section title="Theory" icon="📖">
            <div style={{ color: CF.text, fontSize: 16, lineHeight: 1.95, fontWeight: 400 }}>
              <MathText text={topic.theory} />
            </div>
          </Section>

          <Section title="Key Formulas" icon="📐">
            {topic.formulas.map((f, i) => <FormulaCard key={i} formula={f} color={topic.color} />)}
          </Section>

          {VizComponent && (
            <Section title="Visualisation" icon="📊">
              <VizComponent />
            </Section>
          )}

          <Section title="Worked Example" icon="✏️">
            <ExampleCard example={topic.example} color={topic.color} />
          </Section>

          <Section title="Practice" icon="🎯">
            <PracticeCard practice={topic.practice} color={topic.color} />
          </Section>

          {/* Navigation */}
          <div style={tv.navRow}>
            <button onClick={onPrev} disabled={topicIdx === 0}
              style={{ ...tv.navBtn, opacity: topicIdx === 0 ? 0.3 : 1 }}>← Previous</button>
            <button onClick={onMarkDone} style={{
              ...tv.doneBtn,
              background: isDone ? "#0d2a1e" : topic.color,
              border: isDone ? `1px solid ${CF.green}` : "none",
              color: isDone ? CF.green : "#051a12",
            }}>
              {isDone ? "✓ Completed" : "Mark Complete"}
            </button>
            <button onClick={onNext} disabled={topicIdx === totalTopics - 1}
              style={{ ...tv.navBtn, background: topic.color, color: "#051a12", fontWeight: 800, opacity: topicIdx === totalTopics - 1 ? 0.3 : 1 }}>
              Next →
            </button>
          </div>
        </div>
      </div>

      <DesmosSidebar
        isOpen={activeTool === "desmos"}
        onClose={() => setActiveTool(null)}
        expressions={topic.desmosExpressions}
        note={topic.desmosNote}
      />
      <GeoGebraSidebar
        isOpen={activeTool === "geogebra"}
        onClose={() => setActiveTool(null)}
        topicIdx={topicIdx}
      />
    </div>
  );
}

function Section({ title, icon, children }) {
  return (
    <div style={{ marginBottom: 30 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, color: CF.sub, fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 14, fontFamily: "'Segoe UI', sans-serif" }}>
        <span>{icon}</span><span>{title}</span>
      </div>
      {children}
    </div>
  );
}

const tv = {
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 26px", background: `${CF.dark}f5`, borderBottom: `1px solid ${CF.border}`, position: "sticky", top: 0, zIndex: 10, backdropFilter: "blur(14px)" },
  backBtn: { background: "rgba(255,255,255,0.07)", border: `1px solid ${CF.border}`, color: CF.sub, borderRadius: 8, padding: "7px 16px", cursor: "pointer", fontSize: 13, fontWeight: 700, fontFamily: "'Segoe UI', sans-serif" },
  logo: { width: 32, height: 32, borderRadius: 7, background: `linear-gradient(135deg, ${CF.green}, ${CF.green2})`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 12, color: "#051a12" },
  progressDots: { display: "flex", gap: 4, alignItems: "center" },
  hero: { display: "flex", alignItems: "center", gap: 18, padding: "22px 30px", flexWrap: "wrap" },
  topicIconLg: { width: 54, height: 54, borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontWeight: 800, flexShrink: 0 },
  desmosBtn: { border: "1px solid", borderRadius: 10, padding: "9px 20px", cursor: "pointer", fontSize: 13, fontWeight: 700, fontFamily: "'Segoe UI', sans-serif", transition: "all 0.2s", marginLeft: "auto", flexShrink: 0 },
  content: { maxWidth: 800, margin: "0 auto", padding: "30px 28px 70px" },
  navRow: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginTop: 20 },
  navBtn: { background: "rgba(255,255,255,0.08)", border: "none", color: CF.text, borderRadius: 10, padding: "12px 26px", cursor: "pointer", fontWeight: 700, fontSize: 15, fontFamily: "'Segoe UI', sans-serif" },
  doneBtn: { borderRadius: 10, padding: "12px 26px", cursor: "pointer", fontWeight: 800, fontSize: 15, fontFamily: "'Segoe UI', sans-serif", transition: "all 0.3s" },
};

// ─── Summary View ──────────────────────────────────────────────────────────────
function SummaryView({ completed, onRestart, onGoAgenda }) {
  const allDone = completed.size === TOPICS_WITH_COLOR.length;
  return (
    <div style={{ minHeight: "100vh", background: CF.dark, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Segoe UI', sans-serif", padding: 24 }}>
      <div style={{ textAlign: "center", maxWidth: 500 }}>
        <div style={{ fontSize: 68, marginBottom: 18 }}>{allDone ? "🎉" : "📚"}</div>
        <h2 style={{ color: CF.text, fontSize: 28, fontWeight: 900, marginBottom: 10 }}>
          {allDone ? "All topics mastered!" : `${completed.size} of ${TOPICS_WITH_COLOR.length} done`}
        </h2>
        <p style={{ color: CF.sub, marginBottom: 30, lineHeight: 1.7, fontSize: 15, fontWeight: 500 }}>
          {allDone ? "You've completed all of Sequences & Series. Review any topic or start a new chapter." : "Keep going — you're making great progress!"}
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <button onClick={onGoAgenda} style={{ ...btn.primary, background: CF.green, padding: "13px 30px" }}>← Back to Agenda</button>
          {allDone && <button onClick={onRestart} style={{ ...btn.reveal, borderColor: CF.border, color: CF.sub, padding: "13px 30px" }}>Restart</button>}
        </div>
      </div>
    </div>
  );
}

// ─── Root ──────────────────────────────────────────────────────────────────────
export default function SequencesFlow() {
  const [view, setView] = useState("agenda");
  const [topicIdx, setTopicIdx] = useState(0);
  const [completed, setCompleted] = useState(new Set());
  const [activeTool, setActiveTool] = useState(null); // null | 'desmos' | 'geogebra'

  const handleStart = useCallback((idx) => { setTopicIdx(idx); setActiveTool(null); setView("topic"); }, []);
  const handleNext = useCallback(() => {
    if (topicIdx < TOPICS_WITH_COLOR.length - 1) { setTopicIdx(i => i + 1); setActiveTool(null); }
    else setView("summary");
  }, [topicIdx]);
  const handlePrev = useCallback(() => { setTopicIdx(i => Math.max(i - 1, 0)); setActiveTool(null); }, []);
  const handleMarkDone = useCallback(() => {
    setCompleted(prev => {
      const next = new Set(prev);
      const id = TOPICS_WITH_COLOR[topicIdx].id;
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, [topicIdx]);

  if (view === "agenda") return <AgendaView completed={completed} onStart={handleStart} />;
  if (view === "summary") return <SummaryView completed={completed} onRestart={() => { setCompleted(new Set()); setTopicIdx(0); setView("agenda"); }} onGoAgenda={() => setView("agenda")} />;

  const topic = TOPICS_WITH_COLOR[topicIdx];
  return (
    <TopicView
      topic={topic} topicIdx={topicIdx} totalTopics={TOPICS_WITH_COLOR.length}
      onBack={() => { setActiveTool(null); setView("agenda"); }}
      onNext={handleNext} onPrev={handlePrev}
      onMarkDone={handleMarkDone} isDone={completed.has(topic.id)}
      activeTool={activeTool} setActiveTool={setActiveTool}
    />
  );
}
