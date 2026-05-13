import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { satCurriculum } from "../data/satCurriculum";

export default function HomeworkManager({ user }) {
  const [students, setStudents] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const navigate = useNavigate();

  // Create Assignment State
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch students assigned to this teacher (or all students if no explicit linking yet)
        const qStudents = query(collection(db, "USERS"), where("role", "==", "student"));
        const studentSnap = await getDocs(qStudents);
        const stList = studentSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        setStudents(stList);

        // Fetch assignments created by this teacher
        const qAssign = query(collection(db, "ASSIGNMENTS"), where("teacherId", "==", user.uid));
        const assignSnap = await getDocs(qAssign);
        const asList = assignSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        setAssignments(asList);
      } catch (err) {
        console.error("Error fetching homework data:", err);
      }
      setLoading(false);
    };
    fetchData();
  }, [user.uid]);

  const handleCreateAssignment = async (e) => {
    e.preventDefault();
    if (!selectedStudent || !selectedChapter) return;

    const assignmentId = Math.random().toString(36).substr(2, 9);
    const newAssignment = {
      assignmentId,
      teacherId: user.uid,
      studentId: selectedStudent,
      chapterId: selectedChapter,
      status: "pending",
      answers: {},
      createdAt: serverTimestamp()
    };

    await setDoc(doc(db, "ASSIGNMENTS", assignmentId), newAssignment);
    setAssignments([...assignments, newAssignment]);
    setShowCreate(false);
    setSelectedStudent("");
    setSelectedChapter("");
  };

  if (loading) return <div style={styles.center}>Loading...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={() => navigate("/teacher")} style={styles.backBtn}>← Back to Dashboard</button>
        <h2 style={{ color: "white", margin: 0 }}>Manage Homework</h2>
        <button onClick={() => setShowCreate(true)} style={styles.createBtn}>+ New Assignment</button>
      </div>

      <div style={styles.content}>
        {showCreate && (
          <form onSubmit={handleCreateAssignment} style={styles.createCard}>
            <h3>Assign Homework</h3>
            <div style={styles.formGroup}>
              <label>Select Student</label>
              <select value={selectedStudent} onChange={e => setSelectedStudent(e.target.value)} required style={styles.input}>
                <option value="">-- Choose a student --</option>
                {students.map(s => (
                  <option key={s.id} value={s.id}>{s.name || s.email}</option>
                ))}
              </select>
            </div>
            <div style={styles.formGroup}>
              <label>Select Topic</label>
              <select value={selectedChapter} onChange={e => setSelectedChapter(e.target.value)} required style={styles.input}>
                <option value="">-- Choose a topic --</option>
                {satCurriculum.chapters.map(c => (
                  <option key={c.id} value={c.title}>{c.title}</option>
                ))}
              </select>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <button type="submit" style={styles.submitBtn}>Assign</button>
              <button type="button" onClick={() => setShowCreate(false)} style={styles.cancelBtn}>Cancel</button>
            </div>
          </form>
        )}

        <div style={styles.list}>
          <h3 style={{ color: "white", marginBottom: 16 }}>Assigned Homework</h3>
          {assignments.length === 0 ? (
            <p style={{ color: "#94a3b8" }}>No homework assignments created yet.</p>
          ) : (
            <div style={styles.grid}>
              {assignments.map(a => {
                const student = students.find(s => s.id === a.studentId);
                return (
                  <div key={a.id || a.assignmentId} style={styles.card}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                      <span style={{ fontWeight: 600, color: "white" }}>{a.chapterId}</span>
                      <span style={{ fontSize: 12, padding: "4px 8px", borderRadius: 12, background: a.status === "completed" ? "rgba(34,197,94,0.2)" : "rgba(234,179,8,0.2)", color: a.status === "completed" ? "#4ade80" : "#fcd34d" }}>
                        {a.status}
                      </span>
                    </div>
                    <div style={{ color: "#94a3b8", fontSize: 14 }}>Student: {student ? (student.name || student.email) : a.studentId}</div>
                    <div style={{ color: "#64748b", fontSize: 12, marginTop: 8 }}>ID: {a.assignmentId}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  center: { minHeight: "100vh", background: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontFamily: "'Segoe UI', sans-serif" },
  container: { minHeight: "100vh", background: "#0f172a", fontFamily: "'Segoe UI', sans-serif" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 40px", borderBottom: "1px solid #1e293b", background: "#0f172a" },
  content: { padding: "40px", maxWidth: 1200, margin: "0 auto" },
  backBtn: { background: "transparent", border: "1px solid #334155", color: "#cbd5e1", padding: "8px 16px", borderRadius: 8, cursor: "pointer" },
  createBtn: { background: "#6366f1", color: "white", border: "none", padding: "10px 20px", borderRadius: 8, cursor: "pointer", fontWeight: 600 },
  createCard: { background: "#1e293b", padding: 32, borderRadius: 16, marginBottom: 40, border: "1px solid #334155", color: "white" },
  formGroup: { display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 },
  input: { padding: 12, borderRadius: 8, background: "#0f172a", border: "1px solid #334155", color: "white", fontSize: 15 },
  submitBtn: { background: "#10b981", color: "white", border: "none", padding: "10px 20px", borderRadius: 8, cursor: "pointer", fontWeight: 600 },
  cancelBtn: { background: "transparent", border: "1px solid #334155", color: "#cbd5e1", padding: "10px 20px", borderRadius: 8, cursor: "pointer" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 },
  card: { background: "#1e293b", padding: 20, borderRadius: 12, border: "1px solid #334155" }
};