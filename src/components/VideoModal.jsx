import { useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

function getYouTubeId(url) {
  if (!url) return null;
  const match = url.match(/[?&]v=([^&]+)/);
  return match ? match[1] : null;
}

// Slides in from the right — video plays alongside the content
export default function VideoSidebar({ videoUrl, title, isOpen, onClose }) {
  const { T } = useTheme();
  const videoId = getYouTubeId(videoUrl);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!videoId) return null;

  return (
    <div style={{
      position: "fixed", right: 0, top: 0, bottom: 0, width: 480,
      background: T.card,
      borderLeft: `1px solid ${T.borderMid}`,
      boxShadow: "-12px 0 48px rgba(0,0,0,0.15)",
      zIndex: 300,
      display: "flex", flexDirection: "column",
      transform: isOpen ? "translateX(0)" : "translateX(100%)",
      transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
      fontFamily: "'Segoe UI', sans-serif",
    }}>
      {/* Header */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "13px 16px",
        background: T.surface, borderBottom: `1px solid ${T.border}`,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: "#e03131", fontSize: 14 }}>▶</span>
          <span style={{ color: T.text, fontWeight: 700, fontSize: 13 }}>{title}</span>
          <span style={{ color: T.muted, fontSize: 11 }}>· Bicen Maths</span>
        </div>
        <button onClick={onClose} style={{
          background: "transparent", border: `1px solid ${T.border}`,
          color: T.sub, borderRadius: 6, padding: "4px 10px",
          cursor: "pointer", fontSize: 14, fontWeight: 600,
        }}>✕</button>
      </div>

      {/* Video */}
      <div style={{ position: "relative", width: "100%", paddingBottom: "56.25%" }}>
        {isOpen && (
          <iframe
            key={videoId}
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
          />
        )}
      </div>

      {/* Footer note */}
      <div style={{ padding: "14px 16px", flex: 1, background: T.surface, borderTop: `1px solid ${T.border}` }}>
        <p style={{ color: T.sub, fontSize: 12, margin: 0, lineHeight: 1.6 }}>
          Quick chapter overview by Bicen Maths. Once you've watched, click any topic card to start learning.
        </p>
        <a href={videoUrl} target="_blank" rel="noopener noreferrer"
          style={{ display: "inline-block", marginTop: 10, color: "#e03131", fontSize: 12, fontWeight: 600, textDecoration: "none" }}>
          Open full screen on YouTube ↗
        </a>
      </div>
    </div>
  );
}
