import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { useTheme } from "../context/ThemeContext";
import { computeMetrics, predictScore } from "../utils/metricsEngine";
import { generateReport, fallbackReport } from "../utils/reportGenerator";
import MathText from "../components/MathText";

// Use service key for inserts (read-only anon key won't allow writes)
const supabaseAdmin = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_SERVICE_KEY
);

const TOTAL_QUESTIONS = 12;
const TOTAL_TIME = 15 * 60; // 15 minutes in seconds

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function SATDiagnostic({ user }) {
  const { T } = useTheme();
  const navigate = useNavigate();

  // ── phases: loading | intro | test | submitting | email_gate | done ──
  const [phase, setPhase] = useState("loading");
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);

  // Per-question state
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [firstAnswer, setFirstAnswer] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [numericInput, setNumericInput] = useState("");

  // Timing
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [questionStartTime, setQuestionStartTime] = useState(null);
  const [firstInteractionTime, setFirstInteractionTime] = useState(null);
  const timerRef = useRef(null);

  // Collected answers
  const answersRef = useRef({});


  // Submitting
  const [submitStatus, setSubmitStatus] = useState("");
  const [attemptId, setAttemptId] = useState(null);

  // ── Load questions ───────────────────────────────────────────────────
  useEffect(() => {
    async function load() {
      try {
        const [easyRes, medRes, hardRes] = await Promise.all([
          supabaseAdmin.from("questions").select("*").in("section", ["math", "verbal"]).eq("difficulty", "easy").limit(30),
          supabaseAdmin.from("questions").select("*").in("section", ["math", "verbal"]).eq("difficulty", "medium").limit(30),
          supabaseAdmin.from("questions").select("*").in("section", ["math", "verbal"]).eq("difficulty", "hard").limit(30),
        ]);
        const easy   = shuffle(easyRes.data   || []).slice(0, 3);
        const medium = shuffle(medRes.data    || []).slice(0, 6);
        const hard   = shuffle(hardRes.data   || []).slice(0, 3);
        setQuestions(shuffle([...easy, ...medium, ...hard]));
        setPhase("intro");
      } catch (e) {
        console.error("Failed to load questions", e);
      }
    }
    load();
  }, []);

  // ── Global timer ─────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "test") return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current); handleSubmit(); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [phase]); // eslint-disable-line

  // ── Start test ────────────────────────────────────────────────────────
  const startTest = () => {
    setPhase("test");
    setQuestionStartTime(Date.now());
  };

  // ── Question navigation ───────────────────────────────────────────────
  const recordAndAdvance = useCallback(() => {
    const q = questions[currentIdx];
    if (!q) return;

    const now = Date.now();
    const timeTaken = questionStartTime ? (now - questionStartTime) / 1000 : 0;
    const startDelay = firstInteractionTime && questionStartTime
      ? (firstInteractionTime - questionStartTime) / 1000
      : 0;

    const isNumeric = q.numeric_answer != null;
    const finalAnswer = isNumeric ? numericInput : selectedAnswer;
    const isCorrect = isNumeric
      ? parseFloat(numericInput) === parseFloat(q.numeric_answer)
      : finalAnswer === q.correct_answer;
    const firstAnswerCorrect = isNumeric
      ? parseFloat(firstAnswer) === parseFloat(q.numeric_answer)
      : firstAnswer === q.correct_answer;

    let changeDirection = "none";
    if (firstAnswer && finalAnswer !== firstAnswer) {
      changeDirection = firstAnswerCorrect && !isCorrect ? "right_to_wrong"
        : !firstAnswerCorrect && isCorrect ? "wrong_to_right"
        : "none";
    }

    answersRef.current[q.id] = {
      question_id: q.id,
      selected_answer: isNumeric ? null : finalAnswer,
      correct: isCorrect,
      confidence_level: confidence || "medium",
      time_taken_seconds: timeTaken,
      start_delay_seconds: startDelay,
      answer_changed: !!(firstAnswer && finalAnswer !== firstAnswer),
      change_direction: changeDirection,
      numeric_distance_from_correct: isNumeric && q.numeric_answer != null
        ? Math.abs(parseFloat(numericInput || 0) - parseFloat(q.numeric_answer))
        : null,
    };

    if (currentIdx < TOTAL_QUESTIONS - 1) {
      setCurrentIdx(i => i + 1);
      setSelectedAnswer(null);
      setFirstAnswer(null);
      setConfidence(null);
      setNumericInput("");
      setQuestionStartTime(Date.now());
      setFirstInteractionTime(null);
    } else {
      handleSubmit();
    }
  }, [questions, currentIdx, selectedAnswer, firstAnswer, confidence, numericInput, questionStartTime, firstInteractionTime]); // eslint-disable-line

  // ── Submit ────────────────────────────────────────────────────────────
  const handleSubmit = useCallback(async () => {
    clearInterval(timerRef.current);
    setPhase("submitting");
    setSubmitStatus("Saving your answers…");

    try {
      // 1. Create attempt
      const { data: attempt, error: attemptErr } = await supabaseAdmin
        .from("test_attempts")
        .insert({ section_order: "math,verbal" })
        .select()
        .single();
      if (attemptErr) throw attemptErr;
      setAttemptId(attempt.id);

      // 2. Build response records (include any unanswered as blank)
      const records = questions.map(q => {
        const saved = answersRef.current[q.id];
        if (saved) return { ...saved, attempt_id: attempt.id };
        return {
          attempt_id: attempt.id,
          question_id: q.id,
          selected_answer: null,
          correct: false,
          confidence_level: "low",
          time_taken_seconds: 0,
          start_delay_seconds: 0,
          answer_changed: false,
          change_direction: "none",
          numeric_distance_from_correct: null,
        };
      });

      setSubmitStatus("Computing your metrics…");
      await supabaseAdmin.from("responses").insert(records);

      // 3. Compute metrics
      const metrics = computeMetrics(records, questions);
      const mathTotal   = questions.filter(q => q.section === "math").length;
      const verbalTotal = questions.filter(q => q.section === "verbal").length;
      const scores = predictScore(metrics, mathTotal, verbalTotal);

      // 4. Save derived_metrics
      await supabaseAdmin.from("derived_metrics").insert({
        attempt_id: attempt.id,
        ...metrics,
      });

      // 5. Update test_attempt
      await supabaseAdmin.from("test_attempts").update({
        raw_score: metrics.total_score,
        math_score: metrics.math_score,
        verbal_score: metrics.verbal_score,
        predicted_range: scores.predicted_range,
        score_ceiling: String(scores.score_ceiling),
      }).eq("id", attempt.id);

      // 6. Generate AI report async, then navigate to report page
      generateReport(metrics, scores)
        .catch(() => fallbackReport(metrics, scores))
        .then(async report => {
          await supabaseAdmin.from("test_attempts").update({
            ai_report: JSON.stringify(report),
          }).eq("id", attempt.id);
        });

      // Navigate immediately — report page polls until ready
      navigate(`/diagnostic/report/${attempt.id}`);

    } catch (err) {
      console.error("Submit error", err);
      setSubmitStatus("Something went wrong. Redirecting…");
      setTimeout(() => navigate("/diagnostic"), 2000);
    }
  }, [questions, navigate]); // eslint-disable-line


  // ── Helpers ───────────────────────────────────────────────────────────
  const formatTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  const q = questions[currentIdx];
  const isNumeric = q?.numeric_answer != null;
  const canAdvance = confidence && (isNumeric ? numericInput.trim() !== "" : selectedAnswer !== null);

  // ════════════════════════════════════════════════════════════════════
  // RENDER PHASES
  // ════════════════════════════════════════════════════════════════════

  if (phase === "loading") return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: T.dark, flexDirection: "column", gap: 16 }}>
      <div style={{ width: 40, height: 40, borderRadius: "50%", border: `3px solid ${T.green}`, borderTopColor: "transparent", animation: "spin 0.8s linear infinite" }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      <div style={{ color: T.sub, fontSize: 14 }}>Loading questions…</div>
    </div>
  );

  if (phase === "intro") return (
    <div style={{ background: T.dark, minHeight: "100vh", fontFamily: "'Inter','Segoe UI',sans-serif", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ maxWidth: 580, width: "100%", padding: "40px 24px", textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 20 }}>🎯</div>
        <h1 style={{ fontSize: 32, fontWeight: 900, color: T.text, margin: "0 0 14px" }}>SAT Diagnostic</h1>
        <p style={{ fontSize: 16, color: T.sub, lineHeight: 1.65, margin: "0 0 32px" }}>
          12 questions · 15 minutes · Mix of Math and Verbal<br />
          Answer every question and select your confidence level.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 32, textAlign: "left" }}>
          {[
            { icon: "⏱️", text: "You have 15 minutes — about 75 seconds per question" },
            { icon: "🎯", text: "Mark your confidence on every question" },
            { icon: "💡", text: "It's okay to change your answer — we track how" },
            { icon: "📊", text: "Your behavioural patterns matter as much as correctness" },
          ].map((tip, i) => (
            <div key={i} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 10, padding: "12px 14px", display: "flex", gap: 10, alignItems: "flex-start" }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>{tip.icon}</span>
              <span style={{ fontSize: 13, color: T.sub, lineHeight: 1.5 }}>{tip.text}</span>
            </div>
          ))}
        </div>
        <button onClick={startTest} style={{
          background: "linear-gradient(135deg, #6366f1, #4f46e5)",
          color: "white", border: "none", borderRadius: 12,
          padding: "16px 48px", fontSize: 17, fontWeight: 800,
          cursor: "pointer", boxShadow: "0 4px 16px rgba(99,102,241,0.4)",
        }}>
          Start Diagnostic →
        </button>
        <p style={{ color: T.muted, fontSize: 13, marginTop: 14 }}>Free · No account required · Results in minutes</p>
      </div>
    </div>
  );

  if (phase === "submitting") return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: T.dark, flexDirection: "column", gap: 20 }}>
      <div style={{ width: 48, height: 48, borderRadius: "50%", border: `3px solid #6366f1`, borderTopColor: "transparent", animation: "spin 0.8s linear infinite" }} />
      <div style={{ color: T.text, fontSize: 17, fontWeight: 700 }}>{submitStatus}</div>
      <div style={{ color: T.sub, fontSize: 14 }}>Analysing your behavioural patterns…</div>
    </div>
  );


  // ── Test phase ────────────────────────────────────────────────────────
  if (phase !== "test" || !q) return null;

  const progress = ((currentIdx) / TOTAL_QUESTIONS) * 100;
  const timeWarning = timeLeft < 120;

  return (
    <div style={{ background: T.dark, minHeight: "100vh", fontFamily: "'Inter','Segoe UI',sans-serif" }}>
      {/* Header bar */}
      <div style={{
        position: "sticky", top: 0, zIndex: 50,
        background: T.card, borderBottom: `1px solid ${T.border}`,
        padding: "0 24px",
      }}>
        <div style={{ maxWidth: 760, margin: "0 auto", height: 56, display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: T.text, whiteSpace: "nowrap" }}>
            {currentIdx + 1} <span style={{ color: T.muted, fontWeight: 400 }}>/ {TOTAL_QUESTIONS}</span>
          </div>
          {/* Progress bar */}
          <div style={{ flex: 1, height: 6, background: T.surface, borderRadius: 4, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, #6366f1, #4f46e5)", borderRadius: 4, transition: "width 0.3s" }} />
          </div>
          {/* Timer */}
          <div style={{
            fontSize: 14, fontWeight: 700, color: timeWarning ? "#ef4444" : T.text,
            background: timeWarning ? "rgba(239,68,68,0.08)" : T.surface,
            border: `1px solid ${timeWarning ? "rgba(239,68,68,0.3)" : T.border}`,
            borderRadius: 8, padding: "4px 12px", whiteSpace: "nowrap",
          }}>
            ⏱ {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      {/* Question */}
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "32px 24px 80px" }}>
        {/* Difficulty badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <span style={{
            fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
            color: q.difficulty === "easy" ? "#1aa38a" : q.difficulty === "medium" ? "#f59e0b" : "#ef4444",
            background: q.difficulty === "easy" ? "rgba(26,163,138,0.1)" : q.difficulty === "medium" ? "rgba(245,158,11,0.1)" : "rgba(239,68,68,0.1)",
            borderRadius: 6, padding: "3px 10px",
          }}>{q.difficulty}</span>
          <span style={{ fontSize: 12, color: T.muted }}>{q.section === "math" ? "Math" : "Reading & Writing"}</span>
        </div>

        {/* Question text */}
        <div style={{
          background: T.card, border: `1px solid ${T.border}`,
          borderRadius: 14, padding: "24px 24px",
          marginBottom: 20, boxShadow: T.cardShadow,
          fontSize: 17, lineHeight: 1.7, color: T.text,
        }}>
          <MathText text={q.question_text} />
        </div>

        {/* Options */}
        {isNumeric ? (
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 14, color: T.sub, display: "block", marginBottom: 8 }}>Your answer:</label>
            <input
              type="number"
              value={numericInput}
              onChange={e => {
                if (!firstAnswer) setFirstAnswer(e.target.value);
                if (!firstInteractionTime) setFirstInteractionTime(Date.now());
                setNumericInput(e.target.value);
              }}
              placeholder="Enter a number"
              style={{
                padding: "12px 16px", borderRadius: 10, width: "100%", maxWidth: 200,
                border: `2px solid ${T.border}`, background: T.card,
                color: T.text, fontSize: 18, fontWeight: 700, outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
            {["A", "B", "C", "D"].map(letter => {
              const optText = q[`option_${letter.toLowerCase()}`];
              if (!optText) return null;
              const isSelected = selectedAnswer === letter;
              return (
                <button key={letter} onClick={() => {
                  if (!firstAnswer) setFirstAnswer(letter);
                  if (!firstInteractionTime) setFirstInteractionTime(Date.now());
                  setSelectedAnswer(letter);
                }} style={{
                  display: "flex", alignItems: "flex-start", gap: 14, padding: "14px 18px",
                  borderRadius: 12, textAlign: "left", cursor: "pointer",
                  border: `2px solid ${isSelected ? "#6366f1" : T.border}`,
                  background: isSelected ? "rgba(99,102,241,0.08)" : T.card,
                  transition: "all 0.12s",
                }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: isSelected ? "#6366f1" : T.surface,
                    color: isSelected ? "white" : T.sub,
                    fontSize: 13, fontWeight: 700,
                  }}>{letter}</div>
                  <div style={{ fontSize: 15, color: T.text, lineHeight: 1.55, paddingTop: 2 }}>
                    <MathText text={optText} />
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Confidence selector */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: T.sub, marginBottom: 10 }}>
            How confident are you? <span style={{ color: "#ef4444" }}>*</span>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            {[
              { id: "low",    label: "Not sure",   color: "#ef4444" },
              { id: "medium", label: "Fairly sure", color: "#f59e0b" },
              { id: "high",   label: "Very sure",   color: "#1aa38a" },
            ].map(c => (
              <button key={c.id} onClick={() => setConfidence(c.id)} style={{
                flex: 1, padding: "10px 8px", borderRadius: 10, cursor: "pointer",
                border: `2px solid ${confidence === c.id ? c.color : T.border}`,
                background: confidence === c.id ? `${c.color}12` : T.card,
                color: confidence === c.id ? c.color : T.sub,
                fontSize: 13, fontWeight: 600, transition: "all 0.12s",
              }}>{c.label}</button>
            ))}
          </div>
        </div>

        {/* Next button */}
        <button
          onClick={recordAndAdvance}
          disabled={!canAdvance}
          style={{
            width: "100%", padding: "16px", borderRadius: 12,
            background: canAdvance ? "linear-gradient(135deg, #6366f1, #4f46e5)" : T.surface,
            color: canAdvance ? "white" : T.muted,
            border: "none", fontSize: 16, fontWeight: 800,
            cursor: canAdvance ? "pointer" : "not-allowed",
            transition: "all 0.15s",
            boxShadow: canAdvance ? "0 4px 14px rgba(99,102,241,0.35)" : "none",
          }}
        >
          {currentIdx < TOTAL_QUESTIONS - 1 ? "Next Question →" : "Submit Diagnostic →"}
        </button>

        {!canAdvance && (
          <p style={{ textAlign: "center", fontSize: 13, color: T.muted, marginTop: 10 }}>
            Select {!selectedAnswer && !numericInput.trim() ? "an answer" : ""}{!selectedAnswer && !numericInput.trim() && !confidence ? " and " : ""}{!confidence ? "your confidence level" : ""} to continue
          </p>
        )}
      </div>
    </div>
  );
}
