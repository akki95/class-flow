import { CHAPTER_META as normMeta, CHAPTER_TOPICS as normTopics } from "./normalDistribution";
import { CHAPTER_META as regMeta, CHAPTER_TOPICS as regTopics } from "./regressionCorrelation";
import { CHAPTER_META as condMeta, CHAPTER_TOPICS as condTopics } from "./conditionalProbability";

export const ALEVEL_STATS_CHAPTERS = [
  { meta: normMeta, topics: normTopics },
  { meta: regMeta,  topics: regTopics },
  { meta: condMeta, topics: condTopics },
];
