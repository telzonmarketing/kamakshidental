const { google } = require('googleapis');
const URLS = require('./url-list');

async function submitUrls() {
  try {
    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/indexing'],
    });
    const client = await auth.getClient();
    const indexing = google.indexing({ version: 'v3', auth: client });
    console.log(`Submitting ${URLS.length} URLs to Google Indexing API...`);
    for (const url of URLS) {
      try {
        await indexing.urlNotifications.publish({
          requestBody: { url, type: 'URL_UPDATED' },
        });
        console.log(`OK: ${url}`);
      } catch (err) {
        console.log(`SKIP: ${url} — ${err.message}`);
      }
      await new Promise(r => setTimeout(r, 800));
    }
    console.log(`Done. ${URLS.length} URLs submitted.`);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}
submitUrls();
