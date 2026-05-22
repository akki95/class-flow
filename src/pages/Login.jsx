import { useState } from "react";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("teacher");
  const [error, setError] = useState("");
  const [isNew, setIsNew] = useState(false);
  const navigate = useNavigate();

  const handleTestLogin = async (testRole) => {
    setError("");
    const isTeacher = testRole === "teacher";
    const isAdmin = testRole === "admin";
    const testEmail = isAdmin ? "admin@classflow.com" : (isTeacher ? "teacher@classflow.com" : "student@classflow.com");
    const testPass = "password123";
    try {
      await signInWithEmailAndPassword(auth, testEmail, testPass);
    } catch (err) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, testEmail, testPass);
        const user = userCredential.user;
        await setDoc(doc(db, "USERS", user.uid), {
          uid: user.uid,
          email: user.email,
          role: testRole,
          name: isAdmin ? "Test Admin" : (isTeacher ? "Test Teacher" : "Test Student"),
          teacherId: isTeacher || isAdmin ? null : ""
        });
      } catch (createErr) {
        setError("Test login failed: " + createErr.message.replace("Firebase: ", ""));
        return;
      }
    }
    const userDoc = await getDoc(doc(db, "USERS", auth.currentUser.uid));
    if (userDoc.exists() && userDoc.data().role === "student") {
      navigate("/student-dashboard");
    } else if (userDoc.exists() && userDoc.data().role === "admin") {
      navigate("/admin");
    } else {
      navigate("/teacher");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isNew) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await setDoc(doc(db, "USERS", user.uid), {
          uid: user.uid,
          email: user.email,
          role: role,
          name: name,
          teacherId: role === "student" ? "" : null
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      
      const userDoc = await getDoc(doc(db, "USERS", auth.currentUser.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.role === "student") {
          navigate("/student-dashboard");
        } else if (userData.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/teacher");
        }
      } else {
        // Fallback for old accounts
        navigate("/teacher");
      }
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
            <div style={styles.logoName}>ScoreQuanta</div>
            <div style={styles.logoSub}>Live 1-on-1 Tutoring Platform</div>
          </div>
        </div>

        <div style={styles.roleToggle}>
          {["teacher", "student"].map(r => (
            <button key={r} type="button" onClick={() => setRole(r)}
              style={{ ...styles.roleBtn, ...(role === r ? styles.roleBtnActive : {}) }}>
              {r === "teacher" ? "👩‍🏫 Teacher" : "🎓 Student"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          {isNew && (
            <input style={styles.input} type="text" placeholder="Full Name"
              value={name} onChange={e => setName(e.target.value)} required />
          )}
          <input style={styles.input} type="email" placeholder="Email"
            value={email} onChange={e => setEmail(e.target.value)} required />
          <input style={styles.input} type="password" placeholder="Password"
            value={password} onChange={e => setPassword(e.target.value)} required />

          {error && <p style={styles.error}>{error}</p>}

          <button style={styles.submitBtn} type="submit">
            {isNew ? "Create Account" : "Sign In"}
          </button>

          <p style={styles.toggle} onClick={() => setIsNew(!isNew)}>
            {isNew ? "Already have an account? Sign in" : `New ${role}? Create account`}
          </p>

          {/* Test login buttons — dev only */}
          {process.env.NODE_ENV === "development" && (
            <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.1)", textAlign: "center", display: "flex", gap: 10 }}>
              <button type="button" onClick={() => handleTestLogin("admin")} style={{ ...styles.testBtn, background: "rgba(239, 68, 68, 0.2)", color: "#fca5a5", border: "1px solid rgba(239, 68, 68, 0.4)", flex: 1, padding: "10px 8px" }}>🛡️ Admin</button>
              <button type="button" onClick={() => handleTestLogin("teacher")} style={{ ...styles.testBtn, flex: 1, padding: "10px 8px" }}>🧪 Teacher</button>
              <button type="button" onClick={() => handleTestLogin("student")} style={{ ...styles.testBtn, background: "rgba(59, 130, 246, 0.2)", color: "#93c5fd", border: "1px solid rgba(59, 130, 246, 0.4)", flex: 1, padding: "10px 8px" }}>🎓 Student</button>
            </div>
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
  testBtn: { padding: "10px 16px", borderRadius: 8, background: "rgba(16, 185, 129, 0.2)", color: "#34d399", fontWeight: 600, fontSize: 14, border: "1px solid rgba(16, 185, 129, 0.4)", cursor: "pointer", width: "100%" },
  toggle: { textAlign: "center", color: "#64748b", fontSize: 13, cursor: "pointer", margin: 0 }
};