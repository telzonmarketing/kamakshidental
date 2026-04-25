# kamakshi-dental

Static website for Kamakshi Dental with the homepage, SEO landing pages, and local generation scripts.

## SEO Brain

This repo now includes a lightweight `seo-brain/` loop that is designed to be:

- Programmatic: builds location x service x intent opportunities
- Data-driven: reads tracking signals from JSON files
- Self-improving: generates title/content recommendations from CTR and ranking data
- Automatable: runnable locally or from GitHub Actions

### Local commands

- `npm run seo:build` builds the SEO manifest, internal link graph, and regenerates the site pages
- `npm run seo:update` creates optimization recommendations and page overrides
- `npm run seo:sitemap` rebuilds `sitemap.xml` from the published HTML files
- `npm run seo:dashboard` generates `seo-dashboard.html` so you can review what is working and what needs attention
- `npm run seo:loop` runs the full closed loop in sequence

## Traffic Tracking

The site now supports GA4-ready tracking through:

- [analytics-config.js](/Users/rohit/Downloads/kamakshi-final-v3/analytics-config.js:1)
- [analytics.js](/Users/rohit/Downloads/kamakshi-final-v3/analytics.js:1)

To enable live traffic tracking:

1. Put your GA4 Measurement ID in `analytics-config.js`
2. Publish the site
3. Open `seo-dashboard.html` after running `npm run seo:dashboard`

Tracked events include WhatsApp clicks, call clicks, internal page navigation, and location-card interactions.
