const fs = require('fs');
const path = require('path');

// Load new products
const NEW_PRODUCTS = require('./new-products.js');

const productsFile = path.join(__dirname, '..', 'data', 'products.js');
let content = fs.readFileSync(productsFile, 'utf8');

// Build new product entries string
let newEntries = '';
for (const p of NEW_PRODUCTS) {
  newEntries += ',\n  ' + JSON.stringify(p, null, 2).split('\n').join('\n  ');
}

// Insert before closing ]; of PRODUCTS_DATA array
const insertionPoint = content.lastIndexOf('];\n\n// Global configuration');
if (insertionPoint === -1) {
  console.error('Could not find insertion point in products.js');
  process.exit(1);
}

const before = content.slice(0, insertionPoint);
const after = content.slice(insertionPoint);

const updated = before + newEntries + '\n' + after;

fs.writeFileSync(productsFile, updated, 'utf8');

const lineCount = updated.split('\n').length;
const productCount = (updated.match(/id: "prod-/g) || []).length;
console.log(`SUCCESS! products.js updated: ${lineCount} lines, ${productCount} total products`);
