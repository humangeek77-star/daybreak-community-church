const fs = require('fs');
const path = require('path');

const imgList = JSON.parse(fs.readFileSync(path.join(__dirname, 'extracted_images.json'), 'utf-8'));
const outDir = path.join(__dirname, 'assets', 'images');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Clean and normalize URLs
const cleanedUrls = [];
for (let u of imgList) {
  // Strip trailing unwanted characters
  u = u.replace(/(~mv2\.pngDaybreak|Daybreak.*)$/, '~mv2.png');
  u = u.replace(/[,\s]+$/, '');
  if (!cleanedUrls.includes(u) && (u.endsWith('.png') || u.endsWith('.jpg') || u.endsWith('.jpeg') || u.includes('~mv2'))) {
    cleanedUrls.push(u);
  }
}

async function downloadAll() {
  const inventory = [];

  for (let i = 0; i < cleanedUrls.length; i++) {
    const url = cleanedUrls[i];
    try {
      const parsed = path.basename(url.split('?')[0]);
      let ext = path.extname(parsed) || '.jpg';
      let filename = `asset_${i + 1}_${parsed.replace(/[^a-zA-Z0-9_-]/g, '_')}`;
      if (!filename.endsWith(ext)) filename += ext;

      const targetPath = path.join(outDir, filename);

      console.log(`Downloading: ${url} -> ${filename}`);
      const res = await fetch(url);
      if (!res.ok) {
        console.warn(`Failed ${url}: ${res.status}`);
        continue;
      }

      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(targetPath, buffer);

      inventory.push({
        originalUrl: url,
        localPath: `assets/images/${filename}`,
        filename: filename,
        bytes: buffer.length
      });
    } catch (err) {
      console.error(`Error downloading ${url}:`, err.message);
    }
  }

  fs.writeFileSync(path.join(__dirname, 'asset_inventory.json'), JSON.stringify(inventory, null, 2));
  console.log(`Successfully downloaded ${inventory.length} assets.`);
}

downloadAll();
