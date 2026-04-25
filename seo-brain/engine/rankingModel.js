const WEIGHTS = {
  keywordRelevance: 0.2,
  localIntentMatch: 0.2,
  ctr: 0.15,
  contentFreshness: 0.1,
  internalLinks: 0.1,
  reviewSignals: 0.15,
  technicalSeo: 0.1
};

function clamp(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

function scorePage(signals) {
  const normalized = {
    keywordRelevance: clamp(signals.keywordRelevance ?? 0),
    localIntentMatch: clamp(signals.localIntentMatch ?? 0),
    ctr: clamp((signals.ctr ?? 0) * 20),
    contentFreshness: clamp(signals.contentFreshness ?? 0),
    internalLinks: clamp((signals.internalLinks ?? 0) * 12),
    reviewSignals: clamp((signals.reviewSignals ?? 0) * 20),
    technicalSeo: clamp(signals.technicalSeo ?? 0)
  };

  const score = Object.entries(WEIGHTS).reduce((total, [key, weight]) => {
    return total + normalized[key] * weight;
  }, 0);

  return {
    score: Number(score.toFixed(2)),
    normalized
  };
}

module.exports = {
  WEIGHTS,
  scorePage
};
