import { useState, useEffect, useRef } from "react";
import { db, auth } from "../firebase";
import { doc, setDoc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { trigonometryChapter } from "../data/trigonometry";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import MathText from "../components/MathText";
import DesmosModal from "../components/DesmosModal";

// Flatten all content into a linear sequence
const buildSequence = () => {
  const seq = [];
  seq.push({ id: "diagnostic", type: "diagnostic", title: "Diagnostic Test", data: trigonometryChapter.diagnosticTest });
  trigonometryChapter.concepts.forEach(concept => {
    concept.slides.forEach(slide => seq.push({ ...slide, conceptTitle: concept.title }));
  });
  seq.push({ id: "final", type: "final", title: "Final Assessment", data: trigonometryChapter.finalTest });
  return seq;
};
const sequence = buildSequence();

export default function TeacherDashboard({ user }) {
  const [sessionId, setSessionId] = useState(null);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionData, setSessionData] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [showDesmos, setShowDesmos] = useState(false);
  const [diagIndex, setDiagIndex] = useState(0);
  const intervalRef = useRef(null);
  const navigate = useNavigate();
  const item = sequence[currentIndex];
  const isDiagnostic = item?.type === "diagnostic";
  const isFinal = item?.type === "final";
  const isTest = isDiagnostic || isFinal;
  const testQuestions = isTest ? item.data.questions : [];
  const currentQ = isTest ? testQuestions[diagIndex] : null;

  const startSession = async () => {
    const id = Math.random().toString(36).substr(2, 6).toUpperCase();
    setSessionId(id);
    await setDoc(doc(db, "sessions", id), {
      teacherId: user.uid, currentIndex: 0, diagIndex: 0,
      status: "active", chapter: "trigonometry",
      createdAt: serverTimestamp(), answers: {}, timerActive: false
    });
    setSessionStarted(true);
  };

  useEffect(() => {
    if (!sessionId) return;
    return onSnapshot(doc(db, "sessions", sessionId), snap => setSessionData(snap.data()));
  }, [sessionId]);

  const pushItem = async (index, dIndex = 0) => {
    setCurrentIndex(index);
    setDiagIndex(dIndex);
    stopTimer();
    await setDoc(doc(db, "sessions", sessionId), {
      currentIndex: index, diagIndex: dIndex, timerActive: false
    }, { merge: true });
  };

  const startTimer = async (seconds) => {
    stopTimer();
    setSecondsLeft(seconds);
    setTimerActive(true);
    await setDoc(doc(db, "sessions", sessionId), { timerActive: true, timeLimit: seconds }, { merge: true });
    intervalRef.current = setInterval(() => {
      setSecondsLeft(s => { if (s <= 1) { stopTimer(); return 0; } return s - 1; });
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    setTimerActive(false);
    if (sessionId) setDoc(doc(db, "sessions", sessionId), { timerActive: false }, { merge: true });
  };

  const nextDiagQ = () => {
    if (diagIndex < testQuestions.length - 1) pushItem(currentIndex, diagIndex + 1);
  };
  const prevDiagQ = () => {
    if (diagIndex > 0) pushItem(currentIndex, diagIndex - 1);
  };

  const endSession = async () => {
    await setDoc(doc(db, "sessions", sessionId), { status: "ended" }, { merge: true });
    window.location.reload();
  };

  const getStudentAnswer = (key) => sessionData?.answers?.[key] || null;
  const diagAnswerKey = `diag_${currentIndex}_${diagIndex}`;
  const slideAnswerKey = `slide_${currentIndex}`;

  if (!sessionStarted) return (
    <div style={styles.startScreen}>
      <div style={styles.startCard}>
        <div style={{ fontSize: 48, marginBottom: 8 }}>📚</div>
       <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
        <div style={{ width:44, height:44, borderRadius:10, background:"linear-gradient(135deg, #6366f1, #8b5cf6)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:15, color:"white" }}>CF</div>
        <span style={{ fontWeight:800, fontSize:22, color:"white" }}>ClassFlow</span>
       </div>
        <div style={{ color: "#94a3b8", marginBottom: 32 }}>Live 1-on-1 Tutoring Platform</div>
        <div style={{ color: "#64748b", fontSize: 13, marginBottom: 8 }}>Chapter: Trigonometry</div>
        <div style={{ color: "#64748b", fontSize: 13, marginBottom: 32 }}>{user.email}</div>
        <button onClick={startSession} style={styles.bigBtn}>🚀 Start New Session</button>
        <div style={{ color: "#475569", fontSize: 12, marginTop: 20, cursor: "pointer" }}
          onClick={() => signOut(auth)}>Sign out</div>
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ color: "#f59e0b", fontWeight: 900, fontSize: 18 }}>J</span>
          <span style={{ color: "white", fontWeight: 700 }}>amboree SAT</span>
          <span style={{ color: "#475569", fontSize: 13 }}>Trigonometry</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={styles.sessionBadge}>Session: <strong style={{ color: "#f59e0b" }}>{sessionId}</strong></div>
          <button onClick={() => setShowDesmos(true)} style={styles.desmosBtn}>📐 Desmos</button>
          <button onClick={endSession} style={styles.endBtn}>End Session</button>
        </div>
      </div>

      {/* Progress */}
      <div style={{ height: 3, background: "#1e293b" }}>
        <div style={{ height: "100%", width: `${(currentIndex / (sequence.length - 1)) * 100}%`, background: "#f59e0b", transition: "width 0.4s" }} />
      </div>

      <div style={styles.body}>
        {/* Sidebar */}
        <div style={styles.sidebar}>
          <div style={{ color: "#475569", fontSize: 11, fontWeight: 700, marginBottom: 12, textTransform: "uppercase", letterSpacing: 1 }}>Content</div>
          {sequence.map((s, i) => {
            const isActive = i === currentIndex;
            const typeColor = s.type === "theory" ? "#10b981" : s.type === "example" ? "#f59e0b" : s.type === "question" ? "#6366f1" : "#ec4899";
            return (
              <div key={i} onClick={() => pushItem(i)} style={{ ...styles.sideItem, background: isActive ? "rgba(245,158,11,0.1)" : "transparent", borderLeft: `3px solid ${isActive ? "#f59e0b" : typeColor}` }}>
                <div style={{ fontSize: 10, color: typeColor, textTransform: "uppercase", fontWeight: 700 }}>{s.type}</div>
                <div style={{ color: isActive ? "white" : "#94a3b8", fontSize: 12, marginTop: 2 }}>{s.title || s.topic}</div>
              </div>
            );
          })}
        </div>

        {/* Main Content */}
        <div style={styles.main}>
          {/* Test screens */}
          {isTest && currentQ && (
            <div style={styles.contentCard}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <span style={{ ...styles.badge, background: "#4c0519", color: "#fda4af" }}>
                  {isDiagnostic ? "🔍 Diagnostic" : "🏁 Final Assessment"} — Q{diagIndex + 1}/{testQuestions.length}
                </span>
                <span style={{ color: "#64748b", fontSize: 13 }}>Topic: {currentQ.topic}</span>
              </div>
              <div style={{ color: "white", fontSize: 18, marginBottom: 20, lineHeight: 1.7 }}>
                <MathText text={currentQ.question} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {currentQ.options.map((opt, i) => {
                  const letter = opt[0];
                  const ans = getStudentAnswer(diagAnswerKey);
                  const isSelected = ans?.answer === letter;
                  return (
                    <div key={i} style={{ ...styles.option, background: isSelected ? "rgba(99,102,241,0.3)" : "rgba(255,255,255,0.04)", borderColor: isSelected ? "#6366f1" : "#334155" }}>
                      <MathText text={opt} />
                    </div>
                  );
                })}
              </div>
              {getStudentAnswer(diagAnswerKey) && (
                <div style={styles.explanationBox}>
                  <div style={{ color: "#94a3b8", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>EXPLANATION</div>
                  <MathText text={currentQ.explanation} style={{ color: "#cbd5e1", fontSize: 13, lineHeight: 1.7 }} />
                </div>
              )}
              <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
                <button onClick={prevDiagQ} disabled={diagIndex === 0} style={{ ...styles.navBtn, opacity: diagIndex === 0 ? 0.4 : 1 }}>← Prev</button>
                {!timerActive
                  ? <button onClick={() => startTimer(120)} style={styles.timerStartBtn}>⏱ Start Timer (2 min)</button>
                  : <div style={styles.timerRunning}>⏱ {secondsLeft}s <button onClick={stopTimer} style={{ marginLeft: 8, background: "none", border: "none", color: "#f87171", cursor: "pointer" }}>■</button></div>
                }
                <button onClick={nextDiagQ} disabled={diagIndex === testQuestions.length - 1} style={{ ...styles.navBtn, opacity: diagIndex === testQuestions.length - 1 ? 0.4 : 1 }}>Next →</button>
              </div>
            </div>
          )}

          {/* Theory / Example / Question slides */}
          {!isTest && (
            <div style={styles.contentCard}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <span style={{ ...styles.badge, background: item.type === "theory" ? "#064e3b" : item.type === "example" ? "#422006" : "#1e1b4b", color: item.type === "theory" ? "#6ee7b7" : item.type === "example" ? "#fcd34d" : "#a5b4fc" }}>
                  {item.type === "theory" ? "📖 Theory" : item.type === "example" ? "✏️ Example" : "🧩 Practice Question"}
                </span>
                <span style={{ color: "#475569", fontSize: 12 }}>{item.conceptTitle}</span>
              </div>

              <h2 style={{ color: "white", fontSize: 20, marginBottom: 16 }}>{item.title || item.topic}</h2>

              {(item.type === "theory" || item.type === "example") && (
                <>
                  <div style={{ color: "#cbd5e1", lineHeight: 1.8, marginBottom: 16 }}>
                    <MathText text={item.content} />
                  </div>
                  {item.formula && (
                    <div style={styles.formulaBox}>
                      <MathText text={`$$${item.formula}$$`} />
                    </div>
                  )}
                  {item.keyPoints && (
                    <div style={styles.keyPoints}>
                      <div style={{ color: "#64748b", fontSize: 11, fontWeight: 700, marginBottom: 8, textTransform: "uppercase" }}>Key Points</div>
                      {item.keyPoints.map((p, i) => (
                        <div key={i} style={{ color: "#e2e8f0", marginBottom: 6, display: "flex", gap: 8 }}>
                          <span style={{ color: "#f59e0b" }}>•</span>
                          <MathText text={p} />
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {item.type === "question" && (
                <>
                  <div style={{ color: "#cbd5e1", fontSize: 16, lineHeight: 1.8, marginBottom: 20 }}>
                    <MathText text={item.question} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {item.options?.map((opt, i) => {
                      const letter = opt[0];
                      const ans = getStudentAnswer(slideAnswerKey);
                      const isSelected = ans?.answer === letter;
                      return (
                        <div key={i} style={{ ...styles.option, background: isSelected ? "rgba(99,102,241,0.3)" : "rgba(255,255,255,0.04)", borderColor: isSelected ? "#6366f1" : "#334155" }}>
                          <MathText text={opt} />
                        </div>
                      );
                    })}
                  </div>
                  {getStudentAnswer(slideAnswerKey) && (
                    <div style={styles.explanationBox}>
                      <div style={{ color: "#94a3b8", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>EXPLANATION</div>
                      <MathText text={item.explanation} style={{ color: "#cbd5e1", fontSize: 13, lineHeight: 1.7 }} />
                    </div>
                  )}
                </>
              )}

              <div style={{ display: "flex", gap: 12, marginTop: 24, justifyContent: "center" }}>
                <button onClick={() => pushItem(Math.max(0, currentIndex - 1))} style={{ ...styles.navBtn, opacity: currentIndex === 0 ? 0.4 : 1 }}>← Previous</button>
                {item.type === "question" && (
                  !timerActive
                    ? <button onClick={() => startTimer(item.timeLimit || 90)} style={styles.timerStartBtn}>⏱ Start Timer</button>
                    : <div style={styles.timerRunning}>⏱ {secondsLeft}s <button onClick={stopTimer} style={{ marginLeft: 8, background: "none", border: "none", color: "#f87171", cursor: "pointer" }}>■</button></div>
                )}
                <button onClick={() => pushItem(Math.min(sequence.length - 1, currentIndex + 1))} style={{ ...styles.navBtn, opacity: currentIndex === sequence.length - 1 ? 0.4 : 1 }}>Next →</button>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel — Student Activity */}
        <div style={styles.rightPanel}>
          <div style={{ color: "#475569", fontSize: 11, fontWeight: 700, marginBottom: 16, textTransform: "uppercase" }}>Student Activity</div>
          <div style={styles.studentStatus}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: sessionData?.studentOnline ? "#22c55e" : "#475569", marginRight: 8 }} />
            <span style={{ color: "white", fontSize: 13 }}>{sessionData?.studentOnline ? "Student Online" : "Waiting..."}</span>
          </div>

          {(() => {
            const key = isTest ? diagAnswerKey : slideAnswerKey;
            const ans = getStudentAnswer(key);
            const correctAns = isTest ? currentQ?.correct : item?.correct;
            if (!ans) return <div style={styles.waitingCard}><span style={{ color: "#475569" }}>{item.type === "theory" || item.type === "example" ? "Student viewing content" : "Waiting for answer..."}</span></div>;
            const isCorrect = ans.answer === correctAns;
            return (
              <div style={{ ...styles.answerCard, borderColor: isCorrect ? "#166534" : "#7f1d1d" }}>
                <div style={{ color: "#94a3b8", fontSize: 11, marginBottom: 6 }}>Student answered</div>
                <div style={{ color: "white", fontSize: 24, fontWeight: 700 }}>{ans.answer}</div>
                <div style={{ color: isCorrect ? "#22c55e" : "#ef4444", fontSize: 13, marginTop: 6, fontWeight: 600 }}>
                  {isCorrect ? "✓ Correct" : `✗ Incorrect — Correct: ${correctAns}`}
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      <DesmosModal isOpen={showDesmos} onClose={() => setShowDesmos(false)} />
    </div>
  );
}

const styles = {
  startScreen: { minHeight: "100vh", background: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Segoe UI', sans-serif" },
  startCard: { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "48px 56px", textAlign: "center", color: "white" },
  bigBtn: { padding: "14px 48px", background: "#f59e0b", color: "#0f172a", fontWeight: 700, fontSize: 16, border: "none", borderRadius: 12, cursor: "pointer" },
  container: { minHeight: "100vh", background: "#0f172a", fontFamily: "'Segoe UI', sans-serif", display: "flex", flexDirection: "column" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px", borderBottom: "1px solid #1e293b" },
  sessionBadge: { background: "#1e293b", color: "#94a3b8", padding: "6px 14px", borderRadius: 8, fontSize: 13 },
  desmosBtn: { padding: "6px 14px", background: "#1e3a5f", color: "#60a5fa", border: "1px solid #1e40af", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600 },
  endBtn: { padding: "6px 14px", background: "#7f1d1d", color: "#fca5a5", border: "1px solid #991b1b", borderRadius: 8, cursor: "pointer", fontSize: 13 },
  body: { display: "flex", flex: 1, overflow: "hidden" },
  sidebar: { width: 220, background: "#080d1a", borderRight: "1px solid #1e293b", padding: 12, overflowY: "auto" },
  sideItem: { padding: "8px 10px", borderRadius: 6, marginBottom: 3, cursor: "pointer", transition: "background 0.15s" },
  main: { flex: 1, padding: 24, overflowY: "auto" },
  contentCard: { background: "#1e293b", borderRadius: 16, padding: 28 },
  badge: { padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600 },
  formulaBox: { background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.25)", borderRadius: 10, padding: "16px 20px", margin: "16px 0", textAlign: "center" },
  keyPoints: { background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: 16, marginTop: 12 },
  option: { padding: "12px 18px", borderRadius: 10, border: "1px solid", color: "#e2e8f0", fontSize: 15 },
  explanationBox: { background: "rgba(34,197,94,0.07)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 10, padding: 16, marginTop: 16 },
  navBtn: { padding: "10px 22px", background: "#1e293b", color: "white", border: "1px solid #334155", borderRadius: 8, cursor: "pointer", fontSize: 14 },
  timerStartBtn: { padding: "10px 22px", background: "#4f46e5", color: "white", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600 },
  timerRunning: { background: "#7c3aed", color: "white", padding: "10px 20px", borderRadius: 8, fontWeight: 700, fontSize: 16, display: "flex", alignItems: "center" },
  rightPanel: { width: 260, background: "#080d1a", borderLeft: "1px solid #1e293b", padding: 16, overflowY: "auto" },
  studentStatus: { background: "#1e293b", borderRadius: 10, padding: "10px 14px", marginBottom: 12, display: "flex", alignItems: "center" },
  waitingCard: { background: "#1e293b", borderRadius: 10, padding: 16, textAlign: "center" },
  answerCard: { background: "#1e293b", borderRadius: 10, padding: 16, border: "1px solid" }
};