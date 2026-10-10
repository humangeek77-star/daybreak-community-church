const fs = require('fs');
const path = require('path');

const inventory = JSON.parse(fs.readFileSync(path.join(__dirname, 'asset_inventory.json'), 'utf-8'));
const rawDir = path.join(__dirname, 'raw_source');
const htmlFiles = fs.readdirSync(rawDir).filter(f => f.endsWith('.html'));

const mapping = [];

for (const item of inventory) {
  const origKey = item.originalUrl.split('/media/')[1].split('~')[0].split('.')[0];
  const foundIn = [];

  for (const hf of htmlFiles) {
    const text = fs.readFileSync(path.join(rawDir, hf), 'utf-8');
    if (text.includes(origKey)) {
      foundIn.push(hf);
    }
  }

  mapping.push({
    ...item,
    foundIn: foundIn
  });
}

console.log(JSON.stringify(mapping, null, 2));
fs.writeFileSync(path.join(__dirname, 'asset_mapping.json'), JSON.stringify(mapping, null, 2));
