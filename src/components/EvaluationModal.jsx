import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { useProgress } from "../context/ProgressContext";
import { generateEvaluation } from "../utils/generateEvaluation";
import MathText from "./MathText";

const LAYERS = ["recall", "procedure", "spotMistake", "transfer"];

const LAYER_META = {
  recall:       { label: "Recall",        icon: "💡", desc: "Can you identify the right approach?" },
  procedure:    { label: "Procedure",     icon: "✏️", desc: "Can you execute the method?" },
  spotMistake:  { label: "Spot the Mistake", icon: "🔍", desc: "Do you understand it well enough to catch errors?" },
  transfer:     { label: "Transfer",      icon: "🎯", desc: "Can you apply it to an unfamiliar context?" },
};

// ─── Individual layer components ───────────────────────────────────────────────

function RecallLayer({ data, onPass, onFail }) {
  const { T } = useTheme();
  const [selected, setSelected] = useState(null);
  const [checked, setChecked] = useState(false);

  const check = () => {
    if (selected === null) return;
    setChecked(true);
    setTimeout(() => { selected === data.correct ? onPass() : onFail(); }, 1200);
  };

  return (
    <div>
      <div style={{ color: T.text, fontSize: 16, fontWeight: 500, lineHeight: 1.8, marginBottom: 20 }}>
        <MathText text={data.question} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {data.options.map((opt, i) => {
          const isSelected = selected === i;
          const isCorrect = checked && i === data.correct;
          const isWrong = checked && isSelected && i !== data.correct;
          return (
            <button key={i} onClick={() => !checked && setSelected(i)} style={{
              padding: "12px 16px", borderRadius: 10, textAlign: "left",
              border: `1px solid ${isCorrect ? "#10b981" : isWrong ? "#ef4444" : isSelected ? T.green : T.border}`,
              background: isCorrect ? "#10b98115" : isWrong ? "#ef444415" : isSelected ? T.greenBg : T.surface,
              color: T.text, cursor: checked ? "default" : "pointer",
              fontFamily: "'Segoe UI', sans-serif", fontSize: 14, fontWeight: isSelected ? 600 : 400,
              transition: "all 0.15s",
            }}>
              <span style={{ color: T.muted, marginRight: 10 }}>{String.fromCharCode(65 + i)}.</span>
              <MathText text={opt} />
              {isCorrect && <span style={{ float: "right", color: "#10b981" }}>✓</span>}
              {isWrong && <span style={{ float: "right", color: "#ef4444" }}>✗</span>}
            </button>
          );
        })}
      </div>
      {!checked && (
        <button onClick={check} disabled={selected === null} style={{ marginTop: 20, background: T.green, border: "none", borderRadius: 9, padding: "11px 28px", color: "#04120d", fontWeight: 700, fontSize: 14, cursor: selected === null ? "not-allowed" : "pointer", opacity: selected === null ? 0.4 : 1, fontFamily: "'Segoe UI', sans-serif" }}>
          Check Answer
        </button>
      )}
      {checked && <div style={{ marginTop: 16, padding: "10px 14px", borderRadius: 8, background: selected === data.correct ? "#10b98115" : "#ef444415", color: selected === data.correct ? "#10b981" : "#ef4444", fontWeight: 700, fontSize: 14 }}>
        {selected === data.correct ? "✓ Correct! Moving to next layer..." : "✗ Incorrect. Let's try the next layer anyway — review the formula above."}
      </div>}
    </div>
  );
}

