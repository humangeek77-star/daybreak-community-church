const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, 'assets', 'images');

const renames = [
  { src: 'asset_1_560e58_06415f35b12d4460ad59711541c4e6f8_mv2_png.png', dest: 'daybreak_logo.png' },
  { src: 'asset_10_560e58_a572ad28ce9a4260a989e2e96c8d7911_mv2_jpg.jpg', dest: 'daybreak_hero_banner.jpg' },
  { src: 'asset_12_54db4c322f9644b38ac9956285717c12_jpg.jpg', dest: 'daybreak_community.jpg' },
  { src: 'asset_13_634ae93ad10c49dc8cd89caad6b7406c_jpg.jpg', dest: 'daybreak_about_roots.jpg' },
  { src: 'asset_14_1ede0ddbc0b64ae19c06ae2cae61653c_jpg.jpg', dest: 'ministry_food_pantry.jpg' },
  { src: 'asset_15_8e91a58fcc76400f859ebb4e091de471_jpg.jpg', dest: 'ministry_overseas_missions.jpg' },
  { src: 'asset_16_3478cda9e3c049ac9956253d6d5a067a_jpg.jpg', dest: 'ministry_recovery_programs.jpg' },
  { src: 'asset_17_9156348f9b554babaa4d6c009ce2db0f_jpg.jpg', dest: 'ministry_sports_activities.jpg' },
  { src: 'asset_18_675744_cdb9a61d62c8462f82a5d2cef7b46dd4_mv2_png.png', dest: 'pastor_andrew_cole_family.png' },
  { src: 'asset_19_675744_892b7c0e1bec47bcb90748ca3b700054_mv2_jpg.jpg', dest: 'pastor_alex_small.jpg' },
  { src: 'asset_20_675744_52fb95ddefe54ed19ef9daa5756b6593_mv2_jpg.jpg', dest: 'pastor_naomi_small.jpg' },
  { src: 'asset_21_e30997dd329742c89c8b45aa62544085_jpg.jpg', dest: 'online_sermon_banner.jpg' },
  { src: 'asset_22_675744_fbc08158486343e8adf81ef11a5c21a2f001_jpg.jpg', dest: 'online_pastor_andy_invite.jpg' }
];

for (const { src, dest } of renames) {
  const srcPath = path.join(imgDir, src);
  const destPath = path.join(imgDir, dest);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${src} -> ${dest}`);
  } else {
    console.warn(`Source not found: ${src}`);
  }
}
