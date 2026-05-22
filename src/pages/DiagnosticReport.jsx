import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { useTheme } from "../context/ThemeContext";
import { fallbackReport } from "../utils/reportGenerator";
import { findLesson } from "../data/conceptLessonMap";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const supabaseAdmin = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_SERVICE_KEY
);

const SEVERITY_COLORS = { extreme: "#ef4444", high: "#f97316", moderate: "#f59e0b" };
const PRIORITY_COLORS  = { high: "#ef4444", medium: "#f59e0b", low: "#1aa38a" };

function RadarChart({ scores, T }) {
  const labels = ["Accuracy", "Pacing", "Confidence", "Decisions", "Endurance", "Trap Resist."];
  const cx = 120, cy = 120, r = 85;
  const n = labels.length;
  const toXY = (i, val) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    const d = (val / 100) * r;
    return { x: cx + d * Math.cos(angle), y: cy + d * Math.sin(angle) };
  };
  const labelXY = (i) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    return { x: cx + (r + 22) * Math.cos(angle), y: cy + (r + 22) * Math.sin(angle) };
  };
  const rings = [20, 40, 60, 80, 100];
  const ringPoints = (pct) => Array.from({ length: n }, (_, i) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    const d = (pct / 100) * r;
    return `${cx + d * Math.cos(angle)},${cy + d * Math.sin(angle)}`;
  }).join(" ");
  const dataPoints = scores.map((s, i) => toXY(i, s));
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + " Z";

  return (
    <svg width={240} height={240} viewBox="0 0 240 240">
      {rings.map(pct => (
        <polygon key={pct} points={ringPoints(pct)} fill="none" stroke={T.border} strokeWidth={1} />
      ))}
      {Array.from({ length: n }, (_, i) => {
        const pt = toXY(i, 100);
        return <line key={i} x1={cx} y1={cy} x2={pt.x} y2={pt.y} stroke={T.border} strokeWidth={1} />;
      })}
      <polygon points={dataPoints.map(p => `${p.x},${p.y}`).join(" ")} fill="rgba(26,163,138,0.15)" stroke="#1aa38a" strokeWidth={2} />
      <path d={dataPath} fill="none" />
      {dataPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={4} fill="#1aa38a" />
      ))}
      {labels.map((label, i) => {
        const lp = labelXY(i);
        return (
          <text key={i} x={lp.x} y={lp.y} textAnchor="middle" dominantBaseline="middle"
            fontSize={9} fill={T.sub} fontFamily="Inter, sans-serif">
            {label}
          </text>
        );
      })}
    </svg>
  );
}

