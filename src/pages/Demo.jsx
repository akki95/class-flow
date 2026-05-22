import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme, ThemeToggle } from "../context/ThemeContext";

const LEVELS = [
  {
    id: "sat",
    label: "SAT",
    tag: "US College Admissions",
    desc: "Digital SAT · Math",
    color: "#6366f1",
    subjects: [
      { id: "sat-math", icon: "📐", title: "SAT Math", desc: "Digital SAT · Algebra, Advanced Math, Problem Solving & Data, Geometry & Trig · 13 topics", accent: "#6366f1", route: "/sat" },
    ],
  },
  {
    id: "gcse",
    label: "GCSE",
    tag: "Ages 14–16",
    desc: "Edexcel 1MA1 · Higher Tier",
    color: "#10b981",
    subjects: [
      {
        id: "gcse-higher",
        icon: "📗",
        title: "GCSE Maths Higher",
        desc: "Grades 4–9 · Number, Algebra, Geometry, Statistics & Probability",
        accent: "#10b981",
        route: "/gcse",
      },
    ],
  },
  {
    id: "alevel",
    label: "AS / A-Level",
    tag: "Ages 16–18 · Year 12",
    desc: "Edexcel 8MA0 · Paper 1 & 2",
    color: "#3ecfaa",
    subjects: [
      {
        id: "pure",
        icon: "∂",
        title: "Pure Mathematics",
        desc: "9 chapters — Proof, Algebra, Sequences, Trigonometry, Calculus, Vectors",
        accent: "#3ecfaa",
        route: "/igcse/edexcel/pure",
      },
      {
        id: "stats",
        icon: "σ",
        title: "Statistics",
        desc: "7 chapters — Data, Probability, Binomial Distribution, Hypothesis Testing",
        accent: "#22d3ee",
        route: "/igcse/edexcel/stats",
      },
      {
        id: "mechanics",
        icon: "⚙️",
        title: "Mechanics",
        desc: "4 chapters — Modelling, SUVAT, Forces & Newton's Laws, Variable Acceleration",
        accent: "#f97316",
        route: "/igcse/edexcel/mechanics",
      },
    ],
  },
  {
    id: "a2",
    label: "A-Level Year 2",
    tag: "Ages 17–18",
    desc: "Edexcel 9MA0 · Full A-Level",
    color: "#818cf8",
    subjects: [
      { id: "a2-pure", icon: "∂", title: "Pure Mathematics Y2", desc: "9 chapters — Partial fractions, Trig identities, Chain rule, Integration by parts, Parametric, Vectors 3D", accent: "#6366f1", route: "/alevel" },
      { id: "a2-stats", icon: "🔔", title: "Statistics Y2", desc: "Normal distribution, Hypothesis testing for mean and correlation", accent: "#22d3ee", route: "/alevel" },
      { id: "a2-mech", icon: "🚀", title: "Mechanics Y2", desc: "Moments, Projectile motion, Forces in 2D, Friction on slopes", accent: "#f97316", route: "/alevel" },
    ],
  },
  {
    id: "igcse-cambridge",
    label: "Cambridge IGCSE",
    tag: "Grades 10–11 · International",
    desc: "Cambridge 0580 · Core & Extended",
    color: "#3ecfaa",
    subjects: [
      { id: "camb-core", icon: "📘", title: "IGCSE Core", desc: "Grades C–G · Number, Algebra, Geometry, Statistics & Probability", accent: "#6366f1", route: "/igcse/cambridge" },
      { id: "camb-ext", icon: "📗", title: "IGCSE Extended", desc: "Grades A*–C · Surds, Quadratics, Functions, Trig, Circle Theorems, Vectors", accent: "#10b981", route: "/igcse/cambridge" },
    ],
  },
];

