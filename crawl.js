const fs = require('fs');
const path = require('path');

const TARGETS = [
  'https://www.lapeldaybreak.com/robots.txt',
  'https://www.lapeldaybreak.com/sitemap.xml',
  'https://www.lapeldaybreak.com/',
  'https://www.lapeldaybreak.com/onlineservices',
  'https://www.lapeldaybreak.com/meet-the-team',
  'https://www.lapeldaybreak.com/events-calendar',
  'https://www.lapeldaybreak.com/members'
];

async function crawl() {
  const results = {};
  for (const url of TARGETS) {
    try {
      console.log(`Fetching: ${url}...`);
      const res = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
      });
      const text = await res.text();
      results[url] = {
        status: res.status,
        headers: Object.fromEntries(res.headers.entries()),
        length: text.length,
        content: text
      };
      console.log(`[${res.status}] ${url} - ${text.length} bytes`);
    } catch (err) {
      console.error(`Error fetching ${url}:`, err.message);
      results[url] = { error: err.message };
    }
  }

  fs.writeFileSync(
    path.join(__dirname, 'crawl_results.json'),
    JSON.stringify(
      Object.fromEntries(
        Object.entries(results).map(([k, v]) => [k, { status: v.status, length: v.length, error: v.error }])
      ),
      null,
      2
    )
  );

  // Save html files for extraction
  const rawDir = path.join(__dirname, 'raw_source');
  if (!fs.existsSync(rawDir)) fs.mkdirSync(rawDir);

  for (const [url, data] of Object.entries(results)) {
    if (data.content) {
      const slug = url.replace('https://www.lapeldaybreak.com/', '').replace(/[^a-z0-9]/gi, '_') || 'home';
      fs.writeFileSync(path.join(rawDir, `${slug}.html`), data.content);
    }
  }
}

crawl();
