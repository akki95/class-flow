import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
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
  "practice-breakdowns": "Practice Breakdowns",
};

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export default function BlogPost({ user }) {
  const { slug } = useParams();
  const { T } = useTheme();
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .single()
      .then(({ data, error }) => {
        if (error || !data) { setNotFound(true); setLoading(false); return; }
        setPost(data);
        setLoading(false);
        // Fetch related
        supabase
          .from("blog_posts")
          .select("id,title,slug,excerpt,category,read_time_minutes")
          .eq("published", true)
          .eq("category", data.category)
          .neq("slug", slug)
          .limit(3)
          .then(({ data: rel }) => setRelated(rel || []));
      });
  }, [slug]);

  if (loading) return (
    <div style={{ background: T.dark, minHeight: "100vh" }}>
      <Navbar user={user} />
      <div style={{ maxWidth: 720, margin: "60px auto", padding: "0 24px" }}>
        {[1, 2, 3].map(i => (
          <div key={i} style={{ background: T.card, borderRadius: 10, height: i === 1 ? 40 : 16, marginBottom: 16, opacity: 0.4 }} />
        ))}
      </div>
    </div>
  );

  if (notFound) return (
    <div style={{ background: T.dark, minHeight: "100vh", fontFamily: "'Inter','Segoe UI',sans-serif" }}>
      <Navbar user={user} />
      <div style={{ maxWidth: 720, margin: "80px auto", padding: "0 24px", textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>📄</div>
        <h1 style={{ color: T.text, marginBottom: 12 }}>Post not found</h1>
        <p style={{ color: T.sub, marginBottom: 24 }}>This post may have been moved or deleted.</p>
        <Link to="/blog" style={{ color: T.green, fontWeight: 600, textDecoration: "none" }}>← Back to Blog</Link>
      </div>
      <Footer />
    </div>
  );

  return (
    <div style={{ background: T.dark, minHeight: "100vh", fontFamily: "'Inter','Segoe UI',sans-serif" }}>
      <Navbar user={user} />

      <article style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px 72px" }}>
        {/* Back */}
        <Link to="/blog" style={{ color: T.sub, textDecoration: "none", fontSize: 14, display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 32 }}>
          ← Back to Blog
        </Link>

        {/* Header */}
        <div style={{ maxWidth: 720 }}>
          <div style={{
            display: "inline-block", background: T.greenBg,
            border: `1px solid ${T.greenBorder}`, borderRadius: 6,
            padding: "3px 10px", fontSize: 12, color: T.green,
            fontWeight: 600, marginBottom: 20,
          }}>
            {CATEGORY_LABELS[post.category] || post.category}
          </div>
          <h1 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 900, color: T.text, lineHeight: 1.2, margin: "0 0 20px" }}>
            {post.title}
          </h1>
          <div style={{ fontSize: 14, color: T.muted, marginBottom: 32, display: "flex", gap: 16, flexWrap: "wrap" }}>
            <span>{post.read_time_minutes} min read</span>
            <span>·</span>
            <span>{formatDate(post.published_at)}</span>
          </div>
          <div style={{ borderBottom: `1px solid ${T.border}`, marginBottom: 40 }} />
        </div>

        {/* Content */}
        <div style={{ display: "flex", gap: 64, alignItems: "flex-start", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 560px", maxWidth: 720 }}>
            <style>{`
              .sq-post-content h2 { font-size: 24px; font-weight: 700; color: ${T.text}; margin: 36px 0 16px; }
              .sq-post-content h3 { font-size: 20px; font-weight: 600; color: ${T.text}; margin: 28px 0 12px; }
              .sq-post-content p  { font-size: 16px; line-height: 1.8; color: ${T.text}; margin-bottom: 18px; }
              .sq-post-content ul, .sq-post-content ol { padding-left: 24px; margin-bottom: 18px; }
              .sq-post-content li { font-size: 16px; line-height: 1.75; color: ${T.text}; margin-bottom: 6px; }
              .sq-post-content strong { font-weight: 700; }
              .sq-post-content a { color: ${T.green}; }
              .sq-post-content table { width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 15px; }
              .sq-post-content th, .sq-post-content td { padding: 10px 14px; border: 1px solid ${T.border}; color: ${T.text}; text-align: left; }
              .sq-post-content th { background: ${T.surface}; font-weight: 700; }
            `}</style>
            <div
              className="sq-post-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* CTA box */}
            <div style={{
              marginTop: 48, background: T.greenBg,
              border: `1px solid ${T.greenBorder}`,
              borderRadius: 14, padding: "28px 24px",
            }}>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: T.text, margin: "0 0 10px" }}>
                Think you know your weak areas?
              </h3>
              <p style={{ fontSize: 15, color: T.sub, margin: "0 0 20px" }}>
                Find out for sure. Take a free 15-minute diagnostic and get an AI-powered report.
              </p>
              <Link to="/diagnostic" style={{
                display: "inline-block",
                background: "linear-gradient(135deg, #1aa38a, #0d8f77)",
                color: "white", textDecoration: "none",
                padding: "12px 24px", borderRadius: 10,
                fontSize: 15, fontWeight: 700,
              }}>
                Take Free Diagnostic →
              </Link>
            </div>
          </div>

          {/* Sticky sidebar on desktop */}
          <div style={{ flex: "0 0 240px", position: "sticky", top: 80, alignSelf: "flex-start" }}>
            <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: 20 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: T.muted, letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 14px" }}>
                Free Diagnostic
              </p>
              <p style={{ fontSize: 14, color: T.sub, lineHeight: 1.6, margin: "0 0 16px" }}>
                15 minutes. AI report. Know your exact score ceiling.
              </p>
              <Link to="/diagnostic" style={{
                display: "block", textAlign: "center",
                background: "linear-gradient(135deg, #1aa38a, #0d8f77)",
                color: "white", textDecoration: "none",
                padding: "10px 0", borderRadius: 8,
                fontSize: 14, fontWeight: 700,
              }}>
                Start Free →
              </Link>
            </div>
          </div>
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <div style={{ marginTop: 72, borderTop: `1px solid ${T.border}`, paddingTop: 48 }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: T.text, margin: "0 0 28px" }}>More from the blog</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
              {related.map(p => (
                <Link key={p.id} to={`/blog/${p.slug}`} style={{ textDecoration: "none" }}>
                  <div style={{
                    background: T.card, border: `1px solid ${T.border}`,
                    borderRadius: 12, padding: 20, boxShadow: T.cardShadow,
                  }}>
                    <div style={{
                      display: "inline-block", background: T.greenBg,
                      border: `1px solid ${T.greenBorder}`, borderRadius: 6,
                      padding: "2px 8px", fontSize: 11, color: T.green,
                      fontWeight: 600, marginBottom: 10,
                    }}>
                      {CATEGORY_LABELS[p.category] || p.category}
                    </div>
                    <h3 style={{
                      fontSize: 15, fontWeight: 700, color: T.text, margin: "0 0 8px",
                      display: "-webkit-box", WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical", overflow: "hidden",
                    }}>{p.title}</h3>
                    <span style={{ fontSize: 13, color: T.green, fontWeight: 600 }}>Read →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

      <Footer />
    </div>
  );
}
