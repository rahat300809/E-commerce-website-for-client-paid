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
  function initFirebase() {
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

      // Check if Firestore needs initial seeding from localStorage
      checkInitialCloudSeed().then(() => {
        // Automatically hydrate from cloud so other devices immediately get data
        hydrate().then(() => {
          console.log('[ZenvySync] Initial cloud hydration finished ✅');
          // Automatically sync products from dedicated /products/ collection
          syncProductsWithCloud().then(() => {
            console.log('[ZenvySync] Cloud product catalog ready ✅');
          });
        });
      });

      // Automatically activate live sync so updates reflect in real-time
      startLiveSync();

      return true;
    } catch (e) {
      console.error('[ZenvySync] Firebase init failed:', e);
      return false;
    }
  }

  // If cloud Firestore has 0 documents, upload the current local seed
  async function checkInitialCloudSeed() {
    if (!_db) return;
    try {
      const snap = await _db.collection(FS_COLLECTION).limit(1).get();
      if (snap.empty) {
        console.log('[ZenvySync] Cloud database is empty. Uploading initial catalog to Firestore...');
        const batch = _db.batch();
        let uploaded = 0;
        SYNC_KEYS.forEach(key => {
          const raw = localStorage.getItem(`${DB_VERSION}_${key}`);
          if (raw) {
            try {
              const val = JSON.parse(raw);
              const docRef = _db.collection(FS_COLLECTION).doc(key);
              batch.set(docRef, { data: sanitize(val), updatedAt: Date.now() });
              uploaded++;
            } catch {}
          }
        });
        if (uploaded > 0) {
          await batch.commit();
          console.log(`[ZenvySync] Uploaded ${uploaded} initial documents to Firestore cloud ✅`);
        }
      }
    } catch (e) {
      console.warn('[ZenvySync] Initial cloud seed check:', e);
    }
  }

  // ── Write to Firestore (batched & fast flush) ───────────────────
  function flushWriteQueue() {
    if (!_db) return;
    const keysToWrite = { ..._writeQueue };
    _writeQueue = {};

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
        console.warn('[ZenvySync] Firestore write error (re-queuing):', e);
        // Re-queue on failure
        Object.assign(_writeQueue, keysToWrite);
      });
  }

  function pushToFirestore(key, value) {
    _writeQueue[key] = value;
    clearTimeout(_writeTimer);
    if (_db) {
      // Critical catalog and transactional keys flush immediately to prevent navigation race conditions
      if (key === 'products' || key === 'orders' || key === 'categories' || key === 'sleeves' || key === 'preorderHero' || key === 'restockRequests') {
        flushWriteQueue();
      } else {
        _writeTimer = setTimeout(flushWriteQueue, 25);
      }
    }
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
    if (!_db) return;
    try {
      const snapshot = await _db.collection(FS_COLLECTION).get();
      let count = 0;
      if (!snapshot.empty) {
        snapshot.forEach(docSnap => {
          const key = docSnap.id;
          // IMPORTANT: Do NOT hydrate products from the single legacy doc;
          // products are exclusively hydrated from the scalable /products/ collection below!
          if (key === 'products') return;

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
    if (!_db) return { count: 0, uploaded: 0 };
    try {
      // 1. Fetch all individual products from Firestore /products/ collection
      const pSnap = await _db.collection(FS_PRODUCTS_COLLECTION).get();
      let cloudList = [];
      pSnap.forEach(doc => {
        const d = doc.data();
        if (d) {
          if (!d.id) d.id = doc.id;
          // Preorder normalization: only genuine preorders with open status/price are true
          const hasPrePrice = typeof d.preorderPrice === 'number' && d.preorderPrice > 0;
          const hasOpenStatus = d.preorderStatus === 'OPEN' || d.preorderStatus === 'CLOSING_SOON';
          d.isPreorder = Boolean(d.isPreorder && (hasPrePrice || hasOpenStatus));
          cloudList.push(d);
        }
      });

      // 2. Read deleted tracking IDs from storage so deleted products NEVER reappear
      const deletedKey = `${DB_VERSION}_deleted_product_ids`;
      let deletedIds = new Set();
      try {
        const delRaw = localStorage.getItem(deletedKey);
        if (delRaw) deletedIds = new Set(JSON.parse(delRaw));
      } catch(e){}

      // Filter out any known deleted products from cloudList
      if (deletedIds.size > 0) {
        cloudList = cloudList.filter(p => !deletedIds.has(String(p.id).trim()));
      }

      // 3. Read local products on this device
      const localKey = `${DB_VERSION}_products`;
      let localList = [];
      try {
        const raw = localStorage.getItem(localKey);
        if (raw) localList = JSON.parse(raw);
      } catch(e){}
      if (deletedIds.size > 0) {
        localList = localList.filter(p => !deletedIds.has(String(p.id).trim()));
      }

      // 4. Merge: cloudList is master truth.
      // If this device created a brand-new product within the last 5 minutes that hasn't reached cloud yet, preserve it!
      const cloudMap = new Map();
      cloudList.forEach(p => cloudMap.set(String(p.id).trim(), p));

      const now = Date.now();
      const freshLocalItems = localList.filter(p => {
        if (!p || !p.id) return false;
        const pid = String(p.id).trim();
        if (deletedIds.has(pid)) return false;
        if (cloudMap.has(pid)) return false;
        const cTime = new Date(p.createdAt || 0).getTime();
        const uTime = new Date(p.updatedAt || 0).getTime();
        // Keep only if created or updated in this local session within the last 5 minutes
        return (now - cTime < 300000) || (now - uTime < 300000);
      });

      const merged = [...cloudList];
      freshLocalItems.forEach(p => merged.unshift(p));

      // Sort newest first
      merged.sort((a, b) => {
        const tA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const tB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return tB - tA;
      });

      // 5. Update local storage with complete synchronized catalog
      localStorage.setItem(localKey, JSON.stringify(merged));
      localStorage.setItem(`${localKey}_updatedAt`, Date.now().toString());

      // 6. Upload any fresh local products to cloud /products/
      if (freshLocalItems.length > 0) {
        console.log(`[ZenvySync] Uploading ${freshLocalItems.length} fresh local products to cloud...`);
        for (const p of freshLocalItems) {
          try {
            await _db.collection(FS_PRODUCTS_COLLECTION).doc(p.id).set(sanitize(p));
          } catch(err) {
            console.warn('[ZenvySync] Upload error for product:', p.name, err);
          }
        }
      }

      // 7. Dispatch events for instant UI reactivity across storefront and admin
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new CustomEvent('zenvy-store-updated', { detail: { key: 'products' } }));

      return { count: merged.length, uploaded: freshLocalItems.length };
    } catch(err) {
      console.warn('[ZenvySync] syncProductsWithCloud notice:', err);
      return { count: 0, uploaded: 0, error: err };
    }
  }

  async function saveProductToCloud(p) {
    if (!p || !p.id) return;
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

    // 2. Upload to Firestore /products/{pid}
    if (_db) {
      try {
        await _db.collection(FS_PRODUCTS_COLLECTION).doc(pid).set(sanitize(p));
        console.log('[ZenvySync] Saved product to cloud /products:', p.name, pid);
      } catch(e) {
        console.warn('[ZenvySync] Cloud product save failed:', e);
      }

      // Keep legacy summary doc in sync (lightweight)
      try {
        const legDoc = await _db.collection(FS_COLLECTION).doc('products').get();
        let legList = (legDoc.exists && Array.isArray(legDoc.data()?.data)) ? legDoc.data().data : [];
        const lIdx = legList.findIndex(x => String(x.id).trim() === pid);
        const pSummary = { ...p };
        // Prune heavy image for summary
        if (typeof pSummary.image === 'string' && pSummary.image.startsWith('data:image') && pSummary.image.length > 500) {
          pSummary.image = 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80';
        }
        if (lIdx >= 0) legList[lIdx] = pSummary; else legList.unshift(pSummary);
        await _db.collection(FS_COLLECTION).doc('products').set({ data: sanitize(legList), updatedAt: Date.now() });
      } catch(e){}
    }

    // 3. Broadcast to all open views & tabs
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('zenvy-store-updated', { detail: { key: 'products' } }));
  }

  async function deleteProductFromCloud(id) {
    if (!id) return;
    const strId = String(id).trim();

    // 1. Add to permanent deleted tracking set
    const deletedKey = `${DB_VERSION}_deleted_product_ids`;
    try {
      let delSet = new Set();
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

      // 4. Delete from legacy zenvy_store/products doc so it NEVER comes back!
      try {
        const legDoc = await _db.collection(FS_COLLECTION).doc('products').get();
        if (legDoc.exists && Array.isArray(legDoc.data()?.data)) {
          const legList = legDoc.data().data.filter(p => String(p.id).trim() !== strId);
          await _db.collection(FS_COLLECTION).doc('products').set({ data: sanitize(legList), updatedAt: Date.now() });
          console.log('[ZenvySync] Cleaned legacy products document ✅');
        }
      } catch(e){}
    }

    // 5. Broadcast deletion to all open views & tabs
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('zenvy-store-updated', { detail: { key: 'products' } }));
  }
        console.warn('[ZenvySync] Cloud product delete failed:', e);
      }
    }
  }

  // ── Real-time listener — updates local storage & triggers UI ───
  function startLiveSync(onUpdate) {
    if (typeof onUpdate === 'function' && !_listeners.includes(onUpdate)) {
      _listeners.push(onUpdate);
    }
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
    async forceSync() {
      await hydrate();
      await syncProductsWithCloud(true);
      console.log('[ZenvySync] Force sync complete ✅');
    }
  };

  // ── Boot ────────────────────────────────────────────────────────
  function tryInit() {
    if (typeof firebase !== 'undefined' && firebase.firestore) {
      initFirebase();
    } else {
      setTimeout(tryInit, 50);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tryInit);
  } else {
    tryInit();
  }

})();
