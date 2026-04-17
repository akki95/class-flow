const { GoogleGenerativeAI } = require("@google/generative-ai");
const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: ".env.local" });

const GEMINI_MODEL = "gemini-2.5-flash-lite";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

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

// Failed files to retry
const FAILED_THEORY = [
  { chapter: "DERIVATIVES", chapterId: "derivatives", file: "Derivatives basics.pdf" },
  { chapter: "Differentiation", chapterId: "differentiation", file: "Application of derivatives.pdf" },
  { chapter: "Differentiation", chapterId: "differentiation", file: "derivatives.pdf" },
  { chapter: "STATISTICS", chapterId: "statistics", file: "binomial.pdf" },
  { chapter: "VECTORS", chapterId: "vectors", file: "Vectors basic.pdf" },
  { chapter: "algebra and functions", chapterId: "algebra_and_functions", file: "inequalities.pdf" },
  { chapter: "algebra and functions", chapterId: "algebra_and_functions", file: "polynomials.pdf" },
  { chapter: "algebra and functions", chapterId: "algebra_and_functions", file: "quadratic.pdf" },
  { chapter: "mechanics", chapterId: "mechanics", file: "variable accln in 1D.pdf" },
];

const FAILED_QUESTIONS = [
  { chapter: "Differentiation", chapterId: "differentiation", file: "applications-BgT66BHh4tyHnFpD.pdf" },
];

const THEORY_BASE = "/Users/akashagrawal/Downloads/igcse/IGCSE AS LEVEL";
const QUESTIONS_BASE = "/Users/akashagrawal/Downloads/igcse/IGCSE AS LEVEL QUESTIONS";

const CHAPTER_TO_QFOLDER = {
  "DERIVATIVES": null,
  "Differentiation": "differentiation",
  "STATISTICS": "statistics",
  "VECTORS": "vectors",
  "algebra and functions": "algebra anf functions",
  "mechanics": null,
};

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
      fullText += content.items.map(item => item.str).join(" ") + "\n";
    }
    return fullText;
  } catch (e) {
    console.error(`  ❌ PDF parse failed: ${pdfPath}`, e.message);
    return null;
  }
}

function safeJsonParse(text) {
  let cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
  
  // Extract just the JSON object
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start === -1 || end === -1) throw new Error("No JSON object found");
  cleaned = cleaned.slice(start, end + 1);

  // Fix bad escape sequences character by character
  let result = '';
  let i = 0;
  let inString = false;
  while (i < cleaned.length) {
    const char = cleaned[i];
    if (char === '"' && (i === 0 || cleaned[i-1] !== '\\')) {
      inString = !inString;
      result += char;
      i++;
    } else if (inString && char === '\\') {
      const next = cleaned[i+1];
      // Valid JSON escape sequences
      if (['"', '\\', '/', 'b', 'f', 'n', 'r', 't', 'u'].includes(next)) {
        result += char + next;
        i += 2;
      } else {
        // Invalid escape — double the backslash to make it valid
        result += '\\\\';
        i++;
      }
    } else {
      result += char;
      i++;
    }
  }

  return JSON.parse(result);
}

async function geminiExtractTheory(text, topicName, chapterName) {
  const prompt = `Extract structured content from this AS Level Maths theory document.

Topic: "${topicName}", Chapter: "${chapterName}"

Text:
${text.slice(0, 10000)}

Return ONLY a valid JSON object. No markdown. No code fences. No explanation.
Use double backslash for LaTeX commands (e.g. \\\\frac, \\\\sin, \\\\theta).
Never use single backslash before letters in strings.

Format:
{"topic":"${topicName}","subtopics":[{"id":"snake_case_id","type":"theory","title":"Title","content":"Content with math like $\\\\frac{a}{b}$","keyPoints":["point 1"],"formula":"LaTeX or null"},{"id":"example_1","type":"example","title":"Example title","content":"Step by step solution","keyPoints":["tip"]}]}`;

  const result = await model.generateContent(prompt);
  const text2 = result.response.text();
  return safeJsonParse(text2);
}

