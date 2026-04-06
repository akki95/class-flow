import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import Login from "./pages/Login";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentView from "./pages/StudentView";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
  }, []);

  if (loading) return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"100vh", background:"#0f172a", color:"white", fontSize:"1.2rem" }}>
      Loading Jamboree SAT...
    </div>
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/teacher" /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/teacher" element={user ? <TeacherDashboard user={user} /> : <Navigate to="/login" />} />
        <Route path="/student/:sessionId" element={<StudentView />} />
      </Routes>
    </Router>
  );
}