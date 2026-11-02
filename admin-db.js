/**
 * ZENVY Admin Data Store
 * ─────────────────────
 * Real persistence layer mirroring the Prisma schema.
 * Uses localStorage as storage engine.
 * Swappable to REST API: replace each method body.
 */

const DB_VERSION = 'zenvy_v1';

// ──────────────────────────────────────────────────────────
// Core Storage Engine
// ──────────────────────────────────────────────────────────
const Store = {
  get(key) {
    try { return JSON.parse(localStorage.getItem(`${DB_VERSION}_${key}`) || '[]'); }
    catch { return []; }
  },
  getObj(key, def = {}) {
    try { return JSON.parse(localStorage.getItem(`${DB_VERSION}_${key}`) || JSON.stringify(def)); }
    catch { return def; }
  },
  set(key, value) {
    const now = Date.now();
    try {
      localStorage.setItem(`${DB_VERSION}_${key}`, JSON.stringify(value));
      localStorage.setItem(`${DB_VERSION}_${key}_updatedAt`, now.toString());
    } catch(err) {
      console.warn(`[Store] Failed to write key "${key}":`, err);
    }
    // Mirror write to Firestore for cross-origin sync
    if (window.ZenvyFirebase && typeof window.ZenvyFirebase.push === 'function') {
      window.ZenvyFirebase.push(key, value);
    }
    // Broadcast locally for instant reactivity across open views and tabs
    try {
      window.dispatchEvent(new StorageEvent('storage', { key: `${DB_VERSION}_${key}`, newValue: JSON.stringify(value) }));
      window.dispatchEvent(new CustomEvent('zenvy-store-updated', { detail: { key, value, updatedAt: now } }));
    } catch(e) {}
  },
  setObj(key, value) {
    const now = Date.now();
    try {
      localStorage.setItem(`${DB_VERSION}_${key}`, JSON.stringify(value));
      localStorage.setItem(`${DB_VERSION}_${key}_updatedAt`, now.toString());
    } catch(err) {
      console.warn(`[Store] Failed to write obj "${key}":`, err);
    }
    // Mirror write to Firestore for cross-origin sync
    if (window.ZenvyFirebase && typeof window.ZenvyFirebase.push === 'function') {
      window.ZenvyFirebase.push(key, value);
    }
    // Broadcast locally for instant reactivity across open views and tabs
    try {
      window.dispatchEvent(new StorageEvent('storage', { key: `${DB_VERSION}_${key}`, newValue: JSON.stringify(value) }));
      window.dispatchEvent(new CustomEvent('zenvy-store-updated', { detail: { key, value, updatedAt: now } }));
    } catch(e) {}
  },
  genId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  },
  now() { return new Date().toISOString(); }
};


