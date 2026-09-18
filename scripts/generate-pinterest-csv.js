const fs = require('fs');
const path = require('path');

// Read products.js
const productsFilePath = path.join(__dirname, '..', 'data', 'products.js');
let productsCode = fs.readFileSync(productsFilePath, 'utf8');

let PRODUCTS_DATA = [];
try {
  const sandbox = { PRODUCTS_DATA: [] };
  const fn = new Function('sandbox', productsCode + '\nsandbox.PRODUCTS_DATA = PRODUCTS_DATA;');
  fn(sandbox);
  PRODUCTS_DATA = sandbox.PRODUCTS_DATA;
} catch (e) {
  console.error("Error loading products.js", e);
  process.exit(1);
}

const siteBase = "https://zainimranhameed-png.github.io/affiliprime-deals";
const boardName = "Amazon Deals & Finds";

function escapeCsvField(field) {
  if (field === null || field === undefined) return '""';
  const str = field.toString().replace(/"/g, '""');
  return `"${str}"`;
}

// Pinterest Official Bulk CSV Headers
const headers = [
  "Title",
  "Media URL",
  "Pinterest board",
  "Thumbnail",
  "Description",
  "Link",
  "Publish date",
  "Keywords"
];

const rows = [headers.join(",")];

PRODUCTS_DATA.forEach(prod => {
  const discountText = prod.discount.includes("OFF") ? prod.discount : `${prod.discount} OFF`;
  const title = `${prod.title} (${discountText})`;
  const mediaUrl = prod.image;
  const thumbnail = "";
  const link = `${siteBase}/?product=${prod.id}`;
  const description = `🔥 ${prod.title} is now ${discountText} on Amazon! Verified ${prod.rating}★ with ${prod.reviewsCount.toLocaleString()} reviews. Check today's lowest deal & features on AffiliPrime Deals. #AmazonFinds #AmazonDeals #BestDeals #ViralFinds #ShopNow`;
  const publishDate = "";
  const keywords = "amazon finds, viral amazon deals, best gadgets 2026, trending products";

  const row = [
    escapeCsvField(title),
    escapeCsvField(mediaUrl),
    escapeCsvField(boardName),
    escapeCsvField(thumbnail),
    escapeCsvField(description),
    escapeCsvField(link),
    escapeCsvField(publishDate),
    escapeCsvField(keywords)
  ];

  rows.push(row.join(","));
});

const csvContent = rows.join("\r\n");
const outputPath = path.join(__dirname, '..', 'pinterest-bulk-pins.csv');
fs.writeFileSync(outputPath, csvContent, 'utf8');

console.log(`Successfully generated pinterest-bulk-pins.csv with ${PRODUCTS_DATA.length} products!`);
