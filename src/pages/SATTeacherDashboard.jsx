import { useState, useEffect, useRef } from "react";
import { db } from "../firebase";
import { doc, setDoc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { supabase } from "../supabase";
import MathText from "../components/MathText";
import DesmosModal from "../components/DesmosModal";

export default function SATTeacherDashboard({ user, chapter, onBack }) {
  const [sessionId, setSessionId] = useState(null);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [sequence, setSequence] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionData, setSessionData] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [showDesmos, setShowDesmos] = useState(false);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    const loadQuestions = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("questions")
        .select("*")
        .in("concept", chapter.concepts)
        .order("difficulty", { ascending: true });

      if (error) { console.error(error); setLoading(false); return; }

      setQuestions(data || []);
      buildSequence(data || []);
      setLoading(false);
    };
    loadQuestions();
  }, [chapter]);

  const buildSequence = (qs) => {
    const seq = [];
    const byDifficulty = (d) => qs.filter(q => q.difficulty === d);
    const easy = byDifficulty("easy");
    const medium = byDifficulty("medium");
    const hard = byDifficulty("hard");

    // Diagnostic — mix of easy + medium
    const diagQs = [...easy.slice(0, 2), ...medium.slice(0, 2)].slice(0, 4);
    if (diagQs.length > 0) {
      seq.push({ id: "diagnostic", type: "diagnostic", title: "Diagnostic Test", data: { questions: diagQs, timeLimit: 600 } });
    }

    // Group by concept — theory intro + questions
    const byConcept = {};
    qs.forEach(q => {
      if (!byConcept[q.concept]) byConcept[q.concept] = [];
      byConcept[q.concept].push(q);
    });

    Object.entries(byConcept).forEach(([concept, cqs]) => {
      // Intro theory slide
      seq.push({
        id: `theory_${concept}`,
        type: "theory",
        title: concept,
        content: `This section covers **${concept}**. Work through the questions below with your teacher.`,
        conceptTitle: chapter.title
      });

      // 2-3 questions per concept
      cqs.slice(0, 3).forEach(q => seq.push({
        ...q,
        type: "question",
        kind: "question",
        conceptTitle: concept
      }));
    });

    // Final test — harder questions
    const finalQs = [...medium.slice(-2), ...hard.slice(-3)].slice(0, 5);
    if (finalQs.length > 0) {
      seq.push({ id: "final", type: "final", title: "Final Assessment", data: { questions: finalQs, timeLimit: 600 } });
    }

    setSequence(seq);
  };

  const startSession = async () => {
    const id = Math.random().toString(36).substr(2, 6).toUpperCase();
    setSessionId(id);
    await setDoc(doc(db, "sessions", id), {
      teacherId: user.uid, currentIndex: 0,
      status: "active", curriculum: "sat", chapter: chapter.id,
      createdAt: serverTimestamp(), answers: {}, timerActive: false
    });
    setSessionStarted(true);
  };

  useEffect(() => {
    if (!sessionId) return;
    return onSnapshot(doc(db, "sessions", sessionId), snap => setSessionData(snap.data()));
  }, [sessionId]);

  const pushItem = async (index) => {
    setCurrentIndex(index);
    stopTimer();
    const item = sequence[index];
    const isQ = item?.type === "question";
    const isTst = item?.type === "diagnostic" || item?.type === "final";
    await setDoc(doc(db, "sessions", sessionId), {
      currentIndex: index, timerActive: false,
      isQuestion: isQ, isTest: isTst,
      currentSlideType: item?.type,
      currentSlideData: item || null
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

  const endSession = async () => {
    await setDoc(doc(db, "sessions", sessionId), { status: "ended" }, { merge: true });
    onBack();
  };

  if (loading) return (
    <div style={styles.center}><div style={{ color: "white" }}>Loading {chapter.title} questions...</div></div>
  );

  if (!sessionStarted) return (
    <div style={styles.center}>
      <div style={styles.startCard}>
        <div style={styles.logoRow}>
          <div style={styles.logoIcon}>CF</div>
          <div style={styles.logoName}>ClassFlow</div>
        </div>
        <h2 style={{ color: "white", marginBottom: 8 }}>{chapter.title}</h2>
        <p style={{ color: "#64748b", marginBottom: 8 }}>SAT {chapter.section === "math" ? "Math" : "Verbal"}</p>
        <p style={{ color: "#475569", fontSize: 13, marginBottom: 32 }}>{questions.length} questions loaded • {sequence.length} slides</p>
        <button onClick={startSession} style={styles.bigBtn}>🚀 Start Session</button>
        <p style={{ color: "#475569", fontSize: 12, marginTop: 16, cursor: "pointer" }} onClick={onBack}>← Back</p>
      </div>
    </div>
  );

  const item = sequence[currentIndex];
  if (!item) return null;
  const isTest = item.type === "diagnostic" || item.type === "final";
  const isQuestion = item.type === "question";
  const answerKey = `slide_${currentIndex}`;
  const studentAnswer = sessionData?.answers?.[answerKey];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={styles.logoIcon}>CF</div>
          <span style={{ color: "white", fontWeight: 700 }}>ClassFlow</span>
          <span style={{ color: "#475569", fontSize: 13 }}>SAT — {chapter.title}</span>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={styles.sessionBadge}>Session: <strong style={{ color: "#818cf8" }}>{sessionId}</strong></div>
          <button onClick={() => setShowDesmos(true)} style={styles.desmosBtn}>📐 Desmos</button>
          <button onClick={endSession} style={styles.endBtn}>End Session</button>
        </div>
      </div>

      <div style={{ height: 3, background: "#1e293b" }}>
        <div style={{ height: "100%", width: `${(currentIndex / Math.max(sequence.length - 1, 1)) * 100}%`, background: "linear-gradient(90deg, #6366f1, #8b5cf6)", transition: "width 0.4s" }} />
      </div>

      <div style={styles.body}>
        {/* Sidebar */}
        <div style={styles.sidebar}>
          <div style={{ color: "#475569", fontSize: 11, fontWeight: 700, marginBottom: 12, textTransform: "uppercase", letterSpacing: 1 }}>Session</div>
          {sequence.map((s, i) => {
            const isActive = i === currentIndex;
            const typeColor = s.type === "theory" ? "#10b981" : s.type === "question" ? "#6366f1" : "#ec4899";
            return (
              <div key={i} onClick={() => pushItem(i)} style={{ ...styles.sideItem, background: isActive ? "rgba(99,102,241,0.15)" : "transparent", borderLeft: `3px solid ${isActive ? "#6366f1" : typeColor}` }}>
                <div style={{ fontSize: 10, color: typeColor, textTransform: "uppercase", fontWeight: 700 }}>
                  {s.type === "diagnostic" ? "Diagnostic" : s.type === "final" ? "Final" : s.type}
                </div>
                <div style={{ color: isActive ? "white" : "#94a3b8", fontSize: 12, marginTop: 2 }}>
                  {s.type === "question"
                    ? s.question_text?.replace(/\$[^$]*\$/g, "").trim().slice(0, 45) + "..."
                    : s.title}
                </div>
              </div>
            );
          })}
        </div>

        {/* Main */}
        <div style={styles.main}>
          <div style={styles.contentCard}>

            {/* Test */}
            {isTest && (
              <SATTestView item={item} sessionId={sessionId} sessionData={sessionData}
                timerActive={timerActive} secondsLeft={secondsLeft}
                onStartTimer={startTimer} onStopTimer={stopTimer} db={db} />
            )}

            {/* Theory intro */}
            {item.type === "theory" && (
              <>
                <span style={{ ...styles.badge, background: "#064e3b", color: "#6ee7b7" }}>📖 Topic Introduction</span>
                <h2 style={{ color: "white", fontSize: 22, margin: "16px 0" }}>{item.title}</h2>
                <MathText text={item.content} style={{ color: "#cbd5e1", lineHeight: 1.8 }} />
              </>
            )}

            {/* Question */}
            {isQuestion && (
              <SATQuestionView
                item={item} studentAnswer={studentAnswer}
                timerActive={timerActive} secondsLeft={secondsLeft}
                onStartTimer={startTimer} onStopTimer={stopTimer}
              />
            )}

            {/* Nav */}
            {!isTest && (
              <div style={{ display: "flex", gap: 12, marginTop: 24, justifyContent: "center" }}>
                <button onClick={() => pushItem(Math.max(0, currentIndex - 1))}
                  style={{ ...styles.navBtn, opacity: currentIndex === 0 ? 0.4 : 1 }}>← Previous</button>
                {isQuestion && (
                  !timerActive
                    ? <button onClick={() => startTimer(item.ideal_time_seconds || 90)} style={styles.timerStartBtn}>⏱ Start Timer</button>
                    : <div style={styles.timerRunning}>⏱ {secondsLeft}s <button onClick={stopTimer} style={{ marginLeft: 8, background: "none", border: "none", color: "#f87171", cursor: "pointer" }}>■</button></div>
                )}
                <button onClick={() => pushItem(Math.min(sequence.length - 1, currentIndex + 1))}
                  style={{ ...styles.navBtn, opacity: currentIndex === sequence.length - 1 ? 0.4 : 1 }}>Next →</button>
              </div>
            )}
          </div>
        </div>

        {/* Right panel */}
        <div style={styles.rightPanel}>
          <div style={{ color: "#475569", fontSize: 11, fontWeight: 700, marginBottom: 16, textTransform: "uppercase" }}>Student Activity</div>
          <div style={styles.studentStatus}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: sessionData?.studentOnline ? "#22c55e" : "#475569", marginRight: 8 }} />
            <span style={{ color: "white", fontSize: 13 }}>{sessionData?.studentOnline ? "Online" : "Waiting..."}</span>
          </div>
          {studentAnswer ? (
            <div style={styles.answerCard}>
              <div style={{ color: "#94a3b8", fontSize: 11, marginBottom: 6 }}>Answered</div>
              <div style={{ color: "white", fontSize: 20, fontWeight: 700 }}>{studentAnswer.answer}</div>
              {item.correct_answer && (
                <div style={{ color: studentAnswer.answer === item.correct_answer ? "#22c55e" : "#ef4444", fontSize: 13, marginTop: 6, fontWeight: 600 }}>
                  {studentAnswer.answer === item.correct_answer ? "✓ Correct" : `✗ Correct: ${item.correct_answer}`}
                </div>
              )}
            </div>
          ) : (
            <div style={styles.waitingCard}>
              <span style={{ color: "#475569", fontSize: 13 }}>{isQuestion ? "Waiting for answer..." : "Student viewing"}</span>
            </div>
          )}
        </div>
      </div>
      <DesmosModal isOpen={showDesmos} onClose={() => setShowDesmos(false)} />
    </div>
  );
}

