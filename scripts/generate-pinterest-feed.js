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

function cleanImageUrl(url) {
  // Pinterest needs clean image URLs - remove query parameters that may block fetching
  if (!url) return '';
  // For Unsplash images, use a clean format
  const base = url.split('?')[0];
  return base;
}

function escapeXml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
    .replace(/[🔥⭐⚡💥🎯]/gu, ''); // remove emoji from XML text nodes
}

let itemsXml = products.map((prod, idx) => {
  const itemDate = new Date(Date.now() - (idx * 3600 * 1000)).toUTCString();
  const prodUrl = `${siteBase}/?product=${prod.id}`;
  const imgUrl = cleanImageUrl(prod.image);
  const title = `${prod.title} - ${prod.discount} OFF | Best Amazon Deal`;
  const desc = `${prod.title} is now ${prod.discount} OFF on Amazon! ${prod.tagline} Price: $${prod.price.toFixed(2)} (was $${prod.originalPrice.toFixed(2)}). Tested and verified by AffiliPrime Deals. Click to see full review and check latest price! #AmazonFinds #AmazonDeals #BestDeals #MustHaves`;

  return `    <item>
      <title>${escapeXml(title)}</title>
      <link>${prodUrl}</link>
      <guid isPermaLink="true">${prodUrl}</guid>
      <pubDate>${itemDate}</pubDate>
      <description>${escapeXml(desc)}</description>
      <enclosure url="${imgUrl}" type="image/jpeg" length="102400" />
      <media:content url="${imgUrl}" medium="image" type="image/jpeg" width="800" height="800" />
      <media:title>${escapeXml(prod.title)}</media:title>
      <media:description>${escapeXml(desc)}</media:description>
    </item>`;
}).join('\n');

const now = new Date().toUTCString();
const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:media="http://search.yahoo.com/mrss/"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>AffiliPrime Deals - Best Amazon Finds and Viral Products</title>
    <link>${siteBase}/</link>
    <description>Handpicked viral Amazon products, high-ticket electronics, trending home gadgets, and verified discounts curated by AffiliPrime Deals.</description>
    <language>en-us</language>
    <lastBuildDate>${now}</lastBuildDate>
    <ttl>60</ttl>
    <atom:link href="${siteBase}/pinterest-feed.xml" rel="self" type="application/rss+xml" />
${itemsXml}
  </channel>
</rss>`;

const outputPath = path.join(__dirname, '..', 'pinterest-feed.xml');
fs.writeFileSync(outputPath, xmlContent, 'utf8');
console.log(`Successfully generated clean Pinterest RSS feed with ${products.length} items.`);
console.log(`Feed URL: ${siteBase}/pinterest-feed.xml`);
