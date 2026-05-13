import { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import MathText from "../components/MathText";
import DesmosModal from "../components/DesmosModal";

export default function IGCSEStudentView() {
  const { sessionId } = useParams();
  const [session, setSession] = useState(null);
  const [answers, setAnswers] = useState({});
  const [typedAnswer, setTypedAnswer] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [showDesmos, setShowDesmos] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "sessions", sessionId), snap => {
      const data = snap.data();
      setSession(data);
      setDoc(doc(db, "sessions", sessionId), { studentOnline: true }, { merge: true });
      if (data?.timerActive) { setSecondsLeft(data.timeLimit || 180); setTimerActive(true); }
      else setTimerActive(false);
    });
    return unsub;
  }, [sessionId]);

  useEffect(() => {
    if (!timerActive) return;
    const iv = setInterval(() => setSecondsLeft(s => { if (s <= 1) { setTimerActive(false); return 0; } return s - 1; }), 1000);
    return () => clearInterval(iv);
  }, [timerActive]);

  const submitAnswer = async (answerKey, answer) => {
    if (answers[answerKey]) return;
    setAnswers(prev => ({ ...prev, [answerKey]: answer }));
    setTypedAnswer("");
    await setDoc(doc(db, "sessions", sessionId), {
      [`answers.${answerKey}`]: { answer, timestamp: Date.now() }
    }, { merge: true });
  };

  if (!session) return (
    <div style={styles.center}>
      <div style={{ color: "white" }}>Connecting to session <strong>{sessionId}</strong>...</div>
    </div>
  );

  if (session.status === "ended") return (
    <div style={styles.center}>
      <div style={{ fontSize: 48 }}>🎉</div>
      <h2 style={{ color: "white", marginBottom: 8 }}>Session Complete!</h2>
      <p style={{ color: "#94a3b8" }}>Great work today.</p>
    </div>
  );

  // We don't have local sequence on student side for IGCSE
  // Session data contains currentIndex and the teacher pushes content
  // For IGCSE student view, teacher controls what's shown via Firestore
  const timerPct = session.timeLimit ? (secondsLeft / session.timeLimit) * 100 : 0;
  const answerKey = `slide_${session.currentIndex}`;
  const hasAnswered = !!answers[answerKey];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={styles.logoIcon}>CF</div>
          <span style={{ color: "white", fontWeight: 700 }}>ClassFlow</span>
          <span style={{ color: "#475569", fontSize: 13 }}>Session: {sessionId}</span>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button onClick={() => setShowDesmos(true)} style={styles.desmosBtn}>📐 Desmos</button>
          {timerActive && (
            <div style={{ ...styles.timerBadge, color: secondsLeft < 20 ? "#f87171" : "#a5f3fc", borderColor: secondsLeft < 20 ? "#f87171" : "#0e7490" }}>
              ⏱ {secondsLeft}s
            </div>
          )}
        </div>
      </div>

      {timerActive && (
        <div style={{ height: 5, background: "#1e293b" }}>
          <div style={{ height: "100%", width: `${timerPct}%`, background: timerPct < 20 ? "#ef4444" : "#6366f1", transition: "width 1s linear" }} />
        </div>
      )}

      <div style={styles.body}>
        <div style={styles.card}>
          {/* Show current content pushed by teacher */}
          {session.currentSlideData ? (
            <SlideRenderer
              slide={session.currentSlideData}
              answers={answers}
              answerKey={answerKey}
              hasAnswered={hasAnswered}
              typedAnswer={typedAnswer}
              setTypedAnswer={setTypedAnswer}
              onSubmit={submitAnswer}
            />
          ) : (
            <div style={{ textAlign: "center", padding: "48px 0" }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>📚</div>
              <p style={{ color: "#64748b" }}>Waiting for your teacher to begin the session...</p>
              <p style={{ color: "#475569", fontSize: 13, marginTop: 8 }}>Session ID: <strong style={{ color: "#818cf8" }}>{sessionId}</strong></p>
            </div>
          )}
        </div>
      </div>

      <DesmosModal isOpen={showDesmos} onClose={() => setShowDesmos(false)} />
    </div>
  );
}

