import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import MathText from "./MathText";

export function TeacherTestView({ item, sessionId, sessionData, timerActive, secondsLeft, onStartTimer, onStopTimer, questionField = "question", optionFields = ["option_a","option_b","option_c","option_d"], correctField = "correct_answer" }) {
  const [diagIndex, setDiagIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const questions = item.data?.questions || [];
  const q = questions[diagIndex];

  const answerKey = (idx) => `test_${item.id}_${idx}`;
  const studentAnswer = (idx) => sessionData?.answers?.[answerKey(idx)];
  const currentAnswer = studentAnswer(diagIndex);

  const optionLabels = ["A", "B", "C", "D"];
  const options = optionFields
    .map((f, i) => ({ label: optionLabels[i], value: optionLabels[i], text: q?.[f] }))
    .filter(o => o.text);

  const score = questions.reduce((acc, _, idx) => {
    const ans = studentAnswer(idx);
    if (!ans) return acc;
    const correct = questions[idx][correctField];
    return { ...acc, total: acc.total + 1, correct: acc.correct + (ans.answer === correct ? 1 : 0) };
  }, { total: 0, correct: 0 });

  const allAnswered = score.total === questions.length;

  const pushDiagIndex = async (idx) => {
    setDiagIndex(idx);
    await setDoc(doc(db, "sessions", sessionId), { diagIndex: idx }, { merge: true });
  };

  if (showResults) {
    return (
      <ScoreSummary
        questions={questions}
        studentAnswers={questions.map((_, idx) => studentAnswer(idx))}
        questionField={questionField}
        correctField={correctField}
        testType={item.type}
        onClose={() => setShowResults(false)}
      />
    );
  }

  if (!q) return null;

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <span style={{ padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: item.type === "diagnostic" ? "#fef2f2" : "#f5f3ff", color: item.type === "diagnostic" ? "#ef4444" : "#6366f1" }}>
          {item.type === "diagnostic" ? "🔍 Diagnostic" : "🏁 Final"} — Q{diagIndex + 1}/{questions.length}
        </span>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ color: "#94a3b8", fontSize: 13 }}>{score.total}/{questions.length} answered</span>
          {allAnswered && (
            <button onClick={() => setShowResults(true)}
              style={{ padding: "6px 14px", background: "#6366f1", color: "white", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600, fontSize: 13 }}>
              📊 View Results
            </button>
          )}
        </div>
      </div>

      <div style={{ color: "#0f172a", fontSize: 17, lineHeight: 1.8, marginBottom: 20 }}>
        <MathText text={q[questionField]} />
      </div>

      {q.parts?.map((part, i) => (
        <div key={i} style={{ padding: "10px 16px", background: "#f8fafc", borderRadius: 8, marginBottom: 8, border: "1px solid #e2e8f0" }}>
          <span style={{ color: "#6366f1", fontWeight: 700, marginRight: 8 }}>({part.part})</span>
          <MathText text={part.question} style={{ color: "#374151" }} />
          <span style={{ color: "#94a3b8", fontSize: 12, marginLeft: 8 }}>[{part.marks} marks]</span>
        </div>
      ))}

      {options.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
          {options.map(opt => {
            const isCorrect = q[correctField] === opt.value;
            const isSelected = currentAnswer?.answer === opt.value;
            const showResult = !!currentAnswer;

            let bg = "#f8fafc";
            let border = "#e2e8f0";
            let labelBg = "#e2e8f0";
            let labelColor = "#64748b";

            if (showResult && isCorrect) {
              bg = "#f0fdf4"; border = "#bbf7d0"; labelBg = "#22c55e"; labelColor = "white";
            } else if (showResult && isSelected && !isCorrect) {
              bg = "#fef2f2"; border = "#fecaca"; labelBg = "#ef4444"; labelColor = "white";
            } else if (!showResult && isSelected) {
              bg = "#f5f3ff"; border = "#c4b5fd"; labelBg = "#6366f1"; labelColor = "white";
            }

            return (
              <div key={opt.value} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "12px 16px", borderRadius: 10, border: `1.5px solid ${border}`, background: bg, transition: "all 0.2s" }}>
                <span style={{ width: 26, height: 26, borderRadius: 6, background: labelBg, color: labelColor, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 12, flexShrink: 0 }}>{opt.label}</span>
                <span style={{ color: "#0f172a", fontSize: 15, lineHeight: 1.6 }}><MathText text={opt.text} /></span>
                {showResult && isCorrect && <span style={{ marginLeft: "auto", color: "#22c55e", fontSize: 18 }}>✓</span>}
                {showResult && isSelected && !isCorrect && <span style={{ marginLeft: "auto", color: "#ef4444", fontSize: 18 }}>✗</span>}
              </div>
            );
          })}
        </div>
      )}

      {options.length === 0 && currentAnswer && (
        <div style={{ background: "#f5f3ff", border: "1px solid #e0e7ff", borderRadius: 10, padding: 14, marginBottom: 16 }}>
          <div style={{ color: "#94a3b8", fontSize: 11, marginBottom: 4 }}>Student answered</div>
          <div style={{ color: "#0f172a", fontWeight: 600 }}>{currentAnswer.answer}</div>
        </div>
      )}

      {currentAnswer && q.answer && (
        <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10, padding: 14, marginBottom: 16 }}>
          <div style={{ color: "#166534", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>MODEL ANSWER</div>
          <MathText text={q.answer} style={{ color: "#374151", fontSize: 13, lineHeight: 1.7 }} />
        </div>
      )}

      {currentAnswer && q.trap_type && (
        <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 10, padding: 12, marginBottom: 16 }}>
          <span style={{ color: "#92400e", fontSize: 13 }}>⚠️ Trap: {q.trap_type}</span>
        </div>
      )}

      <div style={{ display: "flex", gap: 10, marginTop: 12, paddingTop: 16, borderTop: "1px solid #f1f5f9" }}>
        <button onClick={() => pushDiagIndex(Math.max(0, diagIndex - 1))}
          disabled={diagIndex === 0}
          style={{ padding: "9px 20px", background: "white", color: "#64748b", border: "1px solid #e2e8f0", borderRadius: 8, cursor: "pointer", opacity: diagIndex === 0 ? 0.4 : 1, fontWeight: 500 }}>← Prev</button>
        <div style={{ flex: 1 }} />
        {!timerActive
          ? <button onClick={() => onStartTimer(q.ideal_time_seconds || q.timeLimit || 120)}
              style={{ padding: "9px 20px", background: "#f5f3ff", color: "#6366f1", border: "1px solid #e0e7ff", borderRadius: 8, cursor: "pointer", fontWeight: 600 }}>⏱ Start Timer</button>
          : <div style={{ display: "flex", alignItems: "center", padding: "9px 16px", background: "#f5f3ff", color: "#6366f1", borderRadius: 8, fontWeight: 700, border: "1px solid #e0e7ff" }}>
              ⏱ {secondsLeft}s
              <button onClick={onStopTimer} style={{ marginLeft: 8, background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: 13 }}>Stop</button>
            </div>
        }
        <button onClick={() => pushDiagIndex(Math.min(questions.length - 1, diagIndex + 1))}
          disabled={diagIndex === questions.length - 1}
          style={{ padding: "9px 20px", background: "#6366f1", color: "white", border: "none", borderRadius: 8, cursor: "pointer", opacity: diagIndex === questions.length - 1 ? 0.4 : 1, fontWeight: 600 }}>Next →</button>
      </div>
    </>
  );
}