function SATQuestionView({ item, studentAnswer, timerActive, secondsLeft, onStartTimer, onStopTimer }) {
  const options = [
    { label: "A", value: "A", text: item.option_a },
    { label: "B", value: "B", text: item.option_b },
    { label: "C", value: "C", text: item.option_c },
    { label: "D", value: "D", text: item.option_d },
  ].filter(o => o.text);

  const isGridIn = item.numeric_answer !== null && item.numeric_answer !== undefined;

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <span style={{ padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: "#1e1b4b", color: "#a5b4fc" }}>
          🧩 {item.concept}
        </span>
        <span style={{ color: "#475569", fontSize: 12 }}>{item.difficulty} • {item.ideal_time_seconds}s</span>
      </div>

      <div style={{ color: "white", fontSize: 17, lineHeight: 1.8, marginBottom: 20 }}>
        <MathText text={item.question_text} />
      </div>

      {isGridIn ? (
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: 16 }}>
          <p style={{ color: "#94a3b8", fontSize: 13 }}>Grid-In Question — Student enters numeric answer</p>
          {item.numeric_answer && <p style={{ color: "#f59e0b", fontSize: 16, marginTop: 8 }}>Answer: {item.numeric_answer}</p>}
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {options.map(opt => {
            const isSelected = studentAnswer?.answer === opt.value;
            const isCorrect = item.correct_answer === opt.value;
            const showCorrect = studentAnswer && isCorrect;
            return (
              <div key={opt.value} style={{ padding: "12px 18px", borderRadius: 10, border: `1px solid ${showCorrect ? "#166534" : isSelected ? "#6366f1" : "#334155"}`, background: showCorrect ? "rgba(34,197,94,0.1)" : isSelected ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.03)", color: "#e2e8f0", display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ fontWeight: 700, color: showCorrect ? "#22c55e" : isSelected ? "#818cf8" : "#64748b", minWidth: 20 }}>{opt.label})</span>
                <MathText text={opt.text} />
              </div>
            );
          })}
        </div>
      )}

      {studentAnswer && item.trap_type && (
        <div style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 10, padding: 14, marginTop: 12 }}>
          <div style={{ color: "#94a3b8", fontSize: 11, fontWeight: 700, marginBottom: 4 }}>TRAP TYPE</div>
          <div style={{ color: "#fcd34d", fontSize: 13 }}>⚠️ {item.trap_type}</div>
        </div>
      )}
    </>
  );
}

