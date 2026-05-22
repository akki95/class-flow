import { CHAPTER_META as algMeta, CHAPTER_TOPICS as algTopics } from "./algebra";
import { CHAPTER_META as advMeta, CHAPTER_TOPICS as advTopics } from "./advancedMath";
import { CHAPTER_META as psMeta,  CHAPTER_TOPICS as psTopics  } from "./problemSolving";
import { CHAPTER_META as geoMeta, CHAPTER_TOPICS as geoTopics } from "./geometry";

export const SAT_CHAPTERS = [
  { meta: algMeta, topics: algTopics },
  { meta: advMeta, topics: advTopics },
  { meta: psMeta,  topics: psTopics  },
  { meta: geoMeta, topics: geoTopics },
];
