/**
 * AffiliPrime Admin Dashboard Logic
 * Handles PIN Authentication, Metrics Calculation, Country Analytics,
 * and Real-Time Activity Streaming.
 */

const MASTER_PIN = "2026";
let currentEnteredPin = "";

// DOM Elements
const pinLockOverlay = document.getElementById("pinLockOverlay");
const adminMainContent = document.getElementById("adminMainContent");
const pinDisplay = document.getElementById("pinDisplay");
const pinErrorMsg = document.getElementById("pinErrorMsg");
const adminTagDisplay = document.getElementById("adminTagDisplay");

// Metric Elements
const metricViews = document.getElementById("metricViews");
const metricClicks = document.getElementById("metricClicks");
const metricCtr = document.getElementById("metricCtr");
const metricCommission = document.getElementById("metricCommission");
const metricSales = document.getElementById("metricSales");

// Container Elements
const countryListContainer = document.getElementById("countryListContainer");
const activityStreamContainer = document.getElementById("activityStreamContainer");
const productPerformanceTableBody = document.getElementById("productPerformanceTableBody");

// ==========================================================================
// Initialization
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  checkAuth();
  updateTagDisplay();
  
  // Real-time auto sync every 4 seconds
  setInterval(() => {
    if (sessionStorage.getItem("affili_admin_auth") === "true") {
      renderDashboard();
    }
  }, 4000);
});

function updateTagDisplay() {
  const currentTag = localStorage.getItem(APP_CONFIG.storageKey) || APP_CONFIG.defaultAffiliateTag;
  if (adminTagDisplay) adminTagDisplay.textContent = currentTag;
}

// ==========================================================================
// PIN Authentication
// ==========================================================================
function checkAuth() {
  const isAuth = sessionStorage.getItem("affili_admin_auth");
  if (isAuth === "true") {
    pinLockOverlay.style.display = "none";
    adminMainContent.style.display = "block";
    renderDashboard();
  } else {
    pinLockOverlay.style.display = "flex";
    adminMainContent.style.display = "none";
    updatePinDots();
  }
}

function pressPin(num) {
  if (currentEnteredPin.length < 4) {
    currentEnteredPin += num;
    updatePinDots();
    if (currentEnteredPin.length === 4) {
      setTimeout(submitPin, 200);
    }
  }
}

function clearPin() {
  currentEnteredPin = "";
  updatePinDots();
  pinErrorMsg.style.display = "none";
}

function updatePinDots() {
  const dots = pinDisplay.querySelectorAll(".pin-dot");
  dots.forEach((dot, index) => {
    if (index < currentEnteredPin.length) {
      dot.classList.add("filled");
    } else {
      dot.classList.remove("filled");
    }
  });
}

function submitPin() {
  if (currentEnteredPin === MASTER_PIN) {
    sessionStorage.setItem("affili_admin_auth", "true");
    pinErrorMsg.style.display = "none";
    pinLockOverlay.style.display = "none";
    adminMainContent.style.display = "block";
    renderDashboard();
  } else {
    pinErrorMsg.style.display = "block";
    currentEnteredPin = "";
    updatePinDots();
  }
}

function logoutAdmin() {
  sessionStorage.removeItem("affili_admin_auth");
  currentEnteredPin = "";
  checkAuth();
}

// ==========================================================================
// Render Dashboard Metrics
// ==========================================================================
function renderDashboard() {
  const data = getAnalyticsData();
  const financials = calculateEarnings(data);

  // Top Metrics
  metricViews.textContent = financials.totalViews.toLocaleString();
  metricClicks.textContent = financials.totalClicks.toLocaleString();
  metricCtr.textContent = `${financials.ctr}%`;
  metricCommission.textContent = `$${financials.totalEstCommission}`;
  metricSales.textContent = `$${financials.totalEstSales}`;

  // Render Countries
  renderCountries(data);

  // Render Live Activity Stream
  renderActivityStream(data);

  // Render Top Products Table
  renderProductPerformance(data);

  // Render Pinterest Auto-Pin Hub
  renderPinterestHub();
}

// ==========================================================================
// Country Geolocation List
// ==========================================================================
function renderCountries(data) {
  const totalViews = data.totalViews || 1;
  const entries = Object.entries(data.countries || {});

  if (entries.length === 0) {
    countryListContainer.innerHTML = `
      <div style="text-align: center; color: var(--text-muted); padding: 2.5rem 1rem;">
        <i class="fa-solid fa-earth-americas" style="font-size: 2.5rem; margin-bottom: 0.75rem; color: var(--accent-cyan); display: block;"></i>
        <div style="font-weight: 700; color: var(--text-primary); margin-bottom: 0.25rem;">Waiting for First Real Visitor</div>
        <p style="font-size: 0.82rem;">Open <a href="index.html" target="_blank" style="color: var(--accent-cyan); text-decoration: underline;">your website</a> to see your real country appear instantly!</p>
      </div>
    `;
    return;
  }

  const sortedCountries = entries.sort((a, b) => b[1].views - a[1].views);

  countryListContainer.innerHTML = sortedCountries.map(([countryName, countryData]) => {
    const percentage = Math.round((countryData.views / totalViews) * 100);
    return `
      <div class="country-row">
        <div class="country-info">
          <span class="country-flag">${countryData.flag || "🌐"}</span>
          <span class="country-name">${countryName}</span>
        </div>
        <div class="country-bar-wrap">
          <div class="country-bar-fill" style="width: ${Math.max(8, percentage)}%;"></div>
        </div>
        <div class="country-stats">
          <span style="font-weight: 700;">${countryData.views} views</span>
          <span style="color: var(--accent-emerald); font-size: 0.78rem;">(${countryData.clicks || 0} clicks / ${percentage}%)</span>
        </div>
      </div>
    `;
  }).join("");
}

