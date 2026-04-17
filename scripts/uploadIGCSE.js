const { GoogleGenerativeAI } = require("@google/generative-ai");
const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: ".env.local" });

// ─── CONFIG ───────────────────────────────────────────────────────────────────

const IGCSE_THEORY_DIR = "/Users/akashagrawal/Downloads/igcse/IGCSE AS LEVEL";
const IGCSE_QUESTIONS_DIR = "/Users/akashagrawal/Downloads/igcse/IGCSE AS LEVEL QUESTIONS";
const GEMINI_MODEL = "gemini-2.5-flash-lite";

// ─── INIT GEMINI ──────────────────────────────────────────────────────────────

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

// ─── INIT FIREBASE ADMIN ──────────────────────────────────────────────────────

let db;
try {
  const serviceAccount = require("./serviceAccount.json");
  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
  db = admin.firestore();
  console.log("✅ Firebase Admin initialized");
} catch (e) {
  console.error("❌ Firebase Admin init failed:", e.message);
  process.exit(1);
}

// ─── PDF EXTRACTION ───────────────────────────────────────────────────────────

async function extractTextFromPDF(pdfPath) {
  try {
    const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");
    const buffer = fs.readFileSync(pdfPath);
    const uint8Array = new Uint8Array(buffer);
    const loadingTask = pdfjsLib.getDocument({ data: uint8Array });
    const pdf = await loadingTask.promise;
    let fullText = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items.map(item => item.str).join(" ");
      fullText += pageText + "\n";
    }
    return fullText;
  } catch (e) {
    console.error(`  ❌ Failed to parse PDF: ${pdfPath}`, e.message);
    return null;
  }
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function normalizeChapterName(folderName) {
  return folderName
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "_")
    .trim();
}

function getTopicFromFilename(filename) {
  return filename
    .replace(/\.pdf$/i, "")
    .replace(/[-_]/g, " ")
    .replace(/[a-z0-9]{10,}/gi, "")
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, c => c.toUpperCase());
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ─── GEMINI PROMPTS ───────────────────────────────────────────────────────────

async function extractTheoryFromText(text, topicName, chapterName) {
  const prompt = `
You are extracting structured educational content from an AS Level Maths (Edexcel) theory document.

Topic: "${topicName}"
Chapter: "${chapterName}"

Document text:
${text.slice(0, 12000)}

Extract the content and return ONLY valid JSON (no markdown, no backticks, no explanation) in this exact structure:

{
  "topic": "${topicName}",
  "subtopics": [
    {
      "id": "unique_snake_case_id",
      "type": "theory",
      "title": "Subtopic title from the document",
      "content": "Full theory explanation. Use \\n for line breaks. Use $...$ for inline math and $$...$$ for display equations.",
      "keyPoints": ["key point 1", "key point 2"],
      "formula": "Main formula in LaTeX or null"
    },
    {
      "id": "unique_snake_case_id_ex1",
      "type": "example",
      "title": "Worked Example 1 title",
      "content": "Step by step solution with LaTeX math.",
      "keyPoints": ["tip 1", "tip 2"]
    }
  ]
}

Rules:
- Extract ALL subtopics and worked examples
- Use LaTeX for all math expressions
- Each subtopic gets its own object
- - Worked examples get type "example" — only include if you can extract real step-by-step content
- If a worked example section has no extractable text (image only), skip it entirely
- Never create placeholder text like "This section contains a worked example", theory sections get type "theory"
- IDs must be unique snake_case strings
- Return ONLY the JSON object, nothing else
`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    const cleaned = response.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    return JSON.parse(cleaned);
  } catch (e) {
    console.error(`  ❌ Gemini extraction failed for ${topicName}:`, e.message);
    return null;
  }
}

async function extractQuestionsFromText(text, topicName, chapterName) {
  const prompt = `
You are extracting exam questions from an AS Level Maths (Edexcel) question bank.

Topic: "${topicName}"
Chapter: "${chapterName}"

Document text:
${text.slice(0, 15000)}

Extract ALL questions and return ONLY valid JSON (no markdown, no backticks, no explanation):

{
  "topic": "${topicName}",
  "questions": [
    {
      "id": "unique_snake_case_id",
      "type": "written",
      "difficulty": "easy",
      "marks": 3,
      "topic": "${topicName}",
      "question": "Full question text with LaTeX math between $ signs.",
      "parts": [
        { "part": "a", "question": "Part a question", "marks": 2 }
      ],
      "answer": "Model answer or null",
      "timeLimit": 180
    }
  ]
}

Rules:
- difficulty must be: "easy", "medium", "hard", or "very_hard"
- type is always "written"
- timeLimit in seconds: easy=120, medium=180, hard=240, very_hard=360
- parts array only for multi-part questions, otherwise omit it
- Return ONLY the JSON object, nothing else
`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    const cleaned = response.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    return JSON.parse(cleaned);
  } catch (e) {
    console.error(`  ❌ Gemini extraction failed for ${topicName}:`, e.message);
    return null;
  }
}

