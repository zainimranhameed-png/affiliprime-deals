const fs = require('fs');
const path = require('path');

// Read products.js
const productsFilePath = path.join(__dirname, '..', 'data', 'products.js');
let productsCode = fs.readFileSync(productsFilePath, 'utf8');

// Safely extract PRODUCTS_DATA
const sandbox = {};
const fn = new Function('sandbox', productsCode + '\nsandbox.PRODUCTS_DATA = PRODUCTS_DATA; return sandbox;');
const result = fn(sandbox);
const products = result.PRODUCTS_DATA || [];

console.log(`Loaded ${products.length} products for Pinterest Feed.`);

const siteBase = "https://zainimranhameed-png.github.io/affiliprime-deals";
const now = new Date().toUTCString();

let itemsXml = products.map((prod, idx) => {
  const itemDate = new Date(Date.now() - (idx * 3600 * 1000)).toUTCString();
  const prodUrl = `${siteBase}/?product=${prod.id}`;
  const hashtags = `#AmazonFinds #AmazonDeals #BestDeals #MustHaves #${(prod.categoryName || 'Shopping').replace(/[^a-zA-Z]/g, '')}`;
  const desc = `${prod.title} (${prod.discount} OFF). ${prod.tagline}. Best verified Amazon deal at $${prod.price.toFixed(2)}. Tested & curated by AffiliPrime Deals. ${hashtags}`;

  return `    <item>
      <title><![CDATA[🔥 ${prod.title} - ${prod.discount}]]></title>
      <link>${prodUrl}</link>
      <guid isPermaLink="true">${prodUrl}</guid>
      <pubDate>${itemDate}</pubDate>
      <description><![CDATA[${desc}]]></description>
      <enclosure url="${prod.image}" length="102400" type="image/jpeg" />
      <media:content url="${prod.image}" medium="image" type="image/jpeg" />
    </item>`;
}).join('\n');

const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>AffiliPrime Deals - Viral Amazon Finds &amp; Best Prices</title>
    <link>${siteBase}/</link>
    <description>Handpicked viral Amazon products, high-ticket electronics, trending home gadgets, and verified discounts.</description>
    <language>en-us</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${siteBase}/pinterest-feed.xml" rel="self" type="application/rss+xml" />
${itemsXml}
  </channel>
</rss>`;

const outputPath = path.join(__dirname, '..', 'pinterest-feed.xml');
fs.writeFileSync(outputPath, xmlContent, 'utf8');
console.log(`Successfully generated Pinterest RSS feed with ${products.length} items at: ${outputPath}`);