function SATTestView({ item, sessionId, sessionData, timerActive, secondsLeft, onStartTimer, onStopTimer, db }) {
  const [diagIndex, setDiagIndex] = useState(0);
  const questions = item.data?.questions || [];
  const q = questions[diagIndex];
  if (!q) return null;

  const answerKey = `test_${item.id}_${diagIndex}`;
  const studentAnswer = sessionData?.answers?.[answerKey];
  const options = [
    { label: "A", value: "A", text: q.option_a },
    { label: "B", value: "B", text: q.option_b },
    { label: "C", value: "C", text: q.option_c },
    { label: "D", value: "D", text: q.option_d },
  ].filter(o => o.text);

  const pushDiagIndex = async (idx) => {
    setDiagIndex(idx);
    await setDoc(doc(db, "sessions", sessionId), { diagIndex: idx }, { merge: true });
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <span style={{ padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: item.type === "diagnostic" ? "#4c0519" : "#1e1b4b", color: item.type === "diagnostic" ? "#fda4af" : "#a5b4fc" }}>
          {item.type === "diagnostic" ? "🔍 Diagnostic" : "🏁 Final"} — Q{diagIndex + 1}/{questions.length}
        </span>
        <span style={{ color: "#64748b", fontSize: 13 }}>{q.concept} • {q.difficulty}</span>
      </div>

      <div style={{ color: "white", fontSize: 17, lineHeight: 1.8, marginBottom: 20 }}>
        <MathText text={q.question_text} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {options.map(opt => {
          const isSelected = studentAnswer?.answer === opt.value;
          const isCorrect = q.correct_answer === opt.value;
          const showCorrect = studentAnswer && isCorrect;
          return (
            <div key={opt.value} style={{ padding: "12px 18px", borderRadius: 10, border: `1px solid ${showCorrect ? "#166534" : isSelected ? "#6366f1" : "#334155"}`, background: showCorrect ? "rgba(34,197,94,0.1)" : isSelected ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.03)", color: "#e2e8f0", display: "flex", gap: 12 }}>
              <span style={{ fontWeight: 700, color: showCorrect ? "#22c55e" : isSelected ? "#818cf8" : "#64748b", minWidth: 20 }}>{opt.label})</span>
              <MathText text={opt.text} />
            </div>
          );
        })}
      </div>

      {studentAnswer && (
        <div style={{ background: studentAnswer.answer === q.correct_answer ? "rgba(34,197,94,0.08)" : "rgba(239,68,68,0.08)", border: `1px solid ${studentAnswer.answer === q.correct_answer ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"}`, borderRadius: 10, padding: 14, marginTop: 12 }}>
          <div style={{ color: studentAnswer.answer === q.correct_answer ? "#22c55e" : "#ef4444", fontWeight: 600 }}>
            {studentAnswer.answer === q.correct_answer ? "✓ Correct" : `✗ Incorrect — Correct answer: ${q.correct_answer}`}
          </div>
          {q.trap_type && <div style={{ color: "#fcd34d", fontSize: 13, marginTop: 6 }}>⚠️ Trap: {q.trap_type}</div>}
        </div>
      )}

      <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
        <button onClick={() => pushDiagIndex(Math.max(0, diagIndex - 1))} disabled={diagIndex === 0}
          style={{ padding: "10px 22px", background: "#1e293b", color: "white", border: "1px solid #334155", borderRadius: 8, cursor: "pointer", opacity: diagIndex === 0 ? 0.4 : 1 }}>← Prev</button>
        {!timerActive
          ? <button onClick={() => onStartTimer(q.ideal_time_seconds || 90)}
              style={{ padding: "10px 22px", background: "#4f46e5", color: "white", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600 }}>⏱ Start Timer</button>
          : <div style={{ background: "#7c3aed", color: "white", padding: "10px 20px", borderRadius: 8, fontWeight: 700, fontSize: 16, display: "flex", alignItems: "center" }}>
              ⏱ {secondsLeft}s <button onClick={onStopTimer} style={{ marginLeft: 8, background: "none", border: "none", color: "#f87171", cursor: "pointer" }}>■</button>
            </div>
        }
        <button onClick={() => pushDiagIndex(Math.min(questions.length - 1, diagIndex + 1))} disabled={diagIndex === questions.length - 1}
          style={{ padding: "10px 22px", background: "#1e293b", color: "white", border: "1px solid #334155", borderRadius: 8, cursor: "pointer", opacity: diagIndex === questions.length - 1 ? 0.4 : 1 }}>Next →</button>
      </div>
    </>
  );
}

