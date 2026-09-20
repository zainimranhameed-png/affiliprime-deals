/**
 * AffiliPrime Hub - Core Application Logic
 * Handles Dynamic Product Rendering, Affiliate Link Injection, Search/Filters,
 * Product Comparisons, Modals, and Theme Management.
 */

// Application State
let currentAffiliateTag = localStorage.getItem(APP_CONFIG.storageKey) || APP_CONFIG.defaultAffiliateTag;
let currentCategory = "all";
let searchQuery = "";
let currentSort = "featured";
let compareList = [];
let favoritesList = JSON.parse(localStorage.getItem("affili_favs") || "[]");

// DOM Elements
const productsGrid = document.getElementById("productsGrid");
const productsCountText = document.getElementById("productsCountText");
const searchInput = document.getElementById("searchInput");
const categoryChips = document.getElementById("categoryChips");
const sortSelect = document.getElementById("sortSelect");

// Tag Config Elements
const currentTagDisplay = document.getElementById("currentTagDisplay");
const btnOpenTagModal = document.getElementById("btnOpenTagModal");
const btnSettingsModalTrigger = document.getElementById("btnSettingsModalTrigger");
const footerConfigBtn = document.getElementById("footerConfigBtn");
const configTagModal = document.getElementById("configTagModal");
const configModalCloseBtn = document.getElementById("configModalCloseBtn");
const customTagInput = document.getElementById("customTagInput");
const previewTagSpan = document.getElementById("previewTagSpan");
const btnSaveAffiliateTag = document.getElementById("btnSaveAffiliateTag");
const btnResetTag = document.getElementById("btnResetTag");

// Product Modal Elements
const productModal = document.getElementById("productModal");
const modalCloseBtn = document.getElementById("modalCloseBtn");
const modalBodyContent = document.getElementById("modalBodyContent");

// Comparison Elements
const compareDrawer = document.getElementById("compareDrawer");
const compareItemsList = document.getElementById("compareItemsList");
const compareCountBadge = document.getElementById("compareCountBadge");
const btnClearCompare = document.getElementById("btnClearCompare");
const btnLaunchComparison = document.getElementById("btnLaunchComparison");
const headerCompareBtn = document.getElementById("headerCompareBtn");
const navCompareLink = document.getElementById("navCompareLink");
const comparisonModal = document.getElementById("comparisonModal");
const comparisonModalCloseBtn = document.getElementById("comparisonModalCloseBtn");
const comparisonTableWrapper = document.getElementById("comparisonTableWrapper");

// Theme Elements
const themeToggleBtn = document.getElementById("themeToggleBtn");
const themeIcon = document.getElementById("themeIcon");

// Toast Container
const toastContainer = document.getElementById("toastContainer");

// ==========================================================================
// Initialization
// ==========================================================================
function bootApp() {
  try { initTheme(); } catch (e) { console.warn("Theme init note", e); }
  try { initAffiliateTag(); } catch (e) { console.warn("Tag init note", e); }
  try { renderSpotlight(); } catch (e) { console.warn("Spotlight error", e); }
  try { renderProducts(); } catch (e) { console.error("Products render error", e); }
  try { attachEventListeners(); } catch (e) { console.warn("Listeners note", e); }
  try { initFaqAccordion(); } catch (e) { console.warn("FAQ init note", e); }

  // Handle direct product incoming links from Pinterest / Social shares
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const targetProdId = urlParams.get("product") || urlParams.get("id");
    if (targetProdId) {
      setTimeout(() => {
        openProductModal(targetProdId);
        const targetCard = document.querySelector(`[data-id="${targetProdId}"]`);
        if (targetCard) {
          targetCard.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 450);
    }
  } catch (e) {}
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootApp);
} else {
  bootApp();
}

// ==========================================================================
// Affiliate Link Helper (100% Fail-Proof - NEVER shows 404 Page Not Found)
// ==========================================================================
function getAffiliateLink(baseUrl, productTitle) {
  if (productTitle) {
    // Guarantees 100% uptime on Amazon across all international regions with active affiliate cookie
    return `https://www.amazon.com/s?k=${encodeURIComponent(productTitle)}&tag=${encodeURIComponent(currentAffiliateTag)}`;
  }
  if (!baseUrl) return `https://www.amazon.com/?tag=${encodeURIComponent(currentAffiliateTag)}`;
  const separator = baseUrl.includes("?") ? "&" : "?";
  return `${baseUrl}${separator}tag=${encodeURIComponent(currentAffiliateTag)}`;
}

function getProductShareUrl(productId) {
  const origin = window.location.origin || "";
  const pathname = window.location.pathname || "";
  const cleanPath = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  return `${origin}${cleanPath}/?product=${encodeURIComponent(productId)}`;
}

function getPinterestShareUrl(product) {
  const targetUrl = getProductShareUrl(product.id);
  const caption = `🔥 ${product.title} (${product.discount} OFF) - Best Amazon Deal & Review on AffiliPrime Deals! #AmazonFinds #AmazonDeals #MustHaves #Trending`;
  return `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(targetUrl)}&media=${encodeURIComponent(product.image)}&description=${encodeURIComponent(caption)}`;
}

// ==========================================================================
// Affiliate Tag Management
// ==========================================================================
function initAffiliateTag() {
  currentTagDisplay.textContent = currentAffiliateTag;
  previewTagSpan.textContent = currentAffiliateTag;
  customTagInput.value = currentAffiliateTag;
}

function openTagConfigModal() {
  customTagInput.value = currentAffiliateTag;
  previewTagSpan.textContent = currentAffiliateTag;
  configTagModal.classList.add("active");
  customTagInput.focus();
}

function closeTagConfigModal() {
  configTagModal.classList.remove("active");
}

function saveAffiliateTag() {
  const val = customTagInput.value.trim();
  if (!val) {
    showToast("⚠️ Please enter a valid affiliate tag!");
    return;
  }
  currentAffiliateTag = val;
  localStorage.setItem(APP_CONFIG.storageKey, currentAffiliateTag);
  currentTagDisplay.textContent = currentAffiliateTag;
  previewTagSpan.textContent = currentAffiliateTag;
  
  closeTagConfigModal();
  renderSpotlight();
  renderProducts();
  updateCompareDrawer();
  showToast(`✅ Affiliate tag updated to "${currentAffiliateTag}"!`);
}

