import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import Login from "./pages/Login";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentView from "./pages/StudentView";
import IGCSEStudentView from "./pages/IGCSEStudentView";
import CurriculumPicker from "./pages/CurriculumPicker";
import IGCSEChapterPicker from "./pages/IGCSEChapterPicker";
import IGCSETeacherDashboard from "./pages/IGCSETeacherDashboard";
import SATChapterPicker from "./pages/SATChapterPicker";
import SATTeacherDashboard from "./pages/SATTeacherDashboard";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [curriculum, setCurriculum] = useState(null);
  const [igcseChapters, setIgcseChapters] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
  }, []);

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: "#0a0f1e", color: "white", fontSize: "1.1rem", fontFamily: "'Segoe UI', sans-serif" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: 48, height: 48, borderRadius: 12, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 18, color: "white", margin: "0 auto 16px" }}>CF</div>
        <div>Loading ClassFlow...</div>
      </div>
    </div>
  );

  const handleCurriculumSelect = (c, chapters) => {
    setCurriculum(c);
    if (chapters) setIgcseChapters(chapters);
  };

  const handleChapterSelect = (chapter) => setSelectedChapter(chapter);

  const handleBack = () => {
    setSelectedChapter(null);
    setCurriculum(null);
  };

  const renderTeacherFlow = () => {
   if (!curriculum) {
    return <CurriculumPicker user={user} onSelect={handleCurriculumSelect} />;
   }
   if (curriculum === "sat") {
    if (!selectedChapter) {
      return <SATChapterPicker onSelect={handleChapterSelect} onBack={() => setCurriculum(null)} />;
    }
    return <SATTeacherDashboard user={user} chapter={selectedChapter} onBack={handleBack} />;
   }
   if (curriculum === "igcse") {
    if (!selectedChapter) {
      return <IGCSEChapterPicker chapters={igcseChapters || []} onSelect={handleChapterSelect} onBack={() => setCurriculum(null)} />;
    }
    return <IGCSETeacherDashboard user={user} chapter={selectedChapter} onBack={handleBack} />;
   }
};

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/teacher" /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/teacher" element={user ? renderTeacherFlow() : <Navigate to="/login" />} />
        <Route path="/student/:sessionId" element={<StudentView />} />
        <Route path="/igcse-student/:sessionId" element={<IGCSEStudentView />} />
      </Routes>
    </Router>
  );
}