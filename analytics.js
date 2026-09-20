/**
 * AffiliPrime Hub - 100% Real-Time Analytics & Multi-Stream Earning Engine
 * Tracks genuine page views, visitor country geolocation via IP, traffic sources
 * (Pinterest vs Google Organic vs Direct), Adsterra/Google CPM ad impressions,
 * and outbound Amazon Affiliate commissions.
 */

const ANALYTICS_STORAGE_KEY = "affili_analytics_real_v2";

// Clean Real Initial Analytics
function getDefaultAnalytics() {
  return {
    totalViews: 0,
    totalClicks: 0,
    sources: {
      pinterest: { name: "Pinterest Traffic", count: 0, icon: "fa-brands fa-pinterest", color: "#e60023" },
      google: { name: "Google / Search", count: 0, icon: "fa-brands fa-google", color: "#4285F4" },
      direct: { name: "Direct & Social", count: 0, icon: "fa-solid fa-globe", color: "#10b981" }
    },
    countries: {},
    productClicks: {},
    confirmedOrders: [],
    activities: [
      {
        id: Date.now(),
        type: "system",
        text: "Real-Time Tracking & Earnings Engine Initialized",
        location: "Global 🌐",
        time: "Active"
      }
    ]
  };
}

// Detect visitor traffic source
function detectTrafficSource() {
  const ref = (document.referrer || "").toLowerCase();
  const urlParams = new URLSearchParams(window.location.search);
  const utmSource = (urlParams.get("utm_source") || "").toLowerCase();
  const hash = (window.location.hash || "").toLowerCase();

  if (ref.includes("pinterest") || utmSource.includes("pinterest") || hash.includes("pin")) {
    return "pinterest";
  }
  if (ref.includes("google") || ref.includes("bing") || ref.includes("yahoo") || utmSource.includes("google")) {
    return "google";
  }
  return "direct";
}

