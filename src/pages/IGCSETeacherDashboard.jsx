import { useState, useEffect, useRef } from "react";
import { db } from "../firebase";
import { doc, setDoc, onSnapshot, serverTimestamp, getDoc } from "firebase/firestore";
import MathText from "../components/MathText";
import DesmosModal from "../components/DesmosModal";
import { TeacherTestView } from "../components/TestView";

export default function IGCSETeacherDashboard({ user, chapter, onBack }) {
  const [sessionId, setSessionId] = useState(null);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [sequence, setSequence] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionData, setSessionData] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [showDesmos, setShowDesmos] = useState(false);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef(null);

  // Build sequence from chapter data
 useEffect(() => {
  const buildSequence = async () => {
    setLoading(true);
    const seq = [];
    const allQuestions = await loadQuestions(chapter.id);

    console.log(`Loaded ${allQuestions.length} questions for ${chapter.id}`);

    // Sort questions by difficulty
    const diffOrder = { easy: 0, medium: 1, hard: 2, very_hard: 3 };
    const sorted = [...allQuestions].sort((a, b) =>
      (diffOrder[a.difficulty] || 0) - (diffOrder[b.difficulty] || 0)
    );

    const easyQs = sorted.filter(q => q.difficulty === "easy");
    const mediumQs = sorted.filter(q => q.difficulty === "medium");
    const hardQs = sorted.filter(q => q.difficulty === "hard");
    const veryHardQs = sorted.filter(q => q.difficulty === "very_hard");

    console.log(`Easy: ${easyQs.length}, Medium: ${mediumQs.length}, Hard: ${hardQs.length}, VeryHard: ${veryHardQs.length}`);

    // ── Diagnostic Test (mix of easy + medium) ────────────────────
    if (allQuestions.length > 0) {
      const diagQs = [
        ...easyQs.slice(0, 2),
        ...mediumQs.slice(0, 2)
      ].slice(0, 4);
      seq.push({
        id: "diagnostic",
        type: "diagnostic",
        title: "Diagnostic Test",
        data: { questions: diagQs, timeLimit: 600 }
      });
    }

    // ── Theory + Questions per topic ──────────────────────────────
    if (chapter.topics) {
      // Pool of questions to distribute — easy/medium for practice
      const practicePool = [...easyQs, ...mediumQs];
      let practiceIdx = 0;

      chapter.topics.forEach((topic) => {
        const subtopics = topic.subtopics || [];

        // Add theory slides (skip empty examples)
       const seenTitles = new Set(seq.map(s => s.title));
        subtopics.forEach(slide => {
        if (slide.type === "example") return;
        if (!slide.content || slide.content.length < 20) return;
        if (seenTitles.has(slide.title)) return; // skip duplicates
        seenTitles.add(slide.title);
        seq.push({ ...slide, conceptTitle: topic.topicName });
        });

        // Add 2 practice questions after each topic's theory
        const topicPractice = practicePool.slice(practiceIdx, practiceIdx + 2);
        practiceIdx += 2;
        topicPractice.forEach(q => seq.push({
          ...q,
          type: "question",
          kind: "question",
          conceptTitle: topic.topicName
        }));
      });
    }

    // ── Final Test (hard + very hard) ─────────────────────────────
    if (allQuestions.length > 0) {
      const finalQs = [
        ...hardQs.slice(0, 3),
        ...veryHardQs.slice(0, 2)
      ].slice(0, 5);

      // Fallback if not enough hard questions
      const finalFallback = finalQs.length < 3
        ? sorted.slice(-5)
        : finalQs;

      seq.push({
        id: "final",
        type: "final",
        title: "Final Assessment",
        data: { questions: finalFallback, timeLimit: 600 }
      });
    }

    console.log(`Built sequence of ${seq.length} items`);
    setSequence(seq);
    setLoading(false);
  };
  buildSequence();
}, [chapter]);

  const loadQuestions = async (chapterId) => {
    try {
      const snap = await getDoc(doc(db, "curricula", "igcse", "chapters", chapterId, "questions", "all"));
      return snap.exists() ? (snap.data().questions || []) : [];
    } catch (e) {
      console.error("Failed to load questions:", e);
      return [];
    }
  };

