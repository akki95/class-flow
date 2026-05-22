import { useState, useEffect, useRef } from "react";
import { db } from "../firebase";
import { doc, setDoc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { supabase } from "../supabase";
import MathText from "../components/MathText";
import DesmosPanel from "../components/DesmosPanel";
import Whiteboard from "../components/Whiteboard";
import { TeacherTestView } from "../components/TestView";
import theoryBaseline from "../data/theory_baseline.json";

export default function SATTeacherDashboard({ user, chapter, lesson, onBack }) {
  const [sessionId, setSessionId] = useState(null);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [sequence, setSequence] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionData, setSessionData] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [expandedGroups, setExpandedGroups] = useState({});
  const [showDesmos, setShowDesmos] = useState(false);
  const [whiteboardActive, setWhiteboardActive] = useState(false);
  const [presentationMode, setPresentationMode] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    const loadQuestions = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("questions")
        .select("*")
        .in("concept", lesson.subtopics)
        .order("difficulty", { ascending: true });
      if (error) { console.error(error); setLoading(false); return; }
      setQuestions(data || []);
      buildSequence(data || []);
      setLoading(false);
    };
    loadQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson]);

  const buildSequence = (qs) => {
    const seq = [];
    const byDiff = (d) => qs.filter(q => q.difficulty === d);
    const easy = byDiff("easy");
    const medium = byDiff("medium");

    const diagQs = [...easy.slice(0, 2), ...medium.slice(0, 2)].slice(0, 4);
    if (diagQs.length > 0) {
      seq.push({
        id: "diagnostic",
        type: "diagnostic",
        title: "Diagnostic Test",
        data: { questions: diagQs, timeLimit: 600 },
        conceptTitle: lesson.title
      });
    }

    const bySubtopic = {};
    qs.forEach(q => {
      if (!bySubtopic[q.concept]) bySubtopic[q.concept] = [];
      bySubtopic[q.concept].push(q);
    });

    lesson.subtopics.forEach(subtopic => {
      if (bySubtopic[subtopic]) {
        const matchingTheory = theoryBaseline.find(t => t.subtopic === subtopic)?.content || `This section covers **${subtopic}**.`;
        seq.push({ id: `theory_${subtopic}`, type: "theory", title: subtopic, content: matchingTheory, conceptTitle: lesson.title });
        bySubtopic[subtopic].slice(0, 3).forEach(q => seq.push({ ...q, type: "question", kind: "question", conceptTitle: subtopic }));
      }
    });

    seq.push({ id: "complete", type: "complete", title: "Session Complete", content: "Great job! The lesson is now complete." });

    setSequence(seq);
  };

  const startSession = async () => {
    const id = Math.random().toString(36).substr(2, 6).toUpperCase();
    setSessionId(id);
    await setDoc(doc(db, "sessions", id), {
      teacherId: user.uid,
      teacherEmail: user.email,
      currentIndex: 0,
      status: "active", curriculum: "sat", chapter: chapter.id, lesson: lesson.id,
      createdAt: serverTimestamp(), answers: {}, timerActive: false
    });
    setSessionStarted(true);
  };

  useEffect(() => {
    if (!sessionId) return;
    return onSnapshot(doc(db, "sessions", sessionId), snap => setSessionData(snap.data()));
  }, [sessionId]);

  const pushItem = async (index) => {
    if (index < 0 || index >= sequence.length) return;
    setCurrentIndex(index);
    stopTimer();
    const item = sequence[index];
    const isQ = item?.type === "question";
    const isTst = item?.kind === "diagnostic";
    await setDoc(doc(db, "sessions", sessionId), {
      currentIndex: index, diagIndex: 0, timerActive: false,
      isQuestion: isQ, isTest: isTst,
      currentSlideType: item?.type,
      currentSlideData: item || null,
      whiteboardData: [] // Clear whiteboard on slide change
    }, { merge: true });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!sessionStarted) return;
      if (e.key === "ArrowRight") {
        pushItem(currentIndex + 1);
      } else if (e.key === "ArrowLeft") {
        pushItem(currentIndex - 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, sequence, sessionStarted]);

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
    await setDoc(doc(db, "sessions", sessionId), { status: "ended", endedAt: serverTimestamp() }, { merge: true });
    onBack();
  };

  const saveNotes = async () => {
    if (!sessionId || !sessionData) return;
    const currentNotes = sessionData.savedNotes || {};
    currentNotes[`slide_${currentIndex}`] = sessionData.whiteboardData || [];
    await setDoc(doc(db, "sessions", sessionId), { savedNotes: currentNotes }, { merge: true });
    alert("Notes saved for this slide!");
  };

  // Group sequence for sidebar
  const buildSidebarGroups = () => {
    const groups = [];
    let current = null;
    sequence.forEach((item, idx) => {
      if (item.type === "theory" || item.type === "complete") {
        current = { label: item.title, type: item.id === "diagnostic_intro" ? "diagnostic" : "concept", items: [{ ...item, idx }] };
        groups.push(current);
      } else if (item.type === "question" && current) {
        current.items.push({ ...item, idx });
      }
    });
    return groups;
  };

  const sidebarGroups = buildSidebarGroups();

  if (loading) return (
    <div style={ls.center}>
      <div style={ls.loadingCard}>
        <div style={ls.cfBadge}>CF</div>
        <div style={{ color: "#1e293b", fontWeight: 600, marginTop: 12 }}>Loading {chapter.title}...</div>
        <div style={{ color: "#94a3b8", fontSize: 13, marginTop: 4 }}>Fetching questions from database</div>
      </div>
    </div>
  );

  if (!sessionStarted) return (
    <div style={ls.center}>
      <div style={ls.startCard}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <div style={ls.cfBadge}>CF</div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#0f172a" }}>ScoreQuanta</div>
            <div style={{ fontSize: 12, color: "#94a3b8" }}>SAT Preparation</div>
          </div>
        </div>
        <div style={{ background: "#f8fafc", borderRadius: 12, padding: "20px 24px", marginBottom: 24 }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>{lesson.title}</div>
          <div style={{ color: "#64748b", fontSize: 14 }}>{chapter.title} ({chapter.section === "math" ? "📐 Math" : "📖 Verbal"}) • {questions.length} questions loaded</div>
          <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
            {["easy", "medium", "hard"].map(d => {
              const count = questions.filter(q => q.difficulty === d).length;
              return count > 0 ? (
                <span key={d} style={{ padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 500, background: d === "easy" ? "#dcfce7" : d === "medium" ? "#fef9c3" : "#fee2e2", color: d === "easy" ? "#166534" : d === "medium" ? "#854d0e" : "#991b1b" }}>
                  {count} {d}
                </span>
              ) : null;
            })}
          </div>
        </div>
        <button onClick={startSession} style={ls.startBtn}>Start Session →</button>
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <span style={{ color: "#94a3b8", fontSize: 13, cursor: "pointer" }} onClick={onBack}>← Back to chapters</span>
        </div>
      </div>
    </div>
  );

  const item = sequence[currentIndex];
  if (!item) return null;
  const isTest = item.type === "diagnostic" || item.type === "final";
  const isQuestion = item.type === "question";
  const answerKey = `slide_${currentIndex}`;
  const studentAnswer = sessionData?.answers?.[answerKey];
  const progress = Math.round((currentIndex / Math.max(sequence.length - 1, 1)) * 100);

  return (
    <div style={ls.shell}>
      {/* Top bar */}
      <div style={ls.topbar}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={ls.cfBadge}>CF</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#0f172a" }}>ScoreQuanta</div>
            <div style={{ fontSize: 12, color: "#94a3b8" }}>SAT — {chapter.title}</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Progress */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#f1f5f9", borderRadius: 8, padding: "6px 14px" }}>
            <div style={{ width: 80, height: 4, background: "#e2e8f0", borderRadius: 2 }}>
              <div style={{ height: "100%", width: `${progress}%`, background: "#6366f1", borderRadius: 2, transition: "width 0.4s" }} />
            </div>
            <span style={{ fontSize: 12, color: "#64748b", fontWeight: 500 }}>{progress}%</span>
          </div>
          {/* Session ID */}
          <div style={ls.sessionChip}>
            <span style={{ fontSize: 11, color: "#94a3b8" }}>SESSION</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#6366f1", letterSpacing: 1 }}>{sessionId}</span>
          </div>
          {/* Timer */}
          {timerActive && (
            <div style={{ ...ls.timerChip, color: secondsLeft < 15 ? "#ef4444" : "#6366f1", borderColor: secondsLeft < 15 ? "#fee2e2" : "#e0e7ff" }}>
              ⏱ {secondsLeft}s
            </div>
          )}
          <button onClick={endSession} style={ls.endBtn}>End Session</button>
        </div>
      </div>

      <div style={ls.body}>
        {/* Sidebar */}
        {!presentationMode && (
        <div style={ls.sidebar}>
          <div style={{ padding: "16px 16px 8px", fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1 }}>
            Session Plan
          </div>
          <div style={{ overflowY: "auto", flex: 1 }}>
            {sidebarGroups.map((group, gi) => {
              const isSpecial = group.type === "diagnostic" || group.type === "final";
              const isExpanded = expandedGroups[gi] !== false;
              const hasActive = group.items.some(item => item.idx === currentIndex);

              return (
                <div key={gi} style={{ marginBottom: 2 }}>
                  {/* Group header */}
                  <div
                    onClick={() => {
                      if (isSpecial) {
                        pushItem(group.items[0].idx);
                      } else {
                        setExpandedGroups(prev => ({ ...prev, [gi]: !isExpanded }));
                      }
                    }}
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 16px", cursor: "pointer", background: hasActive ? "#f0f0ff" : "transparent", borderLeft: hasActive ? "3px solid #6366f1" : "3px solid transparent", transition: "all 0.15s" }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 13 }}>
                        {group.type === "diagnostic" ? "🔍" : group.type === "final" ? "🏁" : "📘"}
                      </span>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 600, color: hasActive ? "#6366f1" : "#0f172a" }}>
                          {group.label.length > 28 ? group.label.slice(0, 28) + "..." : group.label}
                        </div>
                        {!isSpecial && (
                          <div style={{ fontSize: 11, color: "#94a3b8" }}>
                            {group.items.filter(i => i.type === "question").length} questions
                          </div>
                        )}
                      </div>
                    </div>
                    {!isSpecial && (
                      <span style={{ color: "#94a3b8", fontSize: 12 }}>{isExpanded ? "▾" : "▸"}</span>
                    )}
                  </div>

                  {/* Group items */}
                  {!isSpecial && isExpanded && group.items.map((gItem, ii) => {
                    const isActive = gItem.idx === currentIndex;
                    if (gItem.type === "theory") return null; // theory is the group header
                    return (
                      <div
                        key={ii}
                        onClick={() => pushItem(gItem.idx)}
                        style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 16px 6px 36px", cursor: "pointer", background: isActive ? "#f5f3ff" : "transparent", borderLeft: isActive ? "3px solid #6366f1" : "3px solid transparent" }}
                      >
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: isActive ? "#6366f1" : "#cbd5e1", flexShrink: 0 }} />
                        <span style={{ fontSize: 11, color: isActive ? "#4f46e5" : "#64748b", lineHeight: 1.3 }}>
                          {gItem.question_text?.replace(/\$[^$]*\$/g, "").trim().slice(0, 40)}...
                        </span>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
        )}

        {/* Main content */}
        <div style={ls.main}>
          {/* Teacher Toolbar */}
          <div style={{ position: "absolute", top: 20, right: 20, display: "flex", gap: 10, zIndex: 10 }}>
            <button onClick={() => setPresentationMode(!presentationMode)} style={{ ...ls.toolbarBtn, background: presentationMode ? "#4f46e5" : "white", color: presentationMode ? "white" : "#0f172a" }}>
              {presentationMode ? "🖥️ Exit Presentation" : "🖥️ Presentation"}
            </button>
            <button onClick={() => setShowDesmos(!showDesmos)} style={{ ...ls.toolbarBtn, background: showDesmos ? "#4f46e5" : "white", color: showDesmos ? "white" : "#0f172a" }}>
              📐 Desmos
            </button>
            <button onClick={() => setWhiteboardActive(!whiteboardActive)} style={{ ...ls.toolbarBtn, background: whiteboardActive ? "#6366f1" : "white", color: whiteboardActive ? "white" : "#0f172a", border: whiteboardActive ? "1px solid #6366f1" : "1px solid #e2e8f0" }}>
              ✏️ {whiteboardActive ? "Close Whiteboard" : "Whiteboard"}
            </button>
            {whiteboardActive && (
              <button onClick={saveNotes} style={{ ...ls.toolbarBtn, background: "#10b981", color: "white", border: "1px solid #10b981" }}>
                💾 Save Notes
              </button>
            )}
          </div>

          <Whiteboard sessionId={sessionId} isActive={whiteboardActive} />

          <div style={{ ...ls.contentWrap, maxWidth: presentationMode ? 1200 : 800 }}>

            {/* Breadcrumb */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 20, fontSize: 12, color: "#94a3b8" }}>
              <span>{chapter.title}</span>
              <span>›</span>
              <span style={{ color: "#6366f1", fontWeight: 500 }}>
                {isTest ? item.title : item.conceptTitle || item.title}
              </span>
              {isQuestion && <span style={{ background: "#f0f0ff", color: "#6366f1", padding: "2px 8px", borderRadius: 12, fontWeight: 500 }}>{item.difficulty}</span>}
            </div>

            {/* Content card */}
            <div style={ls.card}>

              {/* Test */}
              {isTest && (
                <TeacherTestView
                  item={item}
                  sessionId={sessionId}
                  sessionData={sessionData}
                  timerActive={timerActive}
                  secondsLeft={secondsLeft}
                  onStartTimer={startTimer}
                  onStopTimer={stopTimer}
                  questionField="question_text"
                  optionFields={["option_a","option_b","option_c","option_d"]}
                  correctField="correct_answer"
                />
              )}

              {/* Theory */}
              {(item.type === "theory" || item.type === "complete") && (
                <>
                  <div style={ls.slideTypeBadge(item.type === "complete" ? "#fef08a" : "#dcfce7", item.type === "complete" ? "#854d0e" : "#166534")}>
                    {item.type === "complete" ? "🏁 Session Complete" : "📖 Topic Introduction"}
                  </div>
                  <h1 style={ls.slideTitle}>{item.title}</h1>
                  <p style={{ color: "#64748b", lineHeight: 1.8, fontSize: 15 }}>
                    {item.content}
                  </p>
                </>
              )}

              {/* Question */}
              {isQuestion && (
                <>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <div style={ls.slideTypeBadge(item.kind === "diagnostic" ? "#fbcfe8" : "#f0f0ff", item.kind === "diagnostic" ? "#9d174d" : "#4f46e5")}>
                      {item.kind === "diagnostic" ? `🔍 Diagnostic Question (${item.testIndex}/${item.totalTestQuestions})` : "🧩 Practice Question"}
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      {item.trap_type && (
                        <span style={{ background: "#fef9c3", color: "#854d0e", padding: "3px 10px", borderRadius: 12, fontSize: 12 }}>
                          ⚠️ {item.trap_type}
                        </span>
                      )}
                      <span style={{ background: "#f1f5f9", color: "#64748b", padding: "3px 10px", borderRadius: 12, fontSize: 12 }}>
                        {item.ideal_time_seconds || 90}s suggested
                      </span>
                    </div>
                  </div>
                  <div style={{ fontSize: 17, color: "#0f172a", lineHeight: 1.8, marginBottom: 24 }}>
                    <MathText text={item.question_text || item.question} />
                  </div>
                  {/* Options */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {["A","B","C","D"].map(letter => {
                      const text = item[`option_${letter.toLowerCase()}`];
                      if (!text) return null;
                      const isCorrect = item.correct_answer === letter;
                      const isSelected = studentAnswer?.answer === letter;
                      const showResult = !!studentAnswer;
                      let bg = "#f8fafc", border = "#e2e8f0", labelBg = "#e2e8f0", labelColor = "#64748b";
                      if (showResult && isCorrect) { bg = "#f0fdf4"; border = "#bbf7d0"; labelBg = "#22c55e"; labelColor = "white"; }
                      else if (showResult && isSelected && !isCorrect) { bg = "#fef2f2"; border = "#fecaca"; labelBg = "#ef4444"; labelColor = "white"; }
                      else if (!showResult && isSelected) { bg = "#f5f3ff"; border = "#c4b5fd"; labelBg = "#6366f1"; labelColor = "white"; }
                      return (
                        <div key={letter} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "12px 16px", borderRadius: 10, border: `1.5px solid ${border}`, background: bg, transition: "all 0.2s" }}>
                          <span style={{ width: 24, height: 24, borderRadius: 6, background: labelBg, color: labelColor, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 12, flexShrink: 0 }}>{letter}</span>
                          <span style={{ color: "#0f172a", fontSize: 15, lineHeight: 1.6 }}><MathText text={text} /></span>
                          {showResult && isCorrect && <span style={{ marginLeft: "auto", color: "#22c55e", fontSize: 18 }}>✓</span>}
                          {showResult && isSelected && !isCorrect && <span style={{ marginLeft: "auto", color: "#ef4444", fontSize: 18 }}>✗</span>}
                        </div>
                      );
                    })}
                  </div>
                </>
              )}

              {/* Navigation */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 28, paddingTop: 20, borderTop: "1px solid #f1f5f9" }}>
                <button onClick={() => pushItem(Math.max(0, currentIndex - 1))}
                  disabled={currentIndex === 0}
                  style={{ ...ls.navBtn, opacity: currentIndex === 0 ? 0.4 : 1 }}>← Previous</button>
                <div style={{ flex: 1 }} />
                {isQuestion && (
                  !timerActive
                    ? <button onClick={() => startTimer(item.ideal_time_seconds || 90)} style={ls.timerBtn}>⏱ Start Timer</button>
                    : <div style={ls.timerRunning}>
                        <span>⏱ {secondsLeft}s</span>
                        <button onClick={stopTimer} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: 13, marginLeft: 8 }}>Stop</button>
                      </div>
                )}
                <button onClick={() => pushItem(Math.min(sequence.length - 1, currentIndex + 1))}
                  disabled={currentIndex === sequence.length - 1}
                  style={{ ...ls.nextBtn, opacity: currentIndex === sequence.length - 1 ? 0.4 : 1 }}>Next →</button>
              </div>
            </div>
          </div>
        </div>

        {/* Desmos Side Panel */}
        <DesmosPanel isOpen={showDesmos} onClose={() => setShowDesmos(false)} />

        {/* Right panel */}
        {!presentationMode && (
        <div style={ls.rightPanel}>
          {/* Student status */}
          <div style={ls.rightSection}>
            <div style={ls.rightLabel}>Student</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", background: sessionData?.studentOnline ? "#f0fdf4" : "#f8fafc", borderRadius: 10, border: `1px solid ${sessionData?.studentOnline ? "#bbf7d0" : "#e2e8f0"}` }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: sessionData?.studentOnline ? "#22c55e" : "#cbd5e1" }} />
              <span style={{ fontSize: 13, fontWeight: 500, color: sessionData?.studentOnline ? "#166534" : "#94a3b8" }}>
                {sessionData?.studentOnline ? "Connected" : "Waiting to join"}
              </span>
            </div>
            {!sessionData?.studentOnline && (
              <div style={{ marginTop: 10, padding: "10px 14px", background: "#f8fafc", borderRadius: 10, border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 4 }}>Share this code</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: "#6366f1", letterSpacing: 2 }}>{sessionId}</div>
                <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 4 }}>Student goes to classflow → Join session</div>
              </div>
            )}
          </div>

          {/* Answer */}
          {(isQuestion || isTest) && (
            <div style={ls.rightSection}>
              <div style={ls.rightLabel}>Response</div>
              {studentAnswer ? (
                <div style={{ padding: "14px", background: studentAnswer.answer === item.correct_answer ? "#f0fdf4" : "#fef2f2", borderRadius: 10, border: `1px solid ${studentAnswer.answer === item.correct_answer ? "#bbf7d0" : "#fecaca"}` }}>
                  <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 4 }}>Answered</div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: studentAnswer.answer === item.correct_answer ? "#22c55e" : "#ef4444" }}>
                    {studentAnswer.answer}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: studentAnswer.answer === item.correct_answer ? "#166534" : "#991b1b", marginTop: 4 }}>
                    {studentAnswer.answer === item.correct_answer ? "✓ Correct!" : `✗ Correct: ${item.correct_answer}`}
                  </div>
                </div>
              ) : (
                <div style={{ padding: "14px", background: "#f8fafc", borderRadius: 10, border: "1px solid #e2e8f0", textAlign: "center" }}>
                  <div style={{ fontSize: 24, marginBottom: 6 }}>⏳</div>
                  <div style={{ fontSize: 13, color: "#94a3b8" }}>Waiting for answer</div>
                </div>
              )}
            </div>
          )}

          {/* Session stats */}
          <div style={ls.rightSection}>
            <div style={ls.rightLabel}>Session</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={ls.statRow}>
                <span style={{ color: "#64748b", fontSize: 13 }}>Progress</span>
                <span style={{ fontWeight: 600, color: "#0f172a", fontSize: 13 }}>{currentIndex + 1} / {sequence.length}</span>
              </div>
              <div style={ls.statRow}>
                <span style={{ color: "#64748b", fontSize: 13 }}>Questions</span>
                <span style={{ fontWeight: 600, color: "#0f172a", fontSize: 13 }}>{questions.length} loaded</span>
              </div>
              <div style={ls.statRow}>
                <span style={{ color: "#64748b", fontSize: 13 }}>Chapter</span>
                <span style={{ fontWeight: 600, color: "#0f172a", fontSize: 13 }}>{chapter.section?.toUpperCase()}</span>
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}