export function StudentTestView({ item, sessionId, sessionData, timerActive, secondsLeft, answers, onSubmit, questionField = "question", optionFields = ["option_a","option_b","option_c","option_d"], correctField = "correct_answer" }) {
  const [diagIndex, setDiagIndex] = useState(0);
  const questions = item.data?.questions || [];
  const q = questions[diagIndex];

  const sessionDiagIndex = sessionData?.diagIndex || 0;
  if (sessionDiagIndex !== diagIndex) setDiagIndex(sessionDiagIndex);

  const answerKey = `test_${item.id}_${diagIndex}`;
  const hasAnswered = !!answers[answerKey];
  const myAnswer = answers[answerKey];

  const optionLabels = ["A", "B", "C", "D"];
  const options = optionFields
    .map((f, i) => ({ label: optionLabels[i], value: optionLabels[i], text: q?.[f] }))
    .filter(o => o.text);

  if (!q) return null;

  const timerPct = sessionData?.timeLimit ? (secondsLeft / sessionData.timeLimit) * 100 : 0;

  return (
    <>
      {timerActive && (
        <div style={{ height: 4, background: "#e2e8f0", borderRadius: 2, marginBottom: 16 }}>
          <div style={{ height: "100%", width: `${timerPct}%`, background: timerPct < 20 ? "#ef4444" : "#6366f1", transition: "width 1s linear", borderRadius: 2 }} />
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <span style={{ padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: item.type === "diagnostic" ? "#fef2f2" : "#f5f3ff", color: item.type === "diagnostic" ? "#ef4444" : "#6366f1" }}>
          {item.type === "diagnostic" ? "🔍 Diagnostic" : "🏁 Final"} — Q{diagIndex + 1}/{questions.length}
        </span>
        {timerActive && (
          <span style={{ color: secondsLeft < 20 ? "#ef4444" : "#6366f1", fontWeight: 700, fontSize: 18 }}>⏱ {secondsLeft}s</span>
        )}
      </div>

      <div style={{ color: "#0f172a", fontSize: 17, lineHeight: 1.8, marginBottom: 20 }}>
        <MathText text={q[questionField]} />
      </div>

      {options.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {options.map(opt => {
            const isSelected = myAnswer?.answer === opt.value;
            const isCorrect = q[correctField] === opt.value;
            const showResult = hasAnswered;

            let bg = "#f8fafc";
            let border = "#e2e8f0";
            let labelBg = "#e2e8f0";
            let labelColor = "#64748b";

            if (showResult && isCorrect) {
              bg = "#f0fdf4"; border = "#bbf7d0"; labelBg = "#22c55e"; labelColor = "white";
            } else if (showResult && isSelected && !isCorrect) {
              bg = "#fef2f2"; border = "#fecaca"; labelBg = "#ef4444"; labelColor = "white";
            } else if (!showResult && isSelected) {
              bg = "#f5f3ff"; border = "#c4b5fd"; labelBg = "#6366f1"; labelColor = "white";
            }

            return (
              <button key={opt.value}
                onClick={() => !hasAnswered && onSubmit(answerKey, opt.value)}
                disabled={hasAnswered}
                style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "12px 16px", borderRadius: 10, border: `1.5px solid ${border}`, background: bg, color: "#0f172a", cursor: hasAnswered ? "default" : "pointer", textAlign: "left", width: "100%", transition: "all 0.2s" }}>
                <span style={{ width: 26, height: 26, borderRadius: 6, background: labelBg, color: labelColor, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 12, flexShrink: 0 }}>{opt.label}</span>
                <span style={{ color: "#0f172a", fontSize: 15, lineHeight: 1.6 }}><MathText text={opt.text} /></span>
                {showResult && isCorrect && <span style={{ marginLeft: "auto", color: "#22c55e", fontSize: 18 }}>✓</span>}
                {showResult && isSelected && !isCorrect && <span style={{ marginLeft: "auto", color: "#ef4444", fontSize: 18 }}>✗</span>}
              </button>
            );
          })}
        </div>
      )}

      {options.length === 0 && !hasAnswered && (
        <WrittenAnswer answerKey={answerKey} onSubmit={onSubmit} />
      )}

      {hasAnswered && options.length === 0 && (
        <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10, padding: 14, color: "#166534", textAlign: "center", marginTop: 16 }}>
          ✓ Answer submitted
        </div>
      )}
    </>
  );
}

