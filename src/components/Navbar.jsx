import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme, ThemeToggle } from "../context/ThemeContext";

export default function Navbar({ user }) {
  const { T } = useTheme();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + "/");

  const linkStyle = (path) => ({
    color: isActive(path) ? T.green : T.sub,
    textDecoration: "none",
    fontSize: 15,
    fontWeight: isActive(path) ? 600 : 400,
    padding: "4px 0",
    borderBottom: isActive(path) ? `2px solid ${T.green}` : "2px solid transparent",
    transition: "color 0.15s",
  });

  const navLinks = (
    <>
      <Link to="/diagnostic" style={linkStyle("/diagnostic")}>Diagnostic</Link>
      <Link to="/sat" style={linkStyle("/sat")}>Lessons</Link>
      <Link to="/blog" style={linkStyle("/blog")}>Blog</Link>
    </>
  );

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      background: T.card,
      borderBottom: `1px solid ${T.border}`,
      boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
    }}>
      <div style={{
        maxWidth: 1100, margin: "0 auto",
        padding: "0 24px",
        height: 60,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "linear-gradient(135deg, #1aa38a, #0d8f77)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 900, fontSize: 15, color: "white", flexShrink: 0,
          }}>SQ</div>
          <span style={{ color: T.text, fontWeight: 700, fontSize: 17 }}>ScoreQuanta</span>
        </Link>

        {/* Desktop nav links */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            {navLinks}
          </div>
        )}

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <ThemeToggle />
          {!user && (
            <Link to="/login" style={{
              color: T.green, border: `1px solid ${T.green}`,
              borderRadius: 8, padding: "6px 16px",
              fontSize: 14, fontWeight: 600,
              textDecoration: "none",
              transition: "background 0.15s",
            }}>Login</Link>
          )}
          {isMobile && (
            <button
              onClick={() => setMenuOpen(o => !o)}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: 22, color: T.text, padding: 4 }}
            >{menuOpen ? "✕" : "☰"}</button>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMobile && menuOpen && (
        <div style={{
          background: T.card,
          borderTop: `1px solid ${T.border}`,
          padding: "16px 24px 20px",
          display: "flex", flexDirection: "column", gap: 18,
        }}>
          {navLinks}
        </div>
      )}
    </nav>
  );
}
