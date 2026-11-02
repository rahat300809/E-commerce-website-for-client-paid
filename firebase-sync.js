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
    'notifConfig', 'telegramConfig', 'patches', 'sleeves', 'sizes', 'colors', 'addons',
    'printing', 'customization', 'teams', 'reviews', 'preorders',
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
      checkInitialCloudSeed();
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

  // ── Write to Firestore (batched & debounced) ───────────────────
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
      _writeTimer = setTimeout(flushWriteQueue, 200);
    }
  }

  // ── Pull data from Firestore into localStorage ─────────────────
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
          const localUpdatedStr = localStorage.getItem(`${localKey}_updatedAt`);
          const localUpdatedAt = localUpdatedStr ? parseInt(localUpdatedStr, 10) : 0;
          const cloudUpdatedAt = payload.updatedAt || 0;

          // Only overwrite local data if cloud payload is strictly newer than local
          // or if local key has never been written
          const hasLocal = localStorage.getItem(localKey) !== null;
          if (!hasLocal || cloudUpdatedAt > localUpdatedAt) {
            localStorage.setItem(localKey, JSON.stringify(payload.data));
            if (cloudUpdatedAt) {
              localStorage.setItem(`${localKey}_updatedAt`, cloudUpdatedAt.toString());
            }
            count++;
          } else if (localUpdatedAt > cloudUpdatedAt) {
            // Local is newer than cloud; push local updates up to Firestore
            try {
              const localVal = JSON.parse(localStorage.getItem(localKey));
              pushToFirestore(key, localVal);
            } catch(e) {}
          }
        }
      });
      console.log(`[ZenvySync] Hydrated ${count} keys from Firestore ✅`);
    } catch (e) {
      console.warn('[ZenvySync] Hydration error (using local storage):', e);
    }
  }

  // ── Real-time listener — updates local storage & triggers UI ───
  function startLiveSync(onUpdate) {
    if (typeof onUpdate === 'function') {
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
            const localUpdatedStr = localStorage.getItem(`${localKey}_updatedAt`);
            const localUpdatedAt = localUpdatedStr ? parseInt(localUpdatedStr, 10) : 0;
            const cloudUpdatedAt = payload.updatedAt || 0;

            const hasLocal = localStorage.getItem(localKey) !== null;
            if (!hasLocal || cloudUpdatedAt >= localUpdatedAt) {
              const incoming = JSON.stringify(payload.data);
              const existing = localStorage.getItem(localKey);
              if (existing !== incoming) {
                localStorage.setItem(localKey, incoming);
                if (cloudUpdatedAt) localStorage.setItem(`${localKey}_updatedAt`, cloudUpdatedAt.toString());
                changed = true;
              }
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
  window.ZenvyFirebase = {
    push(key, value) {
      if (SYNC_KEYS.includes(key)) {
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
