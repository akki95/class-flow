import { CHAPTER_META as normMeta, CHAPTER_TOPICS as normTopics } from "./normalDistribution";
import { CHAPTER_META as regMeta, CHAPTER_TOPICS as regTopics } from "./regressionCorrelation";

export const ALEVEL_STATS_CHAPTERS = [
  { meta: normMeta, topics: normTopics },
  { meta: regMeta,  topics: regTopics },
];