function ProcedureLayer({ data, onPass, onFail }) {
  const { T } = useTheme();
  const [revealed, setRevealed] = useState(false);
  const [showHint, setShowHint] = useState(false);

  return (
    <div>
      <div style={{ color: T.text, fontSize: 16, fontWeight: 500, lineHeight: 1.8, marginBottom: 16 }}>
        <MathText text={data.question} />
      </div>
      <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 10, padding: "14px 16px", marginBottom: 16, color: T.sub, fontSize: 13 }}>
        📝 Work this out on paper before revealing the answer.
      </div>
      {!showHint && !revealed && (
        <button onClick={() => setShowHint(true)} style={{ background: "transparent", border: `1px solid ${T.border}`, borderRadius: 8, padding: "8px 16px", color: T.sub, cursor: "pointer", fontSize: 13, fontFamily: "'Segoe UI', sans-serif", marginBottom: 12 }}>
          💡 Show hint
        </button>
      )}
      {showHint && (
        <div style={{ background: T.greenBg, border: `1px solid ${T.greenBorder}`, borderRadius: 8, padding: "10px 14px", marginBottom: 12, color: T.green, fontSize: 13 }}>
          <MathText text={data.hint} />
        </div>
      )}
      {!revealed ? (
        <button onClick={() => setRevealed(true)} style={{ background: T.equation, border: `1px solid ${T.border}`, borderRadius: 9, padding: "11px 24px", color: T.label, fontWeight: 600, fontSize: 14, cursor: "pointer", fontFamily: "'Segoe UI', sans-serif" }}>
          Reveal Answer
        </button>
      ) : (
        <div>
          <div style={{ background: T.equation, border: `1px solid ${T.border}`, borderRadius: 10, padding: "14px 18px", marginBottom: 16, fontSize: 15 }}>
            <MathText text={`$$${data.answer}$$`} />
          </div>
          <div style={{ color: T.label, fontSize: 14, marginBottom: 12, fontWeight: 600 }}>How did you do?</div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={onPass} style={{ flex: 1, background: "#10b981", border: "none", borderRadius: 9, padding: "11px", color: "white", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "'Segoe UI', sans-serif" }}>✓ Got it</button>
            <button onClick={onFail} style={{ flex: 1, background: "#ef444420", border: "1px solid #ef444440", borderRadius: 9, padding: "11px", color: "#ef4444", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "'Segoe UI', sans-serif" }}>✗ Got it wrong</button>
          </div>
        </div>
      )}
    </div>
  );
}

