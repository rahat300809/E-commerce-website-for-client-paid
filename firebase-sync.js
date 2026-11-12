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

  // Initialize in-memory products cache from localStorage if available
  try {
    const rawProds = localStorage.getItem(`${DB_VERSION}_products`);
    if (rawProds) {
      window._ZENVY_PRODUCTS_CACHE = JSON.parse(rawProds);
    }
  } catch(e){}

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
        // Critical catalog, brand and transactional keys flush immediately to prevent navigation race conditions
        if (key === 'orders' || key === 'categories' || key === 'sleeves' || key === 'preorderHero' || key === 'restockRequests' || key === 'brand' || key === 'storeSettings' || key === 'homepage' || key === 'banners' || key === 'shipping' || key === 'paymentConfig') {
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
      // 1. AUTHORITATIVE PRODUCT HYDRATION FROM /products/ COLLECTION FIRST
      // Ensures product catalog is always hydrated immediately across all devices
      try {
        await syncProductsWithCloud();
      } catch (prodErr) {
        console.warn('[ZenvySync] Product catalog sync notice:', prodErr);
      }

      // 2. Fetch deleted restock IDs so deletions are strictly honored across all devices
      const deletedRestockKey = `${DB_VERSION}_deleted_restock_ids`;
      let deletedRestockIds = new Set();
      try {
        const raw = localStorage.getItem(deletedRestockKey);
        if (raw) deletedRestockIds = new Set(JSON.parse(raw));
      } catch(e){}
      try {
        const delRestockDoc = await _db.collection(FS_COLLECTION).doc('deleted_restocks').get();
        if (delRestockDoc.exists && Array.isArray(delRestockDoc.data()?.ids)) {
          delRestockDoc.data().ids.forEach(id => deletedRestockIds.add(String(id).trim()));
          localStorage.setItem(deletedRestockKey, JSON.stringify(Array.from(deletedRestockIds)));
        }
      } catch(e){}

      const snapshot = await _db.collection(FS_COLLECTION).get();
      let count = 0;
      if (!snapshot.empty) {
        snapshot.forEach(docSnap => {
          try {
            const key = docSnap.id;
            // IMPORTANT: Do NOT hydrate products from the single legacy doc;
            // products are exclusively hydrated from the scalable /products/ collection!
            if (key === 'products' || key === 'deleted_products' || key === 'deleted_restocks') return;

            const payload = docSnap.data();
            if (payload && payload.data !== undefined) {
              const localKey = `${DB_VERSION}_${key}`;
              const cloudUpdatedAt = payload.updatedAt || 0;

              // Restock requests: cloud array is authoritative, filtered against deletedRestockIds
              if (key === 'restockRequests') {
                let list = Array.isArray(payload.data) ? payload.data : [];
                list = list.filter(r => r && r.id && !deletedRestockIds.has(String(r.id).trim()));
                localStorage.setItem(localKey, JSON.stringify(list));
                if (cloudUpdatedAt) {
                  localStorage.setItem(`${localKey}_updatedAt`, cloudUpdatedAt.toString());
                }
                count++;
                return;
              }

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
          } catch(itemErr) {
            console.warn(`[ZenvySync] Key storage notice for ${docSnap.id}:`, itemErr);
          }
        });
      }

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

      function isTestOrJunkProduct(p) {
        if (!p || typeof p !== 'object') return true;
        const name = String(p.name || '').toLowerCase();
        const id = String(p.id || '').toLowerCase();
        const sku = String(p.sku || '').toLowerCase();
        if (name.includes('[test sync]') || name.includes('test sync')) return true;
        if (id === 'prod_876_user' || id === '876' || sku.includes('o887')) return true;
        if (['101','102','103','104','105','106','107','108','109','110','111','112','113','114','115','116'].includes(id)) return true;
        return false;
      }

      // 1. Fetch deleted tracking IDs and /products/ collection IN PARALLEL for maximum speed (<200ms)
      const [delDoc, pSnap] = await Promise.all([
        _db.collection(FS_COLLECTION).doc('deleted_products').get().catch(() => null),
        _db.collection(FS_PRODUCTS_COLLECTION).get().catch(() => null)
      ]);

      if (delDoc && delDoc.exists) {
        const cIds = delDoc.data()?.ids;
        if (Array.isArray(cIds)) {
          cIds.forEach(id => deletedIds.add(String(id).trim()));
          localStorage.setItem(deletedKey, JSON.stringify(Array.from(deletedIds)));
        }
      }
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

      // 4. Authoritative Cloud Catalog Sync
      // Cloud Firestore /products/ collection is the master source of truth across all devices.
      const cloudMap = new Map();
      cloudList.forEach(p => cloudMap.set(String(p.id).trim(), p));

      const toUpload = [];
      // Preserve all valid local products across background and manual syncs
      localList.forEach(p => {
        if (!p || !p.id) return;
        const pid = String(p.id).trim();
        if (deletedIds.has(pid)) return;
        if (isTestOrJunkProduct(p)) return;

        const hasPrePrice = typeof p.preorderPrice === 'number' && p.preorderPrice > 0;
        const hasOpenStatus = p.preorderStatus === 'OPEN' || p.preorderStatus === 'CLOSING_SOON';
        p.isPreorder = Boolean(p.isPreorder && (hasPrePrice || hasOpenStatus));

        if (!cloudMap.has(pid)) {
          toUpload.push(p);
          cloudMap.set(pid, p);
        }
      });

      // Background upload any local products that are not yet in Firestore
      if (toUpload.length > 0 && _db) {
        setTimeout(async () => {
          for (const item of toUpload) {
            try {
              await saveProductToCloud(item);
            } catch(e) {
              console.warn('[ZenvySync] Background upload of local product notice:', item.id, e);
            }
          }
        }, 150);
      }

      const merged = Array.from(cloudMap.values());
      // Sort newest first
      merged.sort((a, b) => {
        const tA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const tB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return tB - tA;
      });

      // 5. Update in-memory cache IMMEDIATELY so all views have instant 0ms access
      window._ZENVY_PRODUCTS_CACHE = merged;

      // 6. Safely update localStorage with QuotaExceededError protection
      try {
        localStorage.setItem(localKey, JSON.stringify(merged));
        localStorage.setItem(`${localKey}_updatedAt`, Date.now().toString());
      } catch (quotaErr) {
        console.warn('[ZenvySync] localStorage quota warning, storing slimmed catalog:', quotaErr);
        try {
          const slimmed = merged.map(p => {
            const cp = { ...p };
            if (cp.sizeChartImage && cp.sizeChartImage.length > 5000) cp.sizeChartImage = '';
            if (cp.imageUrl && cp.image && cp.imageUrl === cp.image) cp.imageUrl = '';
            return cp;
          });
          localStorage.setItem(localKey, JSON.stringify(slimmed));
          localStorage.setItem(`${localKey}_updatedAt`, Date.now().toString());
        } catch(e2) {
          console.warn('[ZenvySync] localStorage fallback write notice:', e2);
        }
      }

      // 7. Upload any manual local additions to Firestore /products/
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

      // 8. Dispatch events for instant UI reactivity across storefront and admin
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
    await ensureDb();
    const pid = String(p.id).trim();

    // Ensure timestamps and status are consistent
    if (!p.createdAt) p.createdAt = new Date().toISOString();
    p.updatedAt = new Date().toISOString();
    if (p.isPublished === undefined) {
      p.isPublished = p.status !== 'draft';
    }
    p.status = p.isPublished ? 'published' : 'draft';

    // Optimize payload before pushing to Firestore
    if (p.sizeChartImage && p.sizeChartImage.length > 50000) {
      p.sizeChartImage = '';
    }
    if (p.imageUrl && p.image && p.imageUrl === p.image) {
      p.imageUrl = '';
    }
    if (Array.isArray(p.images)) {
      p.images = p.images.map(img => {
        if (typeof img === 'string') {
          return { url: img, alt: p.name || '', isPrimary: false };
        }
        if (img && typeof img === 'object') {
          return { url: img.url || '', alt: img.alt || p.name || '', isPrimary: !!img.isPrimary };
        }
        return null;
      }).filter(img => img && typeof img.url === 'string' && img.url.trim().length > 0);
    }

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

    // Update in-memory cache immediately
    if (Array.isArray(window._ZENVY_PRODUCTS_CACHE)) {
      const idx = window._ZENVY_PRODUCTS_CACHE.findIndex(x => String(x.id).trim() === pid);
      if (idx >= 0) window._ZENVY_PRODUCTS_CACHE[idx] = p;
      else window._ZENVY_PRODUCTS_CACHE.unshift(p);
    } else {
      window._ZENVY_PRODUCTS_CACHE = [p];
    }

    // 1. Update local storage immediately with quota safety
    const localKey = `${DB_VERSION}_products`;
    try {
      let prods = JSON.parse(localStorage.getItem(localKey) || '[]');
      const idx = prods.findIndex(x => String(x.id).trim() === pid);
      if (idx >= 0) prods[idx] = p; else prods.unshift(p);
      localStorage.setItem(localKey, JSON.stringify(prods));
      localStorage.setItem(`${localKey}_updatedAt`, Date.now().toString());
    } catch(e) {
      try {
        let prods = window._ZENVY_PRODUCTS_CACHE || [];
        const slimmed = prods.map(item => {
          const cp = { ...item };
          if (cp.sizeChartImage && cp.sizeChartImage.length > 5000) cp.sizeChartImage = '';
          if (cp.imageUrl && cp.image && cp.imageUrl === cp.image) cp.imageUrl = '';
          return cp;
        });
        localStorage.setItem(localKey, JSON.stringify(slimmed));
        localStorage.setItem(`${localKey}_updatedAt`, Date.now().toString());
      } catch(e2){}
    }

    // 2. Upload directly to Firestore /products/{pid} with merge to preserve fields
    if (_db) {
      try {
        await _db.collection(FS_PRODUCTS_COLLECTION).doc(pid).set(sanitize(p), { merge: true });
        console.log('[ZenvySync] Saved product to cloud /products:', p.name, pid);
      } catch(e) {
        console.warn('[ZenvySync] Cloud product save failed:', e);
      }
    }

    // Update signature to avoid self-triggered re-render storms
    try {
      const currentProds = window._ZENVY_PRODUCTS_CACHE || [];
      window._lastProductsSnapshotSignature = currentProds.map(it => `${it.id}_${it.updatedAt || ''}_${it.name || ''}_${it.salePrice || it.basePrice || ''}_${it.stock}_${it.status || ''}_${(it.images && it.images[0] && (it.images[0].url || it.images[0])) || it.image || ''}`).join('|');
    } catch(e){}

    // 3. Broadcast to all open views & tabs
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('zenvy-store-updated', { detail: { key: 'products', isSelf: true } }));
  }

  async function deleteProductFromCloud(id) {
    if (!id) return;
    await ensureDb();
    const strId = String(id).trim();

    if (Array.isArray(window._ZENVY_PRODUCTS_CACHE)) {
      window._ZENVY_PRODUCTS_CACHE = window._ZENVY_PRODUCTS_CACHE.filter(p => String(p.id).trim() !== strId);
    }

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

  async function deleteRestockRequest(id) {
    if (!id) return;
    await ensureDb();
    const strId = String(id).trim();

    // 1. Record in local deleted tracker
    const deletedKey = `${DB_VERSION}_deleted_restock_ids`;
    let delSet = new Set();
    try {
      const delRaw = localStorage.getItem(deletedKey);
      if (delRaw) delSet = new Set(JSON.parse(delRaw));
      delSet.add(strId);
      localStorage.setItem(deletedKey, JSON.stringify(Array.from(delSet)));
    } catch(e){}

    // 2. Remove immediately from local restockRequests array
    const localKey = `${DB_VERSION}_restockRequests`;
    try {
      let items = JSON.parse(localStorage.getItem(localKey) || '[]');
      items = items.filter(r => String(r.id).trim() !== strId);
      localStorage.setItem(localKey, JSON.stringify(items));
      localStorage.setItem(`${localKey}_updatedAt`, Date.now().toString());
    } catch(e){}

    // 3. Save to cloud deleted_restocks document so other devices never resurrect it
    if (_db) {
      try {
        const delDocRef = _db.collection(FS_COLLECTION).doc('deleted_restocks');
        const delDocSnap = await delDocRef.get();
        let curIds = [];
        if (delDocSnap.exists && Array.isArray(delDocSnap.data()?.ids)) {
          curIds = delDocSnap.data().ids;
        }
        if (!curIds.includes(strId)) {
          curIds.push(strId);
          await delDocRef.set({ ids: curIds, updatedAt: Date.now() });
        }
      } catch(e){
        console.warn('[ZenvySync] Cloud deleted_restocks save error:', e);
      }

      // 4. Update Firestore restockRequests doc directly
      try {
        const reqDocRef = _db.collection(FS_COLLECTION).doc('restockRequests');
        const reqDocSnap = await reqDocRef.get();
        if (reqDocSnap.exists && Array.isArray(reqDocSnap.data()?.data)) {
          const remaining = reqDocSnap.data().data.filter(r => String(r.id).trim() !== strId);
          await reqDocRef.set({ data: remaining, updatedAt: Date.now() });
        }
      } catch(e){
        console.warn('[ZenvySync] Cloud restockRequests update error:', e);
      }
    }

    // 5. Broadcast to all open views & tabs
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('zenvy-store-updated', { detail: { key: 'restockRequests' } }));
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
            if (key === 'products' || key === 'deleted_products' || key === 'deleted_restocks') return; // Handled separately
            const payload = change.doc.data();
            if (payload && payload.data !== undefined) {
              const localKey = `${DB_VERSION}_${key}`;
              const cloudUpdatedAt = payload.updatedAt || 0;
              const existingStr = localStorage.getItem(localKey);

              // Restock requests: cloud array is authoritative, filtered against deletedRestockIds (NEVER resurrect deleted items)
              if (key === 'restockRequests') {
                const deletedRestockKey = `${DB_VERSION}_deleted_restock_ids`;
                let deletedRestockIds = new Set();
                try {
                  const raw = localStorage.getItem(deletedRestockKey);
                  if (raw) deletedRestockIds = new Set(JSON.parse(raw));
                } catch(e){}
                let list = Array.isArray(payload.data) ? payload.data : [];
                list = list.filter(r => r && r.id && !deletedRestockIds.has(String(r.id).trim()));
                const incomingStr = JSON.stringify(list);
                if (existingStr !== incomingStr) {
                  localStorage.setItem(localKey, incomingStr);
                  if (cloudUpdatedAt) localStorage.setItem(`${localKey}_updatedAt`, cloudUpdatedAt.toString());
                  changed = true;
                }
                return;
              }

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
        const deletedKey = `${DB_VERSION}_deleted_product_ids`;
        let deletedIds = new Set();
        try {
          const delRaw = localStorage.getItem(deletedKey);
          if (delRaw) deletedIds = new Set(JSON.parse(delRaw));
        } catch(e){}

        const cloudProducts = [];
        snapshot.forEach(docSnap => {
          const d = docSnap.data();
          if (d) {
            if (!d.id) d.id = docSnap.id;
            const pid = String(d.id).trim();
            if (deletedIds.has(pid)) return;
            if (typeof isTestOrJunkProduct === 'function' && isTestOrJunkProduct(d)) {
              try { _db.collection(FS_PRODUCTS_COLLECTION).doc(docSnap.id).delete(); } catch(e){}
              return;
            }
            const hasPrePrice = typeof d.preorderPrice === 'number' && d.preorderPrice > 0;
            const hasOpenStatus = d.preorderStatus === 'OPEN' || d.preorderStatus === 'CLOSING_SOON';
            d.isPreorder = Boolean(d.isPreorder && (hasPrePrice || hasOpenStatus));
            cloudProducts.push(d);
          }
        });

        // MERGE LOGIC: Combine cloud data with existing local catalog so nothing ever vanishes
        const localKey = `${DB_VERSION}_products`;
        let localList = [];
        try {
          const raw = localStorage.getItem(localKey);
          if (raw) localList = JSON.parse(raw);
        } catch(e){}
        if (!Array.isArray(localList) || localList.length === 0) {
          if (Array.isArray(window._ZENVY_PRODUCTS_CACHE) && window._ZENVY_PRODUCTS_CACHE.length > 0) {
            localList = window._ZENVY_PRODUCTS_CACHE;
          }
        }

        const productMap = new Map();
        cloudProducts.forEach(cp => {
          const cId = String(cp.id || '').trim().toLowerCase();
          if (cId) productMap.set(cId, cp);
        });

        if (Array.isArray(localList)) {
          localList.forEach(lp => {
            if (!lp || !lp.id) return;
            const lId = String(lp.id).trim().toLowerCase();
            if (deletedIds.has(String(lp.id).trim()) || deletedIds.has(lId)) return;
            if (typeof isTestOrJunkProduct === 'function' && isTestOrJunkProduct(lp)) return;

            const existingCloud = productMap.get(lId);
            if (!existingCloud) {
              // Local product not yet in cloud: retain it so it never vanishes!
              productMap.set(lId, lp);
              // Asynchronously push to cloud so other devices get it too
              if (_db) {
                try {
                  _db.collection(FS_PRODUCTS_COLLECTION).doc(String(lp.id).trim()).set(sanitize(lp), { merge: true }).catch(() => {});
                } catch(e){}
              }
            } else {
              // Both local and cloud exist: check timestamps
              const tLocal = lp.updatedAt ? new Date(lp.updatedAt).getTime() : 0;
              const tCloud = existingCloud.updatedAt ? new Date(existingCloud.updatedAt).getTime() : 0;
              if (tLocal > tCloud) {
                // Local is newer! Preserve local edits
                productMap.set(lId, { ...existingCloud, ...lp });
              } else {
                // Cloud is equal or newer, but preserve images if cloud lost them
                const cloudHasImg = existingCloud.image || (existingCloud.images && existingCloud.images.length > 0);
                const localHasImg = lp.image || (lp.images && lp.images.length > 0);
                if (!cloudHasImg && localHasImg) {
                  existingCloud.image = lp.image;
                  existingCloud.imageUrl = lp.imageUrl;
                  existingCloud.images = lp.images;
                }
              }
            }
          });
        }

        const mergedProducts = Array.from(productMap.values());
        mergedProducts.sort((a, b) => {
          const tA = (a.createdAt ? new Date(a.createdAt).getTime() : 0) || (a.updatedAt ? new Date(a.updatedAt).getTime() : 0) || 0;
          const tB = (b.createdAt ? new Date(b.createdAt).getTime() : 0) || (b.updatedAt ? new Date(b.updatedAt).getTime() : 0) || 0;
          return tB - tA;
        });

        // Compute stable catalog signature to avoid redundant re-renders and loop thrashing
        const newSig = mergedProducts.map(p => `${p.id}_${p.updatedAt || ''}_${p.name || ''}_${p.salePrice || p.basePrice || ''}_${p.stock}_${p.status || ''}_${(p.images && p.images[0] && (p.images[0].url || p.images[0])) || p.image || ''}`).join('|');
        if (window._lastProductsSnapshotSignature === newSig) {
          // No changes detected! Avoid redundant writes and event storms
          return;
        }
        window._lastProductsSnapshotSignature = newSig;
        window._ZENVY_PRODUCTS_CACHE = mergedProducts;

        try {
          localStorage.setItem(localKey, JSON.stringify(mergedProducts));
          localStorage.setItem(`${localKey}_updatedAt`, Date.now().toString());
        } catch(e) {
          try {
            const slimmed = mergedProducts.map(p => {
              const cp = { ...p };
              if (cp.sizeChartImage && cp.sizeChartImage.length > 5000) cp.sizeChartImage = '';
              if (cp.imageUrl && cp.image && cp.imageUrl === cp.image) cp.imageUrl = '';
              return cp;
            });
            localStorage.setItem(localKey, JSON.stringify(slimmed));
            localStorage.setItem(`${localKey}_updatedAt`, Date.now().toString());
          } catch(e2){}
        }

        console.log(`[ZenvySync] Live product update merged from server 🔄 (${mergedProducts.length} products)`);
        window.dispatchEvent(new Event('storage'));
        window.dispatchEvent(new CustomEvent('zenvy-store-updated', { detail: { key: 'products', source: 'cloud-snapshot' } }));
        _listeners.forEach(cb => { try { cb(); } catch(e){} });
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
    deleteRestockRequest: deleteRestockRequest,
    syncProductsWithCloud,
    hydrate,
    startLiveSync,
    isReady() { return !!_db; },
    ensureDb,
    async forceSync() {
      await ensureDb();
      const res = await syncProductsWithCloud(true);
      await hydrate();
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
