import { useNavigate } from "react-router-dom";

export default function IGCSEChapterPicker({ chapters, onSelect, onBack }) {
  const navigate = useNavigate();

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
            <div style={styles.logoName}>ScoreQuanta</div>
          </div>
        </div>

        <h2 style={styles.heading}>AS Level Maths — Edexcel</h2>
        <p style={styles.sub}>Select a chapter to begin the session</p>

        {/* Pinned mastery flows */}
        <div style={styles.masterySection}>
          <div style={styles.masterySectionLabel}>Mastery Flows</div>
          <button onClick={() => navigate("/igcse/edexcel/pure")} style={styles.masteryCard}>
            <div style={styles.masteryIcon}>∂</div>
            <div style={{ flex: 1, textAlign: "left" }}>
              <div style={styles.masteryTitle}>Pure Mathematics</div>
              <div style={styles.masterySub}>9 chapters · Proof · Algebra · Calculus · Sequences · Vectors</div>
            </div>
            <div style={styles.masteryArrow}>→</div>
          </button>

          <button onClick={() => navigate("/igcse/edexcel/stats")} style={{ ...styles.masteryCard, borderColor: "#22d3ee40" }}>
            <div style={{ ...styles.masteryIcon, background: "#22d3ee20", color: "#22d3ee" }}>σ</div>
            <div style={{ flex: 1, textAlign: "left" }}>
              <div style={styles.masteryTitle}>Statistics</div>
              <div style={styles.masterySub}>7 chapters · Data · Probability · Binomial · Hypothesis Testing</div>
            </div>
            <div style={{ ...styles.masteryArrow, color: "#22d3ee" }}>→</div>
          </button>

          <button onClick={() => navigate("/igcse/edexcel/mechanics")} style={{ ...styles.masteryCard, borderColor: "#f9731640" }}>
            <div style={{ ...styles.masteryIcon, background: "#f9731620", color: "#f97316" }}>⚙️</div>
            <div style={{ flex: 1, textAlign: "left" }}>
              <div style={styles.masteryTitle}>Mechanics</div>
              <div style={styles.masterySub}>4 chapters · Modelling · SUVAT · Forces · Variable Acceleration</div>
            </div>
            <div style={{ ...styles.masteryArrow, color: "#f97316" }}>→</div>
          </button>

          <button onClick={() => navigate("/igcse/edexcel/past-papers")} style={{ ...styles.masteryCard, borderColor: "#f59e0b40" }}>
            <div style={{ ...styles.masteryIcon, background: "#f59e0b20", color: "#f59e0b" }}>📄</div>
            <div style={{ flex: 1, textAlign: "left" }}>
              <div style={styles.masteryTitle}>Past Papers</div>
              <div style={styles.masterySub}>2018–2024 · Pure · Stats · Mechanics · Mark Schemes</div>
            </div>
            <div style={{ ...styles.masteryArrow, color: "#f59e0b" }}>→</div>
          </button>

        </div>

        <div style={styles.sectionLabel}>All Chapters</div>
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

const CF_GREEN = "#00d4aa";

const styles = {
  container: { minHeight: "100vh", background: "linear-gradient(135deg, #0a0f1e 0%, #0d2137 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Segoe UI', sans-serif", padding: 24 },
  card: { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 24, padding: "36px 40px", width: "100%", maxWidth: 720, color: "white" },
  header: { display: "flex", alignItems: "center", gap: 16, marginBottom: 28 },
  backBtn: { background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8", borderRadius: 8, padding: "6px 14px", cursor: "pointer", fontSize: 13 },
  logoRow: { display: "flex", alignItems: "center", gap: 10 },
  logoIcon: { width: 36, height: 36, borderRadius: 8, background: `linear-gradient(135deg, ${CF_GREEN}, #0be5c0)`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 13, color: "#0a1a14" },
  logoName: { fontSize: 18, fontWeight: 800, color: "white" },
  heading: { fontSize: 22, fontWeight: 700, marginBottom: 8 },
  sub: { color: "#64748b", fontSize: 14, marginBottom: 20 },

  masterySection: { marginBottom: 24 },
  masterySectionLabel: { fontSize: 11, fontWeight: 700, color: CF_GREEN, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 },
  masteryCard: { width: "100%", display: "flex", alignItems: "center", gap: 14, background: `${CF_GREEN}12`, border: `1px solid ${CF_GREEN}40`, borderRadius: 14, padding: "14px 18px", cursor: "pointer", color: "white", fontFamily: "'Segoe UI', sans-serif", transition: "all 0.2s" },
  masteryIcon: { width: 40, height: 40, borderRadius: 10, background: `${CF_GREEN}25`, color: CF_GREEN, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 800, flexShrink: 0 },
  masteryTitle: { fontSize: 15, fontWeight: 700, marginBottom: 3, display: "flex", alignItems: "center", gap: 8 },
  masterySub: { fontSize: 12, color: "#64748b" },
  masteryArrow: { color: CF_GREEN, fontSize: 18, fontWeight: 700, marginLeft: "auto" },
  newBadge: { background: `${CF_GREEN}25`, color: CF_GREEN, fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 5, letterSpacing: "0.04em" },

  sectionLabel: { fontSize: 11, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 },
  grid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 },
  chapterCard: { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "18px 16px", textAlign: "left", cursor: "pointer", color: "white", transition: "all 0.2s", fontFamily: "'Segoe UI', sans-serif" },
  chapterIcon: { fontSize: 24, marginBottom: 8 },
  chapterTitle: { fontSize: 14, fontWeight: 600, marginBottom: 4, color: "white" },
  chapterMeta: { fontSize: 12, color: "#475569" }
};
