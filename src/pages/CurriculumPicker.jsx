import { useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function CurriculumPicker({ user, onSelect }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSelect = async (curriculum) => {
    if (curriculum === "igcse") {
      setLoading(true);
      try {
        const snap = await getDocs(collection(db, "curricula", "igcse", "chapters"));
        const chapters = snap.docs.map(d => ({ id: d.id, ...d.data() }))
          .sort((a, b) => a.title?.localeCompare(b.title));
        onSelect(curriculum, chapters);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    } else {
      onSelect(curriculum, null);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.logoRow}>
          <div style={styles.logoIcon}>CF</div>
          <div>
            <div style={styles.logoName}>ClassFlow</div>
            <div style={styles.logoSub}>Welcome back, {user.email}</div>
          </div>
        </div>

        <h2 style={styles.heading}>Select Curriculum</h2>
        <p style={styles.sub}>Which course are you teaching today?</p>

        <div style={styles.options}>
          <button onClick={() => handleSelect("igcse")} style={styles.optionCard} disabled={loading}>
            <div style={styles.optionIcon}>📚</div>
            <div style={styles.optionTitle}>AS Level — Edexcel {loading && <span style={{ fontSize: 12, color: "#818cf8" }}>Loading…</span>}</div>
            <div style={styles.optionDesc}>Pure Mathematics • Statistics • Mechanics</div>
            <div style={styles.optionMeta}>A-Level Edexcel • From Firestore</div>
          </button>

          {/* SAT hidden for now
          <button onClick={() => handleSelect("sat")} style={styles.optionCard} disabled={loading}>
            <div style={styles.optionIcon}>📐</div>
            <div style={styles.optionTitle}>SAT Math</div>
            <div style={styles.optionDesc}>Digital SAT • Geometry & Algebra • Trigonometry</div>
            <div style={styles.optionMeta}>Math + Verbal • 8 chapters • From Supabase</div>
          </button>
          */}

          <button onClick={() => navigate("/homework")} style={{ ...styles.optionCard, background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)" }} disabled={loading}>
            <div style={styles.optionIcon}>📝</div>
            <div style={styles.optionTitle}>Manage Homework</div>
            <div style={styles.optionDesc}>Assign and track async homework assignments</div>
            <div style={styles.optionMeta}>Independent of live sessions</div>
          </button>
        </div>

        <p style={styles.signout} onClick={() => signOut(auth)}>Sign out</p>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: "100vh", background: "linear-gradient(135deg, #0a0f1e 0%, #0d2137 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Segoe UI', sans-serif" },
  card: { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 24, padding: "40px 48px", width: 560, color: "white" },
  logoRow: { display: "flex", alignItems: "center", gap: 14, marginBottom: 32 },
  logoIcon: { width: 48, height: 48, borderRadius: 12, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 16, color: "white" },
  logoName: { fontSize: 22, fontWeight: 800, color: "white" },
  logoSub: { fontSize: 12, color: "#64748b", marginTop: 2 },
  heading: { fontSize: 22, fontWeight: 700, marginBottom: 8 },
  sub: { color: "#64748b", fontSize: 14, marginBottom: 28 },
  options: { display: "flex", flexDirection: "column", gap: 16 },
  optionCard: { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: "20px 24px", textAlign: "left", cursor: "pointer", color: "white", transition: "all 0.2s", width: "100%" },
  optionIcon: { fontSize: 28, marginBottom: 8 },
  optionTitle: { fontSize: 18, fontWeight: 700, marginBottom: 4 },
  optionDesc: { fontSize: 13, color: "#94a3b8", marginBottom: 6 },
  optionMeta: { fontSize: 12, color: "#475569" },
  loadingBadge: { marginTop: 8, fontSize: 12, color: "#818cf8" },
  signout: { textAlign: "center", color: "#475569", fontSize: 13, cursor: "pointer", marginTop: 24 }
};