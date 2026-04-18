import { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useParams } from "react-router-dom";
import StudentView from "./StudentView";
import IGCSEStudentView from "./IGCSEStudentView";
import SATStudentView from "./SATStudentView";

export default function SmartStudentView() {
  const { sessionId } = useParams();
  const [curriculum, setCurriculum] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "sessions", sessionId), snap => {
      const data = snap.data();
      if (data) {
        setCurriculum(data.curriculum || "sat_trig");
        setLoading(false);
      }
    });
    return unsub;
  }, [sessionId]);

  if (loading) return (
    <div style={{ minHeight: "100vh", background: "#0a0f1e", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Segoe UI', sans-serif" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: 44, height: 44, borderRadius: 10, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "white", margin: "0 auto 16px", fontSize: 16 }}>CF</div>
        <div style={{ color: "white" }}>Joining session...</div>
      </div>
    </div>
  );

  if (curriculum === "igcse") return <IGCSEStudentView />;
  if (curriculum === "sat") return <SATStudentView />;
  return <StudentView />; // fallback for old sat_trig sessions
}