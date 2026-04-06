import { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { trigonometryChapter } from "../data/trigonometry";

const allContent = [
  ...trigonometryChapter.slides.map(s => ({ ...s, kind: "theory" })),
  ...trigonometryChapter.questions.map(q => ({ ...q, kind: "question" }))
];

export default function StudentView() {
  const { sessionId } = useParams();
  const [session, setSession] = useState(null);
  const [answered, setAnswered] = useState({});
  const [typedAnswer, setTypedAnswer] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "sessions", sessionId), snap => {
      const data = snap.data();
      setSession(data);
      // Mark student online
      setDoc(doc(db, "sessions", sessionId), { studentOnline: true }, { merge: true });

      // Handle timer
      if (data?.timerActive && !timerActive) {
        setSecondsLeft(data.timeLimit || 90);
        setTimerActive(true);
      } else if (!data?.timerActive) {
        setTimerActive(false);
      }
    });
    return unsub;
  }, [sessionId]);

  useEffect(() => {
    if (!timerActive) return;
    const interval = setInterval(() => {
      setSecondsLeft(s => {
        if (s <= 1) { setTimerActive(false); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerActive]);

  const submitAnswer = async (answer) => {
    const idx = session.currentIndex;
    const key = `item_${idx}`;
    if (answered[key]) return;
    setAnswered(prev => ({ ...prev, [key]: answer }));
    await setDoc(doc(db, "sessions", sessionId), {
      [`answers.${key}`]: { answer, timestamp: Date.now() }
    }, { merge: true });
  };

  if (!session) return (
    <div style={styles.center}>
      <p style={{ color:"white" }}>Connecting to session <strong>{sessionId}</strong>...</p>
    </div>
  );

  if (session.status === "ended") return (
    <div style={styles.center}>
      <h2 style={{ color:"white" }}>Session Complete! 🎉</h2>
      <p style={{ color:"#94a3b8" }}>Your teacher will share your results shortly.</p>
    </div>
  );

  const idx = session.currentIndex || 0;
  const item = allContent[idx];
  const isQuestion = item?.kind === "question";
  const answerKey = `item_${idx}`;
  const hasAnswered = !!answered[answerKey];
  const timerPct = session.timeLimit ? (secondsLeft / session.timeLimit) * 100 : 0;

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <span style={{ color:"#f59e0b", fontWeight:900 }}>J</span>
          <span style={{ color:"white", fontWeight:700 }}>amboree SAT</span>
          <span style={{ color:"#64748b", marginLeft:12, fontSize:13 }}>Trigonometry • Session {sessionId}</span>
        </div>
        {timerActive && (
          <div style={{ ...styles.timerBadge, color: secondsLeft < 15 ? "#f87171" : "#a5f3fc", borderColor: secondsLeft < 15 ? "#f87171" : "#0e7490" }}>
            ⏱ {secondsLeft}s
          </div>
        )}
      </div>

      {timerActive && (
        <div style={{ height:6, background:"#1e293b" }}>
          <div style={{ height:"100%", width:`${timerPct}%`, background: timerPct < 20 ? "#ef4444" : "#6366f1", transition:"width 1s linear" }} />
        </div>
      )}

      <div style={styles.body}>
        <div style={styles.card}>
          <span style={{ ...styles.badge, background: isQuestion ? "#312e81" : "#064e3b", color: isQuestion ? "#a5b4fc" : "#6ee7b7" }}>
            {isQuestion ? `📝 Question` : `📖 Theory`}
          </span>

          <h2 style={styles.title}>{item?.title || item?.question}</h2>

          {item?.kind === "theory" && <>
            <p style={styles.content}>{item.content}</p>
            {item.formula && <div style={styles.formulaBox}>{item.formula}</div>}
            {item.keyPoints && <div style={styles.keyPoints}>
              <p style={{ color:"#94a3b8", fontSize:12, fontWeight:600, marginBottom:8, textTransform:"uppercase" }}>Key Points</p>
              {item.keyPoints.map((p, i) => <p key={i} style={{ color:"#e2e8f0", margin:"4px 0" }}>• {p}</p>)}
            </div>}
            <p style={{ color:"#475569", fontSize:13, marginTop:24, textAlign:"center" }}>Your teacher will move to the next slide when ready.</p>
          </>}

          {item?.kind === "question" && <>
            <p style={{ color:"#94a3b8", fontSize:13, marginBottom:16 }}>Topic: {item.topic} • {item.difficulty}</p>
            <p style={styles.content}>{item.question}</p>

            {item.type === "mcq" && (
              <div style={{ marginTop:20 }}>
                {item.options.map((opt, i) => {
                  const letter = opt[0];
                  const isSelected = answered[answerKey] === letter;
                  return (
                    <button key={i} onClick={() => !hasAnswered && submitAnswer(letter)}
                      disabled={hasAnswered}
                      style={{ ...styles.optionBtn, background: isSelected ? "rgba(99,102,241,0.4)" : "rgba(255,255,255,0.04)", borderColor: isSelected ? "#6366f1" : "rgba(255,255,255,0.1)", cursor: hasAnswered ? "default" : "pointer" }}>
                      {opt}
                    </button>
                  );
                })}
              </div>
            )}

            {item.type === "grid" && (
              <div style={{ marginTop:20 }}>
                <input style={styles.gridInput} type="text" placeholder="Enter your answer..."
                  value={typedAnswer} onChange={e => setTypedAnswer(e.target.value)}
                  disabled={hasAnswered} />
                {!hasAnswered && (
                  <button onClick={() => submitAnswer(typedAnswer)} style={styles.submitBtn}>Submit Answer</button>
                )}
              </div>
            )}

            {hasAnswered && (
              <div style={styles.submittedBanner}>
                ✓ Answer submitted — waiting for teacher's explanation
              </div>
            )}
          </>}
        </div>
      </div>
    </div>
  );
}

const styles = {
  center: { minHeight:"100vh", background:"#0f172a", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", fontFamily:"'Segoe UI', sans-serif" },
  container: { minHeight:"100vh", background:"#0f172a", fontFamily:"'Segoe UI', sans-serif" },
  header: { display:"flex", justifyContent:"space-between", alignItems:"center", padding:"16px 24px", borderBottom:"1px solid #1e293b" },
  timerBadge: { border:"2px solid", borderRadius:8, padding:"6px 16px", fontWeight:700, fontSize:20 },
  body: { display:"flex", justifyContent:"center", padding:"40px 24px" },
  card: { background:"#1e293b", borderRadius:20, padding:36, maxWidth:700, width:"100%" },
  badge: { padding:"4px 12px", borderRadius:20, fontSize:12, fontWeight:600, display:"inline-block", marginBottom:16 },
  title: { color:"white", fontSize:24, marginBottom:16 },
  content: { color:"#cbd5e1", lineHeight:1.8, fontSize:16, whiteSpace:"pre-line" },
  formulaBox: { background:"rgba(99,102,241,0.1)", border:"1px solid rgba(99,102,241,0.3)", borderRadius:10, padding:"12px 20px", color:"#a5b4fc", fontFamily:"monospace", fontSize:15, margin:"16px 0" },
  keyPoints: { background:"rgba(255,255,255,0.03)", borderRadius:10, padding:16, marginTop:16 },
  optionBtn: { display:"block", width:"100%", padding:"14px 20px", borderRadius:12, border:"1px solid", marginBottom:10, color:"#e2e8f0", fontSize:15, textAlign:"left", transition:"all 0.2s", background:"transparent" },
  gridInput: { width:"100%", padding:"14px 20px", borderRadius:12, border:"1px solid rgba(255,255,255,0.2)", background:"rgba(255,255,255,0.06)", color:"white", fontSize:18, boxSizing:"border-box" },
  submitBtn: { width:"100%", padding:"14px", background:"#6366f1", color:"white", border:"none", borderRadius:12, fontWeight:700, fontSize:16, cursor:"pointer", marginTop:12 },
  submittedBanner: { background:"rgba(34,197,94,0.1)", border:"1px solid rgba(34,197,94,0.3)", borderRadius:10, padding:14, color:"#86efac", textAlign:"center", marginTop:16, fontSize:14 }
};