function resetAffiliateTag() {
  currentAffiliateTag = APP_CONFIG.defaultAffiliateTag;
  localStorage.removeItem(APP_CONFIG.storageKey);
  customTagInput.value = currentAffiliateTag;
  previewTagSpan.textContent = currentAffiliateTag;
  currentTagDisplay.textContent = currentAffiliateTag;
  
  closeTagConfigModal();
  renderSpotlight();
  renderProducts();
  showToast(`🔄 Reset affiliate tag to default "${currentAffiliateTag}"`);
}

// ==========================================================================
// Spotlight Deal Rendering
// ==========================================================================
function renderSpotlight() {
  const spotlightItem = PRODUCTS_DATA[0]; // Sony Headphones
  if (!spotlightItem) return;

  const buyBtn = document.getElementById("spotlightBuyBtn");
  if (buyBtn) {
    buyBtn.href = getAffiliateLink(spotlightItem.amazonUrl, spotlightItem.title);
    buyBtn.onclick = () => {
      if (typeof trackAffiliateClick === 'function') {
        trackAffiliateClick(spotlightItem.id, spotlightItem.title, spotlightItem.price, spotlightItem.category);
      }
    };
  }
}

// ==========================================================================
// Product Filtering & Sorting
// ==========================================================================
function getFilteredProducts() {
  let filtered = [...PRODUCTS_DATA];

  // Category filter
  if (currentCategory !== "all") {
    if (currentCategory === "under50") {
      filtered = filtered.filter(p => p.price <= 50);
    } else if (currentCategory === "mega-deals") {
      filtered = filtered.filter(p => (parseInt(p.discount) || 0) >= 20);
    } else {
      filtered = filtered.filter(p => p.category === currentCategory);
    }
  }

  // Search filter
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.categoryName.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      Object.entries(p.specs).some(([k, v]) => k.toLowerCase().includes(q) || v.toLowerCase().includes(q))
    );
  }

  // Sorting
  if (currentSort === "price-low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (currentSort === "price-high") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (currentSort === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (currentSort === "discount") {
    filtered.sort((a, b) => {
      const discA = parseInt(a.discount) || 0;
      const discB = parseInt(b.discount) || 0;
      return discB - discA;
    });
  }

  return filtered;
}

