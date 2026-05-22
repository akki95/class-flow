import { useState } from "react";
import { auth, db, googleProvider } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { ThemeToggle } from "../context/ThemeContext";

export default function Login() {
  const { T } = useTheme();
  const navigate = useNavigate();
  const [mode, setMode] = useState("signup"); // "signup" | "signin"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const redirectByRole = async (uid) => {
    const userDoc = await getDoc(doc(db, "USERS", uid));
    if (!userDoc.exists()) { navigate("/student-dashboard"); return; }
    const role = userDoc.data().role;
    if (role === "admin") navigate("/admin");
    else if (role === "teacher") navigate("/teacher");
    else navigate("/student-dashboard");
  };

  const handleEmail = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      if (mode === "signup") {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "USERS", user.uid), {
          uid: user.uid, email: user.email,
          role: "student", name: name || email.split("@")[0],
          createdAt: new Date().toISOString(),
        });
        navigate("/student-dashboard");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        await redirectByRole(auth.currentUser.uid);
      }
    } catch (err) {
      setError(err.message.replace("Firebase: ", "").replace(/\(auth.*\)/, "").trim());
    }
    setLoading(false);
  };

  const handleGoogle = async () => {
    setError(""); setLoading(true);
    try {
      const { user } = await signInWithPopup(auth, googleProvider);
      // Create profile if new user
      const ref = doc(db, "USERS", user.uid);
      const snap = await getDoc(ref);
      if (!snap.exists()) {
        await setDoc(ref, {
          uid: user.uid, email: user.email,
          role: "student", name: user.displayName || user.email.split("@")[0],
          createdAt: new Date().toISOString(),
        });
        navigate("/student-dashboard");
      } else {
        await redirectByRole(user.uid);
      }
    } catch (err) {
      setError(err.message.replace("Firebase: ", "").replace(/\(auth.*\)/, "").trim());
    }
    setLoading(false);
  };

  const inp = {
    width: "100%", padding: "12px 14px", borderRadius: 10,
    border: `1px solid ${T.border}`, background: T.surface,
    color: T.text, fontSize: 15, outline: "none",
    boxSizing: "border-box", fontFamily: "inherit",
  };

  return (
    <div style={{ minHeight: "100vh", background: T.dark, display: "flex", flexDirection: "column", fontFamily: "'Inter','Segoe UI',sans-serif" }}>
      {/* Top bar */}
      <div style={{ padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <div style={{ width: 28, height: 28, borderRadius: 7, background: "linear-gradient(135deg,#1aa38a,#0d8f77)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 13, color: "white" }}>SQ</div>
          <span style={{ fontSize: 15, fontWeight: 700, color: T.text }}>ScoreQuanta</span>
        </Link>
        <ThemeToggle />
      </div>

      {/* Card */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
        <div style={{ width: "100%", maxWidth: 420 }}>
          <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: "36px 32px", boxShadow: T.cardShadow }}>

            {/* Mode toggle */}
            <div style={{ display: "flex", background: T.surface, borderRadius: 10, padding: 4, marginBottom: 28 }}>
              {[["signup", "Create account"], ["signin", "Sign in"]].map(([m, label]) => (
                <button key={m} onClick={() => { setMode(m); setError(""); }} style={{
                  flex: 1, padding: "9px", borderRadius: 8, border: "none", cursor: "pointer",
                  fontWeight: mode === m ? 700 : 400, fontSize: 14,
                  background: mode === m ? T.card : "transparent",
                  color: mode === m ? T.text : T.sub,
                  boxShadow: mode === m ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                  transition: "all 0.15s",
                }}>{label}</button>
              ))}
            </div>

            {/* Heading */}
            <h1 style={{ fontSize: 22, fontWeight: 900, color: T.text, margin: "0 0 6px" }}>
              {mode === "signup" ? "Start tracking your progress" : "Welcome back"}
            </h1>
            <p style={{ fontSize: 14, color: T.sub, margin: "0 0 24px" }}>
              {mode === "signup"
                ? "Free account · Save diagnostic history · Track score improvements"
                : "Sign in to your ScoreQuanta account"}
            </p>

            {/* Google button */}
            <button onClick={handleGoogle} disabled={loading} style={{
              width: "100%", padding: "12px", borderRadius: 10,
              border: `1px solid ${T.border}`, background: T.card,
              color: T.text, fontSize: 15, fontWeight: 600,
              cursor: loading ? "wait" : "pointer", display: "flex",
              alignItems: "center", justifyContent: "center", gap: 10,
              marginBottom: 16, transition: "border-color 0.15s",
            }}>
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
                <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
                <path fill="#FBBC05" d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"/>
                <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z"/>
              </svg>
              Continue with Google
            </button>

            {/* Divider */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ flex: 1, height: 1, background: T.border }} />
              <span style={{ fontSize: 12, color: T.muted }}>or with email</span>
              <div style={{ flex: 1, height: 1, background: T.border }} />
            </div>

            {/* Email form */}
            <form onSubmit={handleEmail} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {mode === "signup" && (
                <input style={inp} type="text" placeholder="Your name" value={name}
                  onChange={e => setName(e.target.value)} />
              )}
              <input style={inp} type="email" placeholder="Email address" value={email}
                onChange={e => setEmail(e.target.value)} required />
              <input style={inp} type="password" placeholder={mode === "signup" ? "Create password (min 6 chars)" : "Password"}
                value={password} onChange={e => setPassword(e.target.value)} required minLength={6} />

              {error && (
                <div style={{ fontSize: 13, color: "#ef4444", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 8, padding: "8px 12px" }}>
                  {error}
                </div>
              )}

              <button type="submit" disabled={loading} style={{
                width: "100%", padding: "13px", borderRadius: 10, border: "none",
                background: "linear-gradient(135deg,#1aa38a,#0d8f77)",
                color: "white", fontSize: 15, fontWeight: 800,
                cursor: loading ? "wait" : "pointer",
                boxShadow: "0 4px 14px rgba(26,163,138,0.3)",
                marginTop: 4,
              }}>
                {loading ? "Please wait…" : mode === "signup" ? "Create Free Account" : "Sign In"}
              </button>
            </form>

            <p style={{ fontSize: 13, color: T.muted, textAlign: "center", marginTop: 16, marginBottom: 0 }}>
              {mode === "signup" ? "Already have an account? " : "Don't have an account? "}
              <button onClick={() => { setMode(mode === "signup" ? "signin" : "signup"); setError(""); }}
                style={{ background: "none", border: "none", color: T.green, cursor: "pointer", fontSize: 13, fontWeight: 600, padding: 0 }}>
                {mode === "signup" ? "Sign in" : "Create one — it's free"}
              </button>
            </p>

            {/* Staff login link */}
            <div style={{ borderTop: `1px solid ${T.border}`, marginTop: 20, paddingTop: 16, textAlign: "center" }}>
              <span style={{ fontSize: 12, color: T.muted }}>Teacher or admin? </span>
              <button onClick={() => {
                setMode("signin");
                setError("Are you a teacher or admin? Sign in with your staff credentials above.");
              }} style={{ background: "none", border: "none", color: T.muted, cursor: "pointer", fontSize: 12, textDecoration: "underline", padding: 0 }}>
                Staff login
              </button>
            </div>
          </div>

          <p style={{ textAlign: "center", fontSize: 12, color: T.muted, marginTop: 16 }}>
            No credit card required · Free forever for students
          </p>
        </div>
      </div>
    </div>
  );
}
