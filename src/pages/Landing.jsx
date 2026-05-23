import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { supabase } from "../supabase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CATEGORY_LABELS = {
  "sat-strategy": "SAT Strategy",
  "math-guide": "Math Guide",
  "verbal-guide": "Verbal Guide",
  "score-improvement": "Score Improvement",
  "college-admissions": "College Admissions",
  "parent-guide": "Parent Guide",
  "practice-breakdowns": "Practice",
};

const CURRICULA = [
  {
    id: "sat",
    label: "SAT",
    color: "#6366f1",
    headline: "Know exactly what's holding your SAT score back",
    sub: "Take a free 15-minute diagnostic. Get a personalised AI report. Start studying what actually matters.",
    cta: "Take Free SAT Diagnostic →",
    link: "/diagnostic",
    lessonsLink: "/sat",
    score: { current: "1180 – 1240", ceiling: "1470", unlockable: "+230 pts" },
  },
  {
    id: "igcse",
    label: "IGCSE",
    color: "#1aa38a",
    headline: "Find your IGCSE grade ceiling — in 15 minutes",
    sub: "Pinpoint the exact topics holding you below an A*. Get a personalised report with a study plan.",
    cta: "Take Free IGCSE Diagnostic →",
    link: "/diagnostic/igcse",
    lessonsLink: "/igcse/cambridge",
    score: { current: "Grade B", ceiling: "Grade A*", unlockable: "2 grades" },
  },
  {
    id: "alevel",
    label: "A-Level",
    color: "#f97316",
    headline: "Unlock your A-Level Maths potential",
    sub: "Identify weak topics across Pure, Statistics and Mechanics. Structured lessons built around your gaps.",
    cta: "Explore A-Level Lessons →",
    link: "/alevel",
    lessonsLink: "/alevel",
    score: { current: "Grade C", ceiling: "Grade A", unlockable: "2 grades" },
  },
  {
    id: "icse",
    label: "ICSE",
    color: "#e11d48",
    headline: "Master ICSE Maths — Class 9 & 10",
    sub: "GST, quadratics, circle theorems, trigonometric proofs, AP/GP and more. Topic-by-topic mastery with worked examples.",
    cta: "Start ICSE Maths →",
    link: "/icse",
    lessonsLink: "/icse",
    score: { current: "65–75%", ceiling: "95%+", unlockable: "+20–30%" },
  },
];

const TESTIMONIALS = [
  { name: "Aanya S.", exam: "SAT", score: "1090 → 1340", quote: "The diagnostic told me exactly what I was doing wrong. I'd been practising the wrong topics for months.", avatar: "A" },
  { name: "Rohan M.", exam: "IGCSE", score: "Grade C → A*", quote: "The AI report was scary accurate. It flagged my algebra trap sensitivity before I even realised it was an issue.", avatar: "R" },
  { name: "Priya K.", exam: "SAT", score: "1200 → 1480", quote: "I retook the diagnostic after 4 weeks of studying the recommended lessons. 280 point jump.", avatar: "P" },
  { name: "James T.", exam: "A-Level", score: "C → A", quote: "Finally understood where my marks were going. The mastery flow for integration was exactly what I needed.", avatar: "J" },
];

const FAQS = [
  { q: "Is the diagnostic really free?", a: "Yes. The 12-question diagnostic and your full AI report are completely free. No credit card, no trial. Just take the test and get your results." },
  { q: "How is this different from Khan Academy or past papers?", a: "Khan Academy covers content. Past papers test recall. ScoreQuanta measures how you think — timing, confidence, decision-making under pressure. The report tells you why you're losing marks, not just which questions you got wrong." },
  { q: "Do I need to sign up to take the diagnostic?", a: "No. You can take the diagnostic without an account. You only need an email to unlock the full AI report — we send it there." },
  { q: "How accurate is the score prediction?", a: "Based on behavioral data across 12 questions, the predicted range is typically within 80 points of your actual SAT score. The score ceiling is your realistic potential with 4–6 weeks of targeted prep." },
  { q: "Which exams do you cover?", a: "SAT (Math & Verbal), Cambridge IGCSE 0580 (Core & Extended), GCSE Higher, and A-Level Maths (Pure, Statistics, Mechanics). More curricula coming soon." },
  { q: "Can my teacher see my results?", a: "Only if you're enrolled in a teacher's session on the platform. Public diagnostics are private to you." },
];

