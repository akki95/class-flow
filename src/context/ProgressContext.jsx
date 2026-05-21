import { createContext, useContext, useState, useCallback } from "react";

const STORAGE_KEY = "cf-progress-v1";

// ─── Default state ─────────────────────────────────────────────────────────────
const defaultState = () => ({
  version: "1",
  // { topicId: { completedAt: timestamp, confidence: 1-5 } }
  completedTopics: {},
  // { topicId: { recall, procedure, understanding, transfer } } — Phase 2
  topicLayers: {},
  // { topicId: timestamp } — for spaced repetition
  lastVisited: {},
  // diagnostic results — Phase 3
  diagnostic: null,
  // learning path — Phase 4
  learningPath: null,
});

const load = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...defaultState(), ...JSON.parse(raw) } : defaultState();
  } catch {
    return defaultState();
  }
};

// ─── Context ───────────────────────────────────────────────────────────────────
const ProgressContext = createContext(null);

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(load);

  const persist = useCallback((next) => {
    setProgress(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
  }, []);

  // ── Topic completion ─────────────────────────────────────────────────────────
  const markTopicComplete = useCallback((topicId) => {
    setProgress(prev => {
      const next = {
        ...prev,
        completedTopics: {
          ...prev.completedTopics,
          [topicId]: { completedAt: Date.now() },
        },
      };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const unmarkTopicComplete = useCallback((topicId) => {
    setProgress(prev => {
      const completedTopics = { ...prev.completedTopics };
      delete completedTopics[topicId];
      const next = { ...prev, completedTopics };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const isTopicComplete = useCallback((topicId) => {
    return !!progress.completedTopics[topicId];
  }, [progress.completedTopics]);

  // Returns a Set of completed topic IDs — same API as the old useState Set
  const getCompletedSet = useCallback(() => {
    return new Set(Object.keys(progress.completedTopics));
  }, [progress.completedTopics]);

  // ── Layer tracking (Phase 2 — 4-layer evaluation) ───────────────────────────
  const markLayerPassed = useCallback((topicId, layer) => {
    setProgress(prev => {
      const existing = prev.topicLayers[topicId] || {};
      const next = {
        ...prev,
        topicLayers: {
          ...prev.topicLayers,
          [topicId]: {
            ...existing,
            [layer]: { passed: true, date: Date.now() },
          },
        },
      };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const getTopicLayers = useCallback((topicId) => {
    return progress.topicLayers[topicId] || {};
  }, [progress.topicLayers]);

  const getTopicMastery = useCallback((topicId) => {
    const layers = progress.topicLayers[topicId] || {};
    const LAYERS = ["recall", "procedure", "spotMistake", "transfer"];
    const passed = LAYERS.filter(l => layers[l]?.passed).length;
    return { passed, total: LAYERS.length, pct: Math.round((passed / LAYERS.length) * 100) };
  }, [progress.topicLayers]);

  // ── Visit tracking ───────────────────────────────────────────────────────────
  const markVisited = useCallback((topicId) => {
    setProgress(prev => {
      const next = {
        ...prev,
        lastVisited: { ...prev.lastVisited, [topicId]: Date.now() },
      };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const daysSinceVisit = useCallback((topicId) => {
    const ts = progress.lastVisited[topicId];
    if (!ts) return null;
    return Math.floor((Date.now() - ts) / (1000 * 60 * 60 * 24));
  }, [progress.lastVisited]);

  // ── Stats helpers ────────────────────────────────────────────────────────────
  const totalCompleted = Object.keys(progress.completedTopics).length;

  const chapterProgress = useCallback((topics) => {
    const done = topics.filter(t => !!progress.completedTopics[t.id]).length;
    return { done, total: topics.length, pct: topics.length ? Math.round((done / topics.length) * 100) : 0 };
  }, [progress.completedTopics]);

  // ── Reset ────────────────────────────────────────────────────────────────────
  const resetAll = useCallback(() => {
    const fresh = defaultState();
    persist(fresh);
  }, [persist]);

  return (
    <ProgressContext.Provider value={{
      progress,
      // completion
      markTopicComplete,
      unmarkTopicComplete,
      isTopicComplete,
      getCompletedSet,
      // layers (Phase 2)
      markLayerPassed,
      getTopicLayers,
      getTopicMastery,
      // visits
      markVisited,
      daysSinceVisit,
      // stats
      totalCompleted,
      chapterProgress,
      // reset
      resetAll,
    }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}
