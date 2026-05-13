import { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import MathText from "../components/MathText";
import { StudentTestView } from "../components/TestView";
import Whiteboard from "../components/Whiteboard";

function DesmosPanel({ isOpen }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!isOpen || loaded) return;
    const init = () => {
      const el = document.getElementById("desmos-sat-panel");
      if (el && window.Desmos) {
        window.Desmos.GraphingCalculator(el, { keypad: true, expressions: true, zoomButtons: true });
        setLoaded(true);
      }
    };
    if (window.Desmos) { init(); return; }
    const existing = document.getElementById("desmos-script");
    if (!existing) {
      const s = document.createElement("script");
      s.id = "desmos-script";
      s.src = "https://www.desmos.com/api/v1.8/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6";
      s.async = true;
      s.onload = init;
      document.head.appendChild(s);
    }
  }, [isOpen, loaded]);

  if (!isOpen) return null;
  return (
    <div style={{ width: 420, borderLeft: "1px solid #1e293b", display: "flex", flexDirection: "column", flexShrink: 0 }}>
      <div style={{ padding: "10px 16px", borderBottom: "1px solid #1e293b", background: "#0d1829" }}>
        <span style={{ color: "#60a5fa", fontWeight: 600, fontSize: 13 }}>📐 Desmos Calculator</span>
      </div>
      <div id="desmos-sat-panel" style={{ flex: 1 }} />
    </div>
  );
}

