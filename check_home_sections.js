const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, 'raw_source', 'home.html'), 'utf-8');

const imgKeys = [
  { key: '54db4c322f9644b38ac9956285717c12', label: 'img1' },
  { key: '634ae93ad10c49dc8cd89caad6b7406c', label: 'img2' },
  { key: '1ede0ddbc0b64ae19c06ae2cae61653c', label: 'img3' },
  { key: '8e91a58fcc76400f859ebb4e091de471', label: 'img4' },
  { key: '3478cda9e3c049ac9956253d6d5a067a', label: 'img5' },
  { key: '9156348f9b554babaa4d6c009ce2db0f', label: 'img6' },
  { key: '6b75df_008e41acf4d04385bd16b4f2682812b0', label: 'img7' }
];

for (const { key, label } of imgKeys) {
  let pos = content.indexOf(key);
  if (pos !== -1) {
    // Search nearby text tags
    let surrounding = content.substring(Math.max(0, pos - 800), Math.min(content.length, pos + 800));
    // strip HTML tags to find plain text nearby
    let textOnly = surrounding.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
    console.log(`=== ${label} (${key}) ===`);
    console.log(textOnly.substring(0, 400));
    console.log('\n');
  }
}
