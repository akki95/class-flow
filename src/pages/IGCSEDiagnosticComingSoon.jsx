import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function IGCSEDiagnosticComingSoon({ user }) {
  const { T } = useTheme();
  return (
    <div style={{ background: T.dark, minHeight: "100vh", fontFamily: "'Inter','Segoe UI',sans-serif" }}>
      <Navbar user={user} />
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
        <div style={{ fontSize: 56, marginBottom: 24 }}>📐</div>
        <div style={{ display: "inline-block", background: T.greenBg, border: `1px solid ${T.greenBorder}`, borderRadius: 20, padding: "5px 16px", fontSize: 13, color: T.green, fontWeight: 600, marginBottom: 20 }}>
          Coming Soon
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 900, color: T.text, margin: "0 0 16px" }}>
          IGCSE Diagnostic
        </h1>
        <p style={{ fontSize: 17, color: T.sub, lineHeight: 1.65, margin: "0 0 12px" }}>
          Cambridge 0580 · Core & Extended · Grade prediction A*–C
        </p>
        <p style={{ fontSize: 15, color: T.muted, margin: "0 0 40px" }}>
          We're building a full diagnostic for IGCSE Maths. It'll cover all chapters across Core and Extended with the same AI-powered report format as the SAT diagnostic.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/diagnostic/sat" style={{
            background: "linear-gradient(135deg, #1aa38a, #0d8f77)",
            color: "white", textDecoration: "none",
            padding: "13px 28px", borderRadius: 10, fontSize: 15, fontWeight: 700,
          }}>
            Try SAT Diagnostic Instead →
          </Link>
          <Link to="/igcse/cambridge" style={{
            color: T.text, textDecoration: "none",
            padding: "13px 28px", borderRadius: 10, fontSize: 15, fontWeight: 600,
            border: `1px solid ${T.border}`, background: T.card,
          }}>
            Browse IGCSE Lessons
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
