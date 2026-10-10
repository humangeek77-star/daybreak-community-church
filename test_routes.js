const http = require('http');

const routes = [
  '/',
  '/index.html',
  '/onlineservices',
  '/onlineservices.html',
  '/meet-the-team',
  '/meet-the-team.html',
  '/events-calendar',
  '/events-calendar.html',
  '/members',
  '/members.html',
  '/css/style.css',
  '/js/main.js',
  '/assets/images/daybreak_logo.png',
  '/assets/images/daybreak_hero_banner.jpg',
  '/assets/images/daybreak_about_roots.jpg',
  '/assets/images/ministry_food_pantry.jpg',
  '/assets/images/ministry_sports_activities.jpg',
  '/assets/images/ministry_recovery_programs.jpg',
  '/assets/images/ministry_overseas_missions.jpg',
  '/assets/images/pastor_andrew_cole_family.png',
  '/assets/images/pastor_alex_small.jpg',
  '/assets/images/pastor_naomi_small.jpg'
];

async function testAll() {
  let passed = 0;
  let failed = 0;

  for (const r of routes) {
    try {
      const res = await fetch(`http://localhost:3000${r}`);
      if (res.status === 200) {
        console.log(`[PASS 200] http://localhost:3000${r} (${res.headers.get('content-type')})`);
        passed++;
      } else {
        console.error(`[FAIL ${res.status}] http://localhost:3000${r}`);
        failed++;
      }
    } catch (err) {
      console.error(`[ERROR] http://localhost:3000${r}: ${err.message}`);
      failed++;
    }
  }

  console.log(`\nRoute Verification Summary: ${passed} passed, ${failed} failed.`);
  if (failed > 0) process.exit(1);
}

testAll();