const startSession = async () => {
  const id = Math.random().toString(36).substr(2, 6).toUpperCase();
  setSessionId(id);
  await setDoc(doc(db, "sessions", id), {
    teacherId: user.uid,
    teacherEmail: user.email,
    currentIndex: 0,
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
  const isQ = (item?.type === "question") || (item?.kind === "question");
  const isTst = (item?.type === "diagnostic") || (item?.type === "final");
  await setDoc(doc(db, "sessions", sessionId), {
    currentIndex: index,
    diagIndex: 0,
    timerActive: false,
    isQuestion: isQ,
    isTest: isTst,
    showDesmos: isQ || isTst,
    currentSlideType: item?.type || "theory",
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
    <div style={styles.center}>
      <div style={{ color: "white", fontSize: 16 }}>Loading chapter content...</div>
    </div>
  );

  if (!sessionStarted) return (
    <div style={styles.center}>
      <div style={styles.startCard}>
        <div style={styles.logoRow}>
          <div style={styles.logoIcon}>CF</div>
          <div style={styles.logoName}>ClassFlow</div>
        </div>
        <h2 style={{ color: "white", marginBottom: 8 }}>
          {chapter.title || chapter.id}
        </h2>
        <p style={{ color: "#64748b", marginBottom: 8 }}>AS Level Maths — Edexcel</p>
        <p style={{ color: "#475569", fontSize: 13, marginBottom: 32 }}>
          {sequence.length} slides loaded
        </p>
        <button onClick={startSession} style={styles.bigBtn}>🚀 Start Session</button>
        <p style={{ color: "#475569", fontSize: 12, marginTop: 16, cursor: "pointer" }}
          onClick={onBack}>← Back to chapters</p>
      </div>
    </div>
  );

  const item = sequence[currentIndex];
  if (!item) return null;

  const isTest = item.type === "diagnostic" || item.type === "final";
  const isQuestion = item.type === "question" || item.kind === "question";
  const showDesmosBtn = isTest || isQuestion;
  const answerKey = `slide_${currentIndex}`;
  const studentAnswer = sessionData?.answers?.[answerKey];

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={styles.logoIcon}>CF</div>
          <span style={{ color: "white", fontWeight: 700 }}>ClassFlow</span>
          <span style={{ color: "#475569", fontSize: 13 }}>AS Maths — {chapter.title || chapter.id}</span>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={styles.sessionBadge}>Session: <strong style={{ color: "#818cf8" }}>{sessionId}</strong></div>
          {showDesmosBtn && <button onClick={() => setShowDesmos(true)} style={styles.desmosBtn}>📐 Desmos</button>}
          <button onClick={endSession} style={styles.endBtn}>End Session</button>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 3, background: "#1e293b" }}>
        <div style={{ height: "100%", width: `${(currentIndex / Math.max(sequence.length - 1, 1)) * 100}%`, background: "linear-gradient(90deg, #6366f1, #8b5cf6)", transition: "width 0.4s" }} />
      </div>

      <div style={styles.body}>
        {/* Sidebar */}
        <div style={styles.sidebar}>
          <div style={{ color: "#475569", fontSize: 11, fontWeight: 700, marginBottom: 12, textTransform: "uppercase", letterSpacing: 1 }}>Session Content</div>
          {sequence.map((s, i) => {
            const isActive = i === currentIndex;
            const typeColor = s.type === "theory" ? "#10b981" : s.type === "example" ? "#f59e0b" : (s.type === "question" || s.kind === "question") ? "#6366f1" : "#ec4899";
            return (
              <div key={i} onClick={() => pushItem(i)} style={{ ...styles.sideItem, background: isActive ? "rgba(99,102,241,0.15)" : "transparent", borderLeft: `3px solid ${isActive ? "#6366f1" : typeColor}` }}>
                <div style={{ fontSize: 10, color: typeColor, textTransform: "uppercase", fontWeight: 700 }}>
                  {s.type === "diagnostic" ? "Diagnostic" : s.type === "final" ? "Final Test" : s.type}
                </div>
                <div style={{ color: isActive ? "white" : "#94a3b8", fontSize: 12, marginTop: 2 }}>
                   {s.type === "question" || s.kind === "question"
                   ? (s.question ? s.question.replace(/\$[^$]*\$/g, "").replace(/\s+/g, " ").trim().slice(0, 45) + "..." : "Question")
                   : s.title || s.topic || "Slide"}
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
              <IGCSETestView item={item} sessionId={sessionId} sessionData={sessionData}
                timerActive={timerActive} secondsLeft={secondsLeft}
                onStartTimer={startTimer} onStopTimer={stopTimer} db={db} />
            )}

            {/* Theory / Example */}
            {(item.type === "theory" || item.type === "example") && (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <span style={{ ...styles.badge, background: item.type === "theory" ? "#064e3b" : "#422006", color: item.type === "theory" ? "#6ee7b7" : "#fcd34d" }}>
                    {item.type === "theory" ? "📖 Theory" : "✏️ Example"}
                  </span>
                  <span style={{ color: "#475569", fontSize: 12 }}>{item.conceptTitle}</span>
                </div>
                <h2 style={{ color: "white", fontSize: 20, marginBottom: 16 }}>{item.title}</h2>
                <div style={{ color: "#cbd5e1", lineHeight: 1.8 }}>
                  <MathText text={item.content} />
                </div>
                {item.formula && (
                  <div style={styles.formulaBox}>
                    <MathText text={`$$${item.formula}$$`} />
                  </div>
                )}
                {item.keyPoints?.length > 0 && (
                  <div style={styles.keyPoints}>
                    <div style={{ color: "#64748b", fontSize: 11, fontWeight: 700, marginBottom: 8, textTransform: "uppercase" }}>Key Points</div>
                    {item.keyPoints.map((p, i) => (
                      <div key={i} style={{ color: "#e2e8f0", marginBottom: 6, display: "flex", gap: 8 }}>
                        <span style={{ color: "#6366f1" }}>•</span><MathText text={p} />
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Practice question */}
            {isQuestion && !isTest && (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <span style={{ ...styles.badge, background: "#1e1b4b", color: "#a5b4fc" }}>🧩 Practice Question</span>
                  <span style={{ color: "#475569", fontSize: 12 }}>{item.difficulty} • {item.marks} marks</span>
                </div>
                <div style={{ color: "white", fontSize: 17, lineHeight: 1.8, marginBottom: 16 }}>
                  <MathText text={item.question} />
                </div>
                {item.parts?.map((part, i) => (
                  <div key={i} style={styles.partBox}>
                    <span style={{ color: "#6366f1", fontWeight: 700, marginRight: 8 }}>({part.part})</span>
                    <MathText text={part.question} style={{ color: "#cbd5e1" }} />
                    <span style={{ color: "#475569", fontSize: 12, marginLeft: 8 }}>[{part.marks} marks]</span>
                  </div>
                ))}
                {studentAnswer && (
                  <div style={styles.studentAnswerBox}>
                    <div style={{ color: "#94a3b8", fontSize: 11, marginBottom: 4 }}>Student's answer</div>
                    <div style={{ color: "white", fontSize: 16 }}>{studentAnswer.answer}</div>
                  </div>
                )}
                {item.answer && (
                  <div style={styles.explanationBox}>
                    <div style={{ color: "#94a3b8", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>MODEL ANSWER</div>
                    <MathText text={item.answer} style={{ color: "#cbd5e1", fontSize: 13, lineHeight: 1.7 }} />
                  </div>
                )}
              </>
            )}

            {/* Navigation */}
            <div style={{ display: "flex", gap: 12, marginTop: 24, justifyContent: "center" }}>
              <button onClick={() => pushItem(Math.max(0, currentIndex - 1))}
                style={{ ...styles.navBtn, opacity: currentIndex === 0 ? 0.4 : 1 }}>← Previous</button>
              {(isQuestion || isTest) && (
                !timerActive
                  ? <button onClick={() => startTimer(item.timeLimit || 180)} style={styles.timerStartBtn}>⏱ Start Timer</button>
                  : <div style={styles.timerRunning}>⏱ {secondsLeft}s <button onClick={stopTimer} style={{ marginLeft: 8, background: "none", border: "none", color: "#f87171", cursor: "pointer" }}>■</button></div>
              )}
              <button onClick={() => pushItem(Math.min(sequence.length - 1, currentIndex + 1))}
                style={{ ...styles.navBtn, opacity: currentIndex === sequence.length - 1 ? 0.4 : 1 }}>Next →</button>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div style={styles.rightPanel}>
          <div style={{ color: "#475569", fontSize: 11, fontWeight: 700, marginBottom: 16, textTransform: "uppercase" }}>Student Activity</div>
          <div style={styles.studentStatus}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: sessionData?.studentOnline ? "#22c55e" : "#475569", marginRight: 8 }} />
            <span style={{ color: "white", fontSize: 13 }}>{sessionData?.studentOnline ? "Student Online" : "Waiting..."}</span>
          </div>
          {studentAnswer ? (
            <div style={styles.answerCard}>
              <div style={{ color: "#94a3b8", fontSize: 11, marginBottom: 6 }}>Student answered</div>
              <div style={{ color: "white", fontSize: 16 }}>{studentAnswer.answer}</div>
            </div>
          ) : (
            <div style={styles.waitingCard}>
              <span style={{ color: "#475569", fontSize: 13 }}>
                {isQuestion || isTest ? "Waiting for answer..." : "Student viewing content"}
              </span>
            </div>
          )}
        </div>
      </div>

      <DesmosModal isOpen={showDesmos} onClose={() => setShowDesmos(false)} />
    </div>
  );
}
 function IGCSETestView({ item, sessionId, sessionData, timerActive, secondsLeft, onStartTimer, onStopTimer, db }) {
  return (
    <TeacherTestView
      item={item}
      sessionId={sessionId}
      sessionData={sessionData}
      timerActive={timerActive}
      secondsLeft={secondsLeft}
      onStartTimer={onStartTimer}
      onStopTimer={onStopTimer}
      questionField="question"
      optionFields={["option_a","option_b","option_c","option_d"]}
      correctField="correct_answer"
    />
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
  badge: { padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600 },
  formulaBox: { background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 10, padding: "16px 20px", margin: "16px 0", textAlign: "center" },
  keyPoints: { background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: 16, marginTop: 12 },
  partBox: { padding: "10px 16px", background: "rgba(255,255,255,0.03)", borderRadius: 8, marginBottom: 8, display: "flex", alignItems: "flex-start", flexWrap: "wrap" },
  studentAnswerBox: { background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.3)", borderRadius: 10, padding: 14, marginTop: 12 },
  explanationBox: { background: "rgba(34,197,94,0.07)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 10, padding: 14, marginTop: 12 },
  navBtn: { padding: "10px 22px", background: "#1e293b", color: "white", border: "1px solid #334155", borderRadius: 8, cursor: "pointer", fontSize: 14 },
  timerStartBtn: { padding: "10px 22px", background: "#4f46e5", color: "white", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600 },
  timerRunning: { background: "#7c3aed", color: "white", padding: "10px 20px", borderRadius: 8, fontWeight: 700, fontSize: 16, display: "flex", alignItems: "center" },
  rightPanel: { width: 240, background: "#060b14", borderLeft: "1px solid #1e293b", padding: 16, overflowY: "auto" },
  studentStatus: { background: "#1e293b", borderRadius: 10, padding: "10px 14px", marginBottom: 12, display: "flex", alignItems: "center" },
  answerCard: { background: "#1e293b", borderRadius: 10, padding: 14, marginBottom: 10 },
  waitingCard: { background: "#1e293b", borderRadius: 10, padding: 14, textAlign: "center" }
};