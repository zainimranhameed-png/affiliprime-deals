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
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initAffiliateTag();
  renderSpotlight();
  renderProducts();
  attachEventListeners();
  initFaqAccordion();

  // Handle direct product incoming links from Pinterest / Social shares
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
});

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
    filtered = filtered.filter(p => p.category === currentCategory);
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

    return `
      <article class="product-card" data-id="${product.id}">
        <div class="card-top-row">
          <span class="card-badge ${product.badgeType}">${product.badge}</span>
          <button class="card-actions-fav ${isFav ? 'active' : ''}" onclick="toggleFavorite('${product.id}', event)" title="Save to favorites">
            <i class="fa-${isFav ? 'solid' : 'regular'} fa-heart"></i>
          </button>
        </div>

        <div class="card-image-box" onclick="openProductModal('${product.id}')">
          <img src="${product.image}" alt="${product.title}" loading="lazy">
        </div>

        <div class="card-category">${product.categoryName}</div>
        <h3 class="card-title" onclick="openProductModal('${product.id}')">${product.title}</h3>
        <p class="card-tagline">${product.tagline}</p>

        <div class="card-rating-row">
          <div class="stars">${starsHtml}</div>
          <span style="font-weight: 700; color: var(--text-primary);">${product.rating}</span>
          <span class="reviews-count">(${product.reviewsCount.toLocaleString()} reviews)</span>
        </div>

        <ul class="card-pros-preview">
          ${product.pros.slice(0, 2).map(pro => `<li>${pro}</li>`).join("")}
        </ul>

        <div class="card-bottom-row">
          <div class="card-price-info">
            <div>
              <span class="card-price-current">$${product.price.toFixed(2)}</span>
              <span class="spotlight-original-price">$${product.originalPrice.toFixed(2)}</span>
            </div>
            <span class="card-price-discount">${product.discount}</span>
          </div>

          <div class="card-buttons-group">
            <a href="${affiliateUrl}" target="_blank" rel="nofollow noopener" class="btn-amazon" title="Buy on Amazon with current affiliate tag" onclick="if(typeof trackAffiliateClick==='function') trackAffiliateClick('${product.id}', '${product.title.replace(/'/g, "\\'")}', ${product.price}, '${product.category}')">
              <i class="fa-brands fa-amazon"></i> Check Deal
            </a>
            <button class="btn-card-compare ${isCompared ? 'active' : ''}" onclick="toggleCompare('${product.id}')" title="${isCompared ? 'Remove from comparison' : 'Add to compare'}">
              <i class="fa-solid fa-code-compare"></i>
            </button>
          </div>
          
          <div style="display: flex; gap: 0.4rem; margin-top: 0.25rem;">
            <button class="btn-secondary" style="flex: 1; font-size: 0.78rem; padding: 0.45rem 0.5rem;" onclick="openProductModal('${product.id}')">
              <i class="fa-solid fa-circle-info"></i> Review
            </button>
            <a href="https://pinterest.com/pin/create/button/?url=${encodeURIComponent(window.location.origin + window.location.pathname.replace(/\\/$/, '') + '/?product=' + product.id)}&media=${encodeURIComponent(product.image)}&description=${encodeURIComponent('🔥 ' + product.title + ' (' + product.discount + ' OFF) - Best Amazon Deal & Review on AffiliPrime Deals! #AmazonFinds #AmazonDeals #MustHaves #Trending')}" target="_blank" rel="noopener" class="btn-secondary btn-pinterest" style="font-size: 0.85rem; padding: 0.45rem 0.6rem;" title="Pin to Pinterest for viral US buyer traffic">
              <i class="fa-brands fa-pinterest"></i>
            </a>
            <a href="https://api.whatsapp.com/send?text=${encodeURIComponent('🔥 Amazing Amazon Deal: ' + product.title + ' at ' + product.discount + ' - ' + affiliateUrl)}" target="_blank" rel="noopener" class="btn-secondary" style="font-size: 0.85rem; padding: 0.45rem 0.6rem; color: #25D366;" title="Share deal on WhatsApp">
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
        <a href="https://pinterest.com/pin/create/button/?url=${encodeURIComponent(window.location.origin + window.location.pathname.replace(/\\/$/, '') + '/?product=' + product.id)}&media=${encodeURIComponent(product.image)}&description=${encodeURIComponent('🔥 ' + product.title + ' (' + product.discount + ' OFF) - Best Amazon Deal & Review on AffiliPrime Deals! #AmazonFinds #AmazonDeals #MustHaves #Trending')}" target="_blank" rel="noopener" class="btn-secondary btn-pinterest" style="padding: 0.65rem 0.9rem;" title="Pin to Pinterest">
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
  if (theme === "light") {
    themeIcon.className = "fa-solid fa-moon";
  } else {
    themeIcon.className = "fa-solid fa-sun";
  }
}

// ==========================================================================
// Toast Notification
// ==========================================================================
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<i class="fa-solid fa-circle-check text-warning"></i> <span>${message}</span>`;
  toastContainer.appendChild(toast);

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
  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value.trim();
    renderProducts();
  });

  // Category Chips
  categoryChips.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip-btn");
    if (!chip) return;
    document.querySelectorAll(".chip-btn").forEach(b => b.classList.remove("active"));
    chip.classList.add("active");
    currentCategory = chip.dataset.category;
    renderProducts();
  });

  // Sort
  sortSelect.addEventListener("change", (e) => {
    currentSort = e.target.value;
    renderProducts();
  });

  // Theme Toggle
  themeToggleBtn.addEventListener("click", toggleTheme);

  // Tag Config Modals
  btnOpenTagModal.addEventListener("click", openTagConfigModal);
  btnSettingsModalTrigger.addEventListener("click", openTagConfigModal);
  if (footerConfigBtn) footerConfigBtn.addEventListener("click", openTagConfigModal);
  configModalCloseBtn.addEventListener("click", closeTagConfigModal);
  btnSaveAffiliateTag.addEventListener("click", saveAffiliateTag);
  btnResetTag.addEventListener("click", resetAffiliateTag);

  customTagInput.addEventListener("input", (e) => {
    previewTagSpan.textContent = e.target.value.trim() || APP_CONFIG.defaultAffiliateTag;
  });

  // Product Modal Close
  modalCloseBtn.addEventListener("click", closeProductModal);
  productModal.addEventListener("click", (e) => {
    if (e.target === productModal) closeProductModal();
  });

  // Comparison Handlers
  headerCompareBtn.addEventListener("click", openComparisonModal);
  navCompareLink.addEventListener("click", (e) => {
    e.preventDefault();
    openComparisonModal();
  });
  btnLaunchComparison.addEventListener("click", openComparisonModal);
  btnClearCompare.addEventListener("click", clearAllCompare);
  comparisonModalCloseBtn.addEventListener("click", closeComparisonModal);
  comparisonModal.addEventListener("click", (e) => {
    if (e.target === comparisonModal) closeComparisonModal();
  });

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