export default function DiagnosticReport({ user }) {
  const { attemptId } = useParams();
  const { T } = useTheme();
  const [loading, setLoading] = useState(true);
  const [attempt, setAttempt] = useState(null);
  const [report, setReport] = useState(null);
  const [polling, setPolling] = useState(false);

  useEffect(() => {
    loadReport();
  }, [attemptId]); // eslint-disable-line

  const loadReport = async () => {
    setLoading(true);
    const { data, error } = await supabaseAdmin
      .from("test_attempts")
      .select("*")
      .eq("id", attemptId)
      .single();

    if (error || !data) { setLoading(false); return; }
    setAttempt(data);

    if (data.ai_report) {
      try {
        setReport(typeof data.ai_report === "string" ? JSON.parse(data.ai_report) : data.ai_report);
      } catch {
        setReport(null);
      }
      setLoading(false);
    } else {
      // Poll for report
      setLoading(false);
      setPolling(true);
      const interval = setInterval(async () => {
        const { data: fresh } = await supabaseAdmin
          .from("test_attempts")
          .select("ai_report")
          .eq("id", attemptId)
          .single();
        if (fresh?.ai_report) {
          clearInterval(interval);
          try {
            setReport(typeof fresh.ai_report === "string" ? JSON.parse(fresh.ai_report) : fresh.ai_report);
          } catch {
            setReport(null);
          }
          setPolling(false);
        }
      }, 3000);
      // Timeout after 30s — use fallback
      setTimeout(() => {
        clearInterval(interval);
        if (!report) {
          setReport(fallbackReport(
            { total_score: data.raw_score || 6, math_score: data.math_score || 3, verbal_score: data.verbal_score || 3, carelessness_flag: false, avg_time_deviation: 1, decision_volatility: "stable", momentum_curve: { first_third: 0.5, middle_third: 0.5, final_third: 0.5 }, endurance_index: 0, guess_probability: 0.1, trap_sensitivity: {}, cognitive_start_speed: 5, efficiency_projection: 2640 },
            { predicted_range: data.predicted_range || "900–1000", score_ceiling: parseInt(data.score_ceiling) || 1200 }
          ));
          setPolling(false);
        }
      }, 30000);
    }
  };

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: T.dark }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: 40, height: 40, borderRadius: "50%", border: `3px solid #1aa38a`, borderTopColor: "transparent", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        <div style={{ color: T.sub }}>Loading your report…</div>
      </div>
    </div>
  );

  if (!attempt) return (
    <div style={{ background: T.dark, minHeight: "100vh" }}>
      <Navbar user={user} />
      <div style={{ textAlign: "center", padding: "80px 24px", color: T.sub }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>📋</div>
        <h2 style={{ color: T.text }}>Report not found</h2>
        <Link to="/diagnostic" style={{ color: T.green }}>Take the diagnostic →</Link>
      </div>
    </div>
  );

  const predictedRange = attempt.predicted_range || "—";
  const ceiling = attempt.score_ceiling || "—";
  const unlockable = ceiling !== "—" && predictedRange !== "—"
    ? Math.max(0, parseInt(ceiling) - parseInt(predictedRange.split("–")[1] || 0))
    : "—";

  return (
    <div style={{ background: T.dark, minHeight: "100vh", fontFamily: "'Inter','Segoe UI',sans-serif" }}>
      <Navbar user={user} />

      <div style={{ maxWidth: 1060, margin: "0 auto", padding: "36px 24px 64px" }}>

        {/* ── Score header ── */}
        <div style={{ background: "linear-gradient(135deg, #1aa38a, #0d8f77)", borderRadius: 18, padding: "28px 32px", marginBottom: 20, color: "white" }}>
          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, opacity: 0.8, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>SAT Diagnostic Report</div>
              <div style={{ fontSize: 13, opacity: 0.85, marginBottom: 4 }}>Predicted Score</div>
              <div style={{ fontSize: 44, fontWeight: 900, lineHeight: 1 }}>{predictedRange}</div>
              {report?.primary_constraint && (
                <div style={{ fontSize: 14, opacity: 0.9, marginTop: 10, lineHeight: 1.5 }}>{report.primary_constraint}</div>
              )}
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 12, padding: "14px 20px", textAlign: "center" }}>
                <div style={{ fontSize: 11, opacity: 0.8 }}>Score Ceiling</div>
                <div style={{ fontSize: 26, fontWeight: 900 }}>{ceiling}</div>
              </div>
              <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 12, padding: "14px 20px", textAlign: "center" }}>
                <div style={{ fontSize: 11, opacity: 0.8 }}>Unlockable</div>
                <div style={{ fontSize: 26, fontWeight: 900 }}>+{unlockable} pts</div>
              </div>
              <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 12, padding: "14px 20px", textAlign: "center" }}>
                <div style={{ fontSize: 11, opacity: 0.8 }}>Raw Score</div>
                <div style={{ fontSize: 26, fontWeight: 900 }}>{attempt.raw_score}/12</div>
              </div>
            </div>
          </div>
        </div>

        {/* Polling banner */}
        {polling && (
          <div style={{ background: T.greenBg, border: `1px solid ${T.greenBorder}`, borderRadius: 10, padding: "12px 16px", marginBottom: 16, display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: T.green }}>
            <div style={{ width: 16, height: 16, borderRadius: "50%", border: `2px solid ${T.green}`, borderTopColor: "transparent", animation: "spin 0.8s linear infinite", flexShrink: 0 }} />
            AI report is being generated… refreshing automatically.
          </div>
        )}

        {report ? (
          <>
            {/* ── Main 2-col layout ── */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>

              {/* Left: Radar + friction */}
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: "20px", display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
                  <RadarChart scores={report.radar_scores || [60,60,60,60,60,60]} T={T} />
                  <div style={{ flex: 1, minWidth: 120 }}>
                    {(report.metric_interpretations || []).slice(0, 6).map((m, i) => (
                      <div key={i} style={{ marginBottom: 10 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                          <span style={{ fontSize: 11, fontWeight: 600, color: T.text }}>{m.metric}</span>
                          <span style={{ fontSize: 11, color: m.score >= m.benchmark ? "#1aa38a" : "#f59e0b", fontWeight: 700 }}>{m.score}</span>
                        </div>
                        <div style={{ height: 4, background: T.surface, borderRadius: 4, overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${m.score}%`, background: m.score >= m.benchmark ? "#1aa38a" : "#f59e0b", borderRadius: 4 }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Score friction */}
                <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: T.text }}>Score Friction Index</span>
                    <span style={{ fontSize: 22, fontWeight: 900, color: report.score_friction > 6 ? "#ef4444" : "#f59e0b" }}>{report.score_friction}/10</span>
                  </div>
                  <div style={{ height: 8, background: T.surface, borderRadius: 8, overflow: "hidden", marginBottom: 10 }}>
                    <div style={{ height: "100%", width: `${report.score_friction * 10}%`, background: `linear-gradient(90deg, #1aa38a, #f59e0b, #ef4444)`, borderRadius: 8 }} />
                  </div>
                  <p style={{ fontSize: 13, color: T.sub, lineHeight: 1.6, margin: 0 }}>{report.friction_description}</p>
                </div>
              </div>

              {/* Right: Top suppressors */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 4 }}>Top Score Suppressors</div>
                {(report.top_suppressors || []).map((s, i) => (
                  <div key={i} style={{
                    background: T.card, border: `1px solid ${T.border}`,
                    borderLeft: `4px solid ${SEVERITY_COLORS[s.severity] || "#f59e0b"}`,
                    borderRadius: 12, padding: "16px 18px",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: T.text }}>{s.title}</span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: SEVERITY_COLORS[s.severity], background: `${SEVERITY_COLORS[s.severity]}15`, borderRadius: 6, padding: "2px 8px" }}>{s.severity}</span>
                    </div>
                    <div style={{ fontSize: 12, color: T.muted, marginBottom: 8 }}>{s.data} · <strong style={{ color: "#ef4444" }}>{s.impact}</strong></div>
                    <div style={{ fontSize: 13, color: T.sub, background: T.surface, borderRadius: 8, padding: "8px 10px", lineHeight: 1.55 }}>
                      💡 {s.directive}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Concept gaps + Weekly plan ── */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>

              {/* Concept gaps */}
              <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: "20px" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 14 }}>Concept Weakness Map</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {(report.concept_gaps || []).map((gap, i) => {
                    const lesson = findLesson(gap.concept) || findLesson(gap.lesson_hint);
                    return (
                      <div key={i} style={{
                        display: "flex", alignItems: "center", gap: 10,
                        padding: "10px 12px", background: T.surface,
                        border: `1px solid ${T.border}`, borderRadius: 10,
                      }}>
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: PRIORITY_COLORS[gap.priority] || T.green, flexShrink: 0 }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: T.text }}>{gap.concept}</div>
                          <div style={{ fontSize: 11, color: T.muted }}>{gap.section} · {gap.action}</div>
                        </div>
                        {lesson ? (
                          <Link to={lesson.path} style={{
                            fontSize: 11, fontWeight: 700, color: T.green,
                            background: T.greenBg, border: `1px solid ${T.greenBorder}`,
                            borderRadius: 6, padding: "3px 8px", textDecoration: "none", whiteSpace: "nowrap",
                          }}>
                            Study →
                          </Link>
                        ) : (
                          <Link to="/sat" style={{ fontSize: 11, color: T.muted, textDecoration: "none" }}>Lessons</Link>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Weekly plan */}
              <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: "20px" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 14 }}>4-Week Acceleration Plan</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {(report.weekly_plan || []).map((week, i) => (
                    <div key={i} style={{ padding: "12px 14px", background: T.surface, border: `1px solid ${T.border}`, borderRadius: 10 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                        <div style={{
                          width: 22, height: 22, borderRadius: "50%",
                          background: "linear-gradient(135deg, #1aa38a, #0d8f77)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 11, fontWeight: 900, color: "white", flexShrink: 0,
                        }}>{week.week}</div>
                        <span style={{ fontSize: 13, fontWeight: 700, color: T.text }}>{week.focus}</span>
                      </div>
                      <div style={{ fontSize: 11, color: T.muted, marginBottom: 6 }}>
                        {(week.tasks || []).map((t, j) => <div key={j}>• {t}</div>)}
                      </div>
                      <div style={{ fontSize: 11, color: T.green, fontWeight: 600 }}>Goal: {week.goal}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── CTA ── */}
            <div style={{
              background: "linear-gradient(135deg, #1aa38a, #0d8f77)",
              borderRadius: 14, padding: "24px 28px",
              display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16,
            }}>
              <div>
                <div style={{ fontSize: 18, fontWeight: 800, color: "white", marginBottom: 4 }}>Ready to close the gap?</div>
                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.85)" }}>Start with the lessons linked above — your study plan is already mapped out.</div>
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Link to="/sat" style={{
                  background: "white", color: "#0d8f77", textDecoration: "none",
                  padding: "10px 20px", borderRadius: 10, fontSize: 14, fontWeight: 800,
                }}>Browse Lessons →</Link>
                <Link to="/diagnostic/sat" style={{
                  background: "rgba(255,255,255,0.2)", color: "white", textDecoration: "none",
                  padding: "10px 20px", borderRadius: 10, fontSize: 14, fontWeight: 700,
                  border: "1px solid rgba(255,255,255,0.3)",
                }}>Retake Diagnostic</Link>
              </div>
            </div>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "48px 24px", color: T.sub }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>🔄</div>
            <p>Generating your AI report… this takes up to 30 seconds.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
