import { CHAPTER_META as proofMeta, CHAPTER_TOPICS as proofTopics } from "./proof";
import { CHAPTER_META as algebraMeta, CHAPTER_TOPICS as algebraTopics } from "./algebra";
import { CHAPTER_META as coordMeta, CHAPTER_TOPICS as coordTopics } from "./coordinateGeometry";
import { CHAPTER_META as seqMeta, SEQUENCES_TOPICS as seqTopics } from "../sequencesAndSeries";
import { CHAPTER_META as trigMeta, CHAPTER_TOPICS as trigTopics } from "./trigonometry";
import { CHAPTER_META as expMeta, CHAPTER_TOPICS as expTopics } from "./exponentials";
import { CHAPTER_META as diffMeta, CHAPTER_TOPICS as diffTopics } from "./differentiation";
import { CHAPTER_META as intMeta, CHAPTER_TOPICS as intTopics } from "./integration";
import { CHAPTER_META as vecMeta, CHAPTER_TOPICS as vecTopics } from "./vectors";

const TOPIC_COLORS = ["#3ecfaa","#2db898","#34d399","#00b894","#0be5a0","#4ade80"];
const seqTopicsColored = seqTopics.map((t, i) => ({ ...t, color: TOPIC_COLORS[i] }));

export const PURE_CHAPTERS = [
  { meta: proofMeta, topics: proofTopics },
  { meta: algebraMeta, topics: algebraTopics },
  { meta: coordMeta, topics: coordTopics },
  { meta: seqMeta, topics: seqTopicsColored, vizKey: "sequences" },
  { meta: trigMeta, topics: trigTopics },
  { meta: expMeta, topics: expTopics },
  { meta: diffMeta, topics: diffTopics },
  { meta: intMeta, topics: intTopics },
  { meta: vecMeta, topics: vecTopics },
];
