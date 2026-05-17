import { useState, useEffect } from "react";
import MasteryFlow from "../components/MasteryFlow";
import { useTheme } from "../context/ThemeContext";
import { SEQUENCES_META, SEQUENCES_TOPICS } from "../data/sequencesAndSeries";
import MathText from "../components/MathText";

// ─── Topic colors ──────────────────────────────────────────────────────────────
const TOPIC_COLORS = ["#00d4aa","#10b981","#34d399","#00b894","#0be5a0","#4ade80"];
const TOPICS = SEQUENCES_TOPICS.map((t, i) => ({ ...t, color: TOPIC_COLORS[i] }));

// ─── Visualizations ────────────────────────────────────────────────────────────
function ArithmeticViz({ color }) {
  const { T } = useTheme(); const vz = makeVz(T);
  const a = 2, d = 3;
  const terms = Array.from({ length: 6 }, (_, i) => a + i * d);
  const max = Math.max(...terms);
  const [animated, setAnimated] = useState(false);
  useEffect(() => { const t = setTimeout(() => setAnimated(true), 100); return () => clearTimeout(t); }, []);
  return (
    <div style={vz.wrapper}>
      <div style={vz.label}>Sequence ($a=2,\ d=3$): &nbsp;<strong style={{ color }}>2, 5, 8, 11, 14, 17</strong></div>
      <div style={vz.barRow}>
        {terms.map((val, i) => (
          <div key={i} style={vz.barCol}>
            <div style={{ color: T.text, fontSize: 13, fontWeight: 700 }}>{val}</div>
            <div style={{ ...vz.bar, height: animated ? `${(val / max) * 150}px` : "0px", background: `linear-gradient(to top, ${color}, ${color}aa)`, opacity: 0.6 + i * 0.07, transitionDelay: `${i * 80}ms` }} />
            {i > 0 && <div style={{ color, fontSize: 11, fontWeight: 700 }}>+d</div>}
            <div style={vz.nLabel}>n={i + 1}</div>
          </div>
        ))}
      </div>
      <div style={vz.caption}>Constant difference $d=3$ between every consecutive pair of terms</div>
    </div>
  );
}

function ArithmeticSeriesViz({ color }) {
  const { T } = useTheme(); const vz = makeVz(T);
  const a = 3, d = 4;
  const [n, setN] = useState(5);
  const partials = Array.from({ length: n }, (_, i) => { const k = i + 1; return (k / 2) * (2 * a + (k - 1) * d); });
  const last = partials[partials.length - 1];
  return (
    <div style={vz.wrapper}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, flexWrap: "wrap" }}>
        <span style={{ color: T.sub, fontSize: 14, fontWeight: 600 }}>Show first</span>
        <input type="range" min={1} max={12} value={n} onChange={e => setN(Number(e.target.value))} style={{ accentColor: color, width: 130 }} />
        <span style={{ color: T.text, fontWeight: 800, fontSize: 16 }}>{n} terms</span>
        <span style={{ color, fontWeight: 700, fontSize: 14 }}>S{n} = {Math.round(last)}</span>
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 140 }}>
        {partials.map((s, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
            <div style={{ fontSize: 11, color: T.sub, marginBottom: 2, fontWeight: 600 }}>{Math.round(s)}</div>
            <div style={{ width: "100%", background: `linear-gradient(to top, ${color}, ${color}99)`, borderRadius: "4px 4px 0 0", height: `${(s / (last || 1)) * 120}px`, transition: "height 0.4s ease", opacity: 0.55 + i * 0.04 }} />
            <div style={{ fontSize: 11, color: T.muted, marginTop: 3, fontWeight: 600 }}>S{i + 1}</div>
          </div>
        ))}
      </div>
      <div style={vz.caption}>Partial sums $S_n$ grow quadratically — drag the slider to explore</div>
    </div>
  );
}

