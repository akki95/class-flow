/**
 * Evaluation question cache — Firestore-backed, localStorage fallback.
 *
 * Flow:
 *   1. Check localStorage (fastest, per-browser)
 *   2. Check Firestore (shared across all users — one API call per topic, ever)
 *   3. Generate with Gemini if not cached anywhere
 *   4. Save to both Firestore and localStorage
 */

import { db } from "../firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { generateEvaluation } from "./generateEvaluation";

const LOCAL_PREFIX = "cf-eval-v1-";
const FIRESTORE_COLLECTION = "evaluations";

// ─── localStorage helpers ──────────────────────────────────────────────────────
function localGet(topicId) {
  try {
    const raw = localStorage.getItem(LOCAL_PREFIX + topicId);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function localSet(topicId, questions) {
  try {
    localStorage.setItem(LOCAL_PREFIX + topicId, JSON.stringify({
      questions,
      cachedAt: Date.now(),
    }));
  } catch {}
}

// ─── Main function ─────────────────────────────────────────────────────────────
/**
 * Gets evaluation questions for a topic.
 * Uses cache hierarchy: localStorage → Firestore → Gemini (last resort).
 */
export async function getEvaluationQuestions(topic) {
  const topicId = topic.id;

  // 1. Check localStorage first (instant, free)
  const local = localGet(topicId);
  if (local?.questions) {
    console.log(`[eval] Local cache hit: ${topicId}`);
    return local.questions;
  }

  // 2. Check Firestore (shared across all users, free read)
  try {
    const ref = doc(db, FIRESTORE_COLLECTION, topicId);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      const data = snap.data();
      console.log(`[eval] Firestore cache hit: ${topicId}`);
      // Save to localStorage for next time
      localSet(topicId, data.questions);
      return data.questions;
    }
  } catch (err) {
    console.warn("[eval] Firestore read failed, falling back to Gemini:", err.message);
  }

  // 3. Generate with Gemini (costs one API call)
  console.log(`[eval] Generating with Gemini: ${topicId}`);
  const questions = await generateEvaluation(topic);

  // 4. Save to Firestore (first-write-wins — safe for concurrent users)
  try {
    const ref = doc(db, FIRESTORE_COLLECTION, topicId);
    await setDoc(ref, {
      topicId,
      topicTitle: topic.title,
      questions,
      generatedAt: serverTimestamp(),
      model: "gemini-2.5-flash-lite",
    });
    console.log(`[eval] Saved to Firestore: ${topicId}`);
  } catch (err) {
    // Non-fatal — still return questions even if save fails
    console.warn("[eval] Firestore save failed:", err.message);
  }

  // 5. Save to localStorage
  localSet(topicId, questions);

  return questions;
}

/**
 * Forces regeneration of questions for a topic (clears cache).
 * Used by admins/teachers to refresh stale questions.
 */
export async function regenerateEvaluation(topic) {
  const topicId = topic.id;

  // Clear local cache
  try { localStorage.removeItem(LOCAL_PREFIX + topicId); } catch {}

  // Generate fresh
  const questions = await generateEvaluation(topic);

  // Overwrite Firestore
  try {
    const ref = doc(db, FIRESTORE_COLLECTION, topicId);
    await setDoc(ref, {
      topicId,
      topicTitle: topic.title,
      questions,
      generatedAt: serverTimestamp(),
      model: "gemini-2.5-flash-lite",
      regenerated: true,
    });
  } catch {}

  localSet(topicId, questions);
  return questions;
}

/**
 * Checks if a topic already has cached questions (without fetching them).
 */
export async function isEvaluationCached(topicId) {
  if (localGet(topicId)) return true;
  try {
    const ref = doc(db, FIRESTORE_COLLECTION, topicId);
    const snap = await getDoc(ref);
    return snap.exists();
  } catch { return false; }
}
