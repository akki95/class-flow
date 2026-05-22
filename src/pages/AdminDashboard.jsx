import { useState, useEffect, useCallback } from "react";
import { db, auth } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { createClient } from "@supabase/supabase-js";
import { signOut } from "firebase/auth";
import { useTheme } from "../context/ThemeContext";

const supabaseAdmin = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_SERVICE_KEY
);

const ADMIN_EMAIL      = "akash95agrawal@gmail.com";
const TEST_ADMIN_EMAIL = "admin@classflow.com";
const TABS = ["Overview", "Questions", "Blog", "Diagnostics"];

// ── Question form ──────────────────────────────────────────────────────────
const EMPTY_Q = { question_text: "", option_a: "", option_b: "", option_c: "", option_d: "", correct_answer: "A", concept: "", difficulty: "medium", section: "math", ideal_time_seconds: 60, trap_type: "", numeric_answer: "" };

function QuestionForm({ initial, onSave, onCancel, T }) {
  const [form, setForm] = useState(initial || EMPTY_Q);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const inputStyle = { width: "100%", padding: "8px 12px", borderRadius: 8, border: `1px solid ${T.border}`, background: T.surface, color: T.text, fontSize: 13, outline: "none", boxSizing: "border-box" };
  const labelStyle = { fontSize: 12, fontWeight: 600, color: T.sub, display: "block", marginBottom: 4 };

  return (
    <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, padding: 24, marginBottom: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
        <div>
          <label style={labelStyle}>Question Text (LaTeX OK)</label>
          <textarea value={form.question_text} onChange={e => set("question_text", e.target.value)}
            rows={3} style={{ ...inputStyle, resize: "vertical" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {["a","b","c","d"].map(l => (
            <div key={l}>
              <label style={labelStyle}>Option {l.toUpperCase()}</label>
              <input value={form[`option_${l}`]} onChange={e => set(`option_${l}`, e.target.value)} style={inputStyle} />
            </div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
          <div>
            <label style={labelStyle}>Correct Answer</label>
            <select value={form.correct_answer} onChange={e => set("correct_answer", e.target.value)} style={inputStyle}>
              {["A","B","C","D"].map(l => <option key={l}>{l}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Difficulty</label>
            <select value={form.difficulty} onChange={e => set("difficulty", e.target.value)} style={inputStyle}>
              {["easy","medium","hard"].map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Section</label>
            <select value={form.section} onChange={e => set("section", e.target.value)} style={inputStyle}>
              {["math","verbal"].map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Ideal Time (s)</label>
            <input type="number" value={form.ideal_time_seconds} onChange={e => set("ideal_time_seconds", Number(e.target.value))} style={inputStyle} />
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          <div>
            <label style={labelStyle}>Concept</label>
            <input value={form.concept} onChange={e => set("concept", e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Trap Type</label>
            <input value={form.trap_type} onChange={e => set("trap_type", e.target.value)} placeholder="optional" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Numeric Answer</label>
            <input value={form.numeric_answer} onChange={e => set("numeric_answer", e.target.value)} placeholder="optional" style={inputStyle} />
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button onClick={onCancel} style={{ padding: "8px 18px", borderRadius: 8, border: `1px solid ${T.border}`, background: T.card, color: T.sub, cursor: "pointer", fontSize: 13 }}>
            Cancel
          </button>
          <button onClick={() => onSave(form)} style={{ padding: "8px 18px", borderRadius: 8, background: "#1aa38a", color: "white", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 700 }}>
            Save Question
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard({ user }) {
  const { T } = useTheme();
  const [tab, setTab] = useState("Overview");

  // Sessions
  const [sessions, setSessions] = useState([]);
  const [sessionsLoading, setSessionsLoading] = useState(false);

  // Questions
  const [questions, setQuestions] = useState([]);
  const [qLoading, setQLoading] = useState(false);
  const [qSearch, setQSearch] = useState("");
  const [qSection, setQSection] = useState("all");
  const [qDiff, setQDiff] = useState("all");
  const [editingQ, setEditingQ] = useState(null);
  const [addingQ, setAddingQ] = useState(false);

  // Blog
  const [posts, setPosts] = useState([]);
  const [blogLoading, setBlogLoading] = useState(false);

  // Diagnostics
  const [attempts, setAttempts] = useState([]);
  const [diagLoading, setDiagLoading] = useState(false);

  // Load data when tab switches
  useEffect(() => {
    if (tab === "Overview" && sessions.length === 0) loadSessions();
    if (tab === "Questions" && questions.length === 0) loadQuestions();
    if (tab === "Blog" && posts.length === 0) loadBlog();
    if (tab === "Diagnostics" && attempts.length === 0) loadDiagnostics();
  }, [tab]); // eslint-disable-line

  const loadSessions = async () => {
    setSessionsLoading(true);
    const snap = await getDocs(query(collection(db, "sessions"), orderBy("createdAt", "desc")));
    setSessions(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    setSessionsLoading(false);
  };

  const loadQuestions = async () => {
    setQLoading(true);
    const { data } = await supabaseAdmin.from("questions").select("id,question_text,concept,difficulty,section,correct_answer,trap_type,option_a,option_b,option_c,option_d,ideal_time_seconds,numeric_answer").order("id", { ascending: false });
    setQuestions(data || []);
    setQLoading(false);
  };

  const loadBlog = async () => {
    setBlogLoading(true);
    const { data } = await supabaseAdmin.from("blog_posts").select("id,title,category,published,published_at,read_time_minutes").order("published_at", { ascending: false });
    setPosts(data || []);
    setBlogLoading(false);
  };

  const loadDiagnostics = async () => {
    setDiagLoading(true);
    const { data } = await supabaseAdmin.from("test_attempts").select("id,raw_score,math_score,verbal_score,predicted_range,score_ceiling,created_at,user_id").order("created_at", { ascending: false }).limit(50);
    setAttempts(data || []);
    setDiagLoading(false);
  };

  const saveQuestion = async (form) => {
    const payload = { ...form, numeric_answer: form.numeric_answer || null, trap_type: form.trap_type || null };
    if (editingQ) {
      await supabaseAdmin.from("questions").update(payload).eq("id", editingQ.id);
      setQuestions(qs => qs.map(q => q.id === editingQ.id ? { ...q, ...payload } : q));
    } else {
      const { data } = await supabaseAdmin.from("questions").insert(payload).select().single();
      if (data) setQuestions(qs => [data, ...qs]);
    }
    setEditingQ(null); setAddingQ(false);
  };

  const deleteQuestion = async (id) => {
    if (!window.confirm("Delete this question?")) return;
    await supabaseAdmin.from("questions").delete().eq("id", id);
    setQuestions(qs => qs.filter(q => q.id !== id));
  };

  const togglePublished = async (post) => {
    await supabaseAdmin.from("blog_posts").update({ published: !post.published }).eq("id", post.id);
    setPosts(ps => ps.map(p => p.id === post.id ? { ...p, published: !p.published } : p));
  };

  const deletePost = async (id) => {
    if (!window.confirm("Delete this post?")) return;
    await supabaseAdmin.from("blog_posts").delete().eq("id", id);
    setPosts(ps => ps.filter(p => p.id !== id));
  };

  // Filtered questions
  const filteredQ = questions.filter(q => {
    const matchSearch = q.question_text?.toLowerCase().includes(qSearch.toLowerCase()) || q.concept?.toLowerCase().includes(qSearch.toLowerCase());
    const matchSection = qSection === "all" || q.section === qSection;
    const matchDiff = qDiff === "all" || q.difficulty === qDiff;
    return matchSearch && matchSection && matchDiff;
  });

  // Access check — after all hooks
  if (user?.email !== ADMIN_EMAIL && user?.email !== TEST_ADMIN_EMAIL) {
    return (
      <div style={{ minHeight: "100vh", background: T.dark, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter',sans-serif" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ color: "#ef4444", fontSize: 18, fontWeight: 700 }}>Access Denied</div>
          <p style={{ color: T.sub }}>Logged in as: {user?.email}</p>
        </div>
      </div>
    );
  }

  const s = {
    card: { background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: 20, marginBottom: 16 },
    th: { textAlign: "left", padding: "8px 12px", fontSize: 11, color: T.muted, fontWeight: 700, textTransform: "uppercase", borderBottom: `1px solid ${T.border}` },
    td: { padding: "10px 12px", fontSize: 13, color: T.text, borderBottom: `1px solid ${T.border}` },
  };

  // ── Stat counts ────────────────────────────────────────────────────────
  const totalSessions = sessions.length;
  const activeSessions = sessions.filter(s => s.status === "active").length;
  const uniqueTeachers = new Set(sessions.map(s => s.teacherId).filter(Boolean)).size;

  return (
    <div style={{ minHeight: "100vh", background: T.dark, fontFamily: "'Inter','Segoe UI',sans-serif" }}>
      {/* Header */}
      <div style={{ background: T.card, borderBottom: `1px solid ${T.border}`, padding: "0 28px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", height: 58, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,#1aa38a,#0d8f77)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14, color: "white" }}>SQ</div>
            <span style={{ fontSize: 15, fontWeight: 700, color: T.text }}>ScoreQuanta Admin</span>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <button onClick={() => window.location.href = "/admin/theory"} style={{ padding: "6px 14px", background: T.greenBg, color: T.green, border: `1px solid ${T.greenBorder}`, borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600 }}>
              📚 Theory Curation
            </button>
            <button onClick={() => signOut(auth)} style={{ padding: "6px 14px", background: "rgba(239,68,68,0.08)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 8, cursor: "pointer", fontSize: 12 }}>
              Sign Out
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: 4 }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: "10px 18px", background: "none", border: "none", cursor: "pointer",
              fontSize: 14, fontWeight: tab === t ? 700 : 400,
              color: tab === t ? T.green : T.sub,
              borderBottom: `2px solid ${tab === t ? T.green : "transparent"}`,
              transition: "all 0.15s",
            }}>{t}</button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 28px" }}>

        {/* ── OVERVIEW ── */}
        {tab === "Overview" && (
          sessionsLoading ? <div style={{ color: T.sub, padding: 40, textAlign: "center" }}>Loading…</div> : <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 20 }}>
              {[
                { label: "Total Sessions",   value: totalSessions,       icon: "📊", color: "#6366f1" },
                { label: "Active Now",        value: activeSessions,       icon: "🟢", color: "#22c55e" },
                { label: "Unique Teachers",   value: uniqueTeachers,       icon: "👩‍🏫", color: "#f59e0b" },
                { label: "Questions",         value: questions.length || "—", icon: "❓", color: "#1aa38a" },
              ].map((stat, i) => (
                <div key={i} style={{ ...s.card, textAlign: "center", marginBottom: 0 }}>
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{stat.icon}</div>
                  <div style={{ fontSize: 26, fontWeight: 800, color: stat.color }}>{stat.value}</div>
                  <div style={{ fontSize: 12, color: T.muted, marginTop: 4 }}>{stat.label}</div>
                </div>
              ))}
            </div>
            <div style={s.card}>
              <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 14 }}>🕐 Recent Sessions</div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead><tr>{["Session ID","Curriculum","Chapter","Status","Date"].map(h => <th key={h} style={s.th}>{h}</th>)}</tr></thead>
                <tbody>
                  {sessions.slice(0, 15).map((sess, i) => (
                    <tr key={i}>
                      <td style={{ ...s.td, color: "#6366f1", fontWeight: 700 }}>{sess.id.slice(0, 8)}…</td>
                      <td style={s.td}>{sess.curriculum?.toUpperCase() || "SAT"}</td>
                      <td style={s.td}>{sess.chapter || "—"}</td>
                      <td style={s.td}>
                        <span style={{ padding: "2px 8px", borderRadius: 12, fontSize: 11, fontWeight: 600, background: sess.status === "ended" ? T.greenBg : "rgba(245,158,11,0.1)", color: sess.status === "ended" ? T.green : "#f59e0b" }}>{sess.status || "active"}</span>
                      </td>
                      <td style={{ ...s.td, color: T.muted, fontSize: 12 }}>{sess.createdAt?.toDate?.()?.toLocaleDateString("en-GB", { day: "numeric", month: "short" }) || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ── QUESTIONS ── */}
        {tab === "Questions" && (
          <>
            <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
              <input placeholder="Search questions…" value={qSearch} onChange={e => setQSearch(e.target.value)}
                style={{ flex: 1, minWidth: 200, padding: "8px 12px", borderRadius: 8, border: `1px solid ${T.border}`, background: T.card, color: T.text, fontSize: 13, outline: "none" }} />
              {[["all","All"],["math","Math"],["verbal","Verbal"]].map(([v,l]) => (
                <button key={v} onClick={() => setQSection(v)} style={{ padding: "7px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", border: `1px solid ${qSection===v ? T.green : T.border}`, background: qSection===v ? T.green : T.card, color: qSection===v ? "white" : T.sub }}>{l}</button>
              ))}
              {[["all","All"],["easy","Easy"],["medium","Med"],["hard","Hard"]].map(([v,l]) => (
                <button key={v} onClick={() => setQDiff(v)} style={{ padding: "7px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", border: `1px solid ${qDiff===v ? "#6366f1" : T.border}`, background: qDiff===v ? "#6366f1" : T.card, color: qDiff===v ? "white" : T.sub }}>{l}</button>
              ))}
              <button onClick={() => { setAddingQ(true); setEditingQ(null); }} style={{ padding: "7px 16px", borderRadius: 8, background: "#1aa38a", color: "white", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 700, marginLeft: "auto" }}>
                + Add Question
              </button>
            </div>

            {(addingQ || editingQ) && (
              <QuestionForm initial={editingQ} onSave={saveQuestion} onCancel={() => { setEditingQ(null); setAddingQ(false); }} T={T} />
            )}

            {qLoading ? <div style={{ color: T.sub, textAlign: "center", padding: 40 }}>Loading…</div> : (
              <div style={{ fontSize: 13, color: T.muted, marginBottom: 10 }}>{filteredQ.length} questions</div>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {filteredQ.map(q => (
                <div key={q.id} style={{ background: T.card, border: `1px solid ${T.border}`, borderLeft: `3px solid ${q.section==="math"?"#6366f1":"#1aa38a"}`, borderRadius: 10, padding: "10px 14px", display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, color: T.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{q.question_text?.replace(/\\\(|\\\)/g, "").slice(0, 80)}…</div>
                    <div style={{ fontSize: 11, color: T.muted, marginTop: 3 }}>{q.concept} · {q.difficulty} · {q.section} · #{q.id}</div>
                  </div>
                  <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                    <button onClick={() => { setEditingQ(q); setAddingQ(false); window.scrollTo(0,0); }} style={{ padding: "4px 10px", borderRadius: 6, background: T.surface, border: `1px solid ${T.border}`, color: T.sub, cursor: "pointer", fontSize: 11 }}>Edit</button>
                    <button onClick={() => deleteQuestion(q.id)} style={{ padding: "4px 10px", borderRadius: 6, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444", cursor: "pointer", fontSize: 11 }}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── BLOG ── */}
        {tab === "Blog" && (
          blogLoading ? <div style={{ color: T.sub, textAlign: "center", padding: 40 }}>Loading…</div> : (
            <>
              <div style={{ fontSize: 13, color: T.muted, marginBottom: 12 }}>{posts.length} posts</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {posts.map(post => (
                  <div key={post.id} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 10, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: T.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{post.title}</div>
                      <div style={{ fontSize: 11, color: T.muted, marginTop: 3 }}>{post.category} · {post.read_time_minutes} min · {new Date(post.published_at).toLocaleDateString("en-GB", { day:"numeric", month:"short", year:"numeric" })}</div>
                    </div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
                      <button onClick={() => togglePublished(post)} style={{ padding: "4px 12px", borderRadius: 16, fontSize: 11, fontWeight: 700, cursor: "pointer", border: `1px solid ${post.published ? T.greenBorder : T.border}`, background: post.published ? T.greenBg : T.surface, color: post.published ? T.green : T.muted }}>
                        {post.published ? "Published" : "Draft"}
                      </button>
                      <a href={`/blog/${post.title.toLowerCase().replace(/[^a-z0-9]+/g,"-")}`} target="_blank" rel="noreferrer" style={{ fontSize: 11, color: T.green, textDecoration: "none", fontWeight: 600 }}>View ↗</a>
                      <button onClick={() => deletePost(post.id)} style={{ padding: "4px 10px", borderRadius: 6, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444", cursor: "pointer", fontSize: 11 }}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )
        )}

        {/* ── DIAGNOSTICS ── */}
        {tab === "Diagnostics" && (
          diagLoading ? <div style={{ color: T.sub, textAlign: "center", padding: 40 }}>Loading…</div> : (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 20 }}>
                {[
                  { label: "Total Attempts", value: attempts.length, color: "#6366f1" },
                  { label: "Avg Score",  value: attempts.length ? Math.round(attempts.filter(a=>a.raw_score).reduce((s,a)=>s+a.raw_score,0) / attempts.filter(a=>a.raw_score).length * 100 / 12) + "%" : "—", color: "#1aa38a" },
                  { label: "With Reports", value: attempts.filter(a => a.predicted_range).length, color: "#f59e0b" },
                ].map((stat, i) => (
                  <div key={i} style={{ ...s.card, textAlign: "center", marginBottom: 0 }}>
                    <div style={{ fontSize: 28, fontWeight: 800, color: stat.color }}>{stat.value}</div>
                    <div style={{ fontSize: 12, color: T.muted, marginTop: 4 }}>{stat.label}</div>
                  </div>
                ))}
              </div>
              <div style={s.card}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead><tr>{["ID","Score","Math","Verbal","Predicted","Ceiling","Date","Report"].map(h => <th key={h} style={s.th}>{h}</th>)}</tr></thead>
                  <tbody>
                    {attempts.map((a, i) => (
                      <tr key={i}>
                        <td style={{ ...s.td, color: T.muted, fontSize: 12 }}>#{a.id}</td>
                        <td style={{ ...s.td, fontWeight: 700, color: T.text }}>{a.raw_score ?? "—"}/12</td>
                        <td style={s.td}>{a.math_score ?? "—"}</td>
                        <td style={s.td}>{a.verbal_score ?? "—"}</td>
                        <td style={{ ...s.td, fontWeight: 600, color: "#6366f1" }}>{a.predicted_range || "—"}</td>
                        <td style={{ ...s.td, color: T.green }}>{a.score_ceiling || "—"}</td>
                        <td style={{ ...s.td, color: T.muted, fontSize: 12 }}>{new Date(a.created_at).toLocaleDateString("en-GB",{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"})}</td>
                        <td style={s.td}>
                          <a href={`/diagnostic/report/${a.id}`} style={{ fontSize: 11, color: T.green, textDecoration: "none", fontWeight: 600 }}>View →</a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
}
