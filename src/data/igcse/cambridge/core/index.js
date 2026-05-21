import { CHAPTER_META as numMeta, CHAPTER_TOPICS as numTopics } from "./number";
import { CHAPTER_META as algMeta, CHAPTER_TOPICS as algTopics } from "./algebra";
import { CHAPTER_META as geoMeta, CHAPTER_TOPICS as geoTopics } from "./geometry";
import { CHAPTER_META as statMeta, CHAPTER_TOPICS as statTopics } from "./statisticsProbability";

export const CAMBRIDGE_CORE_CHAPTERS = [
  { meta: numMeta,  topics: numTopics },
  { meta: algMeta,  topics: algTopics },
  { meta: geoMeta,  topics: geoTopics },
  { meta: statMeta, topics: statTopics },
];
