import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

/**
 * Generates a 4-layer evaluation for a given topic using Gemini.
 * Returns an object with: recall, procedure, spotMistake, transfer
 */
export async function generateEvaluation(topic) {
  if (!API_KEY) throw new Error("Gemini API key not configured.");

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

  const formulaText = topic.formulas
    ?.map(f => `${f.label}: ${f.latex}`)
    .join("\n") || "";

  const prompt = `You are a Maths exam question writer for A-Level and GCSE students.

Topic: ${topic.title}
Subtitle: ${topic.subtitle}

Key theory (brief):
${topic.theory ? topic.theory.substring(0, 600).replace(/\*\*/g, "") : ""}

Key formulas:
${formulaText}

Worked example from topic:
Q: ${topic.example?.question || topic.example?.problem || ""}

Generate 4 evaluation questions for this topic. Return ONLY valid JSON (no markdown, no explanation):

{
  "recall": {
    "question": "A short multiple-choice question testing recall of the key formula or concept (not the same as the worked example)",
    "options": ["option A", "option B", "option C", "option D"],
    "correct": 0
  },
  "procedure": {
    "question": "A standard calculation question with different numbers from the worked example",
    "answer": "The numerical answer with correct units/notation",
    "hint": "One-line hint — the key approach to use, without giving the answer"
  },
  "spotMistake": {
    "intro": "A student attempted this question and made a mistake. Find the error.",
    "questionContext": "A short problem statement (different numbers from example)",
    "incorrectWorking": "Step 1: [formula]\\nStep 2: [calculation with ONE deliberate error]\\nStep 3: [result following from error]",
    "errorLine": "Step 2",
    "correction": "The correct version of the wrong step"
  },
  "transfer": {
    "question": "A real-world or novel-context question applying the same concept — different framing from the worked example",
    "answer": "The final answer with units",
    "keyInsight": "The one critical step students often miss"
  }
}`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();
    // Strip markdown code blocks if present
    const json = text.replace(/^```json?\n?/, "").replace(/\n?```$/, "").trim();
    return JSON.parse(json);
  } catch (err) {
    console.error("Gemini evaluation generation failed:", err);
    throw new Error("Could not generate evaluation questions. Please try again.");
  }
}
