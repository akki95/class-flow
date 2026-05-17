import { CHAPTER_META as modMeta, CHAPTER_TOPICS as modTopics } from "./modelling";
import { CHAPTER_META as kinMeta, CHAPTER_TOPICS as kinTopics } from "./kinematics";
import { CHAPTER_META as fnMeta, CHAPTER_TOPICS as fnTopics } from "./forcesNewton";
import { CHAPTER_META as vaMeta, CHAPTER_TOPICS as vaTopics } from "./variableAcceleration";

export const MECHANICS_CHAPTERS = [
  { meta: modMeta, topics: modTopics },
  { meta: kinMeta, topics: kinTopics },
  { meta: fnMeta,  topics: fnTopics },
  { meta: vaMeta,  topics: vaTopics },
];
