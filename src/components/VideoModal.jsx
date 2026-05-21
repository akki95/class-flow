import { useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

function getYouTubeId(url) {
  if (!url) return null;
  const match = url.match(/[?&]v=([^&]+)/);
  return match ? match[1] : null;
}

export default function VideoModal({ videoUrl, title, onClose }) {
  const { T } = useTheme();
  const videoId = getYouTubeId(videoUrl);

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!videoId) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 24,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: T.card, borderRadius: 16,
          width: "100%", maxWidth: 860,
          border: `1px solid ${T.border}`,
          boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
          overflow: "hidden",
          display: "flex", flexDirection: "column",
        }}
      >
        {/* Header */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "12px 18px", background: T.surface,
          borderBottom: `1px solid ${T.border}`,
          fontFamily: "'Segoe UI', sans-serif",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 16 }}>▶</span>
            <span style={{ color: T.text, fontWeight: 700, fontSize: 14 }}>
              {title || "Chapter Overview"}
            </span>
            <span style={{ color: T.muted, fontSize: 12 }}>— Bicen Maths</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <a
              href={videoUrl} target="_blank" rel="noopener noreferrer"
              style={{ color: T.sub, fontSize: 12, textDecoration: "none", fontFamily: "'Segoe UI', sans-serif" }}
            >
              Open in YouTube ↗
            </a>
            <button
              onClick={onClose}
              style={{
                background: "transparent", border: `1px solid ${T.border}`,
                color: T.sub, borderRadius: 6, padding: "4px 10px",
                cursor: "pointer", fontSize: 14, fontWeight: 600,
              }}
            >✕</button>
          </div>
        </div>

        {/* Video */}
        <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: "absolute", top: 0, left: 0,
              width: "100%", height: "100%",
              border: "none",
            }}
          />
        </div>
      </div>
    </div>
  );
}
