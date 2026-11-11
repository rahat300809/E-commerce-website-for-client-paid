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
window.appState = appState;

// Shop State Globals (Initialized at top to prevent TDZ on quick routing)
var shopCurrentPage = 1;
var shopActiveCategory = 'all';
var shopMaxPrice = 25000;
var shopSortOrder = 'default';
var shopCarouselIndex = 0;
var shopSearchQuery = '';

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

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Initialize Application — Instant Local-First with Background Cloud Sync
document.addEventListener('DOMContentLoaded', () => {
  // Step 1: Render UI IMMEDIATELY with local cached data (instant 0ms first-paint)
  syncHomepageContent();
  renderShopCategories();
  renderShopProducts();
  renderCart();
  updateCustomizerTotal();
  syncFooterSocialLinks();
  renderCheckoutPaymentMethods();
  syncModelShowcase();

  const urlParams = new URLSearchParams(window.location.search);
  const rawHash = (window.location.hash || '').replace('#', '').trim();
  const hashParts = rawHash.split('?');
  const hashView = hashParts[0];
  if (hashParts[1]) {
    const extra = new URLSearchParams(hashParts[1]);
    extra.forEach((val, key) => {
      if (!urlParams.has(key)) urlParams.set(key, val);
    });
  }

  const catParam = urlParams.get('category') || urlParams.get('cat');
  const searchParam = urlParams.get('search') || urlParams.get('q');
  const pathName = window.location.pathname.replace(/^\/|\/$/g, '').toLowerCase();

  let targetView = urlParams.get('view') || hashView;
  if (!targetView) {
    if (pathName === 'shop' || pathName === 'shop.html' || catParam || searchParam) targetView = 'shop';
    else if (pathName === 'customizer' || pathName === 'customizer.html') targetView = 'customizer';
    else if (pathName === 'checkout' || pathName === 'checkout.html') targetView = 'checkout';
    else targetView = 'home';
  }

  if (searchParam) {
    switchView('shop', false);
    setTimeout(() => {
      handleShopSearch(searchParam);
      const sInput = document.getElementById('shop-search-input');
      if (sInput) sInput.value = searchParam;
    }, 80);
  } else if (catParam) {
    switchView('shop', false);
    setTimeout(() => selectCategory(catParam), 80);
  } else if (['checkout', 'shop', 'customizer', 'studio', 'order-tracking', 'preorder', 'preorders', 'home'].includes(targetView)) {
    switchView(targetView, false);
  } else {
    switchView('home', false);
  }

  if (urlParams.get('openCart') === '1' || urlParams.get('openCart') === 'true') {
    setTimeout(() => toggleCartDrawer(true), 150);
  }

  // Step 2: Background Cloud Sync (Runs non-blocking without delaying page display)
  if (window.ZenvyFirebase) {
    window.ZenvyFirebase.hydrate().then(() => {
      // Re-sync all components when cloud has newer admin data
      refreshStorefrontData();
    }).catch(e => console.warn('Background sync:', e));

    window.ZenvyFirebase.startLiveSync(() => {
      // Runs whenever admin saves anything to Firestore in real-time
      refreshStorefrontData();
    });
  }
});

let _refreshStorefrontTimer = null;
function refreshStorefrontData() {
  if (_refreshStorefrontTimer) clearTimeout(_refreshStorefrontTimer);
  _refreshStorefrontTimer = setTimeout(() => {
    syncHomepageContent();
    renderShopCategories();
    renderShopProducts();
    try { shopCarouselGoto(shopCarouselIndex || 0); } catch(e){}
    renderCart();
    syncFooterSocialLinks();
    renderCheckoutPaymentMethods();
    syncModelShowcase();
  }, 40);
}

window.addEventListener('storage', (e) => {
  if (e && e.key && (e.key.includes('wishlist') || e.key.includes('cart'))) {
    renderCart();
    updateWishlistBadges();
    return;
  }
  refreshStorefrontData();
});

window.addEventListener('zenvy-store-updated', (e) => {
  if (e && e.detail && (e.detail.key === 'wishlist' || e.detail.key === 'cart')) {
    renderCart();
    updateWishlistBadges();
    return;
  }
  refreshStorefrontData();
});


// ── Dynamic Hero Banner Carousel Engine ──
let heroBannerActiveIndex = 0;
let heroBannerInterval = null;
let heroBannersList = [];

function getHeroBanners() {
  let banners = [];
  if (typeof DB !== 'undefined' && DB.banners) {
    banners = typeof DB.banners.active === 'function' ? DB.banners.active() : DB.banners.all().filter(b => b.isActive !== false);
  }
  if (!banners || banners.length === 0) {
    if (typeof DB !== 'undefined' && DB.homepage) {
      const hp = DB.homepage.get();
      if (hp && hp.banners && hp.banners.length > 0) {
        banners = hp.banners.filter(b => b.isActive !== false);
      }
    }
  }
  if (!banners || banners.length === 0) {
    banners = [
      {
        id: 'hero_1',
        title: 'ENGINEERED FOR SUPREMACY',
        subtitle: 'The new standard in high-performance kits. Ethereal technical design crafted for pro athletes.',
        badge: 'NEW ARRIVAL • MATCH EDITION',
        desktopImg: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1920&q=80',
        mobileImg: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=900&q=80',
        ctaPrimaryText: 'SHOP',
        ctaPrimaryLink: 'index.html#shop',
        ctaSecondaryText: 'Pre-Orders',
        ctaSecondaryLink: 'preorders.html'
      },
      {
        id: 'hero_2',
        title: 'AUTHENTIC UCL CLUB EDITIONS',
        subtitle: 'Official club crests, tournament starball badges, and pro player customization precision.',
        badge: 'EXCLUSIVE DROP • LIMITED STOCK',
        desktopImg: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1920&q=80',
        mobileImg: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=900&q=80',
        ctaPrimaryText: 'EXPLORE KITS',
        ctaPrimaryLink: 'index.html#shop',
        ctaSecondaryText: 'CUSTOMIZE',
        ctaSecondaryLink: 'product.html'
      },
      {
        id: 'hero_3',
        title: 'AEROKNIT AIRFLOW TECHNOLOGY',
        subtitle: 'Ultra-breathable micro-mesh engineered for 90 minutes of maximum pitch endurance.',
        badge: 'PRO SPECIFICATION',
        desktopImg: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=1920&q=80',
        mobileImg: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=900&q=80',
        ctaPrimaryText: 'BUY NOW',
        ctaPrimaryLink: 'index.html#shop',
        ctaSecondaryText: 'DISCOVER',
        ctaSecondaryLink: 'product.html'
      }
    ];
  }
  return banners;
}

function updateHeroBannerSlide(targetIndex) {
  if (!heroBannersList || heroBannersList.length === 0) return;
  const n = heroBannersList.length;
  heroBannerActiveIndex = ((targetIndex % n) + n) % n;

  const wrapper = document.getElementById('hero-slides-wrapper');
  if (wrapper) {
    const slides = wrapper.querySelectorAll('.hero-slide');
    slides.forEach((slide, idx) => {
      const isAct = idx === heroBannerActiveIndex;
      slide.classList.toggle('opacity-100', isAct);
      slide.classList.toggle('z-10', isAct);
      slide.classList.toggle('pointer-events-auto', isAct);
      slide.classList.toggle('opacity-0', !isAct);
      slide.classList.toggle('z-0', !isAct);
      slide.classList.toggle('pointer-events-none', !isAct);

      const bgEl = slide.querySelector('.bg-cover');
      if (bgEl) {
        bgEl.classList.toggle('scale-100', isAct);
        bgEl.classList.toggle('scale-105', !isAct);
      }
    });
  }

  const dotsEl = document.getElementById('hero-banner-dots');
  if (dotsEl) {
    const dots = dotsEl.querySelectorAll('button');
    dots.forEach((dot, idx) => {
      const isAct = idx === heroBannerActiveIndex;
      dot.className = `transition-all duration-300 rounded-full cursor-pointer ${isAct ? 'w-5 sm:w-6 h-1.5 sm:h-2 bg-white' : 'w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/40 hover:bg-white/70'}`;
    });
  }
}

function renderHeroBannerCarousel() {
  const wrapper = document.getElementById('hero-slides-wrapper');
  const dotsEl = document.getElementById('hero-banner-dots');
  if (!wrapper) return;

  const newBanners = getHeroBanners();
  if (newBanners.length === 0) return;

  // Check if banners have actually changed to avoid wiping existing DOM and re-decoding images
  const bannerHash = JSON.stringify(newBanners.map(b => b.id || b.title));
  heroBannersList = newBanners;

  if (wrapper.dataset.bannerHash === bannerHash || (wrapper.children.length >= 1 && !wrapper.dataset.bannerHash)) {
    wrapper.dataset.bannerHash = bannerHash;
    updateHeroBannerSlide(heroBannerActiveIndex);
    return;
  }

  wrapper.dataset.bannerHash = bannerHash;

  if (heroBannerActiveIndex >= heroBannersList.length) heroBannerActiveIndex = 0;
  if (heroBannerActiveIndex < 0) heroBannerActiveIndex = heroBannersList.length - 1;

  // Preload images into browser memory to eliminate flash
  heroBannersList.forEach(banner => {
    const bg = banner.desktopImg || banner.bgImage || banner.image;
    if (bg) {
      const img = new Image();
      img.src = bg;
    }
  });

  wrapper.innerHTML = heroBannersList.map((banner, index) => {
    const isActive = index === heroBannerActiveIndex;
    const bg = banner.desktopImg || banner.bgImage || banner.image || 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1920&q=80';
    const badge = banner.badge || banner.marqueeText || 'NEW ARRIVAL • MATCH EDITION';
    const title = banner.title || 'ENGINEERED FOR SUPREMACY';
    const subtitle = banner.subtitle || banner.description || 'The new standard in high-performance kits.';
    const cta1 = banner.ctaPrimaryText || banner.ctaText || 'SHOP';
    const cta2 = banner.ctaSecondaryText || '3D Studio';

    return `
      <div class="hero-slide absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out flex items-center ${isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'}"
           data-index="${index}">
        <div class="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ${isActive ? 'scale-100' : 'scale-105'}"
             style="background-image: url('${bg}');"></div>
        <div class="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/25 sm:to-transparent"></div>
        <div class="relative z-10 max-w-xl p-5 sm:p-10 md:p-12 text-white">
          <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 bg-white/15 backdrop-blur-md rounded-full text-[9px] sm:text-xs font-mono-ui font-bold uppercase tracking-widest mb-2 sm:mb-3 border border-white/20">
            <span class="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>${badge}</span>
          </div>
          <h1 class="font-headline text-xl xs:text-2xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight uppercase mb-2 sm:mb-3 drop-shadow">
            ${title}
          </h1>
          <p class="font-body text-[11px] sm:text-sm text-gray-200 leading-relaxed mb-4 sm:mb-6 max-w-md line-clamp-2">
            ${subtitle}
          </p>
          <div class="flex items-center gap-2.5 sm:gap-3">
            <a href="index.html#shop" onclick="switchView('shop'); return false;" class="bg-white text-black hover:bg-gray-100 font-headline font-bold text-xs sm:text-sm px-5 sm:px-8 py-2.5 sm:py-3.5 rounded-full transition-all duration-200 shadow-lg flex items-center gap-1.5 group cursor-pointer">
              <span>${cta1}</span>
              <svg class="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </a>
            <a href="${cta2 === '3D Studio' ? 'preorders.html' : 'preorders.html'}" class="bg-black/40 hover:bg-black/60 backdrop-blur-md text-white border border-white/30 font-headline font-bold text-xs sm:text-sm px-4 sm:px-7 py-2.5 sm:py-3.5 rounded-full transition-all duration-200 cursor-pointer">
              <span>${cta2 === '3D Studio' ? 'Pre-Orders' : cta2}</span>
            </a>
          </div>
        </div>
      </div>
    `;
  }).join('');

  if (dotsEl) {
    dotsEl.innerHTML = heroBannersList.map((_, i) => `
      <button type="button" onclick="gotoHeroBannerSlide(${i})"
              class="transition-all duration-300 rounded-full cursor-pointer ${i === heroBannerActiveIndex ? 'w-5 sm:w-6 h-1.5 sm:h-2 bg-white' : 'w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/40 hover:bg-white/70'}"
              aria-label="Slide ${i + 1}"></button>
    `).join('');
  }

  if (!wrapper._swipeAttached) {
    let startX = 0, startY = 0;
    wrapper.addEventListener('touchstart', (e) => {
      if (e.changedTouches && e.changedTouches[0]) {
        startX = e.changedTouches[0].screenX;
        startY = e.changedTouches[0].screenY;
      }
    }, { passive: true });
    wrapper.addEventListener('touchend', (e) => {
      if (e.changedTouches && e.changedTouches[0]) {
        const diffX = e.changedTouches[0].screenX - startX;
        const diffY = e.changedTouches[0].screenY - startY;
        if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY) * 1.5) {
          if (diffX > 45) prevHeroBannerSlide();
          else nextHeroBannerSlide();
        }
      }
    }, { passive: true });
    wrapper._swipeAttached = true;
  }

  startHeroBannerAutoScroll();
}

function startHeroBannerAutoScroll() {
  if (heroBannerInterval) clearInterval(heroBannerInterval);
  if (heroBannersList.length > 1) {
    heroBannerInterval = setInterval(() => {
      const homeView = document.getElementById('view-home');
      if (homeView && !homeView.classList.contains('active')) return;
      nextHeroBannerSlide(false);
    }, 5500);
  }
}

window.nextHeroBannerSlide = function(manual = true) {
  if (heroBannersList.length <= 1) return;
  updateHeroBannerSlide(heroBannerActiveIndex + 1);
  if (manual) startHeroBannerAutoScroll();
};

window.prevHeroBannerSlide = function(manual = true) {
  if (heroBannersList.length <= 1) return;
  updateHeroBannerSlide(heroBannerActiveIndex - 1);
  if (manual) startHeroBannerAutoScroll();
};

