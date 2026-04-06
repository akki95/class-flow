import { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { trigonometryChapter } from "../data/trigonometry";
import MathText from "../components/MathText";
import DesmosModal from "../components/DesmosModal";

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

export default function StudentView() {
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
      if (data?.timerActive) { setSecondsLeft(data.timeLimit || 90); setTimerActive(true); }
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
    await setDoc(doc(db, "sessions", sessionId), {
      [`answers.${answerKey}`]: { answer, timestamp: Date.now() }
    }, { merge: true });
  };

  if (!session) return <div style={styles.center}><div style={{ color: "white" }}>Connecting to session <strong>{sessionId}</strong>...</div></div>;
  if (session.status === "ended") return (
    <div style={styles.center}>
      <div style={{ fontSize: 48 }}>🎉</div>
      <h2 style={{ color: "white", marginBottom: 8 }}>Session Complete!</h2>
      <p style={{ color: "#94a3b8" }}>Your teacher will share your results shortly.</p>
    </div>
  );

  const idx = session.currentIndex || 0;
  const dIdx = session.diagIndex || 0;
  const item = sequence[idx];
  const isTest = item?.type === "diagnostic" || item?.type === "final";
  const currentQ = isTest ? item.data.questions[dIdx] : null;
  const isQuestion = item?.type === "question";
  const showDesmosTrigger = isTest || isQuestion;
  const diagAnswerKey = `diag_${idx}_${dIdx}`;
  const slideAnswerKey = `slide_${idx}`;
  const timerPct = session.timeLimit ? (secondsLeft / session.timeLimit) * 100 : 0;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <span style={{ color: "#f59e0b", fontWeight: 900 }}>J</span>
          <span style={{ color: "white", fontWeight: 700 }}>amboree SAT</span>
          <span style={{ color: "#475569", marginLeft: 12, fontSize: 13 }}>Session: {sessionId}</span>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {showDesmosTrigger && (
            <button onClick={() => setShowDesmos(true)} style={styles.desmosBtn}>📐 Desmos</button>
          )}
          {timerActive && (
            <div style={{ ...styles.timerBadge, color: secondsLeft < 15 ? "#f87171" : "#a5f3fc", borderColor: secondsLeft < 15 ? "#f87171" : "#0e7490" }}>
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
          {/* Test question */}
          {isTest && currentQ && (
            <>
              <div style={{ ...styles.badge, background: "#4c0519", color: "#fda4af", marginBottom: 16 }}>
                {item.type === "diagnostic" ? "🔍 Diagnostic" : "🏁 Final"} — Q{dIdx + 1}/{item.data.questions.length}
              </div>
              <div style={{ color: "#94a3b8", fontSize: 13, marginBottom: 12 }}>Topic: {currentQ.topic}</div>
              <div style={{ color: "white", fontSize: 18, lineHeight: 1.8, marginBottom: 20 }}>
                <MathText text={currentQ.question} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {currentQ.options.map((opt, i) => {
                  const letter = opt[0];
                  const isSelected = answers[diagAnswerKey] === letter;
                  const hasAnswered = !!answers[diagAnswerKey];
                  return (
                    <button key={i} onClick={() => !hasAnswered && submitAnswer(diagAnswerKey, letter)}
                      style={{ ...styles.optionBtn, background: isSelected ? "rgba(99,102,241,0.4)" : "rgba(255,255,255,0.04)", borderColor: isSelected ? "#6366f1" : "#334155", cursor: hasAnswered ? "default" : "pointer" }}>
                      <MathText text={opt} />
                    </button>
                  );
                })}
              </div>
              {answers[diagAnswerKey] && <div style={styles.submittedBanner}>✓ Answer submitted — waiting for teacher</div>}
            </>
          )}

          {/* Theory / Example */}
          {!isTest && (item.type === "theory" || item.type === "example") && (
            <>
              <div style={{ ...styles.badge, background: item.type === "theory" ? "#064e3b" : "#422006", color: item.type === "theory" ? "#6ee7b7" : "#fcd34d", marginBottom: 16 }}>
                {item.type === "theory" ? "📖 Theory" : "✏️ Example"}
              </div>
              <h2 style={{ color: "white", fontSize: 22, marginBottom: 16 }}>{item.title}</h2>
              <div style={{ color: "#cbd5e1", lineHeight: 1.9 }}>
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
                      <span style={{ color: "#f59e0b" }}>•</span><MathText text={p} />
                    </div>
                  ))}
                </div>
              )}
              <p style={{ color: "#334155", fontSize: 13, marginTop: 24, textAlign: "center" }}>Your teacher will move to the next slide.</p>
            </>
          )}

          {/* Practice question */}
          {!isTest && item.type === "question" && (
            <>
              <div style={{ ...styles.badge, background: "#1e1b4b", color: "#a5b4fc", marginBottom: 8 }}>🧩 Practice Question</div>
              <div style={{ color: "#94a3b8", fontSize: 13, marginBottom: 16 }}>Topic: {item.topic} • {item.difficulty}</div>
              <div style={{ color: "white", fontSize: 17, lineHeight: 1.8, marginBottom: 20 }}>
                <MathText text={item.question} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {item.options?.map((opt, i) => {
                  const letter = opt[0];
                  const isSelected = answers[slideAnswerKey] === letter;
                  const hasAnswered = !!answers[slideAnswerKey];
                  return (
                    <button key={i} onClick={() => !hasAnswered && submitAnswer(slideAnswerKey, letter)}
                      style={{ ...styles.optionBtn, background: isSelected ? "rgba(99,102,241,0.4)" : "rgba(255,255,255,0.04)", borderColor: isSelected ? "#6366f1" : "#334155", cursor: hasAnswered ? "default" : "pointer" }}>
                      <MathText text={opt} />
                    </button>
                  );
                })}
              </div>
              {answers[slideAnswerKey] && <div style={styles.submittedBanner}>✓ Answer submitted — waiting for teacher's explanation</div>}
            </>
          )}
        </div>
      </div>

      <DesmosModal isOpen={showDesmos} onClose={() => setShowDesmos(false)} />
    </div>
  );
}

const styles = {
  center: { minHeight: "100vh", background: "#0f172a", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'Segoe UI', sans-serif", gap: 12 },
  container: { minHeight: "100vh", background: "#0f172a", fontFamily: "'Segoe UI', sans-serif" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 24px", borderBottom: "1px solid #1e293b" },
  timerBadge: { border: "2px solid", borderRadius: 8, padding: "6px 16px", fontWeight: 700, fontSize: 18 },
  desmosBtn: { padding: "7px 16px", background: "#1e3a5f", color: "#60a5fa", border: "1px solid #1e40af", borderRadius: 8, cursor: "pointer", fontSize: 14, fontWeight: 600 },
  body: { display: "flex", justifyContent: "center", padding: "36px 24px" },
  card: { background: "#1e293b", borderRadius: 20, padding: 36, maxWidth: 720, width: "100%" },
  badge: { padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, display: "inline-block" },
  formulaBox: { background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 10, padding: "16px 20px", margin: "20px 0", textAlign: "center" },
  keyPoints: { background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: 16, marginTop: 16 },
  optionBtn: { display: "block", width: "100%", padding: "13px 18px", borderRadius: 10, border: "1px solid", color: "#e2e8f0", fontSize: 15, textAlign: "left", background: "transparent" },
  submittedBanner: { background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", borderRadius: 10, padding: 14, color: "#86efac", textAlign: "center", marginTop: 16, fontSize: 14 }
};