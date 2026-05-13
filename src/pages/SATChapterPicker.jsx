import { useState } from "react";
import { satCurriculum } from "../data/satCurriculum";

export default function SATChapterPicker({ onSelect, onBack }) {
  const [selectedChapter, setSelectedChapter] = useState(null);

  const mathChapters = satCurriculum.chapters.filter(c => c.section === "math");
  const verbalChapters = satCurriculum.chapters.filter(c => c.section === "verbal");

  if (selectedChapter) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.header}>
            <button onClick={() => setSelectedChapter(null)} style={styles.backBtn}>← Back to Chapters</button>
            <div style={styles.logoRow}>
              <div style={styles.logoIcon}>CF</div>
              <div style={styles.logoName}>ClassFlow</div>
            </div>
          </div>

          <h2 style={styles.heading}>{selectedChapter.title} Lessons</h2>
          <p style={styles.sub}>Select a lesson to begin the session</p>

          <div style={styles.grid}>
            {selectedChapter.lessons.map(lesson => (
              <button key={lesson.id} onClick={() => onSelect(lesson, selectedChapter)} style={styles.chapterCard}>
                <div style={styles.chapterIcon}>{selectedChapter.icon}</div>
                <div style={styles.chapterTitle}>{lesson.title}</div>
                <div style={styles.chapterMeta}>{lesson.subtopics.length} subtopics</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <button onClick={onBack} style={styles.backBtn}>← Back</button>
          <div style={styles.logoRow}>
            <div style={styles.logoIcon}>CF</div>
            <div style={styles.logoName}>ClassFlow</div>
          </div>
        </div>

        <h2 style={styles.heading}>SAT Preparation</h2>
        <p style={styles.sub}>Select a topic to view its lessons</p>

        <div style={styles.section}>
          <div style={styles.sectionLabel}>📐 Math</div>
          <div style={styles.grid}>
            {mathChapters.map(chapter => (
              <button key={chapter.id} onClick={() => setSelectedChapter(chapter)} style={styles.chapterCard}>
                <div style={styles.chapterIcon}>{chapter.icon}</div>
                <div style={styles.chapterTitle}>{chapter.title}</div>
                <div style={styles.chapterMeta}>{chapter.lessons.length} lessons</div>
              </button>
            ))}
          </div>
        </div>

        <div style={styles.section}>
          <div style={styles.sectionLabel}>📖 Verbal</div>
          <div style={styles.grid}>
            {verbalChapters.map(chapter => (
              <button key={chapter.id} onClick={() => setSelectedChapter(chapter)} style={styles.chapterCard}>
                <div style={styles.chapterIcon}>{chapter.icon}</div>
                <div style={styles.chapterTitle}>{chapter.title}</div>
                <div style={styles.chapterMeta}>{chapter.lessons.length} lessons</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: "100vh", background: "linear-gradient(135deg, #0a0f1e 0%, #0d2137 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Segoe UI', sans-serif", padding: 24 },
  card: { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 24, padding: "36px 40px", width: "100%", maxWidth: 700, color: "white" },
  header: { display: "flex", alignItems: "center", gap: 16, marginBottom: 28 },
  backBtn: { background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8", borderRadius: 8, padding: "6px 14px", cursor: "pointer", fontSize: 13 },
  logoRow: { display: "flex", alignItems: "center", gap: 10 },
  logoIcon: { width: 36, height: 36, borderRadius: 8, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 13, color: "white" },
  logoName: { fontSize: 18, fontWeight: 800, color: "white" },
  heading: { fontSize: 22, fontWeight: 700, marginBottom: 8 },
  sub: { color: "#64748b", fontSize: 14, marginBottom: 28 },
  section: { marginBottom: 28 },
  sectionLabel: { color: "#94a3b8", fontSize: 13, fontWeight: 600, marginBottom: 12, textTransform: "uppercase", letterSpacing: 1 },
  grid: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 },
  chapterCard: { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "16px", textAlign: "left", cursor: "pointer", color: "white", transition: "all 0.2s" },
  chapterIcon: { fontSize: 24, marginBottom: 8 },
  chapterTitle: { fontSize: 14, fontWeight: 600, marginBottom: 4 },
  chapterMeta: { fontSize: 12, color: "#475569" }
};