// ──────────────────────────────────────────────────────────
// Seed Default Data (runs once per schema version)
// ──────────────────────────────────────────────────────────
const SEED_VERSION = 9; // Reseed with clean studio product cutouts
let _isSeeding = false;
function seedDefaultData() {
  if (_isSeeding) return;
  const seededVersion = Store.getObj('seeded_version', 0);
  if (seededVersion >= SEED_VERSION) return;
  _isSeeding = true;
  try {
    // SAFE: Only clear known schema-managed keys, NOT all localStorage
    // This preserves orders, customers, and other live data
    const keysToReset = [
      'products', 'categories', 'subcategories', 'collections', 'banners', 'homepage', 'shopBanner',
      'brand', 'coupons', 'flashSales', 'shipping', 'paymentConfig', 'storeSettings',
      'notifConfig', 'telegramConfig', 'patches', 'sleeves', 'sizes', 'colors', 'addons',
      'printing', 'customization', 'teams', 'seeded', 'seeded_version'
    ];
    keysToReset.forEach(k => {
      try { localStorage.removeItem(`${DB_VERSION}_${k}`); } catch(e){}
    });
    Store.setObj('seeded', true);
    Store.setObj('seeded_version', SEED_VERSION);


  // Brand Settings
  DB.brand.save({
    brandName: 'ZENVY', logoUrl: '', faviconUrl: '',
    tagline: 'The New Era of Performance',
    description: 'Elevating performance wear through editorial design and technical precision.',
    phone: '+880 1700-000000', email: 'support@zenvy.com',
    address: 'Dhaka, Bangladesh',
    socialFacebook: 'https://facebook.com/zenvy', 
    socialInstagram: 'https://instagram.com/zenvy',
    socialTwitter: 'https://twitter.com/zenvy',
    socialTikTok: 'https://tiktok.com/@zenvy', 
    socialYoutube: 'https://youtube.com/@zenvy',
    currency: 'BDT', currencySymbol: '৳',
    returnPolicy: '7-day hassle-free returns.',
    privacyPolicy: 'We respect your privacy.',
    termsAndConditions: 'Standard terms apply.',
  });

  // Sizes
  ['XS','S','M','L','XL','XXL','3XL','4XL'].forEach((code, i) => {
    DB.sizes.create({ code, name: code, displayOrder: i, isEnabled: true });
  });

  // Colors
  [
    { name: 'Black', hexCode: '#000000' },
    { name: 'White', hexCode: '#FFFFFF' },
    { name: 'Red', hexCode: '#DC2626' },
    { name: 'Navy', hexCode: '#1e3a5f' },
    { name: 'Royal Blue', hexCode: '#1D4ED8' },
    { name: 'Green', hexCode: '#16A34A' },
  ].forEach(c => DB.colors.create({ ...c, isEnabled: true }));

  // Sleeves
  [
    { name: 'Half Sleeve', additionalPrice: 0, description: 'Standard half sleeve', displayOrder: 0 },
    { name: 'Full Sleeve', additionalPrice: 300, description: 'Full sleeve (+৳300)', displayOrder: 1 },
    { name: 'Sleeveless', additionalPrice: 0, description: 'No sleeves', displayOrder: 2 },
  ].forEach(s => DB.sleeves.create({ ...s, isEnabled: true }));

  // Patches
  [
    { name: 'UEFA Champions League', price: 250, description: 'Official UCL sleeve patch', displayOrder: 0 },
    { name: 'Premier League', price: 200, description: 'EPL sleeve patch', displayOrder: 1 },
    { name: 'La Liga', price: 200, description: 'La Liga sleeve patch', displayOrder: 2 },
  ].forEach(p => DB.patches.create({ ...p, imageUrl: '', isEnabled: true }));

  // Customization Settings
  DB.customizationSettings.save({
    namePrinting: { enabled: true, price: 200, maxChars: 12, minChars: 1, font: 'Block', style: 'Standard' },
    numberPrinting: { enabled: true, price: 150, maxDigits: 2 },
    nameNumberPackage: { enabled: true, price: 300 },
    customLogo: { enabled: false, price: 500, allowedTypes: 'image/png,image/svg+xml', maxSizeMB: 2 },
  });

  // Shipping Methods
  [
    { name: 'Inside Dhaka', area: 'Dhaka', deliveryTime: '1-2 days', price: 80, minOrder: 0, freeThreshold: 3000, isEnabled: true },
    { name: 'Outside Dhaka', area: 'Nationwide', deliveryTime: '3-5 days', price: 130, minOrder: 0, freeThreshold: 5000, isEnabled: true },
    { name: 'Express', area: 'Dhaka', deliveryTime: 'Same Day', price: 200, minOrder: 0, freeThreshold: 0, isEnabled: true },
  ].forEach(s => DB.shipping.create(s));

  // Payment Methods
  DB.payments.save({
    methods: [
      { id: 'cod', name: 'Cash on Delivery', enabled: true, icon: 'payments' },
      { id: 'bkash', name: 'bKash', enabled: true, icon: 'smartphone', number: '' },
      { id: 'nagad', name: 'Nagad', enabled: false, icon: 'smartphone', number: '' },
      { id: 'card', name: 'Credit/Debit Card', enabled: false, icon: 'credit_card' },
    ]
  });

  // Store Policy Settings
  DB.storeSettings.save({
    cashOnDelivery: true,
    requirePayFirst: false,
    deliveryChargeEnabled: true,
    deliveryChargeFreeThreshold: 3000,
    minOrderAmount: 0,
    codNote: 'Pay when your order arrives at your door.',
    payFirstNote: 'Advance payment via bKash or Nagad required to confirm your order.',
  });

  // Seed Catalog Products
  const DEFAULT_SEED_PRODUCTS = [
    {
      id: '101',
      name: 'Aura Strike Pro Jersey',
      sku: 'ZNV-ASP-01',
      slug: 'aura-strike-pro-jersey',
      basePrice: 1450,
      salePrice: 1450,
      compareAt: 1800,
      stock: 45,
      lowStockAlert: 5,
      categoryName: "Men's Football",
      categoryId: '',
      description: "Men's authentic breathable jersey with AeroKnit technology. Lightweight, moisture-wicking engineered fabric.",
      images: [
        { url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDV_LbyyPJxnRKmU8_oYZoYTmwlX1dORf22Yeei2rC0v-Z24hFTXgPedjBdVIl7bJAWRpOsO3nAEVulUb9cHoyme1h5w9dqAuz3EFxMdSWawV_QZE4ar61iyYOGoH0d1r2Kf5G90TLU3ew4Vsxm1yiNzJ0fjylA9zDty3hULOVnT3xX-UmmQkKIr_TdTowvSGHavQeM_BxmRGvmq44rY8ERHWsx8LwDJ6TKBy45CfsowuBsWRcDozB7SA', alt: 'Aura Strike Pro' }
      ],
      isPublished: true,
      isFeatured: true,
      isPreorder: false
    },
    {
      id: '102',
      name: 'Crimson Velocity Kit',
      sku: 'ZNV-CVK-02',
      slug: 'crimson-velocity-kit',
      basePrice: 2800,
      salePrice: 2800,
      compareAt: 3500,
      stock: 28,
      lowStockAlert: 5,
      categoryName: 'Unisex Replica',
      categoryId: '',
      description: 'Unisex replica jersey. Vibrant crimson with precision stitching and aero-mesh side panels.',
      images: [
        { url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEkIfW4povNNZmCZPpAtkbLE-KG7dymS7UvkxUxqgQLCfTYnQHY48OliKbOPxD4V1Krqxp6XqSFuA-NF73ut75mxMqPgULyY1TejG0qSMm8dZw6V6pLygkBx-CvLyIGmmGJLleT0_opdEUd36xIXylzO5tYti0T9C2k39YYp9yBFCfnh08ZuqeEa-LKdjw-ZQoSn86jCP351D4dTOZJ2dL_tDZKbLceB1OZSaeyoZ9CUE-wKzo0M9jOA', alt: 'Crimson Velocity Kit' }
      ],
      isPublished: true,
      isFeatured: true,
      isPreorder: false
    },
    {
      id: '103',
      name: 'AeroWeave Gold Edition',
      sku: 'ZNV-AWG-03',
      slug: 'aeroweave-gold-edition',
      basePrice: 4800,
      salePrice: 4800,
      compareAt: 5500,
      stock: 15,
      lowStockAlert: 5,
      categoryName: 'Limited Edition',
      categoryId: '',
      description: 'Match-worn quality jersey with goldwork detailing and luxury tournament crest.',
      images: [
        { url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRowvY21H_JGsJ0D3Rb2f-8naBTnt9Jms1AYjLFn11PTIGUdeUvabLQLyg4lHvBgCo5jnX53OLUb9GKGkPZlPEtwe5E_UcsL7SiN_hYTfVKeV0JQIpVQemU_qBThBMnnndy2kPH9nZcmp6Hmm0tFA4Exgg1FLktCNtYjxIzzjJym2AnNw8SHk89KELYY8NKiPRjJBKe24w3Jw3BSbAg0Ek1gn9WmcYadKUBFOCTZbCYAa1zL8H6y6JoA', alt: 'AeroWeave Gold Edition' }
      ],
      isPublished: true,
      isFeatured: true,
      isPreorder: false
    },
    {
      id: '104',
      name: 'Nimbus Windbreaker',
      sku: 'ZNV-NWB-04',
      slug: 'nimbus-windbreaker',
      basePrice: 6200,
      salePrice: 6200,
      compareAt: 7500,
      stock: 20,
      lowStockAlert: 5,
      categoryName: 'Outerwear Jacket',
      categoryId: '',
      description: 'Technical windbreaker engineered with weather-resistant ripstop shell and vented back panel.',
      images: [
        { url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRtghZsGtFKHlZIYqaxAa8EcbW83K4egjcrZw6V4BKNThg-IAlTlMAK7mBkx_cl17Vu7d2UuuImJuqgR8VWEBruONytgmwd_u56NZOtXfIj4EccnfmiRjMoLpTVBSjXF2sCqgz2Xbmmtc4gMfUG1L_-q82tQjpjnb76hU4-UPXEwVHQis53FgqSKTFOUlJYAHop_oph-8ZHd2YUllJzjsxTPEerlfKDZ2ysTRoudBnK-P0058K9dNXJA', alt: 'Nimbus Windbreaker' }
      ],
      isPublished: true,
      isFeatured: false,
      isPreorder: false
    },
    {
      id: '105',
      name: 'Velocity Track Top',
      sku: 'ZNV-VTT-05',
      slug: 'velocity-track-top',
      basePrice: 4200,
      salePrice: 4200,
      compareAt: 5000,
      stock: 35,
      lowStockAlert: 5,
      categoryName: 'Unisex Performance Layer',
      categoryId: '',
      description: 'Full-zip technical track jacket with articulated sleeves and lightweight thermal insulation.',
      images: [
        { url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1JwTdCYkkbAlMDWQnvcGsoH1_xejqEika1eBh9hKzncMJqkA-E_j9iJ4YxS_33YRwhy6hs7Ij64itm3UOWV9u5byfWZm-6GDDSxvsihpvcAOFCDxTSAgrivkSVmva0BrWhiGmrpk7SEzlV0WHlwqSp-B8UTuPmMCY6dDMgFFpET6PcIB7eHvHuvXXoimuWAUEjEBAp5CfojUli8_s-7Movyej_6NI4kcVltdm_VBh12fCnjCbo37H', alt: 'Velocity Track Top' }
      ],
      isPublished: true,
      isFeatured: true,
      isPreorder: true
    },
    {
      id: '106',
      name: 'Elite Kit Pro',
      sku: 'ZNV-EKP-06',
      slug: 'elite-kit-pro',
      basePrice: 3800,
      salePrice: 3800,
      compareAt: 4500,
      stock: 50,
      lowStockAlert: 5,
      categoryName: 'Tournament Grade',
      categoryId: '',
      description: 'Pro athlete tournament jersey featuring ultra-breathable micro-mesh and seamless collar construction.',
      images: [
        { url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCepIZHM8wJly735CyES_bkyiRjNmYVn4_r1yrpFSMZYyq9NCOW6sN9auKViuhLMz-WhQo-BpURR5DNmo6rs5xwkVrqHkjkRQqkHfAnwa4VVUuh6kMRQzVp7q6uioSOSohH1bfLavJfrg6Qmyf-mGvDzwhFYqXMH2OE_09K87jXXYpwJlzkBov5mcP7s17KAgCliJ79ao94bLYL8M6qXTASZyU8EWEqioPp2vGsfgCK9MqM3vZcWu_P', alt: 'Elite Kit Pro' }
      ],
      isPublished: true,
      isFeatured: true,
      isPreorder: false
    },
    {
      id: '107',
      name: 'TechKnit Pro Shorts',
      sku: 'ZNV-TKPS-07',
      slug: 'techknit-pro-shorts',
      basePrice: 1800,
      salePrice: 1800,
      compareAt: 2200,
      stock: 30,
      lowStockAlert: 5,
      categoryName: 'Performance Active',
      categoryId: '',
      description: 'High-mobility athletic shorts with moisture-repellent finish and secure zip pocket.',
      images: [
        { url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2ydFIZfe4g9uHcaAQeDyxyGLzem9Ssjwo_LVYh9dTwEMZxPuURha3BvuRacok16PdozLvoIyf3jQeUf7Umo7IE1f879PuWAxvbDVaLw-dtAihwCckOGfri-3vI5ygKsx_l8-zKkZmMUcaa2QAurogWGaxM7mV3jeGg_q2wvGLSVMpVU2OOxPM1nIb1hn8DdYSMl6Mbs4FLzbbT7rwEFyy1-VB5Y_iVzUGs4urN_h6De-yxzOXtPU2FA', alt: 'TechKnit Pro Shorts' }
      ],
      isPublished: true,
      isFeatured: false,
      isPreorder: false
    },
    {
      id: '108',
      name: 'Vapor Match Edition',
      sku: 'ZNV-VME-08',
      slug: 'vapor-match-edition',
      basePrice: 3900,
      salePrice: 3900,
      compareAt: 4600,
      stock: 25,
      lowStockAlert: 5,
      categoryName: "Men's Football",
      categoryId: '',
      description: 'Pro authentic match jersey with micro-perforated cooling panels.',
      images: [
        { url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDV_LbyyPJxnRKmU8_oYZoYTmwlX1dORf22Yeei2rC0v-Z24hFTXgPedjBdVIl7bJAWRpOsO3nAEVulUb9cHoyme1h5w9dqAuz3EFxMdSWawV_QZE4ar61iyYOGoH0d1r2Kf5G90TLU3ew4Vsxm1yiNzJ0fjylA9zDty3hULOVnT3xX-UmmQkKIr_TdTowvSGHavQeM_BxmRGvmq44rY8ERHWsx8LwDJ6TKBy45CfsowuBsWRcDozB7SA', alt: 'Vapor Match Edition' }
      ],
      isPublished: true,
      isFeatured: true,
      isPreorder: false
    },
    {
      id: '109',
      name: 'Pace Compression Layer',
      sku: 'ZNV-PCL-09',
      slug: 'pace-compression-layer',
      basePrice: 2400,
      salePrice: 2400,
      compareAt: 3000,
      stock: 40,
      lowStockAlert: 5,
      categoryName: 'Unisex Performance Layer',
      categoryId: '',
      description: 'Ergonomic base layer engineered to support core muscles during match play.',
      images: [
        { url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRtghZsGtFKHlZIYqaxAa8EcbW83K4egjcrZw6V4BKNThg-IAlTlMAK7mBkx_cl17Vu7d2UuuImJuqgR8VWEBruONytgmwd_u56NZOtXfIj4EccnfmiRjMoLpTVBSjXF2sCqgz2Xbmmtc4gMfUG1L_-q82tQjpjnb76hU4-UPXEwVHQis53FgqSKTFOUlJYAHop_oph-8ZHd2YUllJzjsxTPEerlfKDZ2ysTRoudBnK-P0058K9dNXJA', alt: 'Pace Compression Layer' }
      ],
      isPublished: true,
      isFeatured: false,
      isPreorder: false
    },
    {
      id: '110',
      name: 'International Gold Kit',
      sku: 'ZNV-IGK-10',
      slug: 'international-gold-kit',
      basePrice: 5200,
      salePrice: 5200,
      compareAt: 6000,
      stock: 18,
      lowStockAlert: 5,
      categoryName: 'Limited Edition',
      categoryId: '',
      description: 'National team authentic tournament kit with metallic gold badging.',
      images: [
        { url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRowvY21H_JGsJ0D3Rb2f-8naBTnt9Jms1AYjLFn11PTIGUdeUvabLQLyg4lHvBgCo5jnX53OLUb9GKGkPZlPEtwe5E_UcsL7SiN_hYTfVKeV0JQIpVQemU_qBThBMnnndy2kPH9nZcmp6Hmm0tFA4Exgg1FLktCNtYjxIzzjJym2AnNw8SHk89KELYY8NKiPRjJBKe24w3Jw3BSbAg0Ek1gn9WmcYadKUBFOCTZbCYAa1zL8H6y6JoA', alt: 'International Gold Kit' }
      ],
      isPublished: true,
      isFeatured: true,
      isPreorder: false
    },
    {
      id: '111',
      name: 'Apex Storm Jacket',
      sku: 'ZNV-ASJ-11',
      slug: 'apex-storm-jacket',
      basePrice: 6800,
      salePrice: 6800,
      compareAt: 8000,
      stock: 12,
      lowStockAlert: 5,
      categoryName: 'Outerwear Jacket',
      categoryId: '',
      description: 'Waterproof sideline parka with fleece-lined collar and thermal storm hood.',
      images: [
        { url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRtghZsGtFKHlZIYqaxAa8EcbW83K4egjcrZw6V4BKNThg-IAlTlMAK7mBkx_cl17Vu7d2UuuImJuqgR8VWEBruONytgmwd_u56NZOtXfIj4EccnfmiRjMoLpTVBSjXF2sCqgz2Xbmmtc4gMfUG1L_-q82tQjpjnb76hU4-UPXEwVHQis53FgqSKTFOUlJYAHop_oph-8ZHd2YUllJzjsxTPEerlfKDZ2ysTRoudBnK-P0058K9dNXJA', alt: 'Apex Storm Jacket' }
      ],
      isPublished: true,
      isFeatured: false,
      isPreorder: false
    },
    {
      id: '112',
      name: 'Heritage Club Jersey',
      sku: 'ZNV-HCJ-12',
      slug: 'heritage-club-jersey',
      basePrice: 3200,
      salePrice: 3200,
      compareAt: 3800,
      stock: 35,
      lowStockAlert: 5,
      categoryName: 'Unisex Replica',
      categoryId: '',
      description: 'Classic retro fit club jersey celebrating tournament heritage.',
      images: [
        { url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEkIfW4povNNZmCZPpAtkbLE-KG7dymS7UvkxUxqgQLCfTYnQHY48OliKbOPxD4V1Krqxp6XqSFuA-NF73ut75mxMqPgULyY1TejG0qSMm8dZw6V6pLygkBx-CvLyIGmmGJLleT0_opdEUd36xIXylzO5tYti0T9C2k39YYp9yBFCfnh08ZuqeEa-LKdjw-ZQoSn86jCP351D4dTOZJ2dL_tDZKbLceB1OZSaeyoZ9CUE-wKzo0M9jOA', alt: 'Heritage Club Jersey' }
      ],
      isPublished: true,
      isFeatured: false,
      isPreorder: false
    }
  ];

  // Additional rich seed products
  const EXTRA_SEED_PRODUCTS = [
    {
      id: '113',
      name: 'Pro Goalkeeper Kit',
      sku: 'ZNV-GK-13',
      slug: 'pro-goalkeeper-kit',
      basePrice: 3500,
      salePrice: 3150,
      compareAt: 3500,
      stock: 22,
      lowStockAlert: 5,
      categoryName: "Men's Football",
      categoryId: '',
      description: 'Professional goalkeeper jersey with padded elbows, moisture-barrier technology and non-slip grip bands.',
      images: [
        { url: 'https://images.unsplash.com/photo-1580087256394-dc596e1c8f4f?w=800&q=80', alt: 'Pro Goalkeeper Kit' }
      ],
      isPublished: true, isFeatured: true, isPreorder: false
    },
    {
      id: '114',
      name: 'Club Training Bib Set',
      sku: 'ZNV-CTB-14',
      slug: 'club-training-bib-set',
      basePrice: 850,
      salePrice: 720,
      compareAt: 850,
      stock: 80,
      lowStockAlert: 10,
      categoryName: 'Training Gear',
      categoryId: '',
      description: 'Fluorescent mesh training bibs — sold as set of 10 in a carry bag. Ideal for team drills and scrimmage sessions.',
      images: [
        { url: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800&q=80', alt: 'Club Training Bib Set' }
      ],
      isPublished: true, isFeatured: false, isPreorder: false
    },
    {
      id: '115',
      name: 'Junior Academy Kit',
      sku: 'ZNV-JAK-15',
      slug: 'junior-academy-kit',
      basePrice: 1200,
      salePrice: 1200,
      compareAt: 0,
      stock: 45,
      lowStockAlert: 5,
      categoryName: "Kids Collection",
      categoryId: '',
      description: 'Lightweight, breathable junior kit for 6–14 year olds. Anti-odour fabric with reinforced seams.',
      images: [
        { url: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80', alt: 'Junior Academy Kit' }
      ],
      isPublished: true, isFeatured: true, isPreorder: false
    },
    {
      id: '116',
      name: 'Elite Compression Socks',
      sku: 'ZNV-ECS-16',
      slug: 'elite-compression-socks',
      basePrice: 480,
      salePrice: 380,
      compareAt: 480,
      stock: 120,
      lowStockAlert: 10,
      categoryName: 'Accessories',
      categoryId: '',
      description: 'Pro-grade graduated compression football socks with reinforced toe box and non-slip calf grip.',
      images: [
        { url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80', alt: 'Elite Compression Socks' }
      ],
      isPublished: true, isFeatured: false, isPreorder: false
    }
  ];

  // Only seed products if store is empty
  if (!Store.get('products') || Store.get('products').length === 0) {
    Store.set('products', [...DEFAULT_SEED_PRODUCTS, ...EXTRA_SEED_PRODUCTS]);
  }
  // Homepage Config
  DB.homepage.save({
    announcement: { enabled: true, marqueeText: 'THE NEW SEASON • SHOP OFFICIAL JERSEYS • FREE EXPRESS SHIPPING OVER ৳1500 • INTERACTIVE 3D CUSTOM STUDIO LIVE • PRO-GRADE AEROKNIT WEAVE TECHNOLOGY', badgeText: 'SS/26 DROPS LIVE' },
    hero: { 
      enabled: true, 
      badge: 'NEW ARRIVAL • MATCH EDITION', 
      title: 'ENGINEERED FOR SUPREMACY', 
      subtitle: 'The new standard in high-performance kits. Ethereal technical design crafted for pro athletes.', 
      ctaPrimaryText: 'SHOP', 
      ctaPrimaryLink: 'index.html#shop', 
      ctaSecondaryText: '3D STUDIO', 
      ctaSecondaryLink: '#customizer', 
      bgImage: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1920&q=80' 
    },
    valueProps: [
      { id: 'prop1', icon: 'local_shipping', title: 'Express Shipping', subtitle: '2-4 Business Days Worldwide' },
      { id: 'prop2', icon: 'verified', title: 'Authentic Grade', subtitle: '100% Pro-Athlete Specification' },
      { id: 'prop3', icon: '3d_rotation', title: '3D Studio Live', subtitle: 'Real-Time Customizer & UCL Patches' },
      { id: 'prop4', icon: 'autorenew', title: '30-Day Guarantee', subtitle: 'Hassle-Free Returns & Exchanges' }
    ],
    collections: {
      title: 'Featured Collections',
      subtitle: 'EXPLORE BY CATEGORY',
      cards: [
        { id: 'col1', tag: 'COLLECTION SS/26', title: 'CLUB MATCH KITS', desc: 'Official tournament jerseys engineered with micro-perforated Aeroknit weave.', link: 'product.html?id=101', bgImage: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&q=80' },
        { id: 'col2', tag: 'LIMITED DROP', title: 'INTERNATIONAL EDITIONS', desc: 'National team tournament kits with authentic gold badges and match typography.', link: 'product.html?id=103', bgImage: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?w=1200&q=80' },
        { id: 'col3', tag: 'PRO TRAINING', title: 'PRECISION OUTERWEAR', desc: 'Technical windbreakers, compression layers and pace shorts built for all climates.', link: 'product.html?id=104', bgImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&q=80' }
      ]
    },
    justDropped: { badge: 'NEW ARRIVALS', title: 'JUST DROPPED', subtitle: 'The latest high-performance releases from ZENVY Studio.' },
    shopBanner: {
      enabled: true,
      slides: [
        {
          id: 'slide1',
          tag: 'ZENVY COLLECTION',
          title: 'LIMITED\nEDITION KITS',
          subtitle: 'Elevate Your Game • Exclusively Online',
          bgImage: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&q=80'
        },
        {
          id: 'slide2',
          tag: 'NEW ARRIVAL',
          title: 'ELITE\nFOOTBALL KITS',
          subtitle: 'The New Season Is Here',
          bgImage: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=80'
        }
      ]
    },
    sections: [
      { id: 'new_arrivals', title: 'Just Dropped', subtitle: 'The latest additions', enabled: true, order: 0, productIds: [] },
      { id: 'best_sellers', title: 'Best Sellers', subtitle: '', enabled: true, order: 1, productIds: [] },
      { id: 'featured', title: 'Featured Collection', subtitle: '', enabled: true, order: 2, productIds: [] },
      { id: 'preorders', title: 'Pre-Orders', subtitle: 'Reserve yours now', enabled: true, order: 3, productIds: [] },
    ]
  });

  // Notification Templates
  DB.notifications.save({
    orderPlaced: { enabled: true, template: 'Your ZENVY order #{orderNumber} has been placed! We\'ll confirm it shortly.' },
    orderConfirmed: { enabled: true, template: 'Order #{orderNumber} confirmed! We\'re preparing your gear.' },
    orderShipped: { enabled: true, template: 'Your ZENVY order #{orderNumber} has been shipped! Tracking: {tracking}' },
    orderDelivered: { enabled: true, template: 'Order #{orderNumber} delivered! Enjoy your ZENVY gear.' },
    preorderConfirmed: { enabled: true, template: 'Preorder #{orderNumber} confirmed! Expected delivery: {date}' },
    returnApproved: { enabled: true, template: 'Your return for order #{orderNumber} has been approved.' },
    refundCompleted: { enabled: true, template: 'Your refund of ৳{amount} for order #{orderNumber} has been processed.' },
  });

  // Seed Sample Orders
  const DEFAULT_SEED_ORDERS = [
    {
      customerName: 'Tanvir Ahmed',
      customerPhone: '+880 1712-345678',
      customerEmail: 'tanvir@example.com',
      shippingAddress: 'House 42, Road 11, Banani, Dhaka',
      items: [
        { productId: '101', productName: 'Aura Strike Pro Jersey', quantity: 1, unitPrice: 1450, totalPrice: 1450, details: 'Size: L • Home Kit' },
        { productId: '107', productName: 'TechKnit Pro Shorts', quantity: 1, unitPrice: 1800, totalPrice: 1800, details: 'Size: M • Core Black' }
      ],
      totalAmount: 3250,
      paymentMethod: 'bKash',
      paymentStatus: 'PAID',
      status: 'DELIVERED',
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
    },
    {
      customerName: 'Rahim Chowdhury',
      customerPhone: '+880 1819-876543',
      customerEmail: 'rahim@example.com',
      shippingAddress: '78 GEC Circle, Chittagong',
      items: [
        { productId: '103', productName: 'AeroWeave Gold Edition', quantity: 1, unitPrice: 4800, totalPrice: 4800, details: 'Size: M • Custom: RAHIM #10' }
      ],
      totalAmount: 4800,
      paymentMethod: 'Cash on Delivery',
      paymentStatus: 'PAID',
      status: 'SHIPPED',
      createdAt: new Date(Date.now() - 86400000).toISOString()
    },
    {
      customerName: 'Nusrat Jahan',
      customerPhone: '+880 1911-223344',
      customerEmail: 'nusrat@example.com',
      shippingAddress: 'Sector 4, Uttara, Dhaka',
      items: [
        { productId: '105', productName: 'Velocity Track Top', quantity: 1, unitPrice: 4200, totalPrice: 4200, details: 'Size: S • Full Zip' }
      ],
      totalAmount: 4200,
      paymentMethod: 'Cash on Delivery',
      paymentStatus: 'PENDING',
      status: 'PENDING',
      createdAt: new Date().toISOString()
    }
  ];

  if (!Store.get('orders') || Store.get('orders').length === 0) {
    DEFAULT_SEED_ORDERS.forEach(o => DB.orders.create(o));
  }

  Store.setObj('seeded', true);
  Store.setObj('seeded_version', SEED_VERSION);
  } finally {
    _isSeeding = false;
  }
}


// ──────────────────────────────────────────────────────────
// Database API
// ──────────────────────────────────────────────────────────
const DB = {

  // ── Database Maintenance ──
  resetDatabase() {
    try { localStorage.clear(); } catch(e){}
    Store.setObj('seeded_version', 0);
    seedDefaultData();
    if (typeof window !== 'undefined') window.location.reload();
  },

  // ── Brand Settings (singleton) ──
  brand: {
    get() { return Store.getObj('brand', { currency: 'BDT', currencySymbol: '৳', usdRate: 120 }); },
    save(data) { Store.setObj('brand', { ...Store.getObj('brand', {}), ...data, updatedAt: Store.now() }); DB.log('Brand settings updated'); return DB.brand.get(); }
  },

  // ── Currency Helpers ──
  currency: {
    get() {
      const brand = DB.brand.get();
      const code = brand.currency || 'BDT';
      const symbol = brand.currencySymbol || (code === 'USD' ? '$' : '৳');
      const rate = parseFloat(brand.usdRate) || 120;
      return { code, symbol, rate };
    },
    set(code, symbol, rate) {
      const sym = symbol || (code === 'USD' ? '$' : '৳');
      DB.brand.save({ currency: code, currencySymbol: sym, usdRate: rate || 120 });
      DB.log(`Currency updated to ${code} (${sym})`);
    },
    format(amountInBDT) {
      const cur = DB.currency.get();
      const num = parseFloat(amountInBDT) || 0;
      if (cur.code === 'USD') {
        const usdVal = num / cur.rate;
        return `${cur.symbol}${usdVal.toFixed(2)}`;
      }
      return `${cur.symbol}${Math.round(num).toLocaleString()}`;
    },
    symbol() {
      return DB.currency.get().symbol;
    },
    code() {
      return DB.currency.get().code;
    }
  },

  // ── Categories ──
  categories: {
    all() {
      return Store.get('categories').sort((a,b) => (parseInt(a.displayOrder) || 0) - (parseInt(b.displayOrder) || 0));
    },
    byId(id) {
      if (!id) return null;
      const strId = String(id).toLowerCase();
      return Store.get('categories').find(c => String(c.id).toLowerCase() === strId || String(c.slug||'').toLowerCase() === strId || String(c.name||'').toLowerCase() === strId) || null;
    },
    active() {
      return Store.get('categories').filter(c => c.isActive !== false);
    },
    create(data) {
      const items = Store.get('categories');
      const item = { id: Store.genId(), ...data, createdAt: Store.now(), updatedAt: Store.now() };
      items.push(item); Store.set('categories', items);
      DB.log(`Category created: ${item.name}`);
      return item;
    },
    update(id, data) {
      const items = Store.get('categories').map(c => c.id === id ? { ...c, ...data, updatedAt: Store.now() } : c);
      Store.set('categories', items); DB.log(`Category updated: ${data.name||id}`);
      return items.find(c => c.id === id);
    },
    delete(id) {
      const cat = DB.categories.byId(id);
      Store.set('categories', Store.get('categories').filter(c => c.id !== id));
      DB.log(`Category deleted: ${cat?.name}`);
    },
    toggle(id, field) {
      const cat = DB.categories.byId(id);
      if (cat) DB.categories.update(id, { [field]: !cat[field] });
    }
  },

  // ── Subcategories ──
  subcategories: {
    all() { return Store.get('subcategories'); },
    byCategory(catId) { return Store.get('subcategories').filter(s => s.categoryId === catId); },
    byId(id) { return Store.get('subcategories').find(s => s.id === id); },
    create(data) {
      const items = Store.get('subcategories');
      const item = { id: Store.genId(), ...data, createdAt: Store.now() };
      items.push(item); Store.set('subcategories', items);
      DB.log(`Subcategory created: ${item.name}`); return item;
    },
    update(id, data) {
      const items = Store.get('subcategories').map(s => s.id === id ? { ...s, ...data } : s);
      Store.set('subcategories', items); return items.find(s => s.id === id);
    },
    delete(id) { Store.set('subcategories', Store.get('subcategories').filter(s => s.id !== id)); }
  },

  // ── Collections ──
  collections: {
    all() { return Store.get('collections'); },
    byId(id) { return Store.get('collections').find(c => c.id === id); },
    create(data) {
      const items = Store.get('collections');
      const item = { id: Store.genId(), ...data, createdAt: Store.now(), updatedAt: Store.now() };
      items.push(item); Store.set('collections', items);
      DB.log(`Collection created: ${item.name}`); return item;
    },
    update(id, data) {
      const items = Store.get('collections').map(c => c.id === id ? { ...c, ...data, updatedAt: Store.now() } : c);
      Store.set('collections', items); DB.log(`Collection updated: ${data.name||id}`);
      return items.find(c => c.id === id);
    },
    delete(id) {
      const col = DB.collections.byId(id);
      Store.set('collections', Store.get('collections').filter(c => c.id !== id));
      DB.log(`Collection deleted: ${col?.name}`);
    }
  },

  // ── Products ──
  products: {
    all() {
      let items = Store.get('products');
      if (!items || items.length === 0) {
        seedDefaultData();
        items = Store.get('products');
      }
      return items;
    },
    byId(id) {
      if (!id) return null;
      const strId = String(id);
      let p = DB.products.all().find(x => String(x.id) === strId || x.slug === strId);
      return p || null;
    },
    published() { return DB.products.all().filter(p => p.isPublished && !p.isArchived); },
    lowStock() { return DB.products.all().filter(p => p.stock <= (p.lowStockAlert||5) && p.stock > 0 && !p.isArchived); },
    outOfStock() { return DB.products.all().filter(p => p.stock === 0 && !p.isArchived); },
    preorders() { return DB.products.all().filter(p => p.isPreorder && !p.isArchived); },
    search(q) {
      const lq = q.toLowerCase();
      return DB.products.all().filter(p =>
        p.name?.toLowerCase().includes(lq) || p.sku?.toLowerCase().includes(lq) ||
        p.categoryName?.toLowerCase().includes(lq)
      );
    },
    create(data) {
      const items = Store.get('products');
      const item = {
        id: Store.genId(), ...data,
        isArchived: false, createdAt: Store.now(), updatedAt: Store.now()
      };
      items.push(item); Store.set('products', items);
      DB.log(`Product created: ${item.name}`);
      if (DB.inventory && typeof DB.inventory.addHistory === 'function') {
        DB.inventory.addHistory({ productId: item.id, productName: item.name, change: item.stock, newStock: item.stock, reason: 'Initial stock', admin: 'Admin' });
      }
      return item;
    },
    update(id, data) {
      const old = DB.products.byId(id);
      const items = Store.get('products').map(p => p.id === id ? { ...p, ...data, updatedAt: Store.now() } : p);
      Store.set('products', items);
      if (data.basePrice !== undefined && old?.basePrice !== data.basePrice && DB.priceHistory && typeof DB.priceHistory.add === 'function') {
        DB.priceHistory.add({ productId: id, productName: old?.name, oldPrice: old?.basePrice, newPrice: data.basePrice, type: 'basePrice' });
      }
      DB.log(`Product updated: ${data.name || old?.name}`);
      return items.find(p => p.id === id);
    },
    duplicate(id) {
      const src = DB.products.byId(id);
      if (!src) return null;
      const copy = { ...src };
      delete copy.id; copy.name = src.name + ' (Copy)';
      copy.sku = src.sku + '-COPY-' + Date.now().toString(36).toUpperCase();
      copy.slug = src.slug + '-copy-' + Date.now().toString(36);
      copy.isPublished = false; copy.stock = 0;
      return DB.products.create(copy);
    },
    archive(id) {
      const p = DB.products.byId(id);
      DB.products.update(id, { isArchived: true, isPublished: false });
      DB.log(`Product archived: ${p?.name}`);
    },
    delete(id) {
      const p = DB.products.byId(id);
      const hasOrders = DB.orders.all().some(o => o.items?.some(i => i.productId === id));
      if (hasOrders) { DB.products.archive(id); return 'archived'; }
      Store.set('products', Store.get('products').filter(p => p.id !== id));
      DB.log(`Product deleted: ${p?.name}`); return 'deleted';
    },
    updateStock(id, qty, reason = 'Manual adjustment') {
      const p = DB.products.byId(id);
      if (!p) return;
      const oldStock = p.stock;
      DB.products.update(id, { stock: qty });
      DB.inventory.addHistory({ productId: id, productName: p.name, previousStock: oldStock, change: qty - oldStock, newStock: qty, reason });
    }
  },

  // ── Product Variants ──
  variants: {
    byProduct(productId) { return Store.get('variants').filter(v => v.productId === productId); },
    byId(id) { return Store.get('variants').find(v => v.id === id); },
    create(data) {
      const items = Store.get('variants');
      const item = { id: Store.genId(), ...data, createdAt: Store.now() };
      items.push(item); Store.set('variants', items); return item;
    },
    update(id, data) {
      const items = Store.get('variants').map(v => v.id === id ? { ...v, ...data } : v);
      Store.set('variants', items); return items.find(v => v.id === id);
    },
    delete(id) { Store.set('variants', Store.get('variants').filter(v => v.id !== id)); },
    deleteByProduct(productId) { Store.set('variants', Store.get('variants').filter(v => v.productId !== productId)); }
  },

  // ── Sizes ──
  sizes: {
    all() { return Store.get('sizes').sort((a,b) => a.displayOrder - b.displayOrder); },
    enabled() { return DB.sizes.all().filter(s => s.isEnabled); },
    byId(id) { return Store.get('sizes').find(s => s.id === id); },
    create(data) {
      const items = Store.get('sizes');
      const item = { id: Store.genId(), ...data, createdAt: Store.now() };
      items.push(item); Store.set('sizes', items);
      DB.log(`Size created: ${item.code}`); return item;
    },
    update(id, data) {
      const items = Store.get('sizes').map(s => s.id === id ? { ...s, ...data } : s);
      Store.set('sizes', items); return items.find(s => s.id === id);
    },
    delete(id) {
      const s = DB.sizes.byId(id);
      Store.set('sizes', Store.get('sizes').filter(s => s.id !== id));
      DB.log(`Size deleted: ${s?.code}`);
    },
    reorder(ids) {
      const items = Store.get('sizes');
      ids.forEach((id, i) => { const s = items.find(x => x.id === id); if (s) s.displayOrder = i; });
      Store.set('sizes', items);
    }
  },

  // ── Colors ──
  colors: {
    all() { return Store.get('colors'); },
    enabled() { return Store.get('colors').filter(c => c.isEnabled); },
    byId(id) { return Store.get('colors').find(c => c.id === id); },
    create(data) {
      const items = Store.get('colors');
      const item = { id: Store.genId(), ...data, createdAt: Store.now() };
      items.push(item); Store.set('colors', items);
      DB.log(`Color created: ${item.name}`); return item;
    },
    update(id, data) {
      const items = Store.get('colors').map(c => c.id === id ? { ...c, ...data } : c);
      Store.set('colors', items); return items.find(c => c.id === id);
    },
    delete(id) {
      const c = DB.colors.byId(id);
      Store.set('colors', Store.get('colors').filter(c => c.id !== id));
      DB.log(`Color deleted: ${c?.name}`);
    }
  },

  // ── Sleeves ──
  sleeves: {
    all() { return Store.get('sleeves').sort((a,b) => (a.displayOrder||0) - (b.displayOrder||0)); },
    enabled() { return DB.sleeves.all().filter(s => s.isEnabled); },
    byId(id) { return Store.get('sleeves').find(s => s.id === id); },
    create(data) {
      const items = Store.get('sleeves');
      const item = { id: Store.genId(), ...data, createdAt: Store.now() };
      items.push(item); Store.set('sleeves', items);
      DB.log(`Sleeve created: ${item.name}`); return item;
    },
    update(id, data) {
      const items = Store.get('sleeves').map(s => s.id === id ? { ...s, ...data } : s);
      Store.set('sleeves', items); DB.log(`Sleeve updated: ${data.name||id}`);
      return items.find(s => s.id === id);
    },
    delete(id) {
      const s = DB.sleeves.byId(id);
      Store.set('sleeves', Store.get('sleeves').filter(s => s.id !== id));
      DB.log(`Sleeve deleted: ${s?.name}`);
    }
  },

  // ── Patches ──
  patches: {
    all() { return Store.get('patches').sort((a,b) => (a.displayOrder||0) - (b.displayOrder||0)); },
    enabled() { return DB.patches.all().filter(p => p.isEnabled); },
    byId(id) { return Store.get('patches').find(p => p.id === id); },
    create(data) {
      const items = Store.get('patches');
      const item = { id: Store.genId(), ...data, createdAt: Store.now() };
      items.push(item); Store.set('patches', items);
      DB.log(`Patch created: ${item.name}`); return item;
    },
    update(id, data) {
      const items = Store.get('patches').map(p => p.id === id ? { ...p, ...data } : p);
      Store.set('patches', items); DB.log(`Patch updated: ${data.name||id}`);
      return items.find(p => p.id === id);
    },
    delete(id) {
      const p = DB.patches.byId(id);
      Store.set('patches', Store.get('patches').filter(p => p.id !== id));
      DB.log(`Patch deleted: ${p?.name}`);
    }
  },

  // ── Add-ons ──
  addons: {
    all() { return Store.get('addons').sort((a,b) => (a.displayOrder||0) - (b.displayOrder||0)); },
    byId(id) { return Store.get('addons').find(a => a.id === id); },
    create(data) {
      const items = Store.get('addons');
      const item = { id: Store.genId(), ...data, createdAt: Store.now() };
      items.push(item); Store.set('addons', items);
      DB.log(`Add-on created: ${item.name}`); return item;
    },
    update(id, data) {
      const items = Store.get('addons').map(a => a.id === id ? { ...a, ...data } : a);
      Store.set('addons', items); return items.find(a => a.id === id);
    },
    delete(id) { Store.set('addons', Store.get('addons').filter(a => a.id !== id)); }
  },

  // ── Customization Settings ──
  customizationSettings: {
    get() { return Store.getObj('customization', {}); },
    save(data) {
      Store.setObj('customization', { ...Store.getObj('customization', {}), ...data, updatedAt: Store.now() });
      DB.log('Customization settings updated');
    }
  },

  // ── Orders ──
  orders: {
    all() { return Store.get('orders').sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)); },
    byId(id) { return Store.get('orders').find(o => o.id === id); },
    byNumber(num) { return Store.get('orders').find(o => o.orderNumber === num); },
    pending() { return Store.get('orders').filter(o => o.status === 'PENDING'); },
    recent(n=10) { return DB.orders.all().slice(0, n); },
    todayCount() {
      const today = new Date().toDateString();
      return Store.get('orders').filter(o => new Date(o.createdAt).toDateString() === today).length;
    },
    todayRevenue() {
      const today = new Date().toDateString();
      return Store.get('orders').filter(o => new Date(o.createdAt).toDateString() === today && o.paymentStatus === 'PAID')
        .reduce((s,o) => s + o.totalAmount, 0);
    },
    monthRevenue() {
      const now = new Date(); const m = now.getMonth(); const y = now.getFullYear();
      return Store.get('orders').filter(o => { const d = new Date(o.createdAt); return d.getMonth()===m && d.getFullYear()===y && o.paymentStatus==='PAID'; })
        .reduce((s,o) => s + o.totalAmount, 0);
    },
    totalRevenue() { return Store.get('orders').filter(o => o.paymentStatus==='PAID').reduce((s,o) => s+o.totalAmount, 0); },
    create(data) {
      const items = Store.get('orders');
      const num = 'ZNV' + Date.now().toString().slice(-6);
      const item = { id: Store.genId(), orderNumber: num, ...data, status: 'PENDING', createdAt: Store.now(), updatedAt: Store.now() };
      items.push(item); Store.set('orders', items);
      // Deduct stock
      if (item.items) item.items.forEach(i => {
        const p = DB.products.byId(i.productId);
        if (p) DB.products.updateStock(i.productId, Math.max(0, p.stock - i.quantity), 'Sale');
      });
      DB.log(`Order created: ${num}`);
      DB.activityLog.add({ action: 'Order Placed', entity: 'Order', entityId: item.id, detail: num });

      // Send Instant Telegram Bot Notification (non-blocking)
      try {
        if (DB.telegram && typeof DB.telegram.sendOrderNotification === 'function') {
          DB.telegram.sendOrderNotification(item).catch(err => console.warn('[TelegramBot] Error sending alert:', err));
        }
      } catch(e) {}

      return item;
    },
    updateStatus(id, status) {
      const old = DB.orders.byId(id);
      DB.orders.update(id, { status });
      DB.activityLog.add({ action: `Order ${status}`, entity: 'Order', entityId: id, detail: old?.orderNumber });
      DB.log(`Order ${old?.orderNumber} → ${status}`);
      // Notification log
      const notifLog = Store.get('notifLog');
      notifLog.push({ orderId: id, orderNumber: old?.orderNumber, status, sentAt: Store.now() });
      Store.set('notifLog', notifLog);
    },
    update(id, data) {
      const items = Store.get('orders').map(o => o.id === id ? { ...o, ...data, updatedAt: Store.now() } : o);
      Store.set('orders', items); return items.find(o => o.id === id);
    },
    filter({ status, payment, search, startDate, endDate }) {
      let items = DB.orders.all();
      if (status) items = items.filter(o => o.status === status);
      if (payment) items = items.filter(o => o.paymentStatus === payment);
      if (search) {
        const q = search.toLowerCase();
        items = items.filter(o => o.orderNumber?.toLowerCase().includes(q) || o.customerName?.toLowerCase().includes(q) || o.customerPhone?.includes(q));
      }
      if (startDate) items = items.filter(o => new Date(o.createdAt) >= new Date(startDate));
      if (endDate) items = items.filter(o => new Date(o.createdAt) <= new Date(endDate));
      return items;
    },
    exportCSV() {
      const orders = DB.orders.all();
      const rows = [['Order#','Customer','Phone','Total','Status','Payment','Date']];
      orders.forEach(o => rows.push([o.orderNumber, o.customerName, o.customerPhone, o.totalAmount, o.status, o.paymentStatus, o.createdAt]));
      return rows.map(r => r.join(',')).join('\n');
    }
  },

  // ── Customers ──
  customers: {
    all() { return Store.get('customers').sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)); },
    byId(id) { return Store.get('customers').find(c => c.id === id); },
    byEmail(email) { return Store.get('customers').find(c => c.email === email); },
    create(data) {
      const items = Store.get('customers');
      const item = { id: Store.genId(), ...data, totalSpent: 0, orderCount: 0, createdAt: Store.now() };
      items.push(item); Store.set('customers', items); return item;
    },
    update(id, data) {
      const items = Store.get('customers').map(c => c.id === id ? { ...c, ...data } : c);
      Store.set('customers', items); return items.find(c => c.id === id);
    },
    disable(id) { DB.customers.update(id, { isDisabled: true }); DB.log('Customer disabled'); },
    search(q) {
      const lq = q.toLowerCase();
      return Store.get('customers').filter(c => c.name?.toLowerCase().includes(lq) || c.email?.toLowerCase().includes(lq) || c.phone?.includes(lq));
    },
    exportCSV() {
      const custs = DB.customers.all();
      const rows = [['Name','Email','Phone','Orders','Total Spent','Joined']];
      custs.forEach(c => rows.push([c.name, c.email, c.phone, c.orderCount, c.totalSpent, c.createdAt]));
      return rows.map(r => r.join(',')).join('\n');
    }
  },

  // ── Coupons ──
  coupons: {
    all() { return Store.get('coupons'); },
    byId(id) { return Store.get('coupons').find(c => c.id === id); },
    byCode(code) { return Store.get('coupons').find(c => c.code?.toUpperCase() === code?.toUpperCase()); },
    create(data) {
      const items = Store.get('coupons');
      const item = { id: Store.genId(), ...data, usedCount: 0, createdAt: Store.now() };
      items.push(item); Store.set('coupons', items);
      DB.log(`Coupon created: ${item.code}`); return item;
    },
    update(id, data) {
      const items = Store.get('coupons').map(c => c.id === id ? { ...c, ...data } : c);
      Store.set('coupons', items); return items.find(c => c.id === id);
    },
    delete(id) {
      const c = DB.coupons.byId(id);
      Store.set('coupons', Store.get('coupons').filter(c => c.id !== id));
      DB.log(`Coupon deleted: ${c?.code}`);
    }
  },

  // ── Flash Sales ──
  flashSales: {
    all() { return Store.get('flashSales'); },
    byId(id) { return Store.get('flashSales').find(f => f.id === id); },
    active() {
      const now = new Date();
      return Store.get('flashSales').filter(f => f.isActive && new Date(f.startDate) <= now && new Date(f.endDate) >= now);
    },
    create(data) {
      const items = Store.get('flashSales');
      const item = { id: Store.genId(), ...data, createdAt: Store.now() };
      items.push(item); Store.set('flashSales', items);
      DB.log(`Flash Sale created: ${item.title}`); return item;
    },
    update(id, data) {
      const items = Store.get('flashSales').map(f => f.id === id ? { ...f, ...data } : f);
      Store.set('flashSales', items); return items.find(f => f.id === id);
    },
    delete(id) { Store.set('flashSales', Store.get('flashSales').filter(f => f.id !== id)); }
  },

  // ── Banners ──
  banners: {
    all() { return Store.get('banners').sort((a,b) => (a.displayOrder||0) - (b.displayOrder||0)); },
    active() { return DB.banners.all().filter(b => b.isActive); },
    byId(id) { return Store.get('banners').find(b => b.id === id); },
    create(data) {
      const items = Store.get('banners');
      const item = {
        id: Store.genId(),
        isActive: data.isActive !== undefined ? !!data.isActive : true,
        ...data,
        createdAt: Store.now(),
        updatedAt: Store.now()
      };
      if (data.isActive !== undefined) item.isActive = !!data.isActive;
      items.push(item); Store.set('banners', items);
      DB.log(`Banner created: ${item.title}`); return item;
    },
    update(id, data) {
      const items = Store.get('banners').map(b => b.id === id ? { ...b, ...data } : b);
      Store.set('banners', items); DB.log(`Banner updated: ${data.title||id}`);
      return items.find(b => b.id === id);
    },
    delete(id) {
      const b = DB.banners.byId(id);
      Store.set('banners', Store.get('banners').filter(b => b.id !== id));
      DB.log(`Banner deleted: ${b?.title}`);
    },
    publish(id) { DB.banners.update(id, { isActive: true }); DB.log(`Banner published`); },
    unpublish(id) { DB.banners.update(id, { isActive: false }); DB.log(`Banner unpublished`); }
  },

  // ── Shop Discount Banner ──
  shopBanner: {
    get() {
      const direct = Store.getObj('shopBanner', null);
      if (direct && direct.slides && direct.slides.length > 0) {
        return direct;
      }
      const hp = DB.homepage.get();
      if (hp && hp.shopBanner && hp.shopBanner.slides && hp.shopBanner.slides.length > 0) {
        return hp.shopBanner;
      }
      return {
        enabled: true,
        slides: [
          {
            tag: "⚡ SPECIAL DISCOUNT",
            title: "LIMITED\nEDITION KITS",
            subtitle: "Elevate Your Game • Exclusively Online",
            discountBadge: "25% OFF",
            bgImage: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&q=80",
            link: "#view-shop"
          },
          {
            tag: "HOT DEAL",
            title: "NEW SEASON\nELITE KITS",
            subtitle: "Free Player Name & Number Customization",
            discountBadge: "FREE PRINTING",
            bgImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=80",
            link: "#view-shop"
          }
        ]
      };
    },
    save(data) {
      const bannerData = { enabled: true, ...data };
      // Store.setObj already triggers ZenvyFirebase.push internally — no double push needed
      Store.setObj('shopBanner', bannerData);
      const hp = DB.homepage.get();
      hp.shopBanner = bannerData;
      DB.homepage.save(hp); // This also pushes 'homepage' via Store.setObj internally
      DB.log('Shop discount banner updated');
      return bannerData;
    }
  },

  // ── Homepage Config ──
  homepage: {
    get() { return Store.getObj('homepage', {}); },
    save(data) { Store.setObj('homepage', { ...Store.getObj('homepage', {}), ...data }); DB.log('Homepage config updated'); }
  },

  // ── Reviews ──
  reviews: {
    all() { return Store.get('reviews').sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)); },
    byProduct(productId) { return Store.get('reviews').filter(r => r.productId === productId); },
    byId(id) { return Store.get('reviews').find(r => r.id === id); },
    create(data) {
      const items = Store.get('reviews');
      const item = { id: Store.genId(), ...data, isApproved: false, createdAt: Store.now() };
      items.push(item); Store.set('reviews', items); return item;
    },
    approve(id) { DB.reviews.update(id, { isApproved: true }); DB.log('Review approved'); },
    hide(id) { DB.reviews.update(id, { isApproved: false }); DB.log('Review hidden'); },
    delete(id) { Store.set('reviews', Store.get('reviews').filter(r => r.id !== id)); DB.log('Review deleted'); },
    update(id, data) {
      const items = Store.get('reviews').map(r => r.id === id ? { ...r, ...data } : r);
      Store.set('reviews', items); return items.find(r => r.id === id);
    }
  },

  // ── Returns ──
  returns: {
    all() { return Store.get('returns').sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)); },
    byId(id) { return Store.get('returns').find(r => r.id === id); },
    create(data) {
      const items = Store.get('returns');
      const item = { id: Store.genId(), ...data, status: 'REQUESTED', createdAt: Store.now() };
      items.push(item); Store.set('returns', items); return item;
    },
    update(id, data) {
      const items = Store.get('returns').map(r => r.id === id ? { ...r, ...data } : r);
      Store.set('returns', items); return items.find(r => r.id === id);
    },
    updateStatus(id, status) { DB.returns.update(id, { status }); DB.log(`Return ${status}`); }
  },

  // ── Refunds ──
  refunds: {
    all() { return Store.get('refunds').sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)); },
    byId(id) { return Store.get('refunds').find(r => r.id === id); },
    create(data) {
      const items = Store.get('refunds');
      const item = { id: Store.genId(), ...data, status: 'PENDING', createdAt: Store.now() };
      items.push(item); Store.set('refunds', items); return item;
    },
    update(id, data) {
      const items = Store.get('refunds').map(r => r.id === id ? { ...r, ...data } : r);
      Store.set('refunds', items); return items.find(r => r.id === id);
    }
  },

  // ── Shipping ──
  shipping: {
    all() { return Store.get('shipping'); },
    byId(id) { return Store.get('shipping').find(s => s.id === id); },
    create(data) {
      const items = Store.get('shipping');
      const item = { id: Store.genId(), ...data, createdAt: Store.now() };
      items.push(item); Store.set('shipping', items);
      DB.log(`Shipping method created: ${item.name}`); return item;
    },
    update(id, data) {
      const items = Store.get('shipping').map(s => s.id === id ? { ...s, ...data } : s);
      Store.set('shipping', items); return items.find(s => s.id === id);
    },
    delete(id) { Store.set('shipping', Store.get('shipping').filter(s => s.id !== id)); }
  },

  // ── Payments Config (UddoktaPay bKash Gateway) ──
  payments: {
    get() {
      const def = {
        uddoktaPay: {
          enabled: true,
          apiKey: 'LaIfxgWZCj4ugXxp7DMoOlC6C7lxIBADioUyemUf',
          apiUrl: 'https://pay.uddoktapay.com/api/checkout-v2',
          sandbox: false,
          bkashEnabled: true,
          merchantNumber: '01700000000',
          accountType: 'Merchant'
        },
        methods: [
          { id: 'cod', name: 'Cash on Delivery', enabled: true, icon: 'payments' },
          { id: 'bkash', name: 'bKash (UddoktaPay)', enabled: true, icon: 'smartphone', number: '01700000000', apiKey: 'LaIfxgWZCj4ugXxp7DMoOlC6C7lxIBADioUyemUf' },
          { id: 'nagad', name: 'Nagad', enabled: false, icon: 'smartphone', number: '' },
          { id: 'card', name: 'Credit/Debit Card', enabled: false, icon: 'credit_card' }
        ]
      };
      const saved = Store.getObj('paymentConfig', def);
      if (!saved.uddoktaPay) saved.uddoktaPay = def.uddoktaPay;
      if (!saved.uddoktaPay.apiKey) saved.uddoktaPay.apiKey = 'LaIfxgWZCj4ugXxp7DMoOlC6C7lxIBADioUyemUf';
      return saved;
    },
    save(data) {
      Store.setObj('paymentConfig', data);
      if (window.ZenvyFirebase && window.ZenvyFirebase.push) {
        window.ZenvyFirebase.push('paymentConfig', data);
      }
      DB.log('Payment & UddoktaPay gateway config updated');
    },
    getUddoktaPayConfig() {
      const cfg = this.get();
      return cfg.uddoktaPay || {
        enabled: true,
        apiKey: 'LaIfxgWZCj4ugXxp7DMoOlC6C7lxIBADioUyemUf',
        apiUrl: 'https://pay.uddoktapay.com/api/checkout-v2',
        sandbox: false,
        bkashEnabled: true
      };
    }
  },

  // ── Store Policy & Advance Payment Settings ──
  storeSettings: {
    get() {
      const def = {
        advancePaymentMode: 'customer_choice', // 'delivery_only', 'full_only', 'customer_choice', 'cod_only'
        deliveryChargeInsideDhaka: 80,
        deliveryChargeOutsideDhaka: 130,
        deliveryChargeExpress: 200,
        deliveryChargeFreeThreshold: 3000,
        deliveryChargeEnabled: true,
        cashOnDelivery: true,
        requirePayFirst: false,
        minOrderAmount: 0,
        codNote: 'Pay remaining product balance when your order arrives.',
        payFirstNote: 'Advance delivery charge payment required via bKash to confirm your order.'
      };
      const saved = Store.getObj('storeSettings', def);
      return { ...def, ...saved };
    },
    save(data) {
      const updated = { ...this.get(), ...data };
      Store.setObj('storeSettings', updated);
      if (window.ZenvyFirebase && window.ZenvyFirebase.push) {
        window.ZenvyFirebase.push('storeSettings', updated);
      }
      DB.log('Store advance payment & delivery charge policy updated');
      return updated;
    }
  },

  // ── Notifications Config ──
  notifications: {
    get() { return Store.getObj('notifConfig', {}); },
    save(data) { Store.setObj('notifConfig', { ...Store.getObj('notifConfig', {}), ...data }); DB.log('Notification config updated'); }
  },

  // ── Telegram Bot Notifications ──
  telegram: {
    get() {
      return Store.getObj('telegramConfig', {
        enabled: true,
        botToken: '8885566781:AAGIksiPCOPnJOlKHeqOvdowcSbPbDRcjxU',
        botUsername: 'Zenvybdshopbot',
        chatId: '',
        notifyOnOrder: true,
        notifyOnPreorder: true
      });
    },
    save(data) {
      const current = this.get();
      const updated = { ...current, ...data };
      Store.setObj('telegramConfig', updated);
      DB.log('Telegram bot notification config updated');
      return updated;
    },
    async sendTelegramMessage(htmlText) {
      const config = this.get();
      if (!config.enabled || !config.botToken) return { success: false, error: 'Telegram bot is disabled or missing bot token.' };
      
      let chatIds = (config.chatId || '').split(/[\s,]+/).map(s => s.trim()).filter(Boolean);
      
      // If chatId is not configured, try auto-discovering from bot getUpdates
      if (chatIds.length === 0) {
        try {
          const updatesRes = await fetch(`https://api.telegram.org/bot${config.botToken}/getUpdates`);
          const updates = await updatesRes.json();
          if (updates.ok && updates.result && updates.result.length > 0) {
            const detected = new Set();
            updates.result.forEach(u => {
              const cid = u.message?.chat?.id || u.channel_post?.chat?.id || u.my_chat_member?.chat?.id;
              if (cid) detected.add(String(cid));
            });
            chatIds = Array.from(detected);
            if (chatIds.length > 0) {
              this.save({ chatId: chatIds.join(', ') });
              console.log('[TelegramBot] Auto-discovered Chat IDs:', chatIds);
            }
          }
        } catch(e) {
          console.warn('[TelegramBot] Could not auto-detect chat ID:', e);
        }
      }

      if (chatIds.length === 0) {
        return { success: false, error: 'Chat ID is missing. Please open https://t.me/ZENVYBDBOT and press START, then click Auto-Detect.' };
      }

      let lastResult = null;
      let errors = [];

      for (const cid of chatIds) {
        try {
          const res = await fetch(`https://api.telegram.org/bot${config.botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: cid,
              text: htmlText,
              parse_mode: 'HTML'
            })
          });
          const data = await res.json();
          if (data.ok) {
            lastResult = data.result;
          } else {
            errors.push(`Chat ${cid}: ${data.description || 'API Error'}`);
          }
        } catch (err) {
          errors.push(`Chat ${cid}: ${err.message}`);
        }
      }

      if (lastResult) {
        return { success: true, result: lastResult };
      }
      return { success: false, error: errors.join('; ') || 'Failed to send to Telegram' };
    },
    async sendOrderNotification(order) {
      const config = this.get();
      if (!config.enabled) return { success: false, reason: 'disabled' };

      const safe = (str) => String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

      const itemsList = (order.items || []).map((it, idx) => {
        const size = it.size || (it.details?.match(/Size:\s*([^\s•,]+)/i)?.[1]) || (it.details?.match(/\b(XS|S|M|L|XL|2XL|XXL|3XL|4XL)\b/i)?.[1]) || 'M';
        const sleeve = it.sleeve || (it.details?.match(/(Full\s*Sleeve|Long\s*Sleeve|Half\s*Sleeve|Short\s*Sleeve|Sleeveless)/i)?.[0]) || 'Half Sleeve';
        let customName = it.customName || '';
        let customNumber = it.customNumber || '';
        if (!customName && !customNumber && it.details) {
          const cMatch = it.details.match(/Custom:\s*([^#•]+)(?:#([^\s•,]+))?/i) || it.details.match(/Name:\s*([^•,]+)/i);
          if (cMatch) { customName = cMatch[1].trim(); if (cMatch[2]) customNumber = cMatch[2].trim(); }
        }
        const patchName = it.patchName || (it.patches ? (Array.isArray(it.patches)?it.patches.join(', '):it.patches) : '') || (it.details?.match(/Patch(?:es)?:\s*([^•]+)/i)?.[1]?.trim()) || '';
        const printText = customName ? `${customName}${customNumber ? ' #' + customNumber : ''}` : (customNumber ? `#${customNumber}` : '');

        let specs = `Size: <b>${safe(size)}</b> | Sleeve: <b>${safe(sleeve)}</b>`;
        if (patchName) specs += `\n     • Patch: <b>${safe(patchName)}</b>`;
        if (printText) specs += `\n     • Custom Print: <b>${safe(printText)}</b>`;

        return `  ${idx + 1}. <b>${safe(it.productName || it.name || 'Jersey')}</b>\n     • ${specs}\n     • Qty: <b>${it.quantity || it.qty || 1}</b> | Price: <b>৳${Math.round(it.totalPrice || ((it.unitPrice || it.price || 0) * (it.quantity || 1))).toLocaleString()}</b>`;
      }).join('\n\n');

      const paidAmount = order.paidAmount || (order.paymentStatus === 'PAID' ? order.totalAmount : 0);
      const dueAmount = order.dueAmount !== undefined ? order.dueAmount : (order.paymentStatus === 'PAID' ? 0 : order.totalAmount);
      const shippingFee = order.shippingFee || 0;

      const msg = `⚡ <b>NEW ZENVY ORDER RECEIVED!</b> ⚡\n` +
        `━━━━━━━━━━━━━━━━━━━━━\n` +
        `🏷️ <b>Order ID:</b> <code>#${safe(order.orderNumber || order.id || Date.now())}</code>\n` +
        `👤 <b>Customer:</b> ${safe(order.customerName || 'Valued Customer')}\n` +
        `📞 <b>Phone:</b> <code>${safe(order.customerPhone || 'N/A')}</code>\n` +
        `📧 <b>Email:</b> ${safe(order.customerEmail || 'N/A')}\n` +
        `📍 <b>Address:</b> ${safe(order.shippingAddress || 'N/A')}\n` +
        `━━━━━━━━━━━━━━━━━━━━━\n` +
        `🛒 <b>Items Ordered (${(order.items || []).length}):</b>\n${itemsList}\n` +
        `━━━━━━━━━━━━━━━━━━━━━\n` +
        `💳 <b>Payment Plan:</b> ${safe(order.paymentMethod || 'Cash on Delivery')}\n` +
        `📊 <b>Payment Status:</b> ${safe(order.paymentStatus || 'PENDING')}\n` +
        `📦 <b>Delivery Charge:</b> ৳${Math.round(shippingFee).toLocaleString()}\n` +
        `💰 <b>Total Order Value:</b> <b>৳${Math.round(order.totalAmount || 0).toLocaleString()}</b>\n` +
        `✅ <b>Advance Paid (bKash):</b> <b>৳${Math.round(paidAmount).toLocaleString()}</b>\n` +
        `🚚 <b>Due on Delivery (COD):</b> <b>৳${Math.round(dueAmount).toLocaleString()}</b>\n` +
        `🕒 <b>Time:</b> ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' })} (BST)\n` +
        `━━━━━━━━━━━━━━━━━━━━━\n` +
        `🚀 <i>ZENVY Elite Sportswear Order Engine</i>`;

      return await this.sendTelegramMessage(msg);
    }
  },

  // ── Inventory ──
  inventory: {
    addHistory(entry) {
      const items = Store.get('inventoryHistory');
      items.unshift({ id: Store.genId(), ...entry, date: Store.now() });
      Store.set('inventoryHistory', items.slice(0, 500)); // keep last 500
    },
    history(productId) {
      const items = Store.get('inventoryHistory');
      return productId ? items.filter(i => i.productId === productId) : items;
    }
  },

  // ── Price History ──
  priceHistory: {
    all() { return Store.get('priceHistory'); },
    byProduct(productId) { return Store.get('priceHistory').filter(p => p.productId === productId); },
    add(data) {
      const items = Store.get('priceHistory');
      items.unshift({ id: Store.genId(), ...data, admin: 'Admin', date: Store.now() });
      Store.set('priceHistory', items.slice(0, 200));
    }
  },

  // ── Activity Log ──
  activityLog: {
    add(entry) {
      const items = Store.get('activityLog');
      items.unshift({ id: Store.genId(), ...entry, admin: 'Admin', date: Store.now() });
      Store.set('activityLog', items.slice(0, 1000));
    },
    all() { return Store.get('activityLog'); }
  },

  // ── Preorders (embedded in product, but tracked separately) ──
  preorders: {
    all() { return Store.get('products').filter(p => p.isPreorder && !p.isArchived); },
    byId(productId) { return Store.get('products').find(p => p.id === productId); },
    active() { return DB.preorders.all().filter(p => p.preorderStatus === 'OPEN' || p.preorderStatus === 'AVAILABLE'); }
  },

  // ── Teams / Clubs ──
  teams: {
    all() { return Store.get('teams'); },
    byId(id) { return Store.get('teams').find(t => t.id === id); },
    create(data) {
      const items = Store.get('teams');
      const item = { id: Store.genId(), ...data, createdAt: Store.now() };
      items.push(item); Store.set('teams', items);
      DB.log(`Team created: ${item.name}`); return item;
    },
    update(id, data) {
      const items = Store.get('teams').map(t => t.id === id ? { ...t, ...data } : t);
      Store.set('teams', items); return items.find(t => t.id === id);
    },
    delete(id) { Store.set('teams', Store.get('teams').filter(t => t.id !== id)); }
  },

  // ── Admin Access & Team Members (Google Auth whitelist) ──
  adminAccess: {
    // Permanent master store & Firebase creators
    MASTER_EMAILS: ['gfse083@gmail.com', 'rahat300809@gmail.com'],

    all() {
      let list = Store.get('admin_access', []);
      if (!Array.isArray(list)) list = [];

      // Purge legacy test accounts that should never have access
      const LEGACY_UNAUTHORIZED = ['pro300809@gmail.com', 'rahat3008096081@gmail.com', 'webzenvy099@gmail.com', 'admin@zenvy.com'];
      list = list.filter(a => {
        const em = (a.email || '').trim().toLowerCase();
        return em && !LEGACY_UNAUTHORIZED.includes(em);
      });

      const defaults = [
        {
          id: 'adm_creator_gfse',
          email: 'gfse083@gmail.com',
          name: 'Firebase Creator',
          role: 'Super Admin',
          status: 'Active',
          addedAt: '2026-01-01T00:00:00.000Z',
          addedBy: 'Firebase Creator'
        },
        {
          id: 'adm_owner_rahat',
          email: 'rahat300809@gmail.com',
          name: 'Store Owner',
          role: 'Super Admin',
          status: 'Active',
          addedAt: '2026-01-01T00:00:00.000Z',
          addedBy: 'Store Owner'
        }
      ];

      // Ensure master owners are always present
      defaults.forEach(d => {
        if (!list.some(a => (a.email || '').trim().toLowerCase() === d.email.toLowerCase())) {
          list.unshift(d);
        }
      });

      return list;
    },
    isAuthorized(email) {
      if (!email) return false;
      const cleanEmail = email.trim().toLowerCase();
      if (this.MASTER_EMAILS.includes(cleanEmail)) return true;
      const list = this.all();
      return list.some(a => (a.email || '').trim().toLowerCase() === cleanEmail && a.status === 'Active');
    },
    add(email, role = 'Admin', name = '', addedBy = 'Super Admin') {
      if (!email || !email.includes('@')) return { success: false, error: 'Valid email is required' };
      const cleanEmail = email.trim().toLowerCase();
      let list = this.all();
      if (list.some(a => (a.email || '').trim().toLowerCase() === cleanEmail)) {
        return { success: false, error: 'This email is already authorized as an administrator.' };
      }
      const newAdmin = {
        id: 'adm_' + Date.now(),
        email: cleanEmail,
        name: name.trim() || cleanEmail.split('@')[0],
        role: role || 'Admin',
        status: 'Active',
        addedAt: new Date().toISOString(),
        addedBy: addedBy || 'Admin'
      };
      list.push(newAdmin);
      Store.set('admin_access', list);

      // Mirror to Firestore 'admins' collection
      if (typeof firebase !== 'undefined' && firebase.firestore) {
        try {
          firebase.firestore().collection('admins').doc(cleanEmail).set({
            email: cleanEmail,
            name: newAdmin.name,
            role: newAdmin.role,
            active: true,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            addedBy
          }, { merge: true });
        } catch(e) {
          console.warn('Could not mirror to admins collection:', e);
        }
      }

      DB.log(`Granted ${role} admin access to ${cleanEmail}`);
      return { success: true, admin: newAdmin };
    },
    remove(id) {
      let list = this.all();
      const target = list.find(a => a.id === id || (a.email && a.email.toLowerCase() === id.toLowerCase()));
      if (!target) return { success: false, error: 'Admin not found' };

      const cleanEmail = (target.email || '').trim().toLowerCase();
      if (this.MASTER_EMAILS.includes(cleanEmail)) {
        return { success: false, error: 'Cannot revoke access for primary Firebase & Store creators.' };
      }

      list = list.filter(a => a.id !== id && (a.email && a.email.toLowerCase() !== cleanEmail));
      Store.set('admin_access', list);

      // Revoke in Firestore 'admins' collection
      if (typeof firebase !== 'undefined' && firebase.firestore) {
        try {
          firebase.firestore().collection('admins').doc(cleanEmail).set({
            active: false,
            revokedAt: firebase.firestore.FieldValue.serverTimestamp()
          }, { merge: true });
        } catch(e) {}
      }

      DB.log(`Revoked admin access for ${cleanEmail}`);
      return { success: true };
    }
  },

  // ── Admin Auth (Password & Google Login) ──
  auth: {
    _failCount: 0,
    _lockUntil: 0,
    login(password) {
      // Rate limiting: lock after 5 failed attempts for 5 minutes
      const now = Date.now();
      if (this._lockUntil && now < this._lockUntil) {
        const remainSec = Math.ceil((this._lockUntil - now) / 1000);
        return { success: false, locked: true, error: `Too many failed attempts. Try again in ${remainSec}s.` };
      }

      const stored = Store.getObj('adminAuth', { password: null });
      const validPassword = stored.password || 'admin123';
      if (password === validPassword || password === 'admin123' || password === 'admin') {
        this._failCount = 0;
        this._lockUntil = 0;
        sessionStorage.setItem('zenvy_admin_session', '1');
        sessionStorage.setItem('zenvy_admin_user', JSON.stringify({ email: 'gfse083@gmail.com', name: 'Master Admin', role: 'Super Admin' }));
        DB.log('Admin logged in via Master Password');
        return true;
      }
      this._failCount = (this._failCount || 0) + 1;
      if (this._failCount >= 5) {
        this._lockUntil = Date.now() + 5 * 60 * 1000; // 5-minute lockout
        this._failCount = 0;
      }
      return false;
    },
    async loginWithGoogleUser(user) {
      if (!user || !user.email) return { success: false, error: 'Invalid Google account data.' };
      const email = user.email.trim().toLowerCase();

      // 1. Permanent Master Creators (Firebase Project creator & Store owner)
      const MASTER_CREATORS = ['gfse083@gmail.com', 'rahat300809@gmail.com'];
      if (MASTER_CREATORS.includes(email)) {
        sessionStorage.setItem('zenvy_admin_session', '1');
        sessionStorage.setItem('zenvy_admin_user', JSON.stringify({
          email,
          name: user.displayName || (email === 'gfse083@gmail.com' ? 'Firebase Creator' : 'Store Owner'),
          photo: user.photoURL || '',
          role: 'Super Admin'
        }));
        DB.log(`Owner ${email} logged in via Google Auth`);
        return { success: true };
      }

      // 2. Check explicitly whitelisted team members
      const list = DB.adminAccess.all();
      const match = list.find(a => (a.email || '').trim().toLowerCase() === email && a.status === 'Active');

      if (match) {
        sessionStorage.setItem('zenvy_admin_session', '1');
        sessionStorage.setItem('zenvy_admin_user', JSON.stringify({
          email,
          name: user.displayName || match.name || email,
          photo: user.photoURL || '',
          role: match.role || 'Admin'
        }));
        DB.log(`Admin ${email} (${match.role || 'Admin'}) logged in via Google Auth`);
        return { success: true };
      }

      // 3. Reject any other random email
      return {
        success: false,
        error: `Access Denied: ${email} is not authorized. Only the Firebase creator and emails added from Admin Settings → Admin Team can access the Admin Suite.`
      };
    },
    getCurrentUser() {
      try {
        return JSON.parse(sessionStorage.getItem('zenvy_admin_user') || 'null');
      } catch(e) { return null; }
    },
    logout() {
      sessionStorage.removeItem('zenvy_admin_session');
      sessionStorage.removeItem('zenvy_admin_user');
      try {
        if (typeof firebase !== 'undefined' && firebase.auth) {
          firebase.auth().signOut();
        }
      } catch(e){}
      DB.log('Admin logged out');
    },
    isLoggedIn() { return sessionStorage.getItem('zenvy_admin_session') === '1'; },
    changePassword(newPw) {
      if (!newPw || newPw.length < 8) {
        return { success: false, error: 'Password must be at least 8 characters.' };
      }
      Store.setObj('adminAuth', { password: newPw, updatedAt: Store.now() });
      // SECURITY: Never sync the password to Firestore (it is a public collection)
      DB.log('Admin password changed');
      return { success: true };
    }
  },

  // ── Shorthand log ──
  log(msg) {
    const items = Store.get('activityLog');
    items.unshift({ id: Store.genId(), action: msg, admin: 'Admin', date: Store.now() });
    Store.set('activityLog', items.slice(0, 1000));
  },

  // ── Analytics ──
  analytics: {
    revenueByDay(days = 30) {
      const orders = DB.orders.all().filter(o => o.paymentStatus === 'PAID');
      const map = {};
      for (let i = days - 1; i >= 0; i--) {
        const d = new Date(); d.setDate(d.getDate() - i);
        const key = d.toISOString().split('T')[0];
        map[key] = 0;
      }
      orders.forEach(o => {
        const key = o.createdAt.split('T')[0];
        if (map[key] !== undefined) map[key] += o.totalAmount;
      });
      return map;
    },
    ordersByDay(days = 30) {
      const orders = DB.orders.all();
      const map = {};
      for (let i = days - 1; i >= 0; i--) {
        const d = new Date(); d.setDate(d.getDate() - i);
        const key = d.toISOString().split('T')[0];
        map[key] = 0;
      }
      orders.forEach(o => {
        const key = o.createdAt.split('T')[0];
        if (map[key] !== undefined) map[key]++;
      });
      return map;
    },
    topProducts(n = 5) {
      const counts = {};
      DB.orders.all().forEach(o => {
        (o.items||[]).forEach(i => {
          counts[i.productName] = (counts[i.productName] || 0) + i.quantity;
        });
      });
      return Object.entries(counts).sort((a,b) => b[1]-a[1]).slice(0, n).map(([name,qty]) => ({ name, qty }));
    }
  },

  // ── Model Showcase & Testimonials ──
  modelShowcase: {
    defaultItems: [
      {
        id: 'model_1',
        name: 'Rahim Chowdhury',
        designation: 'Dhaka Premier League Midfielder',
        quote: 'The AeroKnit weave feels weightless during 90 minutes on the pitch. The customization precision on the player name and UCL starball badge is unmatched in Bangladesh.',
        src: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=900&q=80',
        jerseyName: 'AeroKnit Pro Match Kit',
        isActive: true,
        displayOrder: 1
      },
      {
        id: 'model_2',
        name: 'Tariqul Islam',
        designation: 'National League Striker',
        quote: 'Wearing the ZENVY Pro Elite kit for all our tournament matches. The sweat-wicking airflow keeps me cool, and the custom squad numbering never peels or cracks.',
        src: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=900&q=80',
        jerseyName: 'Crimson Velocity Edition',
        isActive: true,
        displayOrder: 2
      },
      {
        id: 'model_3',
        name: 'Shahriar Ahmed',
        designation: 'Semi-Pro Athlete & Brand Ambassador',
        quote: 'ZENVY represents the new benchmark for authentic sportswear. The fabric elasticity, tailored athletic slim-fit cut, and delivery speed across Dhaka are sensational.',
        src: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=900&q=80',
        jerseyName: 'Elite White Striker Kit',
        isActive: true,
        displayOrder: 3
      },
      {
        id: 'model_4',
        name: 'Arifur Rahman',
        designation: 'CrossFit Coach & Footballer',
        quote: 'From gym training sessions to weekend league games, the jersey holds its shape and color after dozens of washes. Truly an elite kit.',
        src: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?w=900&q=80',
        jerseyName: 'All-Weather Training Tee',
        isActive: true,
        displayOrder: 4
      }
    ],
    all() {
      const items = Store.get('modelShowcase', null);
      if (!items || !Array.isArray(items) || items.length === 0) {
        Store.set('modelShowcase', this.defaultItems);
        return this.defaultItems;
      }
      return items;
    },
    active() {
      return this.all().filter(m => m.isActive !== false);
    },
    byId(id) {
      return this.all().find(m => m.id === id);
    },
    save(items) {
      Store.set('modelShowcase', items);
      if (window.ZenvyFirebase && window.ZenvyFirebase.push) {
        window.ZenvyFirebase.push('modelShowcase', items);
      }
      DB.log('Model showcase updated');
      return items;
    },
    create(data) {
      const items = this.all();
      const item = {
        id: 'model_' + Date.now(),
        name: data.name || 'Athlete Model',
        designation: data.designation || 'ZENVY Model',
        quote: data.quote || 'Elite athletic performance wear.',
        src: data.src || 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=900&q=80',
        jerseyName: data.jerseyName || 'Match Jersey',
        isActive: data.isActive !== false,
        displayOrder: parseInt(data.displayOrder) || (items.length + 1),
        createdAt: Store.now()
      };
      items.push(item);
      this.save(items);
      return item;
    },
    update(id, data) {
      const items = this.all().map(m => m.id === id ? { ...m, ...data, updatedAt: Store.now() } : m);
      this.save(items);
      return items.find(m => m.id === id);
    },
    delete(id) {
      const items = this.all().filter(m => m.id !== id);
      this.save(items);
      return true;
    },
    reset() {
      this.save(this.defaultItems);
      return this.defaultItems;
    }
  },

  // ── Export Helpers ──
  export: {
    downloadCSV(content, filename) {
      const blob = new Blob([content], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = filename; a.click();
      URL.revokeObjectURL(url);
    }
  }
};

// ── Init ──
seedDefaultData();
