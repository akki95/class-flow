import { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { trigonometryChapter } from "../data/trigonometry";
import MathText from "../components/MathText";
import { StudentTestView } from "../components/TestView";

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

function DesmosPanel({ isOpen }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!isOpen || loaded) return;
    const script = document.getElementById("desmos-script");
    const init = () => {
      const el = document.getElementById("desmos-side-panel");
      if (el && window.Desmos) {
        window.Desmos.GraphingCalculator(el, {
          keypad: true, expressions: true, settingsMenu: true, zoomButtons: true
        });
        setLoaded(true);
      }
    };
    if (window.Desmos) { init(); }
    else if (!script) {
      const s = document.createElement("script");
      s.id = "desmos-script";
      s.src = "https://www.desmos.com/api/v1.8/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6";
      s.async = true;
      s.onload = init;
      document.head.appendChild(s);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div style={styles.desmosPanel}>
      <div style={styles.desmosPanelHeader}>
        <span style={{ color: "#60a5fa", fontWeight: 600, fontSize: 13 }}>📐 Desmos Calculator</span>
      </div>
      <div id="desmos-side-panel" style={{ flex: 1 }} />
    </div>
  );
}

export default function StudentView() {
  const { sessionId } = useParams();
  const [session, setSession] = useState(null);
  const [answers, setAnswers] = useState({});
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
    const iv = setInterval(() => setSecondsLeft(s => {
      if (s <= 1) { setTimerActive(false); return 0; }
      return s - 1;
    }), 1000);
    return () => clearInterval(iv);
  }, [timerActive]);

  const submitAnswer = async (answerKey, answer) => {
    if (answers[answerKey]) return;
    setAnswers(prev => ({ ...prev, [answerKey]: answer }));
    await setDoc(doc(db, "sessions", sessionId), {
      [`answers.${answerKey}`]: { answer, timestamp: Date.now() }
    }, { merge: true });
  };

  if (!session) return (
    <div style={styles.center}>
      <div style={styles.logoIcon}>CF</div>
      <div style={{ color: "white", marginTop: 12 }}>Connecting to session <strong>{sessionId}</strong>...</div>
    </div>
  );

  if (session.status === "ended") return (
    <div style={styles.center}>
      <div style={{ fontSize: 48 }}>🎉</div>
      <h2 style={{ color: "white", marginBottom: 8 }}>Session Complete!</h2>
      <p style={{ color: "#94a3b8" }}>Your teacher will share your results shortly.</p>
    </div>
  );

  const idx = session.currentIndex || 0;
  const item = sequence[idx];
  const isTest = item?.type === "diagnostic" || item?.type === "final";
  const isQuestion = item?.type === "question";
  const showDesmosTrigger = isTest || isQuestion;
  const slideAnswerKey = `slide_${idx}`;
  const timerPct = session.timeLimit ? (secondsLeft / session.timeLimit) * 100 : 0;

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={styles.logoIcon}>CF</div>
          <span style={{ color: "white", fontWeight: 700 }}>ScoreQuanta</span>
          <span style={{ color: "#475569", fontSize: 13 }}>Session: {sessionId}</span>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {showDesmosTrigger && (
            <button onClick={() => setShowDesmos(!showDesmos)}
              style={{ ...styles.desmosBtn, background: showDesmos ? "#1e40af" : "#1e3a5f" }}>
              📐 {showDesmos ? "Hide Calculator" : "Show Calculator"}
            </button>
          )}
          {timerActive && (
            <div style={{ ...styles.timerBadge, color: secondsLeft < 15 ? "#f87171" : "#a5f3fc", borderColor: secondsLeft < 15 ? "#f87171" : "#0e7490" }}>
              ⏱ {secondsLeft}s
            </div>
          )}
        </div>
      </div>

      {/* Timer bar */}
      {timerActive && (
        <div style={{ height: 4, background: "#1e293b" }}>
          <div style={{ height: "100%", width: `${timerPct}%`, background: timerPct < 20 ? "#ef4444" : "#6366f1", transition: "width 1s linear" }} />
        </div>
      )}

      {/* Body — splits when Desmos is open */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden", height: "calc(100vh - 57px)" }}>

        {/* Main content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "32px 24px", display: "flex", justifyContent: showDesmos ? "flex-start" : "center" }}>
          <div style={{ ...styles.card, maxWidth: showDesmos ? "100%" : 720, width: "100%" }}>

            {/* Test */}
            {isTest && (
              <StudentTestView
                item={item}
                sessionId={sessionId}
                sessionData={session}
                timerActive={timerActive}
                secondsLeft={secondsLeft}
                answers={answers}
                onSubmit={submitAnswer}
                questionField="question"
                optionFields={["option_a", "option_b", "option_c", "option_d"]}
                correctField="correct"
              />
            )}

            {/* Theory / Example */}
            {!isTest && (item.type === "theory" || item.type === "example") && (
              <>
                <span style={{ ...styles.badge, background: item.type === "theory" ? "#064e3b" : "#422006", color: item.type === "theory" ? "#6ee7b7" : "#fcd34d", marginBottom: 16, display: "inline-block" }}>
                  {item.type === "theory" ? "📖 Theory" : "✏️ Example"}
                </span>
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
                <p style={{ color: "#334155", fontSize: 13, marginTop: 24, textAlign: "center" }}>
                  Your teacher will move to the next slide.
                </p>
              </>
            )}

            {/* Practice question */}
            {!isTest && item.type === "question" && (
              <>
                <span style={{ ...styles.badge, background: "#1e1b4b", color: "#a5b4fc", marginBottom: 8, display: "inline-block" }}>🧩 Practice Question</span>
                <div style={{ color: "#94a3b8", fontSize: 13, marginBottom: 16 }}>
                  Topic: {item.topic} • {item.difficulty}
                </div>
                <div style={{ color: "white", fontSize: 17, lineHeight: 1.8, marginBottom: 20 }}>
                  <MathText text={item.question} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {item.options?.map((opt, i) => {
                    const letter = opt[0];
                    const isSelected = answers[slideAnswerKey]?.answer === letter;
                    const hasAnswered = !!answers[slideAnswerKey];
                    const isCorrect = item.correct === letter;
                    const showResult = hasAnswered;

                    let bg = "rgba(255,255,255,0.04)";
                    let borderColor = "#334155";
                    let labelColor = "#64748b";

                    if (showResult && isCorrect) {
                      bg = "rgba(34,197,94,0.15)"; borderColor = "#166534"; labelColor = "#22c55e";
                    } else if (showResult && isSelected && !isCorrect) {
                      bg = "rgba(239,68,68,0.15)"; borderColor = "#991b1b"; labelColor = "#ef4444";
                    } else if (!showResult && isSelected) {
                      bg = "rgba(99,102,241,0.2)"; borderColor = "#6366f1"; labelColor = "#818cf8";
                    }

                    return (
                      <button key={i}
                        onClick={() => !hasAnswered && submitAnswer(slideAnswerKey, letter)}
                        style={{ display: "flex", gap: 12, alignItems: "flex-start", width: "100%", padding: "13px 18px", borderRadius: 10, border: `1px solid ${borderColor}`, background: bg, color: "#e2e8f0", fontSize: 15, textAlign: "left", cursor: hasAnswered ? "default" : "pointer", transition: "all 0.3s" }}>
                        <span style={{ fontWeight: 700, color: labelColor, minWidth: 20 }}>{letter})</span>
                        <MathText text={opt.slice(3)} />
                        {showResult && isCorrect && <span style={{ marginLeft: "auto", color: "#22c55e" }}>✓</span>}
                        {showResult && isSelected && !isCorrect && <span style={{ marginLeft: "auto", color: "#ef4444" }}>✗</span>}
                      </button>
                    );
                  })}
                </div>
                {answers[slideAnswerKey] && (
                  <div style={styles.submittedBanner}>
                    {answers[slideAnswerKey]?.answer === item.correct ? "✓ Correct!" : `✗ Incorrect — Correct answer: ${item.correct}`}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Desmos side panel */}
        <DesmosPanel isOpen={showDesmos} />
      </div>
    </div>
  );
}

const styles = {
  center: { minHeight: "100vh", background: "#0a0f1e", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'Segoe UI', sans-serif", gap: 12 },
  container: { minHeight: "100vh", background: "#0a0f1e", fontFamily: "'Segoe UI', sans-serif", display: "flex", flexDirection: "column" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 24px", borderBottom: "1px solid #1e293b", flexShrink: 0 },
  logoIcon: { width: 36, height: 36, borderRadius: 8, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 13, color: "white" },
  timerBadge: { border: "2px solid", borderRadius: 8, padding: "6px 16px", fontWeight: 700, fontSize: 18 },
  desmosBtn: { padding: "7px 16px", color: "#60a5fa", border: "1px solid #1e40af", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600 },
  card: { background: "#1e293b", borderRadius: 20, padding: 32 },
  badge: { padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600 },
  formulaBox: { background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 10, padding: "16px 20px", margin: "20px 0", textAlign: "center" },
  keyPoints: { background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: 16, marginTop: 16 },
  submittedBanner: { borderRadius: 10, padding: 14, textAlign: "center", marginTop: 16, fontSize: 14, background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", color: "#86efac" },
  desmosPanel: { width: 420, borderLeft: "1px solid #1e293b", display: "flex", flexDirection: "column", flexShrink: 0, background: "#0a0f1e" },
  desmosPanelHeader: { padding: "10px 16px", borderBottom: "1px solid #1e293b", background: "#0d1829", flexShrink: 0 }
};