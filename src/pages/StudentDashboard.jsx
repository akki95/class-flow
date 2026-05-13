import { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

export default function StudentDashboard({ user }) {
  const [userData, setUserData] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      if (!user) return;
      
      // Fetch user doc
      const userDoc = await getDoc(doc(db, "USERS", user.uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data());
      }

      // Fetch sessions (both past and active)
      const qSess = query(collection(db, "sessions"), where("studentId", "==", user.uid));
      const sessSnap = await getDocs(qSess);
      const sessionList = [];
      sessSnap.forEach((doc) => {
        sessionList.push({ id: doc.id, ...doc.data() });
      });
      setSessions(sessionList);

      // Fetch assignments
      const qAssign = query(collection(db, "ASSIGNMENTS"), where("studentId", "==", user.uid));
      const assignSnap = await getDocs(qAssign);
      const assignList = [];
      assignSnap.forEach((doc) => {
        assignList.push({ id: doc.id, ...doc.data() });
      });
      setAssignments(assignList);

      setLoading(false);
    }
    fetchData();
  }, [user]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const joinSession = (sessionId) => {
    navigate(`/student/${sessionId}`);
  };

  if (loading) return <div style={styles.loading}>Loading Dashboard...</div>;

  const activeSessions = sessions.filter(s => s.status === "active");
  const pastSessions = sessions.filter(s => s.status === "ended");

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h2>Welcome, {userData?.name || "Student"}</h2>
        <button style={styles.logoutBtn} onClick={handleLogout}>Logout</button>
      </header>
      
      <div style={styles.content}>
        <section style={styles.section}>
          <h3>Active Sessions</h3>
          {activeSessions.length === 0 ? (
            <p style={styles.emptyText}>No active sessions right now.</p>
          ) : (
            <div style={styles.grid}>
              {activeSessions.map(session => (
                <div key={session.id} style={styles.card}>
                  <h4>Topic: {session.chapter}</h4>
                  <p style={{ color: "#94a3b8", fontSize: 13 }}>ID: {session.id}</p>
                  <button style={styles.joinBtn} onClick={() => joinSession(session.id)}>
                    Join Session
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        <section style={styles.section}>
          <h3>Homework Assignments</h3>
          {assignments.length === 0 ? (
            <p style={styles.emptyText}>No homework assignments pending.</p>
          ) : (
            <div style={styles.grid}>
              {assignments.map(a => (
                <div key={a.id} style={styles.card}>
                  <h4>{a.chapterId}</h4>
                  <div style={{ fontSize: 12, padding: "4px 8px", borderRadius: 12, display: "inline-block", background: a.status === "completed" ? "rgba(34,197,94,0.2)" : "rgba(234,179,8,0.2)", color: a.status === "completed" ? "#4ade80" : "#fcd34d", marginTop: 8 }}>
                    {a.status}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section style={styles.section}>
          <h3>Past Lessons & Notes</h3>
          {pastSessions.length === 0 ? (
            <p style={styles.emptyText}>No past lessons yet.</p>
          ) : (
            <div style={styles.grid}>
              {pastSessions.map(session => (
                <div key={session.id} style={styles.card}>
                  <h4>Topic: {session.chapter}</h4>
                  <p style={{ color: "#94a3b8", fontSize: 13 }}>Status: {session.status}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: "100vh", background: "#0a0f1e", color: "white", fontFamily: "'Segoe UI', sans-serif" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 40px", background: "rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.1)" },
  logoutBtn: { padding: "8px 16px", borderRadius: 8, background: "#ef4444", color: "white", border: "none", cursor: "pointer", fontWeight: 600 },
  content: { padding: "40px", maxWidth: 1200, margin: "0 auto" },
  section: { marginBottom: 40 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20, marginTop: 16 },
  card: { background: "rgba(255,255,255,0.05)", padding: 24, borderRadius: 16, border: "1px solid rgba(255,255,255,0.1)" },
  joinBtn: { marginTop: 16, padding: "10px", width: "100%", borderRadius: 8, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "white", border: "none", cursor: "pointer", fontWeight: 600 },
  emptyText: { color: "#94a3b8", marginTop: 16 },
  loading: { display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: "#0a0f1e", color: "white" }
};