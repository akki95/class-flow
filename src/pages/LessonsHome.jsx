import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CURRICULA = [
  {
    icon: "🎯", color: "#6366f1", title: "SAT", subtitle: "Math & Verbal",
    desc: "4 chapters · 13 topics · Algebra, Advanced Math, Problem Solving, Geometry & Verbal",
    link: "/sat", cta: "Start SAT Lessons",
    tags: ["Digital SAT", "College Board", "2025"],
  },
  {
    icon: "📐", color: "#1aa38a", title: "Cambridge IGCSE", subtitle: "0580 Mathematics",
    desc: "Core & Extended · Number, Algebra, Geometry, Statistics, Sets, Matrices",
    link: "/igcse/cambridge", cta: "Start IGCSE Lessons",
    tags: ["Cambridge", "Core", "Extended"],
  },
  {
    icon: "📊", color: "#f97316", title: "GCSE Maths", subtitle: "Edexcel Higher",
    desc: "Grades 4–9 · Number, Algebra, Geometry, Statistics, Probability",
    link: "/gcse", cta: "Start GCSE Lessons",
    tags: ["Edexcel", "Grades 4–9", "Higher"],
  },
  {
    icon: "∂", color: "#8b5cf6", title: "A-Level Maths", subtitle: "Edexcel Year 1 & 2",
    desc: "Pure · Statistics · Mechanics · 40+ topics across all modules",
    link: "/alevel", cta: "Start A-Level Lessons",
    tags: ["Edexcel", "Pure", "Stats", "Mechanics"],
  },
  {
    icon: "📄", color: "#0ea5e9", title: "Past Papers", subtitle: "IGCSE & A-Level",
    desc: "54 past papers from 2018–2024 · Cambridge IGCSE 0580 · Fully indexed",
    link: "/igcse/edexcel/past-papers", cta: "Browse Past Papers",
    tags: ["2018–2024", "PDF", "Free"],
  },
];

export default function LessonsHome({ user }) {
  const { T } = useTheme();

  return (
    <div style={{ background: T.dark, minHeight: "100vh", fontFamily: "'Inter','Segoe UI',sans-serif" }}>
      <Navbar user={user} />

      <div style={{ maxWidth: 1060, margin: "0 auto", padding: "48px 24px 72px" }}>
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 900, color: T.text, margin: "0 0 10px" }}>
            Lessons
          </h1>
          <p style={{ fontSize: 16, color: T.sub, margin: 0 }}>
            Structured lessons with theory, worked examples, Desmos visualisations and practice questions.
          </p>
        </div>

        {/* Curriculum cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
          {CURRICULA.map((c, i) => (
            <Link key={i} to={c.link} style={{ textDecoration: "none" }}>
              <div style={{
                background: T.card, border: `1px solid ${T.border}`,
                borderTop: `3px solid ${c.color}`,
                borderRadius: 14, padding: "24px",
                boxShadow: T.cardShadow, height: "100%",
                display: "flex", flexDirection: "column",
                transition: "transform 0.15s, box-shadow 0.15s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = T.cardShadow; }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: 12, marginBottom: 16,
                  background: `${c.color}15`, display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 24, color: c.color, fontWeight: 900,
                }}>{c.icon}</div>
                <div style={{ fontSize: 12, color: T.muted, marginBottom: 4 }}>{c.subtitle}</div>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: T.text, margin: "0 0 8px" }}>{c.title}</h2>
                <p style={{ fontSize: 14, color: T.sub, lineHeight: 1.6, margin: "0 0 16px", flex: 1 }}>{c.desc}</p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 18 }}>
                  {c.tags.map(tag => (
                    <span key={tag} style={{ background: `${c.color}10`, color: c.color, border: `1px solid ${c.color}25`, borderRadius: 6, padding: "2px 8px", fontSize: 11, fontWeight: 600 }}>{tag}</span>
                  ))}
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: c.color }}>{c.cta} →</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Diagnostic CTA */}
        <div style={{
          marginTop: 40, background: T.greenBg, border: `1px solid ${T.greenBorder}`,
          borderRadius: 14, padding: "20px 24px",
          display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14,
        }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: T.text }}>Not sure where to start?</div>
            <div style={{ fontSize: 13, color: T.sub, marginTop: 3 }}>Take a free diagnostic to find your weak areas — then go straight to the relevant lessons.</div>
          </div>
          <Link to="/diagnostic" style={{
            background: "linear-gradient(135deg, #1aa38a, #0d8f77)",
            color: "white", textDecoration: "none",
            padding: "10px 22px", borderRadius: 10, fontSize: 14, fontWeight: 700, whiteSpace: "nowrap",
          }}>
            Take Free Diagnostic →
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
