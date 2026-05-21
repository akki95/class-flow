import { CHAPTER_META as algMeta, CHAPTER_TOPICS as algTopics } from "./algebraicMethods";
import { CHAPTER_META as binMeta, CHAPTER_TOPICS as binTopics } from "./binomialExpansion";
import { CHAPTER_META as funMeta, CHAPTER_TOPICS as funTopics } from "./functions";
import { CHAPTER_META as trigMeta, CHAPTER_TOPICS as trigTopics } from "./trigonometryY2";
import { CHAPTER_META as diffMeta, CHAPTER_TOPICS as diffTopics } from "./differentiation";
import { CHAPTER_META as intMeta, CHAPTER_TOPICS as intTopics } from "./integration";
import { CHAPTER_META as numMeta, CHAPTER_TOPICS as numTopics } from "./numericalMethods";
import { CHAPTER_META as vecMeta, CHAPTER_TOPICS as vecTopics } from "./vectors3D";
import { CHAPTER_META as parMeta, CHAPTER_TOPICS as parTopics } from "./parametricEquations";

export const ALEVEL_PURE_CHAPTERS = [
  { meta: algMeta, topics: algTopics },
  { meta: binMeta, topics: binTopics },
  { meta: funMeta, topics: funTopics },
  { meta: trigMeta, topics: trigTopics },
  { meta: diffMeta, topics: diffTopics },
  { meta: intMeta,  topics: intTopics },
  { meta: numMeta,  topics: numTopics },
  { meta: vecMeta,  topics: vecTopics },
  { meta: parMeta,  topics: parTopics },
];
