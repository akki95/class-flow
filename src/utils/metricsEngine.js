/**
 * metricsEngine.js
 * Ported from ScoreQuanta's Python compute_metrics()
 * Computes 12 behavioural metrics from diagnostic responses + questions.
 */

export function computeMetrics(responses, questions) {
  const qMap = {};
  questions.forEach(q => { qMap[q.id] = q; });

  const total = responses.length;
  if (total === 0) return null;

  // ── Accuracy by difficulty ─────────────────────────────────────────────
  const byDiff = { easy: [], medium: [], hard: [] };
  responses.forEach(r => {
    const q = qMap[r.question_id];
    if (q?.difficulty) byDiff[q.difficulty]?.push(r.correct ? 1 : 0);
  });
  const accuracyByDifficulty = {};
  ['easy', 'medium', 'hard'].forEach(d => {
    const s = byDiff[d];
    accuracyByDifficulty[d] = s.length ? s.reduce((a, b) => a + b, 0) / s.length : 0;
  });

  // ── Scores ────────────────────────────────────────────────────────────
  const totalScore = responses.filter(r => r.correct).length;
  const mathR = responses.filter(r => qMap[r.question_id]?.section === 'math');
  const verbalR = responses.filter(r => qMap[r.question_id]?.section === 'verbal');
  const mathScore = mathR.filter(r => r.correct).length;
  const verbalScore = verbalR.filter(r => r.correct).length;

  // ── Carelessness flag ─────────────────────────────────────────────────
  const easyWrong = responses.filter(r => !r.correct && qMap[r.question_id]?.difficulty === 'easy').length;
  const hardRight = responses.filter(r => r.correct && qMap[r.question_id]?.difficulty === 'hard').length;
  const carelessnessFlag = easyWrong >= 2 && hardRight >= 1;

  // ── Time deviation ────────────────────────────────────────────────────
  const timeDevs = responses
    .filter(r => qMap[r.question_id]?.ideal_time_seconds > 0 && r.time_taken_seconds > 0)
    .map(r => r.time_taken_seconds / qMap[r.question_id].ideal_time_seconds);
  const avgTimeDeviation = timeDevs.length
    ? timeDevs.reduce((a, b) => a + b, 0) / timeDevs.length
    : 1.0;

  // ── Decision volatility ───────────────────────────────────────────────
  const changed = responses.filter(r => r.answer_changed);
  const rightToWrong = changed.filter(r => r.change_direction === 'right_to_wrong').length;
  const wrongToRight = changed.filter(r => r.change_direction === 'wrong_to_right').length;
  let decisionVolatility;
  if (changed.length === 0) decisionVolatility = 'stable';
  else if (wrongToRight > rightToWrong) decisionVolatility = 'productive_switcher';
  else decisionVolatility = 'self_saboteur';

  // ── Momentum curve ────────────────────────────────────────────────────
  const third = Math.floor(total / 3);
  const parts = [
    responses.slice(0, third),
    responses.slice(third, 2 * third),
    responses.slice(2 * third),
  ];
  const acc = rs => rs.length ? rs.filter(r => r.correct).length / rs.length : 0;
  const momentumCurve = {
    first_third: acc(parts[0]),
    middle_third: acc(parts[1]),
    final_third: acc(parts[2]),
  };

  // ── Endurance index ───────────────────────────────────────────────────
  const enduranceIndex = acc(parts[2]) - acc(parts[0]);

  // ── Guess probability ─────────────────────────────────────────────────
  const guessCount = responses.filter(
    r => r.confidence_level === 'low' && r.time_taken_seconds < 30 && !r.correct
  ).length;
  const guessProbability = total ? guessCount / total : 0;

  // ── Trap sensitivity ──────────────────────────────────────────────────
  const trapSensitivity = {};
  responses.forEach(r => {
    const q = qMap[r.question_id];
    if (!r.correct && q?.trap_type) {
      trapSensitivity[q.trap_type] = (trapSensitivity[q.trap_type] || 0) + 1;
    }
  });

  // ── Cognitive start speed ─────────────────────────────────────────────
  const startDelays = responses
    .filter(r => r.start_delay_seconds != null)
    .map(r => r.start_delay_seconds);
  const cognitiveStartSpeed = startDelays.length
    ? startDelays.reduce((a, b) => a + b, 0) / startDelays.length
    : 0;

  // ── Efficiency projection (secs to complete full 44-q SAT) ────────────
  const totalTime = responses
    .filter(r => r.time_taken_seconds > 0)
    .reduce((s, r) => s + r.time_taken_seconds, 0);
  const avgTime = total ? totalTime / total : 60;
  const efficiencyProjection = Math.round(avgTime * 44);

  return {
    total_score: totalScore,
    math_score: mathScore,
    verbal_score: verbalScore,
    accuracy_by_difficulty: accuracyByDifficulty,
    carelessness_flag: carelessnessFlag,
    avg_time_deviation: avgTimeDeviation,
    decision_volatility: decisionVolatility,
    momentum_curve: momentumCurve,
    endurance_index: enduranceIndex,
    guess_probability: guessProbability,
    trap_sensitivity: trapSensitivity,
    cognitive_start_speed: cognitiveStartSpeed,
    efficiency_projection: efficiencyProjection,
    precision_ratio: null,
  };
}

/** Predict SAT score range from behavioural metrics. */
export function predictScore(metrics, mathTotal = 6, verbalTotal = 6) {
  const mathPct  = mathTotal  > 0 ? metrics.math_score  / mathTotal  : 0;
  const verbalPct = verbalTotal > 0 ? metrics.verbal_score / verbalTotal : 0;

  const mathScaled   = Math.round((200 + mathPct   * 600) / 10) * 10;
  const verbalScaled = Math.round((200 + verbalPct * 600) / 10) * 10;
  const total = mathScaled + verbalScaled;

  // Ceiling: add bonus based on behavioural indicators
  const carelessBonus   = metrics.carelessness_flag   ? 80  : 140;
  const efficiencyBonus = metrics.avg_time_deviation < 0.8 ? 50  : 0;
  const enduranceBonus  = metrics.endurance_index    > 0   ? 30  : 0;

  const low     = Math.max(400,  Math.round((total - 60) / 10) * 10);
  const high    = Math.min(1600, Math.round((total + 60) / 10) * 10);
  const ceiling = Math.min(1600, high + carelessBonus + efficiencyBonus + enduranceBonus);

  return {
    predicted_range: `${low}–${high}`,
    score_ceiling:   ceiling,
    math_predicted:  `${mathScaled - 30}–${mathScaled + 30}`,
    verbal_predicted:`${verbalScaled - 30}–${verbalScaled + 30}`,
    raw_score: metrics.total_score,
  };
}
