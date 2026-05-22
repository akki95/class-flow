/**
 * Pre-generates evaluation questions for ALL topics across all qualifications.
 * Saves to Firestore so students never wait for Gemini at runtime.
 *
 * SETUP:
 *   1. Ensure scripts/service-account.json exists (Firebase Admin SDK key)
 *   2. Ensure .env.local has GEMINI_API_KEY=...
 *   3. Run: node scripts/preGenerateEvaluations.js
 *
 * Cost: ~186 Gemini API calls × ~$0.0003 each = ~$0.06 total (one-time)
 * After this script: all students get cached questions for free.
 */

require("dotenv").config({ path: ".env.local" });
const admin = require("firebase-admin");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const path = require("path");
const fs = require("fs");

// ─── Init ──────────────────────────────────────────────────────────────────────
const SA_PATH = path.join(__dirname, "service-account.json");
if (!fs.existsSync(SA_PATH)) {
  console.error("❌  scripts/service-account.json not found. See setup instructions.");
  process.exit(1);
}

const GEMINI_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_KEY) {
  console.error("❌  GEMINI_API_KEY not found in .env.local");
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert(require(SA_PATH)),
});
const db = admin.firestore();
const genAI = new GoogleGenerativeAI(GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

// ─── Collect all topics from data files ────────────────────────────────────────
// We import using require() since these are ES modules — we need to use
// a dynamic approach. We'll collect topic metadata from the file structure.

const DATA_DIRS = [
  { path: "src/data/gcse/grade45", label: "GCSE Grade 4-5" },
  { path: "src/data/gcse/grade67", label: "GCSE Grade 6-7" },
  { path: "src/data/gcse/grade89", label: "GCSE Grade 8-9" },
  { path: "src/data/igcse/cambridge/core", label: "Cambridge IGCSE Core" },
  { path: "src/data/igcse/cambridge/extended", label: "Cambridge IGCSE Extended" },
  { path: "src/data/alevel/pure", label: "A-Level Pure Y2" },
  { path: "src/data/alevel/stats", label: "A-Level Stats Y2" },
  { path: "src/data/alevel/mechanics", label: "A-Level Mechanics Y2" },
  { path: "src/data/pureMaths", label: "AS Level Pure" },
  { path: "src/data/stats", label: "AS Level Stats" },
  { path: "src/data/mechanics", label: "AS Level Mechanics" },
];

// Parse topic IDs and basic info from JS files without executing them
function extractTopicInfo(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    const topics = [];

    // Extract all id: "..." from CHAPTER_TOPICS
    const idMatches = content.matchAll(/id:\s*"([^"]+)"/g);
    const titleMatches = content.matchAll(/title:\s*"([^"]+)"/g);
    const subtitleMatches = content.matchAll(/subtitle:\s*"([^"]+)"/g);

    const ids = [...idMatches].map(m => m[1]);
    const titles = [...titleMatches].map(m => m[1]);
    const subtitles = [...subtitleMatches].map(m => m[1]);

    // First id/title/subtitle is CHAPTER_META, rest are topics
    // Skip index 0 (chapter meta), start from 1
    for (let i = 1; i < ids.length; i++) {
      if (ids[i] && titles[i]) {
        topics.push({
          id: ids[i],
          title: titles[i],
          subtitle: subtitles[i] || "",
          // Extract theory snippet for better question generation
          theory: extractTheorySnippet(content, ids[i]),
          formulas: extractFormulas(content, ids[i]),
          example: extractExample(content, ids[i]),
        });
      }
    }
    return topics;
  } catch (e) {
    return [];
  }
}

function extractTheorySnippet(content, topicId) {
  // Find theory for this specific topic - get text after id: "topicId"
  const idx = content.indexOf(`id: "${topicId}"`);
  if (idx === -1) return "";
  const chunk = content.substring(idx, idx + 3000);
  const theoryMatch = chunk.match(/theory:\s*`([^`]{0,600})/);
  if (!theoryMatch) return "";
  return theoryMatch[1].replace(/\*\*/g, "").replace(/\$\$/g, "").replace(/\$/g, "").trim();
}

function extractFormulas(content, topicId) {
  const idx = content.indexOf(`id: "${topicId}"`);
  if (idx === -1) return [];
  const chunk = content.substring(idx, idx + 2000);
  const formulas = [];
  const matches = chunk.matchAll(/label:\s*"([^"]+)",\s*latex:\s*"([^"]+)"/g);
  for (const m of matches) {
    formulas.push({ label: m[1], latex: m[2] });
    if (formulas.length >= 3) break;
  }
  return formulas;
}