function WrittenAnswer({ answerKey, onSubmit }) {
  const [val, setVal] = useState("");
  return (
    <div style={{ marginTop: 16 }}>
      <textarea
        style={{ width: "100%", padding: "14px", borderRadius: 12, border: "1.5px solid #e2e8f0", background: "#f8fafc", color: "#0f172a", fontSize: 15, minHeight: 80, resize: "vertical", boxSizing: "border-box" }}
        placeholder="Type your answer..."
        value={val}
        onChange={e => setVal(e.target.value)}
      />
      <button onClick={() => onSubmit(answerKey, val)} disabled={!val.trim()}
        style={{ width: "100%", padding: "14px", background: "#6366f1", color: "white", border: "none", borderRadius: 12, fontWeight: 700, fontSize: 16, cursor: "pointer", marginTop: 10, opacity: val.trim() ? 1 : 0.5 }}>
        Submit Answer
      </button>
    </div>
  );
}

function ScoreSummary({ questions, studentAnswers, questionField, correctField, testType, onClose }) {
  const correct = studentAnswers.filter((ans, i) => ans?.answer === questions[i]?.[correctField]).length;
  const total = questions.length;
  const pct = Math.round((correct / total) * 100);
  const color = pct >= 80 ? "#22c55e" : pct >= 60 ? "#f59e0b" : "#ef4444";
  const label = pct >= 80 ? "Excellent! 🎉" : pct >= 60 ? "Good effort 👍" : "Needs practice 📚";

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 style={{ color: "#0f172a", fontSize: 20, fontWeight: 700 }}>
          {testType === "diagnostic" ? "Diagnostic Results" : "Final Assessment Results"}
        </h2>
        <button onClick={onClose} style={{ background: "#f8fafc", border: "1px solid #e2e8f0", color: "#64748b", borderRadius: 8, padding: "6px 14px", cursor: "pointer" }}>← Back</button>
      </div>

      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{ width: 100, height: 100, borderRadius: "50%", border: `4px solid ${color}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
          <div style={{ fontSize: 28, fontWeight: 900, color }}>{pct}%</div>
        </div>
        <div style={{ color, fontSize: 16, fontWeight: 600 }}>{label}</div>
        <div style={{ color: "#64748b", fontSize: 14, marginTop: 4 }}>{correct} out of {total} correct</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {questions.map((q, i) => {
          const ans = studentAnswers[i];
          const isCorrect = ans?.answer === q[correctField];
          const answered = !!ans;
          return (
            <div key={i} style={{ background: answered ? (isCorrect ? "#f0fdf4" : "#fef2f2") : "#f8fafc", border: `1px solid ${answered ? (isCorrect ? "#bbf7d0" : "#fecaca") : "#e2e8f0"}`, borderRadius: 10, padding: "12px 16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                <div style={{ color: "#374151", fontSize: 13, flex: 1 }}>
                  <span style={{ color: "#94a3b8", marginRight: 8 }}>Q{i + 1}.</span>
                  <MathText text={q[questionField]?.slice(0, 80) + (q[questionField]?.length > 80 ? "..." : "")} />
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
                  {answered ? (
                    <>
                      <span style={{ fontSize: 12, color: "#64748b" }}>Answered: <strong style={{ color: "#0f172a" }}>{ans.answer}</strong></span>
                      <span style={{ fontSize: 16 }}>{isCorrect ? "✅" : "❌"}</span>
                    </>
                  ) : (
                    <span style={{ fontSize: 12, color: "#94a3b8" }}>Not answered</span>
                  )}
                </div>
              </div>
              {!isCorrect && answered && q[correctField] && (
                <div style={{ color: "#166534", fontSize: 12, marginTop: 6 }}>
                  Correct answer: <strong>{q[correctField]}</strong>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}