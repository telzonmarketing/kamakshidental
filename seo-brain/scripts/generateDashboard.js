const fs = require("fs");
const path = require("path");

const projectRoot = path.join(__dirname, "..", "..");
const outputDir = path.join(projectRoot, "seo-brain", "output");
const trackingDir = path.join(projectRoot, "seo-brain", "tracking");
const dashboardPath = path.join(projectRoot, "seo-dashboard.html");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

const summary = readJson(path.join(outputDir, "summary.json"));
const report = readJson(path.join(outputDir, "optimization-report.json"));
const ctr = readJson(path.join(trackingDir, "ctr.json"));
const rankings = readJson(path.join(trackingDir, "rankings.json"));

const trackedPages = Object.keys(ctr).length;
const avgCtr = trackedPages
  ? (
      Object.values(ctr).reduce((total, item) => total + (item.ctr || 0), 0) / trackedPages
    ).toFixed(2)
  : "0.00";

const avgRank = Object.keys(rankings).length
  ? (
      Object.values(rankings).reduce((total, item) => total + (item.position || 0), 0) /
      Object.keys(rankings).length
    ).toFixed(1)
  : "0.0";

function renderRows(items, formatter) {
  return items.map(formatter).join("");
}

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Kamakshi Dental SEO Dashboard</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:Arial,sans-serif;background:#f4f7f3;color:#102030;padding:32px}
.wrap{max-width:1200px;margin:0 auto}
h1{font-size:36px;margin-bottom:10px}
.sub{color:#526273;margin-bottom:28px}
.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:28px}
.card{background:#fff;border:1px solid #dbe4da;border-radius:16px;padding:20px}
.label{font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:#5d7b70;margin-bottom:10px}
.value{font-size:28px;font-weight:700}
.section{margin-top:28px}
.section h2{font-size:24px;margin-bottom:14px}
table{width:100%;border-collapse:collapse;background:#fff;border:1px solid #dbe4da;border-radius:16px;overflow:hidden}
th,td{text-align:left;padding:14px;border-bottom:1px solid #edf1ec;font-size:14px;vertical-align:top}
th{background:#0b7a6a;color:#fff}
tr:last-child td{border-bottom:none}
.note{margin-top:24px;padding:18px;border-radius:16px;background:#04111f;color:#dfe9e6;line-height:1.6}
code{background:#edf4ef;padding:2px 6px;border-radius:6px}
@media(max-width:900px){.grid{grid-template-columns:1fr 1fr}}
@media(max-width:640px){.grid{grid-template-columns:1fr} body{padding:18px}}
</style>
</head>
<body>
  <div class="wrap">
    <h1>Kamakshi Dental SEO Dashboard</h1>
    <p class="sub">Generated on ${summary.generatedAt}. Use this page to review what is working, what is weak, and which pages deserve attention next.</p>

    <div class="grid">
      <div class="card"><div class="label">Indexed Opportunities</div><div class="value">${summary.totalOpportunities}</div></div>
      <div class="card"><div class="label">Live Page Matches</div><div class="value">${summary.livePagesMatched}</div></div>
      <div class="card"><div class="label">Tracked CTR Rows</div><div class="value">${trackedPages}</div></div>
      <div class="card"><div class="label">Average CTR / Avg Rank</div><div class="value">${avgCtr}% / ${avgRank}</div></div>
    </div>

    <div class="section">
      <h2>What’s Working</h2>
      <table>
        <thead><tr><th>Slug</th><th>Title</th><th>Score</th><th>Status</th></tr></thead>
        <tbody>
          ${renderRows(summary.topOpportunities, (item) => `<tr><td><code>${item.slug}</code></td><td>${item.title}</td><td>${item.score}</td><td>${item.published ? "Live" : "Planned"}</td></tr>`)}
        </tbody>
      </table>
    </div>

    <div class="section">
      <h2>Weak CTR / Ranking Signals</h2>
      <table>
        <thead><tr><th>Slug</th><th>Title</th><th>CTR</th><th>Position</th></tr></thead>
        <tbody>
          ${renderRows(summary.weakestCtrPages, (item) => `<tr><td><code>${item.slug}</code></td><td>${item.title}</td><td>${item.ctr}</td><td>${item.position}</td></tr>`)}
        </tbody>
      </table>
    </div>

    <div class="section">
      <h2>Needs Attention</h2>
      <table>
        <thead><tr><th>Slug</th><th>Title</th><th>CTR</th><th>Position</th><th>Recommendation</th></tr></thead>
        <tbody>
          ${renderRows(report.pagesNeedingAttention.slice(0, 20), (item) => `<tr><td><code>${item.slug}</code></td><td>${item.title}</td><td>${item.ctr}</td><td>${item.position}</td><td>${item.refreshNote}</td></tr>`)}
        </tbody>
      </table>
    </div>

    <div class="note">
      Live traffic tracking becomes active after you place your GA4 Measurement ID inside <code>analytics-config.js</code>.<br>
      Once that is set, every page view plus WhatsApp, phone, internal navigation, and location-card clicks can be measured in GA4.
    </div>
  </div>
</body>
</html>`;

fs.writeFileSync(dashboardPath, html);
console.log(`Dashboard generated at ${dashboardPath}`);
