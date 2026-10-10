const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, 'raw_source', 'members.html'), 'utf-8');
const text = content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
console.log(text.substring(0, 1000));