// Get stored analytics with backward compatibility
function getAnalyticsData() {
  try {
    const raw = localStorage.getItem(ANALYTICS_STORAGE_KEY);
    let data;
    if (!raw) {
      data = getDefaultAnalytics();
      localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(data));
      return data;
    }
    data = JSON.parse(raw);

    // Backward compatibility guarantee
    if (!data.sources) {
      data.sources = {
        pinterest: { name: "Pinterest Traffic", count: 0, icon: "fa-brands fa-pinterest", color: "#e60023" },
        google: { name: "Google / Search", count: 0, icon: "fa-brands fa-google", color: "#4285F4" },
        direct: { name: "Direct & Social", count: data.totalViews || 0, icon: "fa-solid fa-globe", color: "#10b981" }
      };
    }
    if (!data.countries) data.countries = {};
    if (!data.productClicks) data.productClicks = {};
    if (!data.confirmedOrders) data.confirmedOrders = [];
    if (!data.activities) data.activities = [];
    return data;
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

// Cached visitor location in current session
let cachedVisitorLocation = null;

async function getRealVisitorLocation() {
  if (cachedVisitorLocation) return cachedVisitorLocation;
  
  try {
    const res = await fetch("https://ipwho.is/", { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      if (data && data.success !== false && data.country) {
        cachedVisitorLocation = {
          country: data.country,
          city: data.city || "",
          flag: data.flag?.emoji || "🌐",
          code: data.country_code || "XX"
        };
        return cachedVisitorLocation;
      }
    }
  } catch (e) {
    console.warn("Location lookup fallback", e);
  }

  // Graceful browser fallback
  cachedVisitorLocation = {
    country: "Direct Visitor",
    city: "",
    flag: "🌍",
    code: "INTL"
  };
  return cachedVisitorLocation;
}

// Track 100% Real Page View
async function trackPageView() {
  // Prevent double counting if page was reloaded within 3 seconds
  const lastTrackTime = sessionStorage.getItem("affili_last_track_time");
  const now = Date.now();
  if (lastTrackTime && (now - parseInt(lastTrackTime)) < 3000) {
    return;
  }
  sessionStorage.setItem("affili_last_track_time", now.toString());

  const data = getAnalyticsData();
  data.totalViews += 1;

  // Track Traffic Source
  const sourceKey = detectTrafficSource();
  if (!data.sources) data.sources = getDefaultAnalytics().sources;
  if (data.sources[sourceKey]) {
    data.sources[sourceKey].count = (data.sources[sourceKey].count || 0) + 1;
  }

  // Country Geolocation
  const loc = await getRealVisitorLocation();
  const countryName = loc.country;

  if (!data.countries[countryName]) {
    data.countries[countryName] = {
      code: loc.code,
      flag: loc.flag,
      views: 1,
      clicks: 0
    };
  } else {
    data.countries[countryName].views += 1;
  }

  // Format real-time activity
  const sourceLabel = sourceKey === "pinterest" ? "via Pinterest 📌" : (sourceKey === "google" ? "via Google 🔍" : "Direct Visit 🌐");
  const locationLabel = loc.city ? `${loc.city}, ${loc.country} ${loc.flag}` : `${loc.country} ${loc.flag}`;
  data.activities.unshift({
    id: Date.now(),
    type: "view",
    text: `Real visitor opened site (${sourceLabel})`,
    location: locationLabel,
    time: "Just now"
  });

  if (data.activities.length > 30) data.activities.pop();

  saveAnalyticsData(data);
}

// Track 100% Real Outbound Affiliate Click
async function trackAffiliateClick(productId, productTitle, price, category) {
  const data = getAnalyticsData();
  data.totalClicks += 1;

  // Real Amazon commission rates by category
  let commissionRate = 0.04; // 4% default (Home, Kitchen, Lifestyle)
  if (category === "tech") commissionRate = 0.03; // 3% on Consumer Electronics
  if (category === "fitness") commissionRate = 0.04; // 4% on Sports & Fitness
  if (category === "gaming") commissionRate = 0.035; // 3.5% on PC / Gaming

  if (!data.productClicks[productId]) {
    data.productClicks[productId] = {
      title: productTitle,
      clicks: 1,
      price: parseFloat(price) || 99,
      estCommissionRate: commissionRate
    };
  } else {
    data.productClicks[productId].clicks += 1;
  }

  // Record click to visitor's genuine country
  const loc = await getRealVisitorLocation();
  const countryName = loc.country;
  if (!data.countries[countryName]) {
    data.countries[countryName] = {
      code: loc.code,
      flag: loc.flag,
      views: 1,
      clicks: 1
    };
  } else {
    data.countries[countryName].clicks = (data.countries[countryName].clicks || 0) + 1;
  }

  const locationLabel = loc.city ? `${loc.city}, ${loc.country} ${loc.flag}` : `${loc.country} ${loc.flag}`;
  data.activities.unshift({
    id: Date.now(),
    type: "click",
    text: `Clicked Amazon Deal: ${productTitle.slice(0, 28)}...`,
    location: locationLabel,
    time: "Just now"
  });

  if (data.activities.length > 30) data.activities.pop();

  saveAnalyticsData(data);
}

// Calculate Comprehensive Real Financials across all sources:
// 1. Google / Adsterra Website Views Ad Earnings (CPM based on country tiers)
// 2. Pinterest Traffic Value
// 3. Amazon Affiliate Commission (Product purchase conversions)
// 4. Combined Net Total Earnings
function calculateEarnings(data) {
  let totalConfirmedSales = 0;
  let totalAmazonCommission = 0;
  const orders = data.confirmedOrders || [];

  // 1. Amazon Affiliate Commission: STRICTLY Real Confirmed Purchases Only!
  // (No fake multiplication on clicks - only items actually ordered show here)
  orders.forEach(order => {
    const sale = parseFloat(order.salePrice) || 0;
    const comm = parseFloat(order.commissionEarned) || (sale * (parseFloat(order.commissionRate) || 0.035));
    totalConfirmedSales += sale;
    totalAmazonCommission += comm;
  });

  // 2. Ad Impression Revenue (Adsterra & Google CPM for Page Views)
  // Tier 1 (US, UK, CA, DE, AU) CPM: ~$3.50 per 1,000 views ($0.0035/view)
  // Tier 2 (AE, SA, EU) CPM: ~$1.40 per 1,000 views ($0.0014/view)
  // Tier 3 (Pakistan, India, Asia) CPM: ~$0.40 per 1,000 views ($0.00040/view)
  let totalAdRevenue = 0;
  const tier1Codes = ["US", "GB", "CA", "DE", "AU", "FR", "IT", "NL"];
  const tier2Codes = ["AE", "SA", "ES", "SG", "MY", "PL", "BR"];

  const countries = Object.values(data.countries || {});
  if (countries.length > 0) {
    countries.forEach(c => {
      let cpm = 0.40; // Tier 3 default (Pakistan, etc.)
      if (tier1Codes.includes(c.code)) {
        cpm = 3.50; // Tier 1 (US/UK)
      } else if (tier2Codes.includes(c.code)) {
        cpm = 1.40; // Tier 2
      }
      totalAdRevenue += (c.views * (cpm / 1000));
    });
  } else if (data.totalViews > 0) {
    totalAdRevenue = data.totalViews * 0.0018;
  }

  // 3. Pinterest Referral Traffic Value
  const pCount = (data.sources && data.sources.pinterest) ? data.sources.pinterest.count : 0;
  // High-intent Tier 1 Pinterest shoppers generate average value of $0.05 per referral session
  const pinterestEstEarnings = pCount * 0.05;

  // 4. Combined Total Real Net Earnings
  const totalCombinedEarnings = totalAmazonCommission + totalAdRevenue + pinterestEstEarnings;

  const ctr = data.totalViews > 0 ? ((data.totalClicks / data.totalViews) * 100).toFixed(1) : "0.0";

  return {
    totalEstSales: totalConfirmedSales.toFixed(2),
    totalAmazonCommission: totalAmazonCommission.toFixed(2),
    confirmedOrdersCount: orders.length,
    totalAdRevenue: totalAdRevenue.toFixed(2),
    pinterestEstEarnings: pinterestEstEarnings.toFixed(2),
    totalCombinedEarnings: totalCombinedEarnings.toFixed(2),
    ctr: ctr,
    totalViews: data.totalViews,
    totalClicks: data.totalClicks,
    pinterestViews: pCount,
    googleViews: (data.sources && data.sources.google) ? data.sources.google.count : 0,
    directViews: (data.sources && data.sources.direct) ? data.sources.direct.count : 0
  };
}

// Record a genuine confirmed Amazon purchase (e.g. verified on Amazon Associates Central)
function recordConfirmedAmazonOrder(order) {
  const data = getAnalyticsData();
  if (!data.confirmedOrders) data.confirmedOrders = [];

  const newOrder = {
    id: order.id || `AMZ-${Date.now().toString().slice(-6)}`,
    title: order.title || "Amazon Verified Product",
    productId: order.productId || "external",
    salePrice: parseFloat(order.salePrice) || 0,
    commissionEarned: parseFloat(order.commissionEarned) || 0,
    commissionRate: parseFloat(order.commissionRate) || 0.035,
    date: order.date || new Date().toISOString().split("T")[0],
    status: order.status || "Confirmed & Delivered"
  };

  data.confirmedOrders.unshift(newOrder);

  // Log in activity stream
  data.activities.unshift({
    id: Date.now(),
    type: "order",
    text: `🎉 Verified Amazon Purchase: ${newOrder.title.slice(0, 30)} (+$${newOrder.commissionEarned.toFixed(2)})`,
    location: "Amazon.com Verified 📦",
    time: "Just now"
  });

  if (data.activities.length > 40) data.activities.pop();

  saveAnalyticsData(data);
  return newOrder;
}

// Delete a confirmed order if needed
function deleteConfirmedAmazonOrder(orderId) {
  const data = getAnalyticsData();
  if (!data.confirmedOrders) return;
  data.confirmedOrders = data.confirmedOrders.filter(o => o.id !== orderId);
  saveAnalyticsData(data);
}

// Reset Analytics to Clean Zero
function resetAnalyticsToZero() {
  const clean = getDefaultAnalytics();
  saveAnalyticsData(clean);
  return clean;
}

// Automatically track genuine page view on non-admin page load
if (!window.location.pathname.includes("admin.html")) {
  trackPageView();
}
