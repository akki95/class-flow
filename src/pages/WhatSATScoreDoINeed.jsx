import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const COLLEGES = [
  { name: "MIT",              location: "Cambridge, MA",     type: "Private", range: [1510, 1580], acceptance: 4  },
  { name: "Harvard",          location: "Cambridge, MA",     type: "Private", range: [1500, 1580], acceptance: 4  },
  { name: "Stanford",         location: "Stanford, CA",      type: "Private", range: [1500, 1570], acceptance: 4  },
  { name: "Yale",             location: "New Haven, CT",     type: "Private", range: [1500, 1570], acceptance: 5  },
  { name: "Princeton",        location: "Princeton, NJ",     type: "Private", range: [1490, 1570], acceptance: 5  },
  { name: "Columbia",         location: "New York, NY",      type: "Private", range: [1490, 1560], acceptance: 4  },
  { name: "UChicago",         location: "Chicago, IL",       type: "Private", range: [1500, 1570], acceptance: 5  },
  { name: "Duke",             location: "Durham, NC",        type: "Private", range: [1480, 1570], acceptance: 7  },
  { name: "Northwestern",     location: "Evanston, IL",      type: "Private", range: [1480, 1560], acceptance: 7  },
  { name: "Johns Hopkins",    location: "Baltimore, MD",     type: "Private", range: [1500, 1560], acceptance: 7  },
  { name: "Dartmouth",        location: "Hanover, NH",       type: "Private", range: [1440, 1560], acceptance: 8  },
  { name: "Brown",            location: "Providence, RI",    type: "Private", range: [1440, 1560], acceptance: 6  },
  { name: "Cornell",          location: "Ithaca, NY",        type: "Private", range: [1400, 1540], acceptance: 9  },
  { name: "Vanderbilt",       location: "Nashville, TN",     type: "Private", range: [1490, 1570], acceptance: 7  },
  { name: "Rice",             location: "Houston, TX",       type: "Private", range: [1490, 1570], acceptance: 8  },
  { name: "Notre Dame",       location: "Notre Dame, IN",    type: "Private", range: [1400, 1540], acceptance: 13 },
  { name: "Georgetown",       location: "Washington, DC",    type: "Private", range: [1380, 1550], acceptance: 12 },
  { name: "Carnegie Mellon",  location: "Pittsburgh, PA",    type: "Private", range: [1500, 1570], acceptance: 11 },
  { name: "Northeastern",     location: "Boston, MA",        type: "Private", range: [1400, 1560], acceptance: 7  },
  { name: "Tufts",            location: "Medford, MA",       type: "Private", range: [1430, 1560], acceptance: 11 },
  { name: "Emory",            location: "Atlanta, GA",       type: "Private", range: [1390, 1530], acceptance: 11 },
  { name: "USC",              location: "Los Angeles, CA",   type: "Private", range: [1360, 1530], acceptance: 12 },
  { name: "NYU",              location: "New York, NY",      type: "Private", range: [1350, 1540], acceptance: 13 },
  { name: "Boston Univ.",     location: "Boston, MA",        type: "Private", range: [1290, 1500], acceptance: 19 },
  { name: "UCLA",             location: "Los Angeles, CA",   type: "Public",  range: [1290, 1510], acceptance: 9  },
  { name: "UC Berkeley",      location: "Berkeley, CA",      type: "Public",  range: [1310, 1530], acceptance: 11 },
  { name: "UMich",            location: "Ann Arbor, MI",     type: "Public",  range: [1360, 1540], acceptance: 18 },
  { name: "Georgia Tech",     location: "Atlanta, GA",       type: "Public",  range: [1390, 1540], acceptance: 17 },
  { name: "UVA",              location: "Charlottesville, VA",type: "Public", range: [1340, 1530], acceptance: 20 },
  { name: "UNC Chapel Hill",  location: "Chapel Hill, NC",   type: "Public",  range: [1310, 1520], acceptance: 18 },
  { name: "Univ. of Maryland",location: "College Park, MD",  type: "Public",  range: [1270, 1480], acceptance: 44 },
  { name: "Ohio State",       location: "Columbus, OH",      type: "Public",  range: [1240, 1450], acceptance: 53 },
  { name: "Univ. of Florida", location: "Gainesville, FL",   type: "Public",  range: [1240, 1430], acceptance: 24 },
  { name: "Purdue",           location: "W. Lafayette, IN",  type: "Public",  range: [1200, 1420], acceptance: 67 },
  { name: "Rutgers",          location: "New Brunswick, NJ", type: "Public",  range: [1200, 1430], acceptance: 61 },
  { name: "Univ. of Georgia", location: "Athens, GA",        type: "Public",  range: [1210, 1420], acceptance: 45 },
  { name: "Penn State",       location: "State College, PA", type: "Public",  range: [1130, 1340], acceptance: 54 },
  { name: "Texas A&M",        location: "College Station, TX",type: "Public", range: [1140, 1380], acceptance: 63 },
  { name: "Indiana Univ.",    location: "Bloomington, IN",   type: "Public",  range: [1090, 1320], acceptance: 80 },
  { name: "Arizona State",    location: "Tempe, AZ",         type: "Public",  range: [1070, 1300], acceptance: 87 },
  { name: "Univ. of Colorado",location: "Boulder, CO",       type: "Public",  range: [1090, 1310], acceptance: 81 },
  { name: "SUNY Buffalo",     location: "Buffalo, NY",       type: "Public",  range: [1090, 1300], acceptance: 61 },
  { name: "Univ. of Alabama", location: "Tuscaloosa, AL",    type: "Public",  range: [1060, 1300], acceptance: 79 },
  { name: "Univ. of Tennessee",location: "Knoxville, TN",   type: "Public",  range: [1100, 1320], acceptance: 69 },
  { name: "Univ. of Oregon",  location: "Eugene, OR",        type: "Public",  range: [1040, 1280], acceptance: 83 },
];