export default function SATStudentView() {
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
      <div style={{ color: "white", marginTop: 12 }}>Joining session <strong>{sessionId}</strong>...</div>
    </div>
  );

  if (session.status === "ended") return (
    <div style={styles.center}>
      <div style={{ fontSize: 48 }}>🎉</div>
      <h2 style={{ color: "white", marginBottom: 8 }}>Session Complete!</h2>
      <p style={{ color: "#94a3b8" }}>Great work today.</p>
    </div>
  );

  const slide = session.currentSlideData;
  const isTest = session.isTest;
  const isQuestion = session.isQuestion;
  const idx = session.currentIndex || 0;
  const slideAnswerKey = `slide_${idx}`;
  const timerPct = session.timeLimit ? (secondsLeft / session.timeLimit) * 100 : 0;

  const options = slide ? [
    { label: "A", value: "A", text: slide.option_a },
    { label: "B", value: "B", text: slide.option_b },
    { label: "C", value: "C", text: slide.option_c },
    { label: "D", value: "D", text: slide.option_d },
  ].filter(o => o.text) : [];

  const hasAnswered = !!answers[slideAnswerKey];
  const myAnswer = answers[slideAnswerKey];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={styles.logoIcon}>CF</div>
          <span style={{ color: "white", fontWeight: 700 }}>ClassFlow</span>
          <span style={{ color: "#475569", fontSize: 13 }}>Session: {sessionId}</span>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button onClick={() => setShowDesmos(!showDesmos)}
            style={{ ...styles.desmosBtn, background: showDesmos ? "#1e40af" : "#1e3a5f" }}>
            📐 {showDesmos ? "Hide Calculator" : "Show Calculator"}
          </button>
          {timerActive && (
            <div style={{ border: "2px solid", borderColor: secondsLeft < 15 ? "#f87171" : "#0e7490", borderRadius: 8, padding: "6px 16px", fontWeight: 700, fontSize: 18, color: secondsLeft < 15 ? "#f87171" : "#a5f3fc" }}>
              ⏱ {secondsLeft}s
            </div>
          )}
        </div>
      </div>

      {timerActive && (
        <div style={{ height: 4, background: "#1e293b" }}>
          <div style={{ height: "100%", width: `${timerPct}%`, background: timerPct < 20 ? "#ef4444" : "#6366f1", transition: "width 1s linear" }} />
        </div>
      )}

      <div style={{ display: "flex", flex: 1, overflow: "hidden", height: "calc(100vh - 57px)" }}>
        <div style={{ flex: 1, overflowY: "auto", padding: "32px 24px", display: "flex", justifyContent: showDesmos ? "flex-start" : "center", position: "relative" }}>
          
          <Whiteboard sessionId={sessionId} isActive={true} readOnly={true} />

          <div style={{ ...styles.card, maxWidth: showDesmos ? "100%" : 720, width: "100%", zIndex: 1 }}>

            {/* Test */}
            {isTest && slide && (
              <StudentTestView
                item={slide}
                sessionId={sessionId}
                sessionData={session}
                timerActive={timerActive}
                secondsLeft={secondsLeft}
                answers={answers}
                onSubmit={submitAnswer}
                questionField="question_text"
                optionFields={["option_a","option_b","option_c","option_d"]}
                correctField="correct_answer"
              />
            )}

            {/* Theory intro */}
            {!isTest && slide?.type === "theory" && (
              <>
                <span style={{ ...styles.badge, background: "#064e3b", color: "#6ee7b7", display: "inline-block", marginBottom: 16 }}>📖 Topic Introduction</span>
                <h2 style={{ color: "white", fontSize: 22, marginBottom: 16 }}>{slide.title}</h2>
                <MathText text={slide.content} style={{ color: "#cbd5e1", lineHeight: 1.8 }} />
                <p style={{ color: "#334155", fontSize: 13, marginTop: 24, textAlign: "center" }}>Your teacher will move to the next slide.</p>
              </>
            )}

            {/* SAT MCQ question */}
            {!isTest && isQuestion && slide && (
              <>
                <span style={{ ...styles.badge, background: "#1e1b4b", color: "#a5b4fc", display: "inline-block", marginBottom: 8 }}>🧩 {slide.concept}</span>
                <div style={{ color: "#94a3b8", fontSize: 13, marginBottom: 16 }}>{slide.difficulty} • {slide.ideal_time_seconds}s</div>
                <div style={{ color: "white", fontSize: 17, lineHeight: 1.8, marginBottom: 20 }}>
                  <MathText text={slide.question_text} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {options.map(opt => {
                    const isSelected = myAnswer?.answer === opt.value;
                    const isCorrect = slide.correct_answer === opt.value;
                    const showResult = hasAnswered;
                    let bg = "rgba(255,255,255,0.04)";
                    let borderColor = "#334155";
                    let labelColor = "#64748b";
                    if (showResult && isCorrect) { bg = "rgba(34,197,94,0.15)"; borderColor = "#166534"; labelColor = "#22c55e"; }
                    else if (showResult && isSelected && !isCorrect) { bg = "rgba(239,68,68,0.15)"; borderColor = "#991b1b"; labelColor = "#ef4444"; }
                    else if (!showResult && isSelected) { bg = "rgba(99,102,241,0.2)"; borderColor = "#6366f1"; labelColor = "#818cf8"; }
                    return (
                      <button key={opt.value}
                        onClick={() => !hasAnswered && submitAnswer(slideAnswerKey, opt.value)}
                        style={{ display: "flex", gap: 12, alignItems: "flex-start", width: "100%", padding: "13px 18px", borderRadius: 10, border: `1px solid ${borderColor}`, background: bg, color: "#e2e8f0", fontSize: 15, textAlign: "left", cursor: hasAnswered ? "default" : "pointer", transition: "all 0.3s" }}>
                        <span style={{ fontWeight: 700, color: labelColor, minWidth: 20 }}>{opt.label})</span>
                        <MathText text={opt.text} />
                        {showResult && isCorrect && <span style={{ marginLeft: "auto", color: "#22c55e" }}>✓</span>}
                        {showResult && isSelected && !isCorrect && <span style={{ marginLeft: "auto", color: "#ef4444" }}>✗</span>}
                      </button>
                    );
                  })}
                </div>
                {hasAnswered && (
                  <div style={{ borderRadius: 10, padding: 14, textAlign: "center", marginTop: 16, fontSize: 14, background: myAnswer?.answer === slide.correct_answer ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)", border: `1px solid ${myAnswer?.answer === slide.correct_answer ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"}`, color: myAnswer?.answer === slide.correct_answer ? "#86efac" : "#fca5a5" }}>
                    {myAnswer?.answer === slide.correct_answer ? "✓ Correct!" : `✗ Incorrect — Correct answer: ${slide.correct_answer}`}
                  </div>
                )}
              </>
            )}

            {/* Waiting */}
            {!slide && !isTest && (
              <div style={{ textAlign: "center", padding: "48px 0" }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>📚</div>
                <p style={{ color: "#64748b" }}>Waiting for your teacher to begin...</p>
                <p style={{ color: "#475569", fontSize: 13, marginTop: 8 }}>Session: <strong style={{ color: "#818cf8" }}>{sessionId}</strong></p>
              </div>
            )}
          </div>
        </div>
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
  desmosBtn: { padding: "7px 16px", color: "#60a5fa", border: "1px solid #1e40af", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600 },
  card: { background: "#1e293b", borderRadius: 20, padding: 32 },
  badge: { padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600 },
};