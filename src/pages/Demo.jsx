import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme, ThemeToggle } from "../context/ThemeContext";

// Public demo landing — no auth required
// Shows the AS Level Edexcel mastery flows without any login

export default function Demo() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);
  const { T, isDark } = useTheme();

  const subjects = [
    {
      id: "pure",
      icon: "∂",
      title: "Pure Mathematics",
      desc: "9 chapters — Proof, Algebra, Coordinate Geometry, Sequences, Trigonometry, Logs, Calculus, Vectors",
      accent: T.green,
      route: "/igcse/edexcel/pure",
    },
    {
      id: "stats",
      icon: "σ",
      title: "Statistics",
      desc: "7 chapters — Data Collection, Distributions, Correlation, Probability, Binomial, Hypothesis Testing",
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
    {
      id: "past-papers",
      icon: "📄",
      title: "Past Papers",
      desc: "2018–2024 · Pure, Stats & Mechanics · Question papers, model answers and mark schemes",
      accent: "#f59e0b",
      route: "/igcse/edexcel/past-papers",
    },
  ];

  const pageGradient = isDark
    ? `linear-gradient(160deg, ${T.dark} 0%, #0a1628 100%)`
    : `linear-gradient(160deg, ${T.dark} 0%, #ece9e3 100%)`;

  const s = {
    page: {
      minHeight: "100vh",
      background: pageGradient,
      fontFamily: "'Segoe UI', sans-serif",
      color: "white",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "40px 24px 60px",
    },
    header: {
      display: "flex", alignItems: "center", gap: 14, marginBottom: 56, alignSelf: "stretch",
    },
    logo: {
      width: 44, height: 44, borderRadius: 11,
      background: `linear-gradient(135deg, ${T.green}, ${T.green2})`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontWeight: 900, fontSize: 15, color: "#04120d",
    },
    logoName: { fontWeight: 800, fontSize: 18, color: T.text },
    logoSub: { fontSize: 12, color: T.muted, marginTop: 2 },
    hero: { textAlign: "center", maxWidth: 640, marginBottom: 52 },
    badge: {
      display: "inline-block",
      background: T.greenBg, border: `1px solid ${T.greenBorder}`,
      color: T.green, borderRadius: 20, padding: "5px 16px",
      fontSize: 12, fontWeight: 700, marginBottom: 20,
      letterSpacing: "0.04em",
    },
    title: {
      fontSize: 40, fontWeight: 900, lineHeight: 1.2,
      margin: "0 0 18px", color: T.text, letterSpacing: "-0.03em",
    },
    sub: {
      color: T.sub, fontSize: 16, lineHeight: 1.8, margin: 0, fontWeight: 400,
    },
    grid: {
      display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
      gap: 16, width: "100%", maxWidth: 860, marginBottom: 48,
    },
    card: {
      background: T.card,
      border: `1px solid ${T.border}`,
      borderRadius: 16, padding: "24px 22px",
      textAlign: "left", cursor: "pointer", color: "white",
      transition: "all 0.2s ease",
      display: "flex", flexDirection: "column", gap: 10,
      fontFamily: "'Segoe UI', sans-serif",
    },
    cardIcon: {
      width: 46, height: 46, borderRadius: 11,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 22, fontWeight: 800, marginBottom: 4,
    },
    cardTitle: { fontSize: 17, fontWeight: 800, color: T.text, letterSpacing: "-0.01em" },
    cardDesc: { fontSize: 13, color: T.sub, lineHeight: 1.6, flex: 1 },
    cardCta: { fontSize: 13, fontWeight: 700, marginTop: 4 },
    features: {
      display: "flex", gap: 28, flexWrap: "wrap", justifyContent: "center",
      marginBottom: 40,
    },
    feature: { display: "flex", alignItems: "center", gap: 6 },
    footer: { color: T.muted, fontSize: 12 },
  };

  return (
    <div style={s.page}>
      {/* Header */}
      <div style={s.header}>
        <div style={s.logo}>CF</div>
        <div>
          <div style={s.logoName}>ClassFlow</div>
          <div style={s.logoSub}>A-Level Edexcel Mathematics</div>
        </div>
        <ThemeToggle style={{ marginLeft: "auto" }} />
      </div>

      {/* Hero */}
      <div style={s.hero}>
        <div style={s.badge}>Free · No login required</div>
        <h1 style={s.title}>Master A-Level Maths,<br />one topic at a time.</h1>
        <p style={s.sub}>
          Theory · Formulas · Worked examples · Practice questions with solutions ·
          Interactive Desmos &amp; GeoGebra tools — all in one place.
        </p>
      </div>

      {/* Subject cards */}
      <div style={s.grid}>
        {subjects.map(sub => (
          <button
            key={sub.id}
            onClick={() => navigate(sub.route)}
            onMouseEnter={() => setHovered(sub.id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              ...s.card,
              borderColor: hovered === sub.id ? sub.accent + "80" : T.border,
              background: hovered === sub.id ? T.surface : T.card,
              transform: hovered === sub.id ? "translateY(-2px)" : "none",
            }}
          >
            <div style={{ ...s.cardIcon, background: sub.accent + "18", color: sub.accent }}>
              {sub.icon}
            </div>
            <div style={s.cardTitle}>{sub.title}</div>
            <div style={s.cardDesc}>{sub.desc}</div>
            <div style={{ ...s.cardCta, color: sub.accent }}>
              Start learning →
            </div>
          </button>
        ))}
      </div>

      {/* Feature strip */}
      <div style={s.features}>
        {[
          ["📖", "Clear theory"],
          ["📐", "Key formulas"],
          ["✏️", "Worked examples"],
          ["🎯", "Practice questions"],
          ["📐", "Desmos graphs"],
          ["📊", "GeoGebra tools"],
        ].map(([icon, label]) => (
          <div key={label} style={s.feature}>
            <span>{icon}</span>
            <span style={{ color: T.sub, fontSize: 13 }}>{label}</span>
          </div>
        ))}
      </div>

      <div style={s.footer}>
        Built with ClassFlow · Edexcel AS Level 8MA0
      </div>

      {/* Tally feedback button — bottom right */}
      {/* SETUP: replace YOUR_TALLY_FORM_ID with your form ID from tally.so */}
      <button
        data-tally-open="YOUR_TALLY_FORM_ID"
        data-tally-emoji-text="💬"
        data-tally-emoji-animation="wave"
        data-tally-auto-close="3000"
        style={{
          position: "fixed", bottom: 24, right: 24, zIndex: 500,
          background: T.green, border: "none", borderRadius: 24,
          padding: "10px 18px", cursor: "pointer",
          fontWeight: 700, fontSize: 13, color: "#04120d",
          fontFamily: "'Segoe UI', sans-serif",
          boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
          display: "flex", alignItems: "center", gap: 7,
        }}
      >
        💬 Feedback
      </button>
    </div>
  );
}
