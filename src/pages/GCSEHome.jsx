import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MasteryFlow from "../components/MasteryFlow";
import { useTheme, ThemeToggle } from "../context/ThemeContext";
import { GRADE45_CHAPTERS } from "../data/gcse/grade45/index";
import { GRADE67_CHAPTERS } from "../data/gcse/grade67/index";
import { GRADE89_CHAPTERS } from "../data/gcse/grade89/index";

const GRADE_BANDS = [
  {
    id: "45",
    label: "Grade 4–5",
    emoji: "📗",
    desc: "Core Higher topics — build your foundation",
    color: "#10b981",
    chapters: GRADE45_CHAPTERS,
    available: true,
  },
  {
    id: "67",
    label: "Grade 6–7",
    emoji: "📙",
    desc: "Quadratics, circle theorems, trig, histograms, conditional probability",
    color: "#f59e0b",
    chapters: GRADE67_CHAPTERS,
    available: true,
  },
  {
    id: "89",
    label: "Grade 8–9",
    emoji: "📕",
    desc: "Proof, functions, iteration, vector proof, surds, growth & decay",
    color: "#ef4444",
    chapters: GRADE89_CHAPTERS,
    available: true,
  },
];

// ─── Chapter grid for a grade band ────────────────────────────────────────────
function ChapterGrid({ band, onSelectChapter }) {
  const navigate = useNavigate();
  const { T } = useTheme();
  const [selectedBand, setSelectedBand] = useState(band?.id || "45");

  const activeBand = GRADE_BANDS.find(b => b.id === selectedBand);

  const st = {
    container: { minHeight: "100vh", background: T.dark, fontFamily: "'Segoe UI', sans-serif" },
    header: { background: T.card, borderBottom: `1px solid ${T.border}`, padding: "14px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" },
    content: { maxWidth: 860, margin: "0 auto", padding: "32px 24px" },
  };

  return (
    <div style={st.container}>
      {/* Header */}
      <div style={st.header}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={() => navigate("/gcse")} style={{ background: T.surface, border: `1px solid ${T.border}`, color: T.sub, borderRadius: 7, padding: "6px 14px", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>← Back</button>
          <div style={{ width: 32, height: 32, borderRadius: 7, background: `linear-gradient(135deg, ${T.green}, ${T.green2})`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 12, color: "#04120d" }}>CF</div>
          <span style={{ color: T.text, fontWeight: 700, fontSize: 15 }}>GCSE Maths Higher</span>
          <span style={{ color: T.muted, fontSize: 12 }}>Edexcel 1MA1</span>
        </div>
        <ThemeToggle />
      </div>

      <div style={st.content}>
        {/* Grade band tabs */}
        <div style={{ display: "flex", gap: 10, marginBottom: 32, flexWrap: "wrap" }}>
          {GRADE_BANDS.map(b => (
            <button key={b.id} onClick={() => b.available && setSelectedBand(b.id)} style={{
              display: "flex", alignItems: "center", gap: 10,
              background: selectedBand === b.id ? b.color + "18" : T.surface,
              border: `1px solid ${selectedBand === b.id ? b.color + "50" : T.border}`,
              borderRadius: 12, padding: "12px 20px", cursor: b.available ? "pointer" : "default",
              opacity: b.available ? 1 : 0.45,
              transition: "all 0.18s", fontFamily: "'Segoe UI', sans-serif",
            }}>
              <span style={{ fontSize: 20 }}>{b.emoji}</span>
              <div style={{ textAlign: "left" }}>
                <div style={{ color: selectedBand === b.id ? b.color : T.text, fontWeight: 800, fontSize: 14 }}>{b.label}</div>
                <div style={{ color: T.muted, fontSize: 11 }}>{b.available ? b.desc : "Coming soon"}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Chapter cards */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: T.muted, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 14 }}>
            {activeBand.label} — {activeBand.chapters.reduce((s, c) => s + c.topics.length, 0)} topics across {activeBand.chapters.length} chapters
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {activeBand.chapters.map(ch => {
              const { meta } = ch;
              return (
                <button key={meta.id} onClick={() => onSelectChapter(ch)} style={{
                  background: T.surface, border: `1px solid ${T.border}`,
                  borderRadius: 13, padding: "18px", textAlign: "left",
                  cursor: "pointer", color: T.text, transition: "all 0.18s",
                  fontFamily: "'Segoe UI', sans-serif",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 9, background: meta.color + "18", color: meta.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 800 }}>{meta.icon}</div>
                    <div style={{ background: meta.color + "15", color: meta.color, borderRadius: 5, padding: "2px 8px", fontSize: 10, fontWeight: 700, border: `1px solid ${meta.color}35`, height: "fit-content" }}>
                      {ch.topics.length} topics
                    </div>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 3, color: T.text }}>{meta.title}</div>
                  <div style={{ fontSize: 12, color: T.sub, lineHeight: 1.4 }}>{meta.subtitle}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Landing page ──────────────────────────────────────────────────────────────
function GCSELanding({ onEnter }) {
  const navigate = useNavigate();
  const { T } = useTheme();

  return (
    <div style={{ minHeight: "100vh", background: T.dark, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Segoe UI', sans-serif", padding: 24 }}>
      <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: "40px 44px", width: "100%", maxWidth: 700, boxShadow: T.pageShadow }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: `linear-gradient(135deg, ${T.green}, ${T.green2})`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14, color: "#04120d" }}>CF</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16, color: T.text }}>ScoreQuanta</div>
            <div style={{ fontSize: 11, color: T.muted }}>Edexcel GCSE · 1MA1</div>
          </div>
          <ThemeToggle style={{ marginLeft: "auto" }} />
        </div>

        <h1 style={{ fontSize: 28, fontWeight: 900, color: T.text, margin: "0 0 6px", letterSpacing: "-0.02em" }}>GCSE Maths Higher</h1>
        <p style={{ color: T.sub, fontSize: 14, margin: "0 0 28px", lineHeight: 1.6 }}>
          Edexcel 1MA1 · Grades 4–9 · Theory, examples and practice questions for every topic
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
          {GRADE_BANDS.map(b => (
            <button key={b.id} onClick={() => b.available && onEnter(b.id)} style={{
              display: "flex", alignItems: "center", gap: 14,
              background: b.available ? b.color + "10" : T.surface,
              border: `1px solid ${b.available ? b.color + "35" : T.border}`,
              borderRadius: 12, padding: "14px 18px", cursor: b.available ? "pointer" : "default",
              opacity: b.available ? 1 : 0.45, textAlign: "left",
              fontFamily: "'Segoe UI', sans-serif", transition: "all 0.18s",
            }}>
              <span style={{ fontSize: 28 }}>{b.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ color: b.available ? T.text : T.sub, fontWeight: 800, fontSize: 15 }}>{b.label}</div>
                <div style={{ color: T.muted, fontSize: 12, marginTop: 2 }}>{b.available ? b.desc : "Coming soon"}</div>
              </div>
              {b.available && (
                <div style={{ color: b.color, fontSize: 13, fontWeight: 700 }}>
                  {b.chapters.reduce((s, c) => s + c.topics.length, 0)} topics →
                </div>
              )}
              {!b.available && <div style={{ color: T.muted, fontSize: 12 }}>Coming soon</div>}
            </button>
          ))}
        </div>

        <button onClick={() => navigate(-1)} style={{ background: "transparent", border: `1px solid ${T.border}`, color: T.sub, borderRadius: 8, padding: "8px 18px", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "'Segoe UI', sans-serif" }}>
          ← Back
        </button>
      </div>
    </div>
  );
}

// ─── Root ──────────────────────────────────────────────────────────────────────
export default function GCSEHome() {
  const [view, setView] = useState("landing"); // 'landing' | 'chapters'
  const [selectedChapter, setSelectedChapter] = useState(null);

  if (selectedChapter) {
    const { meta, topics } = selectedChapter;
    const coloredTopics = topics.map(t => ({ ...t, color: t.color || meta.color }));
    return (
      <MasteryFlow
        key={meta.id}
        topics={coloredTopics}
        title={meta.title}
        subtitle={`GCSE Higher · Grade ${meta.grade} · ${meta.subtitle}`}
        onBack={() => setSelectedChapter(null)}
        vizMap={{}}
        videoUrl={meta.videoUrl || null}
      />
    );
  }

  if (view === "chapters") {
    return <ChapterGrid onSelectChapter={setSelectedChapter} />;
  }

  return <GCSELanding onEnter={() => setView("chapters")} />;
}