const styles = {
  center: { minHeight: "100vh", background: "#0a0f1e", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Segoe UI', sans-serif" },
  startCard: { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "48px 56px", textAlign: "center", color: "white" },
  logoRow: { display: "flex", alignItems: "center", gap: 10, marginBottom: 20, justifyContent: "center" },
  logoIcon: { width: 40, height: 40, borderRadius: 10, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14, color: "white" },
  logoName: { fontSize: 20, fontWeight: 800, color: "white" },
  bigBtn: { padding: "14px 48px", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "white", fontWeight: 700, fontSize: 16, border: "none", borderRadius: 12, cursor: "pointer" },
  container: { minHeight: "100vh", background: "#0a0f1e", fontFamily: "'Segoe UI', sans-serif", display: "flex", flexDirection: "column" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px", borderBottom: "1px solid #1e293b" },
  sessionBadge: { background: "#1e293b", color: "#94a3b8", padding: "6px 14px", borderRadius: 8, fontSize: 13 },
  desmosBtn: { padding: "6px 14px", background: "#1e3a5f", color: "#60a5fa", border: "1px solid #1e40af", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600 },
  endBtn: { padding: "6px 14px", background: "#7f1d1d", color: "#fca5a5", border: "1px solid #991b1b", borderRadius: 8, cursor: "pointer", fontSize: 13 },
  body: { display: "flex", flex: 1, overflow: "hidden" },
  sidebar: { width: 220, background: "#060b14", borderRight: "1px solid #1e293b", padding: 12, overflowY: "auto" },
  sideItem: { padding: "8px 10px", borderRadius: 6, marginBottom: 3, cursor: "pointer" },
  main: { flex: 1, padding: 24, overflowY: "auto" },
  contentCard: { background: "#1e293b", borderRadius: 16, padding: 28 },
  badge: { padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, display: "inline-block" },
  navBtn: { padding: "10px 22px", background: "#1e293b", color: "white", border: "1px solid #334155", borderRadius: 8, cursor: "pointer", fontSize: 14 },
  timerStartBtn: { padding: "10px 22px", background: "#4f46e5", color: "white", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600 },
  timerRunning: { background: "#7c3aed", color: "white", padding: "10px 20px", borderRadius: 8, fontWeight: 700, fontSize: 16, display: "flex", alignItems: "center" },
  rightPanel: { width: 240, background: "#060b14", borderLeft: "1px solid #1e293b", padding: 16, overflowY: "auto" },
  studentStatus: { background: "#1e293b", borderRadius: 10, padding: "10px 14px", marginBottom: 12, display: "flex", alignItems: "center" },
  answerCard: { background: "#1e293b", borderRadius: 10, padding: 14, marginBottom: 10 },
  waitingCard: { background: "#1e293b", borderRadius: 10, padding: 14, textAlign: "center" }
};