function GeometricViz({ color }) {
  const { T } = useTheme(); const vz = makeVz(T);
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
          <button key={mode} onClick={() => setRMode(mode)} style={{ ...vz.modeBtn, background: rMode === mode ? color : "rgba(255,255,255,0.06)", color: rMode === mode ? "#0a1a14" : T.sub, fontWeight: rMode === mode ? 800 : 600 }}>{label}</button>
        ))}
      </div>
      <div style={vz.barRow}>
        {terms.map((val, i) => (
          <div key={i} style={vz.barCol}>
            <div style={{ color: T.text, fontSize: 11, fontWeight: 700 }}>{fmt(val)}</div>
            <div style={{ ...vz.bar, height: animated ? `${Math.max((val / (max || 1)) * 150, 4)}px` : "0px", background: `linear-gradient(to top, ${color}, ${color}99)`, opacity: rMode === "grow" ? 0.4 + i * 0.09 : 1 - i * 0.09, transitionDelay: `${i * 70}ms` }} />
            {i > 0 && <div style={{ color, fontSize: 11, fontWeight: 700 }}>×r</div>}
            <div style={vz.nLabel}>n={i + 1}</div>
          </div>
        ))}
      </div>
      <div style={vz.caption}>{rMode === "grow" ? "Exponential growth — each term doubles (r=2)" : "Exponential decay — each term halves (r=0.5)"}</div>
    </div>
  );
}

function GeometricSeriesViz({ color }) {
  const { T } = useTheme(); const vz = makeVz(T);
  const [n, setN] = useState(6);
  const a = 2, r = 2;
  const partials = Array.from({ length: n }, (_, i) => { const k = i + 1; return a * (Math.pow(r, k) - 1) / (r - 1); });
  const last = partials[partials.length - 1];
  return (
    <div style={vz.wrapper}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
        <span style={{ color: T.sub, fontSize: 14, fontWeight: 600 }}>n =</span>
        <input type="range" min={1} max={10} value={n} onChange={e => setN(Number(e.target.value))} style={{ accentColor: color, width: 130 }} />
        <span style={{ color: T.text, fontWeight: 800, fontSize: 16 }}>{n}</span>
        <span style={{ color, fontWeight: 700, fontSize: 14 }}>S{n} = {partials[n - 1]?.toLocaleString()}</span>
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 150 }}>
        {partials.map((s, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
            <div style={{ width: "100%", background: `linear-gradient(to top, ${color}, ${color}99)`, borderRadius: "4px 4px 0 0", height: `${(s / (last || 1)) * 130}px`, transition: "height 0.4s ease", opacity: 0.45 + i * 0.07 }} />
            <div style={{ fontSize: 11, color: T.muted, marginTop: 3, fontWeight: 600 }}>S{i + 1}</div>
          </div>
        ))}
      </div>
      <div style={vz.caption}>GP sums grow exponentially fast ($a=2, r=2$) — drag slider to see $S_n$ rocket up</div>
    </div>
  );
}

