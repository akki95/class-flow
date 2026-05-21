import { useState, useEffect, useRef, useCallback } from "react";
import MathText from "./MathText";
import { useTheme, ThemeToggle, DARK } from "../context/ThemeContext";
import VideoModal from "./VideoModal";

// Back-compat: pages that import CF directly get the dark palette as a static fallback.
// They should migrate to useTheme() but this prevents import errors in the meantime.
export const CF = DARK;

// ─── Desmos Sidebar ────────────────────────────────────────────────────────────
function DesmosSidebar({ isOpen, onClose, expressions, note }) {
  const { T } = useTheme();
  const containerRef = useRef(null);
  const calcRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const init = () => {
      if (!containerRef.current || !window.Desmos) return;
      if (calcRef.current) { calcRef.current.destroy(); calcRef.current = null; }
      calcRef.current = window.Desmos.GraphingCalculator(containerRef.current, {
        keypad: false, expressions: true, settingsMenu: false, zoomButtons: true, expressionsTopbar: true,
      });
      if (expressions?.length) calcRef.current.setExpressions(expressions);
    };
    if (window.Desmos) { init(); }
    else {
      const existing = document.getElementById("desmos-script");
      if (existing) existing.addEventListener("load", init);
      else {
        const s = document.createElement("script");
        s.id = "desmos-script";
        s.src = "https://www.desmos.com/api/v1.8/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6";
        s.async = true; s.onload = init;
        document.head.appendChild(s);
      }
    }
    return () => { if (calcRef.current) { calcRef.current.destroy(); calcRef.current = null; } };
  }, [isOpen, expressions]);

  return (
    <div style={{
      position: "fixed", right: 0, top: 0, bottom: 0, width: 420,
      background: T.card, borderLeft: `1px solid ${T.greenBorder}`,
      zIndex: 200, display: "flex", flexDirection: "column",
      transform: isOpen ? "translateX(0)" : "translateX(100%)",
      transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
      boxShadow: "-12px 0 48px rgba(0,0,0,0.2)",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 18px", borderBottom: `1px solid ${T.border}`, background: T.surface, fontFamily: "'Segoe UI', sans-serif" }}>
        <span style={{ color: T.green, fontWeight: 600, fontSize: 13 }}>📐 Desmos Explorer</span>
        <button onClick={onClose} style={{ background: "transparent", border: `1px solid ${T.border}`, color: T.sub, borderRadius: 6, padding: "4px 10px", cursor: "pointer", fontSize: 14, fontWeight: 600 }}>✕</button>
      </div>
      {note && <div style={{ padding: "10px 16px", background: T.greenBg, borderBottom: `1px solid ${T.greenBorder}`, color: T.sub, fontSize: 12, fontFamily: "'Segoe UI', sans-serif", lineHeight: 1.6 }}><MathText text={note} /></div>}
      <div ref={containerRef} style={{ flex: 1, overflow: "hidden" }} />
    </div>
  );
}

function GeoGebraSidebar({ isOpen, onClose }) {
  const { T } = useTheme();
  return (
    <div style={{
      position: "fixed", right: 0, top: 0, bottom: 0, width: 460,
      background: T.card, borderLeft: `1px solid ${T.greenBorder}`,
      zIndex: 200, display: "flex", flexDirection: "column",
      transform: isOpen ? "translateX(0)" : "translateX(100%)",
      transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
      boxShadow: "-12px 0 48px rgba(0,0,0,0.2)",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 18px", borderBottom: `1px solid ${T.border}`, background: T.surface, fontFamily: "'Segoe UI', sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: T.green, fontWeight: 600, fontSize: 13 }}>📊 GeoGebra Explorer</span>
          <span style={{ background: T.greenBg, color: T.green, fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 4, border: `1px solid ${T.greenBorder}` }}>BETA</span>
        </div>
        <button onClick={onClose} style={{ background: "transparent", border: `1px solid ${T.border}`, color: T.sub, borderRadius: 6, padding: "4px 10px", cursor: "pointer", fontSize: 14, fontWeight: 600 }}>✕</button>
      </div>
      <div style={{ padding: "10px 16px", background: T.greenBg, borderBottom: `1px solid ${T.greenBorder}`, color: T.sub, fontSize: 12, fontFamily: "'Segoe UI', sans-serif" }}>
        Full CAS algebra, geometry &amp; 3D. Use the + menu to add functions, sliders, or points.
      </div>
      {isOpen && <iframe src="https://www.geogebra.org/calculator?lang=en" title="GeoGebra" style={{ flex: 1, border: "none" }} allow="fullscreen" />}
    </div>
  );
}

// ─── Cards ─────────────────────────────────────────────────────────────────────
export function FormulaCard({ formula, color }) {
  const { T } = useTheme();
  return (
    <div style={{ background: T.card, border: `1px solid ${T.borderMid}`, borderLeft: `3px solid ${color}`, borderRadius: 12, padding: "16px 18px", marginBottom: 12, boxShadow: T.cardShadow }}>
      <div style={{ color: color, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12, opacity: 0.9 }}>{formula.label}</div>
      <div style={{ background: T.equation, borderRadius: 10, padding: "14px 18px", marginBottom: formula.note ? 12 : 0, border: `1px solid ${T.border}` }}>
        <MathText text={`$$${formula.latex}$$`} />
      </div>
      {formula.note && <div style={{ color: T.label, fontSize: 13, lineHeight: 1.6, marginTop: 4 }}><MathText text={formula.note} /></div>}
    </div>
  );
}

export function ExampleCard({ example, color }) {
  const { T } = useTheme();
  const [revealed, setRevealed] = useState(false);
  return (
    <div style={{ background: T.card, border: `1px solid ${T.borderMid}`, borderRadius: 14, padding: "20px 22px", boxShadow: T.cardShadow }}>
      <div style={{ color: T.sub, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>Worked Example</div>
      <div style={{ color: T.text, fontSize: 16, lineHeight: 2.0, fontWeight: 400, marginBottom: 18, borderLeft: `2px solid ${T.borderMid}`, paddingLeft: 14 }}>
        <MathText text={example.question} />
      </div>
      {!revealed ? (
        <button onClick={() => setRevealed(true)} style={{ background: "transparent", border: `1px solid ${color}55`, borderRadius: 8, padding: "8px 18px", cursor: "pointer", fontSize: 13, fontWeight: 600, color, fontFamily: "'Segoe UI', sans-serif" }}>
          Show Solution ▼
        </button>
      ) : (
        <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 18 }}>
          {example.steps.map((step, i) => (
            <div key={i} style={{ display: "flex", gap: 14, marginBottom: 14 }}>
              {step.label && <div style={{ width: 6, minWidth: 6, height: 6, borderRadius: "50%", background: color, marginTop: 9, flexShrink: 0, opacity: 0.9 }} />}
              <div style={{ flex: 1 }}>
                {step.label && <div style={{ color: T.label, fontSize: 13, fontWeight: 600, marginBottom: 8, lineHeight: 1.4 }}>{step.label}</div>}
                <div style={{ background: T.equation, border: `1px solid ${T.border}`, borderRadius: 10, padding: "12px 18px" }}>
                  <MathText text={`$$${step.math}$$`} />
                </div>
              </div>
            </div>
          ))}
          <button onClick={() => setRevealed(false)} style={{ background: "transparent", border: `1px solid ${T.border}`, borderRadius: 8, padding: "8px 18px", cursor: "pointer", fontSize: 13, fontWeight: 600, color: T.muted, fontFamily: "'Segoe UI', sans-serif", marginTop: 6 }}>
            Hide Solution ▲
          </button>
        </div>
      )}
    </div>
  );
}

export function PracticeCard({ practice, color }) {
  const { T } = useTheme();
  const [show, setShow] = useState(false);
  return (
    <div style={{ background: T.card, border: `1px solid ${T.borderMid}`, borderTop: `2px solid ${color}`, borderRadius: 14, padding: "20px 22px", boxShadow: T.cardShadow }}>
      <div style={{ color: color, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14, opacity: 0.9 }}>Practice Question</div>
      <div style={{ color: T.text, fontSize: 17, lineHeight: 1.95, fontWeight: 500, marginBottom: 20 }}>
        <MathText text={practice.question} />
      </div>
      {!show ? (
        <button onClick={() => setShow(true)} style={{ border: "none", borderRadius: 9, padding: "11px 26px", cursor: "pointer", fontWeight: 700, fontSize: 14, fontFamily: "'Segoe UI', sans-serif", background: color, color: "#04120d" }}>
          Reveal Solution
        </button>
      ) : (
        <>
          <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 18, marginBottom: 14 }}>
            {practice.solution.map((item, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                {item.step && <div style={{ color: T.label, fontSize: 13, fontWeight: 600, marginBottom: 8, lineHeight: 1.4 }}>{item.step}</div>}
                <div style={{ background: T.equation, border: `1px solid ${T.border}`, borderRadius: 10, padding: "12px 18px" }}>
                  <MathText text={`$$${item.math}$$`} />
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => setShow(false)} style={{ background: "transparent", border: `1px solid ${T.border}`, borderRadius: 8, padding: "9px 20px", cursor: "pointer", fontSize: 13, fontWeight: 600, color: T.muted, fontFamily: "'Segoe UI', sans-serif" }}>
            Hide Solution ▲
          </button>
        </>
      )}
    </div>
  );
}

function Section({ title, icon, children }) {
  const { T } = useTheme();
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, color: T.sub, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.10em", marginBottom: 16, fontFamily: "'Segoe UI', sans-serif" }}>
        <span style={{ opacity: 0.8 }}>{icon}</span><span>{title}</span>
      </div>
      {children}
    </div>
  );
}

