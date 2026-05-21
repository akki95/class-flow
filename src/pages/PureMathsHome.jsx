import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MasteryFlow from "../components/MasteryFlow";
import { useTheme, ThemeToggle } from "../context/ThemeContext";
import { PURE_CHAPTERS } from "../data/pureMaths/index";
import { SEQUENCES_VIZ_MAP } from "./SequencesFlow";

// ─── Chapter home — grid of all 8 chapters ────────────────────────────────────
function ChapterGrid({ onSelect }) {
  const navigate = useNavigate();
  const { T } = useTheme();

  const st = {
    container: { minHeight: "100vh", background: T.dark, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Segoe UI', sans-serif", padding: 24 },
    card: { background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: "36px 44px", width: "100%", maxWidth: 860, color: "white", boxShadow: "0 24px 64px rgba(0,0,0,0.4)" },
    header: { display: "flex", alignItems: "center", gap: 16, marginBottom: 28 },
    backBtn: { background: "rgba(255,255,255,0.05)", border: `1px solid ${T.border}`, color: T.sub, borderRadius: 7, padding: "6px 14px", cursor: "pointer", fontSize: 12, fontFamily: "'Segoe UI', sans-serif" },
    logo: { width: 38, height: 38, borderRadius: 9, background: `linear-gradient(135deg, ${T.green}, ${T.green2})`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 13, color: "#04120d" },
    appName: { fontWeight: 700, fontSize: 16, color: T.text },
    boardLabel: { fontSize: 11, color: T.muted, marginTop: 2 },
    title: { fontSize: 26, fontWeight: 800, margin: "0 0 6px", color: T.text, letterSpacing: "-0.02em" },
    sub: { color: T.sub, fontSize: 13, margin: "0 0 22px", fontWeight: 400, lineHeight: 1.6 },
    seqNote: { display: "flex", alignItems: "center", gap: 12, background: T.greenBg, border: `1px solid ${T.greenBorder}`, borderRadius: 10, padding: "11px 16px", marginBottom: 24, color: T.green },
    seqBtn: { background: T.green, border: "none", color: "#04120d", borderRadius: 7, padding: "6px 14px", cursor: "pointer", fontWeight: 700, fontSize: 12, fontFamily: "'Segoe UI', sans-serif" },
    sectionLabel: { fontSize: 11, fontWeight: 700, color: T.muted, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 12 },
    grid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 },
    chapterCard: { background: "rgba(255,255,255,0.025)", border: "1px solid", borderRadius: 12, padding: "14px", textAlign: "left", cursor: "pointer", color: "white", transition: "all 0.18s", fontFamily: "'Segoe UI', sans-serif" },
    chIcon: { width: 36, height: 36, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, fontWeight: 800 },
    pill: { borderRadius: 5, padding: "2px 7px", fontSize: 10, fontWeight: 700 },
    chTitle: { fontSize: 12, fontWeight: 700, marginBottom: 3, color: T.text },
    chSub: { fontSize: 11, color: T.sub, lineHeight: 1.4 },
  };

  return (
    <div style={st.container}>
      <div style={st.card}>
        {/* Header */}
        <div style={st.header}>
          <button onClick={() => navigate("/igcse/edexcel")} style={st.backBtn}>← Back</button>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={st.logo}>CF</div>
            <div>
              <div style={st.appName}>ClassFlow</div>
              <div style={st.boardLabel}>A-Level Edexcel</div>
            </div>
          </div>
          <ThemeToggle style={{ marginLeft: "auto" }} />
        </div>

        <h1 style={st.title}>Pure Mathematics</h1>
        <p style={st.sub}>9 chapters · Paper 1 · 100 marks · 2 hours</p>
        {/* grid is now 4 cols, but we have 9 items — last row has 1 card, naturally left-aligned */}

        {/* Chapter grid */}
        <div style={st.sectionLabel}>All Chapters</div>
        <div style={st.grid}>
          {PURE_CHAPTERS.map((ch, i) => {
            const { meta } = ch;
            return (
              <button key={meta.id} onClick={() => onSelect(ch)} style={{ ...st.chapterCard, borderColor: meta.color + "40" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <div style={{ ...st.chIcon, background: meta.color + "20", color: meta.color }}>{meta.icon}</div>
                  <div style={{ ...st.pill, color: meta.color, background: meta.color + "15", border: `1px solid ${meta.color}35` }}>
                    {ch.topics.length} topics
                  </div>
                </div>
                <div style={st.chTitle}>{meta.title}</div>
                <div style={st.chSub}>{meta.subtitle}</div>
                {meta.videoUrl && (
                  <a href={meta.videoUrl} target="_blank" rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    style={{ display: "inline-flex", alignItems: "center", gap: 4, marginTop: 8, color: "#e03131", fontSize: 11, fontWeight: 700, textDecoration: "none" }}>
                    ▶ Watch
                  </a>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Root ──────────────────────────────────────────────────────────────────────
export default function PureMathsHome() {
  const [selectedChapter, setSelectedChapter] = useState(null);

  if (selectedChapter) {
    const { meta, topics, vizKey } = selectedChapter;
    const coloredTopics = topics.map(t => ({ ...t, color: t.color || meta.color }));
    const vizMap = vizKey === "sequences" ? SEQUENCES_VIZ_MAP : {};
    return (
      <MasteryFlow
        key={meta.id}
        topics={coloredTopics}
        title={meta.title}
        subtitle={meta.subtitle}
        onBack={() => setSelectedChapter(null)}
        vizMap={vizMap}
        videoUrl={meta.videoUrl || null}
      />
    );
  }

  return <ChapterGrid onSelect={setSelectedChapter} />;
}
