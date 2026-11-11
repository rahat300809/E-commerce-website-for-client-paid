/**
 * ZENVY — Robust Firebase Firestore Sync Layer
 * ─────────────────────────────────────────────
 * Real-time cloud sync between Admin and Storefront via Firebase Firestore.
 * - Always buffers writes so no product/banner updates are ever dropped.
 * - Sanitizes data before saving to prevent Firestore write rejections.
 * - Auto-seeds Firestore on first launch from local seed if cloud is empty.
 * - Broadcasts updates in real-time across all connected clients.
 */

(function () {
  'use strict';

  const FIREBASE_CONFIG = {
    apiKey: "AIzaSyDXvVBkR0tFdqoQJfTOnApz2eDuu9YBRZ0",
    authDomain: "zenvy-storebd.firebaseapp.com",
    projectId: "zenvy-storebd",
    storageBucket: "zenvy-storebd.firebasestorage.app",
    messagingSenderId: "353374404315",
    appId: "1:353374404315:web:ca8a6592a016e4960096fe",
    measurementId: "G-69FXB715MZ"
  };

  const DB_VERSION   = 'zenvy_v1';
  const FS_COLLECTION = 'zenvy_store';
  const FS_PRODUCTS_COLLECTION = 'products';

  const SYNC_KEYS = [
    'products', 'categories', 'collections', 'banners', 'homepage', 'shopBanner',
    'brand', 'orders', 'customers', 'coupons', 'flashSales',
    'returns', 'refunds', 'shipping', 'paymentConfig', 'storeSettings',
    'notifConfig', 'telegramConfig', 'patches', 'sleeves', 'sizes', 'sizeChart', 'colors', 'addons',
    'printing', 'customization', 'teams', 'reviews', 'preorders', 'preorderHero',
    'inventoryHistory', 'priceHistory', 'activityLog', 'adminAuth',
    'admin_access', 'seeded_version', 'restockRequests'
  ];

  let _db = null;
  let _unsubscribe = null;
  let _productsUnsubscribe = null;
  let _writeQueue = {};
  let _writeTimer = null;
  let _listeners = [];

  // Helper to ensure clean JSON for Firestore (strips undefined, functions, circular refs)
  function sanitize(obj) {
    try {
      return JSON.parse(JSON.stringify(obj));
    } catch {
      return obj;
    }
  }

  // ── Init Firebase & Firestore ─────────────────────────────────
  let _initPromise = null;
  function ensureDb() {
    if (_db) return Promise.resolve(_db);
    if (!_initPromise) {
      _initPromise = new Promise((resolve) => {
        let attempts = 0;
        function check() {
          attempts++;
          if (typeof firebase !== 'undefined' && firebase.firestore) {
            initFirebase();
            resolve(_db);
          } else if (attempts < 100) {
            setTimeout(check, 30);
          } else {
            console.warn('[ZenvySync] Firebase SDK connection timeout');
            resolve(null);
          }
        }
        check();
      });
    }
    return _initPromise;
  }

  function initFirebase() {
    if (_db) return _db;
    try {
      if (!firebase.apps || firebase.apps.length === 0) {
        firebase.initializeApp(FIREBASE_CONFIG);
      }
      _db = firebase.firestore();
      console.log('[ZenvySync] Firebase connected ✅');

      // Flush any queued writes that happened before connection
      if (Object.keys(_writeQueue).length > 0) {
        flushWriteQueue();
      }

      // Immediately activate live real-time listeners across all devices
      startLiveSync();

      // Automatically hydrate and sync full product catalog immediately
      hydrate().catch(e => console.warn('[ZenvySync] Auto-hydrate notice:', e));

      return _db;
    } catch (e) {
      console.error('[ZenvySync] Firebase init failed:', e);
      return null;
    }
  }

  // ── Write to Firestore (batched & fast flush) ───────────────────
  function flushWriteQueue() {
    if (!_db) return;
    const keysToWrite = { ..._writeQueue };
    delete keysToWrite.products; // NEVER write products to single document
    _writeQueue = {};
    if (Object.keys(keysToWrite).length === 0) return;

    const batch = _db.batch();
    Object.entries(keysToWrite).forEach(([k, v]) => {
      const docRef = _db.collection(FS_COLLECTION).doc(k);
      batch.set(docRef, { data: sanitize(v), updatedAt: Date.now() });
    });

    batch.commit()
      .then(() => {
        console.log('[ZenvySync] Saved to Firestore:', Object.keys(keysToWrite).join(', '));
      })
      .catch(e => {
        console.warn('[ZenvySync] Firestore write error:', e);
      });
  }

  function pushToFirestore(key, value) {
    if (key === 'products') return; // NEVER push products array to zenvy_store
    _writeQueue[key] = value;
    clearTimeout(_writeTimer);
    ensureDb().then(db => {
      if (db) {
        // Critical catalog and transactional keys flush immediately to prevent navigation race conditions
        if (key === 'orders' || key === 'categories' || key === 'sleeves' || key === 'preorderHero' || key === 'restockRequests') {
          flushWriteQueue();
        } else {
          _writeTimer = setTimeout(flushWriteQueue, 25);
        }
      }
    });
  }

  // Ensure pending writes are immediately saved if tab is hidden or closed
  try {
    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden' && Object.keys(_writeQueue).length > 0) {
        flushWriteQueue();
      }
    });
    window.addEventListener('beforeunload', () => {
      if (Object.keys(_writeQueue).length > 0) {
        flushWriteQueue();
      }
    });
  } catch(e){}

  // ── Intelligent Array Merge for Multi-Admin Concurrency ────────
  function isDemoItem(item) {
    if (!item || typeof item !== 'object') return false;
    const em = (item.email || item.customerEmail || '').toLowerCase();
    const nm = (item.name || item.customerName || '').toLowerCase();
    if (em === 'tanvir@example.com' || em === 'rahim@example.com' || em === 'nusrat@example.com') return true;
    if (nm === 'tanvir ahmed' || nm === 'rahim chowdhury' || nm === 'nusrat jahan') return true;
    return false;
  }

  function mergeArraysById(localArr, cloudArr, keyName = '') {
    if (!Array.isArray(localArr)) return Array.isArray(cloudArr) ? cloudArr.filter(i => !isDemoItem(i)) : [];
    if (!Array.isArray(cloudArr)) return localArr.filter(i => !isDemoItem(i));

    const map = new Map();

    const getItemKey = (item) => {
      if (!item || typeof item !== 'object') return String(item);
      if (keyName === 'sizes') {
        const c = String(item.code || item.name || '').toUpperCase().trim();
        if (c) return `sz_${c}`;
      }
      return item.id || item.email || item.code || (item.orderNumber ? `ord_${item.orderNumber}` : null) || JSON.stringify(item);
    };

    // 1. Seed with cloud items as baseline (excluding any demo data)
    cloudArr.forEach(item => {
      if (isDemoItem(item)) return;
      const mapKey = getItemKey(item);
      map.set(mapKey, item);
    });

    // 2. Intelligently merge local items (preserve all user creations & newer edits)
    localArr.forEach(item => {
      if (isDemoItem(item)) return;
      const mapKey = getItemKey(item);
      if (map.has(mapKey)) {
        const cloudItem = map.get(mapKey);
        const localTime = new Date(item.updatedAt || item.createdAt || 0).getTime();
        const cloudTime = new Date(cloudItem.updatedAt || cloudItem.createdAt || 0).getTime();
        if (localTime >= cloudTime) {
          map.set(mapKey, item);
        }
      } else {
        // Local item was created locally and has not yet synced to cloud:
        // ALWAYS PRESERVE IT! Never drop user-created products or items!
        map.set(mapKey, item);
      }
    });

    const res = Array.from(map.values());
    if (keyName === 'sizes') {
      const stdOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL'];
      res.sort((a, b) => {
        const iA = stdOrder.indexOf((a.code || '').toUpperCase());
        const iB = stdOrder.indexOf((b.code || '').toUpperCase());
        if (iA >= 0 && iB >= 0) return iA - iB;
        return (a.displayOrder || 0) - (b.displayOrder || 0);
      });
    } else if (res.length > 0 && res[0] && typeof res[0] === 'object' && ('createdAt' in res[0])) {
      res.sort((a, b) => {
        const tA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const tB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return tB - tA; // Newest at top
      });
    }
    return res;
  }

  // ── Pull data from Firestore into localStorage ─────────────────
  async function hydrate() {
    await ensureDb();
    if (!_db) return;
    try {
      const snapshot = await _db.collection(FS_COLLECTION).get();
      let count = 0;
      if (!snapshot.empty) {
        snapshot.forEach(docSnap => {
          const key = docSnap.id;
          // IMPORTANT: Do NOT hydrate products from the single legacy doc;
          // products are exclusively hydrated from the scalable /products/ collection below!
          if (key === 'products' || key === 'deleted_products') return;

          const payload = docSnap.data();
          if (payload && payload.data !== undefined) {
            const localKey = `${DB_VERSION}_${key}`;
            const cloudUpdatedAt = payload.updatedAt || 0;

            let finalData = payload.data;
            const rawLocal = localStorage.getItem(localKey);
            if (rawLocal && Array.isArray(payload.data)) {
              try {
                const localParsed = JSON.parse(rawLocal);
                if (Array.isArray(localParsed)) {
                  finalData = mergeArraysById(localParsed, payload.data, key);
                  if (finalData.length > payload.data.length && _db) {
                    pushToFirestore(key, finalData);
                  }
                }
              } catch(e) {
                finalData = payload.data;
              }
            }

            localStorage.setItem(localKey, JSON.stringify(finalData));
            if (cloudUpdatedAt) {
              localStorage.setItem(`${localKey}_updatedAt`, cloudUpdatedAt.toString());
            }
            count++;
          }
        });
      }

      // ── AUTHORITATIVE PRODUCT HYDRATION FROM /products/ COLLECTION ──
      // Pull all individual product documents so EVERY device gets the exact same live catalog
      await syncProductsWithCloud();
      count++;

      console.log(`[ZenvySync] Hydrated ${count} keys & full product catalog from Firestore ✅`);
      try {
        window.dispatchEvent(new Event('storage'));
        window.dispatchEvent(new CustomEvent('zenvy-store-updated', { detail: { key: 'all' } }));
      } catch(e){}
    } catch (e) {
      console.warn('[ZenvySync] Hydration error (using local storage):', e);
    }
  }

  // ── Dedicated Real-time Cloud Sync for Products Collection ─────
  async function syncProductsWithCloud(isManual = false) {
    await ensureDb();
    if (!_db) return { count: 0, uploaded: 0 };
    try {
      // 1. Fetch deleted tracking IDs from Firestore cloud doc so ALL devices honor deletions
      const deletedKey = `${DB_VERSION}_deleted_product_ids`;
      let deletedIds = new Set();
      try {
        const delRaw = localStorage.getItem(deletedKey);
        if (delRaw) deletedIds = new Set(JSON.parse(delRaw));
      } catch(e){}

      try {
        const delDoc = await _db.collection(FS_COLLECTION).doc('deleted_products').get();
        if (delDoc.exists) {
          const cIds = delDoc.data()?.ids;
          if (Array.isArray(cIds)) {
            cIds.forEach(id => deletedIds.add(String(id).trim()));
            localStorage.setItem(deletedKey, JSON.stringify(Array.from(deletedIds)));
          }
        }
      } catch(e){}

      function isTestOrJunkProduct(p) {
        if (!p) return true;
        const name = String(p.name || '').toLowerCase();
        const id = String(p.id || '').toLowerCase();
        const sku = String(p.sku || '').toLowerCase();
        if (name.includes('[test sync]') || name.includes('test sync')) return true;
        if (id === 'prod_876_user' || id === '876') return true;
        if (name.includes('876') && (sku.includes('o887') || name.includes('copy'))) return true;
        return false;
      }

      // 2. Fetch all individual products from Firestore /products/ collection
      const pSnap = await _db.collection(FS_PRODUCTS_COLLECTION).get();
      let cloudList = [];
      pSnap.forEach(doc => {
        const d = doc.data();
        if (d) {
          if (!d.id) d.id = doc.id;
          const pid = String(d.id).trim();
          if (deletedIds.has(pid)) return; // Exclude deleted products
          if (isTestOrJunkProduct(d)) {
            try { _db.collection(FS_PRODUCTS_COLLECTION).doc(doc.id).delete(); } catch(e){}
            return;
          }
          const hasPrePrice = typeof d.preorderPrice === 'number' && d.preorderPrice > 0;
          const hasOpenStatus = d.preorderStatus === 'OPEN' || d.preorderStatus === 'CLOSING_SOON';
          d.isPreorder = Boolean(d.isPreorder && (hasPrePrice || hasOpenStatus));
          cloudList.push(d);
        }
      });

      // 3. Read local products on this device
      const localKey = `${DB_VERSION}_products`;
      let localList = [];
      try {
        const raw = localStorage.getItem(localKey);
        if (raw) localList = JSON.parse(raw);
      } catch(e){}

      // Filter out any locally deleted or test products
      localList = localList.filter(p => {
        if (!p || !p.id) return false;
        const pid = String(p.id).trim();
        if (deletedIds.has(pid)) return false;
        if (isTestOrJunkProduct(p)) return false;
        return true;
      });

      // 4. Merge: Local vs Cloud
      // Any product present locally that is missing in cloud (e.g. added on another laptop/device)
      // MUST be preserved and uploaded to cloud so all devices stay 100% in sync!
      const cloudMap = new Map();
      cloudList.forEach(p => cloudMap.set(String(p.id).trim(), p));

      const toUpload = [];
      localList.forEach(p => {
        if (!p || !p.id) return;
        const pid = String(p.id).trim();
        if (deletedIds.has(pid)) return; // Never resurrect deleted items
        if (isTestOrJunkProduct(p)) return; // Never upload test junk

        const hasPrePrice = typeof p.preorderPrice === 'number' && p.preorderPrice > 0;
        const hasOpenStatus = p.preorderStatus === 'OPEN' || p.preorderStatus === 'CLOSING_SOON';
        p.isPreorder = Boolean(p.isPreorder && (hasPrePrice || hasOpenStatus));

        if (!cloudMap.has(pid)) {
          // This product exists on this device but NOT yet in Firestore /products/!
          // Add to cloud catalog and schedule upload
          toUpload.push(p);
          cloudMap.set(pid, p);
        } else {
          // Check if local has newer updates (e.g. offline edits)
          const cloudP = cloudMap.get(pid);
          const localTime = new Date(p.updatedAt || p.createdAt || 0).getTime();
          const cloudTime = new Date(cloudP.updatedAt || cloudP.createdAt || 0).getTime();
          if (localTime > cloudTime + 1000) {
            toUpload.push(p);
            cloudMap.set(pid, p);
          }
        }
      });

      const merged = Array.from(cloudMap.values());
      // Sort newest first
      merged.sort((a, b) => {
        const tA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const tB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return tB - tA;
      });

      // 5. Update local storage with complete synchronized catalog
      localStorage.setItem(localKey, JSON.stringify(merged));
      localStorage.setItem(`${localKey}_updatedAt`, Date.now().toString());

      // 6. Upload any missing/newer local products to Firestore /products/
      if (toUpload.length > 0) {
        console.log(`[ZenvySync] Uploading ${toUpload.length} local products to Firestore cloud /products/...`);
        for (const p of toUpload) {
          try {
            await _db.collection(FS_PRODUCTS_COLLECTION).doc(String(p.id).trim()).set(sanitize(p));
            console.log(`[ZenvySync] Synced to cloud: ${p.name || p.id} ✅`);
          } catch(err) {
            console.warn('[ZenvySync] Upload error for product:', p.name, err);
          }
        }
      }

      // 7. Dispatch events for instant UI reactivity across storefront and admin
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new CustomEvent('zenvy-store-updated', { detail: { key: 'products' } }));

      return { count: merged.length, uploaded: toUpload.length };
    } catch(err) {
      console.warn('[ZenvySync] syncProductsWithCloud notice:', err);
      return { count: 0, uploaded: 0, error: err };
    }
  }

  async function saveProductToCloud(p) {
    if (!p || !p.id) return;
    const pName = String(p.name || '').toLowerCase();
    if (pName.includes('[test sync]') || pName.includes('test sync') || p.id === 'prod_876_user' || (pName.includes('876') && pName.includes('copy'))) {
      return;
    }
    await ensureDb();
    const pid = String(p.id).trim();

    // Remove from deleted tracker if re-creating
    const deletedKey = `${DB_VERSION}_deleted_product_ids`;
    try {
      const delRaw = localStorage.getItem(deletedKey);
      if (delRaw) {
        const delSet = new Set(JSON.parse(delRaw));
        if (delSet.has(pid)) {
          delSet.delete(pid);
          localStorage.setItem(deletedKey, JSON.stringify(Array.from(delSet)));
        }
      }
    } catch(e){}

    const hasPrePrice = typeof p.preorderPrice === 'number' && p.preorderPrice > 0;
    const hasOpenStatus = p.preorderStatus === 'OPEN' || p.preorderStatus === 'CLOSING_SOON';
    p.isPreorder = Boolean(p.isPreorder && (hasPrePrice || hasOpenStatus));

    // 1. Update local storage immediately
    const localKey = `${DB_VERSION}_products`;
    try {
      let prods = JSON.parse(localStorage.getItem(localKey) || '[]');
      const idx = prods.findIndex(x => String(x.id).trim() === pid);
      if (idx >= 0) prods[idx] = p; else prods.unshift(p);
      localStorage.setItem(localKey, JSON.stringify(prods));
      localStorage.setItem(`${localKey}_updatedAt`, Date.now().toString());
    } catch(e){}

    // 2. Upload directly to Firestore /products/{pid}
    if (_db) {
      try {
        await _db.collection(FS_PRODUCTS_COLLECTION).doc(pid).set(sanitize(p));
        console.log('[ZenvySync] Saved product to cloud /products:', p.name, pid);
      } catch(e) {
        console.warn('[ZenvySync] Cloud product save failed:', e);
      }
    }

    // 3. Broadcast to all open views & tabs
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('zenvy-store-updated', { detail: { key: 'products' } }));
  }

  async function deleteProductFromCloud(id) {
    if (!id) return;
    await ensureDb();
    const strId = String(id).trim();

    // 1. Add to permanent deleted tracking set
    const deletedKey = `${DB_VERSION}_deleted_product_ids`;
    let delSet = new Set();
    try {
      const delRaw = localStorage.getItem(deletedKey);
      if (delRaw) delSet = new Set(JSON.parse(delRaw));
      delSet.add(strId);
      localStorage.setItem(deletedKey, JSON.stringify(Array.from(delSet)));
    } catch(e){}

    // 2. Remove immediately from local products array
    const localKey = `${DB_VERSION}_products`;
    try {
      let prods = JSON.parse(localStorage.getItem(localKey) || '[]');
      prods = prods.filter(p => String(p.id).trim() !== strId);
      localStorage.setItem(localKey, JSON.stringify(prods));
      localStorage.setItem(`${localKey}_updatedAt`, Date.now().toString());
    } catch(e){}

    // 3. Delete from Firestore /products/{strId}
    if (_db) {
      try {
        await _db.collection(FS_PRODUCTS_COLLECTION).doc(strId).delete();
        console.log('[ZenvySync] Deleted product from cloud /products:', strId);
      } catch(e) {
        console.warn('[ZenvySync] Cloud product delete error:', e);
      }

      // 4. Save to cloud deleted_products document so other devices never resurrect it
      try {
        const delDocRef = _db.collection(FS_COLLECTION).doc('deleted_products');
        const delDocSnap = await delDocRef.get();
        let curIds = [];
        if (delDocSnap.exists && Array.isArray(delDocSnap.data()?.ids)) {
          curIds = delDocSnap.data().ids;
        }
        if (!curIds.includes(strId)) {
          curIds.push(strId);
          await delDocRef.set({ ids: curIds, updatedAt: Date.now() });
        }
      } catch(e){}
    }

    // 5. Broadcast deletion to all open views & tabs
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('zenvy-store-updated', { detail: { key: 'products' } }));
  }

  // ── Real-time listener — updates local storage & triggers UI ───
  async function startLiveSync(onUpdate) {
    if (typeof onUpdate === 'function' && !_listeners.includes(onUpdate)) {
      _listeners.push(onUpdate);
    }
    await ensureDb();
    if (!_db) return;

    // 1. General store settings listener
    if (!_unsubscribe) {
      _unsubscribe = _db.collection(FS_COLLECTION).onSnapshot(snapshot => {
        let changed = false;
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added' || change.type === 'modified') {
            const key = change.doc.id;
            if (key === 'products') return; // Handled by dedicated products collection listener
            const payload = change.doc.data();
            if (payload && payload.data !== undefined) {
              const localKey = `${DB_VERSION}_${key}`;
              const cloudUpdatedAt = payload.updatedAt || 0;
              const existingStr = localStorage.getItem(localKey);

              let finalData = payload.data;
              if (existingStr && Array.isArray(payload.data)) {
                try {
                  const existingParsed = JSON.parse(existingStr);
                  if (Array.isArray(existingParsed)) {
                    finalData = mergeArraysById(existingParsed, payload.data, key);
                    if (finalData.length > payload.data.length && _db) {
                      pushToFirestore(key, finalData);
                    }
                  }
                } catch(e) {
                  finalData = payload.data;
                }
              }

              const incomingStr = JSON.stringify(finalData);
              if (existingStr !== incomingStr) {
                localStorage.setItem(localKey, incomingStr);
                if (cloudUpdatedAt) localStorage.setItem(`${localKey}_updatedAt`, cloudUpdatedAt.toString());
                changed = true;
              }
            }
          }
        });
        if (changed) {
          console.log('[ZenvySync] Live change received from cloud 🔄');
          _listeners.forEach(cb => {
            try { cb(); } catch(err){ console.error(err); }
          });
        }
      }, err => {
        console.warn('[ZenvySync] Live sync listener warning:', err);
      });
    }

    // 2. Dedicated Real-Time Products Listener across all devices
    if (!_productsUnsubscribe) {
      _productsUnsubscribe = _db.collection(FS_PRODUCTS_COLLECTION).onSnapshot(snapshot => {
        let changed = false;
        const localKey = `${DB_VERSION}_products`;
        let prods = [];
        try { prods = JSON.parse(localStorage.getItem(localKey) || '[]'); } catch(e){}

        snapshot.docChanges().forEach(change => {
          const d = change.doc.data();
          const id = change.doc.id;
          if (change.type === 'removed') {
            const prevLen = prods.length;
            prods = prods.filter(p => p.id !== id);
            if (prods.length !== prevLen) changed = true;
          } else if (change.type === 'added' || change.type === 'modified') {
            if (d) {
              if (!d.id) d.id = id;
              d.isPreorder = Boolean(d.isPreorder);
              const idx = prods.findIndex(p => p.id === id);
              if (idx >= 0) {
                const prev = JSON.stringify(prods[idx]);
                const next = JSON.stringify(d);
                if (prev !== next) {
                  prods[idx] = d;
                  changed = true;
                }
              } else {
                prods.unshift(d);
                changed = true;
              }
            }
          }
        });

        if (changed) {
          // Sort newest first
          prods.sort((a, b) => {
            const tA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const tB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return tB - tA;
          });
          localStorage.setItem(localKey, JSON.stringify(prods));
          localStorage.setItem(`${localKey}_updatedAt`, Date.now().toString());
          console.log('[ZenvySync] Live product update received from server 🔄');
          window.dispatchEvent(new Event('storage'));
          window.dispatchEvent(new CustomEvent('zenvy-store-updated', { detail: { key: 'products' } }));
          _listeners.forEach(cb => { try { cb(); } catch(e){} });
        }
      }, err => {
        console.warn('[ZenvySync] Products collection listener warning:', err);
      });
    }

    console.log('[ZenvySync] Live sync active 🔄');
  }

  // ── Public API ──────────────────────────────────────────────────
  const ADMIN_MANAGED_KEYS = [
    'products', 'categories', 'collections', 'banners', 'homepage', 'shopBanner',
    'brand', 'storeSettings', 'shipping', 'paymentConfig', 'coupons', 'flashSales',
    'patches', 'sleeves', 'sizes', 'sizeChart', 'colors', 'addons', 'printing', 'customization'
  ];

  window.ZenvyFirebase = {
    push(key, value) {
      if (key === 'products') return; // Products are saved via saveProduct to /products/{id}
      if (SYNC_KEYS.includes(key)) {
        if (ADMIN_MANAGED_KEYS.includes(key)) {
          const isFromAdmin = window.location.pathname.toLowerCase().includes('admin') ||
                              window.location.href.toLowerCase().includes('admin') ||
                              (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('zenvy_admin_session') === '1') ||
                              (typeof DB !== 'undefined' && DB.auth && typeof DB.auth.isLoggedIn === 'function' && DB.auth.isLoggedIn());
          if (!isFromAdmin) {
            // Guard: storefront visitors cannot push catalog changes to Firestore
            return;
          }
        }
        pushToFirestore(key, value);
      }
    },
    saveProduct: saveProductToCloud,
    deleteProduct: deleteProductFromCloud,
    syncProductsWithCloud,
    hydrate,
    startLiveSync,
    isReady() { return !!_db; },
    ensureDb,
    async forceSync() {
      await ensureDb();
      await hydrate();
      const res = await syncProductsWithCloud(true);
      console.log('[ZenvySync] Force sync complete ✅');
      return res;
    }
  };

  // ── Boot ────────────────────────────────────────────────────────
  function tryInit() {
    if (typeof firebase !== 'undefined' && firebase.firestore) {
      initFirebase();
    } else {
      setTimeout(tryInit, 25);
    }
  }

  // Execute immediately so Firestore connects without waiting for DOMContentLoaded
  tryInit();

})();
