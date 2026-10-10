const urls = [
  'https://video.wixstatic.com/video/675744_fbc08158486343e8adf81ef11a5c21a2/1080p/mp4/file.mp4',
  'https://video.wixstatic.com/video/675744_fbc08158486343e8adf81ef11a5c21a2/720p/mp4/file.mp4',
  'https://video.wixstatic.com/video/675744_fbc08158486343e8adf81ef11a5c21a2/480p/mp4/file.mp4',
  'https://video.wixstatic.com/video/675744_fbc08158486343e8adf81ef11a5c21a2/360p/mp4/file.mp4'
];

async function check() {
  for (const u of urls) {
    try {
      const res = await fetch(u, { method: 'HEAD' });
      console.log(`[${res.status}] ${u} (Length: ${res.headers.get('content-length')} bytes, Type: ${res.headers.get('content-type')})`);
    } catch (e) {
      console.log(`[ERR] ${u}: ${e.message}`);
    }
  }
}

check();