function SpotMistakeLayer({ data, onPass, onFail }) {
  const { T } = useTheme();
  const [revealed, setRevealed] = useState(false);
  const [selfMark, setSelfMark] = useState(null);

  return (
    <div>
      <div style={{ color: T.sub, fontSize: 14, marginBottom: 12 }}>{data.intro}</div>
      <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 10, padding: "14px 18px", marginBottom: 16 }}>
        <div style={{ color: T.sub, fontSize: 12, fontWeight: 600, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>Question</div>
        <div style={{ color: T.text, fontSize: 15, marginBottom: 14 }}><MathText text={data.questionContext} /></div>
        <div style={{ color: T.sub, fontSize: 12, fontWeight: 600, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>Student's working</div>
        {data.incorrectWorking.split("\\n").map((line, i) => (
          <div key={i} style={{ color: T.text, fontSize: 14, padding: "6px 0", borderBottom: i < data.incorrectWorking.split("\\n").length - 1 ? `1px solid ${T.border}` : "none" }}>
            <MathText text={line} />
          </div>
        ))}
      </div>
      {!revealed ? (
        <button onClick={() => setRevealed(true)} style={{ background: T.equation, border: `1px solid ${T.border}`, borderRadius: 9, padding: "11px 24px", color: T.label, fontWeight: 600, fontSize: 14, cursor: "pointer", fontFamily: "'Segoe UI', sans-serif" }}>
          Show the error
        </button>
      ) : (
        <div>
          <div style={{ background: "#ef444412", border: "1px solid #ef444430", borderRadius: 10, padding: "14px 16px", marginBottom: 12 }}>
            <div style={{ color: "#ef4444", fontWeight: 700, fontSize: 13, marginBottom: 6 }}>❌ Error in: {data.errorLine}</div>
            <div style={{ color: T.text, fontSize: 14 }}><MathText text={data.correction} /></div>
          </div>
          {!selfMark && (
            <div>
              <div style={{ color: T.label, fontSize: 14, marginBottom: 10, fontWeight: 600 }}>Did you spot it?</div>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => { setSelfMark("yes"); onPass(); }} style={{ flex: 1, background: "#10b981", border: "none", borderRadius: 9, padding: "11px", color: "white", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "'Segoe UI', sans-serif" }}>✓ Yes, I found it</button>
                <button onClick={() => { setSelfMark("no"); onFail(); }} style={{ flex: 1, background: "#ef444420", border: "1px solid #ef444440", borderRadius: 9, padding: "11px", color: "#ef4444", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "'Segoe UI', sans-serif" }}>✗ I missed it</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function TransferLayer({ data, onPass, onFail }) {
  const { T } = useTheme();
  const [revealed, setRevealed] = useState(false);

  return (
    <div>
      <div style={{ color: T.sub, fontSize: 13, marginBottom: 12, background: T.greenBg, border: `1px solid ${T.greenBorder}`, borderRadius: 8, padding: "8px 14px" }}>
        🎯 This is a transfer question — same concept, new context. No hints available.
      </div>
      <div style={{ color: T.text, fontSize: 16, fontWeight: 500, lineHeight: 1.8, marginBottom: 20 }}>
        <MathText text={data.question} />
      </div>
      {!revealed ? (
        <button onClick={() => setRevealed(true)} style={{ background: T.equation, border: `1px solid ${T.border}`, borderRadius: 9, padding: "11px 24px", color: T.label, fontWeight: 600, fontSize: 14, cursor: "pointer", fontFamily: "'Segoe UI', sans-serif" }}>
          Reveal Answer
        </button>
      ) : (
        <div>
          <div style={{ background: T.equation, border: `1px solid ${T.border}`, borderRadius: 10, padding: "14px 18px", marginBottom: 10 }}>
            <MathText text={`$$${data.answer}$$`} />
          </div>
          <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 8, padding: "10px 14px", marginBottom: 16, color: T.sub, fontSize: 13 }}>
            <strong style={{ color: T.label }}>Key insight:</strong> <MathText text={data.keyInsight} />
          </div>
          <div style={{ color: T.label, fontSize: 14, marginBottom: 10, fontWeight: 600 }}>How did you do?</div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={onPass} style={{ flex: 1, background: "#10b981", border: "none", borderRadius: 9, padding: "11px", color: "white", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "'Segoe UI', sans-serif" }}>✓ Got it</button>
            <button onClick={onFail} style={{ flex: 1, background: "#ef444420", border: "1px solid #ef444440", borderRadius: 9, padding: "11px", color: "#ef4444", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "'Segoe UI', sans-serif" }}>✗ Not quite</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Results summary ────────────────────────────────────────────────────────────
function ResultsSummary({ results, topicTitle, onClose }) {
  const { T } = useTheme();
  const passed = Object.values(results).filter(Boolean).length;
  const total = LAYERS.length;
  const pct = Math.round((passed / total) * 100);

  const verdict = pct === 100 ? { label: "Mastered", color: "#10b981", emoji: "🎉" }
    : pct >= 75 ? { label: "Almost there", color: T.green, emoji: "💪" }
    : pct >= 50 ? { label: "Developing", color: "#f59e0b", emoji: "📚" }
    : { label: "Needs work", color: "#ef4444", emoji: "🔄" };

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 48, marginBottom: 12 }}>{verdict.emoji}</div>
      <h3 style={{ color: T.text, fontSize: 20, fontWeight: 800, margin: "0 0 4px" }}>{verdict.label}</h3>
      <div style={{ color: T.sub, fontSize: 14, marginBottom: 24 }}>{topicTitle}</div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
        {LAYERS.map(layer => (
          <div key={layer} style={{ background: results[layer] ? "#10b98112" : T.surface, border: `1px solid ${results[layer] ? "#10b98140" : T.border}`, borderRadius: 10, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 18 }}>{LAYER_META[layer].icon}</span>
            <div style={{ textAlign: "left" }}>
              <div style={{ color: T.text, fontSize: 12, fontWeight: 700 }}>{LAYER_META[layer].label}</div>
              <div style={{ color: results[layer] ? "#10b981" : "#ef4444", fontSize: 11, fontWeight: 600 }}>{results[layer] ? "Passed" : "Needs review"}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: T.equation, borderRadius: 12, padding: "16px", marginBottom: 20 }}>
        <div style={{ fontSize: 28, fontWeight: 900, color: verdict.color }}>{pct}%</div>
        <div style={{ color: T.sub, fontSize: 12 }}>mastery score · {passed}/{total} layers passed</div>
      </div>

      {pct < 100 && (
        <div style={{ color: T.sub, fontSize: 13, marginBottom: 20, lineHeight: 1.6 }}>
          {pct < 50 ? "Go back to the theory and examples, then try again." : "You're close — review the layers you missed and retry."}
        </div>
      )}

      <button onClick={onClose} style={{ background: T.green, border: "none", borderRadius: 9, padding: "12px 32px", color: "#04120d", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "'Segoe UI', sans-serif" }}>
        {pct === 100 ? "🎉 Back to Topics" : "Back to Topics"}
      </button>
    </div>
  );
}

// ─── Main modal ────────────────────────────────────────────────────────────────
export default function EvaluationModal({ topic, onClose }) {
  const { T } = useTheme();
  const { markLayerPassed, markTopicComplete } = useProgress();

  const [state, setState] = useState("loading"); // loading | active | results
  const [questions, setQuestions] = useState(null);
  const [currentLayer, setCurrentLayer] = useState(0);
  const [results, setResults] = useState({ recall: false, procedure: false, spotMistake: false, transfer: false });
  const [error, setError] = useState(null);

  useEffect(() => {
    generateEvaluation(topic)
      .then(q => { setQuestions(q); setState("active"); })
      .catch(e => { setError(e.message); setState("error"); });
  }, [topic]);

  const handlePass = () => {
    const layer = LAYERS[currentLayer];
    markLayerPassed(topic.id, layer);
    setResults(prev => ({ ...prev, [layer]: true }));
    advance();
  };

  const handleFail = () => {
    advance();
  };

  const advance = () => {
    if (currentLayer < LAYERS.length - 1) {
      setCurrentLayer(i => i + 1);
    } else {
      // Mark topic complete if ≥2 layers passed (procedure + at least one more)
      const passedCount = Object.values(results).filter(Boolean).length + 1; // +1 for current
      if (passedCount >= 2) markTopicComplete(topic.id);
      setState("results");
    }
  };

  const layerKey = LAYERS[currentLayer];
  const progressPct = (currentLayer / LAYERS.length) * 100;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 600, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ background: T.card, borderRadius: 18, width: "100%", maxWidth: 580, maxHeight: "90vh", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 24px 80px rgba(0,0,0,0.4)", border: `1px solid ${T.border}` }}>

        {/* Header */}
        <div style={{ padding: "16px 20px", borderBottom: `1px solid ${T.border}`, background: T.surface, display: "flex", alignItems: "center", gap: 12 }}>
          <div>
            <div style={{ color: T.text, fontWeight: 700, fontSize: 15 }}>Test Your Understanding</div>
            <div style={{ color: T.muted, fontSize: 12 }}>{topic.title}</div>
          </div>
          <button onClick={onClose} style={{ marginLeft: "auto", background: "transparent", border: `1px solid ${T.border}`, color: T.sub, borderRadius: 7, padding: "4px 10px", cursor: "pointer", fontSize: 14, fontWeight: 600 }}>✕</button>
        </div>

        {/* Progress bar (active state) */}
        {state === "active" && (
          <div style={{ height: 4, background: T.border }}>
            <div style={{ height: "100%", background: T.green, width: `${progressPct + 25}%`, transition: "width 0.4s ease" }} />
          </div>
        )}

        {/* Layer indicator */}
        {state === "active" && (
          <div style={{ padding: "12px 20px 0", display: "flex", gap: 8 }}>
            {LAYERS.map((l, i) => (
              <div key={l} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: i < currentLayer ? "#10b981" : i === currentLayer ? T.green : T.surface, border: `1px solid ${i < currentLayer ? "#10b981" : i === currentLayer ? T.green : T.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, transition: "all 0.3s" }}>
                  {i < currentLayer ? "✓" : LAYER_META[l].icon}
                </div>
                <div style={{ color: i === currentLayer ? T.text : T.muted, fontSize: 10, fontWeight: i === currentLayer ? 700 : 400, textAlign: "center" }}>{LAYER_META[l].label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
          {state === "loading" && (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>⚡</div>
              <div style={{ color: T.text, fontWeight: 700, marginBottom: 6 }}>Generating your evaluation...</div>
              <div style={{ color: T.muted, fontSize: 13 }}>AI is creating personalised questions for this topic.</div>
            </div>
          )}

          {state === "error" && (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>⚠️</div>
              <div style={{ color: T.text, fontWeight: 700, marginBottom: 8 }}>Could not generate questions</div>
              <div style={{ color: T.muted, fontSize: 13, marginBottom: 20 }}>{error}</div>
              <button onClick={onClose} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 8, padding: "10px 20px", color: T.sub, cursor: "pointer", fontFamily: "'Segoe UI', sans-serif" }}>Close</button>
            </div>
          )}

          {state === "active" && questions && (
            <div>
              <div style={{ color: T.sub, fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>
                {LAYER_META[layerKey].icon} Layer {currentLayer + 1} — {LAYER_META[layerKey].label}
              </div>
              <div style={{ color: T.muted, fontSize: 12, marginBottom: 16, fontStyle: "italic" }}>{LAYER_META[layerKey].desc}</div>

              {layerKey === "recall" && <RecallLayer data={questions.recall} onPass={handlePass} onFail={handleFail} />}
              {layerKey === "procedure" && <ProcedureLayer data={questions.procedure} onPass={handlePass} onFail={handleFail} />}
              {layerKey === "spotMistake" && <SpotMistakeLayer data={questions.spotMistake} onPass={handlePass} onFail={handleFail} />}
              {layerKey === "transfer" && <TransferLayer data={questions.transfer} onPass={handlePass} onFail={handleFail} />}
            </div>
          )}

          {state === "results" && (
            <ResultsSummary results={results} topicTitle={topic.title} onClose={onClose} />
          )}
        </div>
      </div>
    </div>
  );
}
