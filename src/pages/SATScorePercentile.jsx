import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PERCENTILE_DATA = [
  { score: 1600, percentile: 99 }, { score: 1580, percentile: 99 },
  { score: 1560, percentile: 99 }, { score: 1540, percentile: 99 },
  { score: 1520, percentile: 98 }, { score: 1500, percentile: 98 },
  { score: 1480, percentile: 97 }, { score: 1460, percentile: 96 },
  { score: 1440, percentile: 95 }, { score: 1420, percentile: 94 },
  { score: 1400, percentile: 93 }, { score: 1380, percentile: 91 },
  { score: 1360, percentile: 90 }, { score: 1340, percentile: 88 },
  { score: 1320, percentile: 86 }, { score: 1300, percentile: 84 },
  { score: 1280, percentile: 82 }, { score: 1260, percentile: 79 },
  { score: 1240, percentile: 77 }, { score: 1220, percentile: 74 },
  { score: 1200, percentile: 71 }, { score: 1180, percentile: 68 },
  { score: 1160, percentile: 65 }, { score: 1140, percentile: 62 },
  { score: 1120, percentile: 59 }, { score: 1100, percentile: 56 },
  { score: 1080, percentile: 52 }, { score: 1060, percentile: 49 },
  { score: 1040, percentile: 45 }, { score: 1020, percentile: 42 },
  { score: 1000, percentile: 38 }, { score: 980, percentile: 35 },
  { score: 960, percentile: 31 }, { score: 940, percentile: 28 },
  { score: 920, percentile: 25 }, { score: 900, percentile: 22 },
  { score: 880, percentile: 19 }, { score: 860, percentile: 17 },
  { score: 840, percentile: 14 }, { score: 820, percentile: 12 },
  { score: 800, percentile: 9 },  { score: 400, percentile: 1 },
];

const SCORE_BANDS = [
  { label: "400–800",   pct: 5,  color: "#ef4444", students: "85K" },
  { label: "800–1000",  pct: 15, color: "#f97316", students: "255K" },
  { label: "1000–1200", pct: 30, color: "#eab308", students: "510K" },
  { label: "1200–1400", pct: 35, color: "#1aa38a", students: "595K" },
  { label: "1400–1600", pct: 15, color: "#6366f1", students: "255K" },
];

const COLLEGE_BENCHMARKS = [
  { name: "MIT",            range: "1510–1580", mid: 1545 },
  { name: "Harvard",        range: "1500–1580", mid: 1540 },
  { name: "Stanford",       range: "1500–1570", mid: 1535 },
  { name: "Yale",           range: "1500–1570", mid: 1535 },
  { name: "Princeton",      range: "1490–1570", mid: 1530 },
  { name: "Columbia",       range: "1490–1560", mid: 1525 },
  { name: "Duke",           range: "1480–1570", mid: 1525 },
  { name: "Northwestern",   range: "1480–1560", mid: 1520 },
  { name: "UCLA",           range: "1290–1510", mid: 1400 },
  { name: "UC Berkeley",    range: "1310–1530", mid: 1420 },
  { name: "UMich",          range: "1360–1540", mid: 1450 },
  { name: "NYU",            range: "1350–1540", mid: 1445 },
  { name: "Northeastern",   range: "1400–1560", mid: 1480 },
  { name: "Boston Univ.",   range: "1290–1500", mid: 1395 },
  { name: "UNC",            range: "1310–1520", mid: 1415 },
  { name: "Georgia Tech",   range: "1390–1540", mid: 1465 },
  { name: "Ohio State",     range: "1240–1450", mid: 1345 },
  { name: "Penn State",     range: "1130–1340", mid: 1235 },
];

function getPercentile(score) {
  const rounded = Math.round(score / 10) * 10;
  const entry = PERCENTILE_DATA.find(d => d.score <= rounded);
  return entry ? entry.percentile : 1;
}

function getLabel(p) {
  if (p >= 99) return { label: "Exceptional", color: "#6366f1" };
  if (p >= 95) return { label: "Excellent",   color: "#1aa38a" };
  if (p >= 85) return { label: "Strong",       color: "#10b981" };
  if (p >= 70) return { label: "Above Average",color: "#f59e0b" };
  if (p >= 50) return { label: "Average",      color: "#f97316" };
  return               { label: "Below Average",color: "#ef4444" };
}

function getBand(score) {
  if (score < 800)  return 0;
  if (score < 1000) return 1;
  if (score < 1200) return 2;
  if (score < 1400) return 3;
  return 4;
}

const TOTAL_STUDENTS = 1_700_000;

