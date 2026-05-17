import { createContext, useContext, useState } from "react";

// ─── Palette definitions ───────────────────────────────────────────────────────

export const LIGHT = {
  // Accent
  green:       "#1aa38a",
  green2:      "#0d8f77",
  greenBg:     "rgba(26,163,138,0.08)",
  greenBorder: "rgba(26,163,138,0.22)",

  // Surfaces (layered — each step slightly warmer/darker)
  dark:        "#f7f4ef",   // page background — warm cream
  card:        "#ffffff",   // cards
  surface:     "#f4f0eb",   // elevated within cards
  equation:    "#eceadf",   // equation boxes — warmer than surface

  // Borders
  border:    "rgba(0,0,0,0.08)",
  borderMid: "rgba(0,0,0,0.13)",

  // Text
  text:  "#1c2b3a",   // primary
  label: "#374151",   // step labels / instructional
  sub:   "#6b7280",   // secondary
  muted: "#9ca3af",   // truly dim

  // KaTeX override
  katexColor: "#1c2b3a",

  // Shadows
  cardShadow: "0 2px 12px rgba(0,0,0,0.06)",
  pageShadow: "0 24px 64px rgba(0,0,0,0.07)",
};

export const DARK = {
  // Accent
  green:       "#3ecfaa",
  green2:      "#2db898",
  greenBg:     "rgba(62,207,170,0.06)",
  greenBorder: "rgba(62,207,170,0.18)",

  // Surfaces
  dark:        "#07101e",
  card:        "#0c1829",
  surface:     "#111f38",
  equation:    "#172a44",

  // Borders
  border:    "rgba(255,255,255,0.07)",
  borderMid: "rgba(255,255,255,0.11)",

  // Text
  text:  "#ddeeff",
  label: "#b0c8e0",
  sub:   "#7a9ab8",
  muted: "#4a6278",

  // KaTeX override
  katexColor: "#ddeeff",

  // Shadows
  cardShadow: "0 2px 12px rgba(0,0,0,0.3)",
  pageShadow: "0 24px 64px rgba(0,0,0,0.4)",
};

// ─── Context ───────────────────────────────────────────────────────────────────
const ThemeContext = createContext({ T: LIGHT, isDark: false, toggle: () => {} });

const THEME_KEY = "cf-theme-v2"; // bumped key → fresh light default for all users

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem(THEME_KEY) === "dark"
  );

  const toggle = () => {
    setIsDark(prev => {
      const next = !prev;
      localStorage.setItem(THEME_KEY, next ? "dark" : "light");
      return next;
    });
  };

  const T = isDark ? DARK : LIGHT;

  // Inject KaTeX colour globally
  let styleEl = document.getElementById("cf-katex-style");
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = "cf-katex-style";
    document.head.appendChild(styleEl);
  }
  styleEl.textContent = `.katex, .katex-display { color: ${T.katexColor} !important; } .katex-display { margin: 0 !important; }`;

  return (
    <ThemeContext.Provider value={{ T, isDark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

// ─── Toggle button (reused across all pages) ──────────────────────────────────
export function ThemeToggle({ style = {} }) {
  const { isDark, toggle } = useTheme();
  return (
    <button onClick={toggle} title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        background: "transparent",
        border: "1px solid",
        borderColor: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)",
        borderRadius: 8,
        padding: "5px 10px",
        cursor: "pointer",
        fontSize: 16,
        lineHeight: 1,
        ...style,
      }}>
      {isDark ? "☀️" : "🌙"}
    </button>
  );
}
