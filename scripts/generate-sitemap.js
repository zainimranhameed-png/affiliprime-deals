const fs = require('fs');
const path = require('path');

// Read products.js
const productsFilePath = path.join(__dirname, '..', 'data', 'products.js');
let productsCode = fs.readFileSync(productsFilePath, 'utf8');

// Safely extract PRODUCTS_DATA
let PRODUCTS_DATA = [];
try {
  const sandbox = { PRODUCTS_DATA: [] };
  const fn = new Function('sandbox', productsCode + '\nsandbox.PRODUCTS_DATA = PRODUCTS_DATA;');
  fn(sandbox);
  PRODUCTS_DATA = sandbox.PRODUCTS_DATA;
} catch (e) {
  console.error("Error evaluating products.js:", e);
  process.exit(1);
}

const siteBase = "https://zainimranhameed-png.github.io/affiliprime-deals";
const today = new Date().toISOString().split('T')[0];

function escapeXml(unsafe) {
  if (!unsafe) return "";
  return unsafe.toString()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  
  <!-- Main Home Page -->
  <url>
    <loc>${siteBase}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Product Deals Section -->
  <url>
    <loc>${siteBase}/#deals</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Categories Section -->
  <url>
    <loc>${siteBase}/#categories</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- FAQ Guide -->
  <url>
    <loc>${siteBase}/#faq</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`;

// Add each of the 30 products
PRODUCTS_DATA.forEach(prod => {
  const prodUrl = `${siteBase}/?product=${prod.id}`;
  xml += `
  <url>
    <loc>${escapeXml(prodUrl)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.85</priority>
    <image:image>
      <image:loc>${escapeXml(prod.image)}</image:loc>
      <image:title>${escapeXml(prod.title)}</image:title>
      <image:caption>${escapeXml(prod.tagline || prod.title)}</image:caption>
    </image:image>
  </url>`;
});

xml += `
</urlset>
`;

const sitemapPath = path.join(__dirname, '..', 'sitemap.xml');
fs.writeFileSync(sitemapPath, xml, 'utf8');
console.log(`Successfully generated sitemap.xml with ${PRODUCTS_DATA.length} products!`);
