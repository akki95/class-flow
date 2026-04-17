export default function IGCSEChapterPicker({ chapters, onSelect, onBack }) {
  const chapterLabels = {
    algebra_and_functions: "Algebra & Functions",
    cordinate: "Coordinate Geometry",
    derivatives: "Derivatives",
    differentiation: "Differentiation",
    integration: "Integration",
    mechanics: "Mechanics",
    probability: "Probability",
    proof: "Proof",
    statistics: "Statistics",
    trigonometry: "Trigonometry",
    vectors: "Vectors"
  };

  const chapterIcons = {
    algebra_and_functions: "📐", cordinate: "📍", derivatives: "📈",
    differentiation: "∂", integration: "∫", mechanics: "⚙️",
    probability: "🎲", proof: "✏️", statistics: "📊",
    trigonometry: "📐", vectors: "➡️"
  };

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

        <h2 style={styles.heading}>AS Level Maths — Edexcel</h2>
        <p style={styles.sub}>Select a chapter to begin the session</p>

        <div style={styles.grid}>
          {chapters.map(chapter => (
            <button key={chapter.id} onClick={() => onSelect(chapter)} style={styles.chapterCard}>
              <div style={styles.chapterIcon}>{chapterIcons[chapter.id] || "📚"}</div>
              <div style={styles.chapterTitle}>{chapterLabels[chapter.id] || chapter.title}</div>
              <div style={styles.chapterMeta}>
                {chapter.topics?.length || 0} topics
              </div>
            </button>
          ))}
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
  grid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 },
  chapterCard: { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "18px 16px", textAlign: "left", cursor: "pointer", color: "white", transition: "all 0.2s" },
  chapterIcon: { fontSize: 24, marginBottom: 8 },
  chapterTitle: { fontSize: 14, fontWeight: 600, marginBottom: 4, color: "white" },
  chapterMeta: { fontSize: 12, color: "#475569" }
};