function InfiniteSeriesViz({ color }) {
  const { T } = useTheme(); const vz = makeVz(T);
  const a = 8, r = 0.5, sInf = 16, n = 12;
  const partials = Array.from({ length: n }, (_, i) => { const k = i + 1; return a * (1 - Math.pow(r, k)) / (1 - r); });
  return (
    <div style={vz.wrapper}>
      <div style={{ position: "relative", height: 165, margin: "8px 0" }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: "4%", height: 2, background: color, opacity: 0.8, borderRadius: 1 }} />
        <div style={{ position: "absolute", right: 8, top: "-4px", color, fontSize: 12, fontWeight: 800 }}>S∞ = {sInf}</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: "100%", paddingTop: 20 }}>
          {partials.map((s, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
              <div style={{ width: "100%", background: `linear-gradient(to top, ${color}, ${color}99)`, borderRadius: "4px 4px 0 0", height: `${(s / sInf) * 100}%`, transition: `height 0.5s ease ${i * 50}ms`, opacity: 0.4 + (i / n) * 0.55 }} />
              <div style={{ fontSize: 9, color: T.muted, marginTop: 2, fontWeight: 600 }}>S{i + 1}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={vz.caption}>Bars converge toward the line at $S_\infty = 16$ as $n \to \infty$</div>
    </div>
  );
}

function SigmaViz({ color }) {
  const { T } = useTheme(); const vz = makeVz(T);
  const [step, setStep] = useState(0);
  const terms = [2, 5, 8, 11, 14];
  const total = 40;
  const labels = ["r=1","r=2","r=3","r=4","r=5"];
  return (
    <div style={vz.wrapper}>
      <div style={{ textAlign: "center", marginBottom: 14 }}>
        <div style={{ color, fontSize: 26, fontFamily: "serif", fontWeight: 700 }}>Σ <span style={{ fontSize: 16 }}>(3r − 1)</span></div>
        <div style={{ fontSize: 12, color: T.sub, fontWeight: 600, marginTop: 2 }}>r = 1 to 5</div>
      </div>
      <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap", marginBottom: 14 }}>
        {terms.map((val, i) => (
          <div key={i} style={{ background: i <= step ? `${color}18` : "rgba(255,255,255,0.04)", border: `1px solid ${i <= step ? color + "50" : T.border}`, borderRadius: 10, padding: "8px 16px", textAlign: "center", transition: "all 0.3s ease" }}>
            <div style={{ fontSize: 12, color: i <= step ? color : T.muted, fontWeight: 700 }}>{labels[i]}</div>
            <div style={{ color: i <= step ? T.text : T.muted, fontWeight: 800, fontSize: 20 }}>{i <= step ? val : "?"}</div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", color, fontWeight: 800, fontSize: 17, marginBottom: 14, minHeight: 26 }}>
        {step >= 4 ? `= ${terms.slice(0, step + 1).join(" + ")} = ${total}` : `= ${terms.slice(0, step + 1).join(" + ")} + …`}
      </div>
      <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
        {[["← Prev", () => setStep(s => Math.max(s-1,0)), step===0],["Next →", () => setStep(s => Math.min(s+1,4)), step===4],["Reset", () => setStep(0), false]].map(([label, handler, disabled]) => (
          <button key={label} onClick={handler} disabled={disabled} style={{ ...vz.modeBtn, opacity: disabled ? 0.35 : 1, background: label==="Next →" ? color : "rgba(255,255,255,0.07)", color: label==="Next →" ? "#0a1a14" : T.sub, fontWeight: label==="Next →" ? 800 : 600 }}>{label}</button>
        ))}
      </div>
      <div style={{ ...vz.caption, marginTop: 12 }}>
        <MathText text={'Click "Next →" to expand $\\sum_{r=1}^{5}(3r-1)$ one term at a time'} />
      </div>
    </div>
  );
}

const makeVz = (T) => ({
  wrapper: { background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: "18px 22px", marginTop: 4 },
  label: { color: T.label, fontSize: 13, fontWeight: 500, marginBottom: 12, fontFamily: "'Segoe UI', sans-serif" },
  barRow: { display: "flex", alignItems: "flex-end", gap: 8, height: 190, marginBottom: 6 },
  barCol: { display: "flex", flexDirection: "column", alignItems: "center", flex: 1, gap: 4 },
  bar: { width: "100%", borderRadius: "6px 6px 0 0", transition: "height 0.55s cubic-bezier(0.34,1.56,0.64,1)", minHeight: 4 },
  nLabel: { color: T.muted, fontSize: 11, fontWeight: 600 },
  caption: { color: T.sub, fontSize: 12, marginTop: 10, fontFamily: "'Segoe UI', sans-serif", lineHeight: 1.7, fontWeight: 400 },
  modeBtn: { background: T.surface, border: `1px solid ${T.border}`, color: T.label, borderRadius: 7, padding: "7px 14px", cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "'Segoe UI', sans-serif" },
});

export const SEQUENCES_VIZ_MAP = {
  arithmetic: ArithmeticViz,
  arithmeticSeries: ArithmeticSeriesViz,
  geometric: GeometricViz,
  geometricSeries: GeometricSeriesViz,
  infinite: InfiniteSeriesViz,
  sigma: SigmaViz,
};

const VIZ_MAP = SEQUENCES_VIZ_MAP;

// ─── Root ──────────────────────────────────────────────────────────────────────
export default function SequencesFlow() {
  return (
    <MasteryFlow
      topics={TOPICS}
      title={SEQUENCES_META.title}
      subtitle={SEQUENCES_META.subtitle}
      vizMap={VIZ_MAP}
    />
  );
}