export default function SATScorePercentile({ user }) {
  const { T } = useTheme();
  const [score, setScore] = useState(1200);
  const [showImproved, setShowImproved] = useState(false);

  const displayScore = showImproved ? Math.min(score + 100, 1600) : score;
  const percentile = getPercentile(displayScore);
  const { label, color } = getLabel(percentile);
  const beaten = Math.round((percentile / 100) * TOTAL_STUDENTS).toLocaleString();
  const activeBand = getBand(displayScore);

  return (
    <div style={{ background: T.dark, minHeight: "100vh", fontFamily: "'Inter','Segoe UI',sans-serif" }}>
      <Navbar user={user} />

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "40px 24px 60px" }}>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: "inline-block", background: T.greenBg, border: `1px solid ${T.greenBorder}`, borderRadius: 20, padding: "4px 14px", fontSize: 12, color: T.green, fontWeight: 600, marginBottom: 12 }}>
            Free Tool
          </div>
          <h1 style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 900, color: T.text, margin: "0 0 8px" }}>
            SAT Score Percentile Calculator
          </h1>
          <p style={{ fontSize: 15, color: T.sub, margin: 0 }}>
            See where you rank among 1.7 million SAT test-takers — and what +100 pts unlocks.
          </p>
        </div>

        {/* Main card — everything above fold */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>

          {/* Left: slider + result */}
          <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, padding: "24px" }}>
            {/* Slider */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: T.text }}>Your SAT Score</label>
                <div style={{
                  background: T.surface, border: `1px solid ${T.border}`,
                  borderRadius: 8, padding: "4px 12px",
                  fontSize: 22, fontWeight: 900, color: T.text,
                }}>{score}</div>
              </div>
              <input
                type="range" min={400} max={1600} step={10}
                value={score} onChange={e => setScore(Number(e.target.value))}
                style={{ width: "100%", accentColor: T.green, cursor: "pointer" }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: T.muted, marginTop: 4 }}>
                <span>400</span><span>800</span><span>1200</span><span>1600</span>
              </div>
            </div>

            {/* +100 toggle */}
            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
              {[false, true].map(improved => (
                <button key={String(improved)} onClick={() => setShowImproved(improved)} style={{
                  flex: 1, padding: "8px", borderRadius: 8, fontSize: 12, fontWeight: 600,
                  cursor: "pointer", transition: "all 0.15s",
                  border: `1px solid ${showImproved === improved ? T.green : T.border}`,
                  background: showImproved === improved ? T.greenBg : T.surface,
                  color: showImproved === improved ? T.green : T.sub,
                }}>
                  {improved ? `+100 pts (${Math.min(score + 100, 1600)})` : `Current (${score})`}
                </button>
              ))}
            </div>

            {/* Result */}
            <div style={{
              background: `${color}10`, border: `1px solid ${color}30`,
              borderRadius: 12, padding: "20px", textAlign: "center",
            }}>
              <div style={{ fontSize: 11, color: T.muted, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>
                {showImproved ? `Score ${score + 100} ranks in the` : `Score ${score} ranks in the`}
              </div>
              <div style={{ fontSize: 56, fontWeight: 900, color, lineHeight: 1 }}>
                {percentile}<span style={{ fontSize: 24 }}>th</span>
              </div>
              <div style={{ fontSize: 14, color: T.sub, margin: "6px 0 12px" }}>percentile</div>
              <div style={{ display: "inline-block", background: color, color: "white", borderRadius: 16, padding: "4px 14px", fontSize: 12, fontWeight: 700, marginBottom: 14 }}>
                {label}
              </div>
              <div style={{ fontSize: 13, color: T.sub, lineHeight: 1.6 }}>
                You scored higher than<br />
                <strong style={{ fontSize: 20, color: T.text }}>{beaten}</strong> students
              </div>
            </div>
          </div>

          {/* Right: score bands + college grid */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Score bands */}
            <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, padding: "20px" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: T.text, marginBottom: 14 }}>Score band breakdown</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {SCORE_BANDS.map((band, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "8px 10px", borderRadius: 8,
                    background: activeBand === i ? `${band.color}12` : T.surface,
                    border: `1px solid ${activeBand === i ? band.color + "40" : T.border}`,
                    transition: "all 0.2s",
                  }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: band.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, fontWeight: activeBand === i ? 700 : 400, color: T.text, flex: 1 }}>{band.label}</span>
                    <div style={{ height: 6, width: 60, background: T.border, borderRadius: 4, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${band.pct * 2}%`, background: band.color, borderRadius: 4 }} />
                    </div>
                    <span style={{ fontSize: 12, color: T.muted, width: 36, textAlign: "right" }}>{band.pct}%</span>
                    {activeBand === i && <span style={{ fontSize: 11, color: band.color, fontWeight: 700 }}>← You</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* College comparison — compact grid */}
            <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, padding: "20px", flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: T.text, marginBottom: 12 }}>
                College comparison
                {showImproved && <span style={{ fontSize: 11, color: T.green, marginLeft: 8 }}>+100 pts view</span>}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                {COLLEGE_BENCHMARKS.map((c, i) => {
                  const meets = displayScore >= c.mid - 80;
                  return (
                    <div key={i} style={{
                      display: "flex", alignItems: "center", gap: 6,
                      padding: "7px 10px", borderRadius: 8,
                      background: meets ? "rgba(26,163,138,0.06)" : T.surface,
                      border: `1px solid ${meets ? "rgba(26,163,138,0.2)" : T.border}`,
                    }}>
                      <div style={{
                        width: 14, height: 14, borderRadius: "50%", flexShrink: 0,
                        background: meets ? "#1aa38a" : T.border,
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        {meets && <span style={{ color: "white", fontSize: 8, fontWeight: 900 }}>✓</span>}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: T.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.name}</div>
                        <div style={{ fontSize: 10, color: T.muted }}>{c.range}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* CTA — compact bottom bar */}
        <div style={{
          background: T.greenBg, border: `1px solid ${T.greenBorder}`,
          borderRadius: 14, padding: "16px 24px",
          display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
        }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: T.text }}>Want to improve your score?</div>
            <div style={{ fontSize: 13, color: T.sub }}>Free diagnostic · AI report · Personalised study plan</div>
          </div>
          <Link to="/diagnostic" style={{
            background: "linear-gradient(135deg, #1aa38a, #0d8f77)",
            color: "white", textDecoration: "none",
            padding: "10px 22px", borderRadius: 10, fontSize: 14, fontWeight: 700, whiteSpace: "nowrap",
          }}>
            Take Free Diagnostic →
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
