const fs = require("fs");
const path = require("path");

const DOMAIN = "https://kamakshidental.in";
const projectRoot = path.join(__dirname, "..", "..");

const htmlFiles = fs
  .readdirSync(projectRoot)
  .filter((fileName) => fileName.endsWith(".html"))
  .sort();

const today = new Date().toISOString().split("T")[0];
const urls = htmlFiles
  .map((fileName) => {
    const loc = fileName === "index.html" ? `${DOMAIN}/` : `${DOMAIN}/${fileName.replace(/\.html$/, "")}`;
    const priority = fileName === "index.html" ? "1.0" : "0.9";
    return `  <url><loc>${loc}</loc><lastmod>${today}</lastmod><priority>${priority}</priority></url>`;
  })
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

fs.writeFileSync(path.join(projectRoot, "sitemap.xml"), sitemap);

console.log(`Sitemap regenerated with ${htmlFiles.length} HTML pages.`);
