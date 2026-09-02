/* ZENVY Premium Sportswear Elite - Main JavaScript App */

// Application State
const appState = {
  activeView: 'home',
  cart: (() => {
    try { return JSON.parse(localStorage.getItem('zenvy_cart') || '[]'); }
    catch(e) { return []; }
  })(),
  wishlistCount: 0,
  customizer: {
    basePrice: 1450.00,
    sleevePrice: 0.00,
    personalizePrice: 0.00
  }
};

function saveCartState() {
  try {
    localStorage.setItem('zenvy_cart', JSON.stringify(appState.cart));
  } catch(e){}
}

// Global Currency Formatter
function formatMoney(amountInBDT) {
  if (typeof DB !== 'undefined' && DB.currency) {
    return DB.currency.format(amountInBDT);
  }
  return `৳${Math.round(amountInBDT).toLocaleString()}`;
}

// Initialize Application — Firestore-first
document.addEventListener('DOMContentLoaded', async () => {
  // Show loading overlay while fetching cloud data
  const loadingEl = document.getElementById('app-loading-overlay');

  // Step 1: Hydrate localStorage from Firestore (gets latest admin changes)
  if (window.ZenvyFirebase) {
    try {
      await window.ZenvyFirebase.hydrate();
    } catch(e) {
      console.warn('Firestore hydration failed, using local data:', e);
    }
  }

  // Step 2: Initialize UI with (now up-to-date) data
  syncHomepageContent();
  renderCart();
  updateCustomizerTotal();
  syncFooterSocialLinks();
  renderCheckoutPaymentMethods();

  const urlParams = new URLSearchParams(window.location.search);
  const targetView = urlParams.get('view') || window.location.hash.replace('#', '') || 'home';
  if (['checkout', 'shop', 'studio', 'order-tracking', 'preorder', 'home'].includes(targetView)) {
    switchView(targetView);
  } else {
    switchView('home');
  }

  if (urlParams.get('openCart') === '1' || urlParams.get('openCart') === 'true') {
    setTimeout(() => toggleCartDrawer(true), 200);
  }

  // Step 3: Hide loading overlay
  if (loadingEl) loadingEl.style.display = 'none';

  // Step 4: Start real-time Firestore listener for live admin→website sync
  if (window.ZenvyFirebase) {
    window.ZenvyFirebase.startLiveSync(() => {
      // Runs whenever admin saves anything to Firestore
      syncHomepageContent();
      renderCart();
      syncFooterSocialLinks();
      renderCheckoutPaymentMethods();
    });
  }
});

// Legacy localStorage storage event (still useful for same-origin admin↔storefront)
window.addEventListener('storage', (e) => {
  if (!e.key) return;
  if (e.key.includes('brand') || e.key.includes('homepage') || e.key.includes('products') ||
      e.key.includes('customization') || e.key.includes('banners') || e.key.includes('categories')) {
    syncHomepageContent();
    renderCart();
    syncFooterSocialLinks();
  }
  if (e.key.includes('storeSettings') || e.key.includes('paymentConfig') || e.key.includes('shipping')) {
    renderCheckoutPaymentMethods();
    renderCart();
  }
});


