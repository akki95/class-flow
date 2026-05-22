/**
 * reportGenerator.js
 * Calls Gemini to generate a structured SAT diagnostic report from metrics.
 */
import { GoogleGenerativeAI } from '@google/generative-ai';

const PROMPT = (metrics, scores) => `You are an expert SAT diagnostic analyst. Analyse these behavioural metrics from a 12-question SAT diagnostic and generate an actionable report.

Metrics:
${JSON.stringify({ ...metrics, ...scores }, null, 2)}

Return ONLY valid JSON — no markdown, no code fences — matching this exact schema:
{
  "primary_constraint": "one sentence: the single biggest thing holding this student back",
  "secondary_risk": "one sentence: the second most important risk",
  "score_friction": 6.5,
  "friction_description": "2-3 sentences explaining what is causing score friction",
  "metric_interpretations": [
    { "metric": "Accuracy", "score": 65, "benchmark": 75, "interpretation": "short text" },
    { "metric": "Pacing", "score": 70, "benchmark": 80, "interpretation": "short text" },
    { "metric": "Confidence Calibration", "score": 55, "benchmark": 70, "interpretation": "short text" },
    { "metric": "Decision Quality", "score": 80, "benchmark": 75, "interpretation": "short text" },
    { "metric": "Endurance", "score": 60, "benchmark": 70, "interpretation": "short text" },
    { "metric": "Trap Resistance", "score": 50, "benchmark": 65, "interpretation": "short text" }
  ],
  "radar_scores": [65, 70, 55, 80, 60, 50],
  "top_suppressors": [
    {
      "title": "suppressor name",
      "severity": "extreme",
      "data": "specific data point from metrics",
      "impact": "estimated score impact e.g. -60 pts",
      "directive": "concrete action to take this week"
    },
    { "title": "...", "severity": "high", "data": "...", "impact": "...", "directive": "..." },
    { "title": "...", "severity": "moderate", "data": "...", "impact": "...", "directive": "..." }
  ],
  "concept_gaps": [
    { "concept": "concept name", "section": "math", "priority": "high", "action": "specific study action", "lesson_hint": "topic keyword" },
    { "concept": "...", "section": "verbal", "priority": "medium", "action": "...", "lesson_hint": "..." },
    { "concept": "...", "section": "math", "priority": "high", "action": "...", "lesson_hint": "..." },
    { "concept": "...", "section": "verbal", "priority": "medium", "action": "...", "lesson_hint": "..." },
    { "concept": "...", "section": "math", "priority": "low", "action": "...", "lesson_hint": "..." }
  ],
  "weekly_plan": [
    { "week": 1, "focus": "theme", "tasks": ["task 1", "task 2", "task 3"], "goal": "measurable outcome" },
    { "week": 2, "focus": "theme", "tasks": ["task 1", "task 2", "task 3"], "goal": "measurable outcome" },
    { "week": 3, "focus": "theme", "tasks": ["task 1", "task 2", "task 3"], "goal": "measurable outcome" },
    { "week": 4, "focus": "theme", "tasks": ["task 1", "task 2", "task 3"], "goal": "measurable outcome" }
  ]
}`;

export async function generateReport(metrics, scores) {
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
  if (!apiKey) throw new Error('No Gemini API key configured');

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  const result = await model.generateContent(PROMPT(metrics, scores));
  const text = result.response.text() || '';

  const start = text.indexOf('{');
  const end = text.lastIndexOf('}') + 1;
  if (start < 0 || end <= 0) throw new Error('Gemini returned invalid JSON');

  return JSON.parse(text.slice(start, end));
}