window.gotoHeroBannerSlide = function(index) {
  updateHeroBannerSlide(index);
  startHeroBannerAutoScroll();
};

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

  const homeConfig = (typeof DB !== 'undefined' && DB.homepage) ? DB.homepage.get() : null;

  // 1. Top Announcement Marquee
  if (homeConfig && homeConfig.announcement) {
    const ann = homeConfig.announcement;
    const marqueeEl = document.getElementById('store-marquee-text');
    if (marqueeEl && ann.marqueeText) marqueeEl.textContent = ann.marqueeText;
  }

  // 2. Hero Banner Carousel (Auto-scrolling, Multi-banner support)
  try { renderHeroBannerCarousel(); } catch (e) { console.warn('Hero carousel:', e); }

  // 3. Value Props Bar (4 Selling Points)
  const props = (homeConfig && homeConfig.valueProps) || [
    { icon: 'local_shipping', title: 'Nationwide Delivery', subtitle: 'Inside Dhaka 24–48h • All BD 2–3 Days' },
    { icon: 'verified', title: 'Authentic Grade', subtitle: '100% Pro-Athlete Specification' },
    { icon: 'workspace_premium', title: 'Official Kit Badges', subtitle: 'Tournament Patches & Name Printing' },
    { icon: 'autorenew', title: '30-Day Guarantee', subtitle: 'Hassle-Free Returns & Exchanges' }
  ];
  const propsContainer = document.getElementById('store-value-props-container');
  if (propsContainer && props.length > 0) {
    const propsHash = JSON.stringify(props.map(p => p.icon || p.title));
    if (propsContainer.dataset.propsHash === propsHash || (propsContainer.children.length >= 4 && !propsContainer.dataset.propsHash)) {
      propsContainer.dataset.propsHash = propsHash;
    } else {
      propsContainer.dataset.propsHash = propsHash;
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
  }

  // 4. Featured Collections Bento Grid
  const col = homeConfig ? homeConfig.collections : null;
  const secTitle = document.getElementById('collections-sec-title');
  if (secTitle && col && col.title) secTitle.textContent = col.title;

  const secSub = document.getElementById('collections-sec-sub');
  if (secSub && col && col.subtitle) secSub.textContent = col.subtitle;

  const bentoContainer = document.getElementById('collections-bento-grid');
  if (bentoContainer) {
    const categories = (typeof DB !== 'undefined' && DB.categories) ? DB.categories.all().filter(c => c.isActive !== false) : [];
    const bentoHash = JSON.stringify(categories.map(c => [c.id, c.name, c.imageUrl || c.image, c.badge]));
    if (bentoContainer.dataset.bentoHash !== bentoHash) {
      bentoContainer.dataset.bentoHash = bentoHash;
      const fallbackImages = [
        'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&q=80',
        'https://images.unsplash.com/photo-1511886929837-354d827aae26?w=1200&q=80',
        'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&q=80',
        'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=80'
      ];

      if (categories && categories.length > 0) {
        const displayCats = categories.slice(0, 6);
        bentoContainer.innerHTML = displayCats.map((c, idx) => {
          const bgImg = (c.imageUrl && !c.imageUrl.includes('googleusercontent.com')) ? c.imageUrl : fallbackImages[idx % fallbackImages.length];
          const prodCount = (typeof DB !== 'undefined' && DB.products) ? DB.products.published().filter(p => {
            const pCat = (p.categoryName || '').toLowerCase();
            const cName = c.name.toLowerCase();
            return pCat === cName || pCat.includes(cName) || cName.includes(pCat) || p.categoryId === c.id;
          }).length : 0;
          const countBadge = prodCount > 0 ? `${prodCount} KITS AVAILABLE` : 'EXPLORE COLLECTION';
          return `
            <div onclick="goToShopCategory('${c.name.replace(/'/g, "\\'")}')" class="group relative rounded-2xl overflow-hidden cursor-pointer shadow-md h-60 sm:h-72 ${idx === 2 && displayCats.length === 3 ? 'sm:col-span-2 md:col-span-1' : ''}">
              <div class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
                   style="background-image: url('${bgImg}')">
              </div>
              <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent"></div>
              <div class="absolute bottom-0 left-0 p-5 w-full">
                <span class="text-[10px] font-mono-ui uppercase font-bold text-amber-400 tracking-wider">${c.badge ? `${c.badge} • ` : ''}${countBadge}</span>
                <h3 class="font-headline text-lg sm:text-xl text-white font-bold">${c.name}</h3>
                <p class="text-xs text-gray-200 mt-1 line-clamp-1">${c.description || 'Official High-Performance Kits'}</p>
              </div>
              <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 backdrop-blur-xs">
                <span class="bg-white text-black text-xs px-4 py-2 rounded-full font-bold shadow-lg">Shop ${c.name}</span>
              </div>
            </div>
          `;
        }).join('');
      } else if (col && col.cards && col.cards.length > 0) {
        bentoContainer.innerHTML = col.cards.map((c, idx) => {
          const bgImg = (c.bgImage && !c.bgImage.includes('googleusercontent.com')) ? c.bgImage : (fallbackImages[idx % fallbackImages.length]);
          return `
            <div onclick="goToShopCategory('${(c.title || '').replace(/'/g, "\\'")}')" class="group relative rounded-2xl overflow-hidden cursor-pointer shadow-md h-60 sm:h-72 ${idx === 2 ? 'sm:col-span-2 md:col-span-1' : ''}">
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
  }

  // 5. Just Dropped Slider
  const jd = homeConfig ? homeConfig.justDropped : null;
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
    const sliderHash = JSON.stringify(published.map(p => [p.id, p.name, p.salePrice || p.basePrice, p.stock, p.images?.[0]?.url || p.image]));
    if (sliderEl.dataset.sliderHash !== sliderHash) {
      sliderEl.dataset.sliderHash = sliderHash;
      if (published && published.length > 0) {
        sliderEl.innerHTML = published.map(p => {
          const imgUrl = (typeof DB.products.getImage === 'function') ? DB.products.getImage(p) : ((p.images && p.images[0] && p.images[0].url) ? p.images[0].url : 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80');
          const priceDisplay = formatMoney(p.salePrice || p.basePrice || 1450);
          return `
            <div class="min-w-[240px] sm:min-w-[270px] flex-shrink-0 group">
              <div class="bg-[#f5f5f7] rounded-2xl p-4 sm:p-5 mb-3 relative h-[260px] sm:h-[300px] flex items-center justify-center overflow-hidden cursor-pointer"
                   onclick="window.location.href='product.html?id=${p.id}'">
                ${p.isPreorder ? '<span class="absolute top-3 left-3 bg-purple-600 text-white text-[10px] font-mono-ui font-bold px-2 py-0.5 rounded">PRE-ORDER</span>' : '<span class="absolute top-3 left-3 bg-black text-white text-[10px] font-mono-ui font-bold px-2 py-0.5 rounded">NEW</span>'}
                <button onclick="event.stopPropagation(); toggleWishlist('${p.name.replace(/'/g, "\\'")}', ${p.basePrice})" class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 shadow flex items-center justify-center text-gray-500 hover:text-red-600 transition-colors z-10" aria-label="Wishlist">
                  <span class="material-symbols-outlined text-[16px]">favorite</span>
                </button>
                <img src="${imgUrl}" class="max-h-[200px] sm:max-h-[230px] w-auto object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-md" alt="${p.name}"/>
                <div class="absolute inset-x-0 bottom-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-white/95 to-transparent">
                  <a href="product.html?id=${p.id}" class="block w-full text-center bg-black text-white text-xs font-bold py-2 rounded-full shadow">VIEW & CUSTOMIZE</a>
                </div>
              </div>
              <div class="flex justify-between items-start">
                <div>
                  <h4 class="font-headline text-sm font-bold text-black group-hover:underline cursor-pointer" onclick="window.location.href='product.html?id=${p.id}'">${p.name}</h4>
                  <p class="text-xs text-gray-500">${p.categoryName || 'Performance Edition'}</p>
                </div>
                <span class="font-mono-ui text-sm font-bold text-black">${priceDisplay}</span>
              </div>
            </div>
          `;
        }).join('');
      }
    }
  }

  // 6. Active Promotional Banners marquee sync
  if (typeof DB !== 'undefined' && DB.banners) {
    const activeBanners = typeof DB.banners.active === 'function' ? DB.banners.active() : [];
    if (activeBanners.length > 0 && activeBanners[0].marqueeText) {
      const marqueeEl = document.getElementById('store-marquee-text');
      if (marqueeEl) marqueeEl.textContent = activeBanners[0].marqueeText;
    }
  }

  // 7. Render dynamic categories in the Shop sidebar and quick filters
  try { renderShopCategories(); } catch(e){ console.warn('renderShopCategories:', e); }

  // 8. Render dynamic products in the Shop grid
  try { renderShopProducts(); } catch(e){ console.warn('renderShopProducts:', e); }

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
  let isDeliveryChargeMandatory = false;
  let mandatoryDeliveryProducts = [];
  let productAdvanceModes = [];
  let productNotes = [];

  if (typeof DB !== 'undefined' && DB.products && Array.isArray(appState.cart) && appState.cart.length > 0) {
    for (const item of appState.cart) {
      const prod = DB.products.byId(item.id || item.productId) || item.product || null;
      if (prod) {
        if (prod.isDeliveryChargeMandatory) {
          isDeliveryChargeMandatory = true;
          mandatoryDeliveryProducts.push(prod.name || 'Kit');
        }
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
    isDeliveryChargeMandatory: isDeliveryChargeMandatory,
    mandatoryDeliveryProducts: mandatoryDeliveryProducts,
    minOrderAmount: storePolicy.minOrderAmount || 0,
    payFirstNote: storePolicy.payFirstNote || '',
    codNote: storePolicy.codNote || '',
    deliveryNote: productNotes.join(' | ') || storePolicy.deliveryNote || ''
  };
}

function copyMfsNumber(num) {
  if (!num) return;
  navigator.clipboard.writeText(num.replace(/[^0-9]/g, '')).then(() => {
    const btn = document.getElementById('copy-btn-text');
    if (btn) {
      const orig = btn.textContent;
      btn.textContent = 'Copied!';
      setTimeout(() => { btn.textContent = orig; }, 2000);
    }
    showToast(`Copied ${num} to clipboard`);
  }).catch(() => {
    showToast(`Account number: ${num}`);
  });
}
window.copyMfsNumber = copyMfsNumber;

function renderCheckoutPaymentMethods() {
  const container = document.getElementById('checkout-payment-methods-list') || document.getElementById('checkout-payment-methods');
  if (!container) return;

  const policy = resolveCartDeliveryAndAdvancePolicy();
  const payConfig = (typeof DB !== 'undefined' && DB.payments) ? DB.payments.get() : {};

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

  if (policy.isDeliveryChargeMandatory) {
    if (badgeEl) badgeEl.textContent = 'MANDATORY DELIVERY FEE';
    if (titleEl) titleEl.textContent = 'Delivery Fee Advance Required';
    if (descEl) descEl.textContent = `This kit (${(policy.mandatoryDeliveryProducts||[]).join(', ') || 'Custom Apparel'}) requires the delivery fee in advance. Settle the delivery fee via bKash, Nagad, or Rocket to confirm your order. Product price will be collected upon delivery.`;
  } else if (advanceMode === 'delivery_only') {
    if (badgeEl) badgeEl.textContent = 'DELIVERY ADVANCE POLICY';
    if (titleEl) titleEl.textContent = 'Advance Delivery Fee Required';
    if (descEl) descEl.textContent = policy.payFirstNote || 'Please pay the delivery fee in advance via bKash, Nagad, or Rocket to confirm order dispatch. The product price is collected in cash upon doorstep arrival.';
  } else if (advanceMode === 'full_only') {
    if (badgeEl) badgeEl.textContent = '100% PREPAID ONLY';
    if (titleEl) titleEl.textContent = 'Full Payment Required';
    if (descEl) descEl.textContent = 'Complete payment for product and shipping is required upfront to process and dispatch your order.';
  } else if (advanceMode === 'cod_only') {
    if (badgeEl) badgeEl.textContent = 'CASH ON DELIVERY';
    if (titleEl) titleEl.textContent = 'Doorstep Cash Payment';
    if (descEl) descEl.textContent = policy.codNote || 'Pay the complete order value to the delivery courier upon arrival.';
  } else {
    // customer_choice
    if (badgeEl) badgeEl.textContent = 'FLEXIBLE PAYMENT';
    if (titleEl) titleEl.textContent = 'Payment Terms & Preference';
    if (descEl) descEl.textContent = 'Select whether to pay the advance delivery fee online, pay the full order value upfront, or settle full cash on delivery.';
  }

  if (splitOptions && splitContainer) {
    if (policy.isDeliveryChargeMandatory || advanceMode === 'delivery_only') {
      splitOptions.innerHTML = `
        <label class="relative flex items-start gap-3.5 p-4 rounded-2xl border-2 border-neutral-200 hover:border-neutral-400 bg-white cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md has-[:checked]:border-black has-[:checked]:bg-neutral-50/80 has-[:checked]:shadow-sm col-span-1 md:col-span-2 group">
          <input type="radio" name="checkout-payment-split" value="delivery_only" checked onchange="updateCheckoutCalculations()" class="accent-black mt-1 w-4 h-4 cursor-pointer" />
          <div class="flex-1">
            <div class="flex items-center justify-between gap-2">
              <span class="font-bold text-xs sm:text-sm text-neutral-900 group-hover:text-black">Pay Delivery Charge in Advance</span>
              <span class="font-mono-ui text-[9px] uppercase tracking-wider font-bold bg-amber-100 text-amber-900 border border-amber-200 px-2 py-0.5 rounded-full">Required</span>
            </div>
            <p class="text-[11px] text-neutral-500 mt-1 leading-relaxed">Pay shipping fee upfront via bKash / Nagad / Rocket. Pay product price on arrival!</p>
          </div>
        </label>
        <label class="relative flex items-start gap-3.5 p-4 rounded-2xl border-2 border-neutral-200 hover:border-neutral-400 bg-white cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md has-[:checked]:border-black has-[:checked]:bg-neutral-50/80 has-[:checked]:shadow-sm col-span-1 md:col-span-2 group">
          <input type="radio" name="checkout-payment-split" value="full" onchange="updateCheckoutCalculations()" class="accent-black mt-1 w-4 h-4 cursor-pointer" />
          <div class="flex-1">
            <div class="flex items-center justify-between gap-2">
              <span class="font-bold text-xs sm:text-sm text-neutral-900 group-hover:text-black">Pay Full Amount (100% Prepaid)</span>
              <span class="font-mono-ui text-[9px] uppercase tracking-wider font-semibold bg-neutral-100 text-neutral-800 border border-neutral-200 px-2 py-0.5 rounded-full">Prepaid</span>
            </div>
            <p class="text-[11px] text-neutral-500 mt-1 leading-relaxed">Pay product + delivery charge upfront online. Zero payment needed at doorstep.</p>
          </div>
        </label>
      `;
    } else if (advanceMode === 'full_only') {
      splitContainer.style.display = 'none';
    } else if (advanceMode === 'cod_only') {
      splitContainer.style.display = 'none';
    } else {
      splitContainer.style.display = '';
      splitOptions.innerHTML = `
        <label class="relative flex items-start gap-3.5 p-4 rounded-2xl border-2 border-neutral-200 hover:border-neutral-400 bg-white cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md has-[:checked]:border-black has-[:checked]:bg-neutral-50/90 has-[:checked]:shadow-sm group">
          <input type="radio" name="checkout-payment-split" value="delivery_only" checked onchange="updateCheckoutCalculations()" class="accent-black mt-1 w-4 h-4 cursor-pointer" />
          <div class="flex-1">
            <div class="flex items-center justify-between gap-2">
              <span class="font-headline font-bold text-xs sm:text-sm text-neutral-900 group-hover:text-black">Pay Delivery Charge Only</span>
              <span class="font-mono-ui text-[9px] uppercase tracking-wider font-extrabold bg-neutral-900 text-white px-2 py-0.5 rounded-full shadow-2xs">Popular</span>
            </div>
            <p class="text-xs text-neutral-700 font-medium mt-1 leading-relaxed">Advance delivery fee via MFS • Balance collected on arrival</p>
          </div>
        </label>
        <label class="relative flex items-start gap-3.5 p-4 rounded-2xl border-2 border-neutral-200 hover:border-neutral-400 bg-white cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md has-[:checked]:border-black has-[:checked]:bg-neutral-50/90 has-[:checked]:shadow-sm group">
          <input type="radio" name="checkout-payment-split" value="full" onchange="updateCheckoutCalculations()" class="accent-black mt-1 w-4 h-4 cursor-pointer" />
          <div class="flex-1">
            <div class="flex items-center justify-between gap-2">
              <span class="font-headline font-bold text-xs sm:text-sm text-neutral-900 group-hover:text-black">Pay Full Amount Now</span>
              <span class="font-mono-ui text-[9px] uppercase tracking-wider font-extrabold bg-neutral-900 text-white px-2 py-0.5 rounded-full shadow-2xs">100% Online</span>
            </div>
            <p class="text-xs text-neutral-700 font-medium mt-1 leading-relaxed">Full settlement upfront • Contactless doorstep drop</p>
          </div>
        </label>
        ${policy.cashOnDelivery !== false ? `
        <label class="col-span-1 md:col-span-2 relative flex items-start gap-3.5 p-4 rounded-2xl border-2 border-neutral-200 hover:border-neutral-400 bg-white cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md has-[:checked]:border-black has-[:checked]:bg-neutral-50/90 has-[:checked]:shadow-sm group">
          <input type="radio" name="checkout-payment-split" value="cod" onchange="updateCheckoutCalculations()" class="accent-black mt-1 w-4 h-4 cursor-pointer" />
          <div class="flex-1">
            <div class="flex items-center justify-between gap-2">
              <span class="font-headline font-bold text-xs sm:text-sm text-neutral-900 group-hover:text-black">Full Cash on Delivery (COD)</span>
              <span class="font-mono-ui text-[9px] uppercase tracking-wider font-extrabold bg-emerald-100 text-emerald-900 border border-emerald-300 px-2 py-0.5 rounded-full shadow-2xs">Courier COD</span>
            </div>
            <p class="text-xs text-neutral-700 font-medium mt-1 leading-relaxed">No advance digital payment • Pay total cash directly to delivery rider</p>
          </div>
        </label>
        ` : ''}
      `;
    }
  }

  // 3. Render Digital Payment Gateways (bKash, Nagad, Rocket) with Real Logos and 3D Interactive Design
  const bkashNum = payConfig.bkash?.number || '01700-000000';
  const nagadNum = payConfig.nagad?.number || '01800-000000';
  const rocketNum = payConfig.rocket?.number || '01900-000000';
  const bkashType = payConfig.bkash?.type || 'Personal';
  const nagadType = payConfig.nagad?.type || 'Personal';
  const rocketType = payConfig.rocket?.type || 'Personal';

  const mfsMethods = [
    { 
      id: 'bkash', 
      name: 'bKash', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/BKash_Logo.svg/320px-BKash_Logo.svg.png', 
      brandColor: '#D12053',
      num: bkashNum, 
      type: bkashType, 
      badgeClass: 'bg-rose-100 text-[#9f1239] border border-rose-300',
      desc: `Send Money to ${bkashNum} • bKash App or *247#` 
    },
    { 
      id: 'nagad', 
      name: 'Nagad', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Nagad_Logo.svg/320px-Nagad_Logo.svg.png', 
      brandColor: '#EA580C',
      num: nagadNum, 
      type: nagadType, 
      badgeClass: 'bg-orange-100 text-[#9a3412] border border-orange-300',
      desc: `Send Money to ${nagadNum} • Nagad App or *167#` 
    },
    { 
      id: 'rocket', 
      name: 'Rocket', 
      logo: 'https://seeklogo.com/images/D/dutch-bangla-rocket-logo-B4D1CC458D-seeklogo.com.png', 
      brandColor: '#7C3AED',
      num: rocketNum, 
      type: rocketType, 
      badgeClass: 'bg-purple-100 text-[#581c87] border border-purple-300',
      desc: `Send Money to ${rocketNum} • Rocket App or *322#` 
    }
  ];

  container.innerHTML = `
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
      ${mfsMethods.map((m, idx) => `
        <label class="relative flex sm:flex-col items-center sm:items-start gap-3 sm:gap-2.5 p-3.5 sm:p-4 rounded-2xl border-2 border-neutral-200 hover:border-neutral-400 bg-white cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md has-[:checked]:border-black has-[:checked]:bg-neutral-50/90 has-[:checked]:shadow-sm group">
          <div class="flex items-center justify-between w-full">
            <div class="w-14 h-11 rounded-xl bg-white border border-neutral-200 flex items-center justify-center p-1.5 shadow-2xs group-hover:scale-105 transition-transform shrink-0 overflow-hidden">
              <img src="${m.logo}" class="max-h-full max-w-full object-contain" alt="${m.name}" loading="lazy" onerror="this.onerror=null; this.parentElement.innerHTML='<span style=\\'font-weight:900;color:${m.brandColor};font-size:12px;\\'>${m.name}</span>';"/>
            </div>
            <input type="radio" name="payment-method" value="${m.id}" ${idx === 0 ? 'checked' : ''} onchange="updateCheckoutCalculations()" class="accent-black w-4 h-4 cursor-pointer" />
          </div>

          <div class="flex-1 min-w-0 sm:w-full mt-0 sm:mt-1">
            <div class="flex items-center gap-1.5 flex-wrap">
              <span class="font-headline font-bold text-sm sm:text-base text-neutral-900 group-hover:text-black tracking-tight">${m.name}</span>
              <span class="font-mono-ui text-[10px] uppercase font-black px-2.5 py-0.5 rounded-full ${m.badgeClass}">${m.type}</span>
            </div>
            <div class="text-xs text-neutral-700 font-medium mt-1 leading-snug break-words">${m.desc}</div>
          </div>
        </label>
      `).join('')}
    </div>

    <!-- Active Payment Instructions Card (Dynamic TrxID / Number / COD Info) -->
    <div id="checkout-payment-instructions-card"></div>
  `;

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
  // If delivery is mandatory for any kit, free threshold cannot waive it!
  const isFree = (!policy.isDeliveryChargeMandatory) && ((policy.deliveryChargeEnabled === false) || (freeThreshold > 0 && subtotal >= freeThreshold));
  const shippingFee = isFree ? 0 : baseShipping;

  const totalOrderValue = subtotal + shippingFee;

  // 3. Determine active split / payment rule
  const advanceMode = policy.advancePaymentMode || 'customer_choice';
  let activeSplit = 'delivery_only';

  if (policy.isDeliveryChargeMandatory) {
    const splitInput = document.querySelector('input[name="checkout-payment-split"]:checked');
    activeSplit = splitInput ? splitInput.value : 'delivery_only';
    if (activeSplit === 'cod') activeSplit = 'delivery_only';
  } else if (advanceMode === 'delivery_only') {
    activeSplit = 'delivery_only';
  } else if (advanceMode === 'full_only') {
    activeSplit = 'full';
  } else if (advanceMode === 'cod_only') {
    activeSplit = 'cod';
  } else {
    const splitInput = document.querySelector('input[name="checkout-payment-split"]:checked');
    activeSplit = splitInput ? splitInput.value : 'delivery_only';
  }

  const isCodSelected = (activeSplit === 'cod');

  // Toggle Visibility of Payment Gateway selection (Hide when COD is selected)
  const gatewayGroup = document.getElementById('checkout-gateway-group');
  if (gatewayGroup) {
    gatewayGroup.style.display = isCodSelected ? 'none' : '';
  }

  // 4. Selected Payment Gateway
  let selectedPaymentId = 'bkash';
  if (isCodSelected) {
    selectedPaymentId = 'cod';
  } else {
    const paymentInput = document.querySelector('input[name="payment-method"]:checked');
    selectedPaymentId = paymentInput ? paymentInput.value : 'bkash';
    if (selectedPaymentId === 'cod') selectedPaymentId = 'bkash';
  }

  const payConfig = (typeof DB !== 'undefined' && DB.payments) ? DB.payments.get() : {};
  const methodNames = {
    bkash: 'bKash',
    nagad: 'Nagad',
    rocket: 'Rocket',
    cod: 'Cash on Delivery'
  };

  const currentMethodName = methodNames[selectedPaymentId] || 'bKash';
  const currentMethodUpper = currentMethodName.toUpperCase();

  // 5. Compute Pay Now vs Due on Delivery
  let payNowAmount = 0;
  let dueAmount = 0;
  let payNowDesc = `Via ${currentMethodName}`;
  let btnLabel = `CONFIRM ORDER (${currentMethodUpper})`;

  if (isCodSelected) {
    payNowAmount = 0;
    dueAmount = totalOrderValue;
    payNowDesc = 'No advance digital payment required';
    btnLabel = `CONFIRM CASH ON DELIVERY ORDER (৳${dueAmount.toLocaleString()}) →`;
  } else if (activeSplit === 'delivery_only') {
    payNowAmount = shippingFee;
    dueAmount = subtotal;
    payNowDesc = `Advance Delivery Charge (${zone === 'outside' ? 'Outside Dhaka' : 'Inside Dhaka'}) via ${currentMethodName}`;
    btnLabel = payNowAmount > 0 
      ? `PAY ৳${payNowAmount.toLocaleString()} DELIVERY CHARGE VIA ${currentMethodUpper} →`
      : `CONFIRM ORDER (${currentMethodUpper}) →`;
  } else {
    // full
    payNowAmount = totalOrderValue;
    dueAmount = 0;
    payNowDesc = `100% Full Payment via ${currentMethodName}`;
    btnLabel = `PAY FULL ৳${payNowAmount.toLocaleString()} VIA ${currentMethodUpper} →`;
  }

  // 6. Active Payment Instructions Card (Dynamic TrxID / Number / COD Info)
  const detailsBox = document.getElementById('checkout-payment-instructions-card');
  if (detailsBox) {
    if (isCodSelected || selectedPaymentId === 'cod' || activeSplit === 'cod') {
      detailsBox.innerHTML = `
        <div class="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 shadow-2xs">
          <div class="font-bold flex items-center gap-2 mb-1.5 text-emerald-800 font-mono-ui text-xs tracking-wide">
            <span class="material-symbols-outlined text-base">local_shipping</span>
            <span>Full Cash on Delivery (Doorstep Courier Handover)</span>
          </div>
          <p class="text-[12px] text-emerald-700 leading-relaxed">
            No advance digital payment needed. Pay total cash of <strong>৳${dueAmount.toLocaleString()}</strong> directly to the Steadfast / Pathao courier delivery rider when your package arrives at your doorstep.
          </p>
        </div>
      `;
    } else {
      detailsBox.innerHTML = '';
    }
  }

  // 7. Update UI breakdown
  const subEl = document.getElementById('checkout-subtotal');
  if (subEl) subEl.textContent = `৳${subtotal.toLocaleString()}`;

  const delEl = document.getElementById('checkout-delivery-fee');
  if (delEl) {
    if (policy.isDeliveryChargeMandatory) {
      delEl.innerHTML = `৳${shippingFee.toLocaleString()} <span class="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-black px-1.5 py-0.5 rounded ml-1">MANDATORY</span>`;
      delEl.className = 'font-bold text-black flex items-center justify-end';
    } else if (isFree) {
      delEl.textContent = 'FREE';
      delEl.className = 'font-bold text-emerald-600';
    } else {
      delEl.textContent = `৳${shippingFee.toLocaleString()}`;
      delEl.className = 'font-bold text-black';
    }
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

  // 8. Check Min order
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
  const brand = DB.brand.get() || {};
  const settings = (typeof DB !== 'undefined' && DB.storeSettings) ? DB.storeSettings.get() : {};
  const brandName = (brand.brandName || 'ZENVY').trim();

  // 1. Update Brand Name Across the Page
  document.querySelectorAll('[data-brand-name], .brand-name-display, #site-brand-logo, #footer-brand-logo').forEach(el => {
    el.textContent = brandName;
  });

  const copyrightEl = document.getElementById('footer-copyright');
  if (copyrightEl) {
    copyrightEl.textContent = `© ${new Date().getFullYear()} ${brandName} Sports Fashion. All rights reserved.`;
  }

  // 2. WhatsApp Number Resolution
  let rawWa = brand.socialWhatsApp || settings.whatsappNumber || brand.phone || '8801700000000';
  let cleanWa = rawWa.replace(/[^0-9]/g, '');
  if (cleanWa.startsWith('01')) cleanWa = '88' + cleanWa;

  // 3. Social Links
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

  const waEl = document.getElementById('footer-social-wa');
  if (waEl) {
    waEl.href = `https://wa.me/${cleanWa}?text=${encodeURIComponent('Salam ' + brandName + ', I would like to make an inquiry.')}`;
  }

  const phoneEl = document.getElementById('footer-support-phone');
  if (phoneEl) {
    phoneEl.textContent = brand.phone || ('+' + cleanWa);
  }

  // 4. Global Floating Contact Widget (WhatsApp + Call)
  let contactWidget = document.getElementById('floating-contact-widget');
  if (!contactWidget) {
    contactWidget = document.createElement('div');
    contactWidget.id = 'floating-contact-widget';
    contactWidget.className = 'fixed bottom-6 right-4 sm:right-6 z-40 flex flex-col gap-2.5 items-end pointer-events-auto';

    // Direct Call Button
    const callBtn = document.createElement('a');
    callBtn.id = 'floating-call-btn';
    callBtn.className = 'bg-black hover:bg-neutral-800 text-white p-3 sm:p-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer group border border-white/20';
    callBtn.setAttribute('title', 'Call Us Now');
    callBtn.innerHTML = `
      <span class="material-symbols-outlined text-[20px] sm:text-[22px]">call</span>
      <span class="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 font-headline font-bold text-xs ml-0 group-hover:ml-2">Call Now</span>
    `;

    // WhatsApp Button
    const waBtn = document.createElement('a');
    waBtn.id = 'floating-whatsapp-btn';
    waBtn.target = '_blank';
    waBtn.rel = 'noopener';
    waBtn.className = 'bg-[#25D366] hover:bg-[#20ba5a] text-white p-3 sm:p-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer group';
    waBtn.setAttribute('title', 'Chat on WhatsApp');
    waBtn.innerHTML = `
      <svg class="w-5 h-5 sm:w-6 sm:h-6 fill-current flex-shrink-0" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
      <span class="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 font-headline font-bold text-xs ml-0 group-hover:ml-2">WhatsApp</span>
    `;

    contactWidget.appendChild(callBtn);
    contactWidget.appendChild(waBtn);
    document.body.appendChild(contactWidget);
  }

  const callBtn = document.getElementById('floating-call-btn');
  const waBtn = document.getElementById('floating-whatsapp-btn');
  const rawPhone = (brand.phone || cleanWa || '01700000000').toString();
  const cleanPhone = rawPhone.replace(/[^0-9+]/g, '');

  if (callBtn) {
    callBtn.href = `tel:${cleanPhone}`;
    callBtn.setAttribute('title', `Call: ${rawPhone}`);
  }
  if (waBtn) {
    waBtn.href = `https://wa.me/${cleanWa}?text=${encodeURIComponent('Salam ' + brandName + ', I have a question about products and orders.')}`;
    waBtn.setAttribute('title', `WhatsApp: ${cleanWa}`);
  }
}

// View Switcher Router with Short Shareable URL Sync
function switchView(viewName, updateUrl = true) {
  const aliasMap = {
    'studio': 'customizer',
    'preorder': 'shop',
    'preorders': 'shop'
  };
  const cleanName = (viewName || 'home').toString().replace(/^#/, '').toLowerCase().trim();
  const normalized = aliasMap[cleanName] || cleanName;

  if (normalized === 'order-tracking') {
    if (typeof openOrderTrackingModal === 'function') {
      openOrderTrackingModal();
    }
    return;
  }

  appState.activeView = normalized;
  // Synchronize data-target-view on html element so CSS rules immediately match
  try {
    document.documentElement.setAttribute('data-target-view', normalized);
  } catch(e){}

  // Hide all page views
  document.querySelectorAll('.page-view').forEach(view => {
    view.classList.remove('active');
    view.style.display = 'none';
    view.style.opacity = '0';
  });

  // Show target view
  const targetView = document.getElementById(`view-${normalized}`);
  if (targetView) {
    targetView.classList.add('active');
    targetView.style.setProperty('display', 'block', 'important');
    targetView.style.setProperty('opacity', '1', 'important');
    if (updateUrl) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // Update browser address bar to clean short shareable link without full page reload
  if (updateUrl && window.history && window.history.pushState) {
    const targetHash = normalized === 'home' ? '' : `#${normalized}`;
    const cleanUrl = window.location.pathname.replace(/\/$/, '') + targetHash;
    if (window.location.hash !== targetHash) {
      window.history.pushState(null, '', cleanUrl || '/');
    }
  }

  // Update navbar tab highlights
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.className = "nav-tab font-body-md text-sm px-4 py-1.5 rounded-full transition-all duration-200 text-secondary hover:text-primary hover:bg-white/60";
  });

  const activeTab = document.getElementById(`nav-btn-${normalized}`);
  if (activeTab) {
    activeTab.className = "nav-tab font-body-md text-sm px-4 py-1.5 rounded-full transition-all duration-200 text-primary font-bold bg-white shadow-sm";
  }

  // View-specific initialization (Synchronous 0ms paint, wrapped in try/catch)
  if (normalized === 'shop') {
    try { renderShopCategories(); } catch(e){ console.error('renderShopCategories:', e); }
    try { renderShopProducts(); } catch(e){ console.error('renderShopProducts:', e); }
    try { shopCarouselGoto(0); } catch(e){}
  } else if (normalized === 'home') {
    try { syncHomepageContent(); } catch(e){ console.error('syncHomepageContent:', e); }
  } else if (normalized === 'checkout') {
    // If cart is empty, do NOT hold user on order page in a 0 item state — redirect to shopping page!
    if (!appState.cart || appState.cart.length === 0) {
      showToast('Your cart is empty. Explore our jerseys collection!');
      switchView('shop');
      return;
    }
    try { toggleCartDrawer(false); } catch(e){}
    try { renderCart(); } catch(e){}
    try { renderCheckoutPaymentMethods(); } catch(e){}
    try { updateCheckoutCalculations(); } catch(e){}
  }
}

// React to browser Back/Forward or direct link hash clicks
window.addEventListener('hashchange', () => {
  const hash = window.location.hash.replace('#', '').trim().toLowerCase() || 'home';
  if (hash === 'order-tracking') {
    if (typeof openOrderTrackingModal === 'function') openOrderTrackingModal();
    return;
  }
  if (['home', 'shop', 'customizer', 'studio', 'checkout', 'preorder', 'preorders', 'order-confirmation'].includes(hash)) {
    switchView(hash, false);
  }
});

window.safeSwitchView = function(viewName, ev) {
  if (ev && typeof ev.preventDefault === 'function') {
    try { ev.preventDefault(); } catch(e){}
  }
  switchView(viewName);
  return false;
};

window.goToShopCategory = function(catName) {
  switchView('shop');
  setTimeout(() => {
    selectCategory(catName);
    window.scrollTo({ top: 320, behavior: 'smooth' });
  }, 100);
};


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
            <img src="${item.image || 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&q=80'}" class="cutout-image object-contain w-full h-full p-1.5" alt="${item.name}"/>
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
          <div class="flex gap-3 p-3 bg-neutral-50 rounded-xl border border-neutral-200 shadow-2xs">
            <img src="${item.image || 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&q=80'}" class="w-16 h-16 object-contain bg-white rounded-lg p-1 border border-neutral-100" alt="${item.name}"/>
            <div class="flex-grow flex flex-col justify-center">
              <h4 class="font-headline text-xs sm:text-sm font-bold text-neutral-900">${item.name}</h4>
              <p class="font-mono-ui text-xs text-neutral-600 font-medium mt-0.5">${item.details} • Qty: ${item.qty}</p>
              <span class="font-mono-ui text-xs sm:text-sm font-extrabold text-neutral-900 mt-1">${formatMoney(item.price * item.qty)}</span>
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
  if (drawerTotal) drawerTotal.innerText = formatMoney(subtotal > 0 ? subtotal + shippingCost : 0);
  if (checkoutSubtotal) checkoutSubtotal.innerText = formatMoney(subtotal);
  if (checkoutTotal) checkoutTotal.innerText = formatMoney(subtotal > 0 ? subtotal + shippingCost : 0);
}

function addToCart(product, quantity = 1, openDrawer = true) {
  if (!product) return;
  const prodId = String(product.id || Date.now());
  const prodName = product.name || 'ZENVY Jersey';

  // SECURITY: Always re-validate price and stock from DB
  let prodPrice = parseFloat(product.price) || 1450;
  if (typeof DB !== 'undefined' && DB.products && prodId) {
    const dbProduct = DB.products.byId(prodId);
    if (dbProduct) {
      if (typeof dbProduct.stock === 'number' && dbProduct.stock <= 0) {
        showToast('⚠️ এই পণ্যটির স্টক বর্তমানে শেষ!');
        return;
      }
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
  if (openDrawer) {
    toggleCartDrawer(true);
  }
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

function toggleCartDrawer(forceOpen = null) {
  const drawer = document.getElementById('cart-drawer');
  if (!drawer) return;

  const panel = drawer.querySelector('aside');
  const isCurrentlyClosed = drawer.classList.contains('pointer-events-none') || drawer.classList.contains('opacity-0');
  const shouldOpen = (forceOpen !== null) ? Boolean(forceOpen) : isCurrentlyClosed;

  if (shouldOpen) {
    drawer.classList.remove('pointer-events-none', 'opacity-0');
    if (panel) panel.classList.remove('translate-x-full');
  } else {
    drawer.classList.add('pointer-events-none', 'opacity-0');
    if (panel) panel.classList.add('translate-x-full');
  }
}

function proceedToCheckout() {
  toggleCartDrawer(false);
  switchView('checkout');
}

// Customizer Logic
function togglePersonalizationInputs() {
  const fields = document.getElementById('personalization-fields');
  const toggle = document.getElementById('personalize-toggle');
  const printOverlay = document.getElementById('jersey-print-overlay');
  if (!toggle || !fields) return;

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
    sleevePrice = longRecord ? (parseFloat(longRecord.additionalPrice) || 0) : 100;
  }

  // Personalization fee from DB
  let personalizePrice = 0;
  const personalizeToggle = document.getElementById('personalize-toggle');
  if (personalizeToggle && personalizeToggle.checked) {
    const pkg = customSettings.nameNumberPackage;
    if (pkg && pkg.enabled && pkg.price) {
      personalizePrice = parseFloat(pkg.price) || 200;
    } else {
      // Fall back to name + number individually
      const nameFee = customSettings.namePrinting?.enabled ? parseFloat(customSettings.namePrinting.price) || 0 : 0;
      const numFee = customSettings.numberPrinting?.enabled ? parseFloat(customSettings.numberPrinting.price) || 0 : 0;
      personalizePrice = nameFee + numFee || 200;
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

// ── Storefront Global Interactive Helpers ──
window.instantBuy = function(productId) {
  if (typeof DB === 'undefined' || !DB.products) return;
  const p = DB.products.byId(productId);
  if (!p) return;
  const imgUrl = (typeof DB.products.getImage === 'function') ? DB.products.getImage(p) : ((p.images && p.images[0] && p.images[0].url) ? p.images[0].url : 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80');
  const price = p.salePrice || p.basePrice || 1450;

  // 1. Force cart drawer to stay closed
  try { toggleCartDrawer(false); } catch(e){}

  // 2. Add product quietly to cart with openDrawer = false
  addToCart({
    id: p.id,
    name: p.name,
    price: price,
    image: imgUrl,
    details: `${p.categoryName || 'Standard Edition'} • M`
  }, 1, false);

  // 3. Immediately switch directly to checkout view
  switchView('checkout');
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.quickAddToCart = function(productId) {
  if (typeof DB === 'undefined' || !DB.products) return;
  const p = DB.products.byId(productId);
  if (!p) return;
  const imgUrl = (typeof DB.products.getImage === 'function') ? DB.products.getImage(p) : ((p.images && p.images[0] && p.images[0].url) ? p.images[0].url : 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80');
  const price = p.salePrice || p.basePrice || 1450;
  addToCart({
    id: p.id,
    name: p.name,
    price: price,
    image: imgUrl,
    details: `${p.categoryName || 'Standard Edition'} • M`
  });
};

window.scrollSlider = function(offset) {
  const slider = document.getElementById('product-slider');
  if (slider) {
    slider.scrollBy({ left: offset, behavior: 'smooth' });
  }
};

window.openOrderTrackingModal = function() {
  const modal = document.getElementById('order-tracking-modal');
  if (modal) {
    modal.classList.remove('hidden');
    const input = document.getElementById('track-order-input');
    if (input) input.focus();
  }
};

window.closeOrderTrackingModal = function() {
  const modal = document.getElementById('order-tracking-modal');
  if (modal) modal.classList.add('hidden');
};

window.performTrackOrder = function() {
  const input = document.getElementById('track-order-input');
  const resultBox = document.getElementById('track-order-result');
  if (!input || !resultBox) return;

  const query = input.value.trim().toLowerCase();
  if (!query) {
    resultBox.classList.remove('hidden');
    resultBox.innerHTML = `<div class="p-3 bg-amber-50 text-amber-800 text-xs rounded-xl font-bold">অনুগ্রহ করে আপনার অর্ডার আইডি (যেমন: ORD-...) অথবা মোবাইল নম্বর দিন।</div>`;
    return;
  }

  const allOrders = (typeof DB !== 'undefined' && DB.orders) ? DB.orders.all() : (JSON.parse(localStorage.getItem('zenvy_v1_orders') || '[]'));
  const found = allOrders.filter(o => {
    const id = (o.id || o.orderNumber || '').toString().toLowerCase();
    const phone = (o.customerPhone || o.phone || (o.customer && o.customer.phone) || '').toString().toLowerCase();
    return id.includes(query) || (phone && phone.includes(query));
  });

  resultBox.classList.remove('hidden');
  if (found.length === 0) {
    resultBox.innerHTML = `
      <div class="p-4 bg-white border border-gray-200 text-gray-700 text-xs rounded-xl space-y-1">
        <p class="font-bold text-black text-sm">কোনো অর্ডার পাওয়া যায়নি</p>
        <p class="text-gray-500">"${query}" এর সাথে মিলে এমন কোনো অর্ডার ডাটাবেজে নেই। অনুগ্রহ করে সঠিক অর্ডার আইডি বা মোবাইল নম্বর চেক করুন।</p>
      </div>
    `;
    return;
  }

  resultBox.innerHTML = found.map(order => {
    const status = order.status || 'Pending';
    const total = order.total || order.totalAmount || 0;
    const date = order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'Recent';
    const statusColor = status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
                        status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                        status === 'Cancelled' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800';
    return `
      <div class="p-3 bg-white border border-gray-200 rounded-xl space-y-2 text-xs mb-2 shadow-2xs">
        <div class="flex justify-between items-center">
          <span class="font-mono-ui font-bold text-black text-sm">${order.id || order.orderNumber}</span>
          <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold ${statusColor}">${status.toUpperCase()}</span>
        </div>
        <div class="flex justify-between text-gray-500 text-[11px]">
          <span>তারিখ: ${date}</span>
          <span class="font-bold text-black font-mono-ui">৳${Math.round(total).toLocaleString()}</span>
        </div>
        <div class="text-[11px] text-gray-600 border-t border-gray-100 pt-1.5">
          গ্রাহক: <strong>${order.customerName || (order.customer && order.customer.name) || 'Customer'}</strong> • ${order.customerPhone || (order.customer && order.customer.phone) || ''}
        </div>
      </div>
    `;
  }).join('');
};

window.setShopViewMode = function(mode) {
  const grid = document.getElementById('shop-product-grid') || document.getElementById('shop-products-grid');
  const btn2 = document.getElementById('btn-view-grid-2');
  const btn1 = document.getElementById('btn-view-grid-1');
  if (!grid) return;
  if (mode === 'grid-1') {
    grid.className = 'w-full max-w-full grid grid-cols-1 gap-3';
    if (btn1) { btn1.classList.add('bg-white', 'text-primary', 'shadow-2xs'); btn1.classList.remove('text-gray-500'); }
    if (btn2) { btn2.classList.remove('bg-white', 'text-primary', 'shadow-2xs'); btn2.classList.add('text-gray-500'); }
    try { localStorage.setItem('zenvy_shop_view_mode', 'grid-1'); } catch(e){}
  } else {
    grid.className = 'w-full max-w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4 lg:gap-5';
    if (btn2) { btn2.classList.add('bg-white', 'text-primary', 'shadow-2xs'); btn2.classList.remove('text-gray-500'); }
    if (btn1) { btn1.classList.remove('bg-white', 'text-primary', 'shadow-2xs'); btn1.classList.add('text-gray-500'); }
    try { localStorage.setItem('zenvy_shop_view_mode', 'grid-2'); } catch(e){}
  }
};

// ── Dynamic Shop Categories & Products Engine ──
// (Globals initialized at top of app.js)

function renderShopCategories() {
  const listEl = document.getElementById('shop-category-list');
  const pillsEl = document.getElementById('shop-category-pills');
  if (!listEl && !pillsEl) return;

  const categories = (typeof DB !== 'undefined' && DB.categories) ? DB.categories.all().filter(c => c.isActive !== false) : [];

  if (listEl) {
    let listHtml = `
      <label class="flex items-center gap-2.5 cursor-pointer">
        <input type="radio" name="shop-category-radio" ${shopActiveCategory === 'all' ? 'checked' : ''} onchange="selectCategory('all')" class="shop-cat-radio w-4 h-4 rounded-full border-gray-300 accent-black">
        <span class="font-body-md text-sm text-on-surface font-semibold">All Categories</span>
      </label>
    `;
    listHtml += categories.map(c => `
      <label class="flex items-center gap-2.5 cursor-pointer">
        <input type="radio" name="shop-category-radio" ${shopActiveCategory.toLowerCase() === c.name.toLowerCase() ? 'checked' : ''} onchange="selectCategory('${c.name.replace(/'/g, "\\'")}')" class="shop-cat-radio w-4 h-4 rounded-full border-gray-300 accent-black">
        <span class="font-body-md text-sm text-on-surface">${c.name}</span>
      </label>
    `).join('');
    listEl.innerHTML = listHtml;
  }

  if (pillsEl) {
    pillsEl.innerHTML = `
      <button onclick="selectCategory('all',this)" class="cat-pill whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-headline transition-all cursor-pointer ${shopActiveCategory === 'all' ? 'bg-black text-white font-bold shadow-2xs' : 'bg-white border border-gray-200 hover:border-black text-gray-700 font-medium'}">All Jerseys</button>
      ${categories.map(c => {
        const isSelected = shopActiveCategory.toLowerCase() === c.name.toLowerCase();
        return `<button onclick="selectCategory('${c.name.replace(/'/g, "\\'")}',this)" class="cat-pill whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-headline transition-all cursor-pointer ${isSelected ? 'bg-black text-white font-bold shadow-2xs' : 'bg-white border border-gray-200 hover:border-black text-gray-700 font-medium'}">${c.name}</button>`;
      }).join('')}
    `;
  }
}

function updatePriceFilter(val) {
  const priceVal = document.getElementById('price-val');
  shopMaxPrice = parseFloat(val) || 10000;
  if (priceVal) {
    priceVal.innerText = typeof DB !== 'undefined' && DB.currency ? DB.currency.format(shopMaxPrice) : `৳${Math.round(shopMaxPrice).toLocaleString()}`;
  }
  shopCurrentPage = 1;
  renderShopProducts();
}

function selectCategory(cat, btn) {
  shopActiveCategory = (cat || 'all').trim();
  shopCurrentPage = 1;

  // Update pills styling
  document.querySelectorAll('.cat-pill').forEach(p => {
    p.className = 'cat-pill px-3.5 py-1.5 rounded-full text-xs font-mono-ui font-bold border border-gray-200 text-secondary hover:border-primary hover:text-primary transition-colors';
  });
  if (btn) {
    btn.className = 'cat-pill px-3.5 py-1.5 rounded-full text-xs font-mono-ui font-bold bg-primary text-white border border-primary shadow-sm';
  } else {
    document.querySelectorAll('.cat-pill').forEach(p => {
      if ((p.textContent || '').trim().toLowerCase() === shopActiveCategory.toLowerCase() || (shopActiveCategory === 'all' && (p.textContent || '').trim() === 'All')) {
        p.className = 'cat-pill px-3.5 py-1.5 rounded-full text-xs font-mono-ui font-bold bg-primary text-white border border-primary shadow-sm';
      }
    });
  }

  // Sync radio buttons
  document.querySelectorAll('.shop-cat-radio').forEach(r => {
    const parentText = (r.closest('label')?.textContent || '').trim().toLowerCase();
    if (shopActiveCategory === 'all' && parentText.includes('all categories')) r.checked = true;
    else if (parentText.includes(shopActiveCategory.toLowerCase())) r.checked = true;
  });

  // Dynamic Category Banner Info if a specific category is active
  updateCategoryBannerHeader();

  renderShopProducts();
}

function updateCategoryBannerHeader() {
  if (shopActiveCategory === 'all') {
    try { shopCarouselGoto(shopCarouselIndex || 0); } catch(e){}
    return;
  }
  const cat = (typeof DB !== 'undefined' && DB.categories) ? DB.categories.all().find(c => c.name.toLowerCase() === shopActiveCategory.toLowerCase()) : null;
  if (cat) {
    const bannerEl = document.getElementById('shop-banner-slide');
    if (bannerEl && (cat.imageUrl || cat.mobileImgUrl)) {
      bannerEl.style.backgroundImage = `url('${cat.imageUrl || cat.mobileImgUrl}')`;
    }
    const tagEl = document.getElementById('shop-banner-tag');
    if (tagEl) tagEl.textContent = `CATEGORY: ${cat.name.toUpperCase()}`;
    const badgeEl = document.getElementById('shop-banner-badge');
    if (badgeEl) badgeEl.textContent = 'EXPLORE KITS';
    const titleEl = document.getElementById('shop-banner-title');
    if (titleEl) titleEl.innerHTML = cat.name.toUpperCase();
    const subEl = document.getElementById('shop-banner-sub');
    if (subEl) subEl.textContent = cat.description || `Browse our official ${cat.name} selection.`;
  }
}

function applyFilters() {
  shopCurrentPage = 1;
  renderShopProducts();
}

function sortProducts(val) {
  shopSortOrder = val || 'default';
  shopCurrentPage = 1;
  renderShopProducts();
  showToast(`Sorted: ${val === 'price-asc' ? 'Low to High' : val === 'price-desc' ? 'High to Low' : 'Newest'}`);
}

function resetFilters() {
  shopActiveCategory = 'all';
  shopMaxPrice = 25000;
  shopSortOrder = 'default';
  shopCurrentPage = 1;

  const pr = document.getElementById('price-range');
  if (pr) pr.value = 25000;
  const pv = document.getElementById('price-val');
  if (pv) {
    pv.innerText = typeof DB !== 'undefined' && DB.currency ? DB.currency.format(25000) : '৳25,000';
  }

  renderShopCategories();
  renderShopProducts();
  try { shopCarouselGoto(0); } catch(e){}
}

function changeShopPage(page) {
  shopCurrentPage = page;
  renderShopProducts();
  const shopView = document.getElementById('view-shop');
  if (shopView && shopView.classList.contains('active')) {
    window.scrollTo({ top: 320, behavior: 'smooth' });
  }
}

// ── Universal Product Search Matcher ──
function matchProductSearch(p, query) {
  if (!p) return false;
  if (!query || !query.trim()) return true;

  const rawQ = query.trim().toLowerCase();
  const cleanQ = rawQ.replace(/[^a-z0-9\u0980-\u09FF\s]/gi, ' ').trim();
  const tokens = rawQ.split(/\s+/).filter(Boolean);
  const cleanTokens = cleanQ.split(/\s+/).filter(Boolean);

  const parts = [
    p.name || '',
    p.id || '',
    p.slug || '',
    p.sku || '',
    p.categoryName || '',
    p.categoryId || '',
    p.subcategoryId || '',
    p.team || '',
    p.club || '',
    p.sport || '',
    p.gender || '',
    p.description || '',
    p.shortDesc || '',
    p.seoTitle || '',
    p.seoDesc || '',
    p.basePrice !== undefined ? String(p.basePrice) : '',
    p.salePrice !== undefined ? String(p.salePrice) : '',
    p.compareAt !== undefined ? String(p.compareAt) : '',
    p.isPreorder ? 'preorder pre-order' : '',
    p.stock === 0 ? 'out of stock' : 'in stock',
    p.isNewArrival ? 'new arrival' : '',
    p.isBestSeller ? 'best seller bestseller' : '',
    p.isFeatured ? 'featured' : '',
    p.isLimited ? 'limited edition' : '',
    Array.isArray(p.tags) ? p.tags.join(' ') : (p.tags || ''),
    Array.isArray(p.badges) ? p.badges.join(' ') : (p.badges || ''),
    Array.isArray(p.assignedSizes) ? p.assignedSizes.join(' ') : '',
    Array.isArray(p.assignedSleeves) ? p.assignedSleeves.join(' ') : '',
  ];

  const searchable = parts.join(' ').toLowerCase();
  const cleanSearchable = searchable.replace(/[^a-z0-9\u0980-\u09FF\s]/gi, ' ');
  const condensedSearchable = cleanSearchable.replace(/\s+/g, '');
  const condensedQ = cleanQ.replace(/\s+/g, '');

  if (condensedQ && condensedSearchable.includes(condensedQ)) return true;
  if (tokens.every(t => searchable.includes(t))) return true;
  if (cleanTokens.length > 0 && cleanTokens.every(t => cleanSearchable.includes(t))) return true;

  const idStr = String(p.id || '').toLowerCase();
  const skuStr = String(p.sku || '').toLowerCase();
  const slugStr = String(p.slug || '').toLowerCase();
  if (tokens.some(t => idStr === t || skuStr === t || slugStr === t)) return true;

  return false;
}
window.matchProductSearch = matchProductSearch;

function renderShopProducts() {
  const grid = document.getElementById('shop-product-grid');
  const countEl = document.getElementById('product-count');
  if (!grid) return;

  let allProducts = (typeof DB !== 'undefined' && DB.products) ? DB.products.published() : [];

  // Filter by Category across the FULL catalog (or search across ALL products if query is active)
  let filtered = allProducts.filter(p => {
    // If user has entered a search query, search across ALL products regardless of category filter
    if (shopSearchQuery) {
      if (!matchProductSearch(p, shopSearchQuery)) return false;
    } else if (shopActiveCategory !== 'all') {
      const pCatName = (p.categoryName || '').toLowerCase();
      const pCatId = (p.categoryId || '').toLowerCase();
      const pSlug = (p.slug || '').toLowerCase();
      const targetCat = shopActiveCategory.toLowerCase();
      const match = pCatName === targetCat || pCatId === targetCat || pCatName.includes(targetCat) || pSlug.includes(targetCat);
      if (!match) return false;
    }
    // Filter by Price (only when NOT searching or if within price range)
    const price = p.salePrice || p.basePrice || 0;
    if (!shopSearchQuery && price > shopMaxPrice) return false;

    return true;
  });

  const getTs = x => (x && x.createdAt) ? (new Date(x.createdAt).getTime() || 0) : 0;

  // Sort
  if (shopSortOrder === 'price-asc') {
    filtered.sort((a, b) => (a.salePrice || a.basePrice || 0) - (b.salePrice || b.basePrice || 0));
  } else if (shopSortOrder === 'price-desc') {
    filtered.sort((a, b) => (b.salePrice || b.basePrice || 0) - (a.salePrice || a.basePrice || 0));
  } else {
    // Default: Newest first!
    filtered.sort((a, b) => getTs(b) - getTs(a));
  }

  // Fallback to all products if selected category has no matching items (only when not searching)
  let isCategoryFallback = false;
  if (filtered.length === 0 && shopActiveCategory !== 'all' && !shopSearchQuery) {
    isCategoryFallback = true;
    filtered = allProducts.filter(p => {
      const price = p.salePrice || p.basePrice || 0;
      return price <= shopMaxPrice;
    });
    if (shopSortOrder === 'price-asc') {
      filtered.sort((a, b) => (a.salePrice || a.basePrice || 0) - (b.salePrice || b.basePrice || 0));
    } else if (shopSortOrder === 'price-desc') {
      filtered.sort((a, b) => (b.salePrice || b.basePrice || 0) - (a.salePrice || a.basePrice || 0));
    } else {
      filtered.sort((a, b) => getTs(b) - getTs(a));
    }
  }

  if (filtered.length === 0) {
    if (countEl) countEl.textContent = '0';
    grid.innerHTML = `
      <div class="col-span-full py-14 px-4 text-center bg-white rounded-2xl border border-dashed border-gray-200">
        <span class="material-symbols-outlined text-4xl text-gray-300 mb-2">search_off</span>
        <h3 class="font-headline font-bold text-base text-gray-800 mb-1">${shopSearchQuery ? `No kits found matching "${escapeHtml(shopSearchQuery)}"` : 'No products available'}</h3>
        <p class="font-mono-ui text-xs text-gray-400 mb-4">${shopSearchQuery ? 'Try checking for typos or searching by another club, country, or player.' : 'Check back later or explore other categories.'}</p>
        ${shopSearchQuery ? `<button type="button" onclick="clearShopSearch()" class="px-4 py-2 bg-black text-white text-xs font-headline font-bold rounded-xl hover:bg-neutral-800 transition-all cursor-pointer">Clear Search</button>` : ''}
      </div>
    `;
    const pagContainer = document.getElementById('shop-pagination-container');
    if (pagContainer) pagContainer.innerHTML = '';
    return;
  }

  if (countEl) {
    countEl.textContent = isCategoryFallback ? `${filtered.length} (All Kits)` : `${filtered.length}`;
  }

  const PAGE_SIZE = 9;
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  if (shopCurrentPage > totalPages) shopCurrentPage = totalPages;
  if (shopCurrentPage < 1) shopCurrentPage = 1;

  // Render pagination buttons
  const pagContainer = document.getElementById('shop-pagination-container');
  if (pagContainer) {
    if (totalPages <= 1) {
      pagContainer.innerHTML = '';
    } else {
      let pagHtml = `
        <button onclick="changeShopPage(${shopCurrentPage - 1})" ${shopCurrentPage <= 1 ? 'disabled style="opacity:0.3;cursor:not-allowed;"' : ''} class="w-9 h-9 rounded-full flex items-center justify-center text-secondary hover:bg-gray-100 border border-gray-200 transition-colors cursor-pointer">
          <span class="material-symbols-outlined text-base">chevron_left</span>
        </button>
      `;
      for (let p = 1; p <= totalPages; p++) {
        const activeClass = (p === shopCurrentPage)
          ? 'w-9 h-9 rounded-full bg-primary text-white font-mono-ui text-sm font-bold shadow cursor-pointer'
          : 'w-9 h-9 rounded-full text-secondary hover:bg-gray-100 font-mono-ui text-sm transition-colors border border-gray-200 cursor-pointer';
        pagHtml += `<button onclick="changeShopPage(${p})" class="${activeClass}">${p}</button>`;
      }
      pagHtml += `
        <button onclick="changeShopPage(${shopCurrentPage + 1})" ${shopCurrentPage >= totalPages ? 'disabled style="opacity:0.3;cursor:not-allowed;"' : ''} class="w-9 h-9 rounded-full flex items-center justify-center text-secondary hover:bg-gray-100 border border-gray-200 transition-colors cursor-pointer">
          <span class="material-symbols-outlined text-base">chevron_right</span>
        </button>
      `;
      pagContainer.innerHTML = pagHtml;
    }
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full py-16 text-center bg-white rounded-3xl border border-dashed border-gray-200 p-8">
        <span class="material-symbols-outlined text-5xl text-gray-300 mb-3">inventory_2</span>
        <h3 class="font-headline-lg text-lg font-bold text-primary mb-1">No products found</h3>
        <p class="font-body-md text-xs text-secondary mb-4">No products in catalog match your current price filters.</p>
        <button onclick="resetFilters()" class="bg-primary text-white font-label-caps text-xs px-5 py-2.5 rounded-full font-bold cursor-pointer">Reset Filters</button>
      </div>
    `;
    return;
  }

  const startIndex = (shopCurrentPage - 1) * PAGE_SIZE;
  const pageProducts = filtered.slice(startIndex, startIndex + PAGE_SIZE);
  const defaultImg = 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80';

  const renderHash = `${shopActiveCategory}_${shopCurrentPage}_${shopSortOrder}_${shopMaxPrice}_${isCategoryFallback}_` + JSON.stringify(pageProducts.map(p => [p.id, p.name, p.salePrice || p.basePrice, p.stock]));
  if (grid.dataset.renderHash === renderHash && grid.children.length > 0) {
    return;
  }
  grid.dataset.renderHash = renderHash;

  const fallbackNotice = isCategoryFallback ? `
    <div class="col-span-full mb-3 bg-amber-50/90 border border-amber-200/90 rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-950 shadow-2xs">
      <div class="flex items-center gap-2.5">
        <span class="material-symbols-outlined text-amber-600 text-xl flex-shrink-0">info</span>
        <div>
          <span class="font-bold text-black font-headline">"${shopActiveCategory}"</span> ক্যাটাগরিতে এই মুহূর্তে কোনো জার্সি নেই। নিচে আমাদের সব <strong>${filtered.length}টি</strong> জার্সি দেখানো হচ্ছে:
        </div>
      </div>
      <button type="button" onclick="selectCategory('all')" class="self-start sm:self-auto bg-black hover:bg-neutral-800 text-white font-headline text-[11px] font-bold px-3.5 py-1.5 rounded-full transition-all shadow-2xs whitespace-nowrap cursor-pointer">
        সব ক্যাটাগরি দেখুন
      </button>
    </div>
  ` : '';

  grid.innerHTML = fallbackNotice + pageProducts.map(p => {
    const imgUrl = (typeof DB !== 'undefined' && DB.products && typeof DB.products.getImage === 'function')
      ? DB.products.getImage(p)
      : ((p.images && p.images[0] && p.images[0].url) ? p.images[0].url : (p.image || defaultImg));
    const priceFormatted = DB.currency ? DB.currency.format(p.salePrice || p.basePrice) : `৳${p.salePrice || p.basePrice}`;
    const origFormatted = p.compareAt ? (DB.currency ? DB.currency.format(p.compareAt) : `৳${p.compareAt}`) : '';
    const isOutOfStock = (typeof p.stock === 'number' && p.stock <= 0);
    const badgeText = p.isPreorder ? 'PRE-ORDER' : (isOutOfStock ? 'STOCK OUT' : (p.compareAt ? 'SALE' : ''));
    const badgeClass = p.isPreorder ? 'bg-purple-600 text-white' : (isOutOfStock ? 'bg-red-600 text-white' : 'bg-red-50 text-red-600 border border-red-200');

    return `
      <div class="shop-card bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-gray-150 sm:border-gray-100 shadow-2xs hover:shadow-md transition-all duration-300 group flex flex-col justify-between w-full max-w-full"
           data-id="${p.id}" data-price="${p.salePrice || p.basePrice}" data-category="${p.categoryName || ''}">
        
        <!-- Image Area: Compact aspect-square with smooth zoom & interactive wishlist -->
        <div class="relative overflow-hidden bg-[#f7f7f9] cursor-pointer aspect-square flex items-center justify-center p-1.5 sm:p-3"
             onclick="openProduct('${p.id}')">
          <img src="${imgUrl}" class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" alt="${p.name}" loading="lazy"/>
          
          ${badgeText ? `<span class="absolute top-1 left-1 sm:top-2 sm:left-2 ${badgeClass} font-mono-ui font-black text-[8px] sm:text-[10px] px-1.5 py-0.5 rounded-full shadow-2xs">${badgeText}</span>` : ''}
          
          <button type="button" 
                  onclick="event.stopPropagation(); toggleWishlist('${p.name.replace(/'/g, "\\'")}', ${p.salePrice || p.basePrice})"
                  class="absolute top-1 right-1 sm:top-2 sm:right-2 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/95 backdrop-blur-xs shadow-2xs flex items-center justify-center text-gray-400 hover:text-red-500 active:scale-85 transition-all cursor-pointer z-10"
                  title="Add to Wishlist">
            <span class="material-symbols-outlined text-[13px] sm:text-[16px]">favorite</span>
          </button>
        </div>

        <!-- Details & Actions: Compact for phones so 2 products fit cleanly per row -->
        <div class="p-2 sm:p-3 flex flex-col flex-1 justify-between gap-1.5">
          <div>
            <div class="flex items-center justify-between text-[8px] sm:text-[10px] font-mono-ui uppercase tracking-wider text-gray-400 mb-0.5">
              <span class="truncate max-w-[65%] font-medium">${p.categoryName || 'KIT'}</span>
              <span class="flex items-center gap-0.5 text-amber-500 font-bold flex-shrink-0">
                <span class="material-symbols-outlined text-[10px] sm:text-[12px] fill-1">star</span>
                <span class="text-[8px] sm:text-[10px]">4.9</span>
              </span>
            </div>

            <h3 class="font-headline font-bold text-[11px] sm:text-sm text-black leading-tight cursor-pointer hover:text-gray-600 transition-colors line-clamp-2 min-h-[2rem]" 
                onclick="openProduct('${p.id}')" title="${p.name}">
              ${p.name}
            </h3>

            <!-- Price -->
            <div class="mt-1 flex items-baseline gap-1 sm:gap-1.5 flex-wrap">
              <span class="font-headline font-black text-xs sm:text-sm text-black whitespace-nowrap">${priceFormatted}</span>
              ${origFormatted ? `<span class="font-mono-ui text-[9px] sm:text-[11px] text-gray-400 line-through whitespace-nowrap">${origFormatted}</span>` : ''}
            </div>
          </div>

          <!-- Action Buttons: Clean, Compact & Interactive -->
          <div class="grid grid-cols-2 gap-1.5 pt-2 border-t border-gray-100 mt-1.5">
            <button type="button" 
                    onclick="openProduct('${p.id}')"
                    class="py-1.5 px-2 rounded-lg border border-gray-300 hover:border-black text-black font-headline font-bold text-[10px] sm:text-xs transition-colors text-center cursor-pointer hover:bg-gray-50 active:scale-95 whitespace-nowrap shadow-2xs"
                    title="View Product Details">
              View
            </button>
            ${isOutOfStock ? `
              <button type="button" 
                      onclick="openProduct('${p.id}')"
                      class="py-1.5 px-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 font-headline font-bold text-[10px] sm:text-xs transition-all flex items-center justify-center gap-1 cursor-pointer shadow-2xs active:scale-95 whitespace-nowrap"
                      title="Stock Out - View Product">
                <span class="material-symbols-outlined text-[13px] sm:text-[14px]">notifications</span>
                <span>Stock Out</span>
              </button>
            ` : `
              <button type="button" 
                      onclick="instantBuy('${p.id}')"
                      class="py-1.5 px-2 rounded-lg bg-black hover:bg-neutral-800 text-white font-headline font-bold text-[10px] sm:text-xs transition-all flex items-center justify-center gap-1 cursor-pointer shadow-sm hover:shadow active:scale-95 whitespace-nowrap"
                      title="Buy Now">
                <span class="material-symbols-outlined text-[13px] sm:text-[14px]">bolt</span>
                <span>Buy Now</span>
              </button>
            `}
          </div>
        </div>

      </div>    `;
  }).join('');
}

// ── Instant Buy Helper (1-Click Add & Checkout from Cards or Search) ──
function instantBuy(productId) {
  const p = (typeof DB !== 'undefined' && DB.products) ? DB.products.byId(productId) : null;
  if (!p) {
    window.location.href = `product.html?id=${encodeURIComponent(productId)}`;
    return;
  }
  if (typeof p.stock === 'number' && p.stock <= 0) {
    window.location.href = `product.html?id=${encodeURIComponent(productId)}`;
    return;
  }
  const defaultSize = (Array.isArray(p.sizes) && p.sizes[0]) ? p.sizes[0] : (p.size || 'M');
  const defaultSleeve = 'Half Sleeve';
  const price = p.salePrice || p.basePrice || 1450;
  const image = (typeof DB.products.getImage === 'function') ? DB.products.getImage(p) : (p.images?.[0]?.url || p.image || '');

  addToCart({
    productId: p.id,
    name: p.name,
    price: price,
    size: defaultSize,
    sleeve: defaultSleeve,
    image: image,
    qty: 1,
    details: `Size: ${defaultSize} • ${defaultSleeve}`
  });

  closeGlobalSearch();
  switchView('checkout');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
window.instantBuy = instantBuy;

// ── Search Handlers (Shop In-Line Search & Global Search Modal) ──
function handleShopSearch(val) {
  shopSearchQuery = (val || '').trim();
  shopCurrentPage = 1;

  // Sync shop input & global modal input if open
  const sInput = document.getElementById('shop-search-input');
  if (sInput && sInput.value !== shopSearchQuery) sInput.value = shopSearchQuery;
  const gInput = document.getElementById('global-search-input');
  if (gInput && gInput.value !== shopSearchQuery) gInput.value = shopSearchQuery;

  const clearBtn = document.getElementById('shop-search-clear');
  if (clearBtn) {
    if (shopSearchQuery) clearBtn.classList.remove('hidden');
    else clearBtn.classList.add('hidden');
  }

  const pill = document.getElementById('shop-search-active-pill');
  const label = document.getElementById('shop-search-query-label');
  if (pill && label) {
    if (shopSearchQuery) {
      label.textContent = `"${shopSearchQuery}"`;
      pill.classList.remove('hidden');
    } else {
      pill.classList.add('hidden');
    }
  }

  renderShopProducts();
}
window.handleShopSearch = handleShopSearch;

function clearShopSearch() {
  shopSearchQuery = '';
  shopCurrentPage = 1;
  const sInput = document.getElementById('shop-search-input');
  if (sInput) sInput.value = '';
  const gInput = document.getElementById('global-search-input');
  if (gInput) gInput.value = '';
  const hInput = document.getElementById('home-quick-search-input');
  if (hInput) hInput.value = '';

  const clearBtn = document.getElementById('shop-search-clear');
  if (clearBtn) clearBtn.classList.add('hidden');

  const pill = document.getElementById('shop-search-active-pill');
  if (pill) pill.classList.add('hidden');

  renderShopProducts();
}
window.clearShopSearch = clearShopSearch;

function openGlobalSearch() {
  const modal = document.getElementById('global-search-modal');
  if (!modal) return;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  const input = document.getElementById('global-search-input');
  if (input) {
    input.value = shopSearchQuery || '';
    setTimeout(() => {
      input.focus();
      input.select();
    }, 60);
  }
  handleGlobalSearch(input ? input.value : '');
}
window.openGlobalSearch = openGlobalSearch;

function closeGlobalSearch() {
  const modal = document.getElementById('global-search-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}
window.closeGlobalSearch = closeGlobalSearch;

function highlightMatch(text, query) {
  if (!text || !query) return (typeof escapeHtml === 'function' ? escapeHtml(text || '') : (text || ''));
  const escaped = (typeof escapeHtml === 'function' ? escapeHtml(text) : String(text));
  const tokens = query.trim().split(/\s+/).map(t => t.replace(/[^a-zA-Z0-9\u0980-\u09FF]/g, '')).filter(t => t.length > 0);
  if (tokens.length === 0) return escaped;
  try {
    const pattern = tokens.map(t => t.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')).join('|');
    const rx = new RegExp(`(${pattern})`, 'gi');
    return escaped.replace(rx, '<span class="bg-amber-200 text-black font-extrabold px-0.5 rounded">$1</span>');
  } catch(e) {
    return escaped;
  }
}
window.highlightMatch = highlightMatch;

function fillGlobalSearch(text) {
  const input = document.getElementById('global-search-input');
  if (input) {
    input.value = text;
    input.focus();
    handleGlobalSearch(text);
  }
}
window.fillGlobalSearch = fillGlobalSearch;

function renderProductSearchList(matches, q) {
  return matches.map(p => {
    const img = (typeof DB !== 'undefined' && DB.products && typeof DB.products.getImage === 'function')
      ? DB.products.getImage(p)
      : (p.images?.[0]?.url || p.image || 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=200&q=80');
    const price = DB.currency ? DB.currency.format(p.salePrice || p.basePrice) : `৳${p.salePrice || p.basePrice}`;
    const origPrice = p.compareAt ? (DB.currency ? DB.currency.format(p.compareAt) : `৳${p.compareAt}`) : '';
    const isOutOfStock = p.stock === 0;
    const highlightedName = q ? highlightMatch(p.name, q) : escapeHtml(p.name);
    const highlightedSku = (q && p.sku) ? highlightMatch(p.sku, q) : escapeHtml(p.sku || '');

    return `
      <div class="p-2 sm:p-2.5 hover:bg-gray-50 rounded-xl transition-all duration-150 flex items-center justify-between gap-3 group cursor-pointer border border-transparent hover:border-gray-200" onclick="closeGlobalSearch(); openProduct('${p.id}')">
        <div class="flex items-center gap-3 min-w-0">
          <div class="w-12 h-12 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden border border-gray-200">
            <img src="${img}" alt="${p.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform" onerror="this.src='https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=100&q=80'"/>
          </div>
          <div class="min-w-0">
            <div class="flex items-center gap-2">
              <h4 class="font-headline font-bold text-xs sm:text-sm text-black truncate group-hover:text-blue-600 transition-colors">${highlightedName}</h4>
              ${p.isPreorder ? '<span class="px-1.5 py-0.5 rounded text-[9px] font-bold bg-purple-100 text-purple-700">PREORDER</span>' : ''}
              ${isOutOfStock ? '<span class="px-1.5 py-0.5 rounded text-[9px] font-bold bg-red-100 text-red-700">STOCK OUT</span>' : ''}
            </div>
            <div class="flex items-center gap-2 text-[10px] font-mono-ui text-gray-400 mt-0.5">
              <span class="text-gray-600 font-semibold">${p.categoryName || 'Kit'}</span>
              ${p.sku ? `<span>• SKU: ${highlightedSku}</span>` : ''}
            </div>
          </div>
        </div>
        <div class="flex items-center gap-2 flex-shrink-0">
          <div class="text-right">
            <div class="font-headline font-black text-xs sm:text-sm text-black">${price}</div>
            ${origPrice ? `<div class="font-mono-ui text-[10px] text-gray-400 line-through">${origPrice}</div>` : ''}
          </div>
          ${isOutOfStock ? `
            <span class="px-2.5 py-1 bg-red-100 text-red-700 rounded-lg text-[10px] font-bold font-headline whitespace-nowrap">
              Stock Out
            </span>
          ` : `
            <button type="button" onclick="event.stopPropagation(); closeGlobalSearch(); instantBuy('${p.id}')" class="px-3 py-1.5 bg-black hover:bg-neutral-800 text-white rounded-lg text-[10px] font-bold font-headline transition-all cursor-pointer active:scale-95 shadow-xs whitespace-nowrap">
              Buy Now
            </button>
          `}
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function handleGlobalSearch(query) {
  const container = document.getElementById('global-search-results');
  if (!container) return;
  const all = (typeof DB !== 'undefined' && DB.products) ? DB.products.published() : [];
  const categories = (typeof DB !== 'undefined' && DB.categories) ? DB.categories.all().filter(c => c.isActive !== false) : [];
  const q = (query || '').trim();

  // ── 1. When search input is empty (Initial state when modal opens from top search button) ──
  if (!q) {
    const trending = ['Barcelona', 'Real Madrid Home', 'Player Version', 'Club Sweat Shirt', '876', 'Preorders'];
    container.innerHTML = `
      <div class="p-4 space-y-4">
        <!-- Trending Suggestions -->
        <div>
          <div class="flex items-center gap-1.5 text-[11px] font-mono-ui font-bold text-gray-500 uppercase tracking-wider mb-2">
            <span class="material-symbols-outlined text-amber-500 text-sm">local_fire_department</span>
            <span>Trending Searches</span>
          </div>
          <div class="flex flex-wrap gap-2">
            ${trending.map(t => `
              <button type="button" onclick="fillGlobalSearch('${t.replace(/'/g, "\\'")}')" class="text-xs font-semibold bg-gray-100 hover:bg-black hover:text-white text-gray-800 px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs">
                <span class="material-symbols-outlined text-xs opacity-60">trending_up</span>
                ${t}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Categories -->
        ${categories.length > 0 ? `
          <div>
            <div class="flex items-center gap-1.5 text-[11px] font-mono-ui font-bold text-gray-500 uppercase tracking-wider mb-2">
              <span class="material-symbols-outlined text-blue-500 text-sm">category</span>
              <span>Popular Categories</span>
            </div>
            <div class="flex flex-wrap gap-2">
              ${categories.map(c => `
                <button type="button" onclick="viewAllSearchResultsInShop('${c.name.replace(/'/g, "\\'")}')" class="text-xs font-semibold bg-white border border-gray-200 hover:border-black text-gray-800 px-3 py-1.5 rounded-xl transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer">
                  <span class="material-symbols-outlined text-xs text-gray-400">sports_soccer</span>
                  ${c.name}
                </button>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Latest Match Kits -->
        <div class="pt-3 border-t border-gray-100">
          <div class="flex items-center justify-between text-[11px] font-mono-ui font-bold text-gray-500 uppercase tracking-wider mb-2.5">
            <span class="flex items-center gap-1">
              <span class="material-symbols-outlined text-emerald-500 text-sm">verified</span>
              <span>Available Match Kits (${all.length})</span>
            </span>
            <button type="button" onclick="viewAllSearchResultsInShop('')" class="text-blue-600 hover:underline normal-case font-bold cursor-pointer">View in Shop →</button>
          </div>
          <div class="space-y-1.5">
            ${renderProductSearchList(all, '')}
          </div>
        </div>
      </div>
    `;
    return;
  }

  // ── 2. When user has typed query (Live Instant Suggestions + Matching Products) ──
  const matches = all.filter(p => matchProductSearch(p, q));

  // Generate dynamic smart suggestions
  const suggestionsSet = new Set();
  const suggestions = [];

  matches.slice(0, 4).forEach(p => {
    if (!suggestionsSet.has(p.name)) {
      suggestionsSet.add(p.name);
      suggestions.push({ text: p.name, type: 'jersey', icon: 'sports_soccer' });
    }
  });

  categories.forEach(c => {
    if (c.name.toLowerCase().includes(q.toLowerCase()) && !suggestionsSet.has(c.name)) {
      suggestionsSet.add(c.name);
      suggestions.push({ text: c.name, type: 'category', icon: 'category' });
    }
  });

  matches.forEach(p => {
    if (p.sku && p.sku.toLowerCase().includes(q.toLowerCase()) && !suggestionsSet.has(p.sku)) {
      suggestionsSet.add(p.sku);
      suggestions.push({ text: p.sku, type: 'sku', icon: 'tag' });
    }
  });

  if (matches.length === 0) {
    container.innerHTML = `
      <div class="text-center py-10 px-4">
        <span class="material-symbols-outlined text-4xl text-gray-300 mb-1">search_off</span>
        <p class="font-headline font-bold text-sm text-gray-700">No jerseys found matching "${escapeHtml(q)}"</p>
        <p class="font-mono-ui text-xs text-gray-400 mt-1">Try another keyword or view all match kits in the catalog.</p>
        <button type="button" onclick="handleGlobalSearch('')" class="mt-3 px-4 py-2 text-xs font-bold text-black border border-gray-300 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
          View All Products (${all.length})
        </button>
      </div>
    `;
    return;
  }

  const suggestionsBar = suggestions.length > 0 ? `
    <div class="px-4 py-2.5 bg-gray-50/90 border-b border-gray-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
      <span class="text-[10px] font-mono-ui font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1 flex-shrink-0">
        <span class="material-symbols-outlined text-[13px] text-amber-500">lightbulb</span> Suggestions:
      </span>
      <div class="flex items-center gap-1.5 flex-nowrap">
        ${suggestions.slice(0, 5).map(s => `
          <button type="button" onclick="fillGlobalSearch('${s.text.replace(/'/g, "\\'")}')" class="text-xs font-semibold bg-white border border-gray-200 hover:border-black hover:bg-black hover:text-white rounded-lg px-2.5 py-1 transition-all flex items-center gap-1 shadow-2xs whitespace-nowrap cursor-pointer">
            <span class="material-symbols-outlined text-[12px] opacity-60">${s.icon}</span>
            <span>${highlightMatch(s.text, q)}</span>
          </button>
        `).join('')}
      </div>
    </div>
  ` : '';

  const headerHtml = `
    <div class="px-4 py-2 flex items-center justify-between text-[11px] font-mono-ui font-bold text-gray-500 uppercase tracking-wider border-b border-gray-50">
      <span>Found ${matches.length} matching kit${matches.length === 1 ? '' : 's'}</span>
      <button type="button" onclick="const i=document.getElementById('global-search-input');if(i){i.value='';handleGlobalSearch('');i.focus();}" class="text-blue-600 hover:underline capitalize cursor-pointer">Clear</button>
    </div>
  `;

  const itemsHtml = renderProductSearchList(matches, q);

  container.innerHTML = suggestionsBar + headerHtml + `<div class="p-3 space-y-1.5">${itemsHtml}</div>`;
}
window.handleGlobalSearch = handleGlobalSearch;

function viewAllSearchResultsInShop(customQuery) {
  let query = '';
  if (customQuery !== undefined && customQuery !== null) {
    query = String(customQuery).trim();
  } else {
    const input = document.getElementById('global-search-input') || document.getElementById('home-quick-search-input');
    query = input ? input.value.trim() : '';
  }
  closeGlobalSearch();
  if (typeof selectCategory === 'function') {
    selectCategory('all', false);
  }
  switchView('shop');
  const shopInput = document.getElementById('shop-search-input');
  if (shopInput) shopInput.value = query;
  handleShopSearch(query);
  window.scrollTo({ top: 320, behavior: 'smooth' });
}
window.viewAllSearchResultsInShop = viewAllSearchResultsInShop;
window.viewAllSearchResultsInShop = viewAllSearchResultsInShop;

// Keyboard shortcut listeners for instant search
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeGlobalSearch();
  }
  if ((e.key === '/' || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')) && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) {
    e.preventDefault();
    openGlobalSearch();
  }
});

// ── Shop Banner Carousel ──
// shopCarouselIndex declared at top of file

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
    bannerEl.style.transition = 'background-image 0.4s ease-in-out';
    bannerEl.style.backgroundImage = `url('${slide.bg}')`;
    bannerEl.style.opacity = '1';
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
  const shopView = document.getElementById('view-shop');
  if (!shopView || !shopView.classList.contains('active')) return;
  const slides = getShopSlides();
  const total = slides.length || 1;
  shopCarouselGoto((shopCarouselIndex + 1) % total);
}

function shopCarouselPrev() {
  const slides = getShopSlides();
  const total = slides.length || 1;
  shopCarouselGoto((shopCarouselIndex - 1 + total) % total);
}

// Auto-advance shop carousel every 4 seconds (only when shop view is active)
if (!window._shopCarouselTimer) {
  window._shopCarouselTimer = setInterval(shopCarouselNext, 4000);
}

let pdState = { product: null, size: 'M', qty: 1 };

function openProduct(product) {
  let prodId = '101';
  if (typeof product === 'string' || typeof product === 'number') {
    prodId = product;
  } else if (product && typeof product === 'object') {
    prodId = product.id || product.slug || '101';
  }
  window.location.href = `product.html?id=${encodeURIComponent(prodId)}`;
}

function closeProduct() {
  const modal = document.getElementById('product-modal');
  if (modal && !modal.classList.contains('hidden')) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }
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

function instantBuyProductModal() {
  if (!pdState.product) return;
  const p = pdState.product;
  closeProduct();
  try { toggleCartDrawer(false); } catch(e){}
  addToCart({
    id: p.id,
    name: p.name,
    price: p.price,
    image: p.image,
    details: `Size: ${pdState.size}`
  }, pdState.qty, false);
  switchView('checkout');
  window.scrollTo({ top: 0, behavior: 'smooth' });
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
  let selectedPaymentId = 'bkash';
  if (activeSplit === 'cod') {
    selectedPaymentId = 'cod';
  } else {
    const paymentInput = document.querySelector('input[name="payment-method"]:checked');
    selectedPaymentId = paymentInput ? paymentInput.value : 'bkash';
    if (selectedPaymentId === 'cod') selectedPaymentId = 'bkash';
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
      paymentMethod: selectedPaymentId === 'bkash' ? `bKash (${planLabel})` : selectedPaymentId === 'nagad' ? `Nagad (${planLabel})` : selectedPaymentId === 'rocket' ? `Rocket (${planLabel})` : 'Cash on Delivery',
      paymentTrxId: '',
      senderPhone: '',
      isDeliveryChargeMandatory: policy.isDeliveryChargeMandatory || false,
      paymentStatus: payableNow > 0 ? 'AWAITING_ADVANCE_PAYMENT' : 'PENDING_COD',
      status: 'PENDING',
      notes: `Plan: ${planLabel} • Zone: ${zoneName} • Delivery: ৳${shippingFee}${policy.isDeliveryChargeMandatory ? ' [MANDATORY]' : ''}`
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
      paymentMethod: selectedPaymentId === 'bkash' ? `bKash (${planLabel})` : selectedPaymentId === 'nagad' ? `Nagad (${planLabel})` : selectedPaymentId === 'rocket' ? `Rocket (${planLabel})` : 'Cash on Delivery',
      paymentTrxId: '',
      senderPhone: '',
      paymentStatus: payableNow > 0 ? 'AWAITING_ADVANCE_PAYMENT' : 'PENDING_COD',
      status: 'PENDING',
      createdAt: new Date().toISOString()
    };
  }

  // If advance payment via bKash / Nagad / Rocket is required, open the popup directly!
  if (payableNow > 0 && (selectedPaymentId === 'bkash' || selectedPaymentId === 'nagad' || selectedPaymentId === 'rocket')) {
    openMfsPaymentModal(createdOrder, selectedPaymentId, payableNow, activeSplit, dueOnDelivery);
    return;
  }

  // Pure Cash on Delivery flow
  if (typeof DB !== 'undefined' && DB.telegram && DB.telegram.sendOrderNotification) {
    try {
      DB.telegram.sendOrderNotification(createdOrder);
    } catch(e) { console.error('Telegram error:', e); }
  }

  // Clear cart for COD
  appState.cart = [];
  saveCartState();
  renderCart();

  // Redirect directly to shopping page
  switchView('shop');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Show celebratory success popup
  showOrderSuccessCelebration(createdOrder);
  showToast('🎉 Order placed successfully! Thank you for ordering with ZENVY.');
}

// ──────────────────────────────────────────────────────────────
// Order Success Celebration Modal Popup
// ──────────────────────────────────────────────────────────────
function showOrderSuccessCelebration(order) {
  if (!order) return;
  const existing = document.getElementById('order-success-modal');
  if (existing) existing.remove();

  const brand = (typeof DB !== 'undefined' && DB.brand) ? DB.brand.get() : {};
  const settings = (typeof DB !== 'undefined' && DB.storeSettings) ? DB.storeSettings.get() : {};
  let phone = brand.socialWhatsApp || settings.whatsappNumber || brand.phone || '8801700000000';
  phone = phone.replace(/[^0-9]/g, '');
  if (phone.startsWith('01')) phone = '88' + phone;

  const orderNum = order.orderNumber || order.id || 'ZNV-100001';
  const total = order.totalAmount || order.total || 0;
  const method = order.paymentMethod || 'Cash on Delivery';
  const trxId = order.paymentTrxId || order.trxId || order.transactionId || '';
  const paid = order.paidAmount || (order.paymentStatus === 'PAID' ? total : 0);
  const due = order.dueAmount !== undefined ? order.dueAmount : Math.max(0, total - paid);

  const waMsg = encodeURIComponent(`Hi ZENVY, I have placed order #${orderNum} for ৳${total.toLocaleString()} via ${method}${trxId ? ' (TrxID: ' + trxId + ')' : ''}${paid > 0 ? ' [Paid Advance: ৳' + paid.toLocaleString() + ', Due: ৳' + due.toLocaleString() + ']' : ''}. Please confirm!`);
  const waUrl = `https://wa.me/${phone}?text=${waMsg}`;

  const modal = document.createElement('div');
  modal.id = 'order-success-modal';
  modal.className = 'fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in';
  modal.innerHTML = `
    <div class="relative bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-center border border-neutral-200 animate-slide-up">
      <!-- Close Button -->
      <button type="button" onclick="document.getElementById('order-success-modal').remove()" class="absolute top-4 right-4 w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 transition-colors cursor-pointer">
        <span class="material-symbols-outlined text-base">close</span>
      </button>

      <!-- Animated Success Check -->
      <div class="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-full bg-emerald-50 border-4 border-emerald-200 flex items-center justify-center text-emerald-600 shadow-md">
        <span class="material-symbols-outlined text-3xl sm:text-4xl font-black">check</span>
      </div>

      <span class="inline-block bg-emerald-100 text-emerald-900 text-[11px] font-mono-ui font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider mb-2">
        Order Placed Successfully • অর্ডার গৃহীত হয়েছে
      </span>

      <h3 class="font-headline text-xl sm:text-2xl font-black text-neutral-900 mb-1">
        Thank You for Your Order!
      </h3>
      <p class="font-body text-xs sm:text-sm text-neutral-600 leading-relaxed mb-4">
        Your match kit order has been placed successfully. A delivery rider from Steadfast / Pathao will deliver your package.
      </p>

      <!-- Order ID and Total Card -->
      <div class="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 mb-5 text-left font-mono-ui text-xs space-y-2">
        <div class="flex justify-between items-center">
          <span class="text-neutral-500 uppercase font-bold text-[10px]">Order Number</span>
          <span class="font-headline font-black text-sm text-neutral-900">#${orderNum}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-neutral-500 uppercase font-bold text-[10px]">Payment Method</span>
          <span class="font-bold text-neutral-800">${method}</span>
        </div>
        ${trxId ? `
        <div class="flex justify-between items-center bg-blue-50/80 -mx-1 px-2 py-1 rounded-lg border border-blue-100">
          <span class="text-blue-800 uppercase font-bold text-[10px]">Transaction ID (TrxID)</span>
          <span class="font-mono font-black text-xs text-blue-900">${trxId}</span>
        </div>
        ` : ''}
        ${paid > 0 ? `
        <div class="flex justify-between items-center">
          <span class="text-emerald-700 font-bold text-[10px] uppercase">Advance Paid</span>
          <span class="font-bold text-xs text-emerald-700 font-mono">৳${paid.toLocaleString()}</span>
        </div>
        ` : ''}
        ${due > 0 ? `
        <div class="flex justify-between items-center">
          <span class="text-amber-700 font-bold text-[10px] uppercase">Due on Delivery (COD)</span>
          <span class="font-bold text-xs text-amber-700 font-mono">৳${due.toLocaleString()}</span>
        </div>
        ` : ''}
        <div class="flex justify-between items-center pt-1.5 border-t border-dashed border-neutral-200">
          <span class="text-neutral-800 font-bold uppercase text-[10px]">Total Order Value</span>
          <span class="font-black text-sm text-neutral-900">৳${total.toLocaleString()}</span>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col gap-2.5">
        <button type="button" onclick="document.getElementById('order-success-modal').remove()" class="w-full py-3.5 px-5 bg-black hover:bg-neutral-800 text-white font-headline font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95">
          <span class="material-symbols-outlined text-base">storefront</span>
          <span>Continue Shopping</span>
        </button>
        <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="w-full py-3 px-5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-headline font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-95">
          <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
          <span>Get Order Update on WhatsApp</span>
        </a>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

// ──────────────────────────────────────────────────────────────
// Render Order Confirmation Details
// ──────────────────────────────────────────────────────────────
function renderOrderConfirmation(order) {
  if (!order) return;

  const orderNumEl = document.getElementById('confirmed-order-number');
  if (orderNumEl) orderNumEl.textContent = '#' + (order.orderNumber || order.id || 'ZNV-100001');

  const dateEl = document.getElementById('confirmed-order-date');
  if (dateEl) {
    const d = order.createdAt ? new Date(order.createdAt) : new Date();
    dateEl.textContent = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  const nameEl = document.getElementById('confirmed-customer-name');
  if (nameEl) nameEl.textContent = order.customerName || '-';

  const phoneEl = document.getElementById('confirmed-customer-phone');
  if (phoneEl) phoneEl.textContent = order.customerPhone || '-';

  const addrEl = document.getElementById('confirmed-customer-address');
  if (addrEl) addrEl.textContent = order.shippingAddress || '-';

  const countEl = document.getElementById('confirmed-items-count');
  if (countEl) countEl.textContent = (order.items || []).length;

  const itemsContainer = document.getElementById('confirmed-order-items');
  if (itemsContainer && order.items) {
    itemsContainer.innerHTML = order.items.map(item => `
      <div class="flex items-center gap-3 p-2.5 bg-gray-50 rounded-xl border border-gray-100">
        <img src="${item.image || 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=100'}" 
             class="w-12 h-12 rounded-lg object-cover bg-white flex-shrink-0" alt="${item.name || 'Jersey'}"/>
        <div class="flex-1 min-w-0">
          <p class="font-bold text-xs text-primary truncate">${item.name || 'Jersey Kit'}</p>
          <p class="text-[10px] text-gray-500 font-mono-ui">
            Size: <b>${item.size || 'M'}</b> • ${item.sleeve || 'Half Sleeve'} • Qty: <b>${item.qty || 1}</b>
          </p>
          ${item.customName ? `<p class="text-[10px] text-blue-600 font-mono-ui font-semibold">Print: ${item.customName} ${item.customNumber || ''}</p>` : ''}
          ${item.patchName ? `<p class="text-[10px] text-amber-600 font-mono-ui">Badges: ${item.patchName}</p>` : ''}
        </div>
        <div class="font-mono-ui font-black text-xs text-black flex-shrink-0">
          ৳${((parseFloat(item.price) || 0) * (parseInt(item.qty) || 1)).toLocaleString()}
        </div>
      </div>
    `).join('');
  }

  const subtotalEl = document.getElementById('confirmed-subtotal');
  if (subtotalEl) subtotalEl.textContent = `৳${(order.subtotal || 0).toLocaleString()}`;

  const shippingEl = document.getElementById('confirmed-shipping');
  if (shippingEl) shippingEl.textContent = `৳${(order.shippingFee || 0).toLocaleString()}`;

  const totalEl = document.getElementById('confirmed-total');
  if (totalEl) totalEl.textContent = `৳${(order.totalAmount || 0).toLocaleString()}`;

  const paidAmount = order.paidAmount || (order.paymentTrxId ? (order.payableNowAmount || order.shippingFee || 0) : 0);
  const paidEl = document.getElementById('confirmed-paid');
  if (paidEl) paidEl.textContent = `৳${paidAmount.toLocaleString()}`;

  const methodEl = document.getElementById('confirmed-pay-method');
  if (methodEl) methodEl.textContent = order.paymentMethod || 'bKash';

  const trxRow = document.getElementById('confirmed-trx-row');
  const trxIdEl = document.getElementById('confirmed-trxid');
  if (order.paymentTrxId || order.trxId) {
    if (trxRow) trxRow.style.display = 'block';
    if (trxIdEl) trxIdEl.textContent = order.paymentTrxId || order.trxId;
  } else {
    if (trxRow) trxRow.style.display = 'none';
  }

  const dueEl = document.getElementById('confirmed-due');
  const dueRow = document.getElementById('confirmed-due-row');
  const dueAmt = order.dueAmount !== undefined ? order.dueAmount : Math.max(0, (order.totalAmount || 0) - paidAmount);
  if (dueEl) dueEl.textContent = `৳${dueAmt.toLocaleString()}`;
  if (dueRow) dueRow.style.display = dueAmt > 0 ? 'flex' : 'none';

  // WhatsApp Support Button Handler
  window.contactSupportWhatsApp = function() {
    const brand = (typeof DB !== 'undefined' && DB.brand) ? DB.brand.get() : {};
    const settings = (typeof DB !== 'undefined' && DB.storeSettings) ? DB.storeSettings.get() : {};
    const brandName = brand.brandName || 'ZENVY';
    let phone = brand.socialWhatsApp || settings.whatsappNumber || brand.phone || '8801700000000';
    phone = phone.replace(/[^0-9]/g, '');
    if (phone.startsWith('01')) phone = '88' + phone;

    const msg = `Salam ${brandName}, I have placed Order #${order.orderNumber || order.id}.\nCustomer: ${order.customerName}\nPhone: ${order.customerPhone}\nTotal: ৳${order.totalAmount}\nPlease confirm receipt. Thank you!`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };
}

function openMfsPaymentModal(order, providerId = 'bkash', payableNow = null, activeSplit = 'delivery_only', dueOnDelivery = 0) {
  const existingModal = document.getElementById('bkash-payment-modal');
  if (existingModal) existingModal.remove();

  const payCfg = (typeof DB !== 'undefined' && DB.payments) ? DB.payments.get() : {};
  const isNagad = providerId === 'nagad';
  const isRocket = providerId === 'rocket';
  const isBkash = !isNagad && !isRocket;

  const providerName = isNagad ? 'Nagad' : isRocket ? 'Rocket' : 'bKash';
  const providerColor = isNagad ? '#EA580C' : isRocket ? '#7C3AED' : '#D12053';
  const providerBg = isNagad ? '#FFF7ED' : isRocket ? '#FAF5FF' : '#FFF1F5';
  const providerBorder = isNagad ? '#FED7AA' : isRocket ? '#E9D5FF' : '#FCE7F3';
  const providerLogo = isNagad ? 'img/mfs/nagad.png' : isRocket ? 'img/mfs/rocket.png' : 'img/mfs/bkash.png';

  const cfgObj = isNagad ? (payCfg.nagad || {}) : isRocket ? (payCfg.rocket || {}) : (payCfg.bkash || {});
  const phoneNum = cfgObj.number || (payCfg.uddoktaPay?.merchantNumber || '01700000000');
  const accType = cfgObj.type || 'Personal';
  const instructions = cfgObj.instructions || `${providerName} ${accType} নাম্বারে Send Money করুন এবং TrxID নিচের ঘরে দিন।`;

  const amount = Math.round(payableNow !== null ? payableNow : (order.payableNowAmount || order.totalAmount || 0));
  const isDeliveryOnly = activeSplit === 'delivery_only';

  const modal = document.createElement('div');
  modal.id = 'bkash-payment-modal';
  modal.className = 'fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 backdrop-blur-md transition-opacity duration-200';
  modal.setAttribute('onclick', 'if(event.target===this)this.remove();');
  modal.innerHTML = `
    <div class="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl animate-fade-in border border-gray-100 relative" onclick="event.stopPropagation()">
      <!-- MFS Header -->
      <div style="background:${providerColor};" class="p-6 text-white text-center relative">
        <button type="button" onclick="document.getElementById('bkash-payment-modal').remove();" class="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/35 text-white flex items-center justify-center font-bold text-base transition-colors cursor-pointer" title="Close / বন্ধ করুন">✕</button>
        <div class="w-16 h-12 bg-white rounded-xl mx-auto flex items-center justify-center shadow-md mb-3 p-1.5 border border-white/50">
          <img src="${providerLogo}" class="max-h-full max-w-full object-contain" alt="${providerName}" />
        </div>
        <h3 class="text-xl font-bold font-headline tracking-wide">${providerName} Transfer Details</h3>
        <p class="text-xs text-white/90 font-mono-ui mt-0.5 tracking-wide">${providerName} ${accType} Verification</p>
      </div>

      <!-- Body -->
      <div class="p-6 space-y-4">
        <!-- Payable Highlight -->
        <div style="background:${providerBg};border:1px solid ${providerBorder};" class="rounded-2xl p-4 flex justify-between items-center shadow-2xs">
          <div>
            <div class="text-[10px] text-gray-500 font-bold uppercase tracking-wider font-mono-ui">
              ${isDeliveryOnly ? 'Advance Delivery Fee' : 'Full Order Amount (100% Prepaid)'}
            </div>
            <div class="text-2xl font-black font-mono-ui mt-0.5" style="color:${providerColor};">৳${amount.toLocaleString()}</div>
            ${isDeliveryOnly ? `<div class="text-[11px] text-gray-600 mt-1 font-mono-ui">Remaining <b>৳${dueOnDelivery.toLocaleString()}</b> Due on Delivery</div>` : ''}
          </div>
          <div class="text-right">
            <div class="text-[10px] text-gray-500 font-bold uppercase tracking-wider font-mono-ui">Order ID</div>
            <div class="text-sm font-bold font-mono text-gray-800">#${order.orderNumber || order.id}</div>
          </div>
        </div>

        <div class="border border-gray-200 bg-gray-50/80 rounded-2xl p-4 text-xs space-y-2 text-gray-700">
          <div class="font-bold text-black flex items-center justify-between">
            <span class="flex items-center gap-1.5" style="color:${providerColor};">
              <span class="material-symbols-outlined text-sm">touch_app</span> ${providerName} Instructions:
            </span>
            <button type="button" onclick="navigator.clipboard.writeText('${phoneNum}');this.textContent='Copied!';" class="text-[11px] font-bold text-white px-2.5 py-1 rounded-lg shadow-sm cursor-pointer transition-transform active:scale-95" style="background:${providerColor};">
              Copy Number
            </button>
          </div>
          <div class="pl-2 space-y-1.5 text-[11px]">
            <div>Recipient Number: <b class="font-mono bg-white px-2 py-0.5 rounded border border-gray-300 text-gray-900">${phoneNum}</b> (${accType})</div>
            <div>${instructions}</div>
          </div>
        </div>

        <div>
          <label class="block text-xs font-bold text-gray-700 mb-1">Enter ${providerName} Transaction ID (TrxID)<span class="text-red-500">*</span></label>
          <input type="text" id="bkash-trx-input" placeholder="e.g. 9B7X2K4M" class="w-full px-4 py-3 rounded-xl border border-gray-300 font-mono uppercase text-sm focus:outline-none focus:ring-2 focus:ring-black bg-white transition-all"
            oninput="const e=document.getElementById('mfs-trx-error');if(e)e.classList.add('hidden');this.classList.remove('border-rose-500','ring-2','ring-rose-200');"
            onkeydown="if(event.key==='Enter'){event.preventDefault();submitMfsTrxId('${order.id}', '${providerName}', ${amount}, ${dueOnDelivery}, '${activeSplit}');}" />
        </div>

        <div>
          <label class="block text-xs font-bold text-gray-700 mb-1">Your Sender Phone Number (Optional)</label>
          <input type="tel" id="bkash-sender-input" placeholder="e.g. 017XXXXXXXX" class="w-full px-4 py-2.5 rounded-xl border border-gray-300 font-mono text-xs focus:outline-none bg-white" />
        </div>

        <!-- Inline error alert box -->
        <div id="mfs-trx-error" class="hidden bg-rose-50 border border-rose-200 text-rose-700 text-xs px-3.5 py-2.5 rounded-xl font-medium flex items-center gap-2 animate-fade-in"></div>

        <div class="flex gap-2 pt-2">
          <button id="mfs-confirm-btn" type="button" onclick="submitMfsTrxId('${order.id}', '${providerName}', ${amount}, ${dueOnDelivery}, '${activeSplit}')" style="background:${providerColor};" class="flex-1 py-3 px-4 rounded-xl text-white font-bold text-sm hover:opacity-95 shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-2 transition-all cursor-pointer">
            <span class="material-symbols-outlined text-base">verified</span>
            <span id="mfs-confirm-btn-text">Confirm & Verify TrxID</span>
          </button>
          <button type="button" onclick="document.getElementById('bkash-payment-modal').remove();" class="px-4 py-3 rounded-xl border border-gray-200 text-gray-700 font-bold text-xs hover:bg-gray-100 transition-colors cursor-pointer">
            Cancel
          </button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  setTimeout(() => {
    const input = document.getElementById('bkash-trx-input');
    if (input) input.focus();
  }, 100);
}

window.openMfsPaymentModal = openMfsPaymentModal;
window.openBkashPaymentModal = (order, uddoktaConfig, payableNow, activeSplit, dueOnDelivery) => openMfsPaymentModal(order, 'bkash', payableNow, activeSplit, dueOnDelivery);

function submitMfsTrxId(orderId, providerName, paidAmount, dueAmount, splitMode) {
  const trxInput = document.getElementById('bkash-trx-input');
  const errorBox = document.getElementById('mfs-trx-error');
  const confirmBtn = document.getElementById('mfs-confirm-btn');
  const confirmBtnText = document.getElementById('mfs-confirm-btn-text');

  const trxId = trxInput ? trxInput.value.trim().toUpperCase() : '';
  const senderInput = document.getElementById('bkash-sender-input');
  const senderPhone = senderInput ? senderInput.value.trim() : '';

  if (!trxId) {
    if (trxInput) {
      trxInput.classList.add('border-rose-500', 'ring-2', 'ring-rose-200');
      trxInput.focus();
    }
    if (errorBox) {
      errorBox.innerHTML = `<span class="material-symbols-outlined text-base text-rose-600">error</span> <span>অনুগ্রহ করে আপনার ${providerName} Transaction ID (TrxID) লিখুন।</span>`;
      errorBox.classList.remove('hidden');
    }
    showToast(`⚠️ Please enter a valid ${providerName} Transaction ID (TrxID)`);
    return;
  }

  // Visual loading feedback immediately on click
  if (confirmBtn) {
    confirmBtn.disabled = true;
    confirmBtn.style.opacity = '0.85';
    confirmBtn.style.pointerEvents = 'none';
  }
  if (confirmBtnText) {
    confirmBtnText.innerHTML = '<span class="inline-block animate-spin mr-1.5">⏳</span> Verifying & Saving...';
  }

  const isFullPaid = splitMode === 'full' || dueAmount === 0;
  const paymentStatus = isFullPaid ? 'PAID' : 'ADVANCE_DELIVERY_PAID';
  const paymentDetails = `${providerName} TrxID: ${trxId}${senderPhone ? ' (Sender: ' + senderPhone + ')' : ''} • ${isFullPaid ? 'Full Paid' : `Advance ৳${paidAmount} paid, ৳${dueAmount} due`}`;

  try {
    if (typeof DB !== 'undefined' && DB.orders) {
      DB.orders.update(orderId, {
        paymentMethod: providerName,
        paymentStatus: paymentStatus,
        status: 'PROCESSING',
        paidAmount: paidAmount,
        dueAmount: dueAmount,
        trxId: trxId,
        transactionId: trxId,
        paymentTrxId: trxId,
        paymentSenderPhone: senderPhone,
        paymentRemark: paymentDetails,
        paymentDetails: paymentDetails,
        updatedAt: new Date().toISOString()
      });

      const order = DB.orders.byId(orderId);
      if (order && DB.telegram && DB.telegram.sendOrderNotification) {
        try {
          DB.telegram.sendOrderNotification({
            ...order,
            paymentMethod: providerName,
            paymentTrxId: trxId,
            paymentSenderPhone: senderPhone,
            paymentRemark: paymentDetails,
            paidAmount,
            dueAmount,
            paymentStatus: `${paymentStatus} (TrxID: ${trxId})`,
            paymentDetails
          });
        } catch(e) { console.warn('Telegram notify error:', e); }
      }
    }
  } catch(err) {
    console.error('Error updating order:', err);
  }

  // Smoothly remove payment modal
  const modal = document.getElementById('bkash-payment-modal');
  if (modal) {
    modal.classList.add('opacity-0');
    setTimeout(() => { if (modal) modal.remove(); }, 200);
  }

  // Clear cart now that payment is confirmed
  appState.cart = [];
  saveCartState();
  renderCart();

  const updatedOrder = (typeof DB !== 'undefined' && DB.orders) ? DB.orders.byId(orderId) : null;
  const finalOrder = updatedOrder || {
    id: orderId,
    orderNumber: orderId,
    totalAmount: paidAmount + dueAmount,
    paidAmount: paidAmount,
    dueAmount: dueAmount,
    paymentMethod: providerName,
    paymentTrxId: trxId,
    trxId: trxId,
    paymentStatus: paymentStatus
  };

  // Redirect directly to shopping page
  switchView('shop');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Show celebratory success popup on shop
  setTimeout(() => {
    showOrderSuccessCelebration(finalOrder);
    showToast(`🎉 ${providerName} TrxID: ${trxId} গৃহীত হয়েছে! অর্ডার কনফার্মড!`, 6000);
  }, 250);
}

window.submitMfsTrxId = submitMfsTrxId;

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

function saveWishlist(list) {
  try {
    localStorage.setItem('zenvy_wishlist', JSON.stringify(list));
    updateWishlistBadges();
    syncWishlistHeartButtons();
    renderWishlistDrawer();
  } catch(e) {}
}

function toggleWishlist(productOrName, price, image, category) {
  let item = null;
  if (typeof productOrName === 'object' && productOrName !== null) {
    item = {
      id: productOrName.id || ('wish_' + Date.now()),
      name: productOrName.name || 'ZENVY Jersey',
      price: productOrName.salePrice || productOrName.basePrice || 1450,
      image: (productOrName.images && productOrName.images[0]?.url) || productOrName.image || 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&q=80',
      category: productOrName.categoryName || "Men's Football"
    };
  } else {
    // Try to find product in DB
    const p = (typeof DB !== 'undefined' && DB.products) ? DB.products.byId(productOrName) : null;
    if (p) {
      item = {
        id: p.id,
        name: p.name,
        price: p.salePrice || p.basePrice || 1450,
        image: (p.images && p.images[0]?.url) || p.image || 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&q=80',
        category: p.categoryName || "Men's Football"
      };
    } else {
      item = {
        id: 'wish_' + String(productOrName).replace(/\s+/g, '_').toLowerCase(),
        name: String(productOrName),
        price: parseFloat(price) || 1450,
        image: image || 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&q=80',
        category: category || "Performance Jersey"
      };
    }
  }

  const list = getWishlist();
  const index = list.findIndex(x => (x.id && String(x.id) === String(item.id)) || (x.name && x.name.toLowerCase() === item.name.toLowerCase()));

  if (index > -1) {
    list.splice(index, 1);
    saveWishlist(list);
    showToast(`Removed "${item.name}" from Wishlist`);
  } else {
    list.push(item);
    saveWishlist(list);
    showToast(`Saved "${item.name}" to your Wishlist ❤️`);
  }
}

function updateWishlistBadges() {
  const list = getWishlist();
  const count = list.length;
  appState.wishlistCount = count;
  document.querySelectorAll('#wishlist-badge, .wishlist-badge-count').forEach(b => {
    b.textContent = count;
    b.style.display = count > 0 ? 'flex' : 'none';
  });
  const drawerCount = document.getElementById('wishlist-drawer-count');
  if (drawerCount) drawerCount.textContent = count;
}

function syncWishlistHeartButtons() {
  const list = getWishlist();
  const names = list.map(x => (x.name || '').toLowerCase());
  const ids = list.map(x => String(x.id || ''));

  document.querySelectorAll('.favourite-btn, [data-wishlist-name], [data-wishlist-id]').forEach(btn => {
    const bName = (btn.getAttribute('data-wishlist-name') || '').toLowerCase();
    const bId = String(btn.getAttribute('data-wishlist-id') || '');
    const isFav = (bId && ids.includes(bId)) || (bName && names.includes(bName));
    const icon = btn.querySelector('.material-symbols-outlined') || btn;
    if (isFav) {
      icon.classList.add('text-red-500', 'fill-1');
      icon.classList.remove('text-gray-400', 'text-gray-500');
    } else {
      icon.classList.remove('text-red-500', 'fill-1');
      icon.classList.add('text-gray-400');
    }
  });
}

function toggleWishlistModal(forceOpen = null) {
  const container = document.getElementById('wishlist-drawer-container');
  const drawer = container ? container.querySelector('aside') : null;
  if (!container || !drawer) return;

  const isHidden = container.style.display === 'none' || container.classList.contains('pointer-events-none');
  const shouldOpen = forceOpen !== null ? forceOpen : isHidden;

  if (shouldOpen) {
    renderWishlistDrawer();
    container.style.display = 'block';
    void container.offsetWidth;
    container.classList.remove('pointer-events-none', 'opacity-0');
    container.classList.add('pointer-events-auto', 'opacity-100');
    drawer.style.transform = 'translateX(0)';
  } else {
    container.classList.add('pointer-events-none', 'opacity-0');
    container.classList.remove('pointer-events-auto', 'opacity-100');
    drawer.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (container.classList.contains('pointer-events-none')) {
        container.style.display = 'none';
      }
    }, 300);
  }
}

function renderWishlistDrawer() {
  const container = document.getElementById('wishlist-drawer-items');
  if (!container) return;
  const list = getWishlist();

  if (list.length === 0) {
    container.innerHTML = `
      <div class="text-center py-12 text-gray-400">
        <span class="material-symbols-outlined text-5xl mb-2 text-gray-300">favorite</span>
        <p class="text-sm font-bold text-gray-700">Your Wishlist is empty</p>
        <p class="text-xs text-gray-400 mt-1">Click the heart icon on any jersey in the shop to save it here.</p>
        <button onclick="toggleWishlistModal(false); switchView('shop')" class="mt-4 px-4 py-2 bg-black text-white rounded-full text-xs font-bold hover:bg-neutral-800 transition-all cursor-pointer">
          Explore Jerseys
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = list.map((item, idx) => `
    <div class="flex gap-3 p-3 bg-white border border-gray-100 rounded-2xl shadow-xs hover:border-gray-300 transition-all">
      <img src="${item.image || 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=200&q=80'}" class="w-14 h-14 object-contain rounded-xl bg-gray-50 p-1 flex-shrink-0" alt="${item.name}"/>
      <div class="flex-1 min-w-0">
        <div class="flex justify-between items-start">
          <h4 class="font-bold text-xs text-black truncate cursor-pointer hover:underline" onclick="window.location.href='product.html?id=${item.id}'">${item.name}</h4>
          <button onclick="removeWishlistItem(${idx})" class="text-gray-400 hover:text-red-500 p-0.5 cursor-pointer" title="Remove">
            <span class="material-symbols-outlined text-base">close</span>
          </button>
        </div>
        <p class="text-[10px] text-gray-500 mt-0.5">${item.category || "Men's Football"}</p>
        <div class="flex justify-between items-center mt-2">
          <span class="font-mono-ui font-black text-xs text-black">৳${Math.round(item.price || 1450).toLocaleString()}</span>
          <div class="flex items-center gap-1.5">
            <a href="product.html?id=${item.id}" class="text-[11px] font-bold text-blue-700 hover:underline">View Kit</a>
            <button onclick="addWishlistItemToCart(${idx})" class="bg-black hover:bg-neutral-800 text-white text-[10px] font-bold px-2.5 py-1 rounded-full cursor-pointer flex items-center gap-1">
              <span class="material-symbols-outlined text-[13px]">add_shopping_cart</span>
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function removeWishlistItem(idx) {
  const list = getWishlist();
  if (list[idx]) {
    const name = list[idx].name;
    list.splice(idx, 1);
    saveWishlist(list);
    showToast(`Removed "${name}" from Wishlist`);
  }
}

function clearWishlist() {
  saveWishlist([]);
  showToast('Wishlist cleared');
}

function addWishlistItemToCart(idx) {
  const list = getWishlist();
  if (!list[idx]) return;
  const item = list[idx];
  addToCart({
    id: item.id || ('prod_' + Date.now()),
    productId: item.id,
    name: item.name,
    price: item.price || 1450,
    image: item.image,
    details: 'Size: M • Half Sleeve',
    qty: 1
  });
  showToast(`Added ${item.name} to Bag!`);
}

function addAllWishlistToCart() {
  const list = getWishlist();
  if (list.length === 0) {
    showToast('Wishlist is empty!');
    return;
  }
  list.forEach(item => {
    addToCart({
      id: item.id || ('prod_' + Date.now()),
      productId: item.id,
      name: item.name,
      price: item.price || 1450,
      image: item.image,
      details: 'Size: M • Half Sleeve',
      qty: 1
    });
  });
  showToast(`Added all ${list.length} item(s) to Bag!`);
  toggleWishlistModal(false);
  toggleCartDrawer(true);
}

// Global window bindings
if (typeof window !== 'undefined') {
  window.getWishlist = getWishlist;
  window.saveWishlist = saveWishlist;
  window.toggleWishlist = toggleWishlist;
  window.toggleWishlistModal = toggleWishlistModal;
  window.removeWishlistItem = removeWishlistItem;
  window.clearWishlist = clearWishlist;
  window.addWishlistItemToCart = addWishlistItemToCart;
  window.addAllWishlistToCart = addAllWishlistToCart;
}

function showToast(message, duration = 3000) {
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
  }, duration);
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

// ──────────────────────────────────────────────────────────────
// ═══ CIRCULAR 3D TESTIMONIALS & MODEL SHOWCASE ═══
// ──────────────────────────────────────────────────────────────
let showcaseActiveIndex = 0;
let showcaseInterval = null;

function getShowcaseModels() {
  if (typeof DB !== 'undefined' && DB.modelShowcase) {
    const list = DB.modelShowcase.active();
    if (list && list.length > 0) return list;
  }
  return [
    {
      id: 'model_1',
      name: 'Rahim Chowdhury',
      designation: 'Dhaka Premier League Midfielder',
      quote: 'The AeroKnit weave feels weightless during 90 minutes on the pitch. The customization precision on the player name and UCL starball badge is unmatched in Bangladesh.',
      src: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=900&q=80',
      jerseyName: 'AEROKNIT PRO MATCH KIT'
    },
    {
      id: 'model_2',
      name: 'Tariqul Islam',
      designation: 'National League Striker',
      quote: 'Wearing the ZENVY Pro Elite kit for all our tournament matches. The sweat-wicking airflow keeps me cool, and the custom squad numbering never peels or cracks.',
      src: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=900&q=80',
      jerseyName: 'CRIMSON VELOCITY EDITION'
    },
    {
      id: 'model_3',
      name: 'Shahriar Ahmed',
      designation: 'Semi-Pro Athlete & Brand Ambassador',
      quote: 'ZENVY represents the new benchmark for authentic sportswear. The fabric elasticity, tailored athletic slim-fit cut, and delivery speed across Dhaka are sensational.',
      src: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=900&q=80',
      jerseyName: 'ELITE WHITE STRIKER KIT'
    },
    {
      id: 'model_4',
      name: 'Arifur Rahman',
      designation: 'CrossFit Coach & Footballer',
      quote: 'From gym training sessions to weekend league games, the jersey holds its shape and color after dozens of washes. Truly an elite kit.',
      src: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?w=900&q=80',
      jerseyName: 'ALL-WEATHER TRAINING TEE'
    }
  ];
}

function syncModelShowcase() {
  const container = document.getElementById('showcase-3d-images-box');
  if (!container) return;

  const models = getShowcaseModels();
  if (models.length === 0) return;

  if (showcaseActiveIndex >= models.length) showcaseActiveIndex = 0;
  if (showcaseActiveIndex < 0) showcaseActiveIndex = models.length - 1;

  const width = container.offsetWidth || 400;
  const gap = Math.min(80, Math.max(48, Math.round(width * 0.18)));
  const stickUp = Math.round(gap * 0.75);
  const total = models.length;

  const modelsHash = JSON.stringify(models.map(m => m.name + (m.src || '')));
  if (container.dataset.showcaseHash !== modelsHash) {
    if (container.children.length >= 2 && !container.dataset.showcaseHash) {
      container.dataset.showcaseHash = modelsHash;
    } else {
      container.dataset.showcaseHash = modelsHash;
      const fallbackAthlete = 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=900&q=80';
      container.innerHTML = models.map((m, index) => {
        const imgSrc = (m.src && !m.src.includes('photo-1574629810360-7efbbe195018')) ? m.src : fallbackAthlete;
        const isAct = index === showcaseActiveIndex;
        return `
          <img src="${imgSrc}" alt="${m.name}"
               onerror="this.onerror=null; this.src='${fallbackAthlete}'"
               class="showcase-img absolute inset-0 w-full h-full object-cover rounded-3xl shadow-2xl border border-gray-100 ring-1 ring-black/5 transition-all duration-700 ease-out cursor-pointer"
               onclick="gotoShowcaseModel(${index})"
               style="opacity:${isAct ? '1' : '0'}; pointer-events:${isAct ? 'auto' : 'none'}; z-index:${isAct ? '3' : '1'}; will-change:transform,opacity;"/>
        `;
      }).join('');
    }
  }

  // Non-destructive update: adjust CSS transforms and opacities on existing images
  const imgEls = container.querySelectorAll('.showcase-img');
  imgEls.forEach((imgEl, index) => {
    const isActive = index === showcaseActiveIndex;
    const isLeft = (showcaseActiveIndex - 1 + total) % total === index;
    const isRight = (showcaseActiveIndex + 1) % total === index;

    if (isActive) {
      imgEl.style.opacity = '1';
      imgEl.style.pointerEvents = 'auto';
      imgEl.style.zIndex = '3';
      imgEl.style.transform = 'translateX(0px) translateY(0px) scale(1) rotateY(0deg)';
    } else if (isLeft) {
      imgEl.style.opacity = '1';
      imgEl.style.pointerEvents = 'auto';
      imgEl.style.zIndex = '2';
      imgEl.style.transform = `translateX(-${gap}px) translateY(-${stickUp}px) scale(0.85) rotateY(15deg)`;
    } else if (isRight) {
      imgEl.style.opacity = '1';
      imgEl.style.pointerEvents = 'auto';
      imgEl.style.zIndex = '2';
      imgEl.style.transform = `translateX(${gap}px) translateY(-${stickUp}px) scale(0.85) rotateY(-15deg)`;
    } else {
      imgEl.style.opacity = '0';
      imgEl.style.pointerEvents = 'none';
      imgEl.style.zIndex = '1';
      imgEl.style.transform = 'translateX(0px) translateY(0px) scale(0.7)';
    }
  });

  const active = models[showcaseActiveIndex];
  const tagEl = document.getElementById('showcase-jersey-tag');
  const nameEl = document.getElementById('showcase-name');
  const desigEl = document.getElementById('showcase-designation');
  const quoteEl = document.getElementById('showcase-quote');

  if (tagEl) tagEl.textContent = (active.jerseyName || 'ZENVY ELITE KIT').toUpperCase();
  if (nameEl) nameEl.textContent = active.name || '';
  if (desigEl) desigEl.textContent = active.designation || 'ZENVY Athlete';
  if (quoteEl) quoteEl.textContent = `"${active.quote || ''}"`;

  const dotsEl = document.getElementById('showcase-dots');
  if (dotsEl) {
    const dotBtns = dotsEl.querySelectorAll('button');
    if (dotBtns.length === models.length) {
      dotBtns.forEach((btn, i) => {
        btn.className = (i === showcaseActiveIndex ? 'w-6 h-2 bg-black rounded-full' : 'w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-400') + ' transition-all duration-300';
      });
    } else {
      dotsEl.innerHTML = models.map((_, i) => `
        <button onclick="gotoShowcaseModel(${i})" class="${i === showcaseActiveIndex ? 'w-6 h-2 bg-black rounded-full' : 'w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-400'} transition-all duration-300"></button>
      `).join('');
    }
  }

  if (!showcaseInterval) {
    showcaseInterval = setInterval(() => {
      const homeView = document.getElementById('view-home');
      if (!homeView || !homeView.classList.contains('active')) return;
      nextShowcaseModel(false);
    }, 5500);
  }
}

window.nextShowcaseModel = function(manual = true) {
  const models = getShowcaseModels();
  if (models.length <= 1) return;
  showcaseActiveIndex = (showcaseActiveIndex + 1) % models.length;
  syncModelShowcase();
  if (manual && showcaseInterval) {
    clearInterval(showcaseInterval);
    showcaseInterval = setInterval(() => nextShowcaseModel(false), 6000);
  }
};

window.prevShowcaseModel = function() {
  const models = getShowcaseModels();
  if (models.length <= 1) return;
  showcaseActiveIndex = (showcaseActiveIndex - 1 + models.length) % models.length;
  syncModelShowcase();
  if (showcaseInterval) {
    clearInterval(showcaseInterval);
    showcaseInterval = setInterval(() => nextShowcaseModel(false), 6000);
  }
};

window.gotoShowcaseModel = function(index) {
  showcaseActiveIndex = index;
  syncModelShowcase();
};

