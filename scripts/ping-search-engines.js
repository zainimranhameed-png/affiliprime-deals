const http = require('http');
const https = require('https');

const siteName = "AffiliPrime Deals - Top Amazon Deals & Price Drops";
const siteUrl = "https://zainimranhameed-png.github.io/affiliprime-deals/";
const feedUrl = "https://zainimranhameed-png.github.io/affiliprime-deals/pinterest-feed.xml";

console.log("🚀 Starting Automated Web Broadcast & Search Engine Notification Bot...");

// Ping-o-matic REST Ping
function pingOmatic() {
  return new Promise((resolve) => {
    const url = `http://pingomatic.com/ping/?title=${encodeURIComponent(siteName)}&blogurl=${encodeURIComponent(siteUrl)}&rssurl=${encodeURIComponent(feedUrl)}&chk_weblogscom=on&chk_blogs=on&chk_feedburner=on&chk_syndic8=on&chk_newsgator=on&chk_myyahoo=on&chk_pubsubcom=on&chk_blogdigger=on&chk_audiogoat=on&chk_feedster=on&chk_britblog=on&chk_toplist=on`;
    
    http.get(url, (res) => {
      console.log(`✅ Ping-o-matic Broadcast Status: ${res.statusCode} (Notified Weblogs, FeedBurner, Blogs, Syndic8)`);
      resolve(true);
    }).on('error', (e) => {
      console.log(`⚠️ Ping-o-matic Ping Note: ${e.message}`);
      resolve(false);
    });
  });
}

// IndexNow Re-trigger for All Product Endpoints
function triggerIndexNow() {
  return new Promise((resolve) => {
    const key = "78a6f9c4d21045e7839b1a2c5e4d9b01";
    const host = "zainimranhameed-png.github.io";
    const keyLocation = `https://${host}/affiliprime-deals/${key}.txt`;

    const payload = JSON.stringify({
      host: host,
      key: key,
      keyLocation: keyLocation,
      urlList: [
        `https://${host}/affiliprime-deals/`,
        `https://${host}/affiliprime-deals/#deals`,
        `https://${host}/affiliprime-deals/#categories`,
        `https://${host}/affiliprime-deals/?product=prod-1`,
        `https://${host}/affiliprime-deals/?product=prod-2`,
        `https://${host}/affiliprime-deals/?product=prod-3`,
        `https://${host}/affiliprime-deals/?product=prod-4`,
        `https://${host}/affiliprime-deals/sitemap.xml`,
        `https://${host}/affiliprime-deals/pinterest-feed.xml`
      ]
    });

    const options = {
      hostname: 'api.indexnow.org',
      port: 443,
      path: '/indexnow',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(payload)
      }
    };

    const req = https.request(options, (res) => {
      console.log(`✅ IndexNow Search Engine Submission Status: ${res.statusCode} (Bing, Yahoo, Yandex Notified)`);
      resolve(true);
    });

    req.on('error', (e) => {
      console.error(`IndexNow error: ${e.message}`);
      resolve(false);
    });

    req.write(payload);
    req.end();
  });
}

async function runAllPings() {
  await triggerIndexNow();
  await pingOmatic();
  console.log("🎉 All automated search broadcast pings dispatched successfully!");
}

runAllPings();
