const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, 'raw_source', 'event_car_show.html'), 'utf-8');
const text = content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');

// Look for car show details
const idx = text.indexOf('Lapel Village Fair');
if (idx !== -1) {
  console.log(text.substring(Math.max(0, idx - 100), Math.min(text.length, idx + 1000)));
} else {
  console.log('No direct Lapel Village Fair string found, printing first 1000 chars:');
  console.log(text.substring(0, 1000));
}