const TYPES = ["All", "Private", "Public"];

function getStatus(score, range) {
  if (score > range[1]) return "safety";
  if (score >= range[0]) return "target";
  return "reach";
}

const STATUS_COLORS = { safety: "#1aa38a", target: "#f59e0b", reach: "#ef4444" };
const STATUS_LABELS = { safety: "Safety", target: "Target", reach: "Reach" };

export default function WhatSATScoreDoINeed({ user }) {
  const { T } = useTheme();
  const [current, setCurrent] = useState(1200);
  const [goal, setGoal] = useState(1350);
  const [dreamSearch, setDreamSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [activeTab, setActiveTab] = useState("all");

  const clampedGoal = Math.max(current + 10, goal);

  // Dream school match
  const dreamMatch = useMemo(() => {
    if (!dreamSearch.trim()) return null;
    const q = dreamSearch.toLowerCase();
    return COLLEGES.find(c => c.name.toLowerCase().includes(q)) || null;
  }, [dreamSearch]);

  const filtered = COLLEGES.filter(c =>
    (typeFilter === "All" || c.type === typeFilter)
  );

  const byCurrent = {
    safety: filtered.filter(c => getStatus(current, c.range) === "safety"),
    target: filtered.filter(c => getStatus(current, c.range) === "target"),
    reach:  filtered.filter(c => getStatus(current, c.range) === "reach"),
  };

  const byGoal = {
    safety: filtered.filter(c => getStatus(clampedGoal, c.range) === "safety"),
    target: filtered.filter(c => getStatus(clampedGoal, c.range) === "target"),
    reach:  filtered.filter(c => getStatus(clampedGoal, c.range) === "reach"),
  };

  const display = activeTab === "all" ? filtered :
    filtered.filter(c => getStatus(current, c.range) === activeTab);

  const monthsNeeded = Math.ceil((clampedGoal - current) / 50);

  return (
    <div style={{ background: T.dark, minHeight: "100vh", fontFamily: "'Inter','Segoe UI',sans-serif" }}>
      <Navbar user={user} />

      <div style={{ maxWidth: 1020, margin: "0 auto", padding: "36px 24px 60px" }}>

        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "inline-block", background: T.greenBg, border: `1px solid ${T.greenBorder}`, borderRadius: 20, padding: "4px 14px", fontSize: 12, color: T.green, fontWeight: 600, marginBottom: 10 }}>
            Free Tool
          </div>
          <h1 style={{ fontSize: "clamp(22px, 3.5vw, 34px)", fontWeight: 900, color: T.text, margin: "0 0 6px" }}>
            What SAT Score Do I Need?
          </h1>
          <p style={{ fontSize: 14, color: T.sub, margin: 0 }}>
            Set your current and goal score — watch your college list transform in real time.
          </p>
        </div>

        {/* Top row: sliders + dream school */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>

          {/* Score sliders */}
          <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: "20px" }}>
            <div style={{ display: "flex", gap: 16, marginBottom: 18, flexWrap: "wrap" }}>
              <div style={{ flex: 1, textAlign: "center", background: T.surface, borderRadius: 10, padding: "10px 14px" }}>
                <div style={{ fontSize: 11, color: T.muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>Current</div>
                <div style={{ fontSize: 28, fontWeight: 900, color: T.text }}>{current}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", color: T.green, fontSize: 20, fontWeight: 900 }}>→</div>
              <div style={{ flex: 1, textAlign: "center", background: T.greenBg, border: `1px solid ${T.greenBorder}`, borderRadius: 10, padding: "10px 14px" }}>
                <div style={{ fontSize: 11, color: T.green, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>Goal</div>
                <div style={{ fontSize: 28, fontWeight: 900, color: T.green }}>{clampedGoal}</div>
              </div>
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: T.sub, display: "block", marginBottom: 6 }}>Current score</label>
              <input type="range" min={400} max={1590} step={10}
                value={current}
                onChange={e => { const v = Number(e.target.value); setCurrent(v); if (goal <= v) setGoal(v + 50); }}
                style={{ width: "100%", accentColor: "#6366f1", cursor: "pointer" }} />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: T.green, display: "block", marginBottom: 6 }}>Goal score</label>
              <input type="range" min={current + 10} max={1600} step={10}
                value={clampedGoal}
                onChange={e => setGoal(Number(e.target.value))}
                style={{ width: "100%", accentColor: T.green, cursor: "pointer" }} />
            </div>

            {/* Improvement insight */}
            <div style={{ marginTop: 16, padding: "12px 14px", background: T.greenBg, border: `1px solid ${T.greenBorder}`, borderRadius: 10 }}>
              <div style={{ fontSize: 13, color: T.text, fontWeight: 600 }}>
                +{clampedGoal - current} pts improvement
              </div>
              <div style={{ fontSize: 12, color: T.sub, marginTop: 3 }}>
                ~{monthsNeeded} month{monthsNeeded !== 1 ? "s" : ""} at average prep pace ·{" "}
                <span style={{ color: "#1aa38a", fontWeight: 600 }}>
                  +{byGoal.target.length - byCurrent.target.length + byGoal.safety.length - byCurrent.safety.length} more colleges in reach
                </span>
              </div>
            </div>
          </div>

          {/* Dream school search */}
          <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: "20px" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: T.text, marginBottom: 14 }}>
              🎓 Dream school lookup
            </div>
            <input
              type="text"
              placeholder="Type a college name..."
              value={dreamSearch}
              onChange={e => setDreamSearch(e.target.value)}
              style={{
                width: "100%", padding: "10px 14px", borderRadius: 10,
                border: `1px solid ${T.border}`, background: T.surface,
                color: T.text, fontSize: 14, outline: "none",
                boxSizing: "border-box",
              }}
            />

            {dreamSearch && !dreamMatch && (
              <div style={{ marginTop: 12, fontSize: 13, color: T.muted }}>No match found. Try a shorter name.</div>
            )}

            {dreamMatch && (() => {
              const currentStatus = getStatus(current, dreamMatch.range);
              const goalStatus = getStatus(clampedGoal, dreamMatch.range);
              const gap = dreamMatch.range[0] - current;
              const changed = currentStatus !== goalStatus;
              return (
                <div style={{ marginTop: 14 }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: T.text, marginBottom: 4 }}>{dreamMatch.name}</div>
                  <div style={{ fontSize: 12, color: T.muted, marginBottom: 14 }}>{dreamMatch.location} · {dreamMatch.acceptance}% acceptance · Middle 50%: {dreamMatch.range[0]}–{dreamMatch.range[1]}</div>

                  <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
                    <div style={{ flex: 1, background: `${STATUS_COLORS[currentStatus]}12`, border: `1px solid ${STATUS_COLORS[currentStatus]}30`, borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
                      <div style={{ fontSize: 11, color: T.muted, marginBottom: 4 }}>Current ({current})</div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: STATUS_COLORS[currentStatus] }}>{STATUS_LABELS[currentStatus]}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", color: changed ? "#1aa38a" : T.muted, fontSize: 16 }}>→</div>
                    <div style={{ flex: 1, background: `${STATUS_COLORS[goalStatus]}12`, border: `1px solid ${STATUS_COLORS[goalStatus]}30`, borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
                      <div style={{ fontSize: 11, color: T.muted, marginBottom: 4 }}>Goal ({clampedGoal})</div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: STATUS_COLORS[goalStatus] }}>{STATUS_LABELS[goalStatus]}</div>
                    </div>
                  </div>

                  {gap > 0 ? (
                    <div style={{ fontSize: 13, color: T.sub, lineHeight: 1.6 }}>
                      You need <strong style={{ color: T.text }}>+{gap} pts</strong> to enter their range.{" "}
                      At 50 pts/month that's <strong style={{ color: T.green }}>{Math.ceil(gap / 50)} month{Math.ceil(gap / 50) !== 1 ? "s" : ""}</strong> of prep.
                    </div>
                  ) : (
                    <div style={{ fontSize: 13, color: "#1aa38a", fontWeight: 600 }}>✓ Your score is within their range!</div>
                  )}
                </div>
              );
            })()}

            {!dreamSearch && (
              <div style={{ marginTop: 14 }}>
                <div style={{ fontSize: 12, color: T.muted, marginBottom: 10 }}>Quick look:</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {["MIT", "UCLA", "NYU", "Georgia Tech", "Ohio State"].map(name => (
                    <button key={name} onClick={() => setDreamSearch(name)} style={{
                      padding: "4px 10px", borderRadius: 6, fontSize: 12, fontWeight: 600,
                      background: T.surface, border: `1px solid ${T.border}`,
                      color: T.sub, cursor: "pointer",
                    }}>{name}</button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* College list */}
        <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: "16px 20px", marginBottom: 14 }}>
          {/* Filter row */}
          <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap", alignItems: "center" }}>
            <div style={{ display: "flex", gap: 6 }}>
              {[
                { id: "all",    label: `All (${filtered.length})` },
                { id: "safety", label: `✅ ${byCurrent.safety.length} Safeties`,  color: "#1aa38a" },
                { id: "target", label: `🎯 ${byCurrent.target.length} Targets`,   color: "#f59e0b" },
                { id: "reach",  label: `🚀 ${byCurrent.reach.length} Reaches`,    color: "#ef4444" },
              ].map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                  padding: "5px 12px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer",
                  border: `1px solid ${activeTab === tab.id ? (tab.color || T.green) : T.border}`,
                  background: activeTab === tab.id ? `${tab.color || T.green}15` : T.surface,
                  color: activeTab === tab.id ? (tab.color || T.green) : T.sub,
                }}>{tab.label}</button>
              ))}
            </div>
            <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
              {TYPES.map(t => (
                <button key={t} onClick={() => setTypeFilter(t)} style={{
                  padding: "5px 10px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer",
                  border: `1px solid ${typeFilter === t ? T.green : T.border}`,
                  background: typeFilter === t ? T.green : T.surface,
                  color: typeFilter === t ? "white" : T.sub,
                }}>{t}</button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: 7 }}>
            {display.map((c, i) => {
              const curStatus = getStatus(current, c.range);
              const goalStatus = getStatus(clampedGoal, c.range);
              const changed = curStatus !== goalStatus;
              const gap = c.range[0] - current;
              return (
                <div key={i} style={{
                  background: T.surface, border: `1px solid ${T.border}`,
                  borderLeft: `3px solid ${STATUS_COLORS[curStatus]}`,
                  borderRadius: 8, padding: "10px 12px",
                  display: "flex", alignItems: "center", gap: 10,
                }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: T.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.name}</div>
                    <div style={{ fontSize: 11, color: T.muted }}>{c.range[0]}–{c.range[1]} · {c.acceptance}% accept.</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                    <span style={{
                      background: `${STATUS_COLORS[curStatus]}15`, color: STATUS_COLORS[curStatus],
                      borderRadius: 12, padding: "2px 8px", fontSize: 11, fontWeight: 700,
                    }}>{STATUS_LABELS[curStatus]}</span>
                    {changed && (
                      <span style={{ fontSize: 10, color: "#1aa38a", fontWeight: 700 }}>→ {STATUS_LABELS[goalStatus]}</span>
                    )}
                    {curStatus === "reach" && gap > 0 && (
                      <span style={{ fontSize: 11, color: T.muted }}>+{gap}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA bar */}
        <div style={{
          background: T.greenBg, border: `1px solid ${T.greenBorder}`,
          borderRadius: 12, padding: "14px 20px",
          display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
        }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: T.text }}>Find out what's holding your score back</div>
            <div style={{ fontSize: 12, color: T.sub }}>Free diagnostic · AI report · Personalised study plan</div>
          </div>
          <Link to="/diagnostic" style={{
            background: "linear-gradient(135deg, #1aa38a, #0d8f77)",
            color: "white", textDecoration: "none",
            padding: "9px 20px", borderRadius: 8, fontSize: 13, fontWeight: 700, whiteSpace: "nowrap",
          }}>
            Take Free Diagnostic →
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