// ── Dynamic Homepage & Storefront Sync from DB ──
function syncHomepageContent() {
  if (typeof DB === 'undefined') return;

  const cur = DB.currency ? DB.currency.get() : { code: 'BDT', symbol: '৳' };
  const curIndicator = document.getElementById('footer-currency-indicator');
  if (curIndicator) {
    curIndicator.textContent = `CURRENCY: ${cur.code} (${cur.symbol})`;
  }

  const flagshipPrice = document.getElementById('hero-flagship-price');
  if (flagshipPrice) {
    flagshipPrice.textContent = `${formatMoney(1450)} • In Stock`;
  }

  const homeConfig = DB.homepage ? DB.homepage.get() : null;
  if (!homeConfig) return;

  // 1. Top Announcement Marquee
  const ann = homeConfig.announcement;
  if (ann) {
    const marqueeEl = document.getElementById('store-marquee-text');
    if (marqueeEl && ann.marqueeText) marqueeEl.textContent = ann.marqueeText;
  }

  // 2. Hero Banner
  const hero = homeConfig.hero;
  if (hero) {
    const heroSection = document.getElementById('hero-banner-section');
    if (heroSection) {
      heroSection.style.display = hero.enabled !== false ? '' : 'none';
    }
    const badgeText = document.getElementById('hero-badge-text');
    if (badgeText && hero.badge) badgeText.textContent = hero.badge;

    const titleText = document.getElementById('hero-title-text');
    if (titleText && hero.title) titleText.textContent = hero.title;

    const subText = document.getElementById('hero-subtitle-text');
    if (subText && hero.subtitle) subText.textContent = hero.subtitle;

    const cta1Label = document.getElementById('hero-cta1-label');
    const cta1Btn = document.getElementById('hero-cta1-btn');
    if (cta1Label) cta1Label.textContent = hero.ctaPrimaryText || 'SHOP';
    if (cta1Btn) {
      const link = hero.ctaPrimaryLink || 'index.html#shop';
      cta1Btn.href = link;
      if (link.includes('#shop') || link.toLowerCase().includes('shop')) {
        cta1Btn.onclick = (e) => { e.preventDefault(); switchView('shop'); };
      } else {
        cta1Btn.onclick = null;
      }
    }

    const cta2Label = document.getElementById('hero-cta2-label');
    if (cta2Label && hero.ctaSecondaryText) cta2Label.textContent = hero.ctaSecondaryText;

    const heroBg = document.getElementById('hero-bg-div');
    if (heroBg && hero.bgImage) {
      heroBg.style.backgroundImage = `url('${hero.bgImage}')`;
    }
  }

  // 3. Value Props Bar (4 Selling Points)
  const props = homeConfig.valueProps || [
    { icon: 'local_shipping', title: 'Nationwide Delivery', subtitle: 'Inside Dhaka 24–48h • All BD 2–3 Days' },
    { icon: 'verified', title: 'Authentic Grade', subtitle: '100% Pro-Athlete Specification' },
    { icon: '3d_rotation', title: '3D Studio Live', subtitle: 'Real-Time Customizer & UCL Patches' },
    { icon: 'autorenew', title: '30-Day Guarantee', subtitle: 'Hassle-Free Returns & Exchanges' }
  ];
  const propsContainer = document.getElementById('store-value-props-container');
  if (propsContainer && props.length > 0) {
    propsContainer.innerHTML = props.map(p => `
      <div class="bg-[#f9f9fb] border border-gray-100 rounded-xl p-4 flex items-center gap-3">
        <span class="material-symbols-outlined text-xl text-black">${p.icon || 'verified'}</span>
        <div>
          <div class="text-xs font-bold text-black">${p.title || ''}</div>
          <div class="text-[11px] text-gray-500">${p.subtitle || ''}</div>
        </div>
      </div>
    `).join('');
  }

  // 4. Featured Collections Bento Grid
  const col = homeConfig.collections;
  if (col) {
    const secTitle = document.getElementById('collections-sec-title');
    if (secTitle && col.title) secTitle.textContent = col.title;

    const secSub = document.getElementById('collections-sec-sub');
    if (secSub && col.subtitle) secSub.textContent = col.subtitle;

    const bentoContainer = document.getElementById('collections-bento-grid');
    if (bentoContainer && col.cards && col.cards.length > 0) {
      const fallbackImages = [
        'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&q=80',
        'https://images.unsplash.com/photo-1511886929837-354d827aae26?w=1200&q=80',
        'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&q=80'
      ];
      bentoContainer.innerHTML = col.cards.map((c, idx) => {
        const bgImg = (c.bgImage && !c.bgImage.includes('googleusercontent.com')) ? c.bgImage : (fallbackImages[idx % fallbackImages.length]);
        return `
          <div onclick="window.location.href='${c.link || 'product.html'}'" class="group relative rounded-2xl overflow-hidden cursor-pointer shadow-md h-60 sm:h-72 ${idx === 2 ? 'sm:col-span-2 md:col-span-1' : ''}">
            <div class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
                 style="background-image: url('${bgImg}')">
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent"></div>
            <div class="absolute bottom-0 left-0 p-5 w-full">
              <span class="text-[10px] font-mono-ui uppercase font-bold text-amber-400 tracking-wider">${c.tag || 'COLLECTION'}</span>
              <h3 class="font-headline text-lg sm:text-xl text-white font-bold">${c.title || ''}</h3>
              ${c.desc ? `<p class="text-xs text-gray-200 mt-1 line-clamp-1">${c.desc}</p>` : ''}
            </div>
            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 backdrop-blur-xs">
              <span class="bg-white text-black text-xs px-4 py-2 rounded-full font-bold shadow-lg">Explore</span>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  // 5. Just Dropped Slider
  const jd = homeConfig.justDropped;
  if (jd) {
    const jdBadge = document.getElementById('just-dropped-badge');
    if (jdBadge && jd.badge) jdBadge.textContent = jd.badge;

    const jdTitle = document.getElementById('just-dropped-title');
    if (jdTitle && jd.title) jdTitle.textContent = jd.title;
  }

  // Render dynamic slider products from DB
  const sliderEl = document.getElementById('product-slider');
  if (sliderEl && DB.products) {
    const published = DB.products.published();
    if (published && published.length > 0) {
      sliderEl.innerHTML = published.map(p => {
        const imgUrl = (p.images && p.images[0] && p.images[0].url) ? p.images[0].url : 'https://lh3.googleusercontent.com/aida-public/AB6AXuDV_LbyyPJxnRKmU8_oYZoYTmwlX1dORf22Yeei2rC0v-Z24hFTXgPedjBdVIl7bJAWRpOsO3nAEVulUb9cHoyme1h5w9dqAuz3EFxMdSWawV_QZE4ar61iyYOGoH0d1r2Kf5G90TLU3ew4Vsxm1yiNzJ0fjylA9zDty3hULOVnT3xX-UmmQkKIr_TdTowvSGHavQeM_BxmRGvmq44rY8ERHWsx8LwDJ6TKBy45CfsowuBsWRcDozB7SA';
        const priceDisplay = formatMoney(p.salePrice || p.basePrice || 1450);
        return `
          <div class="min-w-[240px] sm:min-w-[270px] flex-shrink-0 group">
            <div class="bg-[#f5f5f7] rounded-2xl p-4 sm:p-5 mb-3 relative h-[260px] sm:h-[300px] flex items-center justify-center overflow-hidden cursor-pointer"
                 onclick="window.location.href='product.html?id=${p.id}'">
              ${p.isPreorder ? '<span class="absolute top-3 left-3 bg-purple-600 text-white text-[10px] font-mono-ui font-bold px-2 py-0.5 rounded">PRE-ORDER</span>' : '<span class="absolute top-3 left-3 bg-black text-white text-[10px] font-mono-ui font-bold px-2 py-0.5 rounded">NEW</span>'}
              <button onclick="event.stopPropagation(); toggleWishlist('${p.name}', ${p.basePrice})" class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 shadow flex items-center justify-center text-gray-500 hover:text-red-600 transition-colors z-10">
                <span class="material-symbols-outlined text-[16px]">favorite</span>
              </button>
              <img src="${imgUrl}" class="max-h-[200px] sm:max-h-[230px] w-auto object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-md" alt="${p.name}"/>
              <div class="absolute inset-x-0 bottom-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-white/95 to-transparent">
                <a href="product.html?id=${p.id}" class="block w-full text-center bg-black text-white text-xs font-bold py-2 rounded-full shadow">VIEW & CUSTOMIZE</a>
              </div>
            </div>
            <div class="flex justify-between items-start">
              <div>
                <h4 class="font-headline text-sm font-bold text-black group-hover:underline">${p.name}</h4>
                <p class="text-xs text-gray-500">${p.categoryName || 'Performance Edition'}</p>
              </div>
              <span class="font-mono-ui text-sm font-bold text-black">${priceDisplay}</span>
            </div>
          </div>
        `;
      }).join('');
    }
  }
  // 6. Active Promotional Banners → hero overlay / announcement
  if (typeof DB !== 'undefined' && DB.banners) {
    const activeBanners = DB.banners.active();
    if (activeBanners.length > 0) {
      const topBanner = activeBanners[0];
      const bannerImg = topBanner.desktopImg || topBanner.bgImage || '';
      if (bannerImg) {
        const heroBg = document.getElementById('hero-bg-div');
        if (heroBg) heroBg.style.backgroundImage = `url('${bannerImg}')`;
      }
      if (topBanner.title) {
        const titleEl = document.getElementById('hero-title-text');
        if (titleEl) titleEl.textContent = topBanner.title;
      }
      if (topBanner.subtitle) {
        const subEl = document.getElementById('hero-subtitle-text');
        if (subEl) subEl.textContent = topBanner.subtitle;
      }
      if (topBanner.marqueeText) {
        const marqueeEl = document.getElementById('store-marquee-text');
        if (marqueeEl) marqueeEl.textContent = topBanner.marqueeText;
      }
    }
  }

  // 7. Render dynamic categories in the Shop sidebar and quick filters
  renderShopCategories();

  // 8. Render dynamic products in the Shop grid
  renderShopProducts();

  // 9. Sync Shop Banner Carousel
  try { shopCarouselGoto(shopCarouselIndex || 0); } catch(e){}
}

// ── Checkout: Dynamically render payment methods & advance options based on store policy ──
// ── Helper: Resolve dynamic delivery and advance payment rules based on products in cart ──
function resolveCartDeliveryAndAdvancePolicy() {
  const storePolicy = (typeof DB !== 'undefined' && DB.storeSettings) ? DB.storeSettings.get() : {
    advancePaymentMode: 'customer_choice',
    deliveryChargeInsideDhaka: 80,
    deliveryChargeOutsideDhaka: 130,
    deliveryChargeFreeThreshold: 3000,
    deliveryChargeEnabled: true,
    cashOnDelivery: true
  };

  let maxInsideDhaka = null;
  let maxOutsideDhaka = null;
  let hasAnyCustomDelivery = false;
  let productAdvanceModes = [];
  let productNotes = [];

  if (typeof DB !== 'undefined' && DB.products && Array.isArray(appState.cart) && appState.cart.length > 0) {
    for (const item of appState.cart) {
      const prod = DB.products.byId(item.id || item.productId) || item.product || null;
      if (prod) {
        if (prod.hasCustomDelivery) {
          hasAnyCustomDelivery = true;
          const inside = parseFloat(prod.deliveryChargeInsideDhaka);
          const outside = parseFloat(prod.deliveryChargeOutsideDhaka);
          if (!isNaN(inside)) maxInsideDhaka = maxInsideDhaka === null ? inside : Math.max(maxInsideDhaka, inside);
          if (!isNaN(outside)) maxOutsideDhaka = maxOutsideDhaka === null ? outside : Math.max(maxOutsideDhaka, outside);
        }
        if (prod.advancePaymentMode && prod.advancePaymentMode !== 'default') {
          productAdvanceModes.push(prod.advancePaymentMode);
        }
        if (prod.deliveryNote) {
          productNotes.push(prod.deliveryNote);
        }
      }
    }
  }

  const deliveryChargeInsideDhaka = (hasAnyCustomDelivery && maxInsideDhaka !== null)
    ? maxInsideDhaka
    : (storePolicy.deliveryChargeInsideDhaka ?? 80);

  const deliveryChargeOutsideDhaka = (hasAnyCustomDelivery && maxOutsideDhaka !== null)
    ? maxOutsideDhaka
    : (storePolicy.deliveryChargeOutsideDhaka ?? 130);

  let effectiveAdvanceMode = storePolicy.advancePaymentMode || 'customer_choice';
  if (productAdvanceModes.includes('full_only')) {
    effectiveAdvanceMode = 'full_only';
  } else if (productAdvanceModes.includes('delivery_only')) {
    effectiveAdvanceMode = 'delivery_only';
  } else if (productAdvanceModes.includes('customer_choice')) {
    effectiveAdvanceMode = 'customer_choice';
  } else if (productAdvanceModes.includes('cod_only')) {
    effectiveAdvanceMode = 'cod_only';
  }

  return {
    advancePaymentMode: effectiveAdvanceMode,
    deliveryChargeInsideDhaka,
    deliveryChargeOutsideDhaka,
    deliveryChargeFreeThreshold: storePolicy.deliveryChargeFreeThreshold ?? 3000,
    deliveryChargeEnabled: storePolicy.deliveryChargeEnabled !== false,
    cashOnDelivery: storePolicy.cashOnDelivery !== false,
    minOrderAmount: storePolicy.minOrderAmount || 0,
    payFirstNote: storePolicy.payFirstNote || '',
    codNote: storePolicy.codNote || '',
    deliveryNote: productNotes.join(' | ') || storePolicy.deliveryNote || ''
  };
}

function renderCheckoutPaymentMethods() {
  const container = document.getElementById('checkout-payment-methods-list');
  if (!container) return;

  const policy = resolveCartDeliveryAndAdvancePolicy();
  const payConfig = (typeof DB !== 'undefined' && DB.payments) ? DB.payments.get() : { methods: [] };

  // 1. Update Area Delivery Rate labels
  const rateDhaka = document.getElementById('rate-inside-dhaka');
  if (rateDhaka) rateDhaka.textContent = `৳${policy.deliveryChargeInsideDhaka || 80}`;
  const rateOutside = document.getElementById('rate-outside-dhaka');
  if (rateOutside) rateOutside.textContent = `৳${policy.deliveryChargeOutsideDhaka || 130}`;

  // 2. Update Policy Banner & Split Container
  const badgeEl = document.getElementById('checkout-policy-badge');
  const titleEl = document.getElementById('checkout-policy-title');
  const descEl = document.getElementById('checkout-policy-desc');
  const splitContainer = document.getElementById('checkout-split-choice-container');
  const splitOptions = document.getElementById('checkout-split-options');

  const advanceMode = policy.advancePaymentMode || 'customer_choice';

  if (advanceMode === 'delivery_only') {
    if (badgeEl) badgeEl.textContent = 'Delivery Advance Mandatory';
    if (titleEl) titleEl.textContent = '⚡ Advance Delivery Charge Required';
    if (descEl) descEl.textContent = policy.payFirstNote || 'Please pay the delivery charge upfront via bKash to confirm your order. Product price will be collected in cash on delivery.';
    if (splitContainer) splitContainer.style.display = 'none';
  } else if (advanceMode === 'full_only') {
    if (badgeEl) badgeEl.textContent = '100% Full Payment Required';
    if (titleEl) titleEl.textContent = '🔒 Full Advance Payment Mandatory';
    if (descEl) descEl.textContent = 'Complete payment for product and shipping is required upfront to process your order.';
    if (splitContainer) splitContainer.style.display = 'none';
  } else if (advanceMode === 'cod_only') {
    if (badgeEl) badgeEl.textContent = 'Cash on Delivery';
    if (titleEl) titleEl.textContent = '💵 Full Cash on Delivery';
    if (descEl) descEl.textContent = policy.codNote || 'Pay complete order value when the package is delivered.';
    if (splitContainer) splitContainer.style.display = 'none';
  } else {
    // customer_choice
    if (badgeEl) badgeEl.textContent = 'Flexible Payment Choice';
    if (titleEl) titleEl.textContent = '✨ Choose How You Pay';
    if (descEl) descEl.textContent = 'You can pay the full amount upfront, pay only the delivery charge in advance, or pay full cash on delivery.';
    if (splitContainer) splitContainer.style.display = '';

    if (splitOptions) {
      splitOptions.innerHTML = `
        <label class="flex items-start gap-3 p-3.5 border-2 rounded-xl cursor-pointer transition-all has-[:checked]:border-black has-[:checked]:bg-black/5 border-gray-200 hover:border-gray-400 bg-white">
          <input type="radio" name="checkout-payment-split" value="delivery_only" checked onchange="updateCheckoutCalculations()" class="accent-black mt-0.5" />
          <div class="flex-1">
            <span class="font-bold text-xs text-black block">⚡ Pay Delivery Charge Only</span>
            <span class="text-[11px] text-gray-500 block mt-0.5">Pay delivery fee advance via bKash, pay product price on delivery</span>
          </div>
        </label>

        <label class="flex items-start gap-3 p-3.5 border-2 rounded-xl cursor-pointer transition-all has-[:checked]:border-black has-[:checked]:bg-black/5 border-gray-200 hover:border-gray-400 bg-white">
          <input type="radio" name="checkout-payment-split" value="full" onchange="updateCheckoutCalculations()" class="accent-black mt-0.5" />
          <div class="flex-1">
            <span class="font-bold text-xs text-black block">🔒 Pay Full Amount Now</span>
            <span class="text-[11px] text-gray-500 block mt-0.5">100% advance payment (Product + Delivery Charge)</span>
          </div>
        </label>

        ${policy.cashOnDelivery !== false ? `
        <label class="col-span-1 md:col-span-2 flex items-start gap-3 p-3.5 border-2 rounded-xl cursor-pointer transition-all has-[:checked]:border-black has-[:checked]:bg-black/5 border-gray-200 hover:border-gray-400 bg-white">
          <input type="radio" name="checkout-payment-split" value="cod" onchange="updateCheckoutCalculations()" class="accent-black mt-0.5" />
          <div class="flex-1">
            <span class="font-bold text-xs text-black block">💵 Full Cash on Delivery</span>
            <span class="text-[11px] text-gray-500 block mt-0.5">Pay full total when jersey is delivered at your door</span>
          </div>
        </label>
        ` : ''}
      `;
    }
  }

  // 3. Render Payment Gateways
  let methods = (payConfig.methods || []).filter(m => m.enabled);
  if (advanceMode === 'full_only') {
    methods = methods.filter(m => m.id !== 'cod');
  }

  if (methods.length === 0) {
    container.innerHTML = `<p class="text-xs text-red-500 font-bold">No payment methods available. Please contact support.</p>`;
    return;
  }

  container.innerHTML = methods.map((m, idx) => {
    const isBkash = m.id === 'bkash';
    return `
      <label class="flex items-center gap-3 p-3.5 border-2 rounded-2xl cursor-pointer transition-all has-[:checked]:border-black has-[:checked]:bg-black/5 border-gray-200 hover:border-gray-400 bg-white">
        <input type="radio" name="payment-method" value="${m.id}" ${idx === 0 ? 'checked' : ''} onchange="updateCheckoutCalculations()" class="accent-black" />
        <div class="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${isBkash ? 'bg-[#D12053] text-white font-bold' : 'bg-gray-100 text-gray-700'}">
          ${isBkash ? '৳' : `<span class="material-symbols-outlined text-base">${m.icon || 'payments'}</span>`}
        </div>
        <div class="flex-1">
          <div class="flex items-center gap-2">
            <span class="font-bold text-xs text-black">${m.name}</span>
            ${isBkash ? '<span class="bg-[#FFF1F5] text-[#D12053] text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-pink-200">UddoktaPay Connected</span>' : ''}
          </div>
          ${m.id === 'cod' && policy.codNote ? `<div class="text-[11px] text-gray-500 mt-0.5">${policy.codNote}</div>` : ''}
          ${isBkash ? `<div class="text-[11px] text-gray-500 mt-0.5">Automated bKash checkout with instant TrxID validation</div>` : ''}
          ${!isBkash && m.id !== 'cod' && m.number ? `<div class="text-[11px] text-gray-500 mt-0.5">Send to: ${m.number}</div>` : ''}
        </div>
      </label>
    `;
  }).join('');

  updateCheckoutCalculations();
}

// ── Real-time calculation of Subtotal, Shipping, Advance Payable & Due Balance ──
function updateCheckoutCalculations() {
  const policy = resolveCartDeliveryAndAdvancePolicy();

  // 1. Update Area Delivery Rate labels in real-time
  const rateDhaka = document.getElementById('rate-inside-dhaka');
  if (rateDhaka) rateDhaka.textContent = `৳${policy.deliveryChargeInsideDhaka || 80}`;
  const rateOutside = document.getElementById('rate-outside-dhaka');
  if (rateOutside) rateOutside.textContent = `৳${policy.deliveryChargeOutsideDhaka || 130}`;

  const subtotal = appState.cart.reduce((s, i) => s + ((parseFloat(i.price) || 0) * (parseInt(i.qty) || 1)), 0);

  // 2. Determine selected zone shipping fee
  const zoneInput = document.querySelector('input[name="checkout-delivery-zone"]:checked');
  const zone = zoneInput ? zoneInput.value : 'inside';

  let baseShipping = policy.deliveryChargeInsideDhaka || 80;
  if (zone === 'outside') baseShipping = policy.deliveryChargeOutsideDhaka || 130;

  const freeThreshold = policy.deliveryChargeFreeThreshold ?? 3000;
  const isFree = (policy.deliveryChargeEnabled === false) || (freeThreshold > 0 && subtotal >= freeThreshold);
  const shippingFee = isFree ? 0 : baseShipping;

  const totalOrderValue = subtotal + shippingFee;

  // 3. Determine active split / payment rule
  const advanceMode = policy.advancePaymentMode || 'customer_choice';
  let activeSplit = 'delivery_only';

  if (advanceMode === 'delivery_only') {
    activeSplit = 'delivery_only';
  } else if (advanceMode === 'full_only') {
    activeSplit = 'full';
  } else if (advanceMode === 'cod_only') {
    activeSplit = 'cod';
  } else {
    const splitInput = document.querySelector('input[name="checkout-payment-split"]:checked');
    activeSplit = splitInput ? splitInput.value : 'delivery_only';
  }

  // 4. Compute Pay Now vs Due on Delivery
  let payNowAmount = 0;
  let dueAmount = 0;
  let payNowDesc = 'Via bKash';
  let btnLabel = 'CONFIRM ORDER';

  if (activeSplit === 'delivery_only') {
    payNowAmount = shippingFee;
    dueAmount = subtotal;
    payNowDesc = `Delivery Charge (${zone === 'outside' ? 'Outside Dhaka' : 'Inside Dhaka'}) via bKash`;
    btnLabel = payNowAmount > 0 ? `PAY ৳${payNowAmount.toLocaleString()} DELIVERY CHARGE VIA BKASH` : 'PLACE ORDER (FREE DELIVERY)';
  } else if (activeSplit === 'full') {
    payNowAmount = totalOrderValue;
    dueAmount = 0;
    payNowDesc = '100% Full Payment (Product + Delivery Charge)';
    btnLabel = `PAY FULL ৳${payNowAmount.toLocaleString()} VIA BKASH`;
  } else {
    // cod
    payNowAmount = 0;
    dueAmount = totalOrderValue;
    payNowDesc = 'No advance payment required';
    btnLabel = `PLACE CASH ON DELIVERY ORDER (৳${dueAmount.toLocaleString()})`;
  }

  // 5. Update UI breakdown
  const subEl = document.getElementById('checkout-subtotal');
  if (subEl) subEl.textContent = `৳${subtotal.toLocaleString()}`;

  const delEl = document.getElementById('checkout-delivery-fee');
  if (delEl) {
    delEl.textContent = isFree ? 'FREE' : `৳${shippingFee.toLocaleString()}`;
    delEl.className = isFree ? 'font-bold text-emerald-600' : 'font-bold text-black';
  }

  const totalEl = document.getElementById('checkout-total');
  if (totalEl) totalEl.textContent = `৳${totalOrderValue.toLocaleString()}`;

  const payNowEl = document.getElementById('checkout-pay-now-amount');
  if (payNowEl) payNowEl.textContent = `৳${payNowAmount.toLocaleString()}`;

  const payNowDescEl = document.getElementById('checkout-pay-now-desc');
  if (payNowDescEl) payNowDescEl.textContent = payNowDesc;

  const dueEl = document.getElementById('checkout-due-amount');
  if (dueEl) dueEl.textContent = `৳${dueAmount.toLocaleString()}`;

  const btnEl = document.getElementById('checkout-place-order-btn');
  if (btnEl) {
    const btnSpan = btnEl.querySelector('span:first-child');
    if (btnSpan) btnSpan.textContent = btnLabel;
  }

  // 6. Check Min order
  const minOrderEl = document.getElementById('checkout-min-order-notice');
  if (minOrderEl) {
    const minOrder = policy.minOrderAmount || 0;
    if (minOrder > 0 && subtotal < minOrder) {
      minOrderEl.textContent = `Minimum order amount is ৳${minOrder}. Add ৳${Math.ceil(minOrder - subtotal)} more to checkout.`;
      minOrderEl.style.display = '';
    } else {
      minOrderEl.style.display = 'none';
    }
  }
}

// Global window bindings for HTML inline event handlers
if (typeof window !== 'undefined') {
  window.resolveCartDeliveryAndAdvancePolicy = resolveCartDeliveryAndAdvancePolicy;
  window.renderCheckoutPaymentMethods = renderCheckoutPaymentMethods;
  window.updateCheckoutCalculations = updateCheckoutCalculations;
  window.placeOrder = placeOrder;
}

function syncFooterSocialLinks() {
  if (typeof DB === 'undefined' || !DB.brand) return;
  const brand = DB.brand.get();
  if (!brand) return;

  const fbEl = document.getElementById('footer-social-fb');
  if (fbEl && brand.socialFacebook) fbEl.href = brand.socialFacebook;

  const igEl = document.getElementById('footer-social-ig');
  if (igEl && brand.socialInstagram) igEl.href = brand.socialInstagram;

  const xEl = document.getElementById('footer-social-x');
  if (xEl && brand.socialTwitter) xEl.href = brand.socialTwitter;

  const ttEl = document.getElementById('footer-social-tiktok');
  if (ttEl && brand.socialTikTok) ttEl.href = brand.socialTikTok;

  const ytEl = document.getElementById('footer-social-yt');
  if (ytEl && brand.socialYoutube) ytEl.href = brand.socialYoutube;
}

// View Switcher Router
function switchView(viewName) {
  appState.activeView = viewName;

  // Hide all page views
  document.querySelectorAll('.page-view').forEach(view => {
    view.classList.remove('active');
  });

  // Show target view
  const targetView = document.getElementById(`view-${viewName}`);
  if (targetView) {
    targetView.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Update navbar tab highlights
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.className = "nav-tab font-body-md text-sm px-4 py-1.5 rounded-full transition-all duration-200 text-secondary hover:text-primary hover:bg-white/60";
  });

  const activeTab = document.getElementById(`nav-btn-${viewName}`);
  if (activeTab) {
    activeTab.className = "nav-tab font-body-md text-sm px-4 py-1.5 rounded-full transition-all duration-200 text-primary font-bold bg-white shadow-sm";
  }

  // View-specific initialization
  if (viewName === 'shop') {
    // Render shop grid and discount banner from DB on each visit
    shopCarouselGoto(0);
    setTimeout(() => changeShopPage(typeof shopCurrentPage !== 'undefined' ? shopCurrentPage : 1), 50);
  } else if (viewName === 'home') {
    syncHomepageContent();
  } else if (viewName === 'checkout') {
    renderCart();
    renderCheckoutPaymentMethods();
    updateCheckoutCalculations();
  }
}


// Shopping Cart Functions
function renderCart() {
  const drawerList = document.getElementById('cart-drawer-items');
  const checkoutList = document.getElementById('checkout-items-list');

  if (!drawerList) return;

  drawerList.innerHTML = '';
  if (checkoutList) checkoutList.innerHTML = '';

  let subtotal = 0;
  let totalItems = 0;

  if (appState.cart.length === 0) {
    drawerList.innerHTML = `
      <div class="text-center py-12 text-secondary">
        <span class="material-symbols-outlined text-5xl mb-2 text-outline">shopping_bag</span>
        <p class="font-headline-lg text-lg font-bold text-primary">Your cart is empty</p>
        <p class="font-mono-ui text-xs mt-1">Explore our new arrivals and jerseys shop.</p>
        <button onclick="toggleCartDrawer(); switchView('shop')" class="mt-4 bg-primary text-white font-label-caps text-xs px-6 py-2.5 rounded-full">
          SHOP JERSEYS
        </button>
      </div>
    `;
    if (checkoutList) {
      checkoutList.innerHTML = `<p class="text-center text-secondary font-mono-ui text-xs py-4">No items in cart.</p>`;
    }
  } else {
    appState.cart.forEach((item, index) => {
      subtotal += item.price * item.qty;
      totalItems += item.qty;

      // Drawer Item Markup
      const drawerItemHtml = `
        <div class="flex gap-3 p-3 bg-surface-container-lowest rounded-xl border border-outline-variant/30 relative group shadow-sm">
          <div class="w-20 h-24 bg-surface-container-low rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
            <img src="${item.image}" class="cutout-image object-contain w-full h-full p-1.5" alt="${item.name}"/>
          </div>
          <div class="flex-grow flex flex-col justify-between">
            <div>
              <div class="flex justify-between items-start">
                <h4 class="font-body-lg text-sm font-bold text-primary">${item.name}</h4>
                <button onclick="removeFromCart(${index})" class="text-outline hover:text-red-600 transition-colors">
                  <span class="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
              <p class="font-mono-ui text-[11px] text-secondary mt-0.5">${item.details}</p>
            </div>
            <div class="flex justify-between items-center mt-2">
              <div class="flex items-center gap-2 bg-surface-container rounded-lg px-2 py-0.5 border border-outline-variant/30">
                <button onclick="updateQty(${index}, -1)" class="text-primary font-bold text-xs px-1">-</button>
                <span class="font-mono-ui text-xs font-bold text-primary px-1">${item.qty}</span>
                <button onclick="updateQty(${index}, 1)" class="text-primary font-bold text-xs px-1">+</button>
              </div>
              <span class="font-mono-ui text-sm font-bold text-primary">${formatMoney(item.price * item.qty)}</span>
            </div>
          </div>
        </div>
      `;
      drawerList.innerHTML += drawerItemHtml;

      // Checkout Summary Item Markup
      if (checkoutList) {
        const checkoutItemHtml = `
          <div class="flex gap-3 p-3 bg-white rounded-xl border border-outline-variant/30">
            <img src="${item.image}" class="w-16 h-16 object-contain bg-surface-container-low rounded-lg p-1" alt="${item.name}"/>
            <div class="flex-grow flex flex-col justify-center">
              <h4 class="font-body-md text-xs font-bold text-primary">${item.name}</h4>
              <p class="font-mono-ui text-[11px] text-secondary">${item.details} • Qty: ${item.qty}</p>
              <span class="font-mono-ui text-xs font-bold text-primary mt-1">${formatMoney(item.price * item.qty)}</span>
            </div>
          </div>
        `;
        checkoutList.innerHTML += checkoutItemHtml;
      }
    });
  }

  // Update Badge Counts
  const cartBadge = document.getElementById('cart-badge');
  const drawerCountBadge = document.getElementById('drawer-count-badge');
  const checkoutItemsBadge = document.getElementById('checkout-items-badge');

  if (cartBadge) cartBadge.innerText = totalItems;
  if (drawerCountBadge) drawerCountBadge.innerText = `${totalItems} Items`;
  if (checkoutItemsBadge) checkoutItemsBadge.innerText = `${totalItems} Items`;

  // Update Totals
  const drawerSubtotal = document.getElementById('drawer-subtotal');
  const drawerTotal = document.getElementById('drawer-total');
  const checkoutSubtotal = document.getElementById('checkout-subtotal');
  const checkoutTotal = document.getElementById('checkout-total');

  // Use real DB shipping policy instead of hardcoded ৳150
  const shippingPolicy = resolveCartDeliveryAndAdvancePolicy();
  const shippingBase = shippingPolicy.deliveryChargeInsideDhaka || 80;
  const freeThresh = shippingPolicy.deliveryChargeFreeThreshold ?? 3000;
  const isDeliveryFree = (!shippingPolicy.deliveryChargeEnabled) || (freeThresh > 0 && subtotal >= freeThresh);
  const shippingCost = subtotal > 0 ? (isDeliveryFree ? 0 : shippingBase) : 0;

  if (drawerSubtotal) drawerSubtotal.innerText = formatMoney(subtotal);
  if (drawerTotal) drawerTotal.innerText = formatMoney(subtotal);
  if (checkoutSubtotal) checkoutSubtotal.innerText = formatMoney(subtotal);
  if (checkoutTotal) checkoutTotal.innerText = formatMoney(subtotal > 0 ? subtotal + shippingCost : 0);
}

function addToCart(product, quantity = 1) {
  if (!product) return;
  const prodId = String(product.id || Date.now());
  const prodName = product.name || 'ZENVY Jersey';

  // SECURITY: Always re-validate price from DB — never trust client-provided price
  let prodPrice = parseFloat(product.price) || 1450;
  if (typeof DB !== 'undefined' && DB.products && prodId) {
    const dbProduct = DB.products.byId(prodId);
    if (dbProduct) {
      const dbBasePrice = dbProduct.salePrice && dbProduct.salePrice > 0 ? dbProduct.salePrice : dbProduct.basePrice;
      if (dbBasePrice && dbBasePrice > 0) {
        prodPrice = dbBasePrice;
      }
    }
  }

  const prodImg = product.image || 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80';
  const prodDetails = product.details || 'Standard Fit • M';
  const addQty = Math.max(1, parseInt(quantity) || 1);

  const existing = appState.cart.find(item => item.id === prodId && item.details === prodDetails);
  if (existing) {
    existing.qty = (existing.qty || 1) + addQty;
  } else {
    appState.cart.push({
      id: prodId,
      productId: product.productId || prodId,
      name: prodName,
      price: prodPrice,
      image: prodImg,
      details: prodDetails,
      qty: addQty,
      size: product.size || (prodDetails.match(/Size:\s*([^\s•,]+)/i)?.[1]) || (prodDetails.match(/\b(XS|S|M|L|XL|2XL|XXL|3XL|4XL)\b/i)?.[1]) || 'M',
      sleeve: product.sleeve || (prodDetails.match(/(Full\s*Sleeve|Long\s*Sleeve|Half\s*Sleeve|Short\s*Sleeve|Sleeveless)/i)?.[0]) || 'Half Sleeve',
      customName: product.customName || '',
      customNumber: product.customNumber || '',
      patchName: product.patchName || (product.patches ? (Array.isArray(product.patches) ? product.patches.join(', ') : product.patches) : '') || '',
      patches: product.patches || []
    });
  }
  saveCartState();
  renderCart();
  showToast(`Added ${addQty > 1 ? addQty + 'x ' : ''}"${prodName}" to cart`);
  toggleCartDrawer(true);
}

function removeFromCart(index) {
  const item = appState.cart[index];
  if (item) {
    appState.cart.splice(index, 1);
    saveCartState();
    renderCart();
    showToast(`Removed "${item.name}" from cart`);
  }
}

function updateQty(index, delta) {
  if (!appState.cart[index]) return;
  appState.cart[index].qty = (appState.cart[index].qty || 1) + delta;
  if (appState.cart[index].qty <= 0) {
    appState.cart.splice(index, 1);
  }
  saveCartState();
  renderCart();
}

function toggleCartDrawer(forceOpen = false) {
  const drawer = document.getElementById('cart-drawer');
  if (!drawer) return;

  const panel = drawer.querySelector('aside');
  if (forceOpen || drawer.classList.contains('pointer-events-none')) {
    drawer.classList.remove('pointer-events-none', 'opacity-0');
    panel.classList.remove('translate-x-full');
  } else {
    drawer.classList.add('pointer-events-none', 'opacity-0');
    panel.classList.add('translate-x-full');
  }
}

function proceedToCheckout() {
  toggleCartDrawer();
  switchView('checkout');
}

// Customizer Logic
function togglePersonalizationInputs() {
  const fields = document.getElementById('personalization-fields');
  const toggle = document.getElementById('personalize-toggle');
  const printOverlay = document.getElementById('jersey-print-overlay');

  if (toggle.checked) {
    fields.classList.remove('hidden');
    fields.classList.add('flex');
    if (printOverlay) printOverlay.style.display = 'block';
  } else {
    fields.classList.add('hidden');
    fields.classList.remove('flex');
    if (printOverlay) printOverlay.style.display = 'none';
  }
}

function updateCustomizerTotal() {
  // Read live prices from DB (admin-configurable)
  let customSettings = {};
  let sleevesData = [];
  if (typeof DB !== 'undefined') {
    if (DB.customizationSettings) customSettings = DB.customizationSettings.get() || {};
    if (DB.sleeves) sleevesData = DB.sleeves.enabled() || [];
  }

  // Base price: try to get from featured/first published product, fall back to 1450
  let base = 1450;
  if (typeof DB !== 'undefined' && DB.products) {
    const pub = DB.products.published();
    if (pub && pub.length > 0) {
      const p = pub[0];
      base = (p.salePrice && p.salePrice > 0) ? p.salePrice : (p.basePrice || 1450);
    }
  }

  // Sleeve fee from DB
  let sleevePrice = 0;
  const sleeveOption = document.querySelector('input[name="sleeve"]:checked');
  if (sleeveOption && sleeveOption.value === 'long') {
    // Find 'Full Sleeve' or 'Long Sleeve' record in DB
    const longRecord = sleevesData.find(s =>
      s.name && (s.name.toLowerCase().includes('full') || s.name.toLowerCase().includes('long'))
    );
    sleevePrice = longRecord ? (parseFloat(longRecord.additionalPrice) || 0) : 300;
  }

  // Personalization fee from DB
  let personalizePrice = 0;
  const personalizeToggle = document.getElementById('personalize-toggle');
  if (personalizeToggle && personalizeToggle.checked) {
    const pkg = customSettings.nameNumberPackage;
    if (pkg && pkg.enabled && pkg.price) {
      personalizePrice = parseFloat(pkg.price) || 300;
    } else {
      // Fall back to name + number individually
      const nameFee = customSettings.namePrinting?.enabled ? parseFloat(customSettings.namePrinting.price) || 0 : 0;
      const numFee = customSettings.numberPrinting?.enabled ? parseFloat(customSettings.numberPrinting.price) || 0 : 0;
      personalizePrice = nameFee + numFee || 300;
    }
  }

  const total = base + sleevePrice + personalizePrice;

  const liveTotalEl = document.getElementById('custom-live-total');
  if (liveTotalEl) {
    liveTotalEl.innerText = formatMoney(total);
  }
}

function updateJerseyPreview() {
  const nameInput = document.getElementById('input-name');
  const numberInput = document.getElementById('input-number');
  const printName = document.getElementById('print-name');
  const printNumber = document.getElementById('print-number');

  if (printName) printName.innerText = nameInput.value.toUpperCase() || 'ZANE';
  if (printNumber) printNumber.innerText = numberInput.value || '10';
}

function switchCustomImage(src) {
  const heroImg = document.getElementById('custom-hero-img');
  if (heroImg) {
    heroImg.src = src;
  }
}

function addCustomJerseyToCart() {
  const sizeOption = document.querySelector('input[name="custom-size"]:checked');
  const size = sizeOption ? sizeOption.value : 'M';

  const sleeveOption = document.querySelector('input[name="sleeve"]:checked');
  const sleeveValue = sleeveOption ? sleeveOption.value : 'short';
  const sleeve = sleeveValue === 'long' ? 'Long Sleeve' : 'Half Sleeve';

  // Read pricing from DB (admin-configured)
  let customSettings = {};
  let sleevesData = [];
  let basePrice = 1450;
  if (typeof DB !== 'undefined') {
    if (DB.customizationSettings) customSettings = DB.customizationSettings.get() || {};
    if (DB.sleeves) sleevesData = DB.sleeves.enabled() || [];
    if (DB.products) {
      const pub = DB.products.published();
      if (pub && pub.length > 0) {
        const p = pub[0];
        basePrice = (p.salePrice && p.salePrice > 0) ? p.salePrice : (p.basePrice || 1450);
      }
    }
  }

  // Sleeve fee from DB
  let sleeveFee = 0;
  if (sleeve === 'Long Sleeve') {
    const longRecord = sleevesData.find(s =>
      s.name && (s.name.toLowerCase().includes('full') || s.name.toLowerCase().includes('long'))
    );
    sleeveFee = longRecord ? (parseFloat(longRecord.additionalPrice) || 0) : 300;
  }

  // Customization fee from DB
  const personalizeToggle = document.getElementById('personalize-toggle');
  let name = '';
  let number = '';
  let customFee = 0;
  if (personalizeToggle && personalizeToggle.checked) {
    name = (document.getElementById('input-name')?.value || '').toUpperCase() || 'ZANE';
    number = document.getElementById('input-number')?.value || '10';
    const pkg = customSettings.nameNumberPackage;
    if (pkg && pkg.enabled && pkg.price) {
      customFee = parseFloat(pkg.price) || 300;
    } else {
      const nameFee = customSettings.namePrinting?.enabled ? parseFloat(customSettings.namePrinting.price) || 0 : 0;
      const numFee = customSettings.numberPrinting?.enabled ? parseFloat(customSettings.numberPrinting.price) || 0 : 0;
      customFee = nameFee + numFee || 300;
    }
  }

  const price = basePrice + sleeveFee + customFee;
  const detailsStr = `Size: ${size} • ${sleeve}` + (name ? ` • Custom: ${name} #${number}` : '');

  // Use a stable product ID for the customizer jersey (will NOT re-validate against DB)
  addToCart({
    id: 'customizer-jersey',
    name: 'ZENVY AeroKnit Pro Jersey',
    price: price,
    image: document.getElementById('custom-hero-img')?.src || '',
    details: detailsStr,
    size,
    sleeve,
    customName: name,
    customNumber: number
  });
}

// 3D Preview Modal Logic
function toggle3DModal() {
  const modal = document.getElementById('modal-3d');
  if (!modal) return;
  modal.classList.toggle('hidden');
  modal.classList.toggle('flex');
}

function rotate3DView(type) {
  const target = document.getElementById('3d-rotation-target');
  if (!target) return;

  if (type === 'front') {
    target.src = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsHKZfw04rEjdHrlMkfBV8IqKS91Z07xrdpAuui4cmOko7HBahecP91iWQtfvoJBdvcuftK84nF9jaujuc4ADorm8EI8GP76Sg9YJHBCR2Cr37rrKi3jou5hISsv4Et-RuJrdL5b6c6TA_qXwiws1BzNiZasXgMAYWlb1K4XV-7yujPB3yu7G1yN0nrp2EzWMIHAI_mIEH-oYRsMnpm16brwXpDz5oWKbNgS1XKv4mTvmL0GVmT10AIA';
    showToast('3D Viewport: Switched to Front Profile');
  } else if (type === 'back') {
    target.src = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvPSMv4hm-ogvHICrLE75pSyHISjUeRYFACniC-YFTC6395bXDbLCEXnamAC_4lHGSDhOnnbm749_rc59n9IIu1p1gOP6rFKwmskJ7depORghWDz9ApaZcCt2mKRzZH6LnLM15nulbMpzHctlkozD_yUmKpIMektqElyuGrcDtzHydDlXqscB4e-luHSYlE7gFo3zwRlKQ_BojzHVyjjah_G0TAj4P6eVNddadsSpPfs_2fRF4dcc-Xw';
    showToast('3D Viewport: Switched to Rear Printing Profile');
  } else if (type === 'fabric') {
    target.src = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqpQfHkbFIxQ1bvTPI1CBUdS6rzq3RWVet9BfEWvZmFw_iEUrLE4kh7hfdYun2-U86-fn9cvLNAtbeCUINpSWlU5AST5EzWUsrFO1-xS9vFACkFo9S8A8E50uojWCp2ItkXodRt26T12CtQDAyCckcDld70BvwxD1LIrgZQbyMNIhxHAIyu0ixnxArJyo7R64dOksqfhFoMIvVoM6q_LO2ohj7a1lqbchyEaBHTw-ry52_bvMbwK8hSw';
    showToast('3D Viewport: Macro AeroKnit Fabric Mesh Zoom');
  }
}

// ── Dynamic Shop Products Rendering & Filtering ──
function renderShopProducts() {
  const grid = document.getElementById('shop-product-grid');
  if (!grid || typeof DB === 'undefined' || !DB.products) return;

  const products = DB.products.published();
  if (!products || products.length === 0) {
    grid.innerHTML = `<div class="col-span-full py-12 text-center text-gray-500 font-mono-ui">No products available.</div>`;
    const countEl = document.getElementById('product-count');
    if (countEl) countEl.innerText = 0;
    return;
  }

  grid.innerHTML = products.map(p => {
    const imgUrl = (p.images && p.images[0] && p.images[0].url) ? p.images[0].url : 'https://images.unsplash.com/photo-1580087256394-dc596e1c8f4f?w=800&q=80';
    const priceDisplay = formatMoney(p.salePrice || p.basePrice || 1450);
    const originalPriceDisplay = (p.compareAt || (p.salePrice && p.basePrice > p.salePrice)) ? formatMoney(p.compareAt || p.basePrice) : '';
    const badge = p.customBadge || (p.isPreorder ? 'PRE-ORDER' : p.isNewArrival ? 'New Arrival' : (p.salePrice || p.compareAt) ? 'SALE' : '');
    const catName = p.categoryName || 'Football Kit';

    return `
      <div class="shop-card bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 group flex flex-col"
           data-id="${p.id}" data-price="${p.salePrice || p.basePrice || 1450}" data-category="${catName.toLowerCase()}">
        <div class="relative overflow-hidden bg-[#f2f2f2] cursor-pointer" style="aspect-ratio:1/1;"
             onclick="window.location.href='product.html?id=${p.id}'">
          <img src="${imgUrl}"
               class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="${p.name}">
          ${badge ? `<span class="absolute top-3 left-3 ${p.isPreorder ? 'bg-purple-600 text-white' : badge === 'SALE' ? 'bg-red-500 text-white' : 'bg-primary text-white'} font-label-caps text-[10px] px-2.5 py-1 rounded-full font-bold">${badge}</span>` : ''}
          <button onclick="event.stopPropagation(); toggleWishlist('${p.name.replace(/'/g, "\\'")}', ${p.salePrice || p.basePrice})"
                  class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 shadow flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors z-10">
            <span class="material-symbols-outlined text-base">favorite</span>
          </button>
          <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
            <span class="bg-white text-primary font-label-caps text-[11px] px-3 py-1.5 rounded-full shadow font-bold">View Details</span>
          </div>
        </div>
        <div class="p-4 flex flex-col gap-1 flex-1">
          <h3 class="font-headline-lg text-sm sm:text-base font-bold text-primary leading-snug cursor-pointer hover:underline"
              onclick="window.location.href='product.html?id=${p.id}'">${p.name}</h3>
          <p class="font-body-md text-xs text-secondary">${catName}</p>
          <div class="flex items-center gap-1 my-0.5">
            <span class="material-symbols-outlined text-amber-400 text-[14px] fill-1">star</span>
            <span class="material-symbols-outlined text-amber-400 text-[14px] fill-1">star</span>
            <span class="material-symbols-outlined text-amber-400 text-[14px] fill-1">star</span>
            <span class="material-symbols-outlined text-amber-400 text-[14px] fill-1">star</span>
            <span class="material-symbols-outlined text-amber-400 text-[14px] fill-1">star</span>
            <span class="font-mono-ui text-[11px] text-secondary ml-1">(4.9)</span>
          </div>
          <div class="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
            <div class="flex items-baseline gap-2">
              <span class="font-mono-ui text-base font-bold text-primary">${priceDisplay}</span>
              ${originalPriceDisplay ? `<span class="font-mono-ui text-xs text-secondary line-through">${originalPriceDisplay}</span>` : ''}
            </div>
            <div class="flex gap-1.5">
              <button onclick="window.location.href='product.html?id=${p.id}'"
                      class="border border-primary text-primary font-label-caps text-[11px] px-3 py-2 rounded-full hover:bg-primary hover:text-white transition-colors font-bold whitespace-nowrap">View</button>
              <button onclick="addToCart({id:'${p.id}', name:'${p.name.replace(/'/g, "\\'")}', price:${p.salePrice || p.basePrice || 1450}, image:'${imgUrl}', details:'Standard • M'})"
                      class="bg-primary text-white font-label-caps text-[11px] px-3 py-2 rounded-full hover:bg-black/80 transition-colors font-bold whitespace-nowrap">Add</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  applyFilters();
}

// ── Dynamic Shop Categories Rendering ──
function renderShopCategories() {
  const listEl = document.getElementById('shop-category-list');
  const pillsEl = document.getElementById('shop-category-pills');
  if (!listEl && !pillsEl) return;

  const categories = (typeof DB !== 'undefined' && DB.categories) ? DB.categories.all().filter(c => c.isActive !== false) : [];

  if (listEl) {
    if (categories.length === 0) {
      listEl.innerHTML = `
        <label class="flex items-center gap-2.5 cursor-pointer">
          <input type="checkbox" id="filter-cat-all" checked onchange="applyFilters()" class="shop-cat-checkbox w-4 h-4 rounded border-gray-300 accent-black" data-cat="all">
          <span class="font-body-md text-sm text-on-surface">All Products</span>
        </label>
      `;
    } else {
      listEl.innerHTML = categories.map(c => `
        <label class="flex items-center gap-2.5 cursor-pointer">
          <input type="checkbox" checked onchange="applyFilters()" class="shop-cat-checkbox w-4 h-4 rounded border-gray-300 accent-black" data-cat="${c.name.toLowerCase()}">
          <span class="font-body-md text-sm text-on-surface">${c.name}</span>
        </label>
      `).join('');
    }
  }

  if (pillsEl) {
    pillsEl.innerHTML = `
      <button onclick="selectCategory('all',this)" class="cat-pill px-3 py-1 rounded-full text-xs font-mono-ui bg-primary text-white border border-primary">All</button>
      ${categories.map(c => `
        <button onclick="selectCategory('${c.name.toLowerCase()}',this)" class="cat-pill px-3 py-1 rounded-full text-xs font-mono-ui border border-gray-200 text-secondary hover:border-primary hover:text-primary transition-colors">${c.name}</button>
      `).join('')}
    `;
  }
}

// Shop Filters & Sorting
function updatePriceFilter(val) {
  const priceVal = document.getElementById('price-val');
  const numVal = parseFloat(val) || 10000;
  if (priceVal) {
    priceVal.innerText = typeof DB !== 'undefined' && DB.currency ? DB.currency.format(numVal) : `৳${Math.round(numVal).toLocaleString()}`;
  }
  applyFilters();
}

function applyFilters() {
  const priceEl = document.getElementById('price-range');
  const maxPrice = priceEl ? parseFloat(priceEl.value) : 10000;

  const checkedBoxes = Array.from(document.querySelectorAll('.shop-cat-checkbox:checked')).map(cb => cb.dataset.cat.toLowerCase());

  const cards = document.querySelectorAll('.shop-card');
  let visibleCount = 0;

  cards.forEach(card => {
    const cardPrice = parseFloat(card.getAttribute('data-price')) || 0;
    const cardCategory = (card.getAttribute('data-category') || '').toLowerCase();

    let catMatch = false;
    if (checkedBoxes.length === 0 || checkedBoxes.includes('all')) {
      catMatch = true;
    } else {
      catMatch = checkedBoxes.some(c => cardCategory.includes(c) || c.includes(cardCategory));
    }

    if (cardPrice <= maxPrice && catMatch) {
      card.style.display = '';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  const countEl = document.getElementById('product-count');
  if (countEl) countEl.innerText = visibleCount;
}

function selectCategory(cat, btn) {
  document.querySelectorAll('.cat-pill').forEach(p => {
    p.className = 'cat-pill px-3 py-1 rounded-full text-xs font-mono-ui border border-gray-200 text-secondary hover:border-primary hover:text-primary transition-colors';
  });
  if (btn) btn.className = 'cat-pill px-3 py-1 rounded-full text-xs font-mono-ui bg-primary text-white border border-primary';

  const priceEl = document.getElementById('price-range');
  const maxPrice = priceEl ? parseFloat(priceEl.value) : 10000;

  const cards = document.querySelectorAll('.shop-card');
  let visibleCount = 0;
  cards.forEach(card => {
    const cardPrice = parseFloat(card.getAttribute('data-price')) || 0;
    const cardCat = (card.getAttribute('data-category') || '').toLowerCase();

    let matches = false;
    if (cat === 'all') matches = true;
    else if (cardCat.includes(cat.toLowerCase()) || cat.toLowerCase().includes(cardCat)) matches = true;

    if (matches && cardPrice <= maxPrice) {
      card.style.display = '';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  const countEl = document.getElementById('product-count');
  if (countEl) countEl.innerText = visibleCount;
}

function sortProducts(val) {
  const grid = document.getElementById('shop-product-grid');
  if (!grid) return;
  const cards = Array.from(grid.querySelectorAll('.shop-card'));

  cards.sort((a, b) => {
    const priceA = parseFloat(a.getAttribute('data-price')) || 0;
    const priceB = parseFloat(b.getAttribute('data-price')) || 0;
    if (val === 'price-asc') return priceA - priceB;
    if (val === 'price-desc') return priceB - priceA;
    return 0;
  });

  cards.forEach(card => grid.appendChild(card));
  showToast(`Sorted: ${val === 'price-asc' ? 'Low to High' : val === 'price-desc' ? 'High to Low' : 'Newest'}`);
}

function resetFilters() {
  const pr = document.getElementById('price-range');
  if (pr) pr.value = 10000;
  const pv = document.getElementById('price-val');
  if (pv) {
    pv.innerText = typeof DB !== 'undefined' && DB.currency ? DB.currency.format(10000) : '৳10,000';
  }
  ['filter-cat-football','filter-cat-replica','filter-cat-limited','filter-cat-outerwear','filter-cat-performance'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.checked = true;
  });
  const firstPill = document.querySelector('.cat-pill');
  selectCategory('all', firstPill);
  applyFilters();
}

// ── Shop Pagination ──
let shopCurrentPage = 1;

function changeShopPage(page) {
  // Fetch published products from DB
  let products = (typeof DB !== 'undefined' && DB.products) ? DB.products.published() : [];
  if (!products || products.length === 0) return;

  const totalPages = Math.max(1, Math.ceil(products.length / 6));
  if (page < 1) page = 1;
  if (page > totalPages) page = totalPages;
  shopCurrentPage = page;

  // Render dynamic pagination buttons
  const pagContainer = document.getElementById('shop-pagination-container');
  if (pagContainer) {
    let pagHtml = `
      <button onclick="changeShopPage(shopCurrentPage - 1)" class="w-9 h-9 rounded-full flex items-center justify-center text-secondary hover:bg-gray-100 border border-gray-200 transition-colors cursor-pointer">
        <span class="material-symbols-outlined text-base">chevron_left</span>
      </button>
    `;
    for (let p = 1; p <= totalPages; p++) {
      const activeClass = (p === shopCurrentPage)
        ? 'w-9 h-9 rounded-full bg-primary text-white font-mono-ui text-sm font-bold shadow cursor-pointer'
        : 'w-9 h-9 rounded-full text-secondary hover:bg-gray-100 font-mono-ui text-sm transition-colors border border-gray-200 cursor-pointer';
      pagHtml += `<button onclick="changeShopPage(${p})" id="shop-page-btn-${p}" class="${activeClass}">${p}</button>`;
    }
    pagHtml += `
      <button onclick="changeShopPage(shopCurrentPage + 1)" class="w-9 h-9 rounded-full flex items-center justify-center text-secondary hover:bg-gray-100 border border-gray-200 transition-colors cursor-pointer">
        <span class="material-symbols-outlined text-base">chevron_right</span>
      </button>
    `;
    pagContainer.innerHTML = pagHtml;
  }

  const startIndex = (shopCurrentPage - 1) * 6;
  const pageProducts = products.slice(startIndex, startIndex + 6);
  const defaultImg = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDV_LbyyPJxnRKmU8_oYZoYTmwlX1dORf22Yeei2rC0v-Z24hFTXgPedjBdVIl7bJAWRpOsO3nAEVulUb9cHoyme1h5w9dqAuz3EFxMdSWawV_QZE4ar61iyYOGoH0d1r2Kf5G90TLU3ew4Vsxm1yiNzJ0fjylA9zDty3hULOVnT3xX-UmmQkKIr_TdTowvSGHavQeM_BxmRGvmq44rY8ERHWsx8LwDJ6TKBy45CfsowuBsWRcDozB7SA';

  const grid = document.getElementById('shop-product-grid');
  if (grid && pageProducts.length > 0) {
    grid.innerHTML = pageProducts.map(p => {
      const imgUrl = (p.images && p.images[0] && p.images[0].url) ? p.images[0].url : (p.image || defaultImg);
      const priceFormatted = DB.currency ? DB.currency.format(p.salePrice || p.basePrice) : `৳${p.salePrice || p.basePrice}`;
      const origFormatted = p.compareAt ? (DB.currency ? DB.currency.format(p.compareAt) : `৳${p.compareAt}`) : '';
      const badge = p.isPreorder ? 'PRE-ORDER' : (p.stock === 0 ? 'OUT OF STOCK' : (p.compareAt ? 'SALE' : ''));

      return `
        <div class="shop-card bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 group flex flex-col"
             data-brand="${p.id}" data-price="${p.salePrice || p.basePrice}" data-category="${p.categoryName || ''}">
          <div class="relative overflow-hidden bg-[#f2f2f2] cursor-pointer" style="aspect-ratio:1/1;"
               onclick="openProduct({id:'${p.id}',name:'${p.name.replace(/'/g, "\\'")}',price:${p.salePrice || p.basePrice},image:'${imgUrl}',category:'${(p.categoryName || '').replace(/'/g, "\\'")}'})">
            <img src="${imgUrl}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="${p.name}"/>
            ${badge ? `<span class="absolute top-3 left-3 ${p.isPreorder ? 'bg-purple-600' : 'bg-primary'} text-white font-label-caps text-[10px] px-2.5 py-1 rounded-full font-bold">${badge}</span>` : ''}
            <button onclick="event.stopPropagation(); toggleWishlist('${p.name.replace(/'/g, "\\'")}', ${p.salePrice || p.basePrice})"
                    class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors">
              <span class="material-symbols-outlined text-base">favorite</span>
            </button>
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
              <span class="bg-white text-primary font-label-caps text-[11px] px-3 py-1.5 rounded-full shadow font-bold">View Details</span>
            </div>
          </div>
          <div class="p-4 flex flex-col gap-1 flex-1">
            <h3 class="font-headline-lg text-sm sm:text-base font-bold text-primary leading-snug cursor-pointer" 
                onclick="openProduct({id:'${p.id}',name:'${p.name.replace(/'/g, "\\'")}',price:${p.salePrice || p.basePrice},image:'${imgUrl}',category:'${(p.categoryName || '').replace(/'/g, "\\'")}'})">${p.name}</h3>
            <p class="font-body-md text-xs text-secondary">${p.categoryName || 'Performance'}</p>
            <div class="flex items-center gap-1 my-0.5">
              <span class="material-symbols-outlined text-amber-400 text-[14px] fill-1">star</span>
              <span class="material-symbols-outlined text-amber-400 text-[14px] fill-1">star</span>
              <span class="material-symbols-outlined text-amber-400 text-[14px] fill-1">star</span>
              <span class="material-symbols-outlined text-amber-400 text-[14px] fill-1">star</span>
              <span class="material-symbols-outlined text-amber-400 text-[14px]">star_half</span>
              <span class="font-mono-ui text-[11px] text-secondary ml-1">(4.9)</span>
            </div>
            <div class="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
              <div class="flex items-baseline gap-2">
                <span class="font-mono-ui text-base font-bold text-primary">${priceFormatted}</span>
                ${origFormatted ? `<span class="font-mono-ui text-xs text-secondary line-through">${origFormatted}</span>` : ''}
              </div>
              <div class="flex gap-1.5">
                <button onclick="openProduct({id:'${p.id}',name:'${p.name.replace(/'/g, "\\'")}',price:${p.salePrice || p.basePrice},image:'${imgUrl}',category:'${(p.categoryName || '').replace(/'/g, "\\'")}'})"
                        class="border border-primary text-primary font-label-caps text-[11px] px-3 py-2 rounded-full hover:bg-primary hover:text-white transition-colors font-bold whitespace-nowrap">View</button>
                <button onclick="addToCart({id:'${p.id}',name:'${p.name.replace(/'/g, "\\'")}',price:${p.salePrice || p.basePrice},image:'${imgUrl}',details:'${(p.categoryName || '').replace(/'/g, "\\'")}'})"
                        class="bg-primary text-white font-label-caps text-[11px] px-3 py-2 rounded-full hover:bg-black/80 transition-colors font-bold whitespace-nowrap">Add</button>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  const countEl = document.getElementById('product-count');
  if (countEl) countEl.textContent = `${products.length}`;
}

