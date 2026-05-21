import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme, ThemeToggle } from "../context/ThemeContext";
import { PAST_PAPERS } from "../data/pastPapers";

const SUBJECTS = [
  { id: "pure",      label: "Pure Mathematics",  icon: "∂",  color: "#3ecfaa", paper: "Paper 1" },
  { id: "stats",     label: "Statistics",         icon: "σ",  color: "#22d3ee", paper: "Paper 2 — Stats" },
  { id: "mechanics", label: "Mechanics",           icon: "⚙️", color: "#f97316", paper: "Paper 2 — Mechanics" },
];

function PdfButton({ href, label, color }) {
  if (!href) return (
    <span style={{ fontSize: 12, color: "#9ca3af", fontFamily: "'Segoe UI', sans-serif" }}>—</span>
  );
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      background: color + "15", border: `1px solid ${color}40`,
      color, borderRadius: 7, padding: "5px 12px",
      fontSize: 12, fontWeight: 700, textDecoration: "none",
      fontFamily: "'Segoe UI', sans-serif", whiteSpace: "nowrap",
    }}>
      📄 {label}
    </a>
  );
}

export default function PastPapersHome() {
  const navigate = useNavigate();
  const { T } = useTheme();
  const [activeSubject, setActiveSubject] = useState("pure");

  const subject = SUBJECTS.find(s => s.id === activeSubject);
  const papers = PAST_PAPERS[activeSubject] || [];

  return (
    <div style={{ minHeight: "100vh", background: T.dark, fontFamily: "'Segoe UI', sans-serif" }}>

      {/* Header */}
      <div style={{ background: T.card, borderBottom: `1px solid ${T.border}`, padding: "14px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={() => navigate("/igcse/edexcel")} style={{ background: T.surface, border: `1px solid ${T.border}`, color: T.sub, borderRadius: 7, padding: "6px 14px", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>← Back</button>
          <div style={{ width: 32, height: 32, borderRadius: 7, background: `linear-gradient(135deg, ${T.green}, ${T.green2})`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 12, color: "#04120d" }}>CF</div>
          <span style={{ color: T.text, fontWeight: 700, fontSize: 15 }}>Past Papers</span>
          <span style={{ color: T.muted, fontSize: 12 }}>AS Level Edexcel · 2018–2024</span>
        </div>
        <ThemeToggle />
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "32px 24px" }}>

        {/* Subject tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
          {SUBJECTS.map(s => (
            <button key={s.id} onClick={() => setActiveSubject(s.id)} style={{
              display: "flex", alignItems: "center", gap: 8,
              background: activeSubject === s.id ? s.color + "18" : T.surface,
              border: `1px solid ${activeSubject === s.id ? s.color + "50" : T.border}`,
              borderRadius: 10, padding: "10px 18px", cursor: "pointer",
              color: activeSubject === s.id ? s.color : T.sub,
              fontWeight: 700, fontSize: 13, fontFamily: "'Segoe UI', sans-serif",
              transition: "all 0.18s",
            }}>
              <span>{s.icon}</span>
              <span>{s.label}</span>
              <span style={{ background: activeSubject === s.id ? s.color + "25" : T.equation, color: activeSubject === s.id ? s.color : T.muted, borderRadius: 5, padding: "2px 7px", fontSize: 11, fontWeight: 700 }}>
                {(PAST_PAPERS[s.id] || []).length} years
              </span>
            </button>
          ))}
        </div>

        {/* Description */}
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: T.text, margin: "0 0 4px", letterSpacing: "-0.01em" }}>
            {subject.label}
          </h1>
          <p style={{ color: T.sub, fontSize: 13, margin: 0 }}>
            {subject.paper} · Edexcel 8MA0 · Question papers, model answers and mark schemes
          </p>
        </div>

        {/* Papers table */}
        <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, overflow: "hidden" }}>
          {/* Column headers */}
          <div style={{ display: "grid", gridTemplateColumns: "90px 1fr 1fr 1fr", gap: 0, padding: "10px 20px", background: T.surface, borderBottom: `1px solid ${T.border}` }}>
            {["Year", "Question Paper", "Model Answers", "Mark Scheme"].map(h => (
              <div key={h} style={{ color: T.muted, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em" }}>{h}</div>
            ))}
          </div>

          {/* Rows */}
          {papers.map((p, i) => (
            <div key={p.year} style={{
              display: "grid", gridTemplateColumns: "90px 1fr 1fr 1fr",
              gap: 0, padding: "14px 20px", alignItems: "center",
              borderBottom: i < papers.length - 1 ? `1px solid ${T.border}` : "none",
              background: i % 2 === 0 ? "transparent" : T.surface + "60",
            }}>
              <div>
                <div style={{ color: T.text, fontWeight: 800, fontSize: 15 }}>{p.year}</div>
                <div style={{ color: T.muted, fontSize: 11 }}>{p.month}</div>
              </div>
              <PdfButton href={p.qp} label="Open" color={subject.color} />
              <PdfButton href={p.ma} label="Open" color={subject.color} />
              <PdfButton href={p.ms} label="Open" color={subject.color} />
            </div>
          ))}
        </div>

        {/* Note */}
        <p style={{ color: T.muted, fontSize: 12, marginTop: 16, lineHeight: 1.6 }}>
          Papers open in a new tab. Tip: open the question paper and mark scheme side by side for best results.
        </p>
      </div>
    </div>
  );
}
