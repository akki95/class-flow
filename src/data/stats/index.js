import { CHAPTER_META as dcMeta, CHAPTER_TOPICS as dcTopics } from "./dataCollection";
import { CHAPTER_META as molMeta, CHAPTER_TOPICS as molTopics } from "./measuresOfLocation";
import { CHAPTER_META as rdMeta, CHAPTER_TOPICS as rdTopics } from "./representationsOfData";
import { CHAPTER_META as corrMeta, CHAPTER_TOPICS as corrTopics } from "./correlation";
import { CHAPTER_META as probMeta, CHAPTER_TOPICS as probTopics } from "./probability";
import { CHAPTER_META as sdMeta, CHAPTER_TOPICS as sdTopics } from "./statisticalDistributions";
import { CHAPTER_META as htMeta, CHAPTER_TOPICS as htTopics } from "./hypothesisTesting";

export const STATS_CHAPTERS = [
  { meta: dcMeta,   topics: dcTopics },
  { meta: molMeta,  topics: molTopics },
  { meta: rdMeta,   topics: rdTopics },
  { meta: corrMeta, topics: corrTopics },
  { meta: probMeta, topics: probTopics },
  { meta: sdMeta,   topics: sdTopics },
  { meta: htMeta,   topics: htTopics },
];
