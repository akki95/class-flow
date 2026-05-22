import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { supabase } from "../supabase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CATEGORY_LABELS = {
  all: "All",
  "sat-strategy": "SAT Strategy",
  "math-guide": "Math Guide",
  "verbal-guide": "Verbal Guide",
  "score-improvement": "Score Improvement",
  "college-admissions": "College Admissions",
  "parent-guide": "Parent Guide",
  "practice-breakdowns": "Practice Breakdowns",
};

export default function Blog({ user }) {
  const { T } = useTheme();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    supabase
      .from("blog_posts")
      .select("id,title,slug,excerpt,category,read_time_minutes,published_at")
      .eq("published", true)
      .order("published_at", { ascending: false })
      .then(({ data }) => {
        setPosts(data || []);
        setLoading(false);
      });
  }, []);

  const filtered = posts.filter(p => {
    const matchCat = selectedCategory === "all" || p.category === selectedCategory;
    const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div style={{ background: T.dark, minHeight: "100vh", fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
      <Navbar user={user} />

      {/* Header */}
      <div style={{ padding: "56px 24px 40px", maxWidth: 1100, margin: "0 auto" }}>
        <h1 style={{ fontSize: 40, fontWeight: 900, color: T.text, margin: "0 0 12px" }}>
          SAT & IGCSE Prep Blog
        </h1>
        <p style={{ fontSize: 17, color: T.sub, margin: "0 0 36px" }}>
          Strategies, guides and insights to raise your score.
        </p>

        {/* Search */}
        <input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          style={{
            width: "100%", maxWidth: 400,
            padding: "10px 16px", borderRadius: 10,
            border: `1px solid ${T.border}`, background: T.card,
            color: T.text, fontSize: 15, outline: "none",
            marginBottom: 24,
          }}
        />

        {/* Category pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              style={{
                padding: "6px 16px", borderRadius: 20, fontSize: 13, fontWeight: 600,
                cursor: "pointer", border: `1px solid ${selectedCategory === key ? T.green : T.border}`,
                background: selectedCategory === key ? T.green : T.card,
                color: selectedCategory === key ? "white" : T.sub,
                transition: "all 0.15s",
              }}
            >{label}</button>
          ))}
        </div>
      </div>

      {/* Posts grid */}
      <div style={{ padding: "0 24px 72px", maxWidth: 1100, margin: "0 auto" }}>
        {loading ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
            {[...Array(9)].map((_, i) => (
              <div key={i} style={{
                background: T.card, border: `1px solid ${T.border}`,
                borderRadius: 14, height: 220, opacity: 0.5,
              }} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: T.sub }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>📭</div>
            <p>No posts found. Try a different search or category.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
            {filtered.map(post => (
              <Link key={post.id} to={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
                <div style={{
                  background: T.card, border: `1px solid ${T.border}`,
                  borderRadius: 14, padding: 24, boxShadow: T.cardShadow,
                  height: "100%", display: "flex", flexDirection: "column",
                  transition: "box-shadow 0.15s, transform 0.15s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.12)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = T.cardShadow; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <div style={{
                    display: "inline-block", background: T.greenBg,
                    border: `1px solid ${T.greenBorder}`, borderRadius: 6,
                    padding: "3px 10px", fontSize: 12, color: T.green,
                    fontWeight: 600, marginBottom: 14, alignSelf: "flex-start",
                  }}>
                    {CATEGORY_LABELS[post.category] || post.category}
                  </div>
                  <h2 style={{
                    fontSize: 17, fontWeight: 700, color: T.text, margin: "0 0 10px",
                    display: "-webkit-box", WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical", overflow: "hidden",
                  }}>{post.title}</h2>
                  <p style={{
                    fontSize: 14, color: T.sub, lineHeight: 1.65, margin: "0 0 20px", flex: 1,
                    display: "-webkit-box", WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical", overflow: "hidden",
                  }}>{post.excerpt}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 13, color: T.muted }}>{post.read_time_minutes} min read</span>
                    <span style={{ fontSize: 13, color: T.green, fontWeight: 600 }}>Read →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