// ─── MAIN UPLOAD LOGIC ────────────────────────────────────────────────────────

async function processTheoryChapter(chapterPath, chapterName) {
  const chapterId = normalizeChapterName(chapterName);
  console.log(`\n📚 Processing theory chapter: ${chapterName} (${chapterId})`);

  const files = fs.readdirSync(chapterPath).filter(f => f.endsWith(".pdf"));
  const allTopics = [];

  for (const file of files) {
    const topicName = getTopicFromFilename(file);
    console.log(`  📄 Extracting: ${topicName}`);

    const pdfPath = path.join(chapterPath, file);
    const text = await extractTextFromPDF(pdfPath);
    if (!text) continue;

    const extracted = await extractTheoryFromText(text, topicName, chapterName);
    if (!extracted || !extracted.subtopics) {
      console.log(`  ⚠️  No subtopics extracted for ${topicName}`);
      continue;
    }

    allTopics.push({ topicName, subtopics: extracted.subtopics });
    console.log(`  ✅ Extracted ${extracted.subtopics.length} subtopics`);
    await sleep(1000);
  }

  if (allTopics.length > 0) {
    await db.collection("curricula").doc("igcse").collection("chapters").doc(chapterId).set({
      id: chapterId,
      title: chapterName.charAt(0).toUpperCase() + chapterName.slice(1).toLowerCase(),
      curriculum: "igcse",
      topics: allTopics,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    console.log(`  🔥 Uploaded theory for ${chapterName} to Firestore`);
  }

  return chapterId;
}

async function processQuestionsChapter(chapterPath, chapterName, chapterId) {
  console.log(`\n❓ Processing questions for: ${chapterName}`);

  const files = fs.readdirSync(chapterPath).filter(f => f.endsWith(".pdf"));
  const allQuestions = [];

  for (const file of files) {
    const topicName = getTopicFromFilename(file);
    console.log(`  📄 Extracting questions: ${topicName}`);

    const pdfPath = path.join(chapterPath, file);
    const text = await extractTextFromPDF(pdfPath);
    if (!text) continue;

    const extracted = await extractQuestionsFromText(text, topicName, chapterName);
    if (!extracted || !extracted.questions) {
      console.log(`  ⚠️  No questions extracted for ${topicName}`);
      continue;
    }

    allQuestions.push(...extracted.questions);
    console.log(`  ✅ Extracted ${extracted.questions.length} questions`);
    await sleep(1000);
  }

  if (allQuestions.length > 0) {
    await db.collection("curricula").doc("igcse").collection("chapters").doc(chapterId)
      .collection("questions").doc("all").set({
        questions: allQuestions,
        total: allQuestions.length,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
    console.log(`  🔥 Uploaded ${allQuestions.length} questions for ${chapterName}`);
  }
}

async function main() {
  console.log("🚀 ClassFlow IGCSE Content Upload Script");
  console.log("=========================================\n");

  const theoryChapters = fs.readdirSync(IGCSE_THEORY_DIR)
    .filter(f => fs.statSync(path.join(IGCSE_THEORY_DIR, f)).isDirectory());

  const questionChapters = fs.readdirSync(IGCSE_QUESTIONS_DIR)
    .filter(f => fs.statSync(path.join(IGCSE_QUESTIONS_DIR, f)).isDirectory());

  console.log(`Found ${theoryChapters.length} theory chapters: ${theoryChapters.join(", ")}`);
  console.log(`Found ${questionChapters.length} question chapters: ${questionChapters.join(", ")}\n`);

  for (const chapterName of theoryChapters) {
    const theoryPath = path.join(IGCSE_THEORY_DIR, chapterName);
    const chapterId = await processTheoryChapter(theoryPath, chapterName);

    const matchingQFolder = questionChapters.find(q =>
      normalizeChapterName(q) === normalizeChapterName(chapterName) ||
      normalizeChapterName(q).includes(normalizeChapterName(chapterName).slice(0, 5))
    );

    if (matchingQFolder) {
      const questionsPath = path.join(IGCSE_QUESTIONS_DIR, matchingQFolder);
      await processQuestionsChapter(questionsPath, chapterName, chapterId);
    } else {
      console.log(`  ⚠️  No matching question folder for ${chapterName}`);
    }

    await sleep(2000);
  }

  console.log("\n✅ Upload complete!");
  console.log("Check Firestore: curricula → igcse → chapters");
  process.exit(0);
}

main().catch(console.error);