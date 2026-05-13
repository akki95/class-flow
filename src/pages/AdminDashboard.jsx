import { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { signOut } from "firebase/auth";

const ADMIN_EMAIL = "akash95agrawal@gmail.com";
const TEST_ADMIN_EMAIL = "admin@classflow.com";

export default function AdminDashboard({ user }) {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const snap = await getDocs(query(collection(db, "sessions"), orderBy("createdAt", "desc")));
      setSessions(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    };
    load();
  }, []);

  if (user?.email !== ADMIN_EMAIL && user?.email !== TEST_ADMIN_EMAIL) {
    return (
      <div style={s.center}>
        <div style={{ color: "#ef4444", fontSize: 18, fontWeight: 600 }}>Access Denied</div>
        <p style={{ color: "#64748b", marginTop: 8 }}>This page is restricted.</p>
        <p style={{ color: "#94a3b8", fontSize: 12, marginTop: 4 }}>Logged in as: {user?.email}</p>
      </div>
    );
  }

  const totalSessions = sessions.length;
  const activeSessions = sessions.filter(s => s.status === "active").length;
  const endedSessions = sessions.filter(s => s.status === "ended").length;

  const chapterCount = {};
  sessions.forEach(s => {
    const key = `${s.curriculum?.toUpperCase() || "SAT"} — ${s.chapter || "unknown"}`;
    chapterCount[key] = (chapterCount[key] || 0) + 1;
  });
  const topChapters = Object.entries(chapterCount).sort((a, b) => b[1] - a[1]).slice(0, 8);

  const satCount = sessions.filter(s => s.curriculum === "sat" || !s.curriculum).length;
  const igcseCount = sessions.filter(s => s.curriculum === "igcse").length;

  const teacherCount = {};
  sessions.forEach(s => {
    if (s.teacherId) teacherCount[s.teacherId] = (teacherCount[s.teacherId] || 0) + 1;
  });
  const uniqueTeachers = Object.keys(teacherCount).length;

  if (loading) return (
    <div style={s.center}>
      <div style={s.cfBadge}>CF</div>
      <div style={{ color: "#0f172a", marginTop: 12, fontWeight: 600 }}>Loading analytics...</div>
    </div>
  );

  return (
    <div style={s.shell}>
      <div style={s.header}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={s.cfBadge}>CF</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#0f172a" }}>ClassFlow Admin</div>
            <div style={{ fontSize: 12, color: "#94a3b8" }}>Usage Analytics</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => window.location.href = "/admin/theory"}
            style={{ padding: "7px 16px", background: "#f0fdf4", color: "#166534", border: "1px solid #bbf7d0", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
            📚 AI Theory Curation
          </button>
          <button onClick={() => signOut(auth)}
            style={{ padding: "7px 16px", background: "#fef2f2", color: "#ef4444", border: "1px solid #fecaca", borderRadius: 8, cursor: "pointer", fontSize: 13 }}>
            Sign Out
          </button>
        </div>
      </div>

      <div style={s.body}>
        <div style={s.statsRow}>
          {[
            { label: "Total Sessions", value: totalSessions, icon: "📊", color: "#6366f1" },
            { label: "Completed", value: endedSessions, icon: "✅", color: "#22c55e" },
            { label: "Active Now", value: activeSessions, icon: "🟢", color: "#f59e0b" },
            { label: "Unique Teachers", value: uniqueTeachers, icon: "👩‍🏫", color: "#8b5cf6" },
          ].map((stat, i) => (
            <div key={i} style={s.statCard}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{stat.icon}</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
          <div style={s.card}>
            <div style={s.cardTitle}>📚 Most Used Chapters</div>
            {topChapters.length === 0 ? (
              <p style={{ color: "#94a3b8", fontSize: 13 }}>No data yet</p>
            ) : (
              topChapters.map(([chapter, count], i) => (
                <div key={i} style={{ marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 13, color: "#0f172a", fontWeight: 500 }}>
                      {chapter.length > 35 ? chapter.slice(0, 35) + "..." : chapter}
                    </span>
                    <span style={{ fontSize: 13, color: "#6366f1", fontWeight: 700 }}>{count}</span>
                  </div>
                  <div style={{ height: 4, background: "#f1f5f9", borderRadius: 2 }}>
                    <div style={{ height: "100%", width: `${(count / topChapters[0][1]) * 100}%`, background: "#6366f1", borderRadius: 2 }} />
                  </div>
                </div>
              ))
            )}
          </div>

          <div style={s.card}>
            <div style={s.cardTitle}>🎓 Curriculum Split</div>
            {[
              { label: "SAT Math & Verbal", count: satCount, color: "#6366f1" },
              { label: "IGCSE AS Maths", count: igcseCount, color: "#22c55e" },
            ].map((item, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 13, color: "#0f172a", fontWeight: 500 }}>{item.label}</span>
                  <span style={{ fontSize: 13, color: item.color, fontWeight: 700 }}>
                    {item.count} ({totalSessions ? Math.round((item.count / totalSessions) * 100) : 0}%)
                  </span>
                </div>
                <div style={{ height: 8, background: "#f1f5f9", borderRadius: 4 }}>
                  <div style={{ height: "100%", width: `${totalSessions ? (item.count / totalSessions) * 100 : 0}%`, background: item.color, borderRadius: 4 }} />
                </div>
              </div>
            ))}

            <div style={{ marginTop: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Teacher Breakdown</div>
              {Object.entries(teacherCount).map(([id, count], i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px", background: "#f8fafc", borderRadius: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 12, color: "#64748b" }}>Teacher {i + 1}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#0f172a" }}>{count} sessions</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={s.card}>
          <div style={s.cardTitle}>🕐 Recent Sessions</div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["Session ID", "Curriculum", "Chapter", "Status", "Date"].map(h => (
                  <th key={h} style={{ textAlign: "left", padding: "8px 12px", fontSize: 11, color: "#94a3b8", fontWeight: 700, textTransform: "uppercase", borderBottom: "1px solid #f1f5f9" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sessions.slice(0, 15).map((sess, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #f8fafc" }}>
                  <td style={{ padding: "10px 12px", fontSize: 13, color: "#6366f1", fontWeight: 700 }}>{sess.id}</td>
                  <td style={{ padding: "10px 12px", fontSize: 13, color: "#0f172a" }}>{sess.curriculum?.toUpperCase() || "SAT"}</td>
                  <td style={{ padding: "10px 12px", fontSize: 13, color: "#0f172a" }}>{sess.chapter || "—"}</td>
                  <td style={{ padding: "10px 12px" }}>
                    <span style={{ padding: "2px 8px", borderRadius: 12, fontSize: 11, fontWeight: 600, background: sess.status === "ended" ? "#f0fdf4" : "#fef9c3", color: sess.status === "ended" ? "#166534" : "#854d0e" }}>
                      {sess.status || "active"}
                    </span>
                  </td>
                  <td style={{ padding: "10px 12px", fontSize: 12, color: "#94a3b8" }}>
                    {sess.createdAt?.toDate?.()?.toLocaleDateString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const s = {
  center: { minHeight: "100vh", background: "#f8fafc", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', 'Segoe UI', sans-serif" },
  cfBadge: { width: 40, height: 40, borderRadius: 10, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14, color: "white" },
  shell: { minHeight: "100vh", background: "#f8fafc", fontFamily: "'Inter', 'Segoe UI', sans-serif" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 32px", background: "white", borderBottom: "1px solid #f1f5f9", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" },
  body: { padding: "28px 32px", maxWidth: 1100, margin: "0 auto" },
  statsRow: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 20 },
  statCard: { background: "white", borderRadius: 14, padding: "20px 16px", textAlign: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #f1f5f9" },
  card: { background: "white", borderRadius: 14, padding: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #f1f5f9", marginBottom: 20 },
  cardTitle: { fontSize: 14, fontWeight: 700, color: "#0f172a", marginBottom: 16 },
};