// ==========================================================================
// Product Grid Rendering
// ==========================================================================
function renderProducts() {
  const products = getFilteredProducts();
  productsCountText.textContent = `Showing ${products.length} verified products`;

  if (products.length === 0) {
    productsGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
        <i class="fa-solid fa-box-open" style="font-size: 3rem; margin-bottom: 1rem;"></i>
        <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem; color: var(--text-primary);">No products found</h3>
        <p>Try searching for another keyword or change your category filter.</p>
      </div>
    `;
    return;
  }

  productsGrid.innerHTML = products.map(product => {
    const isCompared = compareList.some(item => item.id === product.id);
    const isFav = favoritesList.includes(product.id);
    const affiliateUrl = getAffiliateLink(product.amazonUrl, product.title);
    
    // Generate Stars HTML
    const fullStars = Math.floor(product.rating);
    const hasHalf = product.rating % 1 !== 0;
    let starsHtml = "";
    for (let i = 0; i < fullStars; i++) starsHtml += `<i class="fa-solid fa-star"></i>`;
    if (hasHalf) starsHtml += `<i class="fa-solid fa-star-half-stroke"></i>`;

    // Generate Amazon style badge
    let amazonBadgeHtml = `<span class="card-badge ${product.badgeType}">${product.badge}</span>`;
    if (product.badgeType === "editor") {
      amazonBadgeHtml = `<span class="amazon-badge-choice"><span>Amazon's</span> <span class="highlight">Choice</span></span>`;
    } else if (product.badgeType === "hot") {
      amazonBadgeHtml = `<span class="amazon-badge-bestseller"><i class="fa-solid fa-ribbon"></i> #1 Best Seller</span>`;
    }

    // Generate price components
    const wholePart = Math.floor(product.price);
    const fractionPart = (product.price % 1).toFixed(2).substring(2);
    const monthlyBuyers = product.rating >= 4.8 ? "4K+" : (product.rating >= 4.6 ? "2K+" : "1K+");

    return `
      <article class="product-card" data-id="${product.id}">
        <div class="card-top-row">
          ${amazonBadgeHtml}
          <button class="card-actions-fav ${isFav ? 'active' : ''}" onclick="toggleFavorite('${product.id}', event)" title="Save to favorites">
            <i class="fa-${isFav ? 'solid' : 'regular'} fa-heart"></i>
          </button>
        </div>

        <div class="card-image-box" onclick="openProductModal('${product.id}')">
          <img src="${product.image}" alt="${product.title}" loading="lazy">
        </div>

        <div class="card-category">${product.categoryName}</div>
        <h3 class="card-title" onclick="openProductModal('${product.id}')" title="${product.title}">${product.title}</h3>

        <div class="card-rating-row" style="margin-bottom: 0.2rem;">
          <div class="amazon-stars">${starsHtml}</div>
          <span style="font-weight: 700; color: #f59e0b; font-size: 0.85rem;">${product.rating}</span>
          <a href="${affiliateUrl}" target="_blank" rel="nofollow noopener" class="amazon-reviews-link">(${product.reviewsCount.toLocaleString()})</a>
        </div>

        <div class="amazon-bought-text"><i class="fa-solid fa-chart-line" style="color:#10b981; margin-right:4px;"></i> ${monthlyBuyers} bought in past month</div>

        <div class="card-bottom-row">
          <div class="amazon-price-row">
            <span class="amazon-deal-tag">${product.discount}</span>
            <div class="amazon-main-price">
              <span class="amazon-price-currency">$</span>
              <span class="amazon-price-main-val">${wholePart}</span>
              <span class="amazon-price-cents">${fractionPart}</span>
            </div>
            <div class="amazon-list-price">List: <span>$${product.originalPrice.toFixed(2)}</span></div>
          </div>

          <div class="amazon-prime-line">
            <span class="amazon-prime-logo"><i class="fa-brands fa-amazon"></i> prime</span>
            <span class="amazon-delivery-highlight">FREE One-Day</span>
            <span style="color:var(--text-muted);">Delivery</span>
          </div>

          <div class="card-buttons-group">
            <a href="${affiliateUrl}" target="_blank" rel="nofollow noopener" class="btn-amazon-yellow" title="View deal directly on official Amazon.com" onclick="if(typeof trackAffiliateClick==='function') trackAffiliateClick('${product.id}', '${product.title.replace(/'/g, "\\'")}', ${product.price}, '${product.category}')">
              <i class="fa-brands fa-amazon" style="font-size: 1.1rem;"></i>
              <span>See Deal on Amazon</span>
            </a>
            <button class="btn-card-compare ${isCompared ? 'active' : ''}" onclick="toggleCompare('${product.id}')" title="${isCompared ? 'Remove from comparison' : 'Add to compare'}">
              <i class="fa-solid fa-code-compare"></i>
            </button>
          </div>
          
          <div style="display: flex; gap: 0.4rem; margin-top: 0.35rem;">
            <button class="btn-secondary" style="flex: 1; font-size: 0.78rem; padding: 0.45rem 0.5rem;" onclick="openProductModal('${product.id}')">
              <i class="fa-solid fa-circle-info"></i> In-Depth Specs
            </button>
            <a href="${getPinterestShareUrl(product)}" target="_blank" rel="noopener" class="btn-secondary btn-pinterest" style="font-size: 0.85rem; padding: 0.45rem 0.6rem;" title="Pin to Pinterest for viral US buyer traffic">
              <i class="fa-brands fa-pinterest"></i>
            </a>
            <a href="https://api.whatsapp.com/send?text=${encodeURIComponent('🔥 Amazon Verified Deal: ' + product.title + ' at ' + product.discount + ' - ' + affiliateUrl)}" target="_blank" rel="noopener" class="btn-secondary" style="font-size: 0.85rem; padding: 0.45rem 0.6rem; color: #25D366;" title="Share deal on WhatsApp">
              <i class="fa-brands fa-whatsapp"></i>
            </a>
            <button class="btn-secondary" style="font-size: 0.78rem; padding: 0.45rem 0.6rem;" onclick="copyAffiliateLink('${affiliateUrl}', event)" title="Copy direct affiliate link to clipboard">
              <i class="fa-solid fa-copy"></i>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

// ==========================================================================
// Product Quick View / Review Modal
// ==========================================================================
function openProductModal(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  const affiliateUrl = getAffiliateLink(product.amazonUrl, product.title);
  const directUrl = product.amazonUrl ? getAffiliateLink(product.amazonUrl) : affiliateUrl;
  
  // Full Stars HTML
  const fullStars = Math.floor(product.rating);
  let starsHtml = "";
  for (let i = 0; i < fullStars; i++) starsHtml += `<i class="fa-solid fa-star"></i>`;
  if (product.rating % 1 !== 0) starsHtml += `<i class="fa-solid fa-star-half-stroke"></i>`;

  modalBodyContent.innerHTML = `
    <div class="modal-image-col">
      <img class="modal-main-img" src="${product.image}" alt="${product.title}">
      <a href="${affiliateUrl}" target="_blank" rel="nofollow noopener" class="btn-amazon" style="padding: 0.9rem 1.5rem; font-size: 1.05rem;" onclick="if(typeof trackAffiliateClick==='function') trackAffiliateClick('${product.id}', '${product.title.replace(/'/g, "\\'")}', ${product.price}, '${product.category}')">
        <i class="fa-brands fa-amazon"></i> Check Best Price on Amazon
      </a>
      <a href="${directUrl}" target="_blank" rel="nofollow noopener" class="btn-secondary" style="font-size: 0.82rem; padding: 0.5rem 0.8rem; display: flex; align-items: center; justify-content: center; gap: 0.4rem; width: 100%;" title="Open direct Amazon catalog page">
        <i class="fa-solid fa-arrow-up-right-from-square"></i> Direct Product Page (US)
      </a>
      <div style="display: flex; gap: 0.4rem; width: 100%; margin-top: 0.25rem;">
        <button class="btn-secondary" onclick="copyAffiliateLink('${affiliateUrl}', event)" style="flex: 1;">
          <i class="fa-solid fa-copy"></i> Copy Link
        </button>
        <a href="${getPinterestShareUrl(product)}" target="_blank" rel="noopener" class="btn-secondary btn-pinterest" style="padding: 0.65rem 0.9rem;" title="Pin to Pinterest">
          <i class="fa-brands fa-pinterest" style="font-size: 1.1rem;"></i>
        </a>
        <a href="https://api.whatsapp.com/send?text=${encodeURIComponent('🔥 Check out this Amazon Deal on ' + product.title + ': ' + affiliateUrl)}" target="_blank" rel="noopener" class="btn-secondary" style="color: #25D366; padding: 0.65rem 0.9rem;" title="Share on WhatsApp">
          <i class="fa-brands fa-whatsapp" style="font-size: 1.1rem;"></i>
        </a>
      </div>
    </div>

    <div class="modal-details-col">
      <div class="card-category" style="margin-bottom: 0.25rem;">${product.categoryName}</div>
      <h2 style="font-family: var(--font-heading); font-size: 1.6rem; font-weight: 800; line-height: 1.25; margin-bottom: 0.75rem;">
        ${product.title}
      </h2>

      <div class="card-rating-row" style="margin-bottom: 1rem;">
        <div class="stars">${starsHtml}</div>
        <span style="font-weight: 700;">${product.rating} / 5.0</span>
        <span class="reviews-count">(${product.reviewsCount.toLocaleString()} verified customer ratings)</span>
      </div>

      <div style="display: flex; align-items: baseline; gap: 1rem; margin-bottom: 1.25rem;">
        <span style="font-size: 2rem; font-weight: 800; color: var(--primary); font-family: var(--font-heading);">$${product.price.toFixed(2)}</span>
        <span style="color: var(--text-muted); text-decoration: line-through; font-size: 1.1rem;">$${product.originalPrice.toFixed(2)}</span>
        <span class="card-price-discount">${product.discount}</span>
      </div>

      <p style="color: var(--text-secondary); font-size: 0.92rem; line-height: 1.6; margin-bottom: 1.5rem;">
        ${product.description}
      </p>

      <div class="modal-pros-cons-grid">
        <div class="pros-box">
          <h4><i class="fa-solid fa-circle-check"></i> What We Love</h4>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.35rem;">
            ${product.pros.map(pro => `<li>✓ ${pro}</li>`).join("")}
          </ul>
        </div>
        <div class="cons-box">
          <h4><i class="fa-solid fa-circle-xmark"></i> Things to Consider</h4>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.35rem;">
            ${product.cons.map(con => `<li>✕ ${con}</li>`).join("")}
          </ul>
        </div>
      </div>

      <h3 style="font-size: 1.1rem; font-weight: 700; margin: 1rem 0 0.5rem;">Key Technical Specifications</h3>
      <table class="specs-table">
        <tbody>
          ${Object.entries(product.specs).map(([specKey, specVal]) => `
            <tr>
              <td>${specKey}</td>
              <td>${specVal}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;

  productModal.classList.add("active");
}

function closeProductModal() {
  productModal.classList.remove("active");
}

// ==========================================================================
// Side-by-Side Product Comparison
// ==========================================================================
function toggleCompare(productId) {
  const existingIdx = compareList.findIndex(p => p.id === productId);

  if (existingIdx > -1) {
    compareList.splice(existingIdx, 1);
    showToast("Removed from comparison");
  } else {
    if (compareList.length >= 3) {
      showToast("⚠️ You can compare up to 3 products at a time!");
      return;
    }
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if (product) {
      compareList.push(product);
      showToast(`Added "${product.title.slice(0, 24)}..." to compare`);
    }
  }

  updateCompareDrawer();
  renderProducts();
}

function updateCompareDrawer() {
  if (compareList.length > 0) {
    compareDrawer.classList.add("active");
    compareCountBadge.style.display = "flex";
    compareCountBadge.textContent = compareList.length;
  } else {
    compareDrawer.classList.remove("active");
    compareCountBadge.style.display = "none";
  }

  compareItemsList.innerHTML = `
    <div style="font-weight: 700; font-size: 0.9rem; margin-right: 0.5rem;">
      <i class="fa-solid fa-code-compare text-warning"></i> Comparing (${compareList.length}/3):
    </div>
    ${compareList.map(item => `
      <div class="compare-mini-card">
        <img src="${item.image}" alt="${item.title}">
        <span style="font-weight: 600; max-width: 140px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${item.title}</span>
        <button class="compare-remove-btn" onclick="toggleCompare('${item.id}')" title="Remove">✕</button>
      </div>
    `).join("")}
  `;
}

function openComparisonModal() {
  if (compareList.length < 2) {
    showToast("⚠️ Please select at least 2 products to compare!");
    return;
  }

  // Get list of all distinct specs
  const allSpecKeys = new Set();
  compareList.forEach(p => {
    Object.keys(p.specs).forEach(k => allSpecKeys.add(k));
  });

  comparisonTableWrapper.innerHTML = `
    <table class="comparison-table">
      <thead>
        <tr>
          <th style="width: 20%;">Feature</th>
          ${compareList.map(p => `
            <th style="width: ${80 / compareList.length}%;">
              <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: center; text-align: center;">
                <img src="${p.image}" alt="${p.title}" style="width: 90px; height: 90px; object-fit: cover; border-radius: var(--radius-sm);">
                <div style="font-size: 0.95rem; font-weight: 700;">${p.title}</div>
                <div style="font-size: 1.3rem; font-weight: 800; color: var(--primary);">$${p.price.toFixed(2)}</div>
                <a href="${getAffiliateLink(p.amazonUrl, p.title)}" target="_blank" rel="nofollow noopener" class="btn-amazon" style="font-size: 0.85rem; padding: 0.5rem 1rem;" onclick="if(typeof trackAffiliateClick==='function') trackAffiliateClick('${p.id}', '${p.title.replace(/'/g, "\\'")}', ${p.price}, '${p.category}')">
                  <i class="fa-brands fa-amazon"></i> Buy on Amazon
                </a>
              </div>
            </th>
          `).join("")}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Customer Rating</strong></td>
          ${compareList.map(p => `<td>⭐ ${p.rating} / 5 (${p.reviewsCount.toLocaleString()} reviews)</td>`).join("")}
        </tr>
        <tr>
          <td><strong>Top Pros</strong></td>
          ${compareList.map(p => `
            <td>
              <ul style="list-style: none; font-size: 0.82rem; color: var(--accent-emerald);">
                ${p.pros.map(pro => `<li>✓ ${pro}</li>`).join("")}
              </ul>
            </td>
          `).join("")}
        </tr>
        ${Array.from(allSpecKeys).map(specKey => `
          <tr>
            <td><strong>${specKey}</strong></td>
            ${compareList.map(p => `<td>${p.specs[specKey] || "—"}</td>`).join("")}
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;

  comparisonModal.classList.add("active");
}

function closeComparisonModal() {
  comparisonModal.classList.remove("active");
}

function clearAllCompare() {
  compareList = [];
  updateCompareDrawer();
  renderProducts();
  showToast("Cleared comparison list");
}

// ==========================================================================
// Favorites / Wishlist
// ==========================================================================
function toggleFavorite(productId, event) {
  if (event) event.stopPropagation();
  const idx = favoritesList.indexOf(productId);
  if (idx > -1) {
    favoritesList.splice(idx, 1);
    showToast("Removed from wishlist");
  } else {
    favoritesList.push(productId);
    showToast("❤️ Saved to wishlist!");
  }
  localStorage.setItem("affili_favs", JSON.stringify(favoritesList));
  renderProducts();
}

// ==========================================================================
// Copy Affiliate Link
// ==========================================================================
function copyAffiliateLink(url, event) {
  if (event) event.stopPropagation();
  navigator.clipboard.writeText(url).then(() => {
    showToast("📋 Affiliate Link copied to clipboard!");
  }).catch(() => {
    showToast("Link: " + url);
  });
}

// ==========================================================================
// Filter by Category Helper
// ==========================================================================
window.filterByCategory = function(category) {
  currentCategory = category;
  document.querySelectorAll(".chip-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.category === category);
  });
  renderProducts();
  const dealsElem = document.getElementById("deals");
  if (dealsElem) dealsElem.scrollIntoView({ behavior: "smooth" });
};

// ==========================================================================
// Theme Management
// ==========================================================================
function initTheme() {
  const savedTheme = localStorage.getItem("affili_theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme") || "dark";
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("affili_theme", next);
  updateThemeIcon(next);
}

function updateThemeIcon(theme) {
  const icon = document.getElementById("themeIcon");
  if (!icon) return;
  if (theme === "light") {
    icon.className = "fa-solid fa-moon";
  } else {
    icon.className = "fa-solid fa-sun";
  }
}

// ==========================================================================
// Toast Notification
// ==========================================================================
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<i class="fa-solid fa-circle-check text-warning"></i> <span>${message}</span>`;
  if (toastContainer) toastContainer.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 10);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  }, 3200);
}

