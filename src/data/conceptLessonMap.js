/**
 * Maps ScoreQuanta question concepts → ClassFlow lesson IDs.
 * Used in the diagnostic report to link "weak concept" → "study this lesson".
 */
export const CONCEPT_LESSON_MAP = {
  // SAT Math — Algebra
  "Linear Equations":           { lessonId: "alg_linear_eq",  path: "/sat", label: "Linear Equations" },
  "Linear equation word problems": { lessonId: "alg_linear_eq", path: "/sat", label: "Linear Equations" },
  "Linear relationship word problems": { lessonId: "alg_graphs", path: "/sat", label: "Graphing Linear Equations" },
  "Systems of Equations":       { lessonId: "alg_systems",    path: "/sat", label: "Systems of Equations" },
  "Linear Functions":           { lessonId: "alg_graphs",     path: "/sat", label: "Graphing Linear Equations" },
  "Inequalities":               { lessonId: "alg_linear_eq",  path: "/sat", label: "Linear Equations & Inequalities" },

  // SAT Math — Advanced Math
  "Quadratics":                 { lessonId: "adv_quadratics",  path: "/sat", label: "Quadratics" },
  "Polynomial Expressions":     { lessonId: "adv_polynomials", path: "/sat", label: "Polynomials & Non-linear Graphs" },
  "Functions":                  { lessonId: "adv_polynomials", path: "/sat", label: "Nonlinear Functions" },
  "Absolute Value":             { lessonId: "adv_radicals",    path: "/sat", label: "Radicals & Rationals" },
  "Exponents":                  { lessonId: "adv_exponentials",path: "/sat", label: "Exponentials" },
  "Complex Numbers":            { lessonId: "adv_quadratics",  path: "/sat", label: "Quadratics" },
  "Sequences":                  { lessonId: "adv_exponentials",path: "/sat", label: "Exponentials" },

  // SAT Math — Problem Solving
  "Ratios and Proportions":     { lessonId: "ps_ratios",  path: "/sat", label: "Ratios & Proportions" },
  "Ratios, rates, and proportions": { lessonId: "ps_ratios", path: "/sat", label: "Ratios & Proportions" },
  "Percentages":                { lessonId: "ps_ratios",  path: "/sat", label: "Ratios & Proportions" },
  "Statistics":                 { lessonId: "ps_stats",   path: "/sat", label: "Statistics" },
  "Data Analysis":              { lessonId: "ps_data",    path: "/sat", label: "Data Interpretation" },
  "Unit conversion":            { lessonId: "ps_ratios",  path: "/sat", label: "Ratios & Proportions" },

  // SAT Math — Geometry
  "Geometry":                   { lessonId: "geo_shapes",  path: "/sat", label: "Shapes & Area" },
  "Coordinate Geometry":        { lessonId: "geo_shapes",  path: "/sat", label: "Shapes & Area" },
  "Trigonometry":               { lessonId: "geo_trig",    path: "/sat", label: "Trigonometry" },

  // SAT Verbal
  "Words in Context":           { lessonId: "vc_words",     path: "/sat", label: "Words & Context" },
  "Text Structure and Purpose": { lessonId: "vc_structure",  path: "/sat", label: "Text Structure" },
  "Cross-Text Connections":     { lessonId: "vc_structure",  path: "/sat", label: "Text Structure" },
  "Rhetorical Synthesis":       { lessonId: "ve_ideas",      path: "/sat", label: "Idea Expression" },
  "Transitions":                { lessonId: "ve_ideas",      path: "/sat", label: "Idea Expression" },
  "Boundaries":                 { lessonId: "vcon_boundaries",path: "/sat", label: "Sentence Boundaries" },
  "Form, Structure, and Sense": { lessonId: "vcon_form",     path: "/sat", label: "Form & Sense" },
  "Command of Evidence (Textual)":     { lessonId: "vi_evidence",  path: "/sat", label: "Evidence Command" },
  "Command of Evidence (Quantitative)":{ lessonId: "vi_evidence",  path: "/sat", label: "Evidence Command" },
  "Inferences":                 { lessonId: "vi_inferences", path: "/sat", label: "Inferences & Ideas" },
  "Central Ideas and Details":  { lessonId: "vi_inferences", path: "/sat", label: "Inferences & Ideas" },
};

/** Given a concept name or lesson_hint from the AI report, find the best lesson link. */
export function findLesson(conceptOrHint) {
  if (!conceptOrHint) return null;
  // Direct match
  if (CONCEPT_LESSON_MAP[conceptOrHint]) return CONCEPT_LESSON_MAP[conceptOrHint];
  // Fuzzy match on hint keyword
  const lower = conceptOrHint.toLowerCase();
  const entry = Object.entries(CONCEPT_LESSON_MAP).find(
    ([key]) => key.toLowerCase().includes(lower) || lower.includes(key.toLowerCase())
  );
  return entry ? entry[1] : null;
}
