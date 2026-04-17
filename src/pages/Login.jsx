import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("teacher");
  const [sessionId, setSessionId] = useState("");
  const [error, setError] = useState("");
  const [isNew, setIsNew] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (role === "student") {
        if (!sessionId.trim()) { setError("Enter a Session ID from your teacher"); return; }
        navigate(`/student/${sessionId.trim()}`);
        return;
      }
      if (isNew) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate("/teacher");
    } catch (err) {
      setError(err.message.replace("Firebase: ", "").replace(/\(auth.*\)/, ""));
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.logoRow}>
          <div style={styles.logoIcon}>CF</div>
          <div>
            <div style={styles.logoName}>ClassFlow</div>
            <div style={styles.logoSub}>Live 1-on-1 Tutoring Platform</div>
          </div>
        </div>

        <div style={styles.roleToggle}>
          {["teacher", "student"].map(r => (
            <button key={r} onClick={() => setRole(r)}
              style={{ ...styles.roleBtn, ...(role === r ? styles.roleBtnActive : {}) }}>
              {r === "teacher" ? "👩‍🏫 Teacher" : "🎓 Student"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          {role === "teacher" && <>
            <input style={styles.input} type="email" placeholder="Email"
              value={email} onChange={e => setEmail(e.target.value)} required />
            <input style={styles.input} type="password" placeholder="Password"
              value={password} onChange={e => setPassword(e.target.value)} required />
          </>}
          {role === "student" && <>
            <input style={styles.input} type="text" placeholder="Session ID (from your teacher)"
              value={sessionId} onChange={e => setSessionId(e.target.value)} required />
          </>}

          {error && <p style={styles.error}>{error}</p>}

          <button style={styles.submitBtn} type="submit">
            {role === "teacher" ? (isNew ? "Create Account" : "Sign In") : "Join Session"}
          </button>

          {role === "teacher" && (
            <p style={styles.toggle} onClick={() => setIsNew(!isNew)}>
              {isNew ? "Already have an account? Sign in" : "New teacher? Create account"}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: "100vh", background: "linear-gradient(135deg, #0a0f1e 0%, #0d2137 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Segoe UI', sans-serif" },
  card: { background: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 24, padding: "40px 48px", width: 400, color: "white" },
  logoRow: { display: "flex", alignItems: "center", gap: 14, marginBottom: 32 },
  logoIcon: { width: 48, height: 48, borderRadius: 12, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 16, color: "white" },
  logoName: { fontSize: 22, fontWeight: 800, color: "white" },
  logoSub: { fontSize: 12, color: "#64748b", marginTop: 2 },
  roleToggle: { display: "flex", gap: 8, marginBottom: 24 },
  roleBtn: { flex: 1, padding: "10px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.15)", background: "transparent", color: "#94a3b8", cursor: "pointer", fontSize: 14, transition: "all 0.2s" },
  roleBtnActive: { background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "white", fontWeight: 700, border: "1px solid transparent" },
  form: { display: "flex", flexDirection: "column", gap: 12 },
  input: { padding: "12px 16px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.06)", color: "white", fontSize: 15, outline: "none" },
  error: { color: "#f87171", fontSize: 13, margin: 0 },
  submitBtn: { padding: "14px", borderRadius: 10, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "white", fontWeight: 700, fontSize: 16, border: "none", cursor: "pointer", marginTop: 4 },
  toggle: { textAlign: "center", color: "#64748b", fontSize: 13, cursor: "pointer", margin: 0 }
};