// ─── Agenda ────────────────────────────────────────────────────────────────────
function AgendaView({ topics, completed, onStart, title, subtitle, videoUrl }) {
  const { T } = useTheme();
  const [showVideo, setShowVideo] = useState(false);
  return (
    <div style={{ minHeight: "100vh", background: T.dark, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Segoe UI', sans-serif", padding: 24, paddingRight: showVideo ? "504px" : 24, transition: "padding-right 0.3s ease" }}>
      <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: "40px 44px", width: "100%", maxWidth: 820, color: T.text, boxShadow: T.pageShadow }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: `linear-gradient(135deg, ${T.green}, ${T.green2})`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14, color: "#04120d", flexShrink: 0 }}>CF</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16, color: T.text }}>ClassFlow</div>
            <div style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>A-Level Edexcel · Pure Mathematics</div>
          </div>
          <ThemeToggle style={{ marginLeft: "auto" }} />
        </div>

        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 4, flexWrap: "wrap" }}>
          <h1 style={{ fontSize: 28, fontWeight: 900, margin: 0, color: T.text, letterSpacing: "-0.02em" }}>{title}</h1>
          {videoUrl && (
            <button onClick={() => setShowVideo(true)} style={{ display: "flex", alignItems: "center", gap: 7, background: "#ff000012", border: "1px solid #ff000028", borderRadius: 9, padding: "8px 16px", color: "#e03131", fontWeight: 700, fontSize: 13, cursor: "pointer", flexShrink: 0, fontFamily: "'Segoe UI', sans-serif", whiteSpace: "nowrap" }}>
              ▶ Watch Overview
            </button>
          )}
          <VideoModal videoUrl={videoUrl} title={title} isOpen={showVideo} onClose={() => setShowVideo(false)} />
        </div>
        {subtitle && <p style={{ color: T.sub, fontSize: 14, margin: "0 0 24px", fontWeight: 400, lineHeight: 1.6, marginTop: 6 }}>{subtitle}</p>}

        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
          <span style={{ color: T.sub, fontSize: 12, fontWeight: 600 }}>{completed.size} of {topics.length} topics completed</span>
          <div style={{ flex: 1, height: 5, background: T.surface, borderRadius: 3, overflow: "hidden" }}>
            <div style={{ height: "100%", background: `linear-gradient(90deg, ${T.green}, ${T.green2})`, borderRadius: 3, width: `${(completed.size / topics.length) * 100}%`, transition: "width 0.5s ease" }} />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
          {topics.map((topic, i) => {
            const done = completed.has(topic.id);
            return (
              <button key={topic.id} onClick={() => onStart(i)} style={{ background: done ? `${topic.color}08` : T.surface, border: `1px solid ${done ? topic.color + "50" : T.border}`, borderRadius: 12, padding: "14px 16px", textAlign: "left", cursor: "pointer", color: T.text, transition: "all 0.18s", fontFamily: "'Segoe UI', sans-serif" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 8, background: topic.color + "18", color: topic.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800 }}>{topic.icon}</div>
                  <div style={{ borderRadius: 5, padding: "3px 8px", fontSize: 11, fontWeight: 600, background: done ? topic.color + "18" : T.equation, color: done ? topic.color : T.muted }}>{done ? "✓" : `${i + 1}/${topics.length}`}</div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 3, color: T.text }}>{topic.title}</div>
                <div style={{ fontSize: 11, color: T.sub, lineHeight: 1.4 }}>{topic.subtitle}</div>
              </button>
            );
          })}
        </div>

        <div style={{ textAlign: "center", marginTop: 32 }}>
          <button onClick={() => onStart(0)} style={{ border: "none", borderRadius: 9, padding: "13px 42px", cursor: "pointer", background: T.green, color: "#04120d", fontSize: 15, fontWeight: 700, fontFamily: "'Segoe UI', sans-serif" }}>
            {completed.size > 0 ? "Continue →" : "Start Learning →"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Topic View ────────────────────────────────────────────────────────────────
function TopicView({ topic, topicIdx, topics, onBack, onNext, onPrev, onMarkDone, isDone, activeTool, setActiveTool, vizMap }) {
  const { T } = useTheme();
  const VizComponent = topic.visualization ? vizMap[topic.visualization] : null;
  const scrollRef = useRef(null);
  const sidebarWidth = activeTool === "geogebra" ? 460 : activeTool === "desmos" ? 420 : 0;

  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = 0; }, [topicIdx]);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: T.dark }}>
      <div style={{ flex: 1, overflowY: "auto", marginRight: sidebarWidth, transition: "margin-right 0.3s ease" }} ref={scrollRef}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 24px", background: T.card, borderBottom: `1px solid ${T.border}`, position: "sticky", top: 0, zIndex: 10, backdropFilter: "blur(12px)", fontFamily: "'Segoe UI', sans-serif" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button onClick={onBack} style={{ background: T.surface, border: `1px solid ${T.border}`, color: T.sub, borderRadius: 7, padding: "6px 14px", cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "'Segoe UI', sans-serif" }}>← Topics</button>
            <div style={{ width: 30, height: 30, borderRadius: 7, background: `linear-gradient(135deg, ${T.green}, ${T.green2})`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 11, color: "#04120d" }}>CF</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ display: "flex", gap: 3 }}>
              {topics.map((_, i) => <div key={i} style={{ width: i === topicIdx ? 18 : 6, height: 6, borderRadius: 3, background: i === topicIdx ? topic.color : i < topicIdx ? T.green : T.border, transition: "all 0.3s" }} />)}
            </div>
            <span style={{ color: T.muted, fontSize: 12 }}>{topicIdx + 1}/{topics.length}</span>
            <ThemeToggle />
          </div>
        </div>

        {/* Hero */}
        <div style={{ display: "flex", alignItems: "center", gap: 18, padding: "22px 30px", background: T.card, borderBottom: `1px solid ${T.border}`, flexWrap: "wrap" }}>
          <div style={{ width: 52, height: 52, borderRadius: 12, flexShrink: 0, background: `${topic.color}18`, color: topic.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 800 }}>{topic.icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{ color: T.muted, fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 5 }}>Topic {topicIdx + 1} of {topics.length}</div>
            <h2 style={{ color: T.text, fontSize: 22, fontWeight: 800, margin: 0, letterSpacing: "-0.01em" }}>{topic.title}</h2>
            <div style={{ color: topic.color, fontSize: 13, marginTop: 4, fontWeight: 500, opacity: 0.9 }}>{topic.subtitle}</div>
          </div>
          <div style={{ display: "flex", gap: 8, marginLeft: "auto", flexShrink: 0 }}>
            {[{ id: "desmos", label: "📐 Desmos" }, { id: "geogebra", label: "📊 GeoGebra" }].map(({ id, label }) => {
              const active = activeTool === id;
              return (
                <button key={id} onClick={() => setActiveTool(active ? null : id)} style={{ border: `1px solid ${active ? topic.color : T.borderMid}`, borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "'Segoe UI', sans-serif", transition: "all 0.18s", background: active ? topic.color : T.surface, color: active ? "#04120d" : T.label }}>
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "30px 28px 80px" }}>
          <Section title="Theory" icon="📖">
            <div style={{ color: T.text, fontSize: 16, lineHeight: 2.0, fontWeight: 400, fontFamily: "'Segoe UI', sans-serif" }}><MathText text={topic.theory} /></div>
          </Section>
          <Section title="Key Formulas" icon="📐">
            {topic.formulas.map((f, i) => <FormulaCard key={i} formula={f} color={topic.color} />)}
          </Section>
          {VizComponent && <Section title="Visualisation" icon="📊"><VizComponent color={topic.color} /></Section>}
          <Section title="Worked Example" icon="✏️"><ExampleCard example={topic.example} color={topic.color} /></Section>
          <Section title="Practice" icon="🎯"><PracticeCard practice={topic.practice} color={topic.color} /></Section>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginTop: 24 }}>
            <button onClick={onPrev} disabled={topicIdx === 0} style={{ background: T.surface, border: "none", color: T.label, borderRadius: 9, padding: "11px 24px", cursor: "pointer", fontWeight: 600, fontSize: 14, fontFamily: "'Segoe UI', sans-serif", opacity: topicIdx === 0 ? 0.3 : 1 }}>← Previous</button>
            <button onClick={onMarkDone} style={{ borderRadius: 9, padding: "11px 24px", cursor: "pointer", fontWeight: 700, fontSize: 14, fontFamily: "'Segoe UI', sans-serif", transition: "all 0.25s", background: isDone ? T.greenBg : topic.color, border: `1px solid ${isDone ? T.green : "transparent"}`, color: isDone ? T.green : "#04120d" }}>
              {isDone ? "✓ Completed" : "Mark Complete"}
            </button>
            <button onClick={onNext} disabled={topicIdx === topics.length - 1} style={{ background: topic.color, border: "none", color: "#04120d", borderRadius: 9, padding: "11px 24px", cursor: "pointer", fontWeight: 700, fontSize: 14, fontFamily: "'Segoe UI', sans-serif", opacity: topicIdx === topics.length - 1 ? 0.3 : 1 }}>Next →</button>
          </div>
        </div>
      </div>

      <DesmosSidebar isOpen={activeTool === "desmos"} onClose={() => setActiveTool(null)} expressions={topic.desmosExpressions} note={topic.desmosNote} />
      <GeoGebraSidebar isOpen={activeTool === "geogebra"} onClose={() => setActiveTool(null)} />
    </div>
  );
}