/** Fallback report when Gemini fails — generated from raw metrics. */
export function fallbackReport(metrics, scores) {
  const pct = metrics.total_score / 12;
  const level = pct >= 0.75 ? 'Strong' : pct >= 0.5 ? 'Developing' : 'Early Stage';
  return {
    primary_constraint: metrics.carelessness_flag
      ? 'Carelessness on easy questions is suppressing your score'
      : 'Inconsistent pacing is your main score limiter',
    secondary_risk: metrics.decision_volatility === 'self_saboteur'
      ? 'Changing correct answers to wrong ones is costing you points'
      : 'Low confidence calibration leads to unnecessary guessing',
    score_friction: Math.round((1 - pct) * 10 * 10) / 10,
    friction_description: `Your diagnostic shows a ${level} performance profile. Focus on the concept areas where you made errors and build consistent timing habits.`,
    metric_interpretations: [
      { metric: 'Accuracy',               score: Math.round(pct * 100), benchmark: 75, interpretation: `You answered ${metrics.total_score} of 12 correctly.` },
      { metric: 'Pacing',                 score: Math.round(Math.max(0, Math.min(100, 100 - Math.abs(metrics.avg_time_deviation - 1) * 50))), benchmark: 80, interpretation: 'Time deviation from ideal pace.' },
      { metric: 'Confidence Calibration', score: Math.round((1 - metrics.guess_probability) * 100), benchmark: 70, interpretation: 'How well your confidence matches your accuracy.' },
      { metric: 'Decision Quality',       score: metrics.decision_volatility === 'stable' ? 80 : metrics.decision_volatility === 'productive_switcher' ? 70 : 40, benchmark: 75, interpretation: `Decision pattern: ${metrics.decision_volatility}.` },
      { metric: 'Endurance',              score: Math.round((0.5 + metrics.endurance_index / 2) * 100), benchmark: 70, interpretation: 'Accuracy in final third vs first third.' },
      { metric: 'Trap Resistance',        score: Math.round((1 - Math.min(1, Object.values(metrics.trap_sensitivity || {}).reduce((a, b) => a + b, 0) / 6)) * 100), benchmark: 65, interpretation: 'Susceptibility to question traps.' },
    ],
    radar_scores: [
      Math.round(pct * 100),
      Math.round(Math.max(0, Math.min(100, 100 - Math.abs(metrics.avg_time_deviation - 1) * 50))),
      Math.round((1 - metrics.guess_probability) * 100),
      metrics.decision_volatility === 'stable' ? 80 : 50,
      Math.round((0.5 + metrics.endurance_index / 2) * 100),
      60,
    ],
    top_suppressors: [
      { title: 'Concept Gaps', severity: 'high', data: `${12 - metrics.total_score} questions incorrect`, impact: `-${(12 - metrics.total_score) * 20} pts`, directive: 'Focus on your weakest concept first — 30 min daily targeted practice.' },
      { title: metrics.carelessness_flag ? 'Carelessness' : 'Pacing Issues', severity: 'moderate', data: metrics.carelessness_flag ? `${Object.values(metrics.accuracy_by_difficulty || {}).map((v, i) => i === 0 ? Math.round((1-v)*3) : 0).reduce((a,b) => a+b,0)} easy questions missed` : `Avg time deviation: ${metrics.avg_time_deviation?.toFixed(2)}x`, impact: '-40 pts', directive: metrics.carelessness_flag ? 'Slow down on easy questions — reread before answering.' : 'Practise with a timer: 75 seconds per question.' },
      { title: 'Confidence Calibration', severity: 'moderate', data: `Guess probability: ${Math.round(metrics.guess_probability * 100)}%`, impact: '-20 pts', directive: 'Track confidence vs accuracy — only mark Low when you genuinely have no approach.' },
    ],
    concept_gaps: [
      { concept: 'Review incorrect questions', section: 'math',   priority: 'high',   action: 'Identify the concept behind each wrong answer', lesson_hint: 'algebra' },
      { concept: 'Timing consistency',         section: 'math',   priority: 'medium', action: 'Practise 10 questions under timed conditions',    lesson_hint: 'problem solving' },
      { concept: 'Verbal accuracy',            section: 'verbal', priority: 'high',   action: 'Review grammar rules and inference strategies',   lesson_hint: 'transitions' },
      { concept: 'Trap awareness',             section: 'math',   priority: 'medium', action: 'Study common trap types in your weak concepts',   lesson_hint: 'quadratics' },
      { concept: 'Confidence building',        section: 'verbal', priority: 'low',    action: 'Complete 5 untimed verbal questions daily',       lesson_hint: 'words in context' },
    ],
    weekly_plan: [
      { week: 1, focus: 'Foundation',    tasks: ['Complete diagnostic review', 'Study top 2 weak concepts', 'Practise 20 targeted questions'], goal: 'Understand every incorrect answer from diagnostic' },
      { week: 2, focus: 'Skills Build',  tasks: ['Timed practice sets (10 questions)', 'Focus on pacing', 'Review trap types'],               goal: 'Improve timing consistency' },
      { week: 3, focus: 'Integration',   tasks: ['Mixed practice sets', 'Confidence tracking', 'Weak concept review'],                        goal: 'Reduce careless errors by 50%' },
      { week: 4, focus: 'Test Readiness',tasks: ['Full mock diagnostic', 'Review weak areas', 'Strategy refinement'],                         goal: 'Retake diagnostic and measure improvement' },
    ],
  };
}
