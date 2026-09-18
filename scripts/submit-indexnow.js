const https = require('https');

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
    `https://${host}/affiliprime-deals/#faq`,
    `https://${host}/affiliprime-deals/sitemap.xml`
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
  console.log(`IndexNow Response Status: ${res.statusCode}`);
  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (e) => {
  console.error(`Error submitting to IndexNow: ${e.message}`);
});

req.write(payload);
req.end();
