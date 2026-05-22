import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme, ThemeToggle } from "../context/ThemeContext";

const TABS = [
  {
    id: "sat",
    label: "SAT",
    tag: "US College Admissions",
    color: "#6366f1",
    subjects: [
      { id: "sat-math", icon: "📐", title: "SAT Math", desc: "Algebra · Advanced Math · Problem Solving · Geometry & Trig", accent: "#6366f1", route: "/sat" },
    ],
  },
  {
    id: "gcse",
    label: "GCSE",
    tag: "Ages 14–16 · Edexcel",
    color: "#10b981",
    subjects: [
      { id: "gcse-higher", icon: "📗", title: "GCSE Maths Higher", desc: "Grades 4–9 · Number · Algebra · Geometry · Statistics · Probability", accent: "#10b981", route: "/gcse" },
    ],
  },
  {
    id: "igcse",
    label: "Cambridge IGCSE",
    tag: "Grades 10–11 · International",
    color: "#3ecfaa",
    subjects: [
      { id: "camb-core", icon: "📘", title: "Core", desc: "Grades C–G · Number · Algebra · Geometry · Statistics & Probability", accent: "#6366f1", route: "/igcse/cambridge" },
      { id: "camb-ext", icon: "📗", title: "Extended", desc: "Grades A*–C · Surds · Quadratics · Functions · Trig · Vectors · Sets · Matrices", accent: "#10b981", route: "/igcse/cambridge" },
    ],
  },
  {
    id: "aslevel",
    label: "AS Level",
    tag: "Ages 16–17 · Edexcel 8MA0",
    color: "#3ecfaa",
    subjects: [
      { id: "pure", icon: "∂", title: "Pure Mathematics", desc: "9 chapters — Proof · Algebra · Sequences · Trig · Calculus · Vectors", accent: "#3ecfaa", route: "/igcse/edexcel/pure" },
      { id: "stats", icon: "σ", title: "Statistics", desc: "7 chapters — Data · Probability · Binomial · Hypothesis Testing", accent: "#22d3ee", route: "/igcse/edexcel/stats" },
      { id: "mech", icon: "⚙️", title: "Mechanics", desc: "4 chapters — Modelling · SUVAT · Forces · Variable Acceleration", accent: "#f97316", route: "/igcse/edexcel/mechanics" },
    ],
  },
  {
    id: "alevel",
    label: "A-Level Y2",
    tag: "Ages 17–18 · Edexcel 9MA0",
    color: "#818cf8",
    subjects: [
      { id: "a2-pure", icon: "∂", title: "Pure Mathematics", desc: "9 chapters — Partial fractions · Trig identities · Chain rule · Integration by parts · Vectors 3D", accent: "#6366f1", route: "/alevel" },
      { id: "a2-stats", icon: "🔔", title: "Statistics", desc: "Normal distribution · Bayes theorem · Hypothesis testing", accent: "#22d3ee", route: "/alevel" },
      { id: "a2-mech", icon: "🚀", title: "Mechanics", desc: "Moments · Projectile motion · Forces in 2D · Friction", accent: "#f97316", route: "/alevel" },
    ],
  },
];

