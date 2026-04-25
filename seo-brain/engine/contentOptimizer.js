const { optimizeTitle, optimizeMetaDescription } = require("./ctrOptimizer");

function optimizeContent(page, performance) {
  const optimized = { ...page };
  const ctr = performance.ctr ?? 0;
  const rank = performance.position ?? 100;

  optimized.title = optimizeTitle(page.title, ctr);
  optimized.metaDescription = optimizeMetaDescription(
    page.metaDescription,
    ctr,
    page.location
  );

  const notes = [];

  if (ctr < 2) {
    notes.push("Title underperforming on CTR; stronger qualifier recommended.");
  }

  if (rank > 10) {
    notes.push("Ranking outside top 10; add a fresh FAQ block and stronger local proof.");
  }

  if (rank > 20) {
    notes.push("Consider expanding this page with pricing, recovery, and appointment details.");
  }

  optimized.refreshNote =
    notes.join(" ") || "Performance stable; keep monitoring and refresh if impressions grow.";

  return optimized;
}

module.exports = {
  optimizeContent
};