function SlideRenderer({ slide, answers, answerKey, hasAnswered, typedAnswer, setTypedAnswer, onSubmit }) {
  if (!slide) return null;

  if (slide.type === "theory" || slide.type === "example") {
    return (
      <>
        <span style={{ padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: slide.type === "theory" ? "#064e3b" : "#422006", color: slide.type === "theory" ? "#6ee7b7" : "#fcd34d", display: "inline-block", marginBottom: 16 }}>
          {slide.type === "theory" ? "📖 Theory" : "✏️ Example"}
        </span>
        <h2 style={{ color: "white", fontSize: 22, marginBottom: 16 }}>{slide.title}</h2>
        <div style={{ color: "#cbd5e1", lineHeight: 1.9 }}><MathText text={slide.content} /></div>
        {slide.formula && (
          <div style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 10, padding: "16px 20px", margin: "16px 0", textAlign: "center" }}>
            <MathText text={`$$${slide.formula}$$`} />
          </div>
        )}
        {slide.keyPoints?.length > 0 && (
          <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: 16, marginTop: 12 }}>
            <div style={{ color: "#64748b", fontSize: 11, fontWeight: 700, marginBottom: 8, textTransform: "uppercase" }}>Key Points</div>
            {slide.keyPoints.map((p, i) => (
              <div key={i} style={{ color: "#e2e8f0", marginBottom: 6, display: "flex", gap: 8 }}>
                <span style={{ color: "#6366f1" }}>•</span><MathText text={p} />
              </div>
            ))}
          </div>
        )}
        <p style={{ color: "#334155", fontSize: 13, marginTop: 24, textAlign: "center" }}>Your teacher will move to the next slide.</p>
      </>
    );
  }

 if (slide.type === "question" || slide.kind === "question") {
  return (
    <>
      <span style={{ padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: "#1e1b4b", color: "#a5b4fc", display: "inline-block", marginBottom: 8 }}>🧩 Question</span>
      <div style={{ color: "#94a3b8", fontSize: 13, marginBottom: 16 }}>{slide.difficulty} • {slide.marks} marks</div>
      <div style={{ color: "white", fontSize: 17, lineHeight: 1.8, marginBottom: 20 }}>
        <MathText text={slide.question} />
      </div>
      {slide.parts?.map((part, i) => (
        <div key={i} style={{ padding: "10px 16px", background: "rgba(255,255,255,0.03)", borderRadius: 8, marginBottom: 8 }}>
          <span style={{ color: "#6366f1", fontWeight: 700, marginRight: 8 }}>({part.part})</span>
          <MathText text={part.question} style={{ color: "#cbd5e1" }} />
        </div>
      ))}
      {!hasAnswered ? (
        <div style={{ marginTop: 20 }}>
          <textarea
            style={{ width: "100%", padding: "14px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.06)", color: "white", fontSize: 15, minHeight: 80, resize: "vertical", boxSizing: "border-box" }}
            placeholder="Type your answer here..."
            value={typedAnswer}
            onChange={e => setTypedAnswer(e.target.value)}
          />
          <button onClick={() => onSubmit(answerKey, typedAnswer)}
            disabled={!typedAnswer.trim()}
            style={{ width: "100%", padding: "14px", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "white", border: "none", borderRadius: 12, fontWeight: 700, fontSize: 16, cursor: "pointer", marginTop: 10, opacity: typedAnswer.trim() ? 1 : 0.5 }}>
            Submit Answer
          </button>
        </div>
      ) : (
        <div style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", borderRadius: 10, padding: 14, color: "#86efac", textAlign: "center", marginTop: 16 }}>
          ✓ Answer submitted — waiting for teacher's feedback
        </div>
      )}
    </>
  );
}

  return (
    <div style={{ textAlign: "center", padding: "48px 0" }}>
      <p style={{ color: "#64748b" }}>Waiting for next slide...</p>
    </div>
  );
}

const styles = {
  center: { minHeight: "100vh", background: "#0a0f1e", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'Segoe UI', sans-serif", gap: 12 },
  container: { minHeight: "100vh", background: "#0a0f1e", fontFamily: "'Segoe UI', sans-serif" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 24px", borderBottom: "1px solid #1e293b" },
  logoIcon: { width: 36, height: 36, borderRadius: 8, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 13, color: "white" },
  timerBadge: { border: "2px solid", borderRadius: 8, padding: "6px 16px", fontWeight: 700, fontSize: 18 },
  desmosBtn: { padding: "7px 16px", background: "#1e3a5f", color: "#60a5fa", border: "1px solid #1e40af", borderRadius: 8, cursor: "pointer", fontSize: 14, fontWeight: 600 },
  body: { display: "flex", justifyContent: "center", padding: "36px 24px" },
  card: { background: "#1e293b", borderRadius: 20, padding: 36, maxWidth: 720, width: "100%" }
};