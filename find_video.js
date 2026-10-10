const fs = require('fs');

const content = fs.readFileSync('raw_source/onlineservices.html', 'utf-8');

// Search for any video references
const yt = content.match(/https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/[a-zA-Z0-9_\-\?=&]+/gi) || [];
console.log('YouTube links:', Array.from(new Set(yt)));

const vimeo = content.match(/https?:\/\/(www\.)?vimeo\.com\/[a-zA-Z0-9_\-\?=&]+/gi) || [];
console.log('Vimeo links:', Array.from(new Set(vimeo)));

// Search for video elements or iframes
const iframes = content.match(/<iframe[^>]+>/gi) || [];
console.log('Iframes:', iframes);

// Look around "video" or "videoId" or "wix-video"
const matches = [];
let regex = /(youtube|youtu\.be|vimeo|wix-video|videoUrl|videoId)[^,}\s"]+/gi;
let m;
while ((m = regex.exec(content)) !== null) {
  matches.push(m[0]);
}
console.log('Keyword matches:', Array.from(new Set(matches)).slice(0, 30));

// Also let's inspect around asset_22 / Pastor Andy photo:
// In download_assets.js earlier:
// asset_22_675744_fbc08158486343e8adf81ef11a5c21a2f001_jpg.jpg
const idx = content.indexOf('675744_fbc08158486343e8adf81ef11a5c21a2f001');
if (idx !== -1) {
  console.log('\n--- CONTEXT AROUND PASTOR ANDY VIDEO THUMBNAIL ---');
  console.log(content.substring(Math.max(0, idx - 1000), Math.min(content.length, idx + 2000)));
}