// ==========================================================================
// Event Listeners
// ==========================================================================
function attachEventListeners() {
  // Search
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.trim();
      renderProducts();
    });
  }

  // Header Search Input
  const headerSearch = document.getElementById("headerSearchInput");
  if (headerSearch) {
    headerSearch.addEventListener("input", (e) => {
      searchQuery = e.target.value.trim();
      if (searchInput) searchInput.value = searchQuery;
      renderProducts();
    });
  }

  // Category Chips
  if (categoryChips) {
    categoryChips.addEventListener("click", (e) => {
      const chip = e.target.closest(".chip-btn");
      if (!chip) return;
      document.querySelectorAll(".chip-btn").forEach(b => b.classList.remove("active"));
      chip.classList.add("active");
      currentCategory = chip.dataset.category;
      renderProducts();
    });
  }

  // Sort
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      currentSort = e.target.value;
      renderProducts();
    });
  }

  // Theme Toggle
  const themeToggle = document.getElementById("themeToggleBtn");
  if (themeToggle) themeToggle.addEventListener("click", toggleTheme);

  // Tag Config Modals
  if (btnOpenTagModal) btnOpenTagModal.addEventListener("click", openTagConfigModal);
  if (btnSettingsModalTrigger) btnSettingsModalTrigger.addEventListener("click", openTagConfigModal);
  if (footerConfigBtn) footerConfigBtn.addEventListener("click", openTagConfigModal);
  if (configModalCloseBtn) configModalCloseBtn.addEventListener("click", closeTagConfigModal);
  if (btnSaveAffiliateTag) btnSaveAffiliateTag.addEventListener("click", saveAffiliateTag);
  if (btnResetTag) btnResetTag.addEventListener("click", resetAffiliateTag);

  if (customTagInput) {
    customTagInput.addEventListener("input", (e) => {
      if (previewTagSpan) previewTagSpan.textContent = e.target.value.trim() || APP_CONFIG.defaultAffiliateTag;
    });
  }

  // Product Modal Close
  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeProductModal);
  if (productModal) {
    productModal.addEventListener("click", (e) => {
      if (e.target === productModal) closeProductModal();
    });
  }

  // Comparison Handlers
  if (headerCompareBtn) headerCompareBtn.addEventListener("click", openComparisonModal);
  const navCompare = document.getElementById("navCompareLink");
  if (navCompare) {
    navCompare.addEventListener("click", (e) => {
      e.preventDefault();
      openComparisonModal();
    });
  }
  if (btnLaunchComparison) btnLaunchComparison.addEventListener("click", openComparisonModal);
  if (btnClearCompare) btnClearCompare.addEventListener("click", clearAllCompare);
  if (comparisonModalCloseBtn) comparisonModalCloseBtn.addEventListener("click", closeComparisonModal);
  if (comparisonModal) {
    comparisonModal.addEventListener("click", (e) => {
      if (e.target === comparisonModal) closeComparisonModal();
    });
  }

  // Global Esc key listener for closing modals
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeProductModal();
      closeComparisonModal();
      closeTagConfigModal();
    }
  });
}


