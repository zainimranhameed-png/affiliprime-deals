const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Add beauty chip after gaming chip
const gamingChip = `data-category="gaming">
            <i class="fa-solid fa-gamepad"></i> Desk &amp; Gaming
          </button>
        </div>`;

const withBeauty = `data-category="gaming">
            <i class="fa-solid fa-gamepad"></i> Desk &amp; Gaming
          </button>
          <button class="chip-btn" data-category="beauty" style="color: #ec4899; border-color: rgba(236, 72, 153, 0.3);">
            <i class="fa-solid fa-spa"></i> Beauty &amp; Skin
          </button>
        </div>`;

if (html.includes(gamingChip)) {
  html = html.replace(gamingChip, withBeauty);
  console.log('Beauty chip added!');
} else {
  console.log('Pattern not found — checking index.html...');
  const idx = html.indexOf('data-category="gaming"');
  console.log('Gaming chip at index:', idx);
  console.log('Surrounding:', JSON.stringify(html.slice(idx, idx + 150)));
}

fs.writeFileSync('index.html', html, 'utf8');
