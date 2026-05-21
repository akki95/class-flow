import { CHAPTER_META as numMeta, CHAPTER_TOPICS as numTopics } from "./number";
import { CHAPTER_META as algMeta, CHAPTER_TOPICS as algTopics } from "./algebra";
import { CHAPTER_META as geoMeta, CHAPTER_TOPICS as geoTopics } from "./geometry";
import { CHAPTER_META as statMeta, CHAPTER_TOPICS as statTopics } from "./statistics";
import { CHAPTER_META as setsMeta, CHAPTER_TOPICS as setsTopics } from "./sets";
import { CHAPTER_META as matMeta, CHAPTER_TOPICS as matTopics } from "./matrices";

export const CAMBRIDGE_EXTENDED_CHAPTERS = [
  { meta: numMeta,  topics: numTopics },
  { meta: algMeta,  topics: algTopics },
  { meta: geoMeta,  topics: geoTopics },
  { meta: statMeta, topics: statTopics },
  { meta: setsMeta, topics: setsTopics },
  { meta: matMeta,  topics: matTopics },
];