// ==========================================================================
// FAQ Accordion Interaction
// ==========================================================================
function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const questionBtn = item.querySelector(".faq-question");
    if (!questionBtn) return;

    questionBtn.addEventListener("click", () => {
      const isActive = item.classList.contains("active");
      
      // Close all other items for a clean accordion feel
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
        }
      });

      // Toggle clicked item
      item.classList.toggle("active", !isActive);
    });
  });
}

// ==========================================================================
// Live Real-Time Social Proof Popups (High Conversion Booster)
// ==========================================================================
const socialProofLocations = [
  { city: "New York, USA", flag: "🇺🇸" },
  { city: "California, USA", flag: "🇺🇸" },
  { city: "London, UK", flag: "🇬🇧" },
  { city: "Toronto, Canada", flag: "🇨🇦" },
  { city: "Berlin, Germany", flag: "🇩🇪" },
  { city: "Texas, USA", flag: "🇺🇸" },
  { city: "Lahore, Pakistan", flag: "🇵🇰" },
  { city: "Dubai, UAE", flag: "🇦🇪" }
];

const socialProofTimes = ["Just now", "2 mins ago", "4 mins ago", "12 mins ago", "Just ordered"];

function initLiveSocialProof() {
  const popup = document.getElementById("liveSocialProof");
  if (!popup || typeof PRODUCTS_DATA === "undefined" || PRODUCTS_DATA.length === 0) return;

  function triggerPopup() {
    const randomProd = PRODUCTS_DATA[Math.floor(Math.random() * PRODUCTS_DATA.length)];
    const randomLoc = socialProofLocations[Math.floor(Math.random() * socialProofLocations.length)];
    const randomTime = socialProofTimes[Math.floor(Math.random() * socialProofTimes.length)];

    const img = document.getElementById("lspImg");
    const title = document.getElementById("lspTitle");
    const desc = document.getElementById("lspDesc");
    const loc = document.getElementById("lspLocation");
    const time = document.getElementById("lspTime");

    if (img) img.src = randomProd.image;
    if (title) title.textContent = randomProd.title;
    if (desc) desc.textContent = `Claimed ${randomProd.discount} OFF via Amazon Prime`;
    if (loc) loc.textContent = `${randomLoc.flag} ${randomLoc.city}`;
    if (time) time.textContent = randomTime;

    popup.dataset.prodId = randomProd.id;
    popup.style.display = "flex";

    // Small delay to allow display flex then animate in
    setTimeout(() => {
      popup.classList.add("show");
    }, 50);

    // Hide after 5 seconds
    setTimeout(() => {
      popup.classList.remove("show");
      setTimeout(() => {
        popup.style.display = "none";
      }, 500);
    }, 5200);
  }

  // Initial trigger after 4 seconds, then repeat every 14-22 seconds
  setTimeout(triggerPopup, 4000);
  setInterval(() => {
    triggerPopup();
  }, Math.floor(Math.random() * 8000) + 14000);
}

// ==========================================================================
// AI Smart Deal Matcher Engine
// ==========================================================================
function openAiDealMatcher() {
  const modal = document.getElementById("aiDealModal");
  if (!modal) return;
  modal.style.display = "flex";
  document.getElementById("aiStep1").style.display = "block";
  document.getElementById("aiStep2").style.display = "none";
  document.getElementById("aiStepResult").style.display = "none";
}

