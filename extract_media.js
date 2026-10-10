const fs = require('fs');
const path = require('path');

const rawDir = path.join(__dirname, 'raw_source');
const files = fs.readdirSync(rawDir).filter(f => f.endsWith('.html'));

const imageSet = new Set();
const pageData = {};

for (const file of files) {
  const content = fs.readFileSync(path.join(rawDir, file), 'utf-8');
  
  // Extract images from static.wixstatic.com
  const regex = /https:\/\/static\.wixstatic\.com\/media\/[a-zA-Z0-9_\-\.~]+/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    let imgUrl = match[0];
    // Clean trailing quote or punctuation if any
    imgUrl = imgUrl.replace(/["'\\,>]+$/, '');
    imageSet.add(imgUrl);
  }

  // Extract titles and meta descriptions
  const titleMatch = content.match(/<title>([^<]+)<\/title>/i);
  const descMatch = content.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
  const ogImgMatch = content.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i);

  pageData[file] = {
    title: titleMatch ? titleMatch[1] : '',
    description: descMatch ? descMatch[1] : '',
    ogImage: ogImgMatch ? ogImgMatch[1] : ''
  };
}

console.log('Discovered unique Wix media assets:', imageSet.size);
const uniqueImages = Array.from(imageSet);
fs.writeFileSync(path.join(__dirname, 'extracted_images.json'), JSON.stringify(uniqueImages, null, 2));
fs.writeFileSync(path.join(__dirname, 'extracted_meta.json'), JSON.stringify(pageData, null, 2));

console.log(uniqueImages.slice(0, 20));