// ─── Summary ───────────────────────────────────────────────────────────────────
function SummaryView({ completed, total, onRestart, onGoAgenda }) {
  const { T } = useTheme();
  const allDone = completed.size === total;
  return (
    <div style={{ minHeight: "100vh", background: T.dark, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Segoe UI', sans-serif", padding: 24 }}>
      <div style={{ textAlign: "center", maxWidth: 500 }}>
        <div style={{ fontSize: 64, marginBottom: 18 }}>{allDone ? "🎉" : "📚"}</div>
        <h2 style={{ color: T.text, fontSize: 26, fontWeight: 800, marginBottom: 10, letterSpacing: "-0.02em" }}>{allDone ? "Chapter mastered!" : `${completed.size} of ${total} done`}</h2>
        <p style={{ color: T.sub, marginBottom: 30, lineHeight: 1.8, fontSize: 15 }}>
          {allDone ? "Great work. Review any topic or move to the next chapter." : "Keep going — you're building momentum!"}
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <button onClick={onGoAgenda} style={{ border: "none", borderRadius: 9, padding: "12px 28px", cursor: "pointer", fontWeight: 700, fontSize: 14, fontFamily: "'Segoe UI', sans-serif", background: T.green, color: "#04120d" }}>← Back to Topics</button>
          {allDone && <button onClick={onRestart} style={{ background: "transparent", border: `1px solid ${T.border}`, borderRadius: 8, padding: "12px 28px", cursor: "pointer", fontSize: 13, fontWeight: 600, color: T.sub, fontFamily: "'Segoe UI', sans-serif" }}>Restart</button>}
        </div>
      </div>
    </div>
  );
}

// ─── Root export ───────────────────────────────────────────────────────────────
export default function MasteryFlow({ topics, onBack, title, subtitle, vizMap = {}, videoUrl = null }) {
  const [view, setView]           = useState("agenda");
  const [topicIdx, setTopicIdx]   = useState(0);
  const [completed, setCompleted] = useState(new Set());
  const [activeTool, setActiveTool] = useState(null);

  const handleStart    = useCallback((idx) => { setTopicIdx(idx); setActiveTool(null); setView("topic"); }, []);
  const handleNext     = useCallback(() => {
    if (topicIdx < topics.length - 1) { setTopicIdx(i => i + 1); setActiveTool(null); }
    else setView("summary");
  }, [topicIdx, topics.length]);
  const handlePrev     = useCallback(() => { setTopicIdx(i => Math.max(i - 1, 0)); setActiveTool(null); }, []);
  const handleMarkDone = useCallback(() => {
    setCompleted(prev => {
      const next = new Set(prev);
      const id = topics[topicIdx].id;
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, [topicIdx, topics]);

  if (view === "agenda") return <AgendaView topics={topics} completed={completed} onStart={handleStart} title={title} subtitle={subtitle} videoUrl={videoUrl} />;
  if (view === "summary") return <SummaryView completed={completed} total={topics.length} onRestart={() => { setCompleted(new Set()); setTopicIdx(0); setView("agenda"); }} onGoAgenda={() => setView("agenda")} />;

  const topic = topics[topicIdx];
  return (
    <TopicView
      topic={topic} topicIdx={topicIdx} topics={topics}
      onBack={() => { setActiveTool(null); setView("agenda"); }}
      onNext={handleNext} onPrev={handlePrev}
      onMarkDone={handleMarkDone} isDone={completed.has(topic.id)}
      activeTool={activeTool} setActiveTool={setActiveTool}
      vizMap={vizMap}
    />
  );
}