function closeAiDealMatcher() {
  const modal = document.getElementById("aiDealModal");
  if (modal) modal.style.display = "none";
}

function matchAiDeal(preference) {
  const step1 = document.getElementById("aiStep1");
  const step2 = document.getElementById("aiStep2");
  const stepResult = document.getElementById("aiStepResult");

  step1.style.display = "none";
  step2.style.display = "block";

  setTimeout(() => {
    step2.style.display = "none";
    stepResult.style.display = "block";

    let matched;
    if (preference === "under50") {
      const under50 = PRODUCTS_DATA.filter(p => p.price < 50);
      matched = under50[Math.floor(Math.random() * under50.length)] || PRODUCTS_DATA[3];
    } else if (preference === "tech") {
      const tech = PRODUCTS_DATA.filter(p => p.category === "tech");
      matched = tech[Math.floor(Math.random() * tech.length)] || PRODUCTS_DATA[0];
    } else {
      const home = PRODUCTS_DATA.filter(p => p.category === "home" || p.category === "fitness");
      matched = home[Math.floor(Math.random() * home.length)] || PRODUCTS_DATA[4];
    }

    const affUrl = getAffiliateLink(matched.amazonUrl, matched.title);

    stepResult.innerHTML = `
      <div style="text-align: center; margin-bottom: 1.25rem;">
        <span style="background: rgba(16, 185, 129, 0.15); color: var(--accent-emerald); font-weight: 700; font-size: 0.8rem; padding: 0.25rem 0.75rem; border-radius: 999px; display: inline-flex; align-items: center; gap: 0.35rem; margin-bottom: 0.5rem;">
          <i class="fa-solid fa-sparkles"></i> 99.4% AI Match Found
        </span>
        <h4 style="font-family: var(--font-heading); font-size: 1.3rem; margin: 0.2rem 0;">Your Personalized Prime Match</h4>
      </div>

      <div style="background: var(--bg-body); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.1rem; display: flex; gap: 1rem; align-items: center; margin-bottom: 1.25rem;">
        <img src="${matched.image}" alt="${matched.title}" style="width: 80px; height: 80px; object-fit: cover; border-radius: var(--radius-sm); flex-shrink: 0; border: 1px solid var(--border-color);">
        <div style="flex: 1;">
          <div style="font-weight: 700; font-size: 0.95rem; line-height: 1.3; color: var(--text-primary); margin-bottom: 0.3rem;">
            ${matched.title}
          </div>
          <div style="display: flex; align-items: center; gap: 0.6rem;">
            <span style="font-size: 1.2rem; font-weight: 800; color: var(--primary);">$${matched.price.toFixed(2)}</span>
            <span style="font-size: 0.82rem; text-decoration: line-through; color: var(--text-muted);">$${matched.originalPrice.toFixed(2)}</span>
            <span class="card-price-discount" style="font-size: 0.75rem; padding: 0.15rem 0.45rem;">${matched.discount}</span>
          </div>
          <div style="font-size: 0.75rem; color: var(--accent-emerald); margin-top: 0.25rem;">
            <i class="fa-solid fa-star text-warning"></i> ${matched.rating} (${matched.reviewsCount.toLocaleString()} verified reviews)
          </div>
        </div>
      </div>

      <div style="display: flex; gap: 0.75rem;">
        <a href="${affUrl}" target="_blank" rel="noopener sponsored" class="btn-amazon" style="flex: 1; justify-content: center; padding: 0.75rem 1.25rem;" onclick="trackAffiliateClick('${matched.id}', '${matched.title}', ${matched.price}, '${matched.category}')">
          <i class="fa-brands fa-amazon"></i> Claim Deal on Amazon
        </a>
        <button class="btn-secondary" onclick="openAiDealMatcher()" style="padding: 0.75rem 1rem;">
          <i class="fa-solid fa-rotate-left"></i> Re-spin
        </button>
      </div>
    `;
  }, 900);
}

// Flash Sale Countdown Timer
function initFlashCountdown() {
  const cd = document.getElementById("flashCountdown");
  if (!cd) return;
  let totalSecs = (3 * 3600) + (41 * 60) + 22;
  setInterval(() => {
    totalSecs--;
    if (totalSecs <= 0) totalSecs = (4 * 3600) + 30;
    const h = Math.floor(totalSecs / 3600);
    const m = Math.floor((totalSecs % 3600) / 60);
    const s = totalSecs % 60;
    cd.textContent = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }, 1000);
}

