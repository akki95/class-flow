import React, { useRef, useEffect, useState } from "react";
import { doc, onSnapshot, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Whiteboard({ sessionId, isActive, readOnly = false }) {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#ef4444"); // Red ink by default
  const [strokes, setStrokes] = useState([]);

  // Sync state from Firestore
  useEffect(() => {
    if (!sessionId) return;
    const unsub = onSnapshot(doc(db, "sessions", sessionId), (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        if (data.whiteboardData) {
          drawStrokes(data.whiteboardData);
          if (readOnly) setStrokes(data.whiteboardData);
        } else {
          drawStrokes([]);
          if (readOnly) setStrokes([]);
        }
      }
    });
    return () => unsub();
  }, [sessionId, readOnly]);

  // Init canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Set to match parent's dimensions
    const parent = canvas.parentElement;
    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;
    canvas.style.width = `${parent.clientWidth}px`;
    canvas.style.height = `${parent.clientHeight}px`;

    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.lineJoin = "round";
    context.lineWidth = 3;
    contextRef.current = context;
    
    // Initial draw in case of resize or late init
    if (strokes.length > 0) {
      drawStrokes(strokes);
    }
  }, [isActive, strokes]);

  const drawStrokes = (strokesToDraw) => {
    const context = contextRef.current;
    const canvas = canvasRef.current;
    if (!context || !canvas) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    strokesToDraw.forEach(stroke => {
      if (!stroke.points || stroke.points.length === 0) return;
      context.strokeStyle = stroke.color;
      context.beginPath();
      context.moveTo(stroke.points[0].x * canvas.width, stroke.points[0].y * canvas.height);
      stroke.points.forEach(p => {
        context.lineTo(p.x * canvas.width, p.y * canvas.height);
      });
      context.stroke();
    });
  };

  const startDrawing = ({ nativeEvent }) => {
    if (readOnly) return;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);

    const canvas = canvasRef.current;
    const newStroke = { color, points: [{ x: offsetX / canvas.width, y: offsetY / canvas.height }] };
    setStrokes(prev => [...prev, newStroke]);
  };

  const finishDrawing = async () => {
    if (readOnly || !isDrawing) return;
    contextRef.current.closePath();
    setIsDrawing(false);

    // Save stroke to firestore
    if (sessionId) {
      const docRef = doc(db, "sessions", sessionId);
      const docSnap = await getDoc(docRef);
      const existing = docSnap.exists() ? (docSnap.data().whiteboardData || []) : [];
      const latestStroke = strokes[strokes.length - 1];
      if (latestStroke) {
        await setDoc(docRef, { whiteboardData: [...existing, latestStroke] }, { merge: true });
      }
    }
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing || readOnly) return;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();

    const canvas = canvasRef.current;
    setStrokes(prev => {
      const updated = [...prev];
      updated[updated.length - 1].points.push({ x: offsetX / canvas.width, y: offsetY / canvas.height });
      return updated;
    });
  };

  const clearBoard = async () => {
    if (readOnly) return;
    setStrokes([]);
    const context = contextRef.current;
    const canvas = canvasRef.current;
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (sessionId) {
      await setDoc(doc(db, "sessions", sessionId), { whiteboardData: [] }, { merge: true });
    }
  };

  if (!isActive) return null;

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 5, pointerEvents: readOnly ? "none" : "auto", overflow: "hidden" }}>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        onMouseLeave={finishDrawing}
        style={{ cursor: readOnly ? "default" : "crosshair", position: "absolute", top: 0, left: 0 }}
      />
      {/* Controls */}
      {!readOnly && (
        <div style={{ position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)", background: "white", padding: "8px 16px", borderRadius: 20, boxShadow: "0 4px 12px rgba(0,0,0,0.1)", display: "flex", gap: 12, border: "1px solid #e2e8f0" }}>
          {["#ef4444", "#3b82f6", "#10b981", "#0f172a"].map(c => (
            <div key={c} onClick={() => setColor(c)} style={{ width: 24, height: 24, borderRadius: "50%", background: c, cursor: "pointer", border: color === c ? "2px solid #000" : "2px solid transparent", transform: color === c ? "scale(1.1)" : "scale(1)" }} />
          ))}
          <div style={{ width: 1, background: "#e2e8f0", margin: "0 4px" }} />
          <button onClick={clearBoard} style={{ background: "transparent", border: "none", color: "#64748b", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>Clear</button>
        </div>
      )}
    </div>
  );
}