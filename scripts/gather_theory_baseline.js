import { GoogleGenerativeAI } from "@google/generative-ai";
import { satCurriculum } from "../src/data/satCurriculum.js";
import fs from "fs";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env.local") });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const promptTemplate = (topic, subtopic) => `
You are an expert SAT tutor creating high-quality, perfectly structured theory content for a digital learning platform.

Write the baseline theory explanation for the SAT subtopic: "${subtopic}" (which is part of the broader topic: "${topic}").

Requirements:
1. Provide a concise, highly engaging explanation of the core concepts.
2. Use clear headings and bullet points.
3. Include 1 or 2 classic SAT-style example problems with step-by-step solutions.
4. Format math formulas properly using LaTeX enclosed in $ for inline (e.g., $y = mx + b$) and $$ for block equations.
5. Keep the total length around 300-500 words so it fits well on a presentation slide.
6. Output ONLY valid Markdown. Do not include introductory text like "Here is the content:".
`;

async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function gatherTheory() {
  const allTheory = [];
  
  for (const chapter of satCurriculum.chapters) {
    console.log(`Processing Chapter: ${chapter.title}`);
    for (const lesson of chapter.lessons) {
      console.log(`  Processing Lesson: ${lesson.title}`);
      for (const subtopic of lesson.subtopics) {
        console.log(`    Generating content for: ${subtopic}...`);
        
        try {
          const result = await model.generateContent(promptTemplate(lesson.title, subtopic));
          const response = await result.response;
          const text = response.text();
          
          allTheory.push({
            chapter_id: chapter.id,
            lesson_id: lesson.id,
            topic: lesson.title,
            subtopic: subtopic,
            content: text.trim()
          });
          
          console.log(`    ✅ Generated successfully. Wait 3s to avoid rate limits...`);
          await delay(3000); // Respect API rate limits
        } catch (error) {
          console.error(`    ❌ Error generating ${subtopic}:`, error.message);
        }
      }
    }
  }

  const outputPath = path.join(__dirname, "../src/data/theory_baseline.json");
  fs.writeFileSync(outputPath, JSON.stringify(allTheory, null, 2));
  console.log(`\n🎉 Finished! Baseline theory saved to ${outputPath}`);
}

gatherTheory();
