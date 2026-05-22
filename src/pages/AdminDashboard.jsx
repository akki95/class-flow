import { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { createClient } from "@supabase/supabase-js";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const supabaseAdmin = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_SERVICE_KEY
);

const ADMIN_EMAILS = ["akash95agrawal@gmail.com", "admin@classflow.com"];
const TABS = ["Overview", "Diagnostics", "Blog", "Analytics"];

// ── Tiny SVG charts ────────────────────────────────────────────────────────────

function LineChart({ data, color = "#1aa38a", height = 60, T }) {
  if (!data || data.length < 2) return null;
  const max = Math.max(...data.map(d => d.value), 1);
  const w = 300, h = height;
  const pts = data.map((d, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - (d.value / max) * (h - 8) - 4;
    return `${x},${y}`;
  });
  const area = `0,${h} ${pts.join(" ")} ${w},${h}`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height }} preserveAspectRatio="none">
      <defs>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.18" />
          <stop offset="100%" stopColor={color} stopOpacity="0.01" />
        </linearGradient>
      </defs>
      <polygon points={area} fill="url(#lineGrad)" />
      <polyline points={pts.join(" ")} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      {data.map((d, i) => {
        const x = (i / (data.length - 1)) * w;
        const y = h - (d.value / max) * (h - 8) - 4;
        return <circle key={i} cx={x} cy={y} r="3" fill={color} />;
      })}
    </svg>
  );
}

function BarChart({ data, color = "#6366f1", T }) {
  if (!data || data.length === 0) return null;
  const max = Math.max(...data.map(d => d.value), 1);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 80 }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <div style={{ fontSize: 10, color: T.muted, fontWeight: 600 }}>{d.value || ""}</div>
          <div style={{
            width: "100%", borderRadius: 4,
            background: `linear-gradient(180deg, ${color}, ${color}99)`,
            height: `${Math.max(4, (d.value / max) * 56)}px`,
            transition: "height 0.3s",
          }} />
          <div style={{ fontSize: 10, color: T.muted, whiteSpace: "nowrap" }}>{d.label}</div>
        </div>
      ))}
    </div>
  );
}

