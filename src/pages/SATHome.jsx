import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MasteryFlow from "../components/MasteryFlow";
import { useTheme, ThemeToggle } from "../context/ThemeContext";
import { SAT_CHAPTERS } from "../data/sat/index";

function ChapterGrid({ onSelectChapter }) {
  const navigate = useNavigate();
  const { T } = useTheme();
  const totalTopics = SAT_CHAPTERS.reduce((s, c) => s + c.topics.length, 0);

  const st = {
    container: { minHeight: "100vh", background: T.dark, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Segoe UI', sans-serif", padding: 24 },
    card: { background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: "36px 44px", width: "100%", maxWidth: 820, color: T.text, boxShadow: T.pageShadow },
    header: { display: "flex", alignItems: "center", gap: 16, marginBottom: 28 },
    backBtn: { background: T.surface, border: `1px solid ${T.border}`, color: T.sub, borderRadius: 7, padding: "6px 14px", cursor: "pointer", fontSize: 12, fontFamily: "'Segoe UI', sans-serif" },
    logo: { width: 38, height: 38, borderRadius: 9, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 13, color: "white" },
    grid: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 },
    chapterCard: { background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, padding: "20px", textAlign: "left", cursor: "pointer", color: T.text, transition: "all 0.18s", fontFamily: "'Segoe UI', sans-serif" },
  };

  return (
    <div style={st.container}>
      <div style={st.card}>
        <div style={st.header}>
          <button onClick={() => navigate(-1)} style={st.backBtn}>← Back</button>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={st.logo}>CF</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 16, color: T.text }}>ClassFlow</div>
              <div style={{ fontSize: 11, color: T.muted }}>Digital SAT · Math</div>
            </div>
          </div>
          <ThemeToggle style={{ marginLeft: "auto" }} />
        </div>

        <h1 style={{ fontSize: 26, fontWeight: 900, margin: "0 0 6px", color: T.text, letterSpacing: "-0.02em" }}>SAT Math</h1>
        <p style={{ color: T.sub, fontSize: 13, margin: "0 0 24px" }}>Digital SAT · College Board · 4 sections · {totalTopics} topics</p>

        <div style={{ fontSize: 11, fontWeight: 700, color: T.muted, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 14 }}>All Sections</div>
        <div style={st.grid}>
          {SAT_CHAPTERS.map(ch => {
            const { meta } = ch;
            return (
              <button key={meta.id} onClick={() => onSelectChapter(ch)} style={{ ...st.chapterCard, borderColor: meta.color + "40" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: meta.color + "18", color: meta.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 800 }}>{meta.icon}</div>
                  <div style={{ background: meta.color + "15", color: meta.color, borderRadius: 5, padding: "2px 8px", fontSize: 10, fontWeight: 700, border: `1px solid ${meta.color}35`, height: "fit-content" }}>{ch.topics.length} topics</div>
                </div>
                <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 4, color: T.text }}>{meta.title}</div>
                <div style={{ fontSize: 12, color: T.sub, lineHeight: 1.5 }}>{meta.subtitle}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function SATHome() {
  const [selectedChapter, setSelectedChapter] = useState(null);

  if (selectedChapter) {
    const { meta, topics } = selectedChapter;
    const coloredTopics = topics.map(t => ({ ...t, color: t.color || meta.color }));
    return (
      <MasteryFlow
        key={meta.id}
        topics={coloredTopics}
        title={meta.title}
        subtitle={`SAT Math · ${meta.subtitle}`}
        onBack={() => setSelectedChapter(null)}
        vizMap={{}}
        videoUrl={meta.videoUrl || null}
      />
    );
  }

  return <ChapterGrid onSelectChapter={setSelectedChapter} />;
}
