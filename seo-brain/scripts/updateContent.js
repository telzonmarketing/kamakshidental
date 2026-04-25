const fs = require("fs");
const path = require("path");
const { optimizeContent } = require("../engine/contentOptimizer");

const projectRoot = path.join(__dirname, "..", "..");
const outputDir = path.join(projectRoot, "seo-brain", "output");
const trackingDir = path.join(projectRoot, "seo-brain", "tracking");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function ensureManifest() {
  const manifestPath = path.join(outputDir, "page-manifest.json");

  if (!fs.existsSync(manifestPath)) {
    throw new Error("Missing seo-brain/output/page-manifest.json. Run npm run seo:build first.");
  }

  return readJson(manifestPath);
}

const manifest = ensureManifest();
const ctrMap = readJson(path.join(trackingDir, "ctr.json"));
const rankingMap = readJson(path.join(trackingDir, "rankings.json"));

const optimizedPages = manifest.map((page) => {
  const performance = {
    ctr: ctrMap[page.slug]?.ctr ?? page.performance.ctr ?? 0,
    position: rankingMap[page.slug]?.position ?? page.performance.position ?? 100
  };

  return optimizeContent(page, performance);
});

const report = {
  generatedAt: new Date().toISOString(),
  pagesNeedingAttention: optimizedPages
    .filter((page) => page.performance.ctr < 3 || page.performance.position > 10)
    .slice(0, 25)
    .map(({ slug, title, performance, refreshNote }) => ({
      slug,
      title,
      ctr: performance.ctr,
      position: performance.position,
      refreshNote
    }))
};

fs.writeFileSync(
  path.join(outputDir, "page-overrides.json"),
  JSON.stringify(optimizedPages, null, 2)
);
fs.writeFileSync(
  path.join(outputDir, "optimization-report.json"),
  JSON.stringify(report, null, 2)
);

console.log(`SEO content update complete: ${optimizedPages.length} pages reviewed.`);