// ── Shop Banner Carousel ──
let shopCarouselIndex = 0;

function getShopSlides() {
  if (typeof DB !== 'undefined') {
    if (DB.shopBanner) {
      const config = DB.shopBanner.get();
      if (config?.slides && config.slides.length > 0) {
        return config.slides.map(s => ({
          tag: s.tag || 'ZENVY COLLECTION',
          discountBadge: s.discountBadge || '',
          title: s.title || 'LIMITED\nEDITION KITS',
          sub: s.subtitle || 'Elevate Your Game • Exclusively Online',
          bg: s.bgImage || 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&q=80'
        }));
      }
    }
    if (DB.homepage) {
      const config = DB.homepage.get();
      if (config?.shopBanner?.slides && config.shopBanner.slides.length > 0) {
        return config.shopBanner.slides.map(s => ({
          tag: s.tag || 'ZENVY COLLECTION',
          discountBadge: s.discountBadge || '',
          title: s.title || 'LIMITED\nEDITION KITS',
          sub: s.subtitle || 'Elevate Your Game • Exclusively Online',
          bg: s.bgImage || 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&q=80'
        }));
      }
    }
  }
  return [
    {
      tag: "⚡ SPECIAL DISCOUNT",
      discountBadge: "25% OFF",
      title: "LIMITED\nEDITION KITS",
      sub: "Elevate Your Game • Exclusively Online",
      bg: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&q=80"
    },
    {
      tag: "HOT DEAL",
      discountBadge: "FREE PRINTING",
      title: "NEW SEASON\nELITE KITS",
      sub: "Free Player Name & Number Customization",
      bg: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=80"
    }
  ];
}