function StatCard({ icon, value, label, sub, color, trend, T }) {
  return (
    <div style={{
      background: T.card, border: `1px solid ${T.border}`,
      borderRadius: 14, padding: "20px 20px 16px",
      display: "flex", flexDirection: "column", gap: 8,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: `${color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{icon}</div>
        {trend != null && (
          <div style={{ fontSize: 12, fontWeight: 700, color: trend >= 0 ? "#1aa38a" : "#ef4444", background: trend >= 0 ? "rgba(26,163,138,0.1)" : "rgba(239,68,68,0.1)", borderRadius: 6, padding: "2px 8px" }}>
            {trend >= 0 ? "+" : ""}{trend}%
          </div>
        )}
      </div>
      <div>
        <div style={{ fontSize: 28, fontWeight: 900, color, lineHeight: 1 }}>{value}</div>
        <div style={{ fontSize: 13, color: T.text, fontWeight: 600, marginTop: 4 }}>{label}</div>
        {sub && <div style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>{sub}</div>}
      </div>
    </div>
  );
}

export default function AdminDashboard({ user }) {
  const { T } = useTheme();
  const [tab, setTab] = useState("Overview");

  // Data
  const [sessions, setSessions]   = useState([]);
  const [attempts, setAttempts]   = useState([]);
  const [posts, setPosts]         = useState([]);
  const [loaded, setLoaded]       = useState({ sessions: false, attempts: false, posts: false });

  // Hooks first
  useEffect(() => { loadSessions(); loadAttempts(); loadPosts(); }, []); // eslint-disable-line

  const loadSessions = async () => {
    const snap = await getDocs(query(collection(db, "sessions"), orderBy("createdAt", "desc")));
    setSessions(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    setLoaded(l => ({ ...l, sessions: true }));
  };

  const loadAttempts = async () => {
    const { data } = await supabaseAdmin
      .from("test_attempts")
      .select("id,raw_score,math_score,verbal_score,predicted_range,score_ceiling,created_at")
      .order("created_at", { ascending: false })
      .limit(200);
    setAttempts(data || []);
    setLoaded(l => ({ ...l, attempts: true }));
  };

  const loadPosts = async () => {
    const { data } = await supabaseAdmin
      .from("blog_posts")
      .select("id,title,category,published,published_at,read_time_minutes,slug")
      .order("published_at", { ascending: false });
    setPosts(data || []);
    setLoaded(l => ({ ...l, posts: true }));
  };

  // Access check after hooks
  if (!ADMIN_EMAILS.includes(user?.email)) {
    return (
      <div style={{ minHeight: "100vh", background: T.dark, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", color: "#ef4444" }}>Access Denied — {user?.email}</div>
      </div>
    );
  }

  // ── Computed analytics ─────────────────────────────────────────────────────
  const last14Days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (13 - i));
    const label = d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
    const dateStr = d.toISOString().slice(0, 10);
    const value = attempts.filter(a => a.created_at?.slice(0, 10) === dateStr).length;
    return { label, value };
  });

  const scoreDistribution = [
    { label: "400–600",  value: attempts.filter(a => { const s = parseInt(a.predicted_range); return s >= 400 && s < 600; }).length },
    { label: "600–800",  value: attempts.filter(a => { const s = parseInt(a.predicted_range); return s >= 600 && s < 800; }).length },
    { label: "800–1000", value: attempts.filter(a => { const s = parseInt(a.predicted_range); return s >= 800 && s < 1000; }).length },
    { label: "1000–1200",value: attempts.filter(a => { const s = parseInt(a.predicted_range); return s >= 1000 && s < 1200; }).length },
    { label: "1200–1400",value: attempts.filter(a => { const s = parseInt(a.predicted_range); return s >= 1200 && s < 1400; }).length },
    { label: "1400+",    value: attempts.filter(a => { const s = parseInt(a.predicted_range); return s >= 1400; }).length },
  ];

  const avgScore = attempts.filter(a => a.raw_score).length
    ? Math.round(attempts.filter(a => a.raw_score).reduce((s, a) => s + a.raw_score, 0) / attempts.filter(a => a.raw_score).length * 100 / 12)
    : 0;

  const thisWeek = attempts.filter(a => {
    const d = new Date(a.created_at); const now = new Date();
    return (now - d) < 7 * 24 * 60 * 60 * 1000;
  }).length;

  const lastWeek = attempts.filter(a => {
    const d = new Date(a.created_at); const now = new Date();
    const diff = now - d;
    return diff >= 7 * 24 * 60 * 60 * 1000 && diff < 14 * 24 * 60 * 60 * 1000;
  }).length;

  const diagTrend = lastWeek ? Math.round(((thisWeek - lastWeek) / lastWeek) * 100) : null;
  const activeSessions = sessions.filter(s => s.status === "active").length;
  const uniqueTeachers = new Set(sessions.map(s => s.teacherId).filter(Boolean)).size;

  const s = {
    card: { background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: "20px 22px", marginBottom: 0 },
    th: { textAlign: "left", padding: "9px 14px", fontSize: 11, color: T.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: `1px solid ${T.border}` },
    td: { padding: "11px 14px", fontSize: 13, color: T.text, borderBottom: `1px solid ${T.border}` },
  };

  const isLoading = !loaded.sessions || !loaded.attempts || !loaded.posts;

  return (
    <div style={{ minHeight: "100vh", background: T.dark, fontFamily: "'Inter','Segoe UI',sans-serif" }}>

      {/* ── Header ── */}
      <div style={{ background: T.card, borderBottom: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 28px" }}>
          <div style={{ height: 58, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,#1aa38a,#0d8f77)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14, color: "white" }}>SQ</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 800, color: T.text }}>ScoreQuanta Admin</div>
                <div style={{ fontSize: 11, color: T.muted }}>Platform management</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <Link to="/" style={{ padding: "6px 14px", background: T.surface, color: T.sub, border: `1px solid ${T.border}`, borderRadius: 8, cursor: "pointer", fontSize: 12, textDecoration: "none", display: "flex", alignItems: "center" }}>
                ← Live Site
              </Link>
              <button onClick={() => window.location.href = "/admin/theory"} style={{ padding: "6px 14px", background: T.greenBg, color: T.green, border: `1px solid ${T.greenBorder}`, borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600 }}>
                📚 Theory
              </button>
              <button onClick={() => signOut(auth)} style={{ padding: "6px 14px", background: "rgba(239,68,68,0.08)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 8, cursor: "pointer", fontSize: 12 }}>
                Sign Out
              </button>
            </div>
          </div>
          {/* Tabs */}
          <div style={{ display: "flex", gap: 2 }}>
            {TABS.map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                padding: "10px 18px", background: "none", border: "none", cursor: "pointer",
                fontSize: 14, fontWeight: tab === t ? 700 : 400,
                color: tab === t ? T.green : T.sub,
                borderBottom: `2px solid ${tab === t ? T.green : "transparent"}`,
                marginBottom: -1, transition: "all 0.15s",
              }}>{t}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "28px 28px 64px" }}>
        {isLoading && (
          <div style={{ textAlign: "center", padding: 40, color: T.muted, fontSize: 14 }}>Loading data…</div>
        )}

        {/* ══ OVERVIEW ══ */}
        {!isLoading && tab === "Overview" && (
          <>
            {/* Stat cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 20 }}>
              <StatCard icon="📋" value={attempts.length}  label="Total Diagnostics" sub={`${thisWeek} this week`} color="#6366f1" trend={diagTrend} T={T} />
              <StatCard icon="🎯" value={`${avgScore}%`}   label="Avg Score"         sub="across all attempts"   color="#1aa38a" T={T} />
              <StatCard icon="📖" value={sessions.length}  label="Total Sessions"    sub={`${activeSessions} active now`} color="#f59e0b" T={T} />
              <StatCard icon="✍️" value={posts.filter(p => p.published).length} label="Blog Posts" sub={`${posts.length} total`} color="#8b5cf6" T={T} />
            </div>

            {/* Charts row */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, marginBottom: 20 }}>
              {/* Diagnostics over time */}
              <div style={{ ...s.card }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: T.text }}>Diagnostics — Last 14 Days</div>
                    <div style={{ fontSize: 12, color: T.muted, marginTop: 2 }}>{attempts.length} total attempts</div>
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 900, color: "#6366f1" }}>{thisWeek} <span style={{ fontSize: 12, fontWeight: 400, color: T.muted }}>this week</span></div>
                </div>
                <LineChart data={last14Days} color="#6366f1" height={72} T={T} />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
                  {last14Days.filter((_, i) => i % 2 === 0).map((d, i) => (
                    <div key={i} style={{ fontSize: 10, color: T.muted }}>{d.label}</div>
                  ))}
                </div>
              </div>

              {/* Score distribution */}
              <div style={{ ...s.card }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 4 }}>Score Distribution</div>
                <div style={{ fontSize: 12, color: T.muted, marginBottom: 16 }}>Predicted SAT ranges</div>
                <BarChart data={scoreDistribution} color="#1aa38a" T={T} />
              </div>
            </div>

            {/* Quick actions + sessions */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 16 }}>
              {/* Quick actions */}
              <div style={{ ...s.card, display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 4 }}>Quick Actions</div>
                {[
                  { icon: "📝", label: "Manage Blog Posts",    to: null,       onClick: () => setTab("Blog"),        color: "#8b5cf6" },
                  { icon: "📊", label: "View Diagnostics",     to: null,       onClick: () => setTab("Diagnostics"), color: "#6366f1" },
                  { icon: "📚", label: "AI Theory Curation",   to: "/admin/theory", color: "#1aa38a" },
                  { icon: "🌐", label: "View Live Site",        to: "/",        color: "#f59e0b" },
                  { icon: "📈", label: "Google Analytics",      href: "https://analytics.google.com", color: "#ef4444" },
                ].map((action, i) => {
                  const style = {
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "12px 14px", borderRadius: 10,
                    background: T.surface, border: `1px solid ${T.border}`,
                    cursor: "pointer", textDecoration: "none",
                    transition: "border-color 0.15s",
                  };
                  const content = (
                    <>
                      <div style={{ width: 32, height: 32, borderRadius: 8, background: `${action.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>{action.icon}</div>
                      <span style={{ fontSize: 13, fontWeight: 600, color: T.text }}>{action.label}</span>
                      <span style={{ marginLeft: "auto", color: T.muted, fontSize: 14 }}>→</span>
                    </>
                  );
                  if (action.href) return <a key={i} href={action.href} target="_blank" rel="noreferrer" style={style}>{content}</a>;
                  if (action.to) return <Link key={i} to={action.to} style={style}>{content}</Link>;
                  return <div key={i} style={style} onClick={action.onClick}>{content}</div>;
                })}
              </div>

              {/* Recent sessions */}
              <div style={{ ...s.card }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 14 }}>Recent Sessions</div>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead><tr>{["Session","Curriculum","Chapter","Status","Date"].map(h => <th key={h} style={s.th}>{h}</th>)}</tr></thead>
                  <tbody>
                    {sessions.slice(0, 8).map((sess, i) => (
                      <tr key={i}>
                        <td style={{ ...s.td, color: "#6366f1", fontWeight: 700, fontSize: 12 }}>{sess.id.slice(0, 8)}…</td>
                        <td style={s.td}>{sess.curriculum?.toUpperCase() || "SAT"}</td>
                        <td style={{ ...s.td, color: T.sub, fontSize: 12 }}>{sess.chapter || "—"}</td>
                        <td style={s.td}>
                          <span style={{ padding: "2px 8px", borderRadius: 12, fontSize: 11, fontWeight: 700, background: sess.status === "ended" ? T.greenBg : "rgba(245,158,11,0.1)", color: sess.status === "ended" ? T.green : "#f59e0b" }}>
                            {sess.status || "active"}
                          </span>
                        </td>
                        <td style={{ ...s.td, color: T.muted, fontSize: 12 }}>{sess.createdAt?.toDate?.()?.toLocaleDateString("en-GB", { day: "numeric", month: "short" }) || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* ══ DIAGNOSTICS ══ */}
        {!isLoading && tab === "Diagnostics" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 20 }}>
              <StatCard icon="📋" value={attempts.length}   label="Total Attempts"  sub="all time"              color="#6366f1" T={T} />
              <StatCard icon="🎯" value={`${avgScore}%`}    label="Average Accuracy" sub="raw score / 12"       color="#1aa38a" T={T} />
              <StatCard icon="📈" value={attempts.filter(a => a.predicted_range).length} label="Reports Generated" sub="with AI analysis" color="#f59e0b" T={T} />
            </div>

            {/* Charts */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
              <div style={s.card}>
                <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 16 }}>Daily Attempts — Last 14 Days</div>
                <LineChart data={last14Days} color="#6366f1" height={80} T={T} />
              </div>
              <div style={s.card}>
                <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 16 }}>Score Distribution</div>
                <BarChart data={scoreDistribution} color="#1aa38a" T={T} />
              </div>
            </div>

            {/* Table */}
            <div style={s.card}>
              <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 14 }}>All Attempts</div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead><tr>{["#","Score","Math","Verbal","Predicted","Ceiling","Date","Report"].map(h => <th key={h} style={s.th}>{h}</th>)}</tr></thead>
                <tbody>
                  {attempts.map((a, i) => (
                    <tr key={i} style={{ opacity: a.raw_score == null ? 0.5 : 1 }}>
                      <td style={{ ...s.td, color: T.muted, fontSize: 12 }}>#{a.id}</td>
                      <td style={{ ...s.td }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div style={{ width: 40, height: 6, background: T.surface, borderRadius: 3, overflow: "hidden" }}>
                            <div style={{ height: "100%", width: `${((a.raw_score || 0) / 12) * 100}%`, background: a.raw_score >= 9 ? "#1aa38a" : a.raw_score >= 6 ? "#f59e0b" : "#ef4444", borderRadius: 3 }} />
                          </div>
                          <span style={{ fontSize: 13, fontWeight: 700, color: T.text }}>{a.raw_score ?? "—"}/12</span>
                        </div>
                      </td>
                      <td style={s.td}>{a.math_score ?? "—"}</td>
                      <td style={s.td}>{a.verbal_score ?? "—"}</td>
                      <td style={{ ...s.td, fontWeight: 600, color: "#6366f1" }}>{a.predicted_range || "—"}</td>
                      <td style={{ ...s.td, color: T.green, fontWeight: 600 }}>{a.score_ceiling || "—"}</td>
                      <td style={{ ...s.td, color: T.muted, fontSize: 12 }}>{new Date(a.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}</td>
                      <td style={s.td}>
                        <Link to={`/diagnostic/report/${a.id}`} style={{ fontSize: 12, color: T.green, textDecoration: "none", fontWeight: 700 }}>View →</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ══ BLOG ══ */}
        {!isLoading && tab === "Blog" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 20 }}>
              <StatCard icon="✅" value={posts.filter(p => p.published).length} label="Published"  color="#1aa38a" T={T} />
              <StatCard icon="📝" value={posts.filter(p => !p.published).length} label="Drafts"    color="#f59e0b" T={T} />
              <StatCard icon="📂" value={[...new Set(posts.map(p => p.category))].length} label="Categories" color="#6366f1" T={T} />
            </div>
            <div style={s.card}>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {posts.map(post => (
                  <div key={post.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", background: T.surface, border: `1px solid ${T.border}`, borderRadius: 10 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: T.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{post.title}</div>
                      <div style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>{post.category} · {post.read_time_minutes} min · {new Date(post.published_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</div>
                    </div>
                    <button onClick={async () => {
                      await supabaseAdmin.from("blog_posts").update({ published: !post.published }).eq("id", post.id);
                      setPosts(ps => ps.map(p => p.id === post.id ? { ...p, published: !p.published } : p));
                    }} style={{ padding: "4px 12px", borderRadius: 16, fontSize: 11, fontWeight: 700, cursor: "pointer", border: `1px solid ${post.published ? T.greenBorder : T.border}`, background: post.published ? T.greenBg : T.surface, color: post.published ? T.green : T.muted }}>
                      {post.published ? "Published" : "Draft"}
                    </button>
                    <a href={`/blog/${post.slug}`} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: T.green, textDecoration: "none", fontWeight: 600 }}>View ↗</a>
                    <button onClick={async () => {
                      if (!window.confirm("Delete?")) return;
                      await supabaseAdmin.from("blog_posts").delete().eq("id", post.id);
                      setPosts(ps => ps.filter(p => p.id !== post.id));
                    }} style={{ padding: "4px 10px", borderRadius: 6, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444", cursor: "pointer", fontSize: 11 }}>
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ══ ANALYTICS ══ */}
        {!isLoading && tab === "Analytics" && (
          <>
            {/* Computed metrics */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 20 }}>
              <StatCard icon="📅" value={thisWeek}     label="Diagnostics This Week" color="#6366f1" trend={diagTrend} T={T} />
              <StatCard icon="🏆" value={attempts.filter(a => parseInt(a.predicted_range) >= 1200).length} label="Scoring 1200+" color="#1aa38a" T={T} />
              <StatCard icon="📖" value={sessions.filter(s => { const d = new Date(s.createdAt?.toDate?.()); return (new Date() - d) < 7*24*60*60*1000; }).length} label="Sessions This Week" color="#f59e0b" T={T} />
              <StatCard icon="🌐" value={posts.filter(p => p.published).length} label="Live Blog Posts" color="#8b5cf6" T={T} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
              <div style={s.card}>
                <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 4 }}>Diagnostic Trend</div>
                <div style={{ fontSize: 12, color: T.muted, marginBottom: 16 }}>Attempts per day, last 14 days</div>
                <LineChart data={last14Days} color="#6366f1" height={90} T={T} />
              </div>
              <div style={s.card}>
                <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 4 }}>Score Distribution</div>
                <div style={{ fontSize: 12, color: T.muted, marginBottom: 16 }}>Predicted score ranges</div>
                <BarChart data={scoreDistribution} color="#1aa38a" T={T} />
              </div>
            </div>

            {/* GA4 link */}
            <div style={{ ...s.card, background: "linear-gradient(135deg, rgba(99,102,241,0.06), rgba(26,163,138,0.06))", border: `1px solid ${T.border}` }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: T.text, marginBottom: 6 }}>Google Analytics 4</div>
                  <div style={{ fontSize: 14, color: T.sub, marginBottom: 4 }}>Measurement ID: <code style={{ background: T.surface, padding: "2px 6px", borderRadius: 4, fontSize: 13 }}>G-VF7KKBTJNH</code></div>
                  <div style={{ fontSize: 13, color: T.muted }}>Page views, sessions, geography, traffic sources — all in GA4 dashboard.</div>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <a href="https://analytics.google.com/analytics/web/#/p{G-VF7KKBTJNH}/reports/intelligenthome" target="_blank" rel="noreferrer" style={{ padding: "10px 20px", borderRadius: 10, background: "#4285f4", color: "white", textDecoration: "none", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
                    <span>Open GA4 Dashboard ↗</span>
                  </a>
                  <a href="https://console.firebase.google.com/project/class-flow-64719/analytics" target="_blank" rel="noreferrer" style={{ padding: "10px 20px", borderRadius: 10, background: T.greenBg, color: T.green, border: `1px solid ${T.greenBorder}`, textDecoration: "none", fontSize: 13, fontWeight: 700 }}>
                    Firebase Console ↗
                  </a>
                </div>
              </div>

              <div style={{ borderTop: `1px solid ${T.border}`, marginTop: 20, paddingTop: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: T.text, marginBottom: 12 }}>Events being tracked</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {["page_view (automatic)", "diagnostic_started", "diagnostic_completed", "report_viewed", "lesson_opened", "blog_post_viewed"].map(e => (
                    <span key={e} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 6, padding: "4px 10px", fontSize: 12, color: T.sub, fontWeight: 500 }}>{e}</span>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
