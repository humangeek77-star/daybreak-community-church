const fs = require('fs');
const https = require('https');

// A high-quality, authentic classic cars outdoor community festival photo
const url = 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80';

function download(url, dest) {
  const file = fs.createWriteStream(dest);
  https.get(url, (res) => {
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      return download(res.headers.location, dest);
    }
    res.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log('Downloaded car show image successfully! Size:', fs.statSync(dest).size);
    });
  }).on('error', (err) => {
    fs.unlink(dest, () => {});
    console.error('Error downloading:', err.message);
  });
}

download(url, 'assets/images/event_car_show.jpg');