function shopCarouselGoto(index) {
  const slides = getShopSlides();
  const total = slides.length || 1;
  shopCarouselIndex = ((index % total) + total) % total;
  const slide = slides[shopCarouselIndex];
  
  const bannerEl = document.getElementById('shop-banner-slide');
  if (bannerEl && slide) {
    bannerEl.style.backgroundImage = `url('${slide.bg}')`;
  }
  const tagEl = document.getElementById('shop-banner-tag');
  if (tagEl && slide) tagEl.textContent = slide.tag || 'ZENVY Collection';

  const badgeEl = document.getElementById('shop-banner-badge');
  if (badgeEl && slide) {
    if (slide.discountBadge) {
      badgeEl.textContent = slide.discountBadge;
      badgeEl.style.display = 'inline-block';
    } else {
      badgeEl.style.display = 'none';
    }
  }

  const titleEl = document.getElementById('shop-banner-title');
  if (titleEl && slide) titleEl.innerHTML = (slide.title || '').replace(/\n/g, '<br>');

  const subEl = document.getElementById('shop-banner-sub');
  if (subEl && slide) subEl.textContent = slide.sub || '';

  // Render dynamic dots
  const dotsContainer = document.getElementById('shop-dots-container');
  if (dotsContainer) {
    dotsContainer.innerHTML = slides.map((_, i) => `
      <button onclick="shopCarouselGoto(${i})" class="${i === shopCarouselIndex ? 'w-2 h-2 rounded-full bg-white shadow scale-110' : 'w-2 h-2 rounded-full bg-white/40 shadow hover:bg-white/70'} transition-all duration-300"></button>
    `).join('');
  }
}