// ==========================================================================
// Live Activity Stream
// ==========================================================================
function renderActivityStream(data) {
  if (!data.activities || data.activities.length === 0) {
    activityStreamContainer.innerHTML = `
      <div style="text-align: center; color: var(--text-muted); padding: 2rem;">
        No recent activities recorded yet.
      </div>
    `;
    return;
  }

  activityStreamContainer.innerHTML = data.activities.slice(0, 7).map(item => {
    const isClick = item.type === "click";
    return `
      <div class="activity-item">
        <div class="activity-icon ${isClick ? 'click' : 'view'}">
          <i class="fa-solid ${isClick ? 'fa-arrow-pointer' : 'fa-eye'}"></i>
        </div>
        <div class="activity-content">
          <div class="activity-text">${item.text}</div>
          <div class="activity-meta">
            <span><i class="fa-solid fa-location-dot"></i> ${item.location}</span>
            <span>•</span>
            <span>${item.time}</span>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

// ==========================================================================
// Top Products Table
// ==========================================================================
function renderProductPerformance(data) {
  const products = Object.entries(data.productClicks || {}).sort((a, b) => b[1].clicks - a[1].clicks);

  if (products.length === 0) {
    productPerformanceTableBody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; color: var(--text-muted); padding: 2.5rem 1rem;">
          <i class="fa-solid fa-arrow-pointer" style="font-size: 2rem; margin-bottom: 0.5rem; color: var(--primary); display: block;"></i>
          <div style="font-weight: 700; color: var(--text-primary); margin-bottom: 0.25rem;">No Clicks Recorded Yet</div>
          <div style="font-size: 0.82rem;">As real visitors click "Check Deal" or "Buy on Amazon", clicks and real commission will populate here.</div>
        </td>
      </tr>
    `;
    return;
  }

  productPerformanceTableBody.innerHTML = products.map(([prodId, prodData]) => {
    const estOrders = Math.max(1, Math.round(prodData.clicks * 0.12));
    const rate = ((prodData.estCommissionRate || 0.04) * 100).toFixed(1);
    const estRev = (estOrders * prodData.price * (prodData.estCommissionRate || 0.04)).toFixed(2);

    return `
      <tr>
        <td>
          <div style="font-weight: 700; color: var(--text-primary); font-size: 0.92rem;">
            ${prodData.title}
          </div>
          <span style="font-size: 0.75rem; color: var(--text-muted);">ASIN: ${prodId}</span>
        </td>
        <td style="font-weight: 600;">$${prodData.price.toFixed(2)}</td>
        <td>
          <span class="table-badge clicks-badge">
            <i class="fa-solid fa-arrow-pointer"></i> ${prodData.clicks}
          </span>
        </td>
        <td style="font-weight: 600; color: var(--accent-cyan);">${estOrders}</td>
        <td><span style="color: var(--text-secondary);">${rate}%</span></td>
        <td style="font-weight: 800; color: var(--accent-emerald); font-size: 1rem;">+$${estRev}</td>
      </tr>
    `;
  }).join("");
}

// ==========================================================================
// Simulation & Test Helpers
// ==========================================================================
function simulateLiveVisit() {
  const sampleCountries = [
    { name: "United States", flag: "🇺🇸" },
    { name: "United Kingdom", flag: "🇬🇧" },
    { name: "Canada", flag: "🇨🇦" },
    { name: "Pakistan", flag: "🇵🇰" },
    { name: "Germany", flag: "🇩🇪" },
    { name: "United Arab Emirates", flag: "🇦🇪" }
  ];
  const chosen = sampleCountries[Math.floor(Math.random() * sampleCountries.length)];
  const data = getAnalyticsData();
  data.totalViews += 1;
  if (!data.countries[chosen.name]) {
    data.countries[chosen.name] = { code: "SIM", flag: chosen.flag, views: 1, clicks: 0 };
  } else {
    data.countries[chosen.name].views += 1;
  }

  data.activities.unshift({
    id: Date.now(),
    type: "view",
    text: "New visitor browsing tech & home deals",
    location: `${chosen.name} ${chosen.flag}`,
    time: "Just now"
  });

  saveAnalyticsData(data);
  renderDashboard();
}

function simulateClickTest() {
  const prods = [
    { id: "prod-1", title: "Sony WH-1000XM5 Headphones", price: 348.00, cat: "tech" },
    { id: "prod-2", title: "Apple MacBook Air M3", price: 1199.00, cat: "tech" },
    { id: "prod-4", title: "Ninja AF101 Air Fryer", price: 89.99, cat: "home" },
    { id: "prod-9", title: "Dyson V15 Cordless Vacuum", price: 649.99, cat: "home" }
  ];
  const p = prods[Math.floor(Math.random() * prods.length)];
  trackAffiliateClick(p.id, p.title, p.price, p.cat);
  renderDashboard();
}

function refreshDashboard() {
  renderDashboard();
}

function handleResetClean() {
  if (confirm("Kya aap data ko 0 par reset karna chahte hain taake bilkul fresh real tracking shuru ho?")) {
    resetAnalyticsToZero();
    renderDashboard();
  }
}

// ==========================================================================
// Pinterest Auto-Pin Hub Logic
// ==========================================================================
function renderPinterestHub() {
  const container = document.getElementById("pinterestProductList");
  if (!container || typeof PRODUCTS_DATA === "undefined") return;

  const siteBase = "https://zainimranhameed-png.github.io/affiliprime-deals";

  container.innerHTML = PRODUCTS_DATA.map((prod) => {
    const prodUrl = `${siteBase}/?product=${prod.id}`;
    const viralText = `🔥 ${prod.title} (${prod.discount} OFF) - Authentic Amazon Deal & In-Depth Review! Tested & verified on AffiliPrime. Check current deal & specs now! #AmazonFinds #AmazonDeals #Trending #BestDeals #MustHaves`;
    const pinUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(prodUrl)}&media=${encodeURIComponent(prod.image)}&description=${encodeURIComponent(viralText)}`;

    // Escaped for attribute
    const safeText = viralText.replace(/"/g, '&quot;');

    return `
      <tr>
        <td style="max-width: 260px;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <img src="${prod.image}" alt="${prod.title}" style="width: 48px; height: 48px; object-fit: cover; border-radius: var(--radius-sm); border: 1px solid var(--border-color); flex-shrink: 0;">
            <div>
              <div style="font-weight: 700; color: var(--text-primary); font-size: 0.88rem; line-height: 1.25; margin-bottom: 0.2rem;">
                ${prod.title}
              </div>
              <span style="font-size: 0.72rem; color: var(--text-muted);">ASIN: ${prod.asin || prod.id}</span>
            </div>
          </div>
        </td>
        <td>
          <div style="font-weight: 700; color: var(--primary); font-size: 0.95rem;">$${prod.price.toFixed(2)}</div>
          <span class="card-price-discount" style="font-size: 0.72rem; padding: 0.15rem 0.4rem;">${prod.discount}</span>
        </td>
        <td>
          <span style="font-size: 0.8rem; color: var(--text-secondary);">${prod.categoryName}</span>
        </td>
        <td style="max-width: 320px;">
          <div style="font-size: 0.78rem; color: var(--text-secondary); line-height: 1.4; background: var(--bg-card); padding: 0.5rem 0.65rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color); margin-bottom: 0.35rem; max-height: 60px; overflow-y: auto;">
            ${viralText}
          </div>
          <button class="action-btn" onclick="copyTextToClipboard('${safeText}')" style="font-size: 0.72rem; padding: 0.25rem 0.6rem; background: var(--bg-card); border: 1px solid var(--border-color); color: var(--text-primary);">
            <i class="fa-solid fa-copy"></i> Copy Pin Caption
          </button>
        </td>
        <td style="text-align: center;">
          <a href="${pinUrl}" target="_blank" rel="noopener" class="action-btn" style="background: #e60023; color: #fff; font-weight: 700; font-size: 0.82rem; padding: 0.5rem 0.85rem; display: inline-flex; align-items: center; gap: 0.4rem; border-radius: var(--radius-sm); text-decoration: none;" title="Open Pinterest Pin Creator for this product">
            <i class="fa-brands fa-pinterest"></i> Pin Now
          </a>
        </td>
      </tr>
    `;
  }).join("");
}

function copyPinterestRss() {
  const url = "https://zainimranhameed-png.github.io/affiliprime-deals/pinterest-feed.xml";
  navigator.clipboard.writeText(url).then(() => {
    alert("✅ Pinterest RSS Feed URL Copied!\n\n" + url + "\n\nPaste this in your Pinterest Business account (Settings -> Auto-publish from RSS feed) to auto-post all products!");
  }).catch(() => {
    prompt("Copy this Pinterest RSS Feed URL:", url);
  });
}

function copyTextToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert("✅ Viral Pin Caption Copied to Clipboard!");
  }).catch(() => {
    prompt("Copy text:", text);
  });
}