export default function Demo() {
  const navigate = useNavigate();
  const { T, isDark } = useTheme();
  const [activeTab, setActiveTab] = useState("sat");
  const [hovered, setHovered] = useState(null);

  const tab = TABS.find(t => t.id === activeTab);

  const pageGradient = isDark
    ? `linear-gradient(160deg, ${T.dark} 0%, #0a1628 100%)`
    : `linear-gradient(160deg, ${T.dark} 0%, #ece9e3 100%)`;

  return (
    <div style={{ minHeight: "100vh", background: pageGradient, fontFamily: "'Segoe UI', sans-serif", color: T.text, display: "flex", flexDirection: "column" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "18px 32px", borderBottom: `1px solid ${T.border}`, background: T.card }}>
        <div style={{ width: 38, height: 38, borderRadius: 9, background: `linear-gradient(135deg, ${T.green}, ${T.green2})`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 13, color: "#04120d" }}>CF</div>
        <div>
          <div style={{ fontWeight: 800, fontSize: 16, color: T.text }}>ScoreQuanta</div>
          <div style={{ fontSize: 11, color: T.muted }}>Maths · GCSE · IGCSE · SAT · A-Level</div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ background: T.greenBg, border: `1px solid ${T.greenBorder}`, color: T.green, borderRadius: 20, padding: "4px 14px", fontSize: 12, fontWeight: 700 }}>Free · No login required</span>
          <ThemeToggle />
        </div>
      </div>

      {/* Hero */}
      <div style={{ textAlign: "center", padding: "40px 24px 28px", maxWidth: 640, margin: "0 auto" }}>
        <h1 style={{ fontSize: 36, fontWeight: 900, lineHeight: 1.2, margin: "0 0 14px", color: T.text, letterSpacing: "-0.03em" }}>
          Every Maths topic.<br />Theory to practice.
        </h1>
        <div style={{ background: T.greenBg, border: `1px solid ${T.greenBorder}`, borderRadius: 12, padding: "14px 20px", display: "inline-block", maxWidth: 540, marginBottom: 8 }}>
          <p style={{ color: T.green, fontSize: 13, lineHeight: 1.7, margin: 0, fontStyle: "italic", fontWeight: 500 }}>
            "A student has <strong style={{ fontStyle: "normal" }}>learned</strong> something when they can transfer it to an unfamiliar context, accurately, without hints, and still get it right a week later."
          </p>
          <div style={{ color: T.muted, fontSize: 10, marginTop: 6, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>The ScoreQuanta Standard</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", justifyContent: "center", gap: 6, padding: "0 24px 24px", flexWrap: "wrap" }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            background: activeTab === t.id ? t.color + "18" : T.surface,
            border: `1px solid ${activeTab === t.id ? t.color + "60" : T.border}`,
            borderRadius: 10, padding: "10px 18px", cursor: "pointer",
            transition: "all 0.18s", fontFamily: "'Segoe UI', sans-serif",
          }}>
            <span style={{ color: activeTab === t.id ? t.color : T.text, fontWeight: 800, fontSize: 13 }}>{t.label}</span>
            <span style={{ color: T.muted, fontSize: 10, marginTop: 2 }}>{t.tag}</span>
          </button>
        ))}
      </div>

      {/* Subject cards */}
      <div style={{ maxWidth: 860, width: "100%", margin: "0 auto", padding: "0 24px 60px" }}>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(tab.subjects.length, 3)}, 1fr)`, gap: 16 }}>
          {tab.subjects.map(sub => {
            const isHovered = hovered === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => navigate(sub.route)}
                onMouseEnter={() => setHovered(sub.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: isHovered ? T.surface : T.card,
                  border: `1px solid ${isHovered ? sub.accent + "70" : T.border}`,
                  borderRadius: 16, padding: "24px 22px",
                  textAlign: "left", cursor: "pointer", color: T.text,
                  transition: "all 0.2s ease", display: "flex", flexDirection: "column", gap: 10,
                  fontFamily: "'Segoe UI', sans-serif",
                  transform: isHovered ? "translateY(-2px)" : "none",
                  boxShadow: isHovered ? T.cardShadow : "none",
                }}
              >
                <div style={{ width: 46, height: 46, borderRadius: 11, background: sub.accent + "18", color: sub.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 800 }}>
                  {sub.icon}
                </div>
                <div style={{ fontSize: 17, fontWeight: 800, color: T.text, letterSpacing: "-0.01em" }}>{sub.title}</div>
                <div style={{ fontSize: 13, color: T.sub, lineHeight: 1.6, flex: 1 }}>{sub.desc}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: sub.accent }}>Start learning →</div>
              </button>
            );
          })}
        </div>

        {/* Feature strip */}
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center", padding: "28px 0 0", borderTop: `1px solid ${T.border}`, marginTop: 32 }}>
          {[["📖","Theory"],["📐","Formulas"],["✏️","Examples"],["🎯","Practice"],["⚡","AI Evaluation"],["▶","Videos"],["📊","GeoGebra"]].map(([icon, label]) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span>{icon}</span>
              <span style={{ color: T.sub, fontSize: 13 }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tally feedback */}
      <button
        data-tally-open="YOUR_TALLY_FORM_ID"
        data-tally-emoji-text="💬"
        data-tally-emoji-animation="wave"
        style={{ position: "fixed", bottom: 24, right: 24, zIndex: 500, background: T.green, border: "none", borderRadius: 24, padding: "10px 18px", cursor: "pointer", fontWeight: 700, fontSize: 13, color: "#04120d", fontFamily: "'Segoe UI', sans-serif", boxShadow: "0 4px 16px rgba(0,0,0,0.15)", display: "flex", alignItems: "center", gap: 7 }}
      >
        💬 Feedback
      </button>
    </div>
  );
}