export default function Demo() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);
  const { T, isDark } = useTheme();

  const pageGradient = isDark
    ? `linear-gradient(160deg, ${T.dark} 0%, #0a1628 100%)`
    : `linear-gradient(160deg, ${T.dark} 0%, #ece9e3 100%)`;

  return (
    <div style={{ minHeight: "100vh", background: pageGradient, fontFamily: "'Segoe UI', sans-serif", color: T.text }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "20px 32px", borderBottom: `1px solid ${T.border}` }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: `linear-gradient(135deg, ${T.green}, ${T.green2})`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14, color: "#04120d" }}>CF</div>
        <div>
          <div style={{ fontWeight: 800, fontSize: 17, color: T.text }}>ClassFlow</div>
          <div style={{ fontSize: 11, color: T.muted }}>Edexcel Maths · GCSE & A-Level</div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ background: T.greenBg, border: `1px solid ${T.greenBorder}`, color: T.green, borderRadius: 20, padding: "4px 14px", fontSize: 12, fontWeight: 700 }}>
            Free · No login required
          </span>
          <ThemeToggle />
        </div>
      </div>

      {/* Hero */}
      <div style={{ textAlign: "center", padding: "52px 24px 32px", maxWidth: 680, margin: "0 auto" }}>
        <h1 style={{ fontSize: 38, fontWeight: 900, lineHeight: 1.2, margin: "0 0 16px", color: T.text, letterSpacing: "-0.03em" }}>
          Every Maths topic.<br />Theory to practice.
        </h1>
        <p style={{ color: T.sub, fontSize: 15, lineHeight: 1.8, margin: "0 0 28px" }}>
          Theory · Formulas · Worked examples · Practice questions · Bicen Maths videos · Desmos & GeoGebra — all in one place.
        </p>
        {/* Core belief */}
        <div style={{
          background: T.greenBg,
          border: `1px solid ${T.greenBorder}`,
          borderRadius: 14, padding: "18px 24px",
          display: "inline-block", maxWidth: 580,
        }}>
          <p style={{
            color: T.green, fontSize: 14, lineHeight: 1.7, margin: 0,
            fontStyle: "italic", fontWeight: 500,
          }}>
            "A student has <strong style={{ fontStyle: "normal" }}>learned</strong> something when they can transfer it to an unfamiliar context, accurately, without hints, and still get it right a week later."
          </p>
          <div style={{ color: T.muted, fontSize: 11, marginTop: 8, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>
            The ClassFlow standard
          </div>
        </div>
      </div>

      {/* Levels */}
      <div style={{ maxWidth: 940, margin: "0 auto", padding: "0 24px 64px" }}>
        {LEVELS.map(level => (
          <div key={level.id} style={{ marginBottom: 44 }}>

            {/* Section header */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ height: 1, width: 24, background: level.color, opacity: 0.6 }} />
              <span style={{ color: level.color, fontWeight: 800, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.08em" }}>{level.label}</span>
              {level.tag && <span style={{ color: T.muted, fontSize: 12 }}>{level.tag}</span>}
              {level.desc && <span style={{ color: T.muted, fontSize: 12 }}>· {level.desc}</span>}
              <div style={{ flex: 1, height: 1, background: T.border }} />
            </div>

            {/* Subject cards */}
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(level.subjects.length, 3)}, 1fr)`, gap: 14 }}>
              {level.subjects.map(sub => {
                const isComingSoon = !sub.route;
                const isHovered = hovered === sub.id;
                return (
                  <button
                    key={sub.id}
                    onClick={() => sub.route && navigate(sub.route)}
                    onMouseEnter={() => !isComingSoon && setHovered(sub.id)}
                    onMouseLeave={() => setHovered(null)}
                    disabled={isComingSoon}
                    style={{
                      background: isComingSoon ? T.surface : isHovered ? T.surface : T.card,
                      border: `1px solid ${isHovered ? sub.accent + "70" : T.border}`,
                      borderRadius: 16, padding: "22px 20px",
                      textAlign: "left", cursor: isComingSoon ? "default" : "pointer",
                      color: T.text, transition: "all 0.2s ease",
                      display: "flex", flexDirection: "column", gap: 8,
                      fontFamily: "'Segoe UI', sans-serif",
                      opacity: isComingSoon ? 0.55 : 1,
                      transform: isHovered ? "translateY(-2px)" : "none",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div style={{ width: 44, height: 44, borderRadius: 10, background: sub.accent + "18", color: sub.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 800 }}>
                        {sub.icon}
                      </div>
                      {isComingSoon && (
                        <span style={{ background: T.equation, color: T.muted, borderRadius: 6, padding: "3px 9px", fontSize: 11, fontWeight: 700 }}>Soon</span>
                      )}
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: T.text, letterSpacing: "-0.01em" }}>{sub.title}</div>
                    <div style={{ fontSize: 13, color: T.sub, lineHeight: 1.6, flex: 1 }}>{sub.desc}</div>
                    {!isComingSoon && (
                      <div style={{ fontSize: 13, fontWeight: 700, color: sub.accent, marginTop: 2 }}>Start learning →</div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Feature strip */}
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center", padding: "24px 0", borderTop: `1px solid ${T.border}`, marginBottom: 16 }}>
          {[["📖","Theory"],["📐","Formulas"],["✏️","Examples"],["🎯","Practice"],["▶","Videos"],["📊","GeoGebra"]].map(([icon, label]) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span>{icon}</span>
              <span style={{ color: T.sub, fontSize: 13 }}>{label}</span>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", color: T.muted, fontSize: 12 }}>
          Built with ClassFlow · Edexcel GCSE 1MA1 · AS Level 8MA0
        </div>
      </div>

      {/* Tally feedback */}
      <button
        data-tally-open="YOUR_TALLY_FORM_ID"
        data-tally-emoji-text="💬"
        data-tally-emoji-animation="wave"
        data-tally-auto-close="3000"
        style={{ position: "fixed", bottom: 24, right: 24, zIndex: 500, background: T.green, border: "none", borderRadius: 24, padding: "10px 18px", cursor: "pointer", fontWeight: 700, fontSize: 13, color: "#04120d", fontFamily: "'Segoe UI', sans-serif", boxShadow: "0 4px 16px rgba(0,0,0,0.15)", display: "flex", alignItems: "center", gap: 7 }}
      >
        💬 Feedback
      </button>
    </div>
  );
}
