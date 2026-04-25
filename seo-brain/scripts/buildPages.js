const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const { createManifest } = require("../engine/pageGenerator");
const { buildGraph } = require("../engine/internalLinkGraph");

const projectRoot = path.join(__dirname, "..", "..");
const dataDir = path.join(projectRoot, "seo-brain", "data");
const trackingDir = path.join(projectRoot, "seo-brain", "tracking");
const outputDir = path.join(projectRoot, "seo-brain", "output");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function findPublishedEquivalent(page, publishedHtmlFiles) {
  const locationTokens = {
    indiranagar: ["indiranagar", "new-tippasandra"],
    "rr-nagar": ["rr-nagar", "rajarajeshwari-nagar", "beml-layout", "gopalan-arcade"],
    "mg-road": ["mg-road", "ashok-nagar", "brigade-road"]
  };

  const serviceTokens = {
    dentist: ["dentist", "dental-clinic", "best-dental-clinic"],
    "dental-implants": ["dental-implants"],
    invisalign: ["invisalign", "clear-aligners"],
    "root-canal-treatment": ["root-canal"],
    "teeth-whitening": ["teeth-whitening"]
  };

  const locationMatches = locationTokens[page.locationSlug] || [page.locationSlug];
  const serviceMatches = serviceTokens[page.serviceSlug] || [page.serviceSlug];

  return [...publishedHtmlFiles].find((fileName) => {
    return (
      locationMatches.some((token) => fileName.includes(token)) &&
      serviceMatches.some((token) => fileName.includes(token))
    );
  }) || null;
}

ensureDir(outputDir);

const locations = readJson(path.join(dataDir, "locations.json"));
const services = readJson(path.join(dataDir, "services.json"));
const keywords = readJson(path.join(dataDir, "keywords.json"));
const ctrMap = readJson(path.join(trackingDir, "ctr.json"));
const rankingMap = readJson(path.join(trackingDir, "rankings.json"));

const publishedHtmlFiles = new Set(
  fs
    .readdirSync(projectRoot)
    .filter((fileName) => fileName.endsWith(".html"))
);

const manifest = createManifest({
  locations,
  services,
  keywords,
  ctrMap,
  rankingMap,
  publishedHtmlFiles
}).map((page) => {
  const publishedEquivalent = findPublishedEquivalent(page, publishedHtmlFiles);
  return {
    ...page,
    publishedEquivalent,
    published: page.published || Boolean(publishedEquivalent)
  };
});

const graph = buildGraph(manifest);
const summary = {
  generatedAt: new Date().toISOString(),
  totalOpportunities: manifest.length,
  livePagesMatched: manifest.filter((page) => page.published).length,
  topOpportunities: [...manifest]
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
    .map(({ slug, title, score, published }) => ({
      slug,
      title,
      score,
      published
    })),
  weakestCtrPages: [...manifest]
    .filter((page) => page.performance.ctr > 0)
    .sort((a, b) => a.performance.ctr - b.performance.ctr)
    .slice(0, 10)
    .map(({ slug, title, performance }) => ({
      slug,
      title,
      ctr: performance.ctr,
      position: performance.position
    }))
};

fs.writeFileSync(
  path.join(outputDir, "page-manifest.json"),
  JSON.stringify(manifest, null, 2)
);
fs.writeFileSync(
  path.join(outputDir, "link-graph.json"),
  JSON.stringify(graph, null, 2)
);
fs.writeFileSync(
  path.join(outputDir, "summary.json"),
  JSON.stringify(summary, null, 2)
);

execFileSync("node", ["generate-pages.js"], {
  cwd: projectRoot,
  stdio: "inherit"
});

console.log(`SEO brain build complete: ${manifest.length} opportunities scored.`);
