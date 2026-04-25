# GitHub Client Setup

This project is for a client website, so all tracking, indexing, and search properties must use the client's accounts and credentials.

## Use The Client's Accounts Only

Do not use your personal:

- Google Analytics account
- Google Search Console property
- Google Cloud project
- Indexing API service account
- API keys
- GitHub secrets from another project

Use only the client's:

- GA4 Measurement ID
- Search Console verified property
- Google Cloud service account for Indexing API
- GitHub repository secrets

## 1. Google Analytics 4

File:

- [analytics-config.js](/Users/rohit/Downloads/kamakshi-final-v3/analytics-config.js:1)

Update this:

```js
window.KAMAKSHI_GA4_ID = "G-XXXXXXXXXX";
```

Replace `G-XXXXXXXXXX` with the client's GA4 Measurement ID.

## 2. Google Search Console

The client must verify ownership of:

- `https://kamakshidental.in/`

Recommended:

- verify as a Domain Property if possible

This is required to track:

- impressions
- clicks
- CTR
- average position
- indexing coverage

## 3. Google Indexing API

The GitHub workflow uses:

- [submit-index.js](/Users/rohit/Downloads/kamakshi-final-v3/submit-index.js:1)
- [.github/workflows/seo-indexing.yml](/Users/rohit/Downloads/kamakshi-final-v3/.github/workflows/seo-indexing.yml:1)

The repository secret that must be added in GitHub:

- `GOOGLE_SERVICE_ACCOUNT_KEY`

This secret must contain the client's Google service account JSON, not yours.

## 4. GitHub Repository Secrets

In the client's GitHub repository:

1. Go to `Settings`
2. Open `Secrets and variables`
3. Open `Actions`
4. Add:
   - `GOOGLE_SERVICE_ACCOUNT_KEY`

If you later add more integrations, store them as repo secrets too.

## 5. Daily GitHub Automation

Current workflow:

- GitHub wakes up daily at `2:00 AM`
- submits all published URLs from [url-list.js](/Users/rohit/Downloads/kamakshi-final-v3/url-list.js:1)
- pings Google sitemap
- pings Bing sitemap
- goes back to sleep

Workflow file:

- [.github/workflows/seo-indexing.yml](/Users/rohit/Downloads/kamakshi-final-v3/.github/workflows/seo-indexing.yml:1)

## 6. Before Going Live

Checklist:

- client GA4 ID added
- client Search Console property verified
- client Indexing API service account created
- `GOOGLE_SERVICE_ACCOUNT_KEY` added to GitHub secrets
- sitemap available at `https://kamakshidental.in/sitemap.xml`

## 7. After Going Live

Check these:

- GA4 Realtime shows visitors and button clicks
- Search Console starts collecting query and page data
- GitHub Action runs without secret/auth errors
- sitemap pings succeed

## 8. Safe Rule

If a key, login, property, or dashboard belongs to you personally, do not use it in this client project.
