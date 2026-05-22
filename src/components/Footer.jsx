import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Footer() {
  const { T } = useTheme();

  const colHeading = {
    color: T.text, fontSize: 12, fontWeight: 700,
    letterSpacing: "0.08em", textTransform: "uppercase",
    marginBottom: 16,
  };

  const footerLink = {
    color: T.sub, fontSize: 14, textDecoration: "none",
    display: "block", marginBottom: 10, transition: "color 0.15s",
  };

  return (
    <footer style={{ background: T.dark, borderTop: `1px solid ${T.border}`, padding: "48px 24px 32px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 40, marginBottom: 40 }}>

          {/* Brand */}
          <div style={{ flex: "1.5 1 200px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: "linear-gradient(135deg, #1aa38a, #0d8f77)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 900, fontSize: 15, color: "white",
              }}>SQ</div>
              <span style={{ color: T.text, fontWeight: 700, fontSize: 16 }}>ScoreQuanta</span>
            </div>
            <p style={{ color: T.sub, fontSize: 14, lineHeight: 1.6, maxWidth: 240, margin: 0 }}>
              Diagnose. Learn. Score.<br />
              The complete platform for SAT, IGCSE, and A-Level prep.
            </p>
          </div>

          {/* Platform */}
          <div style={{ flex: "1 1 140px" }}>
            <p style={colHeading}>Platform</p>
            <Link to="/diagnostic" style={footerLink}>Diagnostic</Link>
            <Link to="/sat" style={footerLink}>SAT Lessons</Link>
            <Link to="/igcse/cambridge" style={footerLink}>IGCSE Lessons</Link>
            <Link to="/blog" style={footerLink}>Blog</Link>
          </div>

          {/* Resources */}
          <div style={{ flex: "1 1 140px" }}>
            <p style={colHeading}>Resources</p>
            <Link to="/diagnostic" style={footerLink}>Free Diagnostic</Link>
            <Link to="/igcse/edexcel/past-papers" style={footerLink}>Past Papers</Link>
            <Link to="/blog/sat-test-day-checklist-everything-you-need-to-bring" style={footerLink}>SAT Guide</Link>
            <Link to="/blog/sat-reading-and-writing-complete-section-guide-2025" style={footerLink}>IGCSE Guide</Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 24 }}>
          <p style={{ color: T.muted, fontSize: 13, margin: 0 }}>
            © 2026 ScoreQuanta · Built for ambitious students.
          </p>
        </div>
      </div>
    </footer>
  );
}
