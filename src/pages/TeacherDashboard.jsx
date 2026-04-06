import { useState, useEffect, useRef } from "react";
import { db, auth } from "../firebase";
import { doc, setDoc, onSnapshot, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { trigonometryChapter } from "../data/trigonometry";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const allContent = [
  ...trigonometryChapter.slides.map(s => ({ ...s, kind: "theory" })),
  ...trigonometryChapter.questions.map(q => ({ ...q, kind: "question" }))
];

export default function TeacherDashboard({ user }) {
  const [sessionId, setSessionId] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionData, setSessionData] = useState(null);
  const [studentAnswer, setStudentAnswer] = useState(null);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [timer, setTimer] = useState(null);
  const [timerActive, setTimerActive] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const intervalRef = useRef(null);
  const navigate = useNavigate();
  const currentItem = allContent[currentIndex];

  // Create session
  const startSession = async () => {
    const id = Math.random().toString(36).substr(2, 6).toUpperCase();
    setSessionId(id);
    await setDoc(doc(db, "sessions", id), {
      teacherId: user.uid,
      currentIndex: 0,
      status: "active",
      chapter: "trigonometry",
      createdAt: serverTimestamp(),
      answers: {}
    });
    setSessionStarted(true);
  };

  // Sync session state
  useEffect(() => {
    if (!sessionId) return;
    const unsub = onSnapshot(doc(db, "sessions", sessionId), snap => {
      const data = snap.data();
      setSessionData(data);
      const answers = data?.answers || {};
      const key = `item_${currentIndex}`;
      setStudentAnswer(answers[key] || null);
    });
    return unsub;
  }, [sessionId, currentIndex]);

  // Push current item to student
  const pushItem = async (index) => {
    if (!sessionId) return;
    setCurrentIndex(index);
    setStudentAnswer(null);
    stopTimer();
    await setDoc(doc(db, "sessions", sessionId), {
      currentIndex: index,
      status: "active",
      timerActive: false
    }, { merge: true });
  };

  const startTimer = async () => {
    const limit = currentItem.timeLimit || 90;
    setSecondsLeft(limit);
    setTimerActive(true);
    await setDoc(doc(db, "sessions", sessionId), { timerActive: true, timeLimit: limit }, { merge: true });
    intervalRef.current = setInterval(() => {
      setSecondsLeft(s => {
        if (s <= 1) { stopTimer(); return 0; }
        return s - 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    setTimerActive(false);
  };

  const endSession = async () => {
    await setDoc(doc(db, "sessions", sessionId), { status: "ended" }, { merge: true });
    navigate("/teacher");
    window.location.reload();
  };

  const item = currentItem;
  const isQuestion = item?.kind === "question";
  const progress = ((currentIndex) / (allContent.length - 1)) * 100;

  if (!sessionStarted) return (
    <div style={styles.container}>
      <div style={styles.startCard}>
        <div style={styles.logo}><span style={{ color:"#f59e0b", fontWeight:900, fontSize:32 }}>J</span><span style={{ fontWeight:700, fontSize:24 }}>amboree SAT</span></div>
        <h2 style={{ color:"white", marginBottom:8 }}>Teacher Dashboard</h2>
        <p style={{ color:"#94a3b8", marginBottom:32 }}>Chapter: {trigonometryChapter.title}</p>
        <button onClick={startSession} style={styles.bigBtn}>🚀 Start New Session</button>
        <p style={{ color:"#64748b", marginTop:16, fontSize:13 }}>{user.email}</p>
        <p style={{ color:"#64748b", fontSize:13, cursor:"pointer" }} onClick={() => signOut(auth)}>Sign out</p>
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <span style={{ color:"#f59e0b", fontWeight:900, fontSize:20 }}>J</span>
          <span style={{ color:"white", fontWeight:700 }}>amboree SAT</span>
          <span style={{ color:"#64748b", marginLeft:16, fontSize:14 }}>Trigonometry</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:16 }}>
          <div style={styles.sessionBadge}>
            Session: <strong>{sessionId}</strong>
            <span style={{ color:"#64748b", fontSize:12, marginLeft:8 }}>Share this with your student</span>
          </div>
          <button onClick={endSession} style={styles.endBtn}>End Session</button>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height:4, background:"#1e293b" }}>
        <div style={{ height:"100%", width:`${progress}%`, background:"#f59e0b", transition:"width 0.3s" }} />
      </div>

      <div style={styles.body}>
        {/* Left: Content outline */}
        <div style={styles.sidebar}>
          <p style={{ color:"#64748b", fontSize:12, fontWeight:600, marginBottom:12, textTransform:"uppercase", letterSpacing:1 }}>Session Content</p>
          {allContent.map((item, i) => (
            <div key={i} onClick={() => pushItem(i)} style={{
              ...styles.sideItem,
              ...(i === currentIndex ? styles.sideItemActive : {}),
              borderLeft: item.kind === "question" ? "3px solid #6366f1" : "3px solid #10b981"
            }}>
              <span style={{ fontSize:11, color: item.kind === "question" ? "#818cf8" : "#34d399" }}>
                {item.kind === "question" ? `Q${trigonometryChapter.questions.indexOf(item) + 1} • ${item.difficulty}` : `📖 Theory`}
              </span>
              <p style={{ color:"white", fontSize:13, margin:"2px 0 0", fontWeight: i === currentIndex ? 600 : 400 }}>
                {item.title || item.topic}
              </p>
            </div>
          ))}
        </div>

        {/* Center: Current content */}
        <div style={styles.main}>
          <div style={styles.contentCard}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
              <span style={{ ...styles.badge, background: isQuestion ? "#312e81" : "#064e3b", color: isQuestion ? "#a5b4fc" : "#6ee7b7" }}>
                {isQuestion ? `Question ${trigonometryChapter.questions.indexOf(item) + 1} / ${trigonometryChapter.questions.length}` : "Theory Slide"}
              </span>
              {isQuestion && (
                <span style={{ color:"#64748b", fontSize:13 }}>⏱ {item.timeLimit}s recommended</span>
              )}
            </div>

            <h2 style={{ color:"white", fontSize:22, marginBottom:16 }}>{item.title || item.question}</h2>

            {item.kind === "theory" && <>
              <p style={{ color:"#cbd5e1", lineHeight:1.7, whiteSpace:"pre-line", marginBottom:20 }}>{item.content}</p>
              {item.formula && <div style={styles.formulaBox}>{item.formula}</div>}
              {item.keyPoints && <div style={styles.keyPoints}>
                <p style={{ color:"#94a3b8", fontSize:12, fontWeight:600, marginBottom:8, textTransform:"uppercase" }}>Key Points</p>
                {item.keyPoints.map((p, i) => <p key={i} style={{ color:"#e2e8f0", margin:"4px 0" }}>• {p}</p>)}
              </div>}
            </>}

            {item.kind === "question" && <>
              <p style={{ color:"#cbd5e1", fontSize:16, marginBottom:20 }}>{item.question}</p>
              {item.type === "mcq" && item.options.map((opt, i) => (
                <div key={i} style={{
                  ...styles.option,
                  background: studentAnswer?.answer === opt[0] ? "rgba(99,102,241,0.3)" : "rgba(255,255,255,0.04)",
                  borderColor: studentAnswer?.answer === opt[0] ? "#6366f1" : "rgba(255,255,255,0.1)"
                }}>
                  {opt}
                </div>
              ))}
              {item.type === "grid" && (
                <div style={styles.gridAnswerBox}>
                  <p style={{ color:"#94a3b8", fontSize:13 }}>Student-Produced Response (Grid-In)</p>
                  {studentAnswer && <p style={{ color:"#f59e0b", fontSize:20, fontWeight:700 }}>Student answered: {studentAnswer.answer}</p>}
                </div>
              )}
            </>}
          </div>

          {/* Controls */}
          <div style={styles.controls}>
            <button onClick={() => pushItem(Math.max(0, currentIndex - 1))}
              style={{ ...styles.navBtn, opacity: currentIndex === 0 ? 0.4 : 1 }}>← Previous</button>

            {isQuestion && !timerActive && (
              <button onClick={startTimer} style={styles.timerStartBtn}>⏱ Start Timer</button>
            )}
            {isQuestion && timerActive && (
              <div style={styles.timerRunning}>
                ⏱ {secondsLeft}s
                <button onClick={stopTimer} style={{ marginLeft:12, background:"none", border:"none", color:"#f87171", cursor:"pointer", fontSize:14 }}>Stop</button>
              </div>
            )}

            <button onClick={() => pushItem(Math.min(allContent.length - 1, currentIndex + 1))}
              style={{ ...styles.navBtn, opacity: currentIndex === allContent.length - 1 ? 0.4 : 1 }}>Next →</button>
          </div>
        </div>

        {/* Right: Student panel */}
        <div style={styles.rightPanel}>
          <p style={{ color:"#64748b", fontSize:12, fontWeight:600, marginBottom:16, textTransform:"uppercase", letterSpacing:1 }}>Student Activity</p>
          <div style={styles.studentCard}>
            <div style={{ width:8, height:8, borderRadius:"50%", background: sessionData?.studentOnline ? "#22c55e" : "#64748b", marginRight:8, display:"inline-block" }} />
            <span style={{ color:"white", fontSize:14 }}>Student {sessionData?.studentOnline ? "Online" : "Waiting..."}</span>
          </div>

          {studentAnswer ? (
            <div style={styles.answerCard}>
              <p style={{ color:"#94a3b8", fontSize:12, marginBottom:8 }}>Student's Answer</p>
              <p style={{ color:"white", fontSize:22, fontWeight:700 }}>{studentAnswer.answer}</p>
              <p style={{ color: studentAnswer.answer === item.correct ? "#22c55e" : "#f87171", fontSize:13, marginTop:8 }}>
                {studentAnswer.answer === item.correct ? "✓ Correct" : `✗ Incorrect — Correct: ${item.correct}`}
              </p>
            </div>
          ) : (
            <div style={styles.waitingCard}>
              <p style={{ color:"#64748b" }}>{isQuestion ? "Waiting for student to answer..." : "Student viewing theory"}</p>
            </div>
          )}

          {studentAnswer && isQuestion && (
            <div style={styles.explanationBox}>
              <p style={{ color:"#94a3b8", fontSize:12, fontWeight:600, marginBottom:8 }}>EXPLANATION (Teacher view)</p>
              <p style={{ color:"#cbd5e1", fontSize:13, lineHeight:1.6 }}>{item.explanation}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight:"100vh", background:"#0f172a", fontFamily:"'Segoe UI', sans-serif" },
  startCard: { display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:"100vh", color:"white" },
  logo: { marginBottom:24 },
  bigBtn: { padding:"16px 48px", background:"#f59e0b", color:"#0f172a", fontWeight:700, fontSize:18, border:"none", borderRadius:12, cursor:"pointer" },
  header: { display:"flex", justifyContent:"space-between", alignItems:"center", padding:"16px 24px", borderBottom:"1px solid #1e293b", background:"#0f172a" },
  sessionBadge: { background:"#1e293b", color:"#f59e0b", padding:"8px 16px", borderRadius:8, fontSize:14 },
  endBtn: { padding:"8px 16px", background:"#7f1d1d", color:"#fca5a5", border:"1px solid #991b1b", borderRadius:8, cursor:"pointer", fontSize:13 },
  body: { display:"flex", height:"calc(100vh - 52px)" },
  sidebar: { width:240, background:"#0a0f1e", borderRight:"1px solid #1e293b", padding:16, overflowY:"auto" },
  sideItem: { padding:"10px 12px", borderRadius:8, marginBottom:4, cursor:"pointer", background:"transparent", transition:"background 0.15s" },
  sideItemActive: { background:"rgba(245,158,11,0.1)", borderLeft:"3px solid #f59e0b !important" },
  main: { flex:1, padding:24, overflowY:"auto" },
  contentCard: { background:"#1e293b", borderRadius:16, padding:28, marginBottom:16 },
  badge: { padding:"4px 12px", borderRadius:20, fontSize:12, fontWeight:600 },
  formulaBox: { background:"rgba(99,102,241,0.1)", border:"1px solid rgba(99,102,241,0.3)", borderRadius:10, padding:"12px 20px", color:"#a5b4fc", fontFamily:"monospace", fontSize:15, marginBottom:16 },
  keyPoints: { background:"rgba(255,255,255,0.03)", borderRadius:10, padding:16, marginTop:8 },
  option: { padding:"12px 20px", borderRadius:10, border:"1px solid", marginBottom:8, color:"#e2e8f0", fontSize:15, transition:"all 0.2s" },
  gridAnswerBox: { background:"rgba(255,255,255,0.04)", borderRadius:10, padding:20, border:"1px solid rgba(255,255,255,0.1)" },
  controls: { display:"flex", alignItems:"center", gap:12, justifyContent:"center" },
  navBtn: { padding:"10px 24px", background:"#1e293b", color:"white", border:"1px solid #334155", borderRadius:8, cursor:"pointer", fontSize:14 },
  timerStartBtn: { padding:"10px 24px", background:"#4f46e5", color:"white", border:"none", borderRadius:8, cursor:"pointer", fontWeight:600 },
  timerRunning: { background:"#7c3aed", color:"white", padding:"10px 24px", borderRadius:8, fontWeight:700, fontSize:18, display:"flex", alignItems:"center" },
  rightPanel: { width:280, background:"#0a0f1e", borderLeft:"1px solid #1e293b", padding:20, overflowY:"auto" },
  studentCard: { background:"#1e293b", borderRadius:10, padding:"12px 16px", marginBottom:12, display:"flex", alignItems:"center" },
  answerCard: { background:"#1e293b", borderRadius:10, padding:16, marginBottom:12 },
  waitingCard: { background:"#1e293b", borderRadius:10, padding:16, marginBottom:12, textAlign:"center" },
  explanationBox: { background:"rgba(34,197,94,0.08)", border:"1px solid rgba(34,197,94,0.2)", borderRadius:10, padding:16 }
};