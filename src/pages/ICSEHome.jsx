import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MasteryFlow from "../components/MasteryFlow";
import { useTheme, ThemeToggle } from "../context/ThemeContext";
import { CLASS9_CHAPTERS } from "../data/icse/class9/index";
import { CLASS10_CHAPTERS } from "../data/icse/class10/index";

const TIERS = [
  {
    id: "class9",
    label: "Class 9",
    tag: "Foundation · Build core concepts",
    emoji: "📘",
    color: "#6366f1",
    desc: "Number Systems, Commercial Maths, Algebra, Geometry, Mensuration, Trig & Coord Geometry, Statistics",
    chapters: CLASS9_CHAPTERS,
  },
  {
    id: "class10",
    label: "Class 10",
    tag: "Board Exam · CISCE",
    emoji: "📗",
    color: "#10b981",
    desc: "GST & Banking, Quadratics, Matrices, AP/GP, Circle Theorems, Trigonometry, Probability",
    chapters: CLASS10_CHAPTERS,
  },
];

function ChapterGrid({ onSelectChapter }) {
  const navigate = useNavigate();
  const { T } = useTheme();
  const [activeTier, setActiveTier] = useState("class10");
  const tier = TIERS.find(t => t.id === activeTier);

  return (
    <div style={{ minHeight: "100vh", background: T.dark, fontFamily: "'Segoe UI', sans-serif" }}>
      {/* Header */}
      <div style={{ background: T.card, borderBottom: `1px solid ${T.border}`, padding: "14px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={() => navigate(-1)} style={{ background: T.surface, border: `1px solid ${T.border}`, color: T.sub, borderRadius: 7, padding: "6px 14px", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>← Back</button>
          <div style={{ width: 32, height: 32, borderRadius: 7, background: `linear-gradient(135deg, ${T.green}, ${T.green2})`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 12, color: "#04120d" }}>CF</div>
          <div>
            <span style={{ color: T.text, fontWeight: 700, fontSize: 15 }}>ICSE Mathematics</span>
            <span style={{ color: T.muted, fontSize: 12, marginLeft: 8 }}>CISCE · Class 9 & 10</span>
          </div>
        </div>
        <ThemeToggle />
      </div>

      <div style={{ maxWidth: 880, margin: "0 auto", padding: "32px 24px" }}>
        {/* Tier tabs */}
        <div style={{ display: "flex", gap: 12, marginBottom: 28 }}>
          {TIERS.map(t => (
            <button key={t.id} onClick={() => setActiveTier(t.id)} style={{
              flex: 1, display: "flex", alignItems: "center", gap: 12,
              background: activeTier === t.id ? t.color + "18" : T.surface,
              border: `1px solid ${activeTier === t.id ? t.color + "50" : T.border}`,
              borderRadius: 14, padding: "14px 20px", cursor: "pointer",
              transition: "all 0.18s", fontFamily: "'Segoe UI', sans-serif", textAlign: "left",
            }}>
              <span style={{ fontSize: 26 }}>{t.emoji}</span>
              <div>
                <div style={{ color: activeTier === t.id ? t.color : T.text, fontWeight: 800, fontSize: 16 }}>{t.label}</div>
                <div style={{ color: T.muted, fontSize: 12, marginTop: 2 }}>{t.tag}</div>
                <div style={{ color: T.sub, fontSize: 11, marginTop: 3 }}>{t.desc}</div>
              </div>
              <div style={{ marginLeft: "auto", color: activeTier === t.id ? t.color : T.muted, fontWeight: 700, fontSize: 13 }}>
                {t.chapters.reduce((s, c) => s + c.topics.length, 0)} topics
              </div>
            </button>
          ))}
        </div>

        {/* Chapter cards */}
        <div style={{ fontSize: 11, fontWeight: 700, color: T.muted, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 14 }}>
          {tier.label} — {tier.chapters.length} chapters
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
          {tier.chapters.map(ch => {
            const { meta } = ch;
            return (
              <button key={meta.id} onClick={() => onSelectChapter(ch)} style={{
                background: T.surface, border: `1px solid ${T.border}`,
                borderRadius: 14, padding: "20px", textAlign: "left",
                cursor: "pointer", color: T.text, transition: "all 0.18s",
                fontFamily: "'Segoe UI', sans-serif",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: meta.color + "18", color: meta.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 800 }}>{meta.icon}</div>
                  <div style={{ background: meta.color + "15", color: meta.color, borderRadius: 6, padding: "3px 10px", fontSize: 11, fontWeight: 700, border: `1px solid ${meta.color}35`, height: "fit-content" }}>
                    {ch.topics.length} topics
                  </div>
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

export default function ICSEHome() {
  const [selectedChapter, setSelectedChapter] = useState(null);

  if (selectedChapter) {
    const { meta, topics } = selectedChapter;
    const coloredTopics = topics.map(t => ({ ...t, color: t.color || meta.color }));
    return (
      <MasteryFlow
        key={meta.id}
        topics={coloredTopics}
        title={meta.title}
        subtitle={`ICSE · ${meta.tier} · ${meta.subtitle}`}
        onBack={() => setSelectedChapter(null)}
        vizMap={{}}
        videoUrl={meta.videoUrl || null}
      />
    );
  }

  return <ChapterGrid onSelectChapter={setSelectedChapter} />;
}