async function geminiExtractQuestions(text, topicName, chapterName) {
  const prompt = `Extract exam questions from this AS Level Maths question bank.

Topic: "${topicName}", Chapter: "${chapterName}"

Text:
${text.slice(0, 12000)}

Return ONLY a valid JSON object. No markdown. No code fences. No explanation.
Use double backslash for LaTeX commands (e.g. \\\\frac, \\\\sin).
Never use single backslash before letters in strings.

Format:
{"topic":"${topicName}","questions":[{"id":"q_1","type":"written","difficulty":"easy","marks":3,"topic":"${topicName}","question":"Question with $\\\\frac{a}{b}$ math","parts":[{"part":"a","question":"part a","marks":2}],"answer":null,"timeLimit":180}]}

difficulty must be: easy, medium, hard, or very_hard
Omit parts array if question is not multi-part.`;

  const result = await model.generateContent(prompt);
  const text2 = result.response.text();
  return safeJsonParse(text2);
}

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function retryTheory() {
  console.log("\n📚 Retrying failed THEORY extractions...\n");

  // Group by chapterId so we can merge into existing Firestore doc
  const byChapter = {};
  for (const item of FAILED_THEORY) {
    if (!byChapter[item.chapterId]) byChapter[item.chapterId] = { chapter: item.chapter, files: [] };
    byChapter[item.chapterId].files.push(item.file);
  }

  for (const [chapterId, { chapter, files }] of Object.entries(byChapter)) {
    console.log(`\n📖 Chapter: ${chapter}`);
    const newTopics = [];

    for (const file of files) {
      const pdfPath = path.join(THEORY_BASE, chapter, file);
      if (!fs.existsSync(pdfPath)) {
        console.log(`  ⚠️  File not found: ${pdfPath}`);
        continue;
      }

      const topicName = file.replace(/\.pdf$/i, "").replace(/[-_]/g, " ").trim();
      console.log(`  📄 Retrying: ${topicName}`);

      const text = await extractTextFromPDF(pdfPath);
      if (!text) continue;

      try {
        const extracted = await geminiExtractTheory(text, topicName, chapter);
        if (extracted?.subtopics?.length) {
          newTopics.push({ topicName, subtopics: extracted.subtopics });
          console.log(`  ✅ Extracted ${extracted.subtopics.length} subtopics`);
        } else {
          console.log(`  ⚠️  No subtopics found`);
        }
      } catch (e) {
        console.error(`  ❌ Failed: ${e.message}`);
      }
      await sleep(1000);
    }

    if (newTopics.length > 0) {
      // Merge with existing topics in Firestore
      const docRef = db.collection("curricula").doc("igcse").collection("chapters").doc(chapterId);
      const existing = await docRef.get();
      const existingTopics = existing.exists ? (existing.data().topics || []) : [];
      const merged = [...existingTopics, ...newTopics];
      await docRef.set({ topics: merged, updatedAt: admin.firestore.FieldValue.serverTimestamp() }, { merge: true });
      console.log(`  🔥 Merged ${newTopics.length} new topics into ${chapterId}`);
    }
  }
}

async function retryQuestions() {
  console.log("\n❓ Retrying failed QUESTION extractions...\n");

  const byChapter = {};
  for (const item of FAILED_QUESTIONS) {
    if (!byChapter[item.chapterId]) byChapter[item.chapterId] = { chapter: item.chapter, files: [] };
    byChapter[item.chapterId].files.push(item.file);
  }

  for (const [chapterId, { chapter, files }] of Object.entries(byChapter)) {
    console.log(`\n❓ Chapter: ${chapter}`);
    const newQuestions = [];
    const qFolder = CHAPTER_TO_QFOLDER[chapter] || chapter.toLowerCase();

    for (const file of files) {
      const pdfPath = path.join(QUESTIONS_BASE, qFolder, file);
      if (!fs.existsSync(pdfPath)) {
        console.log(`  ⚠️  File not found: ${pdfPath}`);
        continue;
      }

      const topicName = file.replace(/\.pdf$/i, "").replace(/[-_]/g, " ").replace(/[a-z0-9]{8,}/gi, "").trim();
      console.log(`  📄 Retrying: ${topicName || file}`);

      const text = await extractTextFromPDF(pdfPath);
      if (!text) continue;

      try {
        const extracted = await geminiExtractQuestions(text, topicName || chapter, chapter);
        if (extracted?.questions?.length) {
          newQuestions.push(...extracted.questions);
          console.log(`  ✅ Extracted ${extracted.questions.length} questions`);
        } else {
          console.log(`  ⚠️  No questions found`);
        }
      } catch (e) {
        console.error(`  ❌ Failed: ${e.message}`);
      }
      await sleep(1000);
    }

    if (newQuestions.length > 0) {
      const docRef = db.collection("curricula").doc("igcse").collection("chapters").doc(chapterId)
        .collection("questions").doc("all");
      const existing = await docRef.get();
      const existingQs = existing.exists ? (existing.data().questions || []) : [];
      const merged = [...existingQs, ...newQuestions];
      await docRef.set({
        questions: merged,
        total: merged.length,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      console.log(`  🔥 Merged ${newQuestions.length} new questions into ${chapterId}`);
    }
  }
}

async function main() {
  console.log("🔄 ClassFlow — Retry Failed Extractions");
  console.log("=========================================");
  await retryTheory();
  await retryQuestions();
  console.log("\n✅ Retry complete!");
  process.exit(0);
}

main().catch(console.error);