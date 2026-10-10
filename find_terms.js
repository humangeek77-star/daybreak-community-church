const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, 'raw_source', 'home.html'), 'utf-8');

const terms = [
  'FOOD DONATIONS',
  'OVER SEAS MISSIONS',
  'Recovery Programs',
  'Our Roots are Growing',
  'SPORTS'
];

for (const t of terms) {
  let pos = content.indexOf(t);
  if (pos !== -1) {
    let snippet = content.substring(Math.max(0, pos - 400), Math.min(content.length, pos + 1200));
    console.log(`=== TERM: ${t} ===`);
    console.log(snippet.substring(0, 500));
    console.log('-----------------');
  }
}