// Light mode styles
const ls = {
  center: { minHeight: "100vh", background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', 'Segoe UI', sans-serif" },
  loadingCard: { textAlign: "center", padding: 40 },
  startCard: { background: "white", borderRadius: 20, padding: "40px 48px", width: 440, boxShadow: "0 4px 24px rgba(0,0,0,0.08)" },
  startBtn: { width: "100%", padding: "14px", background: "#6366f1", color: "white", border: "none", borderRadius: 12, fontWeight: 700, fontSize: 16, cursor: "pointer" },
  cfBadge: { width: 40, height: 40, borderRadius: 10, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14, color: "white", flexShrink: 0 },
  shell: { minHeight: "100vh", background: "#f8fafc", fontFamily: "'Inter', 'Segoe UI', sans-serif", display: "flex", flexDirection: "column" },
  topbar: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 24px", background: "white", borderBottom: "1px solid #f1f5f9", boxShadow: "0 1px 3px rgba(0,0,0,0.04)", flexShrink: 0, zIndex: 10 },
  sessionChip: { display: "flex", flexDirection: "column", alignItems: "center", background: "#f5f3ff", borderRadius: 8, padding: "4px 12px", border: "1px solid #e0e7ff" },
  timerChip: { padding: "6px 14px", borderRadius: 8, border: "1.5px solid", fontWeight: 700, fontSize: 16, background: "white" },
  endBtn: { padding: "7px 16px", background: "#fef2f2", color: "#ef4444", border: "1px solid #fecaca", borderRadius: 8, cursor: "pointer", fontWeight: 600, fontSize: 13 },
  body: { display: "flex", flex: 1, overflow: "hidden", height: "calc(100vh - 57px)" },
  sidebar: { width: 280, background: "white", borderRight: "1px solid #f1f5f9", display: "flex", flexDirection: "column" },
  main: { flex: 1, overflowY: "auto", position: "relative" },
  contentWrap: { maxWidth: 800, margin: "0 auto", padding: "40px" },
  card: { background: "white", borderRadius: 16, padding: "40px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)", border: "1px solid #f1f5f9" },
  rightPanel: { width: 300, background: "white", borderLeft: "1px solid #f1f5f9", padding: "20px" },
  rightSection: { marginBottom: 32 },
  rightLabel: { fontSize: 12, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 },
  statRow: { display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f8fafc" },
  navBtn: { padding: "10px 16px", background: "#f8fafc", color: "#64748b", border: "1px solid #e2e8f0", borderRadius: 8, fontWeight: 600, cursor: "pointer" },
  nextBtn: { padding: "10px 20px", background: "#6366f1", color: "white", border: "none", borderRadius: 8, fontWeight: 600, cursor: "pointer", boxShadow: "0 2px 4px rgba(99,102,241,0.2)" },
  timerBtn: { padding: "10px 16px", background: "#fef2f2", color: "#ef4444", border: "1px solid #fecaca", borderRadius: 8, fontWeight: 600, cursor: "pointer" },
  timerRunning: { display: "flex", alignItems: "center", background: "#fee2e2", color: "#ef4444", padding: "8px 16px", borderRadius: 8, fontWeight: 700 },
  toolbarBtn: { padding: "8px 16px", background: "white", color: "#0f172a", border: "1px solid #e2e8f0", borderRadius: 8, fontWeight: 600, cursor: "pointer", fontSize: 14, boxShadow: "0 1px 2px rgba(0,0,0,0.05)", display: "flex", alignItems: "center", gap: 6 },
  slideTypeBadge: (bg, color) => ({ display: "inline-block", padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: bg, color: color, marginBottom: 16 }),
  slideTitle: { fontSize: 24, fontWeight: 800, color: "#0f172a", marginBottom: 16 }
};