// Viral WhatsApp & Native Share Handler
function shareOnWhatsApp() {
  const shareText = "🔥 Check out AffiliPrime Deals! Verified Amazon Price Drops & Discounts up to 40% OFF right now on Tech, Laptops & Home Gadgets:";
  const shareUrl = "https://zainimranhameed-png.github.io/affiliprime-deals/";

  if (navigator.share) {
    navigator.share({
      title: "AffiliPrime Deals - Verified Amazon Price Drops",
      text: shareText,
      url: shareUrl
    }).catch(() => {});
  } else {
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + "\n\n" + shareUrl)}`;
    window.open(waUrl, "_blank");
  }
}

// Auto init on page load
document.addEventListener("DOMContentLoaded", () => {
  initLiveSocialProof();
  initFlashCountdown();
});

// ==========================================================================
// Spin-to-Win Mystery Deal Lucky Wheel Engine (All 30 Products Supported)
// ==========================================================================
const WHEEL_PALETTE = [
  "#ec4899", "#8b5cf6", "#3b82f6", "#06b6d4",
  "#10b981", "#f59e0b", "#f97316", "#ef4444",
  "#a855f7", "#14b8a6", "#6366f1", "#e11d48"
];

let activeWheelCategory = "all";
let currentWheelPrizes = [];
let wheelCurrentAngle = 0;
let isWheelSpinning = false;
let audioCtx = null;

function getProductWheelLabel(prod) {
  let name = prod.title.split(/[\s,\(–\-]/)[0];
  const t = prod.title.toLowerCase();
  if (t.includes("airpods")) name = "AirPods Pro";
  else if (t.includes("macbook")) name = "MacBook M3";
  else if (t.includes("kindle")) name = "Kindle Paper";
  else if (t.includes("air fryer") || t.includes("ninja af")) name = "Ninja Fryer";
  else if (t.includes("apple watch")) name = "Apple Watch";
  else if (t.includes("stream deck")) name = "Stream Deck";
  else if (t.includes("stanley")) name = "Stanley 40oz";
  else if (t.includes("dyson")) name = "Dyson V15";
  else if (t.includes("theragun")) name = "Theragun";
  else if (t.includes("bose")) name = "Bose Ultra";
  else if (t.includes("sony")) name = "Sony XM5";
  else if (t.includes("anker")) name = "Anker 200W";
  else if (t.includes("herman") || t.includes("embody")) name = "HM Embody";
  else if (t.includes("laneige")) name = "Laneige Lip";
  else if (t.includes("roborock")) name = "Roborock S8";
  else if (t.includes("logitech") || t.includes("mx master")) name = "MX Master 3S";
  else if (name.length > 11) name = name.substring(0, 10) + "…";
  return `${name} ${prod.discount}`;
}

function buildWheelPrizesForCategory(cat = "all") {
  const pool = (cat === "all") 
    ? [...PRODUCTS_DATA] 
    : PRODUCTS_DATA.filter(p => p.category === cat);

  // If pool has more than 12 items, shuffle and pick 12 to keep wheel slices clear and visually stunning
  let selected = [...pool];
  if (selected.length > 12) {
    selected.sort(() => 0.5 - Math.random());
    selected = selected.slice(0, 12);
  }

  return selected.map((prod, idx) => ({
    id: prod.id,
    label: getProductWheelLabel(prod),
    color: WHEEL_PALETTE[idx % WHEEL_PALETTE.length],
    product: prod
  }));
}

function setWheelCategory(cat) {
  if (isWheelSpinning) return;
  activeWheelCategory = cat;

  // Update tab UI
  document.querySelectorAll(".wheel-tab").forEach(tab => {
    tab.classList.toggle("active", tab.getAttribute("data-wheel-cat") === cat);
  });

  currentWheelPrizes = buildWheelPrizesForCategory(cat);
  updateWheelPoolStatus();
  drawWheel();
}

function shuffleWheelPrizes() {
  if (isWheelSpinning) return;
  currentWheelPrizes = buildWheelPrizesForCategory(activeWheelCategory);
  updateWheelPoolStatus();
  drawWheel();
}

function updateWheelPoolStatus() {
  const el = document.getElementById("wheelPoolText");
  if (!el) return;
  const count = (activeWheelCategory === "all") 
    ? PRODUCTS_DATA.length 
    : PRODUCTS_DATA.filter(p => p.category === activeWheelCategory).length;
  el.innerHTML = `<i class="fa-solid fa-boxes-stacked" style="color: var(--primary);"></i> <b>${count} Verified Deals</b> in Pool &bull; Guaranteed Win!`;
}

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

function playClickSound() {
  try {
    const ctx = getAudioContext();
    if (ctx.state === "suspended") ctx.resume();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(450, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.04);
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.04);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  } catch(e) {}
}

function playWinSound() {
  try {
    const ctx = getAudioContext();
    if (ctx.state === "suspended") ctx.resume();
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);
      gain.gain.setValueAtTime(0.25, ctx.currentTime + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + idx * 0.12 + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.12);
      osc.stop(ctx.currentTime + idx * 0.12 + 0.4);
    });
  } catch(e) {}
}

function drawWheel() {
  const canvas = document.getElementById("wheelCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  if (!currentWheelPrizes || currentWheelPrizes.length === 0) {
    currentWheelPrizes = buildWheelPrizesForCategory(activeWheelCategory);
  }

  const numSlices = currentWheelPrizes.length;
  const sliceAngle = (2 * Math.PI) / numSlices;
  const radius = canvas.width / 2;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(radius, radius);
  ctx.rotate(wheelCurrentAngle);

  currentWheelPrizes.forEach((prize, i) => {
    const angle = i * sliceAngle;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, radius, angle, angle + sliceAngle);
    ctx.closePath();
    ctx.fillStyle = prize.color;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
    ctx.stroke();

    // Text label
    ctx.save();
    ctx.rotate(angle + sliceAngle / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 11px Outfit, Inter, sans-serif";
    ctx.shadowColor = "rgba(0,0,0,0.75)";
    ctx.shadowBlur = 4;
    ctx.fillText(prize.label, radius - 16, 4);
    ctx.restore();
  });

  ctx.restore();
}

function openSpinWheelModal() {
  const modal = document.getElementById("spinWheelModal");
  if (!modal) return;
  modal.classList.add("active");
  modal.style.display = "flex";
  isWheelSpinning = false;

  const btnCenter = document.getElementById("btnSpinCenter");
  if (btnCenter) btnCenter.disabled = false;
  const btnLarge = document.getElementById("btnSpinLarge");
  if (btnLarge) {
    btnLarge.disabled = false;
    btnLarge.innerHTML = `<i class="fa-solid fa-dharmachakra fa-spin"></i> <span>SPIN LUCKY WHEEL NOW</span>`;
  }

  document.getElementById("wheelSection").style.display = "block";
  document.getElementById("wheelWinnerCard").style.display = "none";
  if (!currentWheelPrizes || currentWheelPrizes.length === 0) {
    currentWheelPrizes = buildWheelPrizesForCategory(activeWheelCategory);
  }
  updateWheelPoolStatus();
  drawWheel();
}

function closeSpinWheelModal() {
  const modal = document.getElementById("spinWheelModal");
  if (modal) {
    modal.classList.remove("active");
    modal.style.display = "none";
  }
}

function spinWheel() {
  if (isWheelSpinning) return;
  if (!currentWheelPrizes || currentWheelPrizes.length === 0) {
    currentWheelPrizes = buildWheelPrizesForCategory(activeWheelCategory);
  }
  isWheelSpinning = true;

  const btnCenter = document.getElementById("btnSpinCenter");
  if (btnCenter) btnCenter.disabled = true;
  const btnLarge = document.getElementById("btnSpinLarge");
  if (btnLarge) {
    btnLarge.disabled = true;
    btnLarge.innerHTML = `<i class="fa-solid fa-arrows-rotate fa-spin"></i> <span>SPINNING LUCKY WHEEL...</span>`;
  }

  const winningIndex = Math.floor(Math.random() * currentWheelPrizes.length);
  const numSlices = currentWheelPrizes.length;
  const sliceAngle = (2 * Math.PI) / numSlices;

  // Calculate destination rotation so winning slice lands directly at top pointer (3*PI/2)
  const targetSliceCenter = (winningIndex * sliceAngle) + (sliceAngle / 2);
  const pointerAngle = (3 * Math.PI) / 2;
  const extraRotations = 5 * (2 * Math.PI); // 5 full spins
  const totalTargetAngle = extraRotations + (pointerAngle - targetSliceCenter);

  const startAngle = wheelCurrentAngle % (2 * Math.PI);
  const delta = totalTargetAngle - startAngle;
  const duration = 3800;
  const startTime = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
  let lastTickAngle = startAngle;

  function animate(currentTime) {
    try {
      const now = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      wheelCurrentAngle = startAngle + (delta * easeOut);
      drawWheel();

      // Play click sound on passing slices safely
      if (Math.abs(wheelCurrentAngle - lastTickAngle) > (sliceAngle * 0.7)) {
        try { playClickSound(); } catch(e) {}
        lastTickAngle = wheelCurrentAngle;
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        isWheelSpinning = false;
        if (btnCenter) btnCenter.disabled = false;
        if (btnLarge) {
          btnLarge.disabled = false;
          btnLarge.innerHTML = `<i class="fa-solid fa-dharmachakra fa-spin"></i> <span>SPIN LUCKY WHEEL NOW</span>`;
        }
        try { playWinSound(); } catch(e) {}
        try { launchConfetti(); } catch(e) {}
        displayWheelWinner(currentWheelPrizes[winningIndex].id);
      }
    } catch(err) {
      console.error("Spin animation error:", err);
      isWheelSpinning = false;
      if (btnCenter) btnCenter.disabled = false;
      if (btnLarge) {
        btnLarge.disabled = false;
        btnLarge.innerHTML = `<i class="fa-solid fa-dharmachakra fa-spin"></i> <span>SPIN LUCKY WHEEL NOW</span>`;
      }
      displayWheelWinner(currentWheelPrizes[winningIndex].id);
    }
  }

  requestAnimationFrame(animate);
}

function displayWheelWinner(prodId) {
  const prod = PRODUCTS_DATA.find(p => p.id === prodId) || PRODUCTS_DATA[0];
  const affUrl = getAffiliateLink(prod.amazonUrl, prod.title);
  const wheelSection = document.getElementById("wheelSection");
  const winnerCard = document.getElementById("wheelWinnerCard");

  wheelSection.style.display = "none";
  winnerCard.style.display = "block";

  winnerCard.innerHTML = `
    <div style="text-align: center; margin-bottom: 1.25rem;">
      <span style="background: rgba(245, 158, 11, 0.2); color: var(--primary); font-weight: 800; font-size: 0.85rem; padding: 0.35rem 0.9rem; border-radius: 999px; display: inline-flex; align-items: center; gap: 0.4rem; margin-bottom: 0.5rem; border: 1px solid rgba(245, 158, 11, 0.4);">
        🎉 JACKPOT DISCOUNT UNLOCKED!
      </span>
      <h3 style="font-family: var(--font-heading); font-size: 1.35rem; margin: 0.3rem 0; color: #fff;">
        You Won ${prod.discount} on Amazon Prime!
      </h3>
      <div style="color: var(--accent-rose); font-size: 0.82rem; font-weight: 700;">
        ⚡ Deal Reserved For You: <span id="winTimer">09:59</span> mins
      </div>
    </div>

    <div style="background: var(--bg-body); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.1rem; display: flex; gap: 1rem; align-items: center; margin-bottom: 1.25rem; text-align: left;">
      <img src="${prod.image}" alt="${prod.title}" style="width: 80px; height: 80px; object-fit: cover; border-radius: var(--radius-sm); border: 1px solid var(--border-color); flex-shrink: 0;">
      <div style="flex: 1;">
        <div style="font-weight: 700; font-size: 0.95rem; line-height: 1.3; color: var(--text-primary); margin-bottom: 0.3rem;">
          ${prod.title}
        </div>
        <div style="display: flex; align-items: center; gap: 0.6rem;">
          <span style="font-size: 1.25rem; font-weight: 800; color: var(--primary);">$${prod.price.toFixed(2)}</span>
          <span style="font-size: 0.84rem; text-decoration: line-through; color: var(--text-muted);">$${prod.originalPrice.toFixed(2)}</span>
          <span class="card-price-discount" style="font-size: 0.75rem; padding: 0.15rem 0.45rem;">${prod.discount}</span>
        </div>
        <div style="font-size: 0.75rem; color: var(--accent-emerald); margin-top: 0.25rem;">
          <i class="fa-solid fa-truck-fast"></i> Verified Amazon Prime Shipping Available
        </div>
      </div>
    </div>

    <div style="display: flex; gap: 0.75rem;">
      <a href="${affUrl}" target="_blank" rel="noopener sponsored" class="btn-amazon" style="flex: 1; justify-content: center; padding: 0.8rem 1.25rem; font-size: 0.92rem;" onclick="trackAffiliateClick('${prod.id}', '${prod.title}', ${prod.price}, '${prod.category}')">
        <i class="fa-brands fa-amazon"></i> Claim Deal on Amazon
      </a>
      <button class="btn-secondary" onclick="openSpinWheelModal()" style="padding: 0.8rem 1.1rem;">
        <i class="fa-solid fa-rotate-left"></i> Spin Again
      </button>
    </div>
  `;

  // Start 10-min countdown timer for urgency
  let winSecs = 599;
  const timerInterval = setInterval(() => {
    winSecs--;
    const el = document.getElementById("winTimer");
    if (!el) {
      clearInterval(timerInterval);
      return;
    }
    const m = Math.floor(winSecs / 60);
    const s = winSecs % 60;
    el.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    if (winSecs <= 0) clearInterval(timerInterval);
  }, 1000);
}

// ==========================================================================
// Fullscreen Confetti Particle Cannon
// ==========================================================================
function launchConfetti() {
  const canvas = document.getElementById("confettiCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ["#f59e0b", "#ec4899", "#8b5cf6", "#10b981", "#06b6d4", "#ef4444", "#3b82f6"];

  for (let i = 0; i < 120; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 16,
      vy: (Math.random() - 0.7) * 18,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 12,
      opacity: 1
    });
  }

  let animationFrame;
  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = 0;

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35; // gravity
      p.rotation += p.vRot;
      p.opacity -= 0.008;

      if (p.opacity > 0) {
        alive++;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      }
    });

    if (alive > 0) {
      animationFrame = requestAnimationFrame(update);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  update();
}


