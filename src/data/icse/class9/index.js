import { CHAPTER_META as numMeta, CHAPTER_TOPICS as numTopics } from "./number";
import { CHAPTER_META as comMeta, CHAPTER_TOPICS as comTopics } from "./commercial";
import { CHAPTER_META as algMeta, CHAPTER_TOPICS as algTopics } from "./algebra";
import { CHAPTER_META as geoMeta, CHAPTER_TOPICS as geoTopics } from "./geometry";
import { CHAPTER_META as menMeta, CHAPTER_TOPICS as menTopics } from "./mensuration";
import { CHAPTER_META as tcMeta, CHAPTER_TOPICS as tcTopics } from "./trigCoord";
import { CHAPTER_META as statMeta, CHAPTER_TOPICS as statTopics } from "./statistics";

export const CLASS9_CHAPTERS = [
  { meta: numMeta, topics: numTopics },
  { meta: comMeta, topics: comTopics },
  { meta: algMeta, topics: algTopics },
  { meta: geoMeta, topics: geoTopics },
  { meta: menMeta, topics: menTopics },
  { meta: tcMeta, topics: tcTopics },
  { meta: statMeta, topics: statTopics },
];
