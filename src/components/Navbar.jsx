import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme, ThemeToggle } from "../context/ThemeContext";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

export default function Navbar({ user }) {
  const { T } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [menuOpen, setMenuOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const avatarRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (avatarRef.current && !avatarRef.current.contains(e.target)) setAvatarOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + "/");
  const linkStyle = (path) => ({
    color: isActive(path) ? T.green : T.sub,
    textDecoration: "none", fontSize: 15,
    fontWeight: isActive(path) ? 600 : 400,
    padding: "4px 0",
    borderBottom: `2px solid ${isActive(path) ? T.green : "transparent"}`,
    transition: "color 0.15s",
  });

  const isStudent = user && !["akash95agrawal@gmail.com", "admin@classflow.com"].includes(user.email);
  const initial = user?.displayName?.[0] || user?.email?.[0]?.toUpperCase() || "S";

  const navLinks = (
    <>
      <Link to="/diagnostic" style={linkStyle("/diagnostic")}>Diagnostic</Link>
      <Link to="/lessons" style={linkStyle("/lessons")}>Lessons</Link>
      <Link to="/blog" style={linkStyle("/blog")}>Blog</Link>
    </>
  );

  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 100, background: T.card, borderBottom: `1px solid ${T.border}`, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        {/* Logo */}
        <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,#1aa38a,#0d8f77)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 15, color: "white" }}>SQ</div>
          <span style={{ color: T.text, fontWeight: 700, fontSize: 17 }}>ScoreQuanta</span>
        </Link>

        {/* Desktop nav */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>{navLinks}</div>
        )}

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <ThemeToggle />

          {!user ? (
            <>
              <Link to="/login" style={{ color: T.sub, fontSize: 14, fontWeight: 500, textDecoration: "none" }}>
                Sign in
              </Link>
              <Link to="/login" style={{
                background: "linear-gradient(135deg,#1aa38a,#0d8f77)",
                color: "white", borderRadius: 8, padding: "7px 16px",
                fontSize: 14, fontWeight: 700, textDecoration: "none",
                boxShadow: "0 2px 8px rgba(26,163,138,0.3)",
              }}>
                Sign up free
              </Link>
            </>
          ) : (
            /* Avatar dropdown */
            <div ref={avatarRef} style={{ position: "relative" }}>
              <button onClick={() => setAvatarOpen(o => !o)} style={{
                width: 36, height: 36, borderRadius: "50%",
                background: isStudent ? "linear-gradient(135deg,#6366f1,#4f46e5)" : "linear-gradient(135deg,#1aa38a,#0d8f77)",
                border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "white", fontWeight: 800, fontSize: 15,
              }}>{initial}</button>

              {avatarOpen && (
                <div style={{
                  position: "absolute", right: 0, top: "calc(100% + 8px)",
                  background: T.card, border: `1px solid ${T.border}`,
                  borderRadius: 12, boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                  minWidth: 200, padding: 8, zIndex: 200,
                }}>
                  <div style={{ padding: "8px 12px 12px", borderBottom: `1px solid ${T.border}`, marginBottom: 6 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: T.text }}>{user.displayName || "Student"}</div>
                    <div style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>{user.email}</div>
                  </div>
                  {isStudent && (
                    <Link to="/student-dashboard" onClick={() => setAvatarOpen(false)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 8, textDecoration: "none", color: T.text, fontSize: 13, fontWeight: 500 }}>
                      📊 My Dashboard
                    </Link>
                  )}
                  <Link to="/diagnostic/sat" onClick={() => setAvatarOpen(false)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 8, textDecoration: "none", color: T.text, fontSize: 13, fontWeight: 500 }}>
                    🎯 Take Diagnostic
                  </Link>
                  <Link to="/lessons" onClick={() => setAvatarOpen(false)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 8, textDecoration: "none", color: T.text, fontSize: 13, fontWeight: 500 }}>
                    📚 Lessons
                  </Link>
                  <div style={{ borderTop: `1px solid ${T.border}`, marginTop: 6, paddingTop: 6 }}>
                    <button onClick={() => { signOut(auth); navigate("/"); setAvatarOpen(false); }} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 8, background: "none", border: "none", cursor: "pointer", color: "#ef4444", fontSize: 13, fontWeight: 500, width: "100%" }}>
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {isMobile && (
            <button onClick={() => setMenuOpen(o => !o)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 22, color: T.text, padding: 4 }}>
              {menuOpen ? "✕" : "☰"}
            </button>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMobile && menuOpen && (
        <div style={{ background: T.card, borderTop: `1px solid ${T.border}`, padding: "16px 24px 20px", display: "flex", flexDirection: "column", gap: 18 }}>
          {navLinks}
          {!user && (
            <Link to="/login" style={{ background: "linear-gradient(135deg,#1aa38a,#0d8f77)", color: "white", borderRadius: 8, padding: "10px 16px", fontSize: 14, fontWeight: 700, textDecoration: "none", textAlign: "center" }}>
              Sign up free
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