function extractExample(content, topicId) {
  const idx = content.indexOf(`id: "${topicId}"`);
  if (idx === -1) return null;
  const chunk = content.substring(idx, idx + 2000);
  const qMatch = chunk.match(/question:\s*"([^"]{0,200})"/);
  return qMatch ? { question: qMatch[1] } : null;
}

// ─── Collect all topics ────────────────────────────────────────────────────────
function getAllTopics() {
  const all = [];
  for (const dir of DATA_DIRS) {
    const fullPath = path.join(process.cwd(), dir.path);
    if (!fs.existsSync(fullPath)) continue;

    const files = fs.readdirSync(fullPath).filter(f => f.endsWith(".js") && f !== "index.js");
    for (const file of files) {
      const topics = extractTopicInfo(path.join(fullPath, file));
      for (const t of topics) {
        all.push({ ...t, _source: `${dir.label} / ${file}` });
      }
    }
  }
  // Also add sequencesAndSeries topics
  const seqPath = path.join(process.cwd(), "src/data/sequencesAndSeries.js");
  if (fs.existsSync(seqPath)) {
    const topics = extractTopicInfo(seqPath);
    for (const t of topics) {
      all.push({ ...t, _source: "AS Level Sequences" });
    }
  }
  return all;
}

// ─── Generate evaluation for a single topic ────────────────────────────────────
async function generateForTopic(topic) {
  const formulaText = topic.formulas?.map(f => `${f.label}: ${f.latex}`).join("\n") || "";

  const prompt = `You are a Maths exam question writer for A-Level and GCSE students.

Topic: ${topic.title}
Subtitle: ${topic.subtitle}

Key theory:
${topic.theory ? topic.theory.substring(0, 500) : ""}

Key formulas:
${formulaText}

Generate 4 evaluation questions. Return ONLY valid JSON (no markdown, no explanation):

{
  "recall": {
    "question": "Short multiple-choice question testing recall of the key formula or concept",
    "options": ["option A", "option B", "option C", "option D"],
    "correct": 0
  },
  "procedure": {
    "question": "Standard calculation with different numbers from any examples above",
    "answer": "Numerical answer with units/notation",
    "hint": "One-line hint — key approach without giving the answer"
  },
  "spotMistake": {
    "intro": "A student attempted this question and made a mistake. Find the error.",
    "questionContext": "Short problem statement",
    "incorrectWorking": "Step 1: correct step\\nStep 2: step with ONE deliberate error\\nStep 3: result following from error",
    "errorLine": "Step 2",
    "correction": "The correct version of Step 2"
  },
  "transfer": {
    "question": "Real-world or novel context question applying the same concept",
    "answer": "Final answer with units",
    "keyInsight": "The one critical step students often miss"
  }
}`;

  const result = await model.generateContent(prompt);
  const text = result.response.text().trim();
  const json = text.replace(/^```json?\n?/, "").replace(/\n?```$/, "").trim();
  return JSON.parse(json);
}

// ─── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log("\n🚀 Pre-generating evaluation questions for all topics...\n");

  const topics = getAllTopics();
  console.log(`Found ${topics.length} topics across all qualifications.\n`);

  // Check which are already cached
  const collection = db.collection("evaluations");
  let cached = 0, generated = 0, failed = 0;
  const DELAY_MS = 1000; // 1 second between calls to avoid rate limiting

  for (let i = 0; i < topics.length; i++) {
    const topic = topics[i];
    const pct = Math.round(((i + 1) / topics.length) * 100);

    process.stdout.write(`  [${pct}%] ${topic.title} (${topic._source}) ... `);

    try {
      // Check if already in Firestore
      const existing = await collection.doc(topic.id).get();
      if (existing.exists) {
        console.log("✓ cached");
        cached++;
        continue;
      }

      // Generate
      const questions = await generateForTopic(topic);

      // Save to Firestore
      await collection.doc(topic.id).set({
        topicId: topic.id,
        topicTitle: topic.title,
        questions,
        generatedAt: admin.firestore.FieldValue.serverTimestamp(),
        model: "gemini-2.5-flash-lite",
      });

      console.log("✅ generated");
      generated++;

      // Rate limit pause
      if (i < topics.length - 1) {
        await new Promise(r => setTimeout(r, DELAY_MS));
      }
    } catch (err) {
      console.log(`❌ failed: ${err.message}`);
      failed++;
    }
  }

  console.log(`\n✅  Done!`);
  console.log(`   Already cached: ${cached}`);
  console.log(`   Newly generated: ${generated}`);
  console.log(`   Failed: ${failed}`);
  console.log(`   Total in Firestore: ${cached + generated}`);

  if (generated > 0) {
    console.log(`\n💡 Estimated cost: $${(generated * 0.0003).toFixed(4)}`);
  }

  process.exit(0);
}

main().catch(err => {
  console.error("\n❌ Fatal error:", err.message);
  process.exit(1);
});
