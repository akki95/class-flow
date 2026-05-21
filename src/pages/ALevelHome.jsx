import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MasteryFlow from "../components/MasteryFlow";
import { useTheme, ThemeToggle } from "../context/ThemeContext";
import { ALEVEL_PURE_CHAPTERS } from "../data/alevel/pure/index";
import { ALEVEL_STATS_CHAPTERS } from "../data/alevel/stats/index";
import { ALEVEL_MECHANICS_CHAPTERS } from "../data/alevel/mechanics/index";

const PAPERS = [
  {
    id: "pure",
    label: "Pure Mathematics",
    icon: "∂",
    color: "#6366f1",
    desc: "Paper 1 · 9 chapters",
    chapters: ALEVEL_PURE_CHAPTERS,
  },
  {
    id: "stats",
    label: "Statistics",
    icon: "σ",
    color: "#22d3ee",
    desc: "Paper 2 · 2 chapters",
    chapters: ALEVEL_STATS_CHAPTERS,
  },
  {
    id: "mechanics",
    label: "Mechanics",
    icon: "⚙️",
    color: "#f97316",
    desc: "Paper 2 · 3 chapters",
    chapters: ALEVEL_MECHANICS_CHAPTERS,
  },
];

function ChapterGrid({ onSelectChapter }) {
  const navigate = useNavigate();
  const { T } = useTheme();
  const [activePaper, setActivePaper] = useState("pure");
  const paper = PAPERS.find(p => p.id === activePaper);

  return (
    <div style={{ minHeight: "100vh", background: T.dark, fontFamily: "'Segoe UI', sans-serif" }}>
      {/* Header */}
      <div style={{ background: T.card, borderBottom: `1px solid ${T.border}`, padding: "14px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={() => navigate(-1)} style={{ background: T.surface, border: `1px solid ${T.border}`, color: T.sub, borderRadius: 7, padding: "6px 14px", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>← Back</button>
          <div style={{ width: 32, height: 32, borderRadius: 7, background: `linear-gradient(135deg, ${T.green}, ${T.green2})`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 12, color: "#04120d" }}>CF</div>
          <div>
            <span style={{ color: T.text, fontWeight: 700, fontSize: 15 }}>A-Level Maths</span>
            <span style={{ color: T.muted, fontSize: 12, marginLeft: 8 }}>Year 2 · Edexcel 9MA0</span>
          </div>
        </div>
        <ThemeToggle />
      </div>

      <div style={{ maxWidth: 880, margin: "0 auto", padding: "32px 24px" }}>
        {/* Paper tabs */}
        <div style={{ display: "flex", gap: 10, marginBottom: 28, flexWrap: "wrap" }}>
          {PAPERS.map(p => (
            <button key={p.id} onClick={() => setActivePaper(p.id)} style={{
              display: "flex", alignItems: "center", gap: 10,
              background: activePaper === p.id ? p.color + "18" : T.surface,
              border: `1px solid ${activePaper === p.id ? p.color + "50" : T.border}`,
              borderRadius: 12, padding: "11px 20px", cursor: "pointer",
              color: activePaper === p.id ? p.color : T.sub,
              fontWeight: 700, fontSize: 13, fontFamily: "'Segoe UI', sans-serif",
              transition: "all 0.18s",
            }}>
              <span style={{ fontSize: 18 }}>{p.icon}</span>
              <div style={{ textAlign: "left" }}>
                <div style={{ color: activePaper === p.id ? p.color : T.text, fontWeight: 700 }}>{p.label}</div>
                <div style={{ color: T.muted, fontSize: 11, marginTop: 1 }}>{p.desc}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Info */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: T.muted, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 14 }}>
            {paper.label} — {paper.chapters.reduce((s, c) => s + c.topics.length, 0)} topics across {paper.chapters.length} chapters
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {paper.chapters.map(ch => {
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
                    <div style={{ background: meta.color + "15", color: meta.color, borderRadius: 5, padding: "2px 8px", fontSize: 10, fontWeight: 700, border: `1px solid ${meta.color}35`, height: "fit-content" }}>{ch.topics.length} topics</div>
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

export default function ALevelHome() {
  const [selectedChapter, setSelectedChapter] = useState(null);

  if (selectedChapter) {
    const { meta, topics } = selectedChapter;
    const coloredTopics = topics.map(t => ({ ...t, color: t.color || meta.color }));
    return (
      <MasteryFlow
        key={meta.id}
        topics={coloredTopics}
        title={meta.title}
        subtitle={`A-Level Year 2 · ${meta.subtitle}`}
        onBack={() => setSelectedChapter(null)}
        vizMap={{}}
        videoUrl={meta.videoUrl || null}
      />
    );
  }

  return <ChapterGrid onSelectChapter={setSelectedChapter} />;
}
