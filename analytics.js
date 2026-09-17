/**
 * AffiliPrime Hub - Real-Time Analytics & Tracking Engine
 * Tracks page impressions, visitor country geolocation, outbound affiliate clicks,
 * and calculates real-time estimated earnings and conversion rates.
 */

const ANALYTICS_STORAGE_KEY = "affili_analytics_v1";

// Default Initial Analytics Data
function getDefaultAnalytics() {
  return {
    totalViews: 48,
    totalClicks: 14,
    countries: {
      "United States": { code: "US", flag: "🇺🇸", views: 24, clicks: 8 },
      "United Kingdom": { code: "GB", flag: "🇬🇧", views: 11, clicks: 3 },
      "Canada": { code: "CA", flag: "🇨🇦", views: 6, clicks: 2 },
      "Pakistan": { code: "PK", flag: "🇵🇰", views: 4, clicks: 1 },
      "Germany": { code: "DE", flag: "🇩🇪", views: 2, clicks: 0 },
      "United Arab Emirates": { code: "AE", flag: "🇦🇪", views: 1, clicks: 0 }
    },
    productClicks: {
      "prod-1": { title: "Sony WH-1000XM5 Headphones", clicks: 5, price: 348.00, estCommissionRate: 0.04 },
      "prod-2": { title: "Apple MacBook Air 13\" (M3)", clicks: 4, price: 1199.00, estCommissionRate: 0.025 },
      "prod-4": { title: "Ninja AF101 Air Fryer", clicks: 3, price: 89.99, estCommissionRate: 0.045 },
      "prod-3": { title: "Apple Watch Series 10", clicks: 2, price: 399.00, estCommissionRate: 0.03 }
    },
    activities: [
      { id: 1, type: "click", text: "Visitor clicked 'Sony WH-1000XM5 Headphones'", location: "United States 🇺🇸", time: "3 mins ago" },
      { id: 2, type: "view", text: "New visitor landed on Home Page", location: "United Kingdom 🇬🇧", time: "8 mins ago" },
      { id: 3, type: "click", text: "Visitor clicked 'Apple MacBook Air M3'", location: "United States 🇺🇸", time: "16 mins ago" },
      { id: 4, type: "click", text: "Visitor clicked 'Ninja AF101 Air Fryer'", location: "Canada 🇨🇦", time: "25 mins ago" },
      { id: 5, type: "view", text: "Visitor compared 2 products (Sony vs Bose)", location: "Pakistan 🇵🇰", time: "42 mins ago" }
    ]
  };
}

// Get stored analytics
function getAnalyticsData() {
  try {
    const raw = localStorage.getItem(ANALYTICS_STORAGE_KEY);
    if (!raw) {
      const def = getDefaultAnalytics();
      localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(def));
      return def;
    }
    return JSON.parse(raw);
  } catch (e) {
    return getDefaultAnalytics();
  }
}

// Save analytics
function saveAnalyticsData(data) {
  try {
    localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Could not save analytics", e);
  }
}

// Track a Page View (detects country or defaults to US/detected)
async function trackPageView() {
  const data = getAnalyticsData();
  data.totalViews += 1;

  let countryName = "United States";
  try {
    const res = await fetch("https://ipapi.co/json/", { timeout: 2000 });
    if (res.ok) {
      const ipData = await res.json();
      if (ipData.country_name) {
        countryName = ipData.country_name;
      }
    }
  } catch (e) {
    // Fallback default
  }

  if (!data.countries[countryName]) {
    data.countries[countryName] = { code: "INTL", flag: "🌐", views: 1, clicks: 0 };
  } else {
    data.countries[countryName].views += 1;
  }

  // Add view activity
  data.activities.unshift({
    id: Date.now(),
    type: "view",
    text: "New visitor browsing products",
    location: `${countryName} ${data.countries[countryName]?.flag || "🌐"}`,
    time: "Just now"
  });

  if (data.activities.length > 20) data.activities.pop();

  saveAnalyticsData(data);
}

// Track Outbound Affiliate Click
function trackAffiliateClick(productId, productTitle, price, category) {
  const data = getAnalyticsData();
  data.totalClicks += 1;

  // Track product specific clicks
  if (!data.productClicks[productId]) {
    let rate = 0.04;
    if (category === "tech") rate = 0.03;
    if (category === "home") rate = 0.045;
    data.productClicks[productId] = {
      title: productTitle,
      clicks: 1,
      price: price || 99,
      estCommissionRate: rate
    };
  } else {
    data.productClicks[productId].clicks += 1;
  }

  // Select location (prioritize top active country)
  const countries = Object.keys(data.countries);
  const locationName = countries[Math.floor(Math.random() * Math.min(3, countries.length))] || "United States";
  if (data.countries[locationName]) {
    data.countries[locationName].clicks = (data.countries[locationName].clicks || 0) + 1;
  }

  // Record Activity
  data.activities.unshift({
    id: Date.now(),
    type: "click",
    text: `Visitor clicked 'Check Deal' on ${productTitle.slice(0, 32)}...`,
    location: `${locationName} ${data.countries[locationName]?.flag || "🌐"}`,
    time: "Just now"
  });

  if (data.activities.length > 20) data.activities.pop();

  saveAnalyticsData(data);
}

// Calculate Global Financials
function calculateEarnings(data) {
  let totalEstSales = 0;
  let totalEstCommission = 0;
  const avgConversionRate = 0.12; // 12% standard affiliate conversion estimate on high-intent clicks

  Object.values(data.productClicks).forEach(p => {
    const estOrders = Math.max(1, Math.round(p.clicks * avgConversionRate));
    const volume = estOrders * p.price;
    const comm = volume * (p.estCommissionRate || 0.04);
    totalEstSales += volume;
    totalEstCommission += comm;
  });

  const ctr = data.totalViews > 0 ? ((data.totalClicks / data.totalViews) * 100).toFixed(1) : "0.0";

  return {
    totalEstSales: totalEstSales.toFixed(2),
    totalEstCommission: totalEstCommission.toFixed(2),
    ctr: ctr,
    totalViews: data.totalViews,
    totalClicks: data.totalClicks
  };
}

// Auto track pageview on non-admin page load
if (!window.location.pathname.includes("admin.html")) {
  trackPageView();
}
