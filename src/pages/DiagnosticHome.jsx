import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function DiagnosticHome({ user }) {
  const { T } = useTheme();

  return (
    <div style={{ background: T.dark, minHeight: "100vh", fontFamily: "'Inter','Segoe UI',sans-serif" }}>
      <Navbar user={user} />

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "64px 24px 80px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ display: "inline-block", background: T.greenBg, border: `1px solid ${T.greenBorder}`, borderRadius: 20, padding: "5px 16px", fontSize: 13, color: T.green, fontWeight: 600, marginBottom: 18 }}>
            Free · No signup required · 15 minutes
          </div>
          <h1 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, color: T.text, margin: "0 0 16px" }}>
            Choose your diagnostic
          </h1>
          <p style={{ fontSize: 17, color: T.sub, maxWidth: 520, margin: "0 auto", lineHeight: 1.65 }}>
            12 questions. Behavioural tracking. An AI report that tells you exactly what's holding your score back.
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center", marginBottom: 48 }}>
          {/* SAT */}
          <Link to="/diagnostic/sat" style={{ textDecoration: "none", flex: "1 1 300px", maxWidth: 380 }}>
            <div style={{
              background: T.card, border: `1px solid ${T.border}`,
              borderTop: "3px solid #6366f1", borderRadius: 16, padding: "32px 28px",
              boxShadow: T.cardShadow, cursor: "pointer", transition: "transform 0.15s, box-shadow 0.15s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.12)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = T.cardShadow; }}
            >
              <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(99,102,241,0.12)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                <span style={{ fontSize: 26 }}>🎯</span>
              </div>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: T.text, margin: "0 0 8px" }}>SAT</h2>
              <p style={{ fontSize: 14, color: T.sub, margin: "0 0 20px", lineHeight: 1.6 }}>
                Math & Verbal · Predicts your 400–1600 score · Identifies top score suppressors
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
                {["12 questions", "15 minutes", "AI report"].map(tag => (
                  <span key={tag} style={{ background: "rgba(99,102,241,0.08)", color: "#6366f1", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 6, padding: "3px 10px", fontSize: 12, fontWeight: 600 }}>{tag}</span>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: "#6366f1" }}>Start SAT Diagnostic →</span>
              </div>
            </div>
          </Link>

          {/* IGCSE */}
          <div style={{ flex: "1 1 300px", maxWidth: 380 }}>
            <div style={{
              background: T.card, border: `1px solid ${T.border}`,
              borderTop: "3px solid #1aa38a", borderRadius: 16, padding: "32px 28px",
              boxShadow: T.cardShadow, position: "relative", opacity: 0.75,
            }}>
              <div style={{ position: "absolute", top: 16, right: 16, background: T.greenBg, border: `1px solid ${T.greenBorder}`, borderRadius: 20, padding: "3px 10px", fontSize: 11, color: T.green, fontWeight: 700 }}>
                Coming soon
              </div>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(26,163,138,0.12)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                <span style={{ fontSize: 26 }}>📐</span>
              </div>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: T.text, margin: "0 0 8px" }}>IGCSE</h2>
              <p style={{ fontSize: 14, color: T.sub, margin: "0 0 20px", lineHeight: 1.6 }}>
                Cambridge 0580 · Predicts your A*–C grade · Core & Extended topics
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
                {["16 questions", "20 minutes", "Grade prediction"].map(tag => (
                  <span key={tag} style={{ background: "rgba(26,163,138,0.08)", color: "#1aa38a", border: "1px solid rgba(26,163,138,0.2)", borderRadius: 6, padding: "3px 10px", fontSize: 12, fontWeight: 600 }}>{tag}</span>
                ))}
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: T.muted }}>In development</div>
            </div>
          </div>
        </div>

        {/* What to expect */}
        <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: "24px 28px" }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: T.text, margin: "0 0 16px" }}>What to expect</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 14 }}>
            {[
              { icon: "⏱️", title: "15 minutes",       desc: "Timed to match real SAT conditions" },
              { icon: "🔒", title: "No account needed", desc: "No signup, no credit card — completely free" },
              { icon: "🤖", title: "AI-powered report", desc: "Gemini analyses your behavioural patterns" },
              { icon: "📚", title: "Lesson links",      desc: "Report links directly to relevant lessons" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ fontSize: 20, flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: T.text }}>{item.title}</div>
                  <div style={{ fontSize: 12, color: T.sub, marginTop: 2, lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
