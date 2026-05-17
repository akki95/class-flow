import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useTheme } from "../context/ThemeContext";

export default function FeedbackWidget({ userEmail = null }) {
  const { T } = useTheme();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [email, setEmail] = useState(userEmail || "");
  const [status, setStatus] = useState("idle"); // idle | sending | done

  const submit = async () => {
    if (!text.trim()) return;
    setStatus("sending");
    try {
      await addDoc(collection(db, "feedback"), {
        message: text.trim(),
        email: email.trim() || null,
        page: window.location.pathname,
        timestamp: serverTimestamp(),
      });
      setStatus("done");
      setTimeout(() => { setOpen(false); setText(""); setStatus("idle"); }, 2000);
    } catch (e) {
      console.error(e);
      setStatus("idle");
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(o => !o)}
        title="Share feedback"
        style={{
          position: "fixed", bottom: 24, right: 24, zIndex: 500,
          width: 48, height: 48, borderRadius: "50%",
          background: T.green, border: "none",
          fontSize: 20, cursor: "pointer",
          boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "transform 0.2s",
        }}
      >
        {open ? "✕" : "💬"}
      </button>

      {/* Modal */}
      {open && (
        <div style={{
          position: "fixed", bottom: 84, right: 24, zIndex: 500,
          width: 300, background: T.card,
          border: `1px solid ${T.borderMid}`,
          borderRadius: 16, padding: "20px 18px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
          fontFamily: "'Segoe UI', sans-serif",
        }}>
          {status === "done" ? (
            <div style={{ textAlign: "center", padding: "12px 0" }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🎉</div>
              <div style={{ color: T.green, fontWeight: 700, fontSize: 15 }}>Thanks for the feedback!</div>
            </div>
          ) : (
            <>
              <div style={{ color: T.text, fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Share feedback</div>
              <div style={{ color: T.sub, fontSize: 12, marginBottom: 14 }}>Bug? Suggestion? We read everything.</div>

              <textarea
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="What's on your mind?"
                rows={4}
                style={{
                  width: "100%", boxSizing: "border-box",
                  background: T.surface, border: `1px solid ${T.border}`,
                  borderRadius: 10, padding: "10px 12px",
                  color: T.text, fontSize: 14, fontFamily: "'Segoe UI', sans-serif",
                  resize: "none", outline: "none", marginBottom: 10,
                }}
              />

              {!userEmail && (
                <input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Email (optional)"
                  style={{
                    width: "100%", boxSizing: "border-box",
                    background: T.surface, border: `1px solid ${T.border}`,
                    borderRadius: 10, padding: "9px 12px",
                    color: T.text, fontSize: 13, fontFamily: "'Segoe UI', sans-serif",
                    outline: "none", marginBottom: 12,
                  }}
                />
              )}

              <button
                onClick={submit}
                disabled={!text.trim() || status === "sending"}
                style={{
                  width: "100%", background: T.green, border: "none",
                  borderRadius: 9, padding: "10px", cursor: "pointer",
                  fontWeight: 700, fontSize: 14, color: "#04120d",
                  fontFamily: "'Segoe UI', sans-serif",
                  opacity: !text.trim() ? 0.5 : 1,
                }}
              >
                {status === "sending" ? "Sending…" : "Send Feedback"}
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