const ACTIVITY = [
  "Arjun from Mumbai just took the SAT diagnostic",
  "Emma from London improved her IGCSE score by 2 grades",
  "Yusuf from Dubai started the Quadratics lesson",
  "Priya from Singapore unlocked her diagnostic report",
  "Lucas from Nairobi completed the Algebra mastery flow",
  "Sofia from Toronto scored 1420 on her second attempt",
];

function useCountUp(target, duration = 1200, start = 800) {
  const [val, setVal] = useState(start);
  const started = useRef(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const steps = 40;
    const increment = (target - start) / steps;
    let current = start;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      current += increment;
      setVal(Math.round(current));
      if (step >= steps) { setVal(target); clearInterval(timer); }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target, duration, start]);
  return val;
}

export default function Landing({ user }) {
  const { T } = useTheme();
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [activeCurriculum, setActiveCurriculum] = useState(0);
  const [activityIdx, setActivityIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const curriculum = CURRICULA[activeCurriculum];
  const scoreCount = useCountUp(1180);

  // Rotate activity ticker
  useEffect(() => {
    const t = setInterval(() => setActivityIdx(i => (i + 1) % ACTIVITY.length), 3500);
    return () => clearInterval(t);
  }, []);

  // Fetch varied blog posts — one per category
  useEffect(() => {
    const FEATURED_CATEGORIES = ["sat-strategy", "math-guide", "score-improvement"];
    Promise.all(
      FEATURED_CATEGORIES.map(cat =>
        supabase.from("blog_posts")
          .select("id,title,slug,excerpt,category,read_time_minutes")
          .eq("published", true)
          .eq("category", cat)
          .order("published_at", { ascending: false })
          .limit(1)
          .then(({ data }) => data?.[0] || null)
      )
    ).then(results => {
      setPosts(results.filter(Boolean));
      setPostsLoading(false);
    });
  }, []);

  return (
    <div style={{ background: T.dark, minHeight: "100vh", fontFamily: "'Inter','Segoe UI',sans-serif" }}>
      <Navbar user={user} />

      {/* ── Live Activity Ticker ── */}
      <div style={{
        background: T.greenBg, borderBottom: `1px solid ${T.greenBorder}`,
        padding: "8px 24px", display: "flex", alignItems: "center",
        justifyContent: "center", gap: 10,
      }}>
        <span style={{
          width: 8, height: 8, borderRadius: "50%", background: T.green,
          flexShrink: 0, boxShadow: `0 0 0 3px ${T.greenBg}`,
          animation: "pulse 2s infinite",
        }} />
        <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
        <span style={{ fontSize: 13, color: T.green, fontWeight: 500 }}>
          {ACTIVITY[activityIdx]}
        </span>
      </div>

      {/* ── Hero ── */}
      <section style={{ padding: "72px 24px 64px", maxWidth: 1100, margin: "0 auto" }}>

        {/* Curriculum tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 36, flexWrap: "wrap" }}>
          {CURRICULA.map((c, i) => (
            <button key={c.id} onClick={() => setActiveCurriculum(i)} style={{
              padding: "7px 20px", borderRadius: 20, fontSize: 14, fontWeight: 600,
              cursor: "pointer", border: `2px solid ${activeCurriculum === i ? c.color : T.border}`,
              background: activeCurriculum === i ? c.color : T.card,
              color: activeCurriculum === i ? "white" : T.sub,
              transition: "all 0.18s",
            }}>{c.label}</button>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 48, flexWrap: "wrap" }}>
          {/* Left */}
          <div style={{ flex: "1 1 400px" }}>
            <h1 style={{
              fontSize: "clamp(34px, 4.5vw, 50px)", fontWeight: 900,
              color: T.text, lineHeight: 1.15, margin: "0 0 20px",
              transition: "all 0.2s",
            }}>
              {curriculum.headline}
            </h1>
            <p style={{ fontSize: 18, color: T.sub, lineHeight: 1.65, margin: "0 0 36px", maxWidth: 520 }}>
              {curriculum.sub}
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
              <Link to={curriculum.link} style={{
                background: `linear-gradient(135deg, ${curriculum.color}, ${curriculum.color}cc)`,
                color: "white", textDecoration: "none",
                padding: "14px 28px", borderRadius: 10, fontSize: 16, fontWeight: 700,
                boxShadow: `0 4px 16px ${curriculum.color}44`,
              }}>
                {curriculum.cta}
              </Link>
              <Link to={curriculum.lessonsLink} style={{
                color: T.text, textDecoration: "none",
                padding: "14px 28px", borderRadius: 10, fontSize: 16, fontWeight: 600,
                border: `1px solid ${T.border}`, background: T.card,
              }}>
                Explore Lessons
              </Link>
            </div>
            <p style={{ color: T.muted, fontSize: 13, marginTop: 14 }}>
              Free · No signup required · Results in 15 minutes
            </p>
          </div>

          {/* Right — mock report card */}
          <div style={{ flex: "0 1 320px" }}>
            <div style={{
              background: T.card, border: `1px solid ${T.border}`,
              borderRadius: 16, padding: 26, boxShadow: T.cardShadow,
            }}>
              <div style={{ fontSize: 11, color: T.muted, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>
                Sample Diagnostic Report
              </div>
              <div style={{ marginBottom: 18 }}>
                <div style={{ fontSize: 13, color: T.sub, marginBottom: 4 }}>Predicted Score</div>
                <div style={{ fontSize: 30, fontWeight: 900, color: T.text }}>
                  {activeCurriculum === 0 ? `${scoreCount} – 1240` : curriculum.score.current}
                </div>
                <div style={{ height: 4, background: T.surface, borderRadius: 4, marginTop: 8, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: "68%", background: `linear-gradient(90deg, ${curriculum.color}, ${curriculum.color}99)`, borderRadius: 4, transition: "background 0.3s" }} />
                </div>
              </div>
              <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
                <div style={{ flex: 1, background: T.surface, borderRadius: 10, padding: "10px 12px" }}>
                  <div style={{ fontSize: 11, color: T.muted, marginBottom: 3 }}>Score Ceiling</div>
                  <div style={{ fontSize: 19, fontWeight: 800, color: curriculum.color }}>{curriculum.score.ceiling}</div>
                </div>
                <div style={{ flex: 1, background: T.surface, borderRadius: 10, padding: "10px 12px" }}>
                  <div style={{ fontSize: 11, color: T.muted, marginBottom: 3 }}>Unlockable</div>
                  <div style={{ fontSize: 19, fontWeight: 800, color: T.text }}>{curriculum.score.unlockable}</div>
                </div>
              </div>
              <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 14 }}>
                <div style={{ fontSize: 11, color: T.muted, marginBottom: 8, fontWeight: 700 }}>TOP SCORE SUPPRESSORS</div>
                {[
                  { label: "Carelessness on easy Qs", color: "#ef4444" },
                  { label: "Trap sensitivity in Algebra", color: "#f97316" },
                  { label: "Pacing in final third", color: "#eab308" },
                ].map((s, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: s.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: T.sub }}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <div style={{ background: T.surface, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}`, padding: "20px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 20 }}>
          {[
            { num: "500+", label: "Students helped" },
            { num: "265+", label: "Topics covered" },
            { num: "3", label: "Curricula" },
            { num: "659", label: "Practice questions" },
            { num: "Free", label: "Diagnostic" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 24, fontWeight: 900, color: T.green }}>{s.num}</div>
              <div style={{ fontSize: 13, color: T.sub, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── How It Works ── */}
      <section style={{ padding: "72px 24px", background: T.dark }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: T.text, textAlign: "center", margin: "0 0 48px" }}>
            Your path to a higher score
          </h2>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {[
              { icon: "📊", title: "Diagnose", desc: "12 questions. 15 minutes. Measures speed, confidence, and accuracy — not just right or wrong." },
              { icon: "🤖", title: "Understand", desc: "AI identifies your top score suppressors and maps your exact weak concepts." },
              { icon: "📚", title: "Learn", desc: "Jump straight to the lessons that move your score. SAT, IGCSE, A-Level all covered." },
              { icon: "📈", title: "Improve", desc: "Retake the diagnostic. Watch your weak areas shrink and your score ceiling rise." },
            ].map((step, i) => (
              <div key={i} style={{
                flex: "1 1 200px", background: T.card,
                border: `1px solid ${T.border}`, borderRadius: 14,
                padding: "28px 24px", boxShadow: T.cardShadow,
              }}>
                <div style={{ fontSize: 30, marginBottom: 14 }}>{step.icon}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: T.green, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>
                  Step {i + 1}
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: T.text, margin: "0 0 10px" }}>{step.title}</h3>
                <p style={{ fontSize: 14, color: T.sub, lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Curriculum Cards ── */}
      <section style={{ padding: "72px 24px", background: T.surface }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: T.text, textAlign: "center", margin: "0 0 12px" }}>
            One platform. Every exam.
          </h2>
          <p style={{ textAlign: "center", color: T.sub, fontSize: 16, margin: "0 0 48px" }}>
            Structured lessons, live sessions, and personalised diagnostics — all in one place.
          </p>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {[
              { color: "#6366f1", icon: "🎯", title: "SAT", subtitle: "Math & Verbal", desc: "4 chapters · 13 topics · Adaptive diagnostic · AI report", link: "/diagnostic", cta: "Take SAT Diagnostic" },
              { color: "#1aa38a", icon: "📐", title: "Cambridge IGCSE", subtitle: "0580 Mathematics", desc: "Core & Extended · 265+ topics · Past papers 2018–2024", link: "/igcse/cambridge", cta: "Explore IGCSE" },
              { color: "#f97316", icon: "∂", title: "A-Level Maths", subtitle: "Edexcel", desc: "Pure · Statistics · Mechanics · 40+ topics", link: "/alevel", cta: "Explore A-Level" },
            ].map((c, i) => (
              <div key={i} style={{
                flex: "1 1 260px", background: T.card,
                border: `1px solid ${T.border}`,
                borderTop: `3px solid ${c.color}`,
                borderRadius: 14, padding: "28px 24px",
                boxShadow: T.cardShadow, display: "flex", flexDirection: "column",
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12, marginBottom: 16,
                  background: `${c.color}18`, display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 22, fontWeight: 900, color: c.color,
                }}>{c.icon}</div>
                <div style={{ fontSize: 12, color: T.muted, marginBottom: 4 }}>{c.subtitle}</div>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: T.text, margin: "0 0 8px" }}>{c.title}</h3>
                <p style={{ fontSize: 14, color: T.sub, margin: "0 0 24px", flex: 1, lineHeight: 1.6 }}>{c.desc}</p>
                <Link to={c.link} style={{
                  color: c.color, fontSize: 14, fontWeight: 600,
                  textDecoration: "none", display: "flex", alignItems: "center", gap: 4,
                }}>
                  {c.cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section style={{ padding: "72px 24px", background: T.dark }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: T.text, textAlign: "center", margin: "0 0 12px" }}>
            Real students. Real results.
          </h2>
          <p style={{ textAlign: "center", color: T.sub, fontSize: 16, margin: "0 0 48px" }}>
            From diagnostic to score improvement.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 20 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{
                background: T.card, border: `1px solid ${T.border}`,
                borderRadius: 14, padding: 24, boxShadow: T.cardShadow,
              }}>
                <div style={{ fontSize: 20, color: T.green, marginBottom: 12, letterSpacing: 2 }}>❝</div>
                <p style={{ fontSize: 14, color: T.text, lineHeight: 1.7, margin: "0 0 20px", fontStyle: "italic" }}>
                  "{t.quote}"
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%",
                    background: "linear-gradient(135deg, #1aa38a, #0d8f77)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 700, fontSize: 15, color: "white", flexShrink: 0,
                  }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: T.text }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: T.green, fontWeight: 600 }}>{t.exam} · {t.score}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section style={{ padding: "72px 24px", background: "linear-gradient(135deg, #1aa38a, #0d8f77)" }}>
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: 36, fontWeight: 900, color: "white", margin: "0 0 16px" }}>
            Ready to find your score ceiling?
          </h2>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.85)", margin: "0 0 36px" }}>
            Free diagnostic · AI-powered report · Personalised study plan
          </p>
          <Link to="/diagnostic" style={{
            background: "white", color: "#0d8f77",
            textDecoration: "none", padding: "16px 36px",
            borderRadius: 12, fontSize: 17, fontWeight: 800,
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            display: "inline-block",
          }}>
            Start Free Diagnostic
          </Link>
        </div>
      </section>

      {/* ── Blog Preview ── */}
      <section style={{ padding: "72px 24px", background: T.surface }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 36, flexWrap: "wrap", gap: 12 }}>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: T.text, margin: 0 }}>
              From the ScoreQuanta blog
            </h2>
            <Link to="/blog" style={{ color: T.green, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>
              View all posts →
            </Link>
          </div>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {postsLoading
              ? [0, 1, 2].map(i => (
                <div key={i} style={{ flex: "1 1 280px", background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, height: 200, opacity: 0.4 }} />
              ))
              : posts.map(post => (
                <Link key={post.id} to={`/blog/${post.slug}`} style={{
                  flex: "1 1 280px", background: T.card,
                  border: `1px solid ${T.border}`, borderRadius: 14, padding: 24,
                  boxShadow: T.cardShadow, textDecoration: "none", display: "flex", flexDirection: "column",
                }}>
                  <div style={{
                    display: "inline-block", background: T.greenBg,
                    border: `1px solid ${T.greenBorder}`, borderRadius: 6,
                    padding: "3px 10px", fontSize: 12, color: T.green,
                    fontWeight: 600, marginBottom: 14, alignSelf: "flex-start",
                  }}>
                    {CATEGORY_LABELS[post.category] || post.category}
                  </div>
                  <h3 style={{
                    fontSize: 16, fontWeight: 700, color: T.text, margin: "0 0 10px",
                    display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
                  }}>{post.title}</h3>
                  <p style={{
                    fontSize: 14, color: T.sub, lineHeight: 1.6, margin: "0 0 16px", flex: 1,
                    display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden",
                  }}>{post.excerpt}</p>
                  <div style={{ fontSize: 13, color: T.muted }}>{post.read_time_minutes} min read</div>
                </Link>
              ))
            }
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: "72px 24px", background: T.dark }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: T.text, textAlign: "center", margin: "0 0 12px" }}>
            Frequently asked questions
          </h2>
          <p style={{ textAlign: "center", color: T.sub, fontSize: 16, margin: "0 0 48px" }}>
            Everything you need to know before getting started.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{
                background: T.card, border: `1px solid ${openFaq === i ? T.green : T.border}`,
                borderRadius: 12, overflow: "hidden",
                transition: "border-color 0.15s",
              }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{
                  width: "100%", padding: "18px 20px",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  background: "none", border: "none", cursor: "pointer", textAlign: "left",
                }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: T.text, paddingRight: 16 }}>{faq.q}</span>
                  <span style={{ color: T.green, fontSize: 20, fontWeight: 300, flexShrink: 0, transition: "transform 0.2s", transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: "0 20px 18px" }}>
                    <p style={{ fontSize: 14, color: T.sub, lineHeight: 1.75, margin: 0 }}>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* SEO tools links */}
          <div style={{ marginTop: 48, display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <Link to="/sat-score-percentile" style={{ fontSize: 14, color: T.green, textDecoration: "none", fontWeight: 600 }}>
              SAT Score Percentile Calculator →
            </Link>
            <span style={{ color: T.border }}>·</span>
            <Link to="/what-sat-score-do-i-need" style={{ fontSize: 14, color: T.green, textDecoration: "none", fontWeight: 600 }}>
              What SAT Score Do I Need? →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
