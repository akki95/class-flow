import React, { useState, useEffect } from "react";
import MathText from "../components/MathText";
import { satCurriculum } from "../data/satCurriculum";
import initialTheory from "../data/theory_baseline.json";

export default function AdminTheoryDashboard({ user, onBack }) {
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);
  
  // In a real app, this would be fetched from/saved to Supabase table "theory_slides"
  const [theoryData, setTheoryData] = useState({});
  const [editingContent, setEditingContent] = useState("");

  useEffect(() => {
    // Load initial mock data
    const map = {};
    initialTheory.forEach(item => {
      map[item.subtopic] = item.content;
    });
    setTheoryData(map);
  }, []);

  const handleSave = () => {
    if (!selectedSubtopic) return;
    setTheoryData(prev => ({
      ...prev,
      [selectedSubtopic]: editingContent
    }));
    alert("Saved theory content locally (Mock)!");
  };

  const handleEnhanceWithAI = () => {
    const pdfUrl = prompt("Paste a PDF URL or text to enhance this section via AI (Mock):");
    if (!pdfUrl) return;
    alert("In a full implementation, this would send the URL and current content to Gemini to rewrite and perfectly format it!");
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, color: "#0f172a" }}>📚 AI Theory Curation</h1>
          <p style={{ margin: "4px 0 0 0", color: "#64748b", fontSize: 14 }}>Review and enhance baseline theory explanations.</p>
        </div>
        <button onClick={onBack} style={styles.backBtn}>← Back to Dashboard</button>
      </div>

      <div style={styles.body}>
        {/* Sidebar Navigation */}
        <div style={styles.sidebar}>
          {satCurriculum.chapters.map(chapter => (
            <div key={chapter.id} style={{ marginBottom: 16 }}>
              <div style={styles.chapterTitle}>{chapter.icon} {chapter.title}</div>
              {chapter.lessons.map(lesson => (
                <div key={lesson.id} style={{ paddingLeft: 12 }}>
                  <div style={styles.lessonTitle}>{lesson.title}</div>
                  {lesson.subtopics.map(subtopic => (
                    <div
                      key={subtopic}
                      onClick={() => {
                        setSelectedChapter(chapter);
                        setSelectedLesson(lesson);
                        setSelectedSubtopic(subtopic);
                        setEditingContent(theoryData[subtopic] || "No baseline content yet. Click AI Enhance to generate.");
                      }}
                      style={{
                        ...styles.subtopicItem,
                        background: selectedSubtopic === subtopic ? "#e0e7ff" : "transparent",
                        color: selectedSubtopic === subtopic ? "#4f46e5" : "#64748b",
                        borderLeft: selectedSubtopic === subtopic ? "3px solid #6366f1" : "3px solid transparent"
                      }}
                    >
                      {subtopic}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Main Editor Area */}
        <div style={styles.main}>
          {!selectedSubtopic ? (
            <div style={styles.emptyState}>Select a subtopic from the left to review or edit its theory content.</div>
          ) : (
            <div style={{ display: "flex", gap: 24, height: "100%" }}>
              {/* Editor */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h2 style={{ margin: 0, fontSize: 18, color: "#0f172a" }}>Editing: {selectedSubtopic}</h2>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={handleEnhanceWithAI} style={styles.aiBtn}>✨ Enhance with AI</button>
                    <button onClick={handleSave} style={styles.saveBtn}>💾 Save</button>
                  </div>
                </div>
                <textarea
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                  style={styles.textarea}
                  placeholder="Enter Markdown theory content here..."
                />
              </div>

              {/* Live Preview */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
                <h2 style={{ margin: 0, fontSize: 18, color: "#0f172a" }}>Live Preview</h2>
                <div style={styles.preview}>
                  <MathText text={editingContent} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: "100vh", background: "#f8fafc", display: "flex", flexDirection: "column", fontFamily: "'Inter', sans-serif" },
  header: { background: "white", padding: "20px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #e2e8f0" },
  backBtn: { padding: "8px 16px", background: "white", border: "1px solid #cbd5e1", borderRadius: 8, cursor: "pointer", fontWeight: 600, color: "#475569" },
  body: { display: "flex", flex: 1, overflow: "hidden" },
  sidebar: { width: 320, background: "white", borderRight: "1px solid #e2e8f0", overflowY: "auto", padding: 20 },
  chapterTitle: { fontSize: 14, fontWeight: 800, color: "#0f172a", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 },
  lessonTitle: { fontSize: 13, fontWeight: 700, color: "#334155", margin: "8px 0 4px" },
  subtopicItem: { padding: "6px 12px", fontSize: 13, cursor: "pointer", transition: "all 0.2s", marginBottom: 2 },
  main: { flex: 1, padding: 32, overflowY: "auto" },
  emptyState: { height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#94a3b8", fontSize: 15 },
  textarea: { flex: 1, padding: 16, borderRadius: 12, border: "1px solid #cbd5e1", fontSize: 14, fontFamily: "monospace", resize: "none", outline: "none", lineHeight: 1.6 },
  preview: { flex: 1, padding: 24, borderRadius: 12, border: "1px solid #e2e8f0", background: "white", overflowY: "auto", fontSize: 15, lineHeight: 1.8, color: "#0f172a" },
  saveBtn: { padding: "8px 16px", background: "#10b981", color: "white", border: "none", borderRadius: 8, fontWeight: 600, cursor: "pointer" },
  aiBtn: { padding: "8px 16px", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "white", border: "none", borderRadius: 8, fontWeight: 600, cursor: "pointer" }
};
