const { scorePage } = require("./rankingModel");
const { generateReviews } = require("./reviewEngine");

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function buildTitle(intent, service, location) {
  if (intent.slug === "best") {
    return `Best ${service.name} in ${location.name}`;
  }

  if (intent.slug === "near-me") {
    return `${service.name} Near Me in ${location.name}`;
  }

  return `${intent.titlePrefix} ${service.name} in ${location.name}`;
}

function buildMetaDescription(intent, service, location) {
  return `${buildTitle(intent, service, location)}. Kamakshi Dental in ${location.area}, ${location.city}. View reviews, timings, pricing questions, and book quickly on WhatsApp.`;
}

function createManifest({ locations, services, keywords, ctrMap, rankingMap, publishedHtmlFiles }) {
  const pages = [];

  for (const location of locations) {
    for (const service of services) {
      for (const intent of keywords.intents) {
        const slug =
          intent.slug === "best"
            ? `${slugify("best")}-${
                service.slug
              }-${location.slug}`
            : `${service.slug}-${intent.slug}-${location.slug}`;
        const performanceCtr = ctrMap[slug]?.ctr ?? 0;
        const position = rankingMap[slug]?.position ?? 100;
        const reviewSnippets = generateReviews(location.name, service.name);

        const signalPack = {
          keywordRelevance: intent.slug === "best" ? 92 : 84,
          localIntentMatch: 95,
          ctr: performanceCtr,
          contentFreshness: ctrMap[slug] ? 76 : 48,
          internalLinks: 5,
          reviewSignals: reviewSnippets.length,
          technicalSeo: publishedHtmlFiles.has(`${slug}.html`) ? 90 : 60
        };

        const ranking = scorePage(signalPack);

        pages.push({
          slug,
          title: buildTitle(intent, service, location),
          metaDescription: buildMetaDescription(intent, service, location),
          location: location.name,
          locationSlug: location.slug,
          service: service.name,
          serviceSlug: service.slug,
          intent: intent.label,
          intentSlug: intent.slug,
          modifier: intent.modifier,
          phone: location.phone,
          performance: {
            ctr: performanceCtr,
            position
          },
          reviews: reviewSnippets,
          published: publishedHtmlFiles.has(`${slug}.html`),
          score: ranking.score,
          signals: ranking.normalized
        });
      }
    }
  }

  return pages;
}

module.exports = {
  createManifest
};
