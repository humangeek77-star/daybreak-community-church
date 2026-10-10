const fs = require('fs');
const path = require('path');

function inspectPage(filename, keys) {
  const content = fs.readFileSync(path.join(__dirname, 'raw_source', filename), 'utf-8');
  console.log(`=== INSPECTING ${filename} ===`);
  for (const k of keys) {
    const idx = content.indexOf(k);
    if (idx !== -1) {
      const snippet = content.substring(Math.max(0, idx - 150), Math.min(content.length, idx + 350));
      console.log(`\nKey [${k}]:\n${snippet}\n-------------------`);
    } else {
      console.log(`Key [${k}] not found.`);
    }
  }
}

inspectPage('meet_the_team.html', [
  '675744_cdb9a61d62c8462f82a5d2cef7b46dd4',
  '675744_892b7c0e1bec47bcb90748ca3b700054',
  '675744_52fb95ddefe54ed19ef9daa5756b6593'
]);

inspectPage('home.html', [
  '560e58_a572ad28ce9a4260a989e2e96c8d7911',
  '54db4c322f9644b38ac9956285717c12',
  '634ae93ad10c49dc8cd89caad6b7406c',
  '1ede0ddbc0b64ae19c06ae2cae61653c',
  '8e91a58fcc76400f859ebb4e091de471',
  '3478cda9e3c049ac9956253d6d5a067a',
  '9156348f9b554babaa4d6c009ce2db0f'
]);
