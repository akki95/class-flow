import { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { createClient } from "@supabase/supabase-js";
import { useNavigate, Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useTheme } from "../context/ThemeContext";
import { ThemeToggle } from "../context/ThemeContext";
import Navbar from "../components/Navbar";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

export default function StudentDashboard({ user }) {
  const { T } = useTheme();
  const navigate = useNavigate();

  const [userData, setUserData]     = useState(null);
  const [sessions, setSessions]     = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [diagnostics, setDiagnostics] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [activeTab, setActiveTab]   = useState("overview");

  useEffect(() => {
    if (!user) return;
    async function fetchData() {
      // Firebase data
      const [userSnap, sessSnap, assignSnap] = await Promise.all([
        getDoc(doc(db, "USERS", user.uid)),
        getDocs(query(collection(db, "sessions"), where("studentId", "==", user.uid))),
        getDocs(query(collection(db, "ASSIGNMENTS"), where("studentId", "==", user.uid))),
      ]);
      if (userSnap.exists()) setUserData(userSnap.data());
      setSessions(sessSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      setAssignments(assignSnap.docs.map(d => ({ id: d.id, ...d.data() })));

      // Supabase diagnostic history — by email match on users table
      const { data: diagData } = await supabase
        .from("test_attempts")
        .select("id,raw_score,math_score,verbal_score,predicted_range,score_ceiling,created_at")
        .order("created_at", { ascending: false })
        .limit(10);
      setDiagnostics(diagData || []);

      setLoading(false);
    }
    fetchData();
  }, [user]);

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: T.dark }}>
      <div style={{ color: T.sub }}>Loading…</div>
    </div>
  );

  const activeSessions = sessions.filter(s => s.status === "active");
  const pastSessions   = sessions.filter(s => s.status === "ended");

  const bestDiag = diagnostics.reduce((best, d) => {
    if (!d.raw_score) return best;
    return (!best || d.raw_score > best.raw_score) ? d : best;
  }, null);

  const TABS = [
    { id: "overview",    label: "Overview" },
    { id: "diagnostics", label: `Diagnostics (${diagnostics.length})` },
    { id: "sessions",    label: `Sessions (${sessions.length})` },
    { id: "homework",    label: `Homework (${assignments.length})` },
  ];

  return (
    <div style={{ background: T.dark, minHeight: "100vh", fontFamily: "'Inter','Segoe UI',sans-serif" }}>
      <Navbar user={user} />

      <div style={{ maxWidth: 1060, margin: "0 auto", padding: "32px 24px 64px" }}>

        {/* Welcome header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 900, color: T.text, margin: 0 }}>
              Welcome back{userData?.name ? `, ${userData.name.split(" ")[0]}` : ""}
            </h1>
            <p style={{ fontSize: 14, color: T.sub, margin: "4px 0 0" }}>{user?.email}</p>
          </div>
          <button onClick={() => signOut(auth).then(() => navigate("/"))} style={{ padding: "7px 16px", borderRadius: 8, background: "rgba(239,68,68,0.08)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)", cursor: "pointer", fontSize: 13 }}>
            Sign Out
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, borderBottom: `1px solid ${T.border}`, marginBottom: 24 }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
              padding: "9px 16px", background: "none", border: "none", cursor: "pointer",
              fontSize: 14, fontWeight: activeTab === t.id ? 700 : 400,
              color: activeTab === t.id ? T.green : T.sub,
              borderBottom: `2px solid ${activeTab === t.id ? T.green : "transparent"}`,
              marginBottom: -1,
            }}>{t.label}</button>
          ))}
        </div>

        {/* ── OVERVIEW ── */}
        {activeTab === "overview" && (
          <>
            {/* Stats row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 14, marginBottom: 24 }}>
              {[
                { label: "Diagnostics taken", value: diagnostics.length, color: "#6366f1" },
                { label: "Best score",         value: bestDiag ? `${bestDiag.raw_score}/12` : "—", color: "#1aa38a" },
                { label: "Score ceiling",      value: bestDiag?.score_ceiling || "—", color: "#f59e0b" },
                { label: "Sessions attended",  value: pastSessions.length, color: "#8b5cf6" },
              ].map((s, i) => (
                <div key={i} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: "16px 18px", textAlign: "center" }}>
                  <div style={{ fontSize: 24, fontWeight: 900, color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: T.muted, marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Quick actions */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>
              <Link to="/diagnostic/sat" style={{ textDecoration: "none" }}>
                <div style={{ background: "linear-gradient(135deg,#6366f1,#4f46e5)", borderRadius: 14, padding: "20px 24px", cursor: "pointer" }}>
                  <div style={{ fontSize: 20, marginBottom: 8 }}>🎯</div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: "white" }}>Take SAT Diagnostic</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", marginTop: 4 }}>12 questions · AI report · 15 minutes</div>
                </div>
              </Link>
              <Link to="/sat" style={{ textDecoration: "none" }}>
                <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: "20px 24px", cursor: "pointer" }}>
                  <div style={{ fontSize: 20, marginBottom: 8 }}>📚</div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: T.text }}>Browse Lessons</div>
                  <div style={{ fontSize: 13, color: T.sub, marginTop: 4 }}>SAT · IGCSE · A-Level</div>
                </div>
              </Link>
            </div>

            {/* Active sessions */}
            {activeSessions.length > 0 && (
              <div style={{ background: T.card, border: `2px solid ${T.green}`, borderRadius: 14, padding: 20, marginBottom: 16 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: T.green, marginBottom: 14 }}>🟢 Active Sessions</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {activeSessions.map(s => (
                    <div key={s.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", background: T.greenBg, borderRadius: 10, border: `1px solid ${T.greenBorder}` }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: T.text }}>{s.chapter || "Session"}</div>
                        <div style={{ fontSize: 12, color: T.muted }}>{s.curriculum?.toUpperCase() || "SAT"}</div>
                      </div>
                      <button onClick={() => navigate(`/student/${s.id}`)} style={{ padding: "7px 16px", borderRadius: 8, background: T.green, color: "white", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 700 }}>
                        Join →
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent diagnostic */}
            {diagnostics.length > 0 && (
              <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: 20 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 14 }}>📊 Latest Diagnostic</div>
                {(() => {
                  const d = diagnostics[0];
                  return (
                    <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 28, fontWeight: 900, color: T.text }}>{d.predicted_range || `${d.raw_score}/12`}</div>
                        <div style={{ fontSize: 13, color: T.sub }}>Predicted range · Ceiling: {d.score_ceiling || "—"}</div>
                        <div style={{ fontSize: 12, color: T.muted, marginTop: 4 }}>{new Date(d.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</div>
                      </div>
                      <Link to={`/diagnostic/report/${d.id}`} style={{ padding: "9px 20px", borderRadius: 10, background: T.greenBg, border: `1px solid ${T.greenBorder}`, color: T.green, textDecoration: "none", fontSize: 14, fontWeight: 700 }}>
                        View Report →
                      </Link>
                    </div>
                  );
                })()}
              </div>
            )}
          </>
        )}

        {/* ── DIAGNOSTICS ── */}
        {activeTab === "diagnostics" && (
          <>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
              <Link to="/diagnostic/sat" style={{ padding: "9px 20px", borderRadius: 10, background: "linear-gradient(135deg,#6366f1,#4f46e5)", color: "white", textDecoration: "none", fontSize: 14, fontWeight: 700 }}>
                Take New Diagnostic →
              </Link>
            </div>
            {diagnostics.length === 0 ? (
              <div style={{ textAlign: "center", padding: "48px 0", color: T.sub }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>📋</div>
                <p>No diagnostics yet. <Link to="/diagnostic/sat" style={{ color: T.green }}>Take your first one →</Link></p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {diagnostics.map((d, i) => (
                  <div key={d.id} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: "14px 18px", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                    <div style={{ width: 44, height: 44, borderRadius: 10, background: i === 0 ? "linear-gradient(135deg,#6366f1,#4f46e5)" : T.surface, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontSize: 13, fontWeight: 900, color: i === 0 ? "white" : T.muted }}>#{i + 1}</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 16, fontWeight: 800, color: T.text }}>{d.predicted_range || `${d.raw_score}/12 questions`}</div>
                      <div style={{ fontSize: 12, color: T.muted, marginTop: 2 }}>
                        Math {d.math_score ?? "—"} · Verbal {d.verbal_score ?? "—"} · Ceiling {d.score_ceiling || "—"} · {new Date(d.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                      </div>
                    </div>
                    <Link to={`/diagnostic/report/${d.id}`} style={{ padding: "7px 16px", borderRadius: 8, background: T.greenBg, border: `1px solid ${T.greenBorder}`, color: T.green, textDecoration: "none", fontSize: 13, fontWeight: 700 }}>
                      View Report
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ── SESSIONS ── */}
        {activeTab === "sessions" && (
          sessions.length === 0 ? (
            <div style={{ textAlign: "center", padding: "48px 0", color: T.sub }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>📖</div>
              <p>No sessions yet. Your teacher will invite you to a session.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {sessions.map(sess => (
                <div key={sess.id} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: "14px 18px", display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: T.text }}>{sess.chapter || "Session"}</div>
                    <div style={{ fontSize: 12, color: T.muted }}>{sess.curriculum?.toUpperCase() || "SAT"} · {sess.id.slice(0, 8)}</div>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 12, background: sess.status === "active" ? T.greenBg : T.surface, color: sess.status === "active" ? T.green : T.muted, border: `1px solid ${sess.status === "active" ? T.greenBorder : T.border}` }}>
                    {sess.status || "ended"}
                  </span>
                  {sess.status === "active" && (
                    <button onClick={() => navigate(`/student/${sess.id}`)} style={{ padding: "7px 14px", borderRadius: 8, background: T.green, color: "white", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 700 }}>
                      Join
                    </button>
                  )}
                </div>
              ))}
            </div>
          )
        )}

        {/* ── HOMEWORK ── */}
        {activeTab === "homework" && (
          assignments.length === 0 ? (
            <div style={{ textAlign: "center", padding: "48px 0", color: T.sub }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>📝</div>
              <p>No homework assignments yet.</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
              {assignments.map(a => (
                <div key={a.id} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: 18 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: T.text, marginBottom: 8 }}>{a.chapterId}</div>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 12, background: a.status === "completed" ? T.greenBg : "rgba(245,158,11,0.1)", color: a.status === "completed" ? T.green : "#f59e0b", border: `1px solid ${a.status === "completed" ? T.greenBorder : "rgba(245,158,11,0.3)"}` }}>
                    {a.status}
                  </span>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}
