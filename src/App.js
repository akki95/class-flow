import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Login from "./pages/Login";
import SmartStudentView from "./pages/SmartStudentView";
import IGCSEStudentView from "./pages/IGCSEStudentView";
import CurriculumPicker from "./pages/CurriculumPicker";
import IGCSEChapterPicker from "./pages/IGCSEChapterPicker";
import IGCSETeacherDashboard from "./pages/IGCSETeacherDashboard";
import SATChapterPicker from "./pages/SATChapterPicker";
import SATTeacherDashboard from "./pages/SATTeacherDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminTheoryDashboard from "./pages/AdminTheoryDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import HomeworkManager from "./pages/HomeworkManager";
import SequencesFlow from "./pages/SequencesFlow";
import { ThemeProvider } from "./context/ThemeContext";
import FeedbackWidget from "./components/FeedbackWidget";
import PureMathsHome from "./pages/PureMathsHome";
import StatsHome from "./pages/StatsHome";
import MechanicsHome from "./pages/MechanicsHome";
import Demo from "./pages/Demo";

export default function App() {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [curriculum, setCurriculum] = useState(null);
  const [igcseChapters, setIgcseChapters] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);

  useEffect(() => {
    return onAuthStateChanged(auth, async (u) => {
      if (u) {
        setUser(u);
        try {
          const userDoc = await getDoc(doc(db, "USERS", u.uid));
          if (userDoc.exists()) {
            setUserRole(userDoc.data().role);
          } else {
            setUserRole("teacher"); // Fallback
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
          setUserRole("teacher");
        }
      } else {
        setUser(null);
        setUserRole(null);
      }
      setLoading(false);
    });
  }, []);

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: "#f7f4ef", color: "#1c2b3a", fontSize: "1.1rem", fontFamily: "'Segoe UI', sans-serif" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: 48, height: 48, borderRadius: 12, background: "linear-gradient(135deg, #1aa38a, #0d8f77)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 18, color: "white", margin: "0 auto 16px" }}>CF</div>
        <div>Loading ClassFlow...</div>
      </div>
    </div>
  );

  const handleCurriculumSelect = (c, chapters) => {
    setCurriculum(c);
    if (chapters) setIgcseChapters(chapters);
  };

  const handleChapterSelect = (chapter, parentChapter = null) => {
    if (parentChapter) {
      // In SAT, onSelect passes (lesson, chapter)
      setSelectedLesson(chapter);
      setSelectedChapter(parentChapter);
    } else {
      setSelectedChapter(chapter);
    }
  };

  const handleBack = () => {
    setSelectedChapter(null);
    setSelectedLesson(null);
    setCurriculum(null);
  };

  const renderTeacherFlow = () => {
   if (!curriculum) {
    return <CurriculumPicker user={user} onSelect={handleCurriculumSelect} />;
   }
   if (curriculum === "sat") {
    if (!selectedLesson) {
      return <SATChapterPicker onSelect={handleChapterSelect} onBack={() => setCurriculum(null)} />;
    }
    return <SATTeacherDashboard user={user} chapter={selectedChapter} lesson={selectedLesson} onBack={() => setSelectedLesson(null)} />;
   }
   if (curriculum === "igcse") {
    if (!selectedChapter) {
      return <IGCSEChapterPicker chapters={igcseChapters || []} onSelect={handleChapterSelect} onBack={() => setCurriculum(null)} />;
    }
    return <IGCSETeacherDashboard user={user} chapter={selectedChapter} onBack={handleBack} />;
   }
};

  const renderDefaultRoute = () => {
    if (!user) return <Navigate to="/demo" />;
    if (userRole === "student") return <Navigate to="/student-dashboard" />;
    if (userRole === "admin") return <Navigate to="/admin" />;
    return <Navigate to="/teacher" />;
  };

  return (
    <ThemeProvider>
    <Router>
      <Routes>
        <Route path="/" element={renderDefaultRoute()} />
        <Route path="/login" element={<Login />} />
        <Route path="/teacher" element={user && userRole !== "student" ? renderTeacherFlow() : <Navigate to="/login" />} />
        <Route path="/homework" element={user && userRole !== "student" ? <HomeworkManager user={user} /> : <Navigate to="/login" />} />
        <Route path="/student-dashboard" element={user && userRole === "student" ? <StudentDashboard user={user} /> : <Navigate to="/login" />} />
        <Route path="/student/:sessionId" element={<SmartStudentView />} /> 
        <Route path="/igcse-student/:sessionId" element={<IGCSEStudentView />} />
        <Route path="/admin" element={user ? <AdminDashboard user={user} /> : <Navigate to="/login" />} />
        <Route path="/admin/theory" element={user ? <AdminTheoryDashboard user={user} onBack={() => window.history.back()} /> : <Navigate to="/login" />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/igcse/edexcel/sequences" element={<SequencesFlow />} />
        <Route path="/igcse/edexcel/pure" element={<><PureMathsHome /><FeedbackWidget userEmail={user?.email} /></>} />
        <Route path="/igcse/edexcel/stats" element={<><StatsHome /><FeedbackWidget userEmail={user?.email} /></>} />
        <Route path="/igcse/edexcel/mechanics" element={<><MechanicsHome /><FeedbackWidget userEmail={user?.email} /></>} />
      </Routes>
    </Router>
    <Analytics />
    </ThemeProvider>
  );
}