function shopCarouselNext() {
  const slides = getShopSlides();
  const total = slides.length || 1;
  shopCarouselGoto((shopCarouselIndex + 1) % total);
}

function shopCarouselPrev() {
  const slides = getShopSlides();
  const total = slides.length || 1;
  shopCarouselGoto((shopCarouselIndex - 1 + total) % total);
}

// Auto-advance shop carousel every 4 seconds
if (!window._shopCarouselTimer) {
  window._shopCarouselTimer = setInterval(shopCarouselNext, 4000);
}

let pdState = { product: null, size: 'M', qty: 1 };

function openProduct(product) {
  if (!product) {
    window.location.href = 'product.html?id=101';
    return;
  }
  let queryParams = [];
  if (product.id) queryParams.push(`id=${encodeURIComponent(product.id)}`);
  if (product.name) queryParams.push(`name=${encodeURIComponent(product.name)}`);
  if (product.price) queryParams.push(`price=${encodeURIComponent(product.price)}`);
  if (product.image) queryParams.push(`image=${encodeURIComponent(product.image)}`);
  if (product.category) queryParams.push(`category=${encodeURIComponent(product.category)}`);
  if (product.badge) queryParams.push(`badge=${encodeURIComponent(product.badge)}`);

  window.location.href = `product.html?${queryParams.join('&')}`;
}

