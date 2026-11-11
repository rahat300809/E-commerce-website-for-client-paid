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

  const SYNC_KEYS = [
    'products', 'categories', 'collections', 'banners', 'homepage', 'shopBanner',
    'brand', 'orders', 'customers', 'coupons', 'flashSales',
    'returns', 'refunds', 'shipping', 'paymentConfig', 'storeSettings',
    'notifConfig', 'telegramConfig', 'patches', 'sleeves', 'sizes', 'sizeChart', 'colors', 'addons',
    'printing', 'customization', 'teams', 'reviews', 'preorders', 'preorderHero',
    'inventoryHistory', 'priceHistory', 'activityLog', 'adminAuth',
    'admin_access', 'seeded_version'
  ];

  let _db = null;
  let _unsubscribe = null;
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
      if (key === 'products' || key === 'orders' || key === 'categories' || key === 'sleeves' || key === 'preorderHero') {
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

  function mergeArraysById(localArr, cloudArr) {
    if (!Array.isArray(localArr)) return Array.isArray(cloudArr) ? cloudArr.filter(i => !isDemoItem(i)) : [];
    if (!Array.isArray(cloudArr)) return localArr.filter(i => !isDemoItem(i));

    const map = new Map();
    // 1. Seed with cloud items as baseline (excluding any demo data)
    cloudArr.forEach(item => {
      if (isDemoItem(item)) return;
      if (item && typeof item === 'object') {
        const key = item.id || item.email || item.code || (item.orderNumber ? `ord_${item.orderNumber}` : null);
        map.set(key ? String(key) : JSON.stringify(item), item);
      } else {
        map.set(String(item), item);
      }
    });

    // 2. Intelligently merge local items (preserve all user creations & newer edits)
    localArr.forEach(item => {
      if (isDemoItem(item)) return;
      if (item && typeof item === 'object') {
        const key = item.id || item.email || item.code || (item.orderNumber ? `ord_${item.orderNumber}` : null);
        const mapKey = key ? String(key) : JSON.stringify(item);
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
      } else {
        if (!map.has(String(item))) {
          map.set(String(item), item);
        }
      }
    });

    const res = Array.from(map.values());
    // Auto-sort items with createdAt newest first
    if (res.length > 0 && res[0] && typeof res[0] === 'object' && ('createdAt' in res[0])) {
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
      if (snapshot.empty) {
        console.log('[ZenvySync] Firestore empty on hydration, keeping local data.');
        return;
      }
      let count = 0;
      snapshot.forEach(docSnap => {
        const key = docSnap.id;
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
                finalData = mergeArraysById(localParsed, payload.data);
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
      console.log(`[ZenvySync] Hydrated ${count} keys from Firestore ✅`);
      if (count > 0) {
        try {
          window.dispatchEvent(new Event('storage'));
          window.dispatchEvent(new CustomEvent('zenvy-store-updated', { detail: { key: 'all' } }));
        } catch(e){}
      }
    } catch (e) {
      console.warn('[ZenvySync] Hydration error (using local storage):', e);
    }
  }

  // ── Real-time listener — updates local storage & triggers UI ───
  function startLiveSync(onUpdate) {
    if (typeof onUpdate === 'function' && !_listeners.includes(onUpdate)) {
      _listeners.push(onUpdate);
    }
    if (!_db) return;
    if (_unsubscribe) return; // Already listening

    _unsubscribe = _db.collection(FS_COLLECTION).onSnapshot(snapshot => {
      let changed = false;
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added' || change.type === 'modified') {
          const key = change.doc.id;
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
                  finalData = mergeArraysById(existingParsed, payload.data);
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
    hydrate,
    startLiveSync,
    isReady() { return !!_db; },
    async forceSync() {
      await hydrate();
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