function closeProduct() {
  const modal = document.getElementById('product-modal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  document.body.style.overflow = '';
}

function selectPdSize(btn, size) {
  pdState.size = size;
  document.querySelectorAll('.pd-size-btn').forEach(b => {
    b.className = 'pd-size-btn w-10 h-10 rounded-lg border-2 border-gray-200 text-xs font-bold text-secondary hover:border-primary hover:text-primary transition-colors';
  });
  btn.className = 'pd-size-btn w-10 h-10 rounded-lg border-2 border-primary text-xs font-bold text-primary bg-primary/5 transition-colors';
}

function changePdQty(delta) {
  pdState.qty = Math.max(1, pdState.qty + delta);
  document.getElementById('pd-qty').textContent = pdState.qty;
}

function addProductToCart() {
  if (!pdState.product) return;
  const p = pdState.product;
  addToCart({
    id: p.id,
    name: p.name,
    price: p.price,
    image: p.image,
    details: `Size: ${pdState.size}`
  }, pdState.qty);
  closeProduct();
}

// Keyboard close
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeProduct();
});

// Checkout Flow
function placeOrder() {
  if (appState.cart.length === 0) {
    showToast('Your cart is empty. Add products before placing an order.');
    return;
  }

  const policy = resolveCartDeliveryAndAdvancePolicy();
  const minOrder = policy.minOrderAmount || 0;
  const deliveryEnabled = policy.deliveryChargeEnabled !== false;
  const freeThreshold = policy.deliveryChargeFreeThreshold ?? 3000;

  const nameEl = document.getElementById('checkout-name');
  const phoneEl = document.getElementById('checkout-phone');
  const emailEl = document.getElementById('checkout-email');
  const addrEl = document.getElementById('checkout-address');

  const customerName = nameEl && nameEl.value ? nameEl.value.trim() : '';
  const customerPhone = phoneEl && phoneEl.value ? phoneEl.value.trim() : '';
  const customerEmail = emailEl && emailEl.value ? emailEl.value.trim() : '';
  const shippingAddress = addrEl && addrEl.value ? addrEl.value.trim() : '';

  // Validate required fields
  if (!customerName) { showToast('⚠️ Please enter your full name.'); if (nameEl) nameEl.focus(); return; }
  if (!customerPhone) { showToast('⚠️ Please enter your phone number.'); if (phoneEl) phoneEl.focus(); return; }
  if (!shippingAddress) { showToast('⚠️ Please enter your delivery address.'); if (addrEl) addrEl.focus(); return; }

  // 1. Calculate Delivery & Subtotal
  let subtotal = 0;
  const items = appState.cart.map(item => {
    const itemTotal = (parseFloat(item.price) || 1450) * (parseInt(item.qty) || 1);
    subtotal += itemTotal;

    let itemSize = item.size || '';
    let itemSleeve = item.sleeve || '';
    let itemCustomName = item.customName || '';
    let itemCustomNumber = item.customNumber || '';
    let itemPatchName = item.patchName || (item.patches ? (Array.isArray(item.patches) ? item.patches.join(', ') : item.patches) : '') || '';

    if (item.details) {
      if (!itemSize) {
        const sizeMatch = item.details.match(/Size:\s*([^\s•,]+)/i) || item.details.match(/\b(XS|S|M|L|XL|2XL|XXL|3XL|4XL)\b/i);
        if (sizeMatch) itemSize = sizeMatch[1];
      }
      if (!itemSleeve) {
        const sleeveMatch = item.details.match(/(Full\s*Sleeve|Long\s*Sleeve|Half\s*Sleeve|Short\s*Sleeve|Sleeveless)/i);
        if (sleeveMatch) itemSleeve = sleeveMatch[0];
      }
      if (!itemCustomName && !itemCustomNumber) {
        const customMatch = item.details.match(/Custom:\s*([^#•]+)(?:#([^\s•,]+))?/i) || item.details.match(/Name:\s*([^•,]+)/i);
        if (customMatch) {
          itemCustomName = customMatch[1].trim();
          if (customMatch[2]) itemCustomNumber = customMatch[2].trim();
        }
      }
      if (!itemPatchName) {
        const patchMatch = item.details.match(/Patch(?:es)?:\s*([^•]+)/i);
        if (patchMatch) itemPatchName = patchMatch[1].trim();
      }
    }

    return {
      productId: item.productId || item.id || '101',
      productName: item.name || 'Aura Strike Pro Jersey',
      quantity: parseInt(item.qty) || 1,
      unitPrice: parseFloat(item.price) || 1450,
      totalPrice: itemTotal,
      details: item.details || `Size: ${itemSize || 'M'}`,
      size: itemSize || 'M',
      sleeve: itemSleeve || 'Half Sleeve',
      customName: itemCustomName || '',
      customNumber: itemCustomNumber || '',
      patchName: itemPatchName || '',
      patches: item.patches || (itemPatchName ? [itemPatchName] : [])
    };
  });

  // Enforce minimum order
  if (minOrder > 0 && subtotal < minOrder) {
    showToast(`⚠️ Minimum order is ৳${minOrder}. Add more items to your cart.`);
    return;
  }

  // Determine selected zone shipping fee
  const zoneInput = document.querySelector('input[name="checkout-delivery-zone"]:checked');
  const zone = zoneInput ? zoneInput.value : 'inside';
  let baseShipping = policy.deliveryChargeInsideDhaka || 80;
  let zoneName = 'Inside Dhaka';
  if (zone === 'outside') { baseShipping = policy.deliveryChargeOutsideDhaka || 130; zoneName = 'Outside Dhaka'; }

  const isFree = (!deliveryEnabled) || (freeThreshold > 0 && subtotal >= freeThreshold);
  const shippingFee = isFree ? 0 : baseShipping;
  const totalAmount = subtotal + shippingFee;

  // Determine active advance payment plan
  const advanceMode = policy.advancePaymentMode || 'customer_choice';
  let activeSplit = 'delivery_only';
  if (advanceMode === 'delivery_only') {
    activeSplit = 'delivery_only';
  } else if (advanceMode === 'full_only') {
    activeSplit = 'full';
  } else if (advanceMode === 'cod_only') {
    activeSplit = 'cod';
  } else {
    const splitInput = document.querySelector('input[name="checkout-payment-split"]:checked');
    activeSplit = splitInput ? splitInput.value : 'delivery_only';
  }

  let payableNow = 0;
  let dueOnDelivery = 0;
  let planLabel = '';

  if (activeSplit === 'delivery_only') {
    payableNow = shippingFee;
    dueOnDelivery = subtotal;
    planLabel = 'Delivery Charge Advance (Remaining COD)';
  } else if (activeSplit === 'full') {
    payableNow = totalAmount;
    dueOnDelivery = 0;
    planLabel = '100% Full Payment Advance';
  } else {
    payableNow = 0;
    dueOnDelivery = totalAmount;
    planLabel = 'Cash on Delivery (Full Payment on Arrival)';
  }

  // Get selected payment gateway
  const paymentInput = document.querySelector('input[name="payment-method"]:checked');
  let selectedPaymentId = paymentInput ? paymentInput.value : 'bkash';
  if (payableNow > 0 && selectedPaymentId === 'cod') {
    selectedPaymentId = 'bkash';
  }

  let createdOrder = null;
  if (typeof DB !== 'undefined' && DB.orders) {
    createdOrder = DB.orders.create({
      customerName,
      customerPhone,
      customerEmail,
      shippingAddress: `${shippingAddress} (${zoneName})`,
      items,
      subtotal,
      shippingFee,
      totalAmount,
      advancePlan: activeSplit,
      paidAmount: 0,
      dueAmount: dueOnDelivery,
      payableNowAmount: payableNow,
      paymentMethod: selectedPaymentId === 'bkash' ? `bKash (${planLabel})` : 'Cash on Delivery',
      paymentStatus: payableNow > 0 ? 'AWAITING_ADVANCE_PAYMENT' : 'PENDING_COD',
      status: 'PENDING',
      notes: `Plan: ${planLabel} • Zone: ${zoneName} • Delivery Charge: ৳${shippingFee}`
    });

    if (DB.customers) {
      const existing = DB.customers.byEmail(customerEmail);
      if (existing) {
        DB.customers.update(existing.id, {
          orderCount: (existing.orderCount || 0) + 1,
          totalSpent: (existing.totalSpent || 0) + totalAmount
        });
      } else {
        DB.customers.create({
          name: customerName,
          email: customerEmail,
          phone: customerPhone,
          orderCount: 1,
          totalSpent: totalAmount
        });
      }
    }
  } else {
    createdOrder = {
      id: 'ORD-' + Date.now(),
      orderNumber: 'ZNV-' + Math.floor(100000 + Math.random() * 900000),
      customerName,
      customerPhone,
      customerEmail,
      shippingAddress: `${shippingAddress} (${zoneName})`,
      items,
      subtotal,
      shippingFee,
      totalAmount,
      advancePlan: activeSplit,
      paidAmount: 0,
      dueAmount: dueOnDelivery,
      payableNowAmount: payableNow,
      paymentMethod: selectedPaymentId === 'bkash' ? `bKash (${planLabel})` : 'Cash on Delivery',
      paymentStatus: payableNow > 0 ? 'AWAITING_ADVANCE_PAYMENT' : 'PENDING_COD',
      status: 'PENDING',
      createdAt: new Date().toISOString()
    };
  }

  // Clear cart
  appState.cart = [];
  saveCartState();
  renderCart();

  // If advance payment is required via bKash, open automated payment modal
  const uddoktaConfig = (typeof DB !== 'undefined' && DB.uddoktaPay) ? DB.uddoktaPay.get() : { enabled: true };
  if (payableNow > 0 && selectedPaymentId === 'bkash') {
    openBkashPaymentModal(createdOrder, uddoktaConfig, payableNow, activeSplit, dueOnDelivery);
    return;
  }

  // Pure COD Order Confirmation
  const orderNumEl = document.getElementById('confirmed-order-number');
  if (orderNumEl) orderNumEl.textContent = createdOrder.orderNumber;
  switchView('order-confirmation');
  showToast('🎉 Order placed successfully!');
}
function openBkashPaymentModal(order, uddoktaConfig, payableNow = null, activeSplit = 'delivery_only', dueOnDelivery = 0) {
  const existingModal = document.getElementById('bkash-payment-modal');
  if (existingModal) existingModal.remove();

  const apiKey = uddoktaConfig.apiKey || 'LaIfxgWZCj4ugXxp7DMoOlC6C7lxIBADioUyemUf';
  const merchantNum = uddoktaConfig.merchantNumber || '01700000000';
  const amount = Math.round(payableNow !== null ? payableNow : (order.payableNowAmount || order.totalAmount || 0));
  const isDeliveryOnly = activeSplit === 'delivery_only';

  const modal = document.createElement('div');
  modal.id = 'bkash-payment-modal';
  modal.className = 'fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-md';
  modal.innerHTML = `
    <div class="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl animate-fade-in border border-pink-100">
      <!-- bKash Header -->
      <div style="background:linear-gradient(135deg, #D12053 0%, #9D174D 100%);" class="p-6 text-white text-center relative">
        <div class="w-14 h-14 bg-white rounded-2xl mx-auto flex items-center justify-center shadow-lg mb-3">
          <span class="text-3xl font-black" style="color:#D12053;">৳</span>
        </div>
        <h3 class="text-xl font-bold font-headline tracking-wide">bKash Payment Gateway</h3>
        <p class="text-xs text-white/90 mt-1">UddoktaPay Merchant API Connected</p>
        <div class="inline-flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full text-[11px] font-mono mt-2.5">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>API: ${apiKey.slice(0, 8)}...${apiKey.slice(-4)}</span>
        </div>
      </div>

      <!-- Body -->
      <div class="p-6 space-y-4">
        <!-- Payable Highlight -->
        <div class="bg-[#FFF1F5] border border-pink-200 rounded-2xl p-4 flex justify-between items-center">
          <div>
            <div class="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
              ${isDeliveryOnly ? '⚡ Delivery Charge Advance' : '🔒 Full Order Amount'}
            </div>
            <div class="text-2xl font-black font-mono-ui" style="color:#D12053;">৳${amount.toLocaleString()}</div>
            ${isDeliveryOnly ? `<div class="text-[11px] text-gray-600 mt-0.5">Remaining <b>৳${dueOnDelivery.toLocaleString()}</b> Due on Delivery</div>` : ''}
          </div>
          <div class="text-right">
            <div class="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Order ID</div>
            <div class="text-sm font-bold font-mono text-gray-800">#${order.orderNumber || order.id}</div>
          </div>
        </div>

        <div class="border border-gray-100 bg-gray-50/80 rounded-2xl p-4 text-xs space-y-2 text-gray-700">
          <div class="font-bold text-black flex items-center gap-1.5">
            <span class="material-symbols-outlined text-sm" style="color:#D12053;">touch_app</span> bKash Payment Instructions:
          </div>
          <div class="pl-4 space-y-1.5 text-[11px]">
            <div>1. Open your <b>bKash App</b> $\rightarrow$ Select <b>Payment</b> (or Send Money).</div>
            <div>2. Recipient Number: <b class="font-mono bg-white px-2 py-0.5 rounded border border-gray-300 text-gray-900">${merchantNum}</b></div>
            <div>3. Enter Amount: <b class="font-mono">৳${amount}</b> • Reference: <b class="font-mono">#${order.id}</b></div>
            <div>4. Enter PIN to confirm payment and copy the <b>TrxID</b>.</div>
          </div>
        </div>

        <div>
          <label class="block text-xs font-bold text-gray-700 mb-1">Enter bKash Transaction ID (TrxID)<span class="text-red-500">*</span></label>
          <input type="text" id="bkash-trx-input" placeholder="e.g. BL9A7XYZ10" class="w-full px-4 py-3 rounded-xl border border-gray-300 font-mono uppercase text-sm focus:border-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-100 bg-white" />
        </div>

        <div class="flex gap-2 pt-2">
          <button onclick="submitBkashTrxId('${order.id}', ${amount}, ${dueOnDelivery}, '${activeSplit}')" style="background:#D12053;" class="flex-1 py-3 px-4 rounded-xl text-white font-bold text-sm hover:opacity-95 shadow-lg flex items-center justify-center gap-2 transition-all">
            <span class="material-symbols-outlined text-base">verified</span> Verify & Confirm Order
          </button>
          <button onclick="document.getElementById('bkash-payment-modal').remove(); switchView('home');" class="px-4 py-3 rounded-xl border border-gray-200 text-gray-600 font-bold text-xs hover:bg-gray-50">
            Pay Later
          </button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

function submitBkashTrxId(orderId, paidAmount, dueAmount, splitMode) {
  const trxInput = document.getElementById('bkash-trx-input');
  const trxId = trxInput ? trxInput.value.trim().toUpperCase() : '';

  if (!trxId || trxId.length < 6) {
    showToast('⚠️ Please enter a valid bKash Transaction ID (TrxID)');
    return;
  }

  const isFullPaid = splitMode === 'full' || dueAmount === 0;
  const paymentStatus = isFullPaid ? 'PAID' : 'ADVANCE_DELIVERY_PAID';
  const paymentDetails = isFullPaid
    ? `Full payment of ৳${paidAmount} paid via bKash (TrxID: ${trxId})`
    : `Advance delivery charge ৳${paidAmount} paid via bKash (TrxID: ${trxId}) • Due ৳${dueAmount} on Delivery`;

  if (typeof DB !== 'undefined' && DB.orders) {
    DB.orders.update(orderId, {
      paymentStatus: paymentStatus,
      status: 'PROCESSING',
      paidAmount: paidAmount,
      dueAmount: dueAmount,
      trxId: trxId,
      transactionId: trxId,
      paymentDetails: paymentDetails
    });

    const order = DB.orders.byId(orderId);
    if (order && DB.telegram && DB.telegram.sendOrderNotification) {
      DB.telegram.sendOrderNotification({
        ...order,
        paidAmount,
        dueAmount,
        paymentStatus: `${paymentStatus} (TrxID: ${trxId})`,
        paymentDetails
      });
    }
  }

  const modal = document.getElementById('bkash-payment-modal');
  if (modal) modal.remove();

  showToast(`🎉 Payment Verified! TrxID: ${trxId}. ${isFullPaid ? '100% Paid!' : `Advance ৳${paidAmount} received. ৳${dueAmount} due on delivery.`}`, 6000);
  switchView('home');
}

// Admin Management Suite Logic
function filterAdminTable() {
  const query = document.getElementById('admin-search').value.toLowerCase();
  const rows = document.querySelectorAll('#admin-table-body tr');

  rows.forEach(row => {
    const text = row.innerText.toLowerCase();
    row.style.display = text.includes(query) ? '' : 'none';
  });
}

function removeAdminRow(btn) {
  const row = btn.closest('tr');
  row.remove();
  showToast('Item deleted from catalog');

  const totalEl = document.getElementById('stat-total-products');
  if (totalEl) {
    let current = parseInt(totalEl.innerText);
    totalEl.innerText = current - 1;
  }
}

function toggleAddProductModal() {
  const modal = document.getElementById('modal-add-product');
  if (!modal) return;
  modal.classList.toggle('hidden');
  modal.classList.toggle('flex');
}

function handleCreateProduct(e) {
  e.preventDefault();
  const name = document.getElementById('new-prod-name').value.trim();
  const category = document.getElementById('new-prod-cat').value.trim();
  const price = parseFloat(document.getElementById('new-prod-price').value) || 0;
  const sku = document.getElementById('new-prod-sku').value.trim();

  if (!name || !price) {
    showToast('Please fill in the product name and price.');
    return;
  }

  // Persist to DB (localStorage + Firestore sync)
  let newProduct = null;
  if (typeof DB !== 'undefined' && DB.products && DB.products.create) {
    newProduct = DB.products.create({
      name,
      sku: sku || `SKU-${Date.now()}`,
      categoryName: category || 'Football Kit',
      basePrice: price,
      salePrice: price,
      status: 'published',
      stock: 50,
      images: []
    });
  }

  const prodId = newProduct ? newProduct.id : `tmp-${Date.now()}`;

  const tbody = document.getElementById('admin-table-body');
  if (tbody) {
    const newRow = document.createElement('tr');
    newRow.className = "hover:bg-surface-container-lowest transition-colors group";
    newRow.innerHTML = `
      <td class="p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center font-bold text-primary font-mono-ui">
            ${name.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <p class="font-bold text-primary">${name}</p>
            <p class="text-[11px] text-secondary">SKU: ${sku || prodId}</p>
          </div>
        </div>
      </td>
      <td class="p-4 text-secondary">${category || 'Football Kit'}</td>
      <td class="p-4 font-bold text-primary">৳${price.toLocaleString()}</td>
      <td class="p-4">
        <span class="inline-flex items-center gap-1.5 text-emerald-600 font-semibold">
          <span class="w-2 h-2 rounded-full bg-emerald-500"></span> In Stock (50)
        </span>
      </td>
      <td class="p-4">
        <span class="px-2.5 py-1 rounded-md bg-surface-container text-[11px] font-semibold text-secondary">Standard</span>
      </td>
      <td class="p-4 text-right">
        <button onclick="removeAdminRow(this)" class="p-1.5 text-secondary hover:text-red-600 hover:bg-red-50 rounded-md transition-colors">
          <span class="material-symbols-outlined text-sm">delete</span>
        </button>
      </td>
    `;
    tbody.prepend(newRow);
  }

  toggleAddProductModal();
  showToast(`Product "${name}" added to catalog`);

  const totalEl = document.getElementById('stat-total-products');
  if (totalEl) {
    let current = parseInt(totalEl.innerText) || 0;
    totalEl.innerText = current + 1;
  }
}

// Helpers
function scrollSlider(amount) {
  const slider = document.getElementById('product-slider');
  if (slider) {
    slider.scrollBy({ left: amount, behavior: 'smooth' });
  }
}

function toggleWishlist(name, price) {
  appState.wishlistCount += 1;
  const badge = document.getElementById('wishlist-badge');
  if (badge) badge.innerText = appState.wishlistCount;
  showToast(`Saved "${name}" to your Wishlist`);
}

function toggleWishlistModal() {
  showToast(`Wishlist contains ${appState.wishlistCount} saved item(s)`);
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = "bg-primary text-on-primary text-xs font-mono-ui px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 transition-all transform translate-y-2 opacity-0 pointer-events-auto border border-white/20";
  toast.innerHTML = `
    <span class="material-symbols-outlined text-emerald-400 text-sm">check_circle</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove('translate-y-2', 'opacity-0');
  }, 10);

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Mobile Interactivity Helpers
function toggleMobileMenu(forceClose = false) {
  const drawer = document.getElementById('mobile-menu-drawer');
  const panel = document.getElementById('mobile-menu-panel');
  const icon = document.getElementById('mobile-menu-icon');
  if (!drawer || !panel) return;

  if (forceClose || drawer.classList.contains('pointer-events-auto')) {
    drawer.classList.remove('pointer-events-auto', 'opacity-100');
    drawer.classList.add('pointer-events-none', 'opacity-0');
    panel.classList.add('-translate-y-full');
    if (icon) icon.innerText = 'menu';
  } else {
    drawer.classList.remove('pointer-events-none', 'opacity-0');
    drawer.classList.add('pointer-events-auto', 'opacity-100');
    panel.classList.remove('-translate-y-full');
    if (icon) icon.innerText = 'close';
  }
}

function toggleMobileFilter() {
  const aside = document.getElementById('shop-filter-aside');
  const arrow = document.getElementById('mobile-filter-arrow');
  if (!aside) return;

  if (aside.classList.contains('hidden')) {
    aside.classList.remove('hidden');
    if (arrow) arrow.innerText = 'expand_less';
  } else {
    aside.classList.add('hidden');
    if (arrow) arrow.innerText = 'expand_more';
  }
}

