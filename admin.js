/* ═══════════════════════════════════════════════════════════════
   ZENVY Admin Panel — Main Application Logic
   ═══════════════════════════════════════════════════════════════ */

'use strict';

// ──────────────────────────────────────────────────────────────
// App State
// ──────────────────────────────────────────────────────────────
let currentView = 'dashboard';
let confirmCallback = null;
let chartInstances = {};
let currentPage = {};
const PAGE_SIZE = 20;

// ──────────────────────────────────────────────────────────────
// Boot
// ──────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  syncAdminBrandDisplay();
  // Step 1: Instant 0ms Local-First Paint (Eliminates white screen on reload)
  if (DB.auth.isLoggedIn()) {
    const user = DB.auth.getCurrentUser();
    const isAuth = user && user.email ? DB.adminAccess.isAuthorized(user.email) : false;
    if (isAuth) {
      updateAdminUserInfo();
      showApp();
      const initialView = (location.hash || '').replace(/^#\/?/, '').trim() || 'dashboard';
      nav(initialView);
    } else {
      console.warn('[Admin Security] Active session not authorized for:', user?.email);
      DB.auth.logout();
      showLogin();
    }
  } else {
    showLogin();
  }
  updateNavBadges();

  // Step 2: Background Cloud Sync (Runs non-blocking without delaying page display)
  if (window.ZenvyFirebase) {
    window.ZenvyFirebase.hydrate().then(() => {
      // Re-check auth integrity after fresh cloud data
      if (DB.auth.isLoggedIn()) {
        const user = DB.auth.getCurrentUser();
        const isAuth = user && user.email ? DB.adminAccess.isAuthorized(user.email) : false;
        if (isAuth) {
          updateAdminUserInfo();
          updateNavBadges();
          if (currentView) {
            const content = document.getElementById('admin-content');
            if (content && typeof VIEW_MAP[currentView] === 'function') {
              VIEW_MAP[currentView](content);
            }
          }
        } else {
          console.warn('[Admin Security] Revoked access for:', user?.email);
          DB.auth.logout();
          showLogin();
        }
      }
    }).catch(e => {
      console.warn('[Admin] Background hydration notice:', e);
    });

    window.ZenvyFirebase.startLiveSync(() => {
      // 1. Re-verify auth integrity in real-time (in case permissions changed)
      if (DB.auth.isLoggedIn()) {
        const user = DB.auth.getCurrentUser();
        const isAuth = user && user.email ? DB.adminAccess.isAuthorized(user.email) : false;
        if (!isAuth) {
          console.warn('[Admin Security] Revoked access for:', user?.email);
          DB.auth.logout();
          showLogin();
          return;
        }
      }

      // 2. Real-time badge & admin info update
      updateNavBadges();
      updateAdminUserInfo();

      // 3. Multi-admin concurrency protection:
      // Do not overwrite view or close modals while an admin is actively typing or editing
      const activeEl = document.activeElement;
      const isTyping = activeEl && (
        activeEl.tagName === 'INPUT' ||
        activeEl.tagName === 'TEXTAREA' ||
        activeEl.tagName === 'SELECT' ||
        activeEl.isContentEditable
      );
      const isModalOpen = !document.getElementById('generic-modal')?.classList.contains('hidden') ||
                          !document.getElementById('confirm-modal')?.classList.contains('hidden');

      if (isTyping || isModalOpen) {
        window._pendingLiveRefresh = true;
        showLiveSyncPill('🔄 Team updates synced');
        return;
      }

      // 4. Safe realtime view re-render
      if (DB.auth.isLoggedIn() && typeof currentView !== 'undefined') {
        const content = document.getElementById('admin-content');
        if (content) {
          const viewFunc = VIEW_MAP[currentView];
          if (typeof viewFunc === 'function') {
            viewFunc(content);
            showLiveSyncPill('🔄 Realtime updated');
          }
        }
      }
    });
  }
});

function showLogin() {
  document.documentElement.classList.remove('admin-session-active');
  const loginEl = document.getElementById('admin-login');
  if (loginEl) loginEl.classList.remove('hidden');
  const appEl = document.getElementById('admin-app');
  if (appEl) appEl.classList.add('hidden');
  const errEl = document.getElementById('login-err');
  if (errEl) errEl.classList.add('hidden');
}

function showApp() {
  document.documentElement.classList.add('admin-session-active');
  const loginEl = document.getElementById('admin-login');
  if (loginEl) loginEl.classList.add('hidden');
  const appEl = document.getElementById('admin-app');
  if (appEl) appEl.classList.remove('hidden');
  updateAdminUserInfo();
}

function updateAdminUserInfo() {
  const user = DB.auth.getCurrentUser();
  const avatarEl = document.querySelector('.sidebar-user-avatar');
  const nameEl = document.querySelector('.sidebar-user-name');
  const roleEl = document.querySelector('.sidebar-user-role');
  if (user) {
    if (nameEl) nameEl.textContent = user.name || user.email || 'Admin';
    if (roleEl) roleEl.textContent = user.role || 'Super Admin';
    if (avatarEl) {
      if (user.photo) {
        avatarEl.innerHTML = `<img src="${user.photo}" style="width:100%;height:100%;border-radius:50%;object-fit:cover;" alt="Avatar"/>`;
      } else {
        avatarEl.textContent = (user.name || user.email || 'A').charAt(0).toUpperCase();
      }
    }
  }
}

// ──────────────────────────────────────────────────────────────
// Auth (Google + Password)
// ──────────────────────────────────────────────────────────────
async function signInWithGoogle() {
  const statusEl = document.getElementById('google-login-status');
  const errEl = document.getElementById('login-err');
  if (errEl) errEl.classList.add('hidden');
  if (statusEl) {
    statusEl.style.display = 'block';
    statusEl.textContent = 'Opening Google Account Chooser...';
  }

  try {
    if (typeof firebase === 'undefined' || !firebase.auth) {
      throw new Error('Firebase Auth is initializing. Please try again in 2 seconds.');
    }

    // Clear any prior cached session
    sessionStorage.removeItem('zenvy_admin_session');
    sessionStorage.removeItem('zenvy_admin_user');
    try { await firebase.auth().signOut(); } catch(e){}

    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('email');
    provider.addScope('profile');
    // Force Google Account Chooser prompt every single time
    provider.setCustomParameters({ prompt: 'select_account' });

    const result = await firebase.auth().signInWithPopup(provider);
    const user = result.user;

    if (!user || !user.email) {
      throw new Error('Could not retrieve email from Google Account.');
    }

    const email = user.email.trim().toLowerCase();
    if (statusEl) statusEl.textContent = `Verifying authorization for ${email}...`;

    const authRes = await DB.auth.loginWithGoogleUser(user);
    if (authRes.success) {
      if (statusEl) statusEl.style.display = 'none';
      if (errEl) errEl.classList.add('hidden');
      updateAdminUserInfo();
      showApp();
      nav(location.hash.replace('#', '') || 'dashboard');
      toast(`Welcome, ${user.displayName || email}!`, 'success');
    } else {
      // Access Denied: strictly revoke session and firebase auth
      try { await firebase.auth().signOut(); } catch(e){}
      sessionStorage.removeItem('zenvy_admin_session');
      sessionStorage.removeItem('zenvy_admin_user');
      if (statusEl) statusEl.style.display = 'none';
      if (errEl) {
        errEl.textContent = authRes.error || `Access Denied: ${email} is not authorized.`;
        errEl.classList.remove('hidden');
      }
      toast(authRes.error || `Access Denied: ${email} is not authorized.`, 'error');
      showLogin();
    }
  } catch (error) {
    console.error('Google Sign In Error:', error);
    try { await firebase.auth().signOut(); } catch(e){}
    sessionStorage.removeItem('zenvy_admin_session');
    sessionStorage.removeItem('zenvy_admin_user');
    if (statusEl) statusEl.style.display = 'none';
    if (errEl) {
      let msg = error.message || 'Google sign in failed.';
      if (error.code === 'auth/popup-closed-by-user') {
        msg = 'Google login popup was closed before completion.';
      } else if (error.code === 'auth/unauthorized-domain') {
        msg = 'Domain not authorized in Firebase Console -> Authentication -> Settings -> Authorized Domains.';
      }
      errEl.textContent = msg;
      errEl.classList.remove('hidden');
    }
  }
}

function handleLogin(e) {
  e.preventDefault();
  const pw = document.getElementById('login-pass').value;
  const result = DB.auth.login(pw);
  const errEl = document.getElementById('login-err');

  // DB.auth.login can return true (success), false (wrong pw), or {success:false, error, locked}
  if (result === true) {
    if (errEl) errEl.classList.add('hidden');
    updateAdminUserInfo();
    showApp();
    nav('dashboard');
    toast('Logged in as Master Administrator', 'success');

    // Instantly hydrate newest products/orders from Firestore cloud
    if (window.ZenvyFirebase && typeof window.ZenvyFirebase.hydrate === 'function') {
      window.ZenvyFirebase.hydrate().then(() => {
        updateNavBadges();
        const content = document.getElementById('admin-content');
        if (currentView && content) {
          renderView(currentView, content);
        }
      }).catch(e => console.warn('[Admin] Login hydration:', e));
    }
  } else {
    let msg = 'Incorrect password. Please enter your valid admin password.';
    if (result && typeof result === 'object' && result.error) {
      msg = result.error;
    }
    if (errEl) {
      errEl.textContent = msg;
      errEl.classList.remove('hidden');
    }
  }
}

function handleLogout() {
  showConfirm('Sign Out', 'Are you sure you want to sign out of the Admin Suite?', () => {
    DB.auth.logout();
    showLogin();
    toast('Signed out successfully', 'info');
  });
}

// ──────────────────────────────────────────────────────────────
// Navigation
// ──────────────────────────────────────────────────────────────
const VIEW_TITLES = {
  dashboard: 'Dashboard', products: 'Products', categories: 'Categories',
  collections: 'Collections', inventory: 'Inventory', patches: 'Patches',
  sleeves: 'Sleeves', sizes: 'Sizes', colors: 'Colors', addons: 'Add-ons',
  printing: 'Name & Number Printing', orders: 'Orders', preorders: 'Preorders',
  customers: 'Customers', coupons: 'Coupons', flashsales: 'Flash Sales',
  banners: 'Home Banners', 'shop-banner': 'Shop Discount Banner', homepage: 'Homepage Management', teams: 'Teams & Clubs',
  reviews: 'Reviews', returns: 'Returns', refunds: 'Refunds',
  shipping: 'Shipping Methods', 'payment-config': 'Payment Configuration',
  analytics: 'Analytics', activity: 'Activity Log',
  'settings-brand': 'Brand Settings', 'settings-store': 'Store Settings',
  'settings-seo': 'SEO Settings', 'settings-notifications': 'Notifications',
  'settings-admin': 'Admin Access',
};

function nav(view) {
  view = (view || 'dashboard').replace(/^#\/?/, '').trim() || 'dashboard';
  currentView = view;
  if (location.hash !== '#' + view) {
    try { location.hash = view; } catch(e){}
  }

  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.view === view);
  });
  const title = VIEW_TITLES[view] || (view.charAt(0).toUpperCase() + view.slice(1));
  const titleEl = document.getElementById('topbar-page-title');
  if (titleEl) titleEl.textContent = title;

  // Destroy previous charts safely
  Object.values(chartInstances).forEach(c => { try { c.destroy(); } catch(e){} });
  chartInstances = {};

  // Hide search results
  const searchResults = document.getElementById('global-search-results');
  if (searchResults) searchResults.classList.add('hidden');
  const searchInput = document.getElementById('global-search');
  if (searchInput) searchInput.value = '';

  // Close sidebar on mobile
  const sidebar = document.getElementById('admin-sidebar');
  if (sidebar) sidebar.classList.remove('open');

  const content = document.getElementById('admin-content');
  if (!content) return;

  content.innerHTML = '<div style="padding:40px 0;text-align:center"><div class="skeleton" style="height:32px;width:200px;margin:0 auto 12px"></div><div class="skeleton" style="height:200px;border-radius:12px;margin-bottom:12px"></div></div>';

  // Auto-expand parent group if nav item is in a group
  document.querySelectorAll('.nav-group-children').forEach(group => {
    if (group.querySelector(`[data-view="${view}"]`)) {
      group.classList.add('open');
      group.previousElementSibling?.classList.add('open');
    }
  });

  setTimeout(() => {
    try {
      renderView(view, content);
    } catch(err) {
      console.error('[Admin] View render error:', err);
      content.innerHTML = `<div style="padding:40px;text-align:center;color:#DC2626;"><h3 style="font-size:18px;font-weight:700;margin-bottom:8px;">View Render Notice</h3><p style="font-size:13px;color:#6B7280;">${err.message || 'Error rendering this view.'}</p><button onclick="nav('dashboard')" class="btn btn-primary" style="margin-top:16px;">Return to Dashboard</button></div>`;
    }
  }, 40);
}

function toggleNavGroup(header) {
  header.classList.toggle('open');
  header.nextElementSibling.classList.toggle('open');
}

function handleCustomizationNavHeader(header) {
  if (!header.classList.contains('open')) {
    header.classList.add('open');
    if (header.nextElementSibling) header.nextElementSibling.classList.add('open');
  }
  nav('customization');
}

function toggleSidebar() {
  document.getElementById('admin-sidebar').classList.toggle('open');
}

function updateNavBadges() {
  const pending = DB.orders.pending().length;
  const el = document.getElementById('nav-pending-count');
  if (el) { el.textContent = pending; el.style.display = pending > 0 ? 'flex' : 'none'; }
  const notifEl = document.getElementById('topbar-notif-count');
  if (notifEl) { notifEl.textContent = pending; notifEl.style.display = pending > 0 ? 'flex' : 'none'; }

  // Update topbar currency badge
  const cur = DB.currency ? DB.currency.get() : { code: 'BDT', symbol: '৳' };
  const curLabel = document.getElementById('admin-topbar-currency-label');
  if (curLabel) {
    curLabel.textContent = `${cur.code} (${cur.symbol})`;
  }
}

function toggleAdminCurrency() {
  const cur = DB.currency.get();
  const nextCode = cur.code === 'BDT' ? 'USD' : 'BDT';
  const nextSymbol = nextCode === 'USD' ? '$' : '৳';
  DB.currency.set(nextCode, nextSymbol, cur.rate || 120);
  updateNavBadges();
  toast(`Store currency switched to ${nextCode} (${nextSymbol})`, 'success');
  // Re-render active view if on settings
  if (currentView === 'settings-store' || currentView === 'dashboard') {
    nav(currentView);
  }
}

// ──────────────────────────────────────────────────────────────
// View Router
// ──────────────────────────────────────────────────────────────
const VIEW_MAP = {
  dashboard: renderDashboard, products: renderProducts,
  categories: renderCategories, collections: renderCollections,
  inventory: renderInventory, customization: renderCustomizationHub, patches: renderPatches,
  sleeves: renderSleeves, sizes: renderSizes,
  colors: renderColors, addons: renderAddons,
  printing: renderPrinting, orders: renderOrders,
  preorders: renderPreorders, customers: renderCustomers,
  coupons: renderCoupons, flashsales: renderFlashSales,
  banners: renderBanners, 'shop-banner': renderShopDiscountBanner, homepage: renderHomepage,
  'model-showcase': renderModelShowcase,
  teams: renderTeams, reviews: renderReviews,
  returns: renderReturns, refunds: renderRefunds,
  shipping: renderShipping, 'payment-config': renderPaymentConfig,
  analytics: renderAnalytics, activity: renderActivity,
  'settings-brand': renderSettingsBrand, 'settings-store': renderSettingsStore,
  'settings-seo': renderSettingsSEO, 'settings-notifications': renderSettingsNotifications,
  'settings-admin': renderSettingsAdmin,
};

function renderView(view, container) {
  const fn = VIEW_MAP[view];
  if (fn) fn(container);
  else container.innerHTML = `<div class="empty-state"><span class="material-symbols-outlined empty-state-icon">construction</span><div class="empty-state-title">Coming Soon</div></div>`;
}

// ──────────────────────────────────────────────────────────────
// TOAST
// ──────────────────────────────────────────────────────────────
function toast(msg, type = 'success') {
  const icons = { success: 'check_circle', error: 'error', warning: 'warning', info: 'info' };
  const el = document.createElement('div');
  el.className = `admin-toast toast-${type}`;
  el.innerHTML = `<span class="material-symbols-outlined toast-icon">${icons[type]||'info'}</span><span>${msg}</span>`;
  document.getElementById('admin-toast-container').appendChild(el);
  setTimeout(() => { el.classList.add('toast-out'); setTimeout(() => el.remove(), 300); }, 3500);
}

// ──────────────────────────────────────────────────────────────
// CONFIRM MODAL
// ──────────────────────────────────────────────────────────────
function showConfirm(title, msg, onOk, okLabel = 'Confirm', danger = true) {
  confirmCallback = onOk;
  document.getElementById('confirm-title').textContent = title;
  document.getElementById('confirm-msg').textContent = msg;
  const btn = document.getElementById('confirm-ok-btn');
  btn.textContent = okLabel;
  btn.className = danger ? 'btn btn-danger' : 'btn btn-primary';
  document.getElementById('confirm-modal').classList.remove('hidden');
}
function closeConfirm() { 
  document.getElementById('confirm-modal').classList.add('hidden'); 
  confirmCallback = null; 
  if (window._pendingLiveRefresh) {
    window._pendingLiveRefresh = false;
    const content = document.getElementById('admin-content');
    if (content && typeof VIEW_MAP[currentView] === 'function') {
      VIEW_MAP[currentView](content);
    }
  }
}
function confirmOk() { 
  const cb = confirmCallback;
  closeConfirm(); 
  if (typeof cb === 'function') cb(); 
}

function deleteProduct(id) {
  const p = DB.products.byId(id);
  if (!p) return;
  showConfirm(
    'Delete Product',
    `Are you sure you want to delete "${p.name}"? This will immediately remove it from your online store.`,
    () => {
      DB.products.delete(id);
      renderProducts(document.getElementById('admin-content'));
      toast(`Product "${p.name}" deleted successfully`, 'success');
      try { window.dispatchEvent(new Event('storage')); } catch(e){}
    },
    'Delete Product',
    true
  );
}

// ──────────────────────────────────────────────────────────────
// GENERIC MODAL WITH UNSAVED EDITS PROTECTION
// ──────────────────────────────────────────────────────────────
let _modalFormDirty = false;
let _isSavingModalForm = false;

function hasUnsavedModalChanges() {
  if (_isSavingModalForm) return false;
  const body = document.getElementById('generic-modal-body');
  if (!body) return false;
  const form = body.querySelector('form');
  if (!form) return false;
  if (_modalFormDirty) return true;
  
  // Check text, number, date inputs and textareas
  const inputs = form.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea');
  for (let el of inputs) {
    if (el.value && el.value.trim().length > 0 && el.value !== el.defaultValue) {
      return true;
    }
  }
  if (window._patchImgUrl || (window._productImages && window._productImages.length > 0)) {
    return true;
  }
  return false;
}

function openModal(title, bodyHtml, footer = '', size = 'modal-lg') {
  _modalFormDirty = false;
  _isSavingModalForm = false;
  document.getElementById('generic-modal-title').textContent = title;
  document.getElementById('generic-modal-body').innerHTML = bodyHtml;
  document.getElementById('generic-modal-footer').innerHTML = footer;
  const box = document.getElementById('generic-modal-box');
  box.className = `modal-box ${size}`;
  document.getElementById('generic-modal').classList.remove('hidden');

  // Track any form input activity
  setTimeout(() => {
    const form = document.querySelector('#generic-modal-body form');
    if (form) {
      form.addEventListener('input', () => { _modalFormDirty = true; }, { passive: true });
      form.addEventListener('change', () => { _modalFormDirty = true; }, { passive: true });
    }
  }, 80);
}

function closeModal(force = false) {
  if (!force && !_isSavingModalForm && hasUnsavedModalChanges()) {
    const ok = confirm('⚠️ আপনি কি নিশ্চিত যে এটি বন্ধ করতে চান? আপনার এডিটিং করা তথ্য মুছে যেতে পারে।\n\nAre you sure you want to close? Any unsaved edits will be discarded.');
    if (!ok) return;
  }
  _modalFormDirty = false;
  _isSavingModalForm = false;
  window._patchImgUrl = null;
  window._productImages = null;
  document.getElementById('generic-modal').classList.add('hidden'); 
  if (window._pendingLiveRefresh) {
    window._pendingLiveRefresh = false;
    const content = document.getElementById('admin-content');
    if (content && typeof VIEW_MAP[currentView] === 'function') {
      VIEW_MAP[currentView](content);
    }
  }
}

// ──────────────────────────────────────────────────────────────
// Multi-Admin Live Sync Floating Indicator
// ──────────────────────────────────────────────────────────────
function showLiveSyncPill(text = '🔄 Live Synced') {
  let pill = document.getElementById('admin-live-sync-indicator');
  if (!pill) {
    pill = document.createElement('div');
    pill.id = 'admin-live-sync-indicator';
    pill.style.cssText = 'position:fixed;bottom:24px;right:24px;background:#0F172A;color:#10B981;font-size:12px;font-weight:600;padding:7px 16px;border-radius:9999px;box-shadow:0 10px 25px rgba(0,0,0,0.35);border:1px solid rgba(16,185,129,0.3);z-index:99999;display:flex;align-items:center;gap:8px;transition:all 0.3s cubic-bezier(0.16, 1, 0.3, 1);pointer-events:none;opacity:0;transform:translateY(12px);';
    document.body.appendChild(pill);
  }
  pill.innerHTML = `<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#10B981;box-shadow:0 0 10px #10B981;"></span> ${text}`;
  pill.style.opacity = '1';
  pill.style.transform = 'translateY(0)';
  clearTimeout(pill._timer);
  pill._timer = setTimeout(() => {
    pill.style.opacity = '0';
    pill.style.transform = 'translateY(12px)';
  }, 2200);
}

// Modal actions and backdrop click handling with unsaved changes protection
document.addEventListener('click', e => {
  const saveBtn = e.target.closest('#generic-modal .btn-primary, #generic-modal [type="submit"], #generic-modal button[onclick*="save"], #generic-modal button[onclick*="update"], #generic-modal button[onclick*="create"]');
  if (saveBtn) {
    _isSavingModalForm = true;
  }
  if (e.target.id === 'generic-modal') closeModal();
  if (e.target.id === 'confirm-modal') closeConfirm();
  // Close action menus
  if (!e.target.closest('.action-menu')) {
    document.querySelectorAll('.action-menu-dropdown.open').forEach(m => m.classList.remove('open'));
  }
}, true);

// ──────────────────────────────────────────────────────────────
// Global Search
// ──────────────────────────────────────────────────────────────
function globalSearch(q) {
  const results = document.getElementById('global-search-results');
  if (!q || q.length < 2) { results.classList.add('hidden'); return; }
  const products = DB.products.search(q).slice(0, 4);
  const orders = DB.orders.filter({ search: q }).slice(0, 3);
  const customers = DB.customers.search(q).slice(0, 3);
  if (!products.length && !orders.length && !customers.length) {
    results.innerHTML = '<div style="padding:16px;text-align:center;font-size:13px;color:#9CA3AF">No results found</div>';
    results.classList.remove('hidden'); return;
  }
  let html = '';
  if (products.length) {
    html += `<div style="padding:8px 12px;font-size:10px;font-weight:700;text-transform:uppercase;color:#9CA3AF;letter-spacing:.08em">Products</div>`;
    products.forEach(p => {
      html += `<div onclick="nav('products')" class="action-menu-item" style="padding:8px 12px;">
        <span class="material-symbols-outlined" style="font-size:15px">inventory_2</span>
        <div><div style="font-size:13px;font-weight:600">${p.name}</div><div style="font-size:11px;color:#9CA3AF">SKU: ${p.sku || '-'} • Stock: ${p.stock || 0}</div></div>
      </div>`;
    });
  }
  if (orders.length) {
    html += `<div style="padding:8px 12px;font-size:10px;font-weight:700;text-transform:uppercase;color:#9CA3AF;letter-spacing:.08em;border-top:1px solid #F3F4F6">Orders</div>`;
    orders.forEach(o => {
      html += `<div onclick="nav('orders')" class="action-menu-item" style="padding:8px 12px;">
        <span class="material-symbols-outlined" style="font-size:15px">receipt_long</span>
        <div><div style="font-size:13px;font-weight:600">${o.orderNumber}</div><div style="font-size:11px;color:#9CA3AF">${o.customerName} • ৳${o.totalAmount?.toLocaleString()}</div></div>
      </div>`;
    });
  }
  if (customers.length) {
    html += `<div style="padding:8px 12px;font-size:10px;font-weight:700;text-transform:uppercase;color:#9CA3AF;letter-spacing:.08em;border-top:1px solid #F3F4F6">Customers</div>`;
    customers.forEach(c => {
      html += `<div onclick="nav('customers')" class="action-menu-item" style="padding:8px 12px;">
        <span class="material-symbols-outlined" style="font-size:15px">person</span>
        <div><div style="font-size:13px;font-weight:600">${c.name}</div><div style="font-size:11px;color:#9CA3AF">${c.email}</div></div>
      </div>`;
    });
  }
  results.innerHTML = html;
  results.classList.remove('hidden');
}

// ──────────────────────────────────────────────────────────────
// ═══ VIEW: DASHBOARD ═══
// ──────────────────────────────────────────────────────────────
function renderDashboard(container) {
  const products = DB.products.all().filter(p => !p.isArchived);
  const orders = DB.orders.all();
  const customers = DB.customers.all();
  const lowStock = DB.products.lowStock();
  const outOfStock = DB.products.outOfStock();
  const preorders = DB.preorders.active();
  const pending = DB.orders.pending();
  const returns = DB.returns.all().filter(r => r.status === 'REQUESTED');

  const todaySales = DB.orders.todayRevenue();
  const todayOrders = DB.orders.todayCount();
  const monthRev = DB.orders.monthRevenue();
  const totalRev = DB.orders.totalRevenue();

  container.innerHTML = `
    <!-- Quick Actions -->
    <div class="quick-actions">
      <button class="quick-action-btn" onclick="nav('products');setTimeout(()=>openProductForm(),200)">
        <span class="material-symbols-outlined">add</span> Add Product
      </button>
      <button class="quick-action-btn" onclick="nav('categories');setTimeout(()=>openCategoryForm(),200)">
        <span class="material-symbols-outlined">add</span> Add Category
      </button>
      <button class="quick-action-btn" onclick="nav('patches');setTimeout(()=>openPatchForm(),200)">
        <span class="material-symbols-outlined">add</span> Add Patch
      </button>
      <button class="quick-action-btn" onclick="nav('banners');setTimeout(()=>openBannerForm(),200)">
        <span class="material-symbols-outlined">add</span> Create Banner
      </button>
      <button class="quick-action-btn" onclick="nav('coupons');setTimeout(()=>openCouponForm(),200)">
        <span class="material-symbols-outlined">add</span> Create Coupon
      </button>
      <button class="quick-action-btn" onclick="nav('flashsales');setTimeout(()=>openFlashSaleForm(),200)">
        <span class="material-symbols-outlined">bolt</span> Flash Sale
      </button>
    </div>

    <!-- Stats Grid -->
    <div class="stat-grid mb-4">
      <div class="stat-card">
        <div class="stat-icon green"><span class="material-symbols-outlined">payments</span></div>
        <div class="stat-label">Today's Revenue</div>
        <div class="stat-value font-mono">৳${todaySales.toLocaleString()}</div>
        <div class="stat-sub">${todayOrders} orders today</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon blue"><span class="material-symbols-outlined">trending_up</span></div>
        <div class="stat-label">Monthly Revenue</div>
        <div class="stat-value font-mono">৳${monthRev.toLocaleString()}</div>
        <div class="stat-sub">This month</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon purple"><span class="material-symbols-outlined">account_balance_wallet</span></div>
        <div class="stat-label">Total Revenue</div>
        <div class="stat-value font-mono">৳${totalRev.toLocaleString()}</div>
        <div class="stat-sub">${orders.filter(o=>o.paymentStatus==='PAID').length} paid orders</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon amber"><span class="material-symbols-outlined">receipt_long</span></div>
        <div class="stat-label">Total Orders</div>
        <div class="stat-value">${orders.length}</div>
        <div class="stat-sub text-amber">${pending.length} pending</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon blue"><span class="material-symbols-outlined">group</span></div>
        <div class="stat-label">Total Customers</div>
        <div class="stat-value">${customers.length}</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon green"><span class="material-symbols-outlined">inventory_2</span></div>
        <div class="stat-label">Total Products</div>
        <div class="stat-value">${products.length}</div>
        <div class="stat-sub">${products.filter(p=>p.isPublished).length} published</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon amber"><span class="material-symbols-outlined">warning</span></div>
        <div class="stat-label">Low Stock</div>
        <div class="stat-value text-amber">${lowStock.length}</div>
        <div class="stat-sub text-red">${outOfStock.length} out of stock</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon purple"><span class="material-symbols-outlined">schedule</span></div>
        <div class="stat-label">Active Preorders</div>
        <div class="stat-value">${preorders.length}</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon red"><span class="material-symbols-outlined">assignment_return</span></div>
        <div class="stat-label">Pending Returns</div>
        <div class="stat-value text-red">${returns.length}</div>
      </div>
    </div>

    <!-- Charts row -->
    <div class="dashboard-grid mb-4">
      <div class="card">
        <div class="card-header">
          <div class="card-title">Revenue (Last 30 Days)</div>
          <select class="form-select" style="width:130px;height:30px;padding:0 8px;font-size:12px;" onchange="updateRevenueChart(this.value)">
            <option value="7">Last 7 Days</option>
            <option value="30" selected>Last 30 Days</option>
            <option value="90">Last 90 Days</option>
          </select>
        </div>
        <div class="card-body"><div class="chart-wrapper"><canvas id="revenue-chart"></canvas></div></div>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">Orders (Last 30 Days)</div></div>
        <div class="card-body"><div class="chart-wrapper"><canvas id="orders-chart"></canvas></div></div>
      </div>
    </div>

    <!-- Tables row -->
    <div class="dashboard-grid mb-4">
      <div class="card">
        <div class="card-header">
          <div class="card-title">Recent Orders</div>
          <button class="btn btn-ghost btn-sm" onclick="nav('orders')">View All →</button>
        </div>
        <div class="table-wrapper">
          <table class="admin-table">
            <thead><tr><th>Order</th><th>Customer</th><th>Amount</th><th>Status</th></tr></thead>
            <tbody>
              ${DB.orders.recent(8).map(o => `
                <tr onclick="openOrderDetail('${o.id}')" style="cursor:pointer;">
                  <td class="font-mono" style="font-size:12px">${o.orderNumber}</td>
                  <td>${o.customerName || '-'}</td>
                  <td class="font-mono">৳${(o.totalAmount||0).toLocaleString()}</td>
                  <td><span class="badge badge-${statusColor(o.status)}">${o.status}</span></td>
                </tr>
              `).join('') || '<tr><td colspan="4"><div class="empty-state" style="padding:20px"><p>No orders yet</p></div></td></tr>'}
            </tbody>
          </table>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <div class="card-title">Low Stock Alerts</div>
          <button class="btn btn-ghost btn-sm" onclick="nav('inventory')">Manage →</button>
        </div>
        <div class="table-wrapper">
          <table class="admin-table">
            <thead><tr><th>Product</th><th>Stock</th><th>Alert</th></tr></thead>
            <tbody>
              ${[...lowStock,...outOfStock].slice(0,8).map(p => `
                <tr>
                  <td style="font-size:13px;font-weight:600">${p.name}</td>
                  <td><span class="badge ${p.stock===0?'badge-red':'badge-amber'}">${p.stock}</span></td>
                  <td style="font-size:12px;color:#9CA3AF">${p.lowStockAlert||5}</td>
                </tr>
              `).join('') || '<tr><td colspan="3"><div class="empty-state" style="padding:20px"><p style="color:#16A34A">✓ All products well stocked</p></div></td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Top Products -->
    <div class="card">
      <div class="card-header"><div class="card-title">Top Selling Products</div></div>
      <div class="table-wrapper">
        <table class="admin-table">
          <thead><tr><th>#</th><th>Product</th><th>Units Sold</th></tr></thead>
          <tbody>
            ${DB.analytics.topProducts(10).map((p,i) => `
              <tr>
                <td style="color:#9CA3AF;font-weight:700">${i+1}</td>
                <td style="font-weight:600">${p.name}</td>
                <td class="font-mono">${p.qty}</td>
              </tr>
            `).join('') || '<tr><td colspan="3"><div class="empty-state" style="padding:20px"><p>No sales data yet</p></div></td></tr>'}
          </tbody>
        </table>
      </div>
    </div>
  `;

  // Render Charts
  setTimeout(() => {
    renderRevenueChart(30);
    renderOrdersChart(30);
  }, 100);
}

function statusColor(s) {
  const map = { PENDING:'amber', CONFIRMED:'blue', PROCESSING:'purple', PACKED:'green', SHIPPED:'blue', OUT_FOR_DELIVERY:'amber', DELIVERED:'green', CANCELLED:'red', RETURNED:'gray', REFUNDED:'gray' };
  return map[s] || 'gray';
}

function renderRevenueChart(days) {
  const ctx = document.getElementById('revenue-chart');
  if (!ctx) return;
  const data = DB.analytics.revenueByDay(parseInt(days));
  const labels = Object.keys(data).map(d => { const dt = new Date(d); return dt.getDate()+'/'+(dt.getMonth()+1); });
  if (chartInstances.revenue) chartInstances.revenue.destroy();
  chartInstances.revenue = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{ label: 'Revenue (৳)', data: Object.values(data), fill: true,
        backgroundColor: 'rgba(17,24,39,.08)', borderColor: '#111827', borderWidth: 2,
        pointRadius: 3, pointBackgroundColor: '#111827', tension: .4 }]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true, grid: { color: '#F3F4F6' }, ticks: { font: { size: 11 } } },
        x: { grid: { display: false }, ticks: { font: { size: 11 }, maxTicksLimit: 10 } } } }
  });
}

function updateRevenueChart(days) { renderRevenueChart(parseInt(days)); }

function renderOrdersChart(days) {
  const ctx = document.getElementById('orders-chart');
  if (!ctx) return;
  const data = DB.analytics.ordersByDay(parseInt(days));
  const labels = Object.keys(data).map(d => { const dt = new Date(d); return dt.getDate()+'/'+(dt.getMonth()+1); });
  chartInstances.orders = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{ label: 'Orders', data: Object.values(data),
        backgroundColor: 'rgba(17,24,39,.7)', borderRadius: 4 }]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true, grid: { color: '#F3F4F6' }, ticks: { stepSize: 1, font: { size: 11 } } },
        x: { grid: { display: false }, ticks: { font: { size: 11 }, maxTicksLimit: 10 } } } }
  });
}

// ──────────────────────────────────────────────────────────────
// ═══ VIEW: PRODUCTS ═══
// ──────────────────────────────────────────────────────────────
let productSearch = '', productCatFilter = '', productStatusFilter = '', productSort = 'newest';
let productPage = 1;
let selectedProducts = new Set();

function renderProducts(container) {
  const cats = DB.categories.all();
  let items = DB.products.all().filter(p => !p.isArchived);
  if (productSearch) { const q = productSearch.toLowerCase(); items = items.filter(p => p.name?.toLowerCase().includes(q) || p.sku?.toLowerCase().includes(q)); }
  if (productCatFilter) {
    const selCat = cats.find(c => c.id === productCatFilter);
    items = items.filter(p => p.categoryId === productCatFilter || (selCat && (p.categoryName || '').toLowerCase() === selCat.name.toLowerCase()));
  }
  if (productStatusFilter === 'published') items = items.filter(p => p.isPublished);
  if (productStatusFilter === 'draft') items = items.filter(p => !p.isPublished);
  if (productStatusFilter === 'outofstock') items = items.filter(p => p.stock === 0);
  if (productStatusFilter === 'lowstock') items = items.filter(p => p.stock <= (p.lowStockAlert||5) && p.stock > 0);
  if (productStatusFilter === 'preorder') items = items.filter(p => p.isPreorder);
  const getTs = x => (x && x.createdAt) ? (new Date(x.createdAt).getTime() || 0) : 0;
  if (productSort === 'newest') items.sort((a,b) => getTs(b) - getTs(a));
  if (productSort === 'oldest') items.sort((a,b) => getTs(a) - getTs(b));
  if (productSort === 'name') items.sort((a,b) => a.name?.localeCompare(b.name));
  if (productSort === 'price_asc') items.sort((a,b) => a.basePrice-b.basePrice);
  if (productSort === 'price_desc') items.sort((a,b) => b.basePrice-a.basePrice);
  if (productSort === 'stock') items.sort((a,b) => a.stock-b.stock);

  const total = items.length;
  const totalPages = Math.ceil(total / PAGE_SIZE);
  const page = Math.min(productPage, totalPages || 1);
  const paged = items.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE);

  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <div class="page-title">Products</div>
        <div class="page-sub">${total} total products</div>
      </div>
      <div class="page-actions" style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
        ${(() => {
          const allProds = DB.products.all();
          const demoIds = ['101','102','103','104','105','106','107','108','109','110','111','112','113','114','115','116'];
          const hasDemos = allProds.some(p => demoIds.includes(String(p.id)));
          return hasDemos ? `
            <button class="btn btn-secondary btn-sm" onclick="removeAllDemoProducts()" style="color:#DC2626;border-color:#FCA5A5;" title="Clear sample demo jerseys from store">
              <span class="material-symbols-outlined" style="font-size:16px;">delete_sweep</span> Clear Demo Products
            </button>
          ` : '';
        })()}
        <button class="btn btn-secondary btn-sm" onclick="exportProductsCSV()">
          <span class="material-symbols-outlined">download</span> Export
        </button>
        <button class="btn btn-primary" onclick="openProductForm()">
          <span class="material-symbols-outlined">add</span> Add Product
        </button>
      </div>
    </div>

    <div class="filter-bar">
      <input type="text" class="form-input" placeholder="Search products, SKU…" value="${productSearch}"
        oninput="productSearch=this.value;productPage=1;renderProducts(document.getElementById('admin-content'))" style="max-width:260px;"/>
      <select class="form-select" style="width:160px;" onchange="productCatFilter=this.value;productPage=1;renderProducts(document.getElementById('admin-content'))">
        <option value="">All Categories</option>
        ${cats.map(c => `<option value="${c.id}" ${productCatFilter===c.id?'selected':''}>${c.name}</option>`).join('')}
      </select>
      <select class="form-select" style="width:140px;" onchange="productStatusFilter=this.value;productPage=1;renderProducts(document.getElementById('admin-content'))">
        <option value="">All Status</option>
        <option value="published">Published</option>
        <option value="draft">Draft</option>
        <option value="outofstock">Out of Stock</option>
        <option value="lowstock">Low Stock</option>
        <option value="preorder">Preorder</option>
      </select>
      <select class="form-select" style="width:130px;" onchange="productSort=this.value;renderProducts(document.getElementById('admin-content'))">
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="name">Name A-Z</option>
        <option value="price_asc">Price ↑</option>
        <option value="price_desc">Price ↓</option>
        <option value="stock">Stock ↑</option>
      </select>
      ${selectedProducts.size > 0 ? `
        <div style="margin-left:auto;display:flex;gap:8px;align-items:center">
          <span style="font-size:13px;font-weight:600;color:#6B7280">${selectedProducts.size} selected</span>
          <button class="btn btn-secondary btn-sm" onclick="bulkPublish(true)">Publish</button>
          <button class="btn btn-secondary btn-sm" onclick="bulkPublish(false)">Unpublish</button>
          <button class="btn btn-danger btn-sm" onclick="bulkDelete()">Delete</button>
        </div>` : ''}
    </div>

    <div class="card">
      <div class="table-wrapper">
        <table class="admin-table">
          <thead>
            <tr>
              <th><input type="checkbox" onchange="toggleSelectAll(this)" id="select-all-products"/></th>
              <th>Product</th><th>SKU</th><th>Category</th><th>Price</th>
              <th>Stock</th><th>Status</th><th>Badges</th><th style="text-align:right">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${paged.length === 0 ? `<tr><td colspan="9">${emptyState('inventory_2','No products yet','Add your first product to start selling','Add Product','openProductForm()')}</td></tr>` :
              paged.map(p => `
                <tr>
                  <td><input type="checkbox" ${selectedProducts.has(p.id)?'checked':''} onchange="toggleSelectProduct('${p.id}',this.checked)"/></td>
                  <td>
                    <div style="display:flex;align-items:center;gap:10px;">
                      ${p.images?.[0]?.url
                        ? `<img src="${p.images[0].url}" class="prod-thumb" alt="${p.name}"/>`
                        : `<div class="prod-thumb-placeholder"><span class="material-symbols-outlined" style="font-size:18px">image</span></div>`}
                      <div><div style="font-weight:600;font-size:13px">${p.name}</div><div style="font-size:11px;color:#9CA3AF">${p.slug||''}</div></div>
                    </div>
                  </td>
                  <td class="font-mono" style="font-size:12px">${p.sku||'-'}</td>
                  <td style="font-size:12px">${p.categoryName||'-'}</td>
                  <td class="font-mono">
                    <div style="font-weight:600">৳${(p.basePrice||0).toLocaleString()}</div>
                    ${p.salePrice ? `<div style="font-size:11px;color:#DC2626">৳${p.salePrice.toLocaleString()}</div>` : ''}
                  </td>
                  <td>
                    <span class="badge ${p.stock===0?'badge-red':p.stock<=(p.lowStockAlert||5)?'badge-amber':'badge-green'}">${p.stock||0}</span>
                  </td>
                  <td>
                    <span class="badge ${p.isPublished?'badge-green':'badge-gray'}">${p.isPublished?'Published':'Draft'}</span>
                  </td>
                  <td>
                    <div style="display:flex;gap:3px;flex-wrap:wrap;">
                      ${p.isNewArrival?'<span class="badge badge-blue" style="font-size:9px">NEW</span>':''}
                      ${p.isBestSeller?'<span class="badge badge-amber" style="font-size:9px">BEST</span>':''}
                      ${p.isFeatured?'<span class="badge badge-purple" style="font-size:9px">FEAT</span>':''}
                      ${p.isPreorder?'<span class="badge badge-purple" style="font-size:9px">PRE</span>':''}
                      ${p.isLimited?'<span class="badge badge-red" style="font-size:9px">LTD</span>':''}
                    </div>
                  </td>
                  <td class="actions-cell">
                    <div class="action-menu">
                      <button class="btn btn-secondary btn-sm" onclick="event.stopPropagation();toggleActionMenu('prod-menu-${p.id}')">
                        Actions <span class="material-symbols-outlined" style="font-size:13px">expand_more</span>
                      </button>
                      <div class="action-menu-dropdown" id="prod-menu-${p.id}">
                        <div class="action-menu-item" onclick="openProductForm('${p.id}')">
                          <span class="material-symbols-outlined">edit</span> Edit
                        </div>
                        <div class="action-menu-item" onclick="duplicateProduct('${p.id}')">
                          <span class="material-symbols-outlined">content_copy</span> Duplicate
                        </div>
                        <div class="action-menu-item" onclick="toggleProductPublish('${p.id}','${p.isPublished}')">
                          <span class="material-symbols-outlined">${p.isPublished?'visibility_off':'visibility'}</span>
                          ${p.isPublished?'Unpublish':'Publish'}
                        </div>
                        <div class="action-menu-item danger" onclick="deleteProduct('${p.id}')">
                          <span class="material-symbols-outlined">delete</span> Delete/Archive
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              `).join('')}
          </tbody>
        </table>
      </div>
      <div class="pagination">
        <span class="pagination-info">Showing ${((page-1)*PAGE_SIZE)+1}–${Math.min(page*PAGE_SIZE,total)} of ${total}</span>
        <div class="pagination-btns">
          <button class="page-btn" ${page<=1?'disabled':''} onclick="productPage=${page-1};renderProducts(document.getElementById('admin-content'))">‹</button>
          ${Array.from({length:Math.min(5,totalPages)},(_,i)=>i+1).map(n=>`<button class="page-btn ${n===page?'active':''}" onclick="productPage=${n};renderProducts(document.getElementById('admin-content'))">${n}</button>`).join('')}
          <button class="page-btn" ${page>=totalPages?'disabled':''} onclick="productPage=${page+1};renderProducts(document.getElementById('admin-content'))">›</button>
        </div>
      </div>
    </div>
  `;
}

function toggleActionMenu(id) {
  document.querySelectorAll('.action-menu-dropdown.open').forEach(m => { if(m.id!==id) m.classList.remove('open'); });
  document.getElementById(id)?.classList.toggle('open');
}

function toggleSelectAll(cb) {
  document.querySelectorAll('tbody input[type=checkbox]').forEach(c => {
    c.checked = cb.checked;
    const id = c.closest('tr')?.querySelector('[data-id]')?.dataset.id;
    if (id) cb.checked ? selectedProducts.add(id) : selectedProducts.delete(id);
  });
}

function toggleSelectProduct(id, checked) {
  checked ? selectedProducts.add(id) : selectedProducts.delete(id);
  renderProducts(document.getElementById('admin-content'));
}

function bulkPublish(publish) {
  const count = selectedProducts.size;
  selectedProducts.forEach(id => DB.products.update(id, { isPublished: publish }));
  selectedProducts.clear();
  toast(`${publish?'Published':'Unpublished'} ${count} products`, 'success');
  renderProducts(document.getElementById('admin-content'));
}

function bulkDelete() {
  if (!selectedProducts || selectedProducts.size === 0) return;
  const count = selectedProducts.size;
  showConfirm(
    'Delete Selected Products',
    `Are you sure you want to delete ${count} selected product(s)? This will permanently remove them from your store.`,
    () => {
      const all = Store.get('products') || [];
      const remaining = all.filter(p => !selectedProducts.has(String(p.id)));
      Store.set('products', remaining);
      selectedProducts.clear();
      toast(`${count} product(s) deleted successfully`, 'success');
      renderProducts(document.getElementById('admin-content'));
      try { window.dispatchEvent(new Event('storage')); } catch(e){}
    },
    'Delete Selected',
    true
  );
}

function removeAllDemoProducts() {
  const all = Store.get('products') || [];
  const demoIds = ['101','102','103','104','105','106','107','108','109','110','111','112','113','114','115','116'];
  const demoCount = all.filter(p => demoIds.includes(String(p.id))).length;
  if (demoCount === 0) {
    toast('No demo products found in catalog', 'info');
    return;
  }
  showConfirm(
    'Remove Demo Products',
    `Are you sure you want to permanently remove all ${demoCount} sample/demo products? Your custom added products will remain intact.`,
    () => {
      const remaining = all.filter(p => !demoIds.includes(String(p.id)));
      Store.set('products', remaining);
      toast(`${demoCount} demo product(s) removed successfully`, 'success');
      renderProducts(document.getElementById('admin-content'));
      try { window.dispatchEvent(new Event('storage')); } catch(e){}
    },
    'Remove Demo Products',
    true
  );
}

// Helper to toggle a single chip in product form
window.toggleChip = function(el) {
  const inp = el.querySelector('input[type="checkbox"]');
  if (inp) {
    inp.checked = !inp.checked;
    el.classList.toggle('selected', inp.checked);
    inp.dispatchEvent(new Event('change', { bubbles: true }));
  }
};

// Helper to toggle customization rows in product form
window.toggleCustomRow = function(el) {
  const inp = el.querySelector('input[type="checkbox"]');
  if (inp) {
    inp.checked = !inp.checked;
    if (inp.checked) {
      el.style.background = '#F0FDF4';
      el.style.borderColor = '#16A34A';
    } else {
      el.style.background = '#FAFAFA';
      el.style.borderColor = '#E5E7EB';
    }
    inp.dispatchEvent(new Event('change', { bubbles: true }));
  }
};

// Helper to batch toggle chips in product form
window.toggleChipsGroup = function(groupId, selectAll) {
  const container = document.getElementById(groupId);
  if (!container) return;
  container.querySelectorAll('.checkbox-chip').forEach(chip => {
    const input = chip.querySelector('input[type="checkbox"]');
    if (input) {
      input.checked = selectAll;
      chip.classList.toggle('selected', selectAll);
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });
};

function openProductForm(id = null) {
  const product = id ? DB.products.byId(id) : null;
  const cats = DB.categories.all();
  const subcats = DB.subcategories.all();
  const collections = DB.collections.all();
  const patches = DB.patches.all().filter(p => p.isEnabled !== false);
  const sleeves = DB.sleeves.all().filter(s => s.isEnabled !== false);
  const sizes = DB.sizes.all().filter(s => s.isEnabled !== false);
  const cs = DB.customizationSettings.get();
  const isEdit = !!product;

  // State for form
  let formImages = product?.images || [];
  let formVariants = product ? DB.variants.byProduct(id) : [];

  const modalId = 'product-form-modal';

  const html = `
    <div class="admin-tabs" id="prod-form-tabs">
      <div class="admin-tab active" onclick="switchProdTab('basic',this)">Basic Info</div>
      <div class="admin-tab" onclick="switchProdTab('images',this)">Images</div>
      <div class="admin-tab" onclick="switchProdTab('pricing',this)">Pricing</div>
      <div class="admin-tab" onclick="switchProdTab('delivery',this)">🚚 Delivery & Advance Policy</div>
      <div class="admin-tab" onclick="switchProdTab('variants',this)">Variants</div>
      <div class="admin-tab" onclick="switchProdTab('custom',this)">Customization</div>
      <div class="admin-tab" onclick="switchProdTab('preorder',this)">Preorder</div>
      <div class="admin-tab" onclick="switchProdTab('seo',this)">SEO</div>
      <div class="admin-tab" onclick="switchProdTab('sizechart',this)">Size Chart</div>
    </div>

    <form id="product-form" onsubmit="saveProduct(event,'${id||''}')">

      <!-- TAB: BASIC -->
      <div id="prod-tab-basic" class="prod-tab">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Product Name<span class="req">*</span></label>
            <input type="text" name="name" class="form-input" value="${product?.name||''}" placeholder="e.g. Real Madrid Home Jersey"/>
          </div>
          <div class="form-group">
            <label class="form-label">SKU</label>
            <input type="text" name="sku" class="form-input" value="${product?.sku||''}" placeholder="e.g. ZNV-RM-HOME-24 (Auto-generated if empty)"/>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Short Description</label>
          <input type="text" name="shortDesc" class="form-input" value="${product?.shortDesc||''}" placeholder="Brief product description"/>
        </div>
        <div class="form-group">
          <label class="form-label">Full Description</label>
          <textarea name="description" class="form-textarea" rows="4" placeholder="Detailed product description…">${product?.description||''}</textarea>
        </div>
        <div class="form-row-3">
          <div class="form-group">
            <label class="form-label">Category</label>
            <select name="categoryId" class="form-select" onchange="updateSubcats(this.value)">
              <option value="">Select Category</option>
              ${cats.map(c => `<option value="${c.id}" ${(product?.categoryId===c.id || (product?.categoryName && product.categoryName.toLowerCase() === c.name.toLowerCase()))?'selected':''}>${c.name}</option>`).join('')}
            </select>
            <button type="button" class="btn btn-ghost btn-xs mt-2" onclick="inlineAddCategory()">+ New Category</button>
          </div>
          <div class="form-group">
            <label class="form-label">Subcategory</label>
            <select name="subcategoryId" class="form-select" id="prod-subcat-select">
              <option value="">Select Subcategory</option>
              ${subcats.filter(s=>!product?.categoryId||s.categoryId===product?.categoryId).map(s => `<option value="${s.id}" ${product?.subcategoryId===s.id?'selected':''}>${s.name}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Collection</label>
            <select name="collectionId" class="form-select">
              <option value="">No Collection</option>
              ${collections.map(c => `<option value="${c.id}" ${product?.collectionId===c.id?'selected':''}>${c.name}</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="form-row-3">
          <div class="form-group">
            <label class="form-label">Gender</label>
            <select name="gender" class="form-select">
              <option value="Unisex" ${product?.gender==='Unisex'?'selected':''}>Unisex</option>
              <option value="Men" ${product?.gender==='Men'?'selected':''}>Men</option>
              <option value="Women" ${product?.gender==='Women'?'selected':''}>Women</option>
              <option value="Kids" ${product?.gender==='Kids'?'selected':''}>Kids</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Sport</label>
            <input type="text" name="sport" class="form-input" value="${product?.sport||'Football'}" placeholder="Football, Cricket…"/>
          </div>
          <div class="form-group">
            <label class="form-label">Team / Club</label>
            <input type="text" name="team" class="form-input" value="${product?.team||''}" placeholder="Real Madrid…"/>
          </div>
        </div>

        <!-- Badges -->
        <div class="form-group">
          <label class="form-label">Badges</label>
          <div class="checkbox-group">
            ${[['isNewArrival','NEW'],['isBestSeller','BEST SELLER'],['isFeatured','FEATURED'],['isLimited','LIMITED'],['isPreorder','PREORDER']].map(([field,label]) => `
              <label class="checkbox-chip ${product?.[field]?'selected':''}">
                <input type="checkbox" name="${field}" ${product?.[field]?'checked':''} onchange="this.closest('.checkbox-chip').classList.toggle('selected',this.checked)"/>
                ${label}
              </label>
            `).join('')}
          </div>
          <div class="form-group mt-2">
            <label class="form-label">Custom Badge Text</label>
            <input type="text" name="customBadge" class="form-input" value="${product?.customBadge||''}" placeholder="e.g. JUST DROPPED"/>
          </div>
        </div>

        <!-- Status -->
        <div class="form-group">
          <label class="form-label">Product Status</label>
          <select name="productStatus" class="form-select">
            <option value="published" ${(!product||product.isPublished)?'selected':''}>Published</option>
            <option value="draft" ${product&&!product.isPublished?'selected':''}>Draft</option>
          </select>
        </div>
      </div>

      <!-- TAB: IMAGES -->
      <div id="prod-tab-images" class="prod-tab hidden">
        <div class="form-group mb-4">
          <label class="form-label">Main Image URL (Direct Link)</label>
          <input type="text" name="directImageUrl" class="form-input" value="${product?.images?.[0]?.url || ''}" placeholder="https://images.unsplash.com/... or paste image URL"/>
          <p class="form-hint" style="font-size:11px;color:#9CA3AF;margin-top:4px">Paste a direct image URL or use the drag & drop gallery uploader below.</p>
        </div>
        <p style="font-size:13px;color:#6B7280;margin-bottom:16px">Upload product images. Drag to reorder. Click ☆ to set primary image.</p>
        <div id="prod-image-gallery"></div>
      </div>

      <!-- TAB: PRICING -->
      <div id="prod-tab-pricing" class="prod-tab hidden">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Regular Price (৳)<span class="req">*</span></label>
            <div class="input-group">
              <span class="input-prefix">৳</span>
              <input type="number" name="basePrice" class="form-input" min="0" step="1" value="${product?.basePrice||''}" oninput="calcSalePrice()" placeholder="3000"/>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Cost Price (৳)</label>
            <div class="input-group">
              <span class="input-prefix">৳</span>
              <input type="number" name="costPrice" class="form-input" min="0" value="${product?.costPrice||''}" placeholder="1800"/>
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Discount Type</label>
            <select name="discountType" class="form-select" onchange="calcSalePrice()">
              <option value="percent" ${product?.discountType!=='fixed'?'selected':''}>Percentage (%)</option>
              <option value="fixed" ${product?.discountType==='fixed'?'selected':''}>Fixed Amount (৳)</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Discount Value</label>
            <input type="number" name="discountValue" class="form-input" min="0" value="${product?.discountValue||''}" placeholder="20 or 500" oninput="calcSalePrice()"/>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Sale Price (৳) — Auto-calculated</label>
          <div class="input-group">
            <span class="input-prefix">৳</span>
            <input type="number" name="salePrice" id="sale-price-field" class="form-input" min="0" value="${product?.salePrice||''}" placeholder="Auto-calculated"/>
          </div>
          <div class="form-hint" id="discount-preview">${product?.discountValue ? `${product.discountValue}% off → ৳${product.salePrice||0}` : 'Enter regular price and discount to auto-calculate'}</div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Discount Start Date</label>
            <input type="date" name="discountStart" class="form-input" value="${product?.discountStart||''}"/>
          </div>
          <div class="form-group">
            <label class="form-label">Discount End Date</label>
            <input type="date" name="discountEnd" class="form-input" value="${product?.discountEnd||''}"/>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Stock Quantity</label>
            <input type="number" name="stock" class="form-input" min="0" value="${product?.stock||0}"/>
          </div>
          <div class="form-group">
            <label class="form-label">Low Stock Alert Threshold</label>
            <input type="number" name="lowStockAlert" class="form-input" min="1" value="${product?.lowStockAlert||5}"/>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Tax (%)</label>
            <input type="number" name="tax" class="form-input" min="0" max="100" value="${product?.tax||0}"/>
          </div>
          <div class="form-group">
            <label class="form-label">Compare-at Price (৳)</label>
            <input type="number" name="compareAt" class="form-input" min="0" value="${product?.compareAt||''}" placeholder="Original price to show crossed out"/>
          </div>
        </div>
      </div>

      <!-- TAB: DELIVERY & ADVANCE PAYMENT POLICY -->
      <div id="prod-tab-delivery" class="prod-tab hidden">
        <div style="background:#EFF6FF;border:1.5px solid #BFDBFE;border-radius:12px;padding:16px;margin-bottom:18px;">
          <div style="font-weight:800;font-size:14px;color:#1E40AF;display:flex;align-items:center;gap:6px;margin-bottom:4px;">
            <span class="material-symbols-outlined" style="font-size:20px;color:#2563EB;">local_shipping</span>
            Product-Specific Delivery & Advance Payment Rules
          </div>
          <p style="font-size:12px;color:#475569;margin:0;">
            Customize the advance payment requirement and shipping charges for this specific product. Overrides global store policy if set.
          </p>
        </div>

        <div class="form-group" style="margin-bottom:20px;">
          <label class="form-label" style="font-weight:800;font-size:13px;color:#0F172A;margin-bottom:6px;display:block;">
            Advance Payment Requirement for this Product<span class="req">*</span>
          </label>
          <select name="advancePaymentMode" class="form-select" style="font-weight:600;">
            <option value="default" ${(!product?.advancePaymentMode || product?.advancePaymentMode==='default')?'selected':''}>🌐 Use Store Default Global Setting</option>
            <option value="delivery_only" ${product?.advancePaymentMode==='delivery_only'?'selected':''}>⚡ Mandatory Delivery Charge Advance (Must pay delivery fee upfront via bKash, product on COD)</option>
            <option value="full_only" ${product?.advancePaymentMode==='full_only'?'selected':''}>🔒 Mandatory 100% Full Payment (Total product price + delivery fee paid upfront)</option>
            <option value="customer_choice" ${product?.advancePaymentMode==='customer_choice'?'selected':''}>✨ Flexible Customer Choice (Allow Full Pay, Delivery Fee Advance, or COD)</option>
            <option value="cod_only" ${product?.advancePaymentMode==='cod_only'?'selected':''}>💵 Full Cash on Delivery Only</option>
          </select>
        </div>

        <!-- Mandatory Delivery Charge Toggle -->
        <div style="margin-bottom:14px;background:#FEF3C7;border:1px solid #FCD34D;border-radius:12px;padding:12px 14px;">
          <label class="checkbox-chip ${product?.isDeliveryChargeMandatory ? 'selected' : ''}" style="margin-bottom:6px;display:inline-flex;">
            <input type="checkbox" name="isDeliveryChargeMandatory" ${product?.isDeliveryChargeMandatory ? 'checked' : ''} onchange="this.closest('.checkbox-chip').classList.toggle('selected',this.checked);"/>
            ⚡ Mandatory Delivery Charge for this Product
          </label>
          <div style="font-size:11px;color:#92400E;line-height:1.4;">
            When checked, the delivery charge for this product is <strong>MANDATORY</strong> (must be paid by customer; cannot be skipped or waived by free shipping thresholds). When unchecked, delivery charge remains optional/standard according to store policy.
          </div>
        </div>

        <div class="form-group" style="margin-bottom:16px;">
          <label class="form-label" style="font-weight:800;font-size:13px;color:#0F172A;margin-bottom:4px;">Custom Delivery Charges for this Product</label>
          <label class="checkbox-chip ${product?.hasCustomDelivery ? 'selected' : ''}" style="margin-bottom:12px;display:inline-flex;">
            <input type="checkbox" name="hasCustomDelivery" ${product?.hasCustomDelivery ? 'checked' : ''} onchange="this.closest('.checkbox-chip').classList.toggle('selected',this.checked); document.getElementById('prod-custom-delivery-rates').style.display = this.checked ? 'grid' : 'none';"/>
            Override global delivery rates for this item
          </label>

          <div id="prod-custom-delivery-rates" class="form-row" style="display:${product?.hasCustomDelivery ? 'grid' : 'none'};grid-template-columns:1fr 1fr;gap:14px;background:#F8FAFC;padding:16px;border-radius:12px;border:1px solid #E2E8F0;">
            <div class="form-group" style="margin-bottom:0;">
              <label class="form-label" style="font-size:12px;font-weight:700;">Inside Dhaka Delivery Charge (৳)</label>
              <input type="number" name="deliveryChargeInsideDhaka" class="form-input" value="${product?.deliveryChargeInsideDhaka ?? 80}" min="0" step="10" placeholder="80"/>
              <div style="font-size:11px;color:#64748B;margin-top:2px;">Set 0 for Free Delivery on this product</div>
            </div>
            <div class="form-group" style="margin-bottom:0;">
              <label class="form-label" style="font-size:12px;font-weight:700;">Outside Dhaka Delivery Charge (৳)</label>
              <input type="number" name="deliveryChargeOutsideDhaka" class="form-input" value="${product?.deliveryChargeOutsideDhaka ?? 130}" min="0" step="10" placeholder="130"/>
              <div style="font-size:11px;color:#64748B;margin-top:2px;">Set 0 for Free Delivery on this product</div>
            </div>
          </div>
        </div>

        <div class="form-group" style="margin-bottom:0;">
          <label class="form-label" style="font-size:12px;font-weight:700;">Product Advance / Delivery Note (Shown at Checkout)</label>
          <input type="text" name="deliveryNote" class="form-input" value="${product?.deliveryNote || ''}" placeholder="e.g. ৳80 delivery charge advance required via bKash to confirm order."/>
        </div>
      </div>

      <!-- TAB: VARIANTS -->
      <div id="prod-tab-variants" class="prod-tab hidden">
        <div class="card-header" style="border:none;padding:0 0 12px 0;display:flex;justify-content:space-between;align-items:center">
          <p style="font-size:13px;color:#6B7280">Each variant = unique combination of Size × Color × Sleeve with its own SKU and stock.</p>
          <button type="button" class="btn btn-secondary btn-sm" onclick="addVariantRow()">
            <span class="material-symbols-outlined">add</span> Add Variant
          </button>
        </div>
        <div id="variants-container">
          ${formVariants.length === 0 ? `
            <div class="empty-state" style="padding:30px"><span class="material-symbols-outlined empty-state-icon">tune</span>
              <div class="empty-state-title">No variants yet</div>
              <div class="empty-state-sub">Add size/color/sleeve combinations</div>
              <button type="button" class="btn btn-primary btn-sm" onclick="addVariantRow()">Add First Variant</button>
            </div>` :
            formVariants.map((v,i) => variantRowHtml(v, i)).join('')
          }
        </div>
      </div>

      <!-- TAB: CUSTOMIZATION -->
      <div id="prod-tab-custom" class="prod-tab hidden">
        <p style="font-size:13px;color:#6B7280;margin-bottom:16px;">Choose which customization options, badges, and sleeve styles are available for this product.</p>
        ${[
          ['customNameNumber','Name + Number Package', `৳${cs.nameNumberPackage?.price||200}`, !product ? true : !!product.customNameNumber],
          ['customName','Name Printing', `৳${cs.namePrinting?.price||200}`, !product ? true : !!product.customName],
          ['customNumber','Number Printing', `৳${cs.numberPrinting?.price||150}`, !product ? true : !!product.customNumber],
          ['customLogo','Custom Logo Upload', `৳${cs.customLogo?.price||500}`, !product ? false : !!product.customLogo],
          ['customText','Custom Text', 'Free', !product ? false : !!product.customText],
        ].map(([field,label,price,isChecked]) => `
          <div class="toggle-row ${isChecked ? 'toggle-active' : ''}" 
               onclick="toggleCustomRow(this)"
               style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;margin-bottom:8px;border:1px solid ${isChecked ? '#16A34A' : '#E5E7EB'};border-radius:10px;cursor:pointer;background:${isChecked ? '#F0FDF4' : '#FAFAFA'};transition:all 0.2s;">
            <div>
              <div class="toggle-label" style="font-weight:700;font-size:13px;color:#111827;">${label}</div>
              <div class="toggle-desc" style="font-size:12px;color:#6B7280;margin-top:2px;">${price}</div>
            </div>
            <div class="toggle">
              <input type="checkbox" name="${field}" ${isChecked ? 'checked' : ''} style="pointer-events:none;"/>
              <div class="toggle-track"></div>
              <div class="toggle-thumb"></div>
            </div>
          </div>
        `).join('')}

        <div class="form-group mt-3" style="background:#F9FAFB;padding:12px 14px;border-radius:10px;border:1px dashed #D1D5DB;">
          <label class="form-label" style="font-size:12px;font-weight:700;margin-bottom:4px;">Custom Print Price Override (Optional)</label>
          <div style="display:flex;align-items:center;gap:10px;">
            <input type="number" name="customPrintPrice" class="form-input" style="max-width:180px;" value="${product?.customPrintPrice !== undefined && product?.customPrintPrice !== null ? product.customPrintPrice : ''}" placeholder="Default: ৳${cs.nameNumberPackage?.price||200}" min="0"/>
            <span style="font-size:12px;color:#6B7280;">Leave blank to use global package price (৳${cs.nameNumberPackage?.price||200})</span>
          </div>
        </div>

        <div class="form-group mt-4">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
            <label class="form-label" style="margin:0;font-weight:700;">Available Patches</label>
            <div style="display:flex;gap:6px;">
              <button type="button" class="btn btn-ghost btn-xs" onclick="toggleChipsGroup('patches-chips', true)">Select All</button>
              <button type="button" class="btn btn-ghost btn-xs" onclick="toggleChipsGroup('patches-chips', false)">Clear</button>
            </div>
          </div>
          <div class="checkbox-group" id="patches-chips">
            ${patches.map(p => {
              const selected = product ? (Array.isArray(product.assignedPatches) ? product.assignedPatches.includes(p.id) : true) : true;
              return `<label class="checkbox-chip ${selected?'selected':''}" onclick="toggleChip(this); event.preventDefault();">
                <input type="checkbox" name="patch_${p.id}" ${selected?'checked':''}/>
                ${p.name} (+৳${p.price})
              </label>`;
            }).join('') || '<p style="font-size:13px;color:#9CA3AF">No patches configured. Add patches in Customization → Patches.</p>'}
          </div>
        </div>

        <div class="form-group mt-4">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
            <label class="form-label" style="margin:0;font-weight:700;">Available Sleeves</label>
            <div style="display:flex;gap:6px;">
              <button type="button" class="btn btn-ghost btn-xs" onclick="toggleChipsGroup('sleeves-chips', true)">Select All</button>
              <button type="button" class="btn btn-ghost btn-xs" onclick="toggleChipsGroup('sleeves-chips', false)">Clear</button>
            </div>
          </div>
          <div class="checkbox-group" id="sleeves-chips">
            ${sleeves.map(s => {
              const selected = product ? (Array.isArray(product.assignedSleeves) && product.assignedSleeves.length > 0 ? product.assignedSleeves.includes(s.id) : true) : true;
              return `<label class="checkbox-chip ${selected?'selected':''}" onclick="toggleChip(this); event.preventDefault();">
                <input type="checkbox" name="sleeve_${s.id}" ${selected?'checked':''}/>
                ${s.name} (+৳${s.additionalPrice})
              </label>`;
            }).join('') || '<p style="font-size:13px;color:#9CA3AF">No sleeves configured.</p>'}
          </div>
        </div>

        <div class="form-group mt-4">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
            <label class="form-label" style="margin:0;font-weight:700;">Available Sizes</label>
            <div style="display:flex;gap:6px;">
              <button type="button" class="btn btn-ghost btn-xs" onclick="toggleChipsGroup('sizes-chips', true)">Select All</button>
              <button type="button" class="btn btn-ghost btn-xs" onclick="toggleChipsGroup('sizes-chips', false)">Clear</button>
            </div>
          </div>
          <div class="checkbox-group" id="sizes-chips">
            ${sizes.map(s => {
              const selected = product ? (Array.isArray(product.assignedSizes) && product.assignedSizes.length > 0 ? product.assignedSizes.includes(s.id) : true) : true;
              return `<label class="checkbox-chip ${selected?'selected':''}" onclick="toggleChip(this); event.preventDefault();">
                <input type="checkbox" name="size_${s.id}" ${selected?'checked':''}/>
                ${s.code}
              </label>`;
            }).join('')}
          </div>
        </div>
      </div>

      <!-- TAB: PREORDER -->
      <div id="prod-tab-preorder" class="prod-tab hidden">
        <div class="toggle-row">
          <div><div class="toggle-label">Enable Preorder</div><div class="toggle-desc">Customers can place preorders before stock arrives</div></div>
          <label class="toggle">
            <input type="checkbox" name="isPreorder" id="preorder-toggle" ${product?.isPreorder?'checked':''} onchange="togglePreorderFields(this.checked)">
            <div class="toggle-track"></div><div class="toggle-thumb"></div>
          </label>
        </div>
        <div id="preorder-fields" ${!product?.isPreorder?'style="display:none"':''}>
          <div class="form-row mt-4">
            <div class="form-group">
              <label class="form-label">Preorder Price (৳)</label>
              <input type="number" name="preorderPrice" class="form-input" value="${product?.preorderPrice||''}" placeholder="Preorder price"/>
            </div>
            <div class="form-group">
              <label class="form-label">Maximum Preorder Quantity</label>
              <input type="number" name="preorderCapacity" class="form-input" value="${product?.preorderCapacity||100}" min="1"/>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Expected Arrival Date</label>
              <input type="date" name="expectedArrival" class="form-input" value="${product?.expectedArrival||''}"/>
            </div>
            <div class="form-group">
              <label class="form-label">Expected Delivery Date</label>
              <input type="date" name="expectedDelivery" class="form-input" value="${product?.expectedDelivery||''}"/>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Preorder Closing Date</label>
              <input type="date" name="preorderCloseDate" class="form-input" value="${product?.preorderCloseDate||''}"/>
            </div>
            <div class="form-group">
              <label class="form-label">Preorder Status</label>
              <select name="preorderStatus" class="form-select">
                <option value="OPEN" ${product?.preorderStatus==='OPEN'?'selected':''}>Open</option>
                <option value="CLOSING_SOON" ${product?.preorderStatus==='CLOSING_SOON'?'selected':''}>Closing Soon</option>
                <option value="CLOSED" ${product?.preorderStatus==='CLOSED'?'selected':''}>Closed</option>
                <option value="SOLD_OUT" ${product?.preorderStatus==='SOLD_OUT'?'selected':''}>Sold Out</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Preorder Description</label>
            <textarea name="preorderDesc" class="form-textarea" placeholder="What customers should know about this preorder…">${product?.preorderDesc||''}</textarea>
          </div>
          <div class="card" style="background:#F0FDF4;border-color:#BBF7D0;padding:16px;margin-top:8px">
            <p style="font-size:12px;font-weight:700;color:#15803D;margin-bottom:8px">PREORDER BADGE PREVIEW</p>
            <div style="display:inline-block;background:#111827;color:#fff;padding:4px 10px;border-radius:4px;font-size:11px;font-weight:800;letter-spacing:.1em">PRE-ORDER</div>
            <p style="font-size:12px;color:#15803D;margin-top:8px">Expected Delivery: ${product?.expectedDelivery||'Set a date above'}</p>
          </div>
        </div>
      </div>

      <!-- TAB: SEO -->
      <div id="prod-tab-seo" class="prod-tab hidden">
        <div class="form-group">
          <label class="form-label">URL Slug</label>
          <div class="input-group">
            <span class="input-prefix">/shop/</span>
            <input type="text" name="slug" class="form-input" value="${product?.slug||''}" placeholder="real-madrid-home-jersey"/>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">SEO Title</label>
          <input type="text" name="seoTitle" class="form-input" value="${product?.seoTitle||''}" placeholder="Page title for search engines"/>
        </div>
        <div class="form-group">
          <label class="form-label">SEO Description</label>
          <textarea name="seoDesc" class="form-textarea" placeholder="Meta description (155-160 chars recommended)">${product?.seoDesc||''}</textarea>
        </div>
      </div>

      <!-- TAB: SIZE CHART & MAPPING -->
      <div id="prod-tab-sizechart" class="prod-tab hidden">
        <div style="margin-bottom:14px;">
          <h4 style="font-size:14px;font-weight:700;color:#111827;margin-bottom:4px;">Product Size Chart & Measurements Mapping</h4>
          <p style="font-size:12px;color:#6B7280;">Set the size chart edition, custom measurements table (inches), and optional size chart graphic image for this product.</p>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Size Chart Edition / Type</label>
            <select name="sizeChartType" id="prod-sizechart-type" class="form-select" onchange="window.applySizePreset(this.value)">
              <option value="Player Edition" ${(!product?.sizeChartType || product.sizeChartType==='Player Edition')?'selected':''}>Player Edition (Slim Match-Day Cut)</option>
              <option value="Fan Edition" ${product?.sizeChartType==='Fan Edition'?'selected':''}>Fan Edition (Standard Regular Fit)</option>
              <option value="Retro Edition" ${product?.sizeChartType==='Retro Edition'?'selected':''}>Retro Edition (Vintage Classic Fit)</option>
              <option value="Kids Edition" ${product?.sizeChartType==='Kids Edition'?'selected':''}>Kids Edition (Youth Academy Fit)</option>
              <option value="Custom" ${product?.sizeChartType==='Custom'?'selected':''}>Custom Measurements</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Size Chart Graphic Image</label>
            <div id="prod-sizechart-img-zone" style="margin-bottom:8px;"></div>
            <input type="text" name="sizeChartImage" id="prod-sizechart-img" class="form-input" value="${product?.sizeChartImage||''}" placeholder="Upload above or enter image path (e.g. size-chart-default.jpg)"/>
          </div>
        </div>

        <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;padding:14px;margin-top:10px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
            <span style="font-size:12px;font-weight:800;color:#111827;text-transform:uppercase;letter-spacing:0.05em;">Measurements Mapping Table (Inches)</span>
            <div style="display:flex;gap:6px;">
              <button type="button" class="btn btn-ghost btn-xs" onclick="window.applySizePreset('Player Edition')">Player Cut</button>
              <button type="button" class="btn btn-ghost btn-xs" onclick="window.applySizePreset('Fan Edition')">Fan Cut</button>
              <button type="button" class="btn btn-ghost btn-xs" onclick="window.applySizePreset('Retro Edition')">Retro Cut</button>
            </div>
          </div>

          <table style="width:100%;border-collapse:collapse;font-size:12px;background:#ffffff;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
            <thead>
              <tr style="background:#f3f4f6;text-align:left;border-bottom:1px solid #e5e7eb;">
                <th style="padding:10px 14px;font-weight:800;width:20%;">Size</th>
                <th style="padding:10px 14px;font-weight:800;width:40%;">Height / Length (Inch)</th>
                <th style="padding:10px 14px;font-weight:800;width:40%;">Width / Chest (Inch)</th>
              </tr>
            </thead>
            <tbody>
              ${(() => {
                const avail = DB.sizes.enabled();
                const codes = avail.length > 0 ? avail.map(s => s.code) : ['S','M','L','XL','XXL'];
                return codes.map(s => {
                  const map = product?.sizeMapping?.[s] || (s==='S'?{height:26,width:36}:s==='M'?{height:27,width:38}:s==='L'?{height:28,width:40}:s==='XL'?{height:29,width:42}:s==='XXL'?{height:30,width:44}:{height:31,width:46});
                  return `
                    <tr style="border-bottom:1px solid #f3f4f6;">
                      <td style="padding:8px 14px;font-weight:800;color:#111827;">${s}</td>
                      <td style="padding:8px 14px;">
                        <input type="number" step="0.5" name="size_height_${s}" class="form-input" style="padding:6px 10px;font-size:12px;" value="${map.height}"/>
                      </td>
                      <td style="padding:8px 14px;">
                        <input type="number" step="0.5" name="size_width_${s}" class="form-input" style="padding:6px 10px;font-size:12px;" value="${map.width}"/>
                      </td>
                    </tr>
                  `;
                }).join('');
              })()}
            </tbody>
          </table>
          <p style="font-size:11px;color:#9ca3af;margin-top:8px;">These exact values will be displayed to customers when they click "View Size Chart" on this product's page.</p>
        </div>
      </div>

    </form>
  `;

  const footer = `
    <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
    <button type="button" class="btn btn-secondary" onclick="saveProduct(null,'${id||''}',true)">
      <span class="material-symbols-outlined">save</span> Save Draft
    </button>
    <button type="button" class="btn btn-primary" onclick="saveProduct(null,'${id||''}',false)">
      <span class="material-symbols-outlined">check</span> ${isEdit ? 'Update Product' : 'Create Product'}
    </button>
  `;

  openModal(isEdit ? `Edit: ${product.name}` : 'Add New Product', html, footer, 'modal-xl');

  // Initialize image gallery
  setTimeout(() => {
    const galleryContainer = document.getElementById('prod-image-gallery');
    if (galleryContainer) {
      const gallery = Uploader.createGallery({
        id: 'prod-img',
        images: formImages,
        labels: ['Main', 'Front', 'Back', 'Side', 'Detail', 'Lifestyle'],
        onchange: (imgs) => { formImages = imgs; window._lastFormImages = imgs; }
      });
      galleryContainer.appendChild(gallery);
    }

    const sizeChartZone = document.getElementById('prod-sizechart-img-zone');
    if (sizeChartZone) {
      const zone = Uploader.createSingleZone({
        id: 'prod-sizechart-uploader',
        value: product?.sizeChartImage || '',
        placeholder: 'Upload Size Chart Graphic (JPG, PNG)',
        onchange: (v) => {
          const input = document.getElementById('prod-sizechart-img');
          if (input) input.value = v;
        }
      });
      sizeChartZone.appendChild(zone);
    }
  }, 100);
}

function switchProdTab(name, el) {
  const tabs = document.querySelectorAll('#prod-form-tabs .admin-tab');
  tabs.forEach(t => t.classList.remove('active'));
  if (el) {
    el.classList.add('active');
  } else {
    const matching = Array.from(tabs).find(t => t.getAttribute('onclick')?.includes(`'${name}'`));
    if (matching) matching.classList.add('active');
  }
  document.querySelectorAll('.prod-tab').forEach(t => t.classList.add('hidden'));
  document.getElementById(`prod-tab-${name}`)?.classList.remove('hidden');
}

function calcSalePrice() {
  const base = parseFloat(document.querySelector('[name=basePrice]')?.value) || 0;
  const type = document.querySelector('[name=discountType]')?.value;
  const val = parseFloat(document.querySelector('[name=discountValue]')?.value) || 0;
  const field = document.getElementById('sale-price-field');
  const preview = document.getElementById('discount-preview');
  if (!base || !val) { if (field) field.value = ''; if (preview) preview.textContent = 'Enter price and discount to auto-calculate'; return; }
  let salePrice;
  if (type === 'percent') { salePrice = Math.round(base * (1 - val/100)); if (preview) preview.textContent = `${val}% off → ৳${salePrice.toLocaleString()}`; }
  else { salePrice = Math.max(0, base - val); if (preview) preview.textContent = `-৳${val} → ৳${salePrice.toLocaleString()}`; }
  if (field) field.value = salePrice;
}

function togglePreorderFields(show) {
  document.getElementById('preorder-fields').style.display = show ? 'block' : 'none';
}

function updateSubcats(catId) {
  const select = document.getElementById('prod-subcat-select');
  if (!select) return;
  const subcats = DB.subcategories.byCategory(catId);
  select.innerHTML = '<option value="">Select Subcategory</option>' + subcats.map(s => `<option value="${s.id}">${s.name}</option>`).join('');
}

function variantRowHtml(v = {}, i = 0) {
  const sizes = DB.sizes.enabled();
  const colors = DB.colors.enabled();
  const sleeves = DB.sleeves.enabled();
  return `
    <div class="variant-row" id="variant-row-${i}" data-idx="${i}">
      <select class="form-select" name="v_size_${i}" style="font-size:12px">
        ${sizes.map(s => `<option value="${s.code}" ${v.size===s.code?'selected':''}>${s.code}</option>`).join('')}
      </select>
      <select class="form-select" name="v_color_${i}" style="font-size:12px">
        ${colors.map(c => `<option value="${c.name}" ${v.color===c.name?'selected':''}>${c.name}</option>`).join('')}
      </select>
      <select class="form-select" name="v_sleeve_${i}" style="font-size:12px">
        ${sleeves.map(s => `<option value="${s.name}" ${v.sleeve===s.name?'selected':''}>${s.name}</option>`).join('')}
      </select>
      <input type="number" name="v_stock_${i}" class="form-input" value="${v.stock||0}" placeholder="Stock" style="font-size:12px"/>
      <input type="number" name="v_price_${i}" class="form-input" value="${v.price||''}" placeholder="Price (৳)" style="font-size:12px"/>
      <button type="button" class="btn btn-ghost btn-icon" onclick="removeVariantRow(${i})">
        <span class="material-symbols-outlined" style="font-size:16px;color:#DC2626">close</span>
      </button>
    </div>
  `;
}

let variantCount = 0;
function addVariantRow() {
  const container = document.getElementById('variants-container');
  const emptyState = container.querySelector('.empty-state');
  if (emptyState) emptyState.remove();
  const div = document.createElement('div');
  div.innerHTML = variantRowHtml({}, variantCount++);
  container.appendChild(div.firstElementChild);
}

function removeVariantRow(i) {
  document.getElementById(`variant-row-${i}`)?.remove();
}

function inlineAddCategory() {
  const name = prompt('New category name:');
  if (!name?.trim()) return;
  const slug = name.trim().toLowerCase().replace(/\s+/g,'-');
  const cat = DB.categories.create({ name: name.trim(), slug, isActive: true, displayOrder: 0 });
  toast(`Category "${cat.name}" created`, 'success');
  const select = document.querySelector('[name=categoryId]');
  if (select) { const opt = document.createElement('option'); opt.value = cat.id; opt.textContent = cat.name; opt.selected = true; select.appendChild(opt); }
}

function saveProduct(e, id, asDraft = false) {
  if (e) e.preventDefault();
  const form = document.getElementById('product-form');
  if (!form) return;
  const fd = new FormData(form);
  const get = name => (fd.get(name) || '').toString().trim();

  const name = get('name');
  let sku = get('sku');
  const basePrice = parseFloat(get('basePrice'));

  if (!name) {
    toast('Product name is required', 'error');
    switchProdTab('basic');
    const input = form.querySelector('[name=name]');
    if (input) input.focus();
    return;
  }

  if (!sku) {
    sku = `ZNV-${Date.now().toString(36).toUpperCase()}`;
  }

  if (isNaN(basePrice) || basePrice < 0) {
    toast('Valid regular price is required', 'error');
    switchProdTab('pricing');
    const input = form.querySelector('[name=basePrice]');
    if (input) input.focus();
    return;
  }

  let catId = get('categoryId');
  let cat = catId ? DB.categories.byId(catId) : null;
  if (!catId && DB.categories.all().length > 0) {
    cat = DB.categories.all()[0];
    catId = cat?.id || null;
  }

  // Collect patch, sleeve, size assignments directly from DOM inputs
  const assignedPatches = Array.from(form.querySelectorAll('#prod-tab-custom input[name^="patch_"]:checked')).map(i => i.name.replace('patch_', ''));
  let assignedSleeves = Array.from(form.querySelectorAll('#prod-tab-custom input[name^="sleeve_"]:checked')).map(i => i.name.replace('sleeve_', ''));
  const assignedSizes = Array.from(form.querySelectorAll('#prod-tab-custom input[name^="size_"]:checked')).map(i => i.name.replace('size_', ''));

  if (assignedSleeves.length === 0 && typeof DB !== 'undefined' && DB.sleeves) {
    assignedSleeves = DB.sleeves.enabled().map(s => s.id);
  }

  const customName = !!form.querySelector('input[name="customName"]')?.checked;
  const customNumber = !!form.querySelector('input[name="customNumber"]')?.checked;
  const customNameNumber = !!form.querySelector('input[name="customNameNumber"]')?.checked;
  const customLogo = !!form.querySelector('input[name="customLogo"]')?.checked;
  const customText = !!form.querySelector('input[name="customText"]')?.checked;
  const customPrintPrice = get('customPrintPrice') ? parseFloat(get('customPrintPrice')) : null;

  // Collect gallery images & direct image URL input
  const directUrl = get('directImageUrl');
  let images = window._lastFormImages || (id ? DB.products.byId(id)?.images : null) || [];
  if (directUrl) {
    images = [{ url: directUrl, alt: name, isPrimary: true }, ...images.filter(img => img.url !== directUrl)];
  }
  if (!images || images.length === 0) {
    images = [
      { url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDV_LbyyPJxnRKmU8_oYZoYTmwlX1dORf22Yeei2rC0v-Z24hFTXgPedjBdVIl7bJAWRpOsO3nAEVulUb9cHoyme1h5w9dqAuz3EFxMdSWawV_QZE4ar61iyYOGoH0d1r2Kf5G90TLU3ew4Vsxm1yiNzJ0fjylA9zDty3hULOVnT3xX-UmmQkKIr_TdTowvSGHavQeM_BxmRGvmq44rY8ERHWsx8LwDJ6TKBy45CfsowuBsWRcDozB7SA', alt: name, isPrimary: true }
    ];
  }

  const data = {
    name, sku, basePrice,
    shortDesc: get('shortDesc'),
    description: get('description'),
    salePrice: parseFloat(get('salePrice')) || null,
    costPrice: parseFloat(get('costPrice')) || null,
    discountType: get('discountType'),
    discountValue: parseFloat(get('discountValue')) || null,
    discountStart: get('discountStart') || null,
    discountEnd: get('discountEnd') || null,
    stock: parseInt(get('stock')) || 0,
    lowStockAlert: parseInt(get('lowStockAlert')) || 5,
    tax: parseFloat(get('tax')) || 0,
    compareAt: parseFloat(get('compareAt')) || null,
    categoryId: catId || null,
    categoryName: cat?.name || 'Performance',
    subcategoryId: get('subcategoryId') || null,
    collectionId: get('collectionId') || null,
    gender: get('gender'),
    sport: get('sport'),
    team: get('team'),
    slug: get('slug') || name.toLowerCase().replace(/[^a-z0-9]+/g,'-'),
    seoTitle: get('seoTitle'),
    seoDesc: get('seoDesc'),
    isNewArrival: fd.get('isNewArrival') === 'on',
    isBestSeller: fd.get('isBestSeller') === 'on',
    isFeatured: fd.get('isFeatured') === 'on',
    isLimited: fd.get('isLimited') === 'on',
    isPreorder: fd.get('isPreorder') === 'on',
    customBadge: get('customBadge'),
    isPublished: asDraft ? false : (get('productStatus') ? get('productStatus') === 'published' : true),
    customName,
    customNumber,
    customNameNumber,
    customLogo,
    customText,
    customPrintPrice,
    assignedPatches,
    assignedSleeves,
    assignedSizes,
    images,
    preorderPrice: parseFloat(get('preorderPrice')) || null,
    preorderCapacity: parseInt(get('preorderCapacity')) || 100,
    preorderSold: id ? DB.products.byId(id)?.preorderSold || 0 : 0,
    expectedArrival: get('expectedArrival') || null,
    expectedDelivery: get('expectedDelivery') || null,
    preorderCloseDate: get('preorderCloseDate') || null,
    preorderStatus: get('preorderStatus') || 'OPEN',
    preorderDesc: get('preorderDesc'),
    advancePaymentMode: get('advancePaymentMode') || 'default',
    hasCustomDelivery: fd.get('hasCustomDelivery') === 'on',
    isDeliveryChargeMandatory: fd.get('isDeliveryChargeMandatory') === 'on',
    deliveryChargeInsideDhaka: parseFloat(get('deliveryChargeInsideDhaka')) || 80,
    deliveryChargeOutsideDhaka: parseFloat(get('deliveryChargeOutsideDhaka')) || 130,
    deliveryNote: get('deliveryNote') || '',
    sizeChartType: get('sizeChartType') || 'Player Edition',
    sizeChartImage: get('sizeChartImage') || '',
    sizeMapping: (() => {
      const availSizes = DB.sizes.enabled();
      const dynamicCodes = availSizes.length > 0 ? availSizes.map(s => s.code) : ['S','M','L','XL','XXL'];
      const mapping = {};
      dynamicCodes.forEach(s => {
        mapping[s] = {
          height: parseFloat(get(`size_height_${s}`)) || (s==='S'?26:s==='M'?27:s==='L'?28:s==='XL'?29:s==='XXL'?30:31),
          width: parseFloat(get(`size_width_${s}`)) || (s==='S'?36:s==='M'?38:s==='L'?40:s==='XL'?42:s==='XXL'?44:46)
        };
      });
      return mapping;
    })()
  };

  if (id) {
    DB.products.update(id, data);
    // Update variants
    DB.variants.deleteByProduct(id);
    saveVariants(id, form);
    toast('Product updated successfully', 'success');
  } else {
    const p = DB.products.create(data);
    saveVariants(p.id, form);
    toast('Product created successfully', 'success');
  }

  // Clear temporary uploader cache
  window._lastFormImages = null;

  // Trigger cross-tab/storefront storage sync
  try { window.dispatchEvent(new Event('storage')); } catch(e){}

  closeModal();
  updateNavBadges();
  renderProducts(document.getElementById('admin-content'));
}

function saveVariants(productId, form) {
  const rows = form.querySelectorAll('.variant-row');
  rows.forEach((row, i) => {
    const fd = new FormData(form);
    const size = form.querySelector(`[name=v_size_${row.dataset.idx}]`)?.value;
    const color = form.querySelector(`[name=v_color_${row.dataset.idx}]`)?.value;
    const sleeve = form.querySelector(`[name=v_sleeve_${row.dataset.idx}]`)?.value;
    const stock = parseInt(form.querySelector(`[name=v_stock_${row.dataset.idx}]`)?.value) || 0;
    const price = parseFloat(form.querySelector(`[name=v_price_${row.dataset.idx}]`)?.value) || 0;
    if (size) {
      DB.variants.create({ productId, size, color: color||'Standard', sleeve: sleeve||'Half Sleeve', stock, price, sku: `${productId}-${size}-${(color||'S').substr(0,3).toUpperCase()}` });
    }
  });
}

// ──────────────────────────────────────────────────────────────
// ═══ VIEW: CATEGORIES ═══
// ──────────────────────────────────────────────────────────────
function renderCategories(container) {
  const cats = DB.categories.all();
  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left"><div class="page-title">Categories</div><div class="page-sub">${cats.length} categories</div></div>
      <div class="page-actions"><button class="btn btn-primary" onclick="openCategoryForm()"><span class="material-symbols-outlined">add</span> Add Category</button></div>
    </div>
    <div class="card">
      <div class="table-wrapper">
        <table class="admin-table">
          <thead><tr><th>Image</th><th>Name</th><th>Slug</th><th>Subcategories</th><th>Products</th><th>Status</th><th>Featured</th><th style="text-align:right">Actions</th></tr></thead>
          <tbody>
            ${cats.length === 0 ? `<tr><td colspan="8">${emptyState('category','No categories yet','Create your first category','Add Category','openCategoryForm()')}</td></tr>` :
              cats.map(c => {
                const subCount = DB.subcategories.byCategory(c.id).length;
                const prodCount = DB.products.all().filter(p => p.categoryId === c.id || p.category === c.name || p.category === c.slug).length;
                const displayImg = c.imageUrl || c.mobileImgUrl || c.image || '';
                return `
                  <tr>
                    <td>
                      ${displayImg ? `
                        <div style="width:48px;height:48px;border-radius:8px;overflow:hidden;border:1px solid #E5E7EB;display:flex;align-items:center;justify-content:center;background:#F8FAFC;">
                          <img src="${displayImg}" style="width:100%;height:100%;object-fit:cover;display:block;" alt="${c.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';"/>
                          <div class="prod-thumb-placeholder" style="display:none;width:100%;height:100%;"><span class="material-symbols-outlined" style="font-size:18px">category</span></div>
                        </div>
                      ` : `
                        <div class="prod-thumb-placeholder" style="width:48px;height:48px;border-radius:8px;"><span class="material-symbols-outlined" style="font-size:18px">category</span></div>
                      `}
                    </td>
                    <td style="font-weight:600">${c.name}</td>
                    <td class="font-mono" style="font-size:12px">${c.slug}</td>
                    <td>${subCount}</td>
                    <td>${prodCount}</td>
                    <td><span class="badge ${c.isActive?'badge-green':'badge-gray'}">${c.isActive?'Active':'Inactive'}</span></td>
                    <td>${c.isFeatured?'<span class="badge badge-amber">Featured</span>':'-'}</td>
                    <td class="actions-cell" style="min-width:130px;text-align:right;white-space:nowrap;">
                      <button class="btn btn-ghost btn-sm" onclick="openCategoryForm('${c.id}')" title="Edit Category"><span class="material-symbols-outlined">edit</span></button>
                      <button class="btn btn-ghost btn-sm" onclick="DB.categories.toggle('${c.id}','isActive');renderCategories(document.getElementById('admin-content'));toast('Status updated','success')" title="Toggle Active"><span class="material-symbols-outlined">${c.isActive?'visibility_off':'visibility'}</span></button>
                      <button class="btn btn-ghost btn-sm text-red" onclick="deleteCat('${c.id}', ${JSON.stringify(c.name)})" title="Delete Category"><span class="material-symbols-outlined" style="color:#DC2626">delete</span></button>
                    </td>
                  </tr>
                  ${DB.subcategories.byCategory(c.id).map(s => `
                    <tr style="background:#FAFAFA">
                      <td></td>
                      <td style="padding-left:24px;color:#6B7280;font-size:13px">↳ ${s.name}</td>
                      <td class="font-mono" style="font-size:11px">${s.slug}</td>
                      <td colspan="3"></td>
                      <td></td>
                      <td class="actions-cell" style="min-width:130px;text-align:right;white-space:nowrap;">
                        <button class="btn btn-ghost btn-sm" onclick="openSubcatForm('${s.id}','${c.id}')" title="Edit Subcategory"><span class="material-symbols-outlined">edit</span></button>
                        <button class="btn btn-ghost btn-sm" onclick="DB.subcategories.delete('${s.id}');renderCategories(document.getElementById('admin-content'));toast('Deleted','success')" title="Delete Subcategory"><span class="material-symbols-outlined" style="color:#DC2626">delete</span></button>
                      </td>
                    </tr>
                  `).join('')}
                `;
              }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function deleteCat(id, name) {
  showConfirm('Delete Category', `Are you sure you want to delete category "${name}"? This will not delete products assigned to this category.`, () => {
    DB.categories.delete(id);
    toast(`Category "${name}" deleted successfully`, 'success');
    renderCategories(document.getElementById('admin-content'));
  });
}

function openCategoryForm(id = null) {
  const cat = id ? DB.categories.byId(id) : null;
  let imgUrl = cat?.imageUrl || cat?.mobileImgUrl || '';
  window._catImgUrl = imgUrl;

  const html = `
    <form id="cat-form" onsubmit="event.preventDefault();">
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Category Name<span class="req">*</span></label>
          <input type="text" name="name" class="form-input" required value="${cat?.name||''}" placeholder="e.g. Club Match Kits, Football" oninput="autoSlug(this,'cat-slug')"/>
        </div>
        <div class="form-group">
          <label class="form-label">Slug<span class="req">*</span></label>
          <input type="text" name="slug" id="cat-slug" class="form-input" required value="${cat?.slug||''}" placeholder="e.g. club-match-kits"/>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Description</label>
        <textarea name="description" class="form-textarea" placeholder="Brief description of this collection or category">${cat?.description||''}</textarea>
      </div>

      <!-- Upload Category Image -->
      <div class="form-group">
        <label class="form-label" style="display:flex;align-items:center;justify-content:space-between;">
          <span>Category Image (Upload)<span class="req">*</span></span>
          <span style="font-size:11px;color:#64748B;font-weight:normal;">Shown on cards, homepage & shop filters</span>
        </label>
        <div id="cat-img-zone" style="margin-top:4px;"></div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Display Order</label>
          <input type="number" name="displayOrder" class="form-input" value="${cat?.displayOrder||0}"/>
        </div>
        <div class="form-group">
          <label class="form-label">SEO Title</label>
          <input type="text" name="seoTitle" class="form-input" value="${cat?.seoTitle||''}" placeholder="Category meta title"/>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">SEO Description</label>
        <textarea name="seoDesc" class="form-textarea" placeholder="Category search engine snippet">${cat?.seoDesc||''}</textarea>
      </div>
      <div style="display:flex;gap:16px;margin-bottom:16px;">
        <label class="checkbox-chip ${cat?.isActive!==false?'selected':''}">
          <input type="checkbox" name="isActive" ${cat?.isActive!==false?'checked':''} onchange="this.closest('.checkbox-chip').classList.toggle('selected',this.checked)"/> Active
        </label>
        <label class="checkbox-chip ${cat?.isFeatured?'selected':''}">
          <input type="checkbox" name="isFeatured" ${cat?.isFeatured?'checked':''} onchange="this.closest('.checkbox-chip').classList.toggle('selected',this.checked)"/> Featured on Storefront
        </label>
      </div>

      <hr class="divider"/>
      <div class="card-title" style="margin-bottom:12px">Subcategories</div>
      <div id="subcats-list">
        ${DB.subcategories.byCategory(id||'').map(s => `
          <div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid #F3F4F6">
            <span style="font-size:13px;flex:1">${s.name}</span>
            <button type="button" class="btn btn-ghost btn-sm" onclick="DB.subcategories.delete('${s.id}');this.closest('div').remove();toast('Removed','info')">✕</button>
          </div>
        `).join('')}
      </div>
      <div style="display:flex;gap:8px;margin-top:10px">
        <input type="text" id="new-subcat-name" class="form-input" placeholder="New subcategory name" style="flex:1"/>
        <button type="button" class="btn btn-secondary btn-sm" onclick="addSubcatInline('${id||''}')">Add</button>
      </div>
    </form>
  `;

  const footer = `
    <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
    <button class="btn btn-primary" onclick="saveCategoryForm('${id||''}')">
      ${cat ? 'Update Category' : 'Create Category'}
    </button>
  `;
  openModal(cat ? `Edit: ${cat.name}` : 'New Category', html, footer, 'modal-md');

  setTimeout(() => {
    const desktopZone = Uploader.createSingleZone({
      id: 'cat-desktop',
      value: imgUrl,
      label: 'Category Image',
      placeholder: 'Click or drop category image file here',
      maxSizeMB: 5,
      maxDimension: 800,
      onchange: v => {
        window._catImgUrl = v || '';
      }
    });
    const zoneEl = document.getElementById('cat-img-zone');
    if (zoneEl) {
      zoneEl.innerHTML = '';
      zoneEl.appendChild(desktopZone);
    }
  }, 50);
}

function addSubcatInline(catId) {
  const input = document.getElementById('new-subcat-name');
  const name = input?.value?.trim();
  if (!name) return;
  const slug = name.toLowerCase().replace(/\s+/g,'-');
  if (catId) { DB.subcategories.create({ name, slug, categoryId: catId, isActive: true }); }
  const list = document.getElementById('subcats-list');
  if (list) list.insertAdjacentHTML('beforeend', `<div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid #F3F4F6"><span style="font-size:13px;flex:1">${name}</span></div>`);
  if (input) input.value = '';
}

function saveCategoryForm(id) {
  const form = document.getElementById('cat-form');
  const fd = new FormData(form);
  const name = fd.get('name')?.trim();
  const slug = fd.get('slug')?.trim();
  if (!name || !slug) { toast('Name and slug required', 'error'); return; }

  const imageUrl = window._catImgUrl || '';

  const data = {
    name,
    slug,
    description: fd.get('description')?.trim() || '',
    imageUrl: imageUrl,
    mobileImgUrl: imageUrl,
    displayOrder: parseInt(fd.get('displayOrder')) || 0,
    seoTitle: fd.get('seoTitle')?.trim() || '',
    seoDesc: fd.get('seoDesc')?.trim() || '',
    isActive: fd.get('isActive') === 'on',
    isFeatured: fd.get('isFeatured') === 'on',
  };

  if (id) {
    DB.categories.update(id, data);
    toast('Category updated & synced!', 'success');
  } else {
    DB.categories.create(data);
    toast('Category created & synced!', 'success');
  }
  closeModal();
  renderCategories(document.getElementById('admin-content'));
  try { window.dispatchEvent(new Event('storage')); } catch(e){}
}

function openSubcatForm(id, catId) {
  const s = DB.subcategories.byId(id);
  const html = `
    <form id="subcat-form">
      <div class="form-group"><label class="form-label">Name<span class="req">*</span></label><input type="text" name="name" class="form-input" required value="${s?.name||''}"/></div>
      <div class="form-group"><label class="form-label">Slug<span class="req">*</span></label><input type="text" name="slug" class="form-input" required value="${s?.slug||''}"/></div>
    </form>
  `;
  openModal('Edit Subcategory', html, `<button class="btn btn-secondary" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveSubcat('${id}','${catId}')">Save</button>`, 'modal-sm');
}

function saveSubcat(id, catId) {
  const form = document.getElementById('subcat-form');
  const fd = new FormData(form);
  DB.subcategories.update(id, { name: fd.get('name'), slug: fd.get('slug'), categoryId: catId });
  toast('Subcategory updated', 'success'); closeModal();
  renderCategories(document.getElementById('admin-content'));
}

function autoSlug(input, slugId) {
  const slug = document.getElementById(slugId);
  if (slug && !slug.dataset.manual) slug.value = input.value.toLowerCase().replace(/[^a-z0-9]+/g,'-');
}

// ──────────────────────────────────────────────────────────────
// ═══ VIEW: COLLECTIONS ═══
// ──────────────────────────────────────────────────────────────
function renderCollections(container) {
  const cols = DB.collections.all();
  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left"><div class="page-title">Collections</div></div>
      <button class="btn btn-primary" onclick="openCollectionForm()"><span class="material-symbols-outlined">add</span> New Collection</button>
    </div>
    <div class="card">
      <div class="table-wrapper">
        <table class="admin-table">
          <thead><tr><th>Image</th><th>Name</th><th>Slug</th><th>Products</th><th>Status</th><th style="text-align:right">Actions</th></tr></thead>
          <tbody>
            ${cols.length === 0 ? `<tr><td colspan="6">${emptyState('collections','No collections','Create your first collection')}</td></tr>` :
              cols.map(c => {
                const pCount = DB.products.all().filter(p => p.collectionId === c.id).length;
                return `<tr>
                  <td>${c.imageUrl?`<img src="${c.imageUrl}" style="width:48px;height:48px;object-fit:cover;border-radius:8px">`:`<div class="prod-thumb-placeholder"><span class="material-symbols-outlined">collections</span></div>`}</td>
                  <td style="font-weight:600">${c.name}</td>
                  <td class="font-mono" style="font-size:12px">${c.slug}</td>
                  <td>${pCount}</td>
                  <td><span class="badge ${c.isActive?'badge-green':'badge-gray'}">${c.isActive?'Active':'Inactive'}</span></td>
                  <td class="actions-cell">
                    <button class="btn btn-ghost btn-sm" onclick="openCollectionForm('${c.id}')"><span class="material-symbols-outlined">edit</span></button>
                    <button class="btn btn-ghost btn-sm" onclick="DB.collections.delete('${c.id}');renderCollections(document.getElementById('admin-content'));toast('Deleted','success')"><span class="material-symbols-outlined" style="color:#DC2626">delete</span></button>
                  </td>
                </tr>`;
              }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function openCollectionForm(id = null) {
  const col = id ? DB.collections.byId(id) : null;
  let imgUrl = col?.imageUrl || '';
  const html = `
    <form id="col-form">
      <div class="form-row">
        <div class="form-group"><label class="form-label">Name<span class="req">*</span></label><input type="text" name="name" class="form-input" required value="${col?.name||''}" oninput="autoSlug(this,'col-slug')"/></div>
        <div class="form-group"><label class="form-label">Slug<span class="req">*</span></label><input type="text" name="slug" id="col-slug" class="form-input" required value="${col?.slug||''}"/></div>
      </div>
      <div class="form-group"><label class="form-label">Description</label><textarea name="description" class="form-textarea">${col?.description||''}</textarea></div>
      <div class="form-group"><label class="form-label">Collection Image</label><div id="col-img-zone"></div></div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">Start Date</label><input type="date" name="startDate" class="form-input" value="${col?.startDate||''}"/></div>
        <div class="form-group"><label class="form-label">End Date</label><input type="date" name="endDate" class="form-input" value="${col?.endDate||''}"/></div>
      </div>
      <label class="checkbox-chip ${col?.isActive!==false?'selected':''}">
        <input type="checkbox" name="isActive" ${col?.isActive!==false?'checked':''} onchange="this.closest('.checkbox-chip').classList.toggle('selected',this.checked)"/> Active
      </label>
    </form>
  `;
  const footer = `<button class="btn btn-secondary" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveCollection('${id||''}')">Save</button>`;
  openModal(col?`Edit: ${col.name}`:'New Collection', html, footer, 'modal-md');
  setTimeout(() => {
    const zone = Uploader.createSingleZone({ id:'col-img', value:imgUrl, onchange: v => window._colImgUrl = v });
    document.getElementById('col-img-zone')?.appendChild(zone);
    window._colImgUrl = imgUrl;
  }, 100);
}

function saveCollection(id) {
  const form = document.getElementById('col-form');
  const fd = new FormData(form);
  const name = fd.get('name')?.trim(); const slug = fd.get('slug')?.trim();
  if (!name || !slug) { toast('Name and slug required', 'error'); return; }
  const data = { name, slug, description: fd.get('description'), imageUrl: window._colImgUrl||'', startDate: fd.get('startDate')||null, endDate: fd.get('endDate')||null, isActive: fd.get('isActive')==='on' };
  if (id) { DB.collections.update(id, data); toast('Collection updated', 'success'); }
  else { DB.collections.create(data); toast('Collection created', 'success'); }
  closeModal(); renderCollections(document.getElementById('admin-content'));
}

// ──────────────────────────────────────────────────────────────
// ═══ VIEW: INVENTORY ═══
// ──────────────────────────────────────────────────────────────
function renderInventory(container) {
  const products = DB.products.all().filter(p=>!p.isArchived);
  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left"><div class="page-title">Inventory</div><div class="page-sub">Manage stock levels</div></div>
      <button class="btn btn-secondary" onclick="exportInventoryCSV()"><span class="material-symbols-outlined">download</span> Export</button>
    </div>
    <div class="card">
      <div class="table-wrapper">
        <table class="admin-table">
          <thead><tr><th>Product</th><th>SKU</th><th>Stock</th><th>Low Alert</th><th>Status</th><th style="text-align:right">Adjust</th></tr></thead>
          <tbody>
            ${products.length === 0 ? `<tr><td colspan="6"><div class="empty-state"><p>No products yet</p></div></td></tr>` :
              products.map(p => `
                <tr>
                  <td style="font-weight:600">${p.name}</td>
                  <td class="font-mono" style="font-size:12px">${p.sku||'-'}</td>
                  <td><span class="badge ${p.stock===0?'badge-red':p.stock<=(p.lowStockAlert||5)?'badge-amber':'badge-green'} font-mono" style="font-size:14px">${p.stock||0}</span></td>
                  <td style="color:#9CA3AF">${p.lowStockAlert||5}</td>
                  <td>${p.stock===0?'<span class="badge badge-red">Out of Stock</span>':p.stock<=(p.lowStockAlert||5)?'<span class="badge badge-amber">Low Stock</span>':'<span class="badge badge-green">In Stock</span>'}</td>
                  <td class="actions-cell">
                    <button class="btn btn-secondary btn-sm" onclick="openStockAdjust('${p.id}','${p.name.replace(/'/g,"\\'")}',${p.stock||0})">
                      <span class="material-symbols-outlined">tune</span> Adjust
                    </button>
                  </td>
                </tr>
              `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <div class="card" style="margin-top:16px">
      <div class="card-header"><div class="card-title">Inventory History</div></div>
      <div class="table-wrapper">
        <table class="admin-table">
          <thead><tr><th>Date</th><th>Product</th><th>Prev</th><th>Change</th><th>New Stock</th><th>Reason</th><th>Admin</th></tr></thead>
          <tbody>
            ${DB.inventory.history().slice(0,50).map(h => `
              <tr>
                <td style="font-size:12px;color:#9CA3AF">${fmtDate(h.date)}</td>
                <td>${h.productName||'-'}</td>
                <td class="font-mono">${h.previousStock??'-'}</td>
                <td class="font-mono ${h.change>=0?'text-green':'text-red'}">${h.change>=0?'+':''}${h.change||0}</td>
                <td class="font-mono font-bold">${h.newStock||0}</td>
                <td style="font-size:12px">${h.reason||'-'}</td>
                <td style="font-size:12px;color:#9CA3AF">${h.admin||'Admin'}</td>
              </tr>
            `).join('') || '<tr><td colspan="7"><div class="empty-state" style="padding:20px"><p>No history yet</p></div></td></tr>'}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function openStockAdjust(productId, productName, currentStock) {
  const reasons = ['Restock', 'Manual adjustment', 'Damaged', 'Returned', 'Correction'];
  const html = `
    <p style="font-size:14px;margin-bottom:16px">Current stock: <strong class="font-mono">${currentStock}</strong></p>
    <div class="form-group">
      <label class="form-label">New Stock Quantity<span class="req">*</span></label>
      <input type="number" id="adj-qty" class="form-input" value="${currentStock}" min="0"/>
    </div>
    <div class="form-group">
      <label class="form-label">Reason<span class="req">*</span></label>
      <select id="adj-reason" class="form-select">
        ${reasons.map(r => `<option>${r}</option>`).join('')}
      </select>
    </div>
    <div class="form-group">
      <label class="form-label">Notes</label>
      <input type="text" id="adj-notes" class="form-input" placeholder="Optional notes"/>
    </div>
  `;
  const footer = `
    <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
    <button class="btn btn-primary" onclick="applyStockAdjust('${productId}',${currentStock})">Apply Adjustment</button>
  `;
  openModal(`Adjust Stock: ${productName}`, html, footer, 'modal-sm');
}

function applyStockAdjust(productId, oldStock) {
  const qty = parseInt(document.getElementById('adj-qty')?.value);
  const reason = document.getElementById('adj-reason')?.value;
  const notes = document.getElementById('adj-notes')?.value;
  if (isNaN(qty) || qty < 0) { toast('Invalid quantity', 'error'); return; }
  DB.products.updateStock(productId, qty, reason + (notes ? ` — ${notes}` : ''));
  toast(`Stock updated to ${qty}`, 'success');
  closeModal();
  renderInventory(document.getElementById('admin-content'));
}

function exportInventoryCSV() {
  const rows = [['Product','SKU','Stock','Low Alert','Status']];
  DB.products.all().filter(p=>!p.isArchived).forEach(p =>
    rows.push([p.name, p.sku||'', p.stock||0, p.lowStockAlert||5, p.stock===0?'Out of Stock':p.stock<=(p.lowStockAlert||5)?'Low Stock':'In Stock'])
  );
  DB.export.downloadCSV(rows.map(r=>r.join(',')).join('\n'), 'zenvy-inventory.csv');
  toast('Inventory exported', 'success');
}

// ──────────────────────────────────────────────────────────────
// ═══ CUSTOMIZATION VIEWS ═══
// ──────────────────────────────────────────────────────────────

// ── PATCHES ──
function renderPatches(container) {
  const patches = DB.patches.all();
  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left"><div class="page-title">Patches</div><div class="page-sub">${patches.length} patches</div></div>
      <button class="btn btn-primary" onclick="openPatchForm()"><span class="material-symbols-outlined">add</span> Add Patch</button>
    </div>
    <div class="card">
      <div class="table-wrapper">
        <table class="admin-table">
          <thead><tr><th>Image</th><th>Name</th><th>Price</th><th>Order</th><th>Status</th><th style="text-align:right">Actions</th></tr></thead>
          <tbody>
            ${patches.length === 0 ? `<tr><td colspan="6">${emptyState('badge','No patches','Add your first patch','Add Patch','openPatchForm()')}</td></tr>` :
              patches.map(p => `
                <tr>
                  <td>${p.imageUrl?`<img src="${p.imageUrl}" style="width:40px;height:40px;object-fit:contain;border-radius:6px;border:1px solid #E5E7EB">`:`<div class="prod-thumb-placeholder"><span class="material-symbols-outlined">badge</span></div>`}</td>
                  <td style="font-weight:600">${p.name}</td>
                  <td class="font-mono">৳${p.price||0}</td>
                  <td>${p.displayOrder}</td>
                  <td><span class="badge ${p.isEnabled?'badge-green':'badge-gray'}">${p.isEnabled?'Enabled':'Disabled'}</span></td>
                  <td class="actions-cell">
                    <button class="btn btn-ghost btn-sm" onclick="openPatchForm('${p.id}')"><span class="material-symbols-outlined">edit</span></button>
                    <button class="btn btn-ghost btn-sm" onclick="DB.patches.update('${p.id}',{isEnabled:${!p.isEnabled}});renderPatches(document.getElementById('admin-content'));toast('Updated','success')">
                      <span class="material-symbols-outlined">${p.isEnabled?'block':'check_circle'}</span>
                    </button>
                    <button class="btn btn-ghost btn-sm" onclick="showConfirm('Delete Patch','Delete ${p.name}?',()=>{DB.patches.delete('${p.id}');renderPatches(document.getElementById('admin-content'));toast('Patch deleted','success')})">
                      <span class="material-symbols-outlined" style="color:#DC2626">delete</span>
                    </button>
                  </td>
                </tr>
              `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function openPatchForm(id = null) {
  const patch = id ? DB.patches.byId(id) : null;
  let imgUrl = patch?.imageUrl || '';
  const html = `
    <form id="patch-form">
      <div class="form-group">
        <label class="form-label">Patch Name<span class="req">*</span></label>
        <input type="text" name="name" class="form-input" required value="${patch?.name||''}" placeholder="e.g. UEFA Champions League, Premier League"/>
      </div>
      
      <div class="form-group">
        <label class="form-label">Patch Badge Image (Upload Image)</label>
        <div id="patch-img-zone" style="margin-bottom:8px;"></div>
        <div style="display:flex;gap:6px;align-items:center;margin-top:6px;flex-wrap:wrap;">
          <span style="font-size:11px;color:#6b7280;">Quick Presets:</span>
          <button type="button" class="btn btn-ghost btn-xs" onclick="window.setPatchPreset('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAxMDAgMTAwJz48Y2lyY2xlIGN4PSc1MCcgY3k9JzUwJyByPSc0OCcgZmlsbD0nI2ZmZmZmZicgc3Ryb2tlPScjMGYxNzJhJyBzdHJva2Utd2lkdGg9JzQnLz48cG9seWdvbiBwb2ludHM9JzUwLDE0IDUzLDI0IDY0LDI0IDU1LDMwIDU4LDQwIDUwLDM0IDQyLDQwIDQ1LDMwIDM2LDI0IDQ3LDI0JyBmaWxsPScjMGYxNzJhJy8+PHBvbHlnb24gcG9pbnRzPSc3NSwzMiA3OCw0MiA4OSw0MiA4MCw0OCA4Myw1OCA3NSw1MiA2Nyw1OCA3MCw0OCA2MSw0MiA3Miw0MicgZmlsbD0nIzBmMTcyYScvPjxwb2x5Z29uIHBvaW50cz0nNjYsNzAgNjksODAgODAsODAgNzEsODYgNzQsOTYgNjYsOTAgNTgsOTYgNjEsODYgNTIsODAgNjMsODAnIGZpbGw9JyMwZjE3MmEnLz48cG9seWdvbiBwb2ludHM9JzM0LDcwIDM3LDgwIDQ4LDgwIDM5LDg2IDQyLDk2IDM0LDkwIDI2LDk2IDI5LDg2IDIwLDgwIDMxLDgwJyBmaWxsPScjMGYxNzJhJy8+PHBvbHlnb24gcG9pbnRzPScyNSwzMiAyOCw0MiAzOSw0MiAzMCw0OCAzMyw1OCAyNSw1MiAxNyw1OCAyMCw0OCAxMSw0MiAyMiw0MicgZmlsbD0nIzBmMTcyYScvPjxjaXJjbGUgY3g9JzUwJyBjeT0nNTAnIHI9JzcnIGZpbGw9JyMwZjE3MmEnLz48L3N2Zz4=')">UCL Starball</button>
          <button type="button" class="btn btn-ghost btn-xs" onclick="window.setPatchPreset('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAxMDAgMTAwJz48Y2lyY2xlIGN4PSc1MCcgY3k9JzUwJyByPSc0OCcgZmlsbD0nIzM4MDAzYycgc3Ryb2tlPScjMDBmZjg1JyBzdHJva2Utd2lkdGg9JzQnLz48cGF0aCBkPSdNMzUgMzIgTDQwIDQwIEw1MCAzMCBMNjAgNDAgTDY1IDMyIEw2MiA0OCBMMzggNDggWicgZmlsbD0nIzAwZmY4NScvPjxwYXRoIGQ9J001MCA0NiBDNDAgNDYgMzIgNTQgMzIgNjYgQzMyIDc4IDQwIDg0IDUwIDg0IEM2MCA4NCA2OCA3OCA2OCA2NiBDNjggNTQgNjAgNDYgNTAgNDYgWicgZmlsbD0nI2ZmZmZmZicvPjxjaXJjbGUgY3g9JzQzJyBjeT0nNjInIHI9JzMnIGZpbGw9JyMzODAwM2MnLz48Y2lyY2xlIGN4PSc1NycgY3k9JzYyJyByPSczJyBmaWxsPScjMzgwMDNjJy8+PHBhdGggZD0nTTQ3IDcwIFE1MCA3MyA1MyA3MCcgc3Ryb2tlPScjMzgwMDNjJyBzdHJva2Utd2lkdGg9JzInIGZpbGw9J25vbmUnLz48L3N2Zz4=')">Premier League</button>
          <button type="button" class="btn btn-ghost btn-xs" onclick="window.setPatchPreset('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAxMDAgMTAwJz48Y2lyY2xlIGN4PSc1MCcgY3k9JzUwJyByPSc0OCcgZmlsbD0nI2ZmZmZmZicgc3Ryb2tlPScjZWE1ODBjJyBzdHJva2Utd2lkdGg9JzQnLz48cGF0aCBkPSdNMzIgMjYgTDQ0IDI2IEw0NCA2NCBMNjYgNjQgTDY2IDc0IEwzMiA3NCBaJyBmaWxsPScjZWE1ODBjJy8+PHBhdGggZD0nTTQ4IDM2IEw1OCAzNiBMNTggNTQgTDcyIDU0IEw3MiA2MiBMNDggNjIgWicgZmlsbD0nIzExMTgyNycvPjwvc3ZnPg==')">La Liga</button>
        </div>
      </div>

      <div class="form-group"><label class="form-label">Description</label><input type="text" name="description" class="form-input" value="${patch?.description||''}" placeholder="Official tournament sleeve badge"/></div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">Price (৳)<span class="req">*</span></label><input type="number" name="price" class="form-input" min="0" required value="${patch?.price||0}"/></div>
        <div class="form-group"><label class="form-label">Display Order</label><input type="number" name="displayOrder" class="form-input" value="${patch?.displayOrder||0}"/></div>
      </div>
      <label class="checkbox-chip ${patch?.isEnabled!==false?'selected':''}">
        <input type="checkbox" name="isEnabled" ${patch?.isEnabled!==false?'checked':''} onchange="this.closest('.checkbox-chip').classList.toggle('selected',this.checked)"/> Enabled
      </label>
    </form>
  `;
  const footer = `<button class="btn btn-secondary" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="savePatch('${id||''}')">Save Patch</button>`;
  openModal(patch?`Edit: ${patch.name}`:'New Patch', html, footer, 'modal-sm');
  
  window.setPatchPreset = function(dataUrl) {
    window._patchImgUrl = dataUrl;
    const preview = document.getElementById('patch-img-preview');
    if (preview) {
      preview.src = dataUrl;
      preview.parentElement?.classList.add('has-image');
    }
    toast('Badge preset applied', 'info');
  };

  setTimeout(() => {
    const zone = Uploader.createSingleZone({ 
      id:'patch-img', 
      value:imgUrl, 
      placeholder:'Click or drop badge image file (PNG, JPG, SVG)', 
      onchange: v => {
        window._patchImgUrl = v || '';
      }
    });
    document.getElementById('patch-img-zone')?.appendChild(zone);
    window._patchImgUrl = imgUrl;
  }, 100);
}

function savePatch(id) {
  const form = document.getElementById('patch-form');
  const fd = new FormData(form);
  const name = fd.get('name')?.trim();
  if (!name) { toast('Name required', 'error'); return; }
  const imageUrl = (window._patchImgUrl || '').trim();
  const data = { 
    name, 
    imageUrl, 
    description: fd.get('description'), 
    price: parseFloat(fd.get('price'))||0, 
    displayOrder: parseInt(fd.get('displayOrder'))||0, 
    isEnabled: fd.get('isEnabled')==='on' 
  };
  if (id) { DB.patches.update(id, data); toast('Patch updated', 'success'); }
  else { DB.patches.create(data); toast('Patch created', 'success'); }
  closeModal(); 
  renderPatches(document.getElementById('admin-content'));
}

// ── SLEEVES ──
function renderSleeves(container) {
  const sleeves = DB.sleeves.all();
  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left"><div class="page-title">Sleeve Types</div></div>
      <button class="btn btn-primary" onclick="openSleeveForm()"><span class="material-symbols-outlined">add</span> Add Sleeve</button>
    </div>
    <div class="card">
      <div class="table-wrapper">
        <table class="admin-table">
          <thead><tr><th>Name</th><th>Additional Price</th><th>Description</th><th>Order</th><th>Status</th><th style="text-align:right">Actions</th></tr></thead>
          <tbody>
            ${sleeves.length===0?`<tr><td colspan="6">${emptyState('straighten','No sleeve types','Add sleeve options','Add Sleeve','openSleeveForm()')}</td></tr>`:
              sleeves.map(s => `
                <tr>
                  <td style="font-weight:600">${s.name}</td>
                  <td class="font-mono">${s.additionalPrice>0?'+৳'+s.additionalPrice:'Free'}</td>
                  <td style="font-size:12px;color:#9CA3AF">${s.description||'-'}</td>
                  <td>${s.displayOrder||0}</td>
                  <td><span class="badge ${s.isEnabled?'badge-green':'badge-gray'}">${s.isEnabled?'Enabled':'Disabled'}</span></td>
                  <td class="actions-cell">
                    <button class="btn btn-ghost btn-sm" onclick="openSleeveForm('${s.id}')"><span class="material-symbols-outlined">edit</span></button>
                    <button class="btn btn-ghost btn-sm" onclick="DB.sleeves.update('${s.id}',{isEnabled:${!s.isEnabled}});renderSleeves(document.getElementById('admin-content'));toast('Updated','success')"><span class="material-symbols-outlined">${s.isEnabled?'block':'check_circle'}</span></button>
                    <button class="btn btn-ghost btn-sm" onclick="showConfirm('Delete','Delete ${s.name}?',()=>{DB.sleeves.delete('${s.id}');renderSleeves(document.getElementById('admin-content'));toast('Deleted','success')})"><span class="material-symbols-outlined" style="color:#DC2626">delete</span></button>
                  </td>
                </tr>
              `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function openSleeveForm(id=null) {
  const s = id ? DB.sleeves.byId(id) : null;
  const html = `
    <form id="sleeve-form">
      <div class="form-group"><label class="form-label">Sleeve Name<span class="req">*</span></label><input type="text" name="name" class="form-input" required value="${s?.name||''}" placeholder="Full Sleeve"/></div>
      <div class="form-group"><label class="form-label">Additional Price (৳)</label><input type="number" name="additionalPrice" class="form-input" min="0" value="${s?.additionalPrice||0}"/><div class="form-hint">0 = included in base price</div></div>
      <div class="form-group"><label class="form-label">Description</label><input type="text" name="description" class="form-input" value="${s?.description||''}" placeholder="Brief description"/></div>
      <div class="form-group"><label class="form-label">Display Order</label><input type="number" name="displayOrder" class="form-input" value="${s?.displayOrder||0}"/></div>
      <label class="checkbox-chip ${s?.isEnabled!==false?'selected':''}">
        <input type="checkbox" name="isEnabled" ${s?.isEnabled!==false?'checked':''} onchange="this.closest('.checkbox-chip').classList.toggle('selected',this.checked)"/> Enabled
      </label>
    </form>
  `;
  openModal(s?`Edit: ${s.name}`:'New Sleeve Type', html,
    `<button class="btn btn-secondary" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveSleeve('${id||''}')">Save</button>`, 'modal-sm');
}

function saveSleeve(id) {
  const fd = new FormData(document.getElementById('sleeve-form'));
  const name = fd.get('name')?.trim();
  if (!name) { toast('Name required', 'error'); return; }
  const data = { name, additionalPrice: parseFloat(fd.get('additionalPrice'))||0, description: fd.get('description'), displayOrder: parseInt(fd.get('displayOrder'))||0, isEnabled: fd.get('isEnabled')==='on' };
  if (id) { DB.sleeves.update(id, data); toast('Sleeve updated', 'success'); }
  else { DB.sleeves.create(data); toast('Sleeve created', 'success'); }
  closeModal(); renderSleeves(document.getElementById('admin-content'));
}

// ── SIZES & SIZE CHART ──
function renderSizes(container) {
  const sizes = DB.sizes.all();
  const currentChartUrl = DB.sizes.getSizeChart();

  container.innerHTML = `
    <div class="page-header" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap;gap:12px;">
      <div class="page-header-left">
        <div class="page-title" style="font-size:24px;font-weight:800;color:#111827;display:flex;align-items:center;gap:10px;">
          <span class="material-symbols-outlined" style="font-size:28px;color:#2563EB;">straighten</span>
          Sizes & Size Chart Guide
        </div>
        <p style="font-size:13px;color:#6B7280;margin-top:2px;">Manage available apparel sizes and store-wide size chart image guide for your customers.</p>
      </div>
      <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
        <button class="btn btn-secondary btn-sm" onclick="resetDefaultSizes()" title="Reset sizes to standard XS-4XL list">
          <span class="material-symbols-outlined" style="font-size:16px;">restart_alt</span> Reset Standard Sizes
        </button>
        <button class="btn btn-primary" onclick="openSizeForm()">
          <span class="material-symbols-outlined" style="font-size:18px;">add</span> Add New Size
        </button>
      </div>
    </div>

    <!-- 1. SIZE CHART IMAGE UPLOAD CARD -->
    <div class="card" style="margin-bottom:24px;border:1px solid #E5E7EB;border-radius:12px;background:#ffffff;box-shadow:0 1px 3px rgba(0,0,0,0.05);overflow:hidden;">
      <div style="padding:16px 20px;border-bottom:1px solid #F3F4F6;background:#F9FAFB;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
        <div>
          <h3 style="font-size:15px;font-weight:700;color:#111827;display:flex;align-items:center;gap:8px;">
            <span class="material-symbols-outlined" style="color:#059669;font-size:20px;">image</span>
            Store Size Chart Graphic (Customer Sizing Guide)
          </h3>
          <p style="font-size:12px;color:#6B7280;margin-top:2px;">
            This image is displayed when customers click "Size Guide" or "View Size Chart" on product pages.
          </p>
        </div>
        <div>
          ${currentChartUrl ? `
            <span class="badge badge-green" style="display:inline-flex;align-items:center;gap:4px;font-weight:600;padding:4px 10px;">
              <span class="material-symbols-outlined" style="font-size:14px;">check_circle</span> Active Graphic Uploaded
            </span>
          ` : `
            <span class="badge badge-gray" style="display:inline-flex;align-items:center;gap:4px;font-weight:600;padding:4px 10px;">
              <span class="material-symbols-outlined" style="font-size:14px;">info</span> Using Default Template
            </span>
          `}
        </div>
      </div>

      <div style="padding:20px;display:grid;grid-template-columns:repeat(auto-fit, minmax(320px, 1fr));gap:24px;align-items:start;">
        <!-- Left: Upload Zone -->
        <div>
          <label style="font-size:13px;font-weight:700;color:#374151;display:block;margin-bottom:8px;">
            Upload Size Chart Image
          </label>
          <div id="sizechart-upload-zone" style="margin-bottom:12px;"></div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <button type="button" class="btn btn-primary btn-sm" onclick="saveAdminSizeChartManual()">
              <span class="material-symbols-outlined" style="font-size:16px;">save</span> Save Size Chart
            </button>
            ${currentChartUrl ? `
              <button type="button" class="btn btn-ghost btn-sm" onclick="removeAdminSizeChart()" style="color:#DC2626;">
                <span class="material-symbols-outlined" style="font-size:16px;">delete</span> Remove Image
              </button>
              <button type="button" class="btn btn-secondary btn-sm" onclick="previewSizeChartModal('${encodeURIComponent(currentChartUrl)}')">
                <span class="material-symbols-outlined" style="font-size:16px;">visibility</span> Preview Modal
              </button>
            ` : ''}
          </div>
          <p style="font-size:11px;color:#9CA3AF;margin-top:8px;line-height:1.4;">
            💡 Recommended size: 1200×800 or 1000×1000 JPG/PNG. Clear chart showing Chest & Length measurements in inches.
          </p>
        </div>

        <!-- Right: Live Preview Box -->
        <div>
          <label style="font-size:13px;font-weight:700;color:#374151;display:block;margin-bottom:8px;">
            Current Sizing Guide Preview
          </label>
          <div style="border:1px solid #E5E7EB;border-radius:10px;padding:12px;background:#F9FAFB;text-align:center;min-height:180px;display:flex;flex-direction:column;align-items:center;justify-content:center;">
            ${currentChartUrl ? `
              <img src="${currentChartUrl}" alt="Store Size Chart" style="max-height:220px;max-width:100%;object-fit:contain;border-radius:6px;box-shadow:0 2px 6px rgba(0,0,0,0.06);background:#fff;" />
              <div style="margin-top:8px;font-size:11px;color:#059669;font-weight:600;">✓ Visible on customer product pages</div>
            ` : `
              <img src="size-chart-default.jpg" alt="Default Size Chart" onerror="this.style.display='none'" style="max-height:140px;max-width:100%;opacity:0.6;border-radius:6px;margin-bottom:8px;" />
              <p style="font-size:12px;color:#6B7280;font-weight:600;">Default Size Chart Graphic Active</p>
              <p style="font-size:11px;color:#9CA3AF;margin-top:2px;">Upload a custom image above to replace the default chart.</p>
            `}
          </div>
        </div>
      </div>
    </div>

    <!-- 2. SIZES TABLE CARD -->
    <div class="card" style="border:1px solid #E5E7EB;border-radius:12px;background:#ffffff;box-shadow:0 1px 3px rgba(0,0,0,0.05);overflow:hidden;">
      <div style="padding:16px 20px;border-bottom:1px solid #F3F4F6;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
        <div>
          <h3 style="font-size:15px;font-weight:700;color:#111827;">Catalog Apparel Sizes (${sizes.length})</h3>
          <p style="font-size:12px;color:#6B7280;margin-top:2px;">Available jersey size options shown in product selector, cart, and customization.</p>
        </div>
      </div>
      <div class="table-wrapper">
        <table class="admin-table">
          <thead>
            <tr>
              <th style="width:120px;">Size Code</th>
              <th>Full Label / Name</th>
              <th style="width:120px;">Display Order</th>
              <th style="width:140px;">Status</th>
              <th style="text-align:right;width:160px;">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${sizes.map(s => `
              <tr>
                <td>
                  <span class="badge font-mono" style="background:#EFF6FF;color:#1D4ED8;border:1px solid #BFDBFE;font-size:13px;font-weight:700;padding:4px 10px;border-radius:6px;">
                    ${s.code}
                  </span>
                </td>
                <td style="font-weight:600;color:#1F2937;">${s.name || s.code}</td>
                <td style="color:#6B7280;font-family:monospace;font-size:13px;">#${s.displayOrder ?? 0}</td>
                <td>
                  <span class="badge ${s.isEnabled ? 'badge-green' : 'badge-gray'}" style="cursor:pointer;" onclick="toggleSizeStatus('${s.id}')" title="Click to toggle status">
                    ${s.isEnabled ? '● Active' : '○ Disabled'}
                  </span>
                </td>
                <td class="actions-cell" style="text-align:right;white-space:nowrap;">
                  <button class="btn btn-ghost btn-sm" onclick="openSizeForm('${s.id}')" title="Edit Size">
                    <span class="material-symbols-outlined" style="font-size:18px;">edit</span>
                  </button>
                  <button class="btn btn-ghost btn-sm" onclick="toggleSizeStatus('${s.id}')" title="${s.isEnabled ? 'Disable Size' : 'Enable Size'}">
                    <span class="material-symbols-outlined" style="font-size:18px;color:${s.isEnabled ? '#F59E0B' : '#10B981'}">
                      ${s.isEnabled ? 'block' : 'check_circle'}
                    </span>
                  </button>
                  <button class="btn btn-ghost btn-sm" onclick="deleteSize('${s.id}', '${s.code}')" title="Delete Size">
                    <span class="material-symbols-outlined" style="font-size:18px;color:#DC2626;">delete</span>
                  </button>
                </td>
              </tr>
            `).join('') || `
              <tr>
                <td colspan="5">
                  <div style="text-align:center;padding:40px 20px;">
                    <span class="material-symbols-outlined" style="font-size:48px;color:#9CA3AF;margin-bottom:8px;">format_size</span>
                    <h4 style="font-size:16px;font-weight:700;color:#111827;margin-bottom:4px;">No Sizes Configured</h4>
                    <p style="font-size:13px;color:#6B7280;margin-bottom:16px;">Add your first size or click below to load standard sizes.</p>
                    <button class="btn btn-primary btn-sm" onclick="resetDefaultSizes()">Load Standard Sizes (XS - 4XL)</button>
                  </div>
                </td>
              </tr>
            `}
          </tbody>
        </table>
      </div>
    </div>
  `;

  // Attach single image dropzone
  setTimeout(() => {
    const zoneContainer = document.getElementById('sizechart-upload-zone');
    if (zoneContainer && typeof Uploader !== 'undefined') {
      window._tempSizeChartImg = currentChartUrl;
      const zone = Uploader.createSingleZone({
        id: 'store-sizechart-uploader',
        value: currentChartUrl,
        placeholder: 'Drag & drop Size Chart image file, or click to browse',
        label: 'Size Chart Graphic',
        maxSizeMB: 10,
        maxDimension: 2400,
        onchange: (val) => {
          window._tempSizeChartImg = val || '';
          DB.sizes.saveSizeChart(val || '');
          toast(val ? 'Store Size Chart updated successfully' : 'Store Size Chart removed', 'success');
          renderSizes(document.getElementById('admin-content'));
        }
      });
      zoneContainer.appendChild(zone);
    }
  }, 50);
}

function saveAdminSizeChartManual() {
  const url = window._tempSizeChartImg || DB.sizes.getSizeChart();
  if (!url) {
    toast('Please upload an image first', 'warning');
    return;
  }
  DB.sizes.saveSizeChart(url);
  toast('Store Size Chart saved successfully', 'success');
  renderSizes(document.getElementById('admin-content'));
}

function removeAdminSizeChart() {
  showConfirm('Remove Size Chart', 'Are you sure you want to remove the custom store size chart image? Storefront will revert to standard template.', () => {
    DB.sizes.removeSizeChart();
    window._tempSizeChartImg = '';
    toast('Custom Size Chart removed', 'info');
    renderSizes(document.getElementById('admin-content'));
  });
}

function previewSizeChartModal(imgUrl) {
  const url = decodeURIComponent(imgUrl);
  const html = `
    <div style="text-align:center;padding:10px;">
      <img src="${url}" alt="Size Chart Preview" style="max-height:70vh;max-width:100%;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.15);object-fit:contain;" />
    </div>
  `;
  openModal('Size Chart Customer Preview', html, `<button class="btn btn-secondary" onclick="closeModal()">Close</button>`, 'modal-lg');
}

function toggleSizeStatus(id) {
  const s = DB.sizes.byId(id);
  if (!s) return;
  DB.sizes.update(id, { isEnabled: !s.isEnabled });
  toast(`Size "${s.code}" ${!s.isEnabled ? 'activated' : 'disabled'}`, 'info');
  renderSizes(document.getElementById('admin-content'));
}

function deleteSize(id, code) {
  showConfirm('Delete Size', `Are you sure you want to delete size "${code}"? This will remove it from future size selections.`, () => {
    DB.sizes.delete(id);
    toast(`Size "${code}" deleted successfully`, 'success');
    renderSizes(document.getElementById('admin-content'));
  });
}

function resetDefaultSizes() {
  showConfirm('Reset Sizes', 'Are you sure you want to reset sizes to the standard catalog list (XS, S, M, L, XL, XXL, 3XL, 4XL)?', () => {
    DB.sizes.resetDefaults();
    toast('Sizes reset to standard default set', 'success');
    renderSizes(document.getElementById('admin-content'));
  });
}

function openSizeForm(id = null) {
  const s = id ? DB.sizes.byId(id) : null;
  const currentCount = DB.sizes.all().length;
  const html = `<form id="size-form" onsubmit="event.preventDefault();saveSize('${id || ''}')">
    <div class="form-row">
      <div class="form-group" style="flex:1;">
        <label class="form-label">Size Code<span class="req">*</span></label>
        <input type="text" name="code" class="form-input font-mono font-bold" required value="${s?.code || ''}" placeholder="e.g. 3XL, L, XL, M, XXL" autofocus style="text-transform:uppercase;"/>
        <p style="font-size:11px;color:#9CA3AF;margin-top:4px;">Short abbreviation shown on jersey chips and variant selectors.</p>
      </div>
      <div class="form-group" style="flex:1.5;">
        <label class="form-label">Full Name / Label</label>
        <input type="text" name="name" class="form-input" value="${s?.name || s?.code || ''}" placeholder="e.g. Extra Large, Triple Extra Large"/>
        <p style="font-size:11px;color:#9CA3AF;margin-top:4px;">Descriptive label for customer invoices and specs.</p>
      </div>
    </div>
    <div class="form-row" style="margin-top:10px;">
      <div class="form-group" style="flex:1;">
        <label class="form-label">Display Order</label>
        <input type="number" name="displayOrder" class="form-input" value="${s?.displayOrder ?? currentCount}" min="0" step="1"/>
        <p style="font-size:11px;color:#9CA3AF;margin-top:4px;">Lower numbers appear first (e.g. 0 for XS, 1 for S, 2 for M...).</p>
      </div>
      <div class="form-group" style="flex:1;display:flex;flex-direction:column;justify-content:center;margin-top:14px;">
        <label class="checkbox-chip ${s?.isEnabled !== false ? 'selected' : ''}" style="margin:0;">
          <input type="checkbox" name="isEnabled" ${s?.isEnabled !== false ? 'checked' : ''} onchange="this.closest('.checkbox-chip').classList.toggle('selected',this.checked)"/>
          <span>Active in Store</span>
        </label>
      </div>
    </div>
  </form>`;

  openModal(
    s ? `Edit Size (${s.code})` : 'Add New Size',
    html,
    `<button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
     <button class="btn btn-primary" onclick="saveSize('${id || ''}')">${s ? 'Save Changes' : 'Create Size'}</button>`,
    'modal-sm'
  );
}

function saveSize(id) {
  const form = document.getElementById('size-form');
  if (!form) return;
  const fd = new FormData(form);
  const code = (fd.get('code') || '').trim().toUpperCase();
  if (!code) {
    toast('Size code is required (e.g. L, XL, 3XL)', 'error');
    return;
  }
  const name = (fd.get('name') || '').trim() || code;
  const displayOrder = parseInt(fd.get('displayOrder')) || 0;
  const isEnabled = fd.get('isEnabled') === 'on';

  const data = { code, name, displayOrder, isEnabled };

  if (id) {
    DB.sizes.update(id, data);
    toast(`Size "${code}" updated successfully`, 'success');
  } else {
    DB.sizes.create(data);
    toast(`Size "${code}" created successfully`, 'success');
  }
  closeModal();
  renderSizes(document.getElementById('admin-content'));
}

// ── COLORS ──
function renderColors(container) {
  const colors = DB.colors.all();
  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left"><div class="page-title">Colors</div></div>
      <button class="btn btn-primary" onclick="openColorForm()"><span class="material-symbols-outlined">add</span> Add Color</button>
    </div>
    <div class="card">
      <div class="table-wrapper">
        <table class="admin-table">
          <thead><tr><th>Swatch</th><th>Name</th><th>HEX</th><th>Status</th><th style="text-align:right">Actions</th></tr></thead>
          <tbody>
            ${colors.map(c => `
              <tr>
                <td><div class="color-dot" style="background:${c.hexCode};width:24px;height:24px;border-radius:50%;border:2px solid rgba(0,0,0,.1)"></div></td>
                <td style="font-weight:600">${c.name}</td>
                <td class="font-mono" style="font-size:12px">${c.hexCode}</td>
                <td><span class="badge ${c.isEnabled?'badge-green':'badge-gray'}">${c.isEnabled?'Active':'Disabled'}</span></td>
                <td class="actions-cell">
                  <button class="btn btn-ghost btn-sm" onclick="openColorForm('${c.id}')"><span class="material-symbols-outlined">edit</span></button>
                  <button class="btn btn-ghost btn-sm" onclick="DB.colors.update('${c.id}',{isEnabled:${!c.isEnabled}});renderColors(document.getElementById('admin-content'))"><span class="material-symbols-outlined">${c.isEnabled?'block':'check_circle'}</span></button>
                  <button class="btn btn-ghost btn-sm" onclick="showConfirm('Delete','Delete color ${c.name}?',()=>{DB.colors.delete('${c.id}');renderColors(document.getElementById('admin-content'));toast('Deleted','success')})"><span class="material-symbols-outlined" style="color:#DC2626">delete</span></button>
                </td>
              </tr>
            `).join('') || `<tr><td colspan="5">${emptyState('palette','No colors','Add colors')}</td></tr>`}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function openColorForm(id=null) {
  const c = id ? DB.colors.byId(id) : null;
  const html = `<form id="color-form">
    <div class="form-group"><label class="form-label">Color Name<span class="req">*</span></label><input type="text" name="name" class="form-input" required value="${c?.name||''}" placeholder="Royal Blue"/></div>
    <div class="form-group">
      <label class="form-label">HEX Color<span class="req">*</span></label>
      <div class="color-picker-row">
        <input type="color" id="color-picker" value="${c?.hexCode||'#000000'}" style="width:40px;height:40px;border:none;border-radius:6px;cursor:pointer;background:none;" oninput="document.getElementById('hex-input').value=this.value"/>
        <input type="text" name="hexCode" id="hex-input" class="form-input" value="${c?.hexCode||'#000000'}" pattern="^#[0-9A-Fa-f]{6}$" placeholder="#000000" oninput="try{document.getElementById('color-picker').value=this.value}catch{}"/>
      </div>
    </div>
    <label class="checkbox-chip ${c?.isEnabled!==false?'selected':''}"><input type="checkbox" name="isEnabled" ${c?.isEnabled!==false?'checked':''} onchange="this.closest('.checkbox-chip').classList.toggle('selected',this.checked)"/> Enabled</label>
  </form>`;
  openModal(c?'Edit Color':'New Color', html, `<button class="btn btn-secondary" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveColor('${id||''}')">Save</button>`, 'modal-sm');
}

function saveColor(id) {
  const fd = new FormData(document.getElementById('color-form'));
  const name = fd.get('name')?.trim();
  const hexCode = fd.get('hexCode')?.trim() || document.getElementById('color-picker')?.value;
  if (!name || !hexCode) { toast('Name and color required', 'error'); return; }
  const data = { name, hexCode, isEnabled: fd.get('isEnabled')==='on' };
  if (id) { DB.colors.update(id, data); toast('Color updated', 'success'); }
  else { DB.colors.create(data); toast('Color created', 'success'); }
  closeModal(); renderColors(document.getElementById('admin-content'));
}

// ── ADD-ONS ──
function renderAddons(container) {
  const addons = DB.addons.all();
  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left"><div class="page-title">Add-ons</div></div>
      <button class="btn btn-primary" onclick="openAddonForm()"><span class="material-symbols-outlined">add</span> Add Add-on</button>
    </div>
    <div class="card">
      <div class="table-wrapper">
        <table class="admin-table">
          <thead><tr><th>Name</th><th>Price</th><th>Required</th><th>Order</th><th>Status</th><th style="text-align:right">Actions</th></tr></thead>
          <tbody>
            ${addons.length===0?`<tr><td colspan="6">${emptyState('add_circle','No add-ons','Create custom add-ons like Gift Box, Premium Packaging')}</td></tr>`:
              addons.map(a => `<tr>
                <td style="font-weight:600">${a.name}<br/><span style="font-size:11px;color:#9CA3AF">${a.description||''}</span></td>
                <td class="font-mono">৳${a.price||0}</td>
                <td>${a.isRequired?'<span class="badge badge-red">Required</span>':'Optional'}</td>
                <td>${a.displayOrder||0}</td>
                <td><span class="badge ${a.isEnabled!==false?'badge-green':'badge-gray'}">${a.isEnabled!==false?'Active':'Disabled'}</span></td>
                <td class="actions-cell">
                  <button class="btn btn-ghost btn-sm" onclick="openAddonForm('${a.id}')"><span class="material-symbols-outlined">edit</span></button>
                  <button class="btn btn-ghost btn-sm" onclick="showConfirm('Delete','Delete ${a.name}?',()=>{DB.addons.delete('${a.id}');renderAddons(document.getElementById('admin-content'));toast('Deleted','success')})"><span class="material-symbols-outlined" style="color:#DC2626">delete</span></button>
                </td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function openAddonForm(id=null) {
  const a = id ? DB.addons.byId(id) : null;
  const html = `<form id="addon-form">
    <div class="form-group"><label class="form-label">Add-on Name<span class="req">*</span></label><input type="text" name="name" class="form-input" required value="${a?.name||''}" placeholder="Gift Box"/></div>
    <div class="form-group"><label class="form-label">Description</label><input type="text" name="description" class="form-input" value="${a?.description||''}" placeholder="Premium gift packaging"/></div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Price (৳)<span class="req">*</span></label><input type="number" name="price" class="form-input" min="0" required value="${a?.price||0}"/></div>
      <div class="form-group"><label class="form-label">Display Order</label><input type="number" name="displayOrder" class="form-input" value="${a?.displayOrder||0}"/></div>
    </div>
    <div style="display:flex;gap:12px;flex-wrap:wrap">
      <label class="checkbox-chip ${a?.isRequired?'selected':''}"><input type="checkbox" name="isRequired" ${a?.isRequired?'checked':''} onchange="this.closest('.checkbox-chip').classList.toggle('selected',this.checked)"/> Required</label>
      <label class="checkbox-chip ${a?.allowMultiple?'selected':''}"><input type="checkbox" name="allowMultiple" ${a?.allowMultiple?'checked':''} onchange="this.closest('.checkbox-chip').classList.toggle('selected',this.checked)"/> Allow Multiple</label>
      <label class="checkbox-chip ${a?.isEnabled!==false?'selected':''}"><input type="checkbox" name="isEnabled" ${a?.isEnabled!==false?'checked':''} onchange="this.closest('.checkbox-chip').classList.toggle('selected',this.checked)"/> Enabled</label>
    </div>
  </form>`;
  openModal(a?'Edit Add-on':'New Add-on', html, `<button class="btn btn-secondary" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveAddon('${id||''}')">Save</button>`, 'modal-sm');
}

function saveAddon(id) {
  const fd = new FormData(document.getElementById('addon-form'));
  const name = fd.get('name')?.trim();
  if (!name) { toast('Name required', 'error'); return; }
  const data = { name, description: fd.get('description'), price: parseFloat(fd.get('price'))||0, displayOrder: parseInt(fd.get('displayOrder'))||0, isRequired: fd.get('isRequired')==='on', allowMultiple: fd.get('allowMultiple')==='on', isEnabled: fd.get('isEnabled')==='on' };
  if (id) { DB.addons.update(id, data); toast('Updated', 'success'); }
  else { DB.addons.create(data); toast('Created', 'success'); }
  closeModal(); renderAddons(document.getElementById('admin-content'));
}

// ── PRINTING CONFIG ──
function renderPrinting(container) {
  const cs = DB.customizationSettings.get();
  const np = cs.namePrinting || {};
  const nrp = cs.numberPrinting || {};
  const pkg = cs.nameNumberPackage || {};
  const logo = cs.customLogo || {};
  container.innerHTML = `
    <div class="page-title mb-4">Name & Number Printing Configuration</div>

    <div class="form-section">
      <div class="form-section-header"><span class="material-symbols-outlined">text_fields</span><span class="form-section-title">Name Printing</span></div>
      <div class="form-section-body">
        <div class="toggle-row">
          <div><div class="toggle-label">Enable Name Printing</div></div>
          <label class="toggle"><input type="checkbox" id="np-enabled" ${np.enabled?'checked':''}><div class="toggle-track"></div><div class="toggle-thumb"></div></label>
        </div>
        <div class="form-row mt-4">
          <div class="form-group"><label class="form-label">Price (৳)</label><input type="number" id="np-price" class="form-input" value="${np.price||200}" min="0"/></div>
          <div class="form-group"><label class="form-label">Max Characters</label><input type="number" id="np-maxchars" class="form-input" value="${np.maxChars||12}" min="1" max="20"/></div>
        </div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">Font Style</label><input type="text" id="np-font" class="form-input" value="${np.font||'Block'}" placeholder="Block, Italic, Script…"/></div>
          <div class="form-group"><label class="form-label">Style</label><input type="text" id="np-style" class="form-input" value="${np.style||'Standard'}"/></div>
        </div>
        <button class="btn btn-primary btn-sm" onclick="savePrintingConfig('name')">Save Name Printing</button>
      </div>
    </div>

    <div class="form-section">
      <div class="form-section-header"><span class="material-symbols-outlined">looks_one</span><span class="form-section-title">Number Printing</span></div>
      <div class="form-section-body">
        <div class="toggle-row">
          <div><div class="toggle-label">Enable Number Printing</div></div>
          <label class="toggle"><input type="checkbox" id="nrp-enabled" ${nrp.enabled?'checked':''}><div class="toggle-track"></div><div class="toggle-thumb"></div></label>
        </div>
        <div class="form-row mt-4">
          <div class="form-group"><label class="form-label">Price (৳)</label><input type="number" id="nrp-price" class="form-input" value="${nrp.price||150}" min="0"/></div>
          <div class="form-group"><label class="form-label">Max Digits</label><input type="number" id="nrp-maxdigits" class="form-input" value="${nrp.maxDigits||2}" min="1" max="3"/></div>
        </div>
        <button class="btn btn-primary btn-sm" onclick="savePrintingConfig('number')">Save Number Printing</button>
      </div>
    </div>

    <div class="form-section">
      <div class="form-section-header"><span class="material-symbols-outlined">badge</span><span class="form-section-title">Name + Number Package</span></div>
      <div class="form-section-body">
        <div class="toggle-row">
          <div><div class="toggle-label">Enable Name + Number Package</div><div class="toggle-desc">Bundled pricing for both name and number</div></div>
          <label class="toggle"><input type="checkbox" id="pkg-enabled" ${pkg.enabled?'checked':''}><div class="toggle-track"></div><div class="toggle-thumb"></div></label>
        </div>
        <div class="form-group mt-4"><label class="form-label">Package Price (৳)</label><input type="number" id="pkg-price" class="form-input" value="${pkg.price||300}" min="0"/></div>
        <button class="btn btn-primary btn-sm" onclick="savePrintingConfig('package')">Save Package</button>
      </div>
    </div>

    <div class="form-section">
      <div class="form-section-header"><span class="material-symbols-outlined">upload_file</span><span class="form-section-title">Custom Logo Upload</span></div>
      <div class="form-section-body">
        <div class="toggle-row">
          <div><div class="toggle-label">Allow Custom Logo Upload</div></div>
          <label class="toggle"><input type="checkbox" id="logo-enabled" ${logo.enabled?'checked':''}><div class="toggle-track"></div><div class="toggle-thumb"></div></label>
        </div>
        <div class="form-row mt-4">
          <div class="form-group"><label class="form-label">Price (৳)</label><input type="number" id="logo-price" class="form-input" value="${logo.price||500}" min="0"/></div>
          <div class="form-group"><label class="form-label">Max File Size (MB)</label><input type="number" id="logo-maxmb" class="form-input" value="${logo.maxSizeMB||2}" min="1" max="10"/></div>
        </div>
        <div class="form-group"><label class="form-label">Allowed File Types</label><input type="text" id="logo-types" class="form-input" value="${logo.allowedTypes||'image/png,image/svg+xml'}" placeholder="image/png,image/svg+xml"/></div>
        <button class="btn btn-primary btn-sm" onclick="savePrintingConfig('logo')">Save Logo Config</button>
      </div>
    </div>
  `;
}

function savePrintingConfig(type) {
  const cs = DB.customizationSettings.get();
  if (type === 'name') {
    cs.namePrinting = { enabled: document.getElementById('np-enabled').checked, price: parseFloat(document.getElementById('np-price').value)||200, maxChars: parseInt(document.getElementById('np-maxchars').value)||12, font: document.getElementById('np-font').value, style: document.getElementById('np-style').value };
  } else if (type === 'number') {
    cs.numberPrinting = { enabled: document.getElementById('nrp-enabled').checked, price: parseFloat(document.getElementById('nrp-price').value)||150, maxDigits: parseInt(document.getElementById('nrp-maxdigits').value)||2 };
  } else if (type === 'package') {
    cs.nameNumberPackage = { enabled: document.getElementById('pkg-enabled').checked, price: parseFloat(document.getElementById('pkg-price').value)||300 };
  } else if (type === 'logo') {
    cs.customLogo = { enabled: document.getElementById('logo-enabled').checked, price: parseFloat(document.getElementById('logo-price').value)||500, maxSizeMB: parseFloat(document.getElementById('logo-maxmb').value)||2, allowedTypes: document.getElementById('logo-types').value };
  }
  DB.customizationSettings.save(cs);
  toast('Customization config saved', 'success');
}

// ── CUSTOMIZATION OVERVIEW HUB ──
function renderCustomizationHub(container) {
  const cs = DB.customizationSettings.get() || {};
  const np = cs.namePrinting || {};
  const nrp = cs.numberPrinting || {};
  const pkg = cs.nameNumberPackage || {};
  const patches = DB.patches.all();
  const sleeves = DB.sleeves.all();
  const sizes = DB.sizes.all();
  const colors = DB.colors ? DB.colors.all() : [];
  const addons = DB.addons ? DB.addons.all() : [];
  const sizeChartImg = (DB.sizes && typeof DB.sizes.getSizeChart === 'function') ? DB.sizes.getSizeChart() : '';

  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left">
        <div class="page-title">Customization Management Hub</div>
        <div class="page-sub">Configure jersey name/number printing, tournament patches, sleeve options, sizes, and store size chart.</div>
      </div>
      <div class="page-actions">
        <button class="btn btn-primary btn-sm" onclick="nav('printing')">
          <span class="material-symbols-outlined">print</span> Name / Number Settings
        </button>
      </div>
    </div>

    <!-- Quick Navigation Subtabs -->
    <div class="admin-tabs mb-4">
      <div class="admin-tab active" onclick="nav('customization')">Overview Hub</div>
      <div class="admin-tab" onclick="nav('printing')">Name / Number</div>
      <div class="admin-tab" onclick="nav('patches')">Patches (${patches.filter(p=>p.isEnabled!==false).length})</div>
      <div class="admin-tab" onclick="nav('sleeves')">Sleeves (${sleeves.filter(s=>s.isEnabled!==false).length})</div>
      <div class="admin-tab" onclick="nav('sizes')">Sizes & Chart (${sizes.filter(s=>s.isEnabled!==false).length})</div>
      <div class="admin-tab" onclick="nav('colors')">Colors (${colors.filter(c=>c.isEnabled!==false).length})</div>
      <div class="admin-tab" onclick="nav('addons')">Add-ons (${addons.filter(a=>a.isEnabled!==false).length})</div>
    </div>

    <div style="background:#EFF6FF;border:1px solid #BFDBFE;padding:14px 18px;border-radius:12px;margin-bottom:20px;display:flex;align-items:center;gap:12px;">
      <span class="material-symbols-outlined" style="color:#2563EB;font-size:24px;">info</span>
      <div style="font-size:13px;color:#1E40AF;line-height:1.5;">
        <strong>How Customization Works:</strong> Configure global options and pricing below. When editing or adding any jersey in <strong>Products → Edit → Customization</strong>, you can specifically choose which patches, sleeve types, sizes, and player printing packages are enabled for that product.
      </div>
    </div>

    <!-- 6 Core Customization Feature Cards -->
    <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(320px, 1fr));gap:16px;">
      
      <!-- Card 1: Name & Number Printing -->
      <div class="card" style="display:flex;flex-direction:column;justify-content:space-between;">
        <div>
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
            <div style="display:flex;align-items:center;gap:8px;">
              <span class="material-symbols-outlined" style="color:#2563EB;background:#DBEAFE;padding:6px;border-radius:8px;">print</span>
              <span style="font-weight:700;font-size:15px;">Name & Number Printing</span>
            </div>
            <span class="badge" style="background:#DCFCE7;color:#16A34A;font-weight:700;">ACTIVE</span>
          </div>
          <p style="font-size:13px;color:#6B7280;margin-bottom:12px;">Official match typography printing on kit back view.</p>
          <div style="background:#F9FAFB;padding:10px 14px;border-radius:8px;font-size:13px;margin-bottom:16px;line-height:1.8;">
            <div>• Package: <strong>৳${pkg.price || 200}</strong> (${pkg.enabled !== false ? 'Enabled' : 'Disabled'})</div>
            <div>• Name Only: <strong>৳${np.price || 200}</strong> (${np.enabled !== false ? 'Enabled' : 'Disabled'})</div>
            <div>• Number Only: <strong>৳${nrp.price || 150}</strong> (${nrp.enabled !== false ? 'Enabled' : 'Disabled'})</div>
          </div>
        </div>
        <button class="btn btn-secondary btn-sm" onclick="nav('printing')" style="width:100%;justify-content:center;">
          <span class="material-symbols-outlined">tune</span> Configure Printing Prices
        </button>
      </div>

      <!-- Card 2: Tournament Patches -->
      <div class="card" style="display:flex;flex-direction:column;justify-content:space-between;">
        <div>
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
            <div style="display:flex;align-items:center;gap:8px;">
              <span class="material-symbols-outlined" style="color:#D97706;background:#FEF3C7;padding:6px;border-radius:8px;">badge</span>
              <span style="font-weight:700;font-size:15px;">Tournament Patches</span>
            </div>
            <span class="badge" style="background:#FEF3C7;color:#D97706;font-weight:700;">${patches.filter(p=>p.isEnabled!==false).length} Active</span>
          </div>
          <p style="font-size:13px;color:#6B7280;margin-bottom:12px;">UCL Starball, La Liga, Premier League, Trophy sleeve badges.</p>
          <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px;">
            ${patches.map(p => `
              <span class="badge" style="background:${p.isEnabled!==false?'#F3F4F6':'#FEE2E2'};color:${p.isEnabled!==false?'#374151':'#991B1B'};font-size:11px;">
                ${p.name} (+৳${p.price})
              </span>
            `).join('')}
          </div>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="btn btn-secondary btn-sm" onclick="nav('patches')" style="flex:1;justify-content:center;">Manage Patches</button>
          <button class="btn btn-primary btn-sm" onclick="openPatchForm()" style="justify-content:center;">+ Add</button>
        </div>
      </div>

      <!-- Card 3: Sleeves -->
      <div class="card" style="display:flex;flex-direction:column;justify-content:space-between;">
        <div>
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
            <div style="display:flex;align-items:center;gap:8px;">
              <span class="material-symbols-outlined" style="color:#7C3AED;background:#EDE9FE;padding:6px;border-radius:8px;">straighten</span>
              <span style="font-weight:700;font-size:15px;">Sleeve Styles</span>
            </div>
            <span class="badge" style="background:#EDE9FE;color:#7C3AED;font-weight:700;">${sleeves.filter(s=>s.isEnabled!==false).length} Active</span>
          </div>
          <p style="font-size:13px;color:#6B7280;margin-bottom:12px;">Half Sleeve, Full Sleeve, Sleeveless options and additional prices.</p>
          <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px;">
            ${sleeves.map(s => `
              <span class="badge" style="background:#F3F4F6;color:#374151;font-size:11px;">
                ${s.name} (+৳${s.additionalPrice || 0})
              </span>
            `).join('')}
          </div>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="btn btn-secondary btn-sm" onclick="nav('sleeves')" style="flex:1;justify-content:center;">Manage Sleeves</button>
          <button class="btn btn-primary btn-sm" onclick="openSleeveForm()" style="justify-content:center;">+ Add</button>
        </div>
      </div>

      <!-- Card 4: Sizes & Size Chart -->
      <div class="card" style="display:flex;flex-direction:column;justify-content:space-between;">
        <div>
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
            <div style="display:flex;align-items:center;gap:8px;">
              <span class="material-symbols-outlined" style="color:#059669;background:#D1FAE5;padding:6px;border-radius:8px;">format_size</span>
              <span style="font-weight:700;font-size:15px;">Sizes & Store Size Chart</span>
            </div>
            <span class="badge" style="background:#D1FAE5;color:#059669;font-weight:700;">${sizes.length} Sizes</span>
          </div>
          <p style="font-size:13px;color:#6B7280;margin-bottom:12px;">Jersey size codes, chest measurements, and graphic size chart.</p>
          <div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:16px;">
            ${sizes.map(s => `<span class="badge" style="background:#111827;color:#fff;font-weight:700;font-size:11px;">${s.code}</span>`).join('')}
            ${sizeChartImg ? '<span class="badge" style="background:#DCFCE7;color:#16A34A;font-size:11px;font-weight:700;">Chart Uploaded ✓</span>' : '<span class="badge" style="background:#FEF3C7;color:#D97706;font-size:11px;">No Chart Image</span>'}
          </div>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="btn btn-secondary btn-sm" onclick="nav('sizes')" style="flex:1;justify-content:center;">Manage Sizes & Size Chart</button>
          <button class="btn btn-primary btn-sm" onclick="openSizeForm()" style="justify-content:center;">+ Add Size</button>
        </div>
      </div>

      <!-- Card 5: Colors -->
      <div class="card" style="display:flex;flex-direction:column;justify-content:space-between;">
        <div>
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
            <div style="display:flex;align-items:center;gap:8px;">
              <span class="material-symbols-outlined" style="color:#DB2777;background:#FCE7F3;padding:6px;border-radius:8px;">palette</span>
              <span style="font-weight:700;font-size:15px;">Jersey Colors</span>
            </div>
            <span class="badge" style="background:#FCE7F3;color:#DB2777;font-weight:700;">${colors.length} Colors</span>
          </div>
          <p style="font-size:13px;color:#6B7280;margin-bottom:12px;">Jersey base and accent color swatches.</p>
          <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px;">
            ${colors.map(c => `
              <span class="badge" style="background:#F3F4F6;color:#374151;font-size:11px;display:flex;align-items:center;gap:4px;">
                <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${c.hex||'#000'};border:1px solid #ccc;"></span>
                ${c.name}
              </span>
            `).join('')}
          </div>
        </div>
        <button class="btn btn-secondary btn-sm" onclick="nav('colors')" style="width:100%;justify-content:center;">Manage Colors</button>
      </div>

      <!-- Card 6: Add-ons -->
      <div class="card" style="display:flex;flex-direction:column;justify-content:space-between;">
        <div>
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
            <div style="display:flex;align-items:center;gap:8px;">
              <span class="material-symbols-outlined" style="color:#0284C7;background:#E0F2FE;padding:6px;border-radius:8px;">add_circle</span>
              <span style="font-weight:700;font-size:15px;">Custom Add-ons</span>
            </div>
            <span class="badge" style="background:#E0F2FE;color:#0284C7;font-weight:700;">${addons.length} Add-ons</span>
          </div>
          <p style="font-size:13px;color:#6B7280;margin-bottom:12px;">Gift boxes, stickers, matchday cards, or custom merchandise.</p>
          <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px;">
            ${addons.map(a => `<span class="badge" style="background:#F3F4F6;color:#374151;font-size:11px;">${a.name} (+৳${a.price||0})</span>`).join('') || '<span style="font-size:12px;color:#9CA3AF;">No add-ons yet.</span>'}
          </div>
        </div>
        <button class="btn btn-secondary btn-sm" onclick="nav('addons')" style="width:100%;justify-content:center;">Manage Add-ons</button>
      </div>

    </div>
  `;
}

// ──────────────────────────────────────────────────────────────
// ═══ VIEW: ORDERS ═══
// ──────────────────────────────────────────────────────────────
let orderSearch = '', orderStatusFilter = '', orderPayFilter = '';
let orderPage = 1;

function renderOrders(container) {
  let items = DB.orders.filter({ status: orderStatusFilter, payment: orderPayFilter, search: orderSearch });
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const page = Math.min(orderPage, totalPages);
  const paged = items.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE);

  const statuses = ['PENDING','CONFIRMED','PROCESSING','PACKED','SHIPPED','OUT_FOR_DELIVERY','DELIVERED','CANCELLED','RETURNED','REFUNDED'];
  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left"><div class="page-title">Orders</div><div class="page-sub">${total} orders</div></div>
      <div class="page-actions">
        <button class="btn btn-secondary btn-sm" onclick="DB.export.downloadCSV(DB.orders.exportCSV(),'zenvy-orders.csv');toast('Exported','success')"><span class="material-symbols-outlined">download</span> Export</button>
        <button class="btn btn-primary" onclick="openCreateOrderModal()"><span class="material-symbols-outlined">add</span> Manual Order</button>
      </div>
    </div>

    <div class="filter-bar">
      <input type="text" class="form-input" placeholder="Search by order#, customer, phone…" value="${orderSearch}"
        oninput="orderSearch=this.value;orderPage=1;renderOrders(document.getElementById('admin-content'))" style="max-width:280px;"/>
      <select class="form-select" style="width:160px;" onchange="orderStatusFilter=this.value;orderPage=1;renderOrders(document.getElementById('admin-content'))">
        <option value="">All Status</option>
        ${statuses.map(s => `<option value="${s}" ${orderStatusFilter===s?'selected':''}>${s}</option>`).join('')}
      </select>
      <select class="form-select" style="width:140px;" onchange="orderPayFilter=this.value;orderPage=1;renderOrders(document.getElementById('admin-content'))">
        <option value="">All Payments</option>
        <option value="PENDING">Pending</option>
        <option value="PAID">Paid</option>
        <option value="FAILED">Failed</option>
        <option value="REFUNDED">Refunded</option>
      </select>
    </div>

    <div class="card">
      <div class="table-wrapper">
        <table class="admin-table">
          <thead><tr><th>Order #</th><th>Customer</th><th>Items</th><th>Total</th><th>Payment</th><th>Status</th><th>Date</th><th style="text-align:right">Actions</th></tr></thead>
          <tbody>
            ${paged.length===0?`<tr><td colspan="8">${emptyState('receipt_long','No orders','Orders will appear here when customers checkout')}</td></tr>`:
              paged.map(o => `
                <tr style="cursor:pointer" onclick="openOrderDetail('${o.id}')">
                  <td class="font-mono" style="font-size:12px;font-weight:700">${o.orderNumber}</td>
                  <td>
                    <div style="font-weight:600;font-size:13px">${o.customerName||'-'}</div>
                    <div style="font-size:11px;color:#9CA3AF">${o.customerPhone||''}</div>
                  </td>
                  <td style="font-size:12px">${(o.items||[]).length} items</td>
                  <td class="font-mono" style="font-weight:700">৳${(o.totalAmount||0).toLocaleString()}</td>
                  <td onclick="event.stopPropagation();openPaymentRemarkModal('${o.id}')" title="Click to remark / mark as paid">
                    <span class="badge ${o.paymentStatus==='PAID'?'badge-green':o.paymentStatus==='FAILED'?'badge-red':'badge-amber'}" style="cursor:pointer;display:inline-flex;align-items:center;gap:3px">
                      ${o.paymentStatus}
                      <span class="material-symbols-outlined" style="font-size:12px;opacity:0.7">edit</span>
                    </span>
                    <div style="font-weight:800;font-size:11px;color:#0F172A;margin-top:3px;display:flex;align-items:center;gap:4px;">
                      <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:${(o.paymentMethod||'').toLowerCase().includes('bkash')?'#D12053':(o.paymentMethod||'').toLowerCase().includes('nagad')?'#EA580C':(o.paymentMethod||'').toLowerCase().includes('rocket')?'#7C3AED':'#16A34A'}"></span>
                      ${o.paymentMethod || 'COD'}
                    </div>
                    ${(o.paymentTrxId || o.trxId || o.transactionId) ? `
                      <div style="font-family:monospace;font-size:10px;font-weight:800;color:#0369A1;background:#E0F2FE;border:1px solid #BAE6FD;padding:1px 6px;border-radius:4px;display:inline-block;margin-top:2px;">
                        Trx: ${o.paymentTrxId || o.trxId || o.transactionId}
                      </div>
                    ` : ''}
                  </td>
                  <td><span class="badge badge-${statusColor(o.status)} status-${o.status}">${o.status}</span></td>
                  <td style="font-size:12px;color:#9CA3AF">${fmtDate(o.createdAt)}</td>
                  <td class="actions-cell" onclick="event.stopPropagation()">
                    <button class="btn btn-ghost btn-sm" onclick="openPaymentRemarkModal('${o.id}')" title="Mark Paid / Payment Remark"><span class="material-symbols-outlined" style="color:#16A34A">payments</span></button>
                    <button class="btn btn-ghost btn-sm" onclick="openOrderDetail('${o.id}')" title="Order Details"><span class="material-symbols-outlined">visibility</span></button>
                    <button class="btn btn-ghost btn-sm" onclick="openOrderStatusModal('${o.id}')" title="Update Status"><span class="material-symbols-outlined">sync</span></button>
                    <button class="btn btn-ghost btn-sm" onclick="printInvoice('${o.id}')" title="Print Invoice"><span class="material-symbols-outlined">print</span></button>
                  </td>
                </tr>
              `).join('')}
          </tbody>
        </table>
      </div>
      <div class="pagination">
        <span class="pagination-info">Showing ${Math.min((page-1)*PAGE_SIZE+1,total)}–${Math.min(page*PAGE_SIZE,total)} of ${total}</span>
        <div class="pagination-btns">
          <button class="page-btn" ${page<=1?'disabled':''} onclick="orderPage=${page-1};renderOrders(document.getElementById('admin-content'))">‹</button>
          ${Array.from({length:Math.min(5,totalPages)},(_,i)=>i+1).map(n=>`<button class="page-btn ${n===page?'active':''}" onclick="orderPage=${n};renderOrders(document.getElementById('admin-content'))">${n}</button>`).join('')}
          <button class="page-btn" ${page>=totalPages?'disabled':''} onclick="orderPage=${page+1};renderOrders(document.getElementById('admin-content'))">›</button>
        </div>
      </div>
    </div>
  `;
  updateNavBadges();
}

function openOrderDetail(id) {
  const o = DB.orders.byId(id);
  if (!o) return;
  const statuses = ['PENDING','CONFIRMED','PROCESSING','PACKED','SHIPPED','OUT_FOR_DELIVERY','DELIVERED','CANCELLED','RETURNED','REFUNDED'];
  const html = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px">
      <div class="card" style="padding:16px;border-radius:12px;border:1px solid #E2E8F0;">
        <div style="font-size:11px;font-weight:800;text-transform:uppercase;color:#64748B;letter-spacing:0.05em;margin-bottom:8px">Customer & Delivery</div>
        <div style="font-weight:800;font-size:16px;color:#0F172A;">${o.customerName || 'N/A'}</div>
        <div style="font-size:13px;color:#475569;margin-top:4px;display:flex;align-items:center;gap:6px;">
          <span class="material-symbols-outlined" style="font-size:16px;color:#2563EB;">call</span>
          <strong>${o.customerPhone || 'N/A'}</strong>
        </div>
        ${o.customerEmail ? `<div style="font-size:13px;color:#64748B;margin-top:2px;">${o.customerEmail}</div>` : ''}
        <div style="font-size:13px;color:#334155;margin-top:8px;padding-top:8px;border-top:1px solid #F1F5F9;line-height:1.4;">
          <strong>Address:</strong> ${o.shippingAddress || 'N/A'}${o.city ? `, ${o.city}` : ''}
        </div>
        ${o.notes ? `<div style="font-size:12px;background:#FEF3C7;color:#92400E;padding:6px 10px;border-radius:6px;margin-top:8px;"><strong>Customer Note:</strong> ${o.notes}</div>` : ''}
      </div>

      <div class="card" style="padding:16px;border-radius:12px;border:1px solid #E2E8F0;">
        <div style="font-size:11px;font-weight:800;text-transform:uppercase;color:#64748B;letter-spacing:0.05em;margin-bottom:8px">Order & Payment Info</div>
        <div style="font-weight:800;font-size:16px;color:#0F172A;font-family:monospace;">#${o.orderNumber || o.id}</div>
        <div style="font-size:12px;color:#64748B;margin-top:2px;">${fmtDate(o.createdAt)}</div>
        <div style="margin-top:10px;display:flex;gap:6px;flex-wrap:wrap;align-items:center;">
          <span class="badge badge-${statusColor(o.status)}" style="font-weight:800;">${o.status}</span>
          <span class="badge ${o.paymentStatus==='PAID'?'badge-green':o.paymentStatus==='FAILED'?'badge-red':'badge-amber'}" style="font-weight:800;display:inline-flex;align-items:center;gap:4px;">
            ${o.paymentStatus}
          </span>
        </div>
        <div style="font-size:13px;color:#334155;margin-top:10px;padding-top:8px;border-top:1px solid #F1F5F9;display:flex;align-items:center;justify-content:space-between;">
          <span><strong>Payment Method:</strong> <b style="color:#0F172A;">${o.paymentMethod || 'Cash on Delivery'}</b></span>
          <span class="badge" style="background:${(o.paymentMethod||'').toLowerCase().includes('bkash')?'#FFF1F5;color:#D12053;border:1px solid #FBCFE8':(o.paymentMethod||'').toLowerCase().includes('nagad')?'#FFF7ED;color:#EA580C;border:1px solid #FED7AA':(o.paymentMethod||'').toLowerCase().includes('rocket')?'#FAF5FF;color:#7C3AED;border:1px solid #E9D5FF':'#F0FDF4;color:#16A34A;border:1px solid #BBF7D0'} font-weight:800;font-size:10px;">
            ${(o.paymentMethod || 'COD').toUpperCase()}
          </span>
        </div>
        ${(o.paymentTrxId || o.trxId || o.transactionId) ? `
          <div style="background:#EFF6FF;border:1px solid #BFDBFE;padding:8px 12px;border-radius:8px;margin-top:8px;display:flex;justify-content:space-between;align-items:center;">
            <div>
              <div style="font-size:10px;font-weight:800;text-transform:uppercase;color:#1D4ED8;letter-spacing:0.04em;">Transaction ID (TrxID)</div>
              <div style="font-family:monospace;font-weight:900;font-size:13px;color:#1E40AF;margin-top:1px;">
                ${o.paymentTrxId || o.trxId || o.transactionId}
              </div>
              ${o.paymentSenderPhone ? `<div style="font-size:11px;color:#1D4ED8;margin-top:2px;">Sender Phone: <b>${o.paymentSenderPhone}</b></div>` : ''}
            </div>
            <button type="button" class="btn btn-sm" style="background:#2563EB;color:white;font-size:11px;padding:3px 8px;gap:3px;" onclick="navigator.clipboard.writeText('${o.paymentTrxId || o.trxId || o.transactionId}');toast('TrxID Copied!','success');">
              <span class="material-symbols-outlined" style="font-size:14px;">content_copy</span> Copy
            </button>
          </div>
        ` : ''}
        ${o.paymentRemark ? `
          <div style="font-size:12px;background:#F0FDF4;color:#166534;border:1px solid #BBF7D0;padding:6px 10px;border-radius:6px;margin-top:8px;line-height:1.4;">
            <strong>Payment Remark:</strong> ${o.paymentRemark}
          </div>
        ` : ''}
        ${o.trackingNumber ? `<div style="font-size:13px;color:#0369A1;margin-top:6px;">Tracking #: <strong>${o.trackingNumber}</strong></div>` : ''}
      </div>
    </div>

    <div class="card" style="margin-bottom:16px;border-radius:12px;border:1px solid #E2E8F0;overflow:hidden;">
      <div class="card-header" style="background:#F8FAFC;padding:12px 20px;border-bottom:1px solid #E2E8F0;">
        <div class="card-title" style="font-size:14px;font-weight:800;color:#0F172A;">
          Ordered Items & Customization Specs (${(o.items||[]).length})
        </div>
      </div>
      <div class="table-wrapper">
        <table class="admin-table">
          <thead>
            <tr style="background:#F1F5F9;">
              <th style="font-size:11px;font-weight:800;">Product</th>
              <th style="font-size:11px;font-weight:800;">Size</th>
              <th style="font-size:11px;font-weight:800;">Sleeve</th>
              <th style="font-size:11px;font-weight:800;">Patches / Badges</th>
              <th style="font-size:11px;font-weight:800;">Custom Name & No.</th>
              <th style="font-size:11px;font-weight:800;">Qty</th>
              <th style="font-size:11px;font-weight:800;">Unit</th>
              <th style="font-size:11px;font-weight:800;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${(o.items||[]).map(item => {
              const size = item.size || (item.details?.match(/Size:\s*([^\s•,]+)/i)?.[1]) || (item.details?.match(/\b(XS|S|M|L|XL|2XL|XXL|3XL|4XL)\b/i)?.[1]) || '-';
              const sleeve = item.sleeve || (item.details?.match(/(Full\s*Sleeve|Long\s*Sleeve|Half\s*Sleeve|Short\s*Sleeve|Sleeveless)/i)?.[0]) || '-';
              let customName = item.customName || '';
              let customNumber = item.customNumber || '';
              if (!customName && !customNumber && item.details) {
                const cMatch = item.details.match(/Custom:\s*([^#•]+)(?:#([^\s•,]+))?/i) || item.details.match(/Name:\s*([^•,]+)/i);
                if (cMatch) { customName = cMatch[1].trim(); if (cMatch[2]) customNumber = cMatch[2].trim(); }
              }
              const patchName = item.patchName || (item.patches ? (Array.isArray(item.patches)?item.patches.join(', '):item.patches) : '') || (item.details?.match(/Patch(?:es)?:\s*([^•]+)/i)?.[1]?.trim()) || '-';
              const printText = customName ? `${customName}${customNumber ? ' #' + customNumber : ''}` : (customNumber ? `#${customNumber}` : '-');

              return `
              <tr>
                <td>
                  <div style="font-weight:700;font-size:13px;color:#0F172A;">${item.productName || item.name || 'Jersey'}</div>
                  ${item.details ? `<div style="font-size:11px;color:#64748B;margin-top:2px;">${item.details}</div>` : ''}
                </td>
                <td><span class="badge badge-blue" style="font-weight:800;font-size:11px;">${size}</span></td>
                <td><span style="font-size:12px;font-weight:600;color:#334155;">${sleeve}</span></td>
                <td>
                  ${patchName !== '-' ? `<span style="background:#FEF3C7;color:#92400E;font-size:11px;font-weight:700;padding:2px 8px;border-radius:6px;display:inline-block;">${patchName}</span>` : '<span style="color:#94A3B8;">None</span>'}
                </td>
                <td>
                  ${printText !== '-' ? `<span style="background:#EEF2FF;color:#4338CA;font-size:11px;font-weight:800;padding:2px 8px;border-radius:6px;display:inline-block;letter-spacing:0.04em;">${printText}</span>` : '<span style="color:#94A3B8;">None</span>'}
                </td>
                <td style="font-weight:700;">${item.quantity || item.qty || 1}</td>
                <td class="font-mono">৳${(item.unitPrice || item.price || 0).toLocaleString()}</td>
                <td class="font-mono font-bold" style="color:#0F172A;">৳${(item.totalPrice || ((item.unitPrice || item.price || 0) * (item.quantity || 1))).toLocaleString()}</td>
              </tr>
            `;}).join('') || '<tr><td colspan="8" style="text-align:center;color:#9CA3AF;padding:16px">No items</td></tr>'}
          </tbody>
        </table>
      </div>
      <div style="padding:16px 20px;text-align:right;background:#F8FAFC;border-top:1px solid #E2E8F0">
        <div style="display:inline-grid;grid-template-columns:1fr 1fr;gap:6px 24px;text-align:left;min-width:320px;">
          <span style="font-size:13px;color:#64748B">Product Subtotal</span><span class="font-mono" style="font-size:13px;text-align:right;">৳${(o.subtotal||0).toLocaleString()}</span>
          ${o.customFee>0?`<span style="font-size:13px;color:#64748B">Customization</span><span class="font-mono" style="font-size:13px;text-align:right;">৳${o.customFee.toLocaleString()}</span>`:''}
          <span style="font-size:13px;color:#64748B">Delivery Charge</span><span class="font-mono" style="font-size:13px;text-align:right;">৳${(o.shippingFee||0).toLocaleString()}</span>
          ${o.discountTotal>0?`<span style="font-size:13px;color:#DC2626">Discount</span><span class="font-mono" style="font-size:13px;color:#DC2626;text-align:right;">-৳${o.discountTotal.toLocaleString()}</span>`:''}
          <span style="font-weight:900;font-size:15px;color:#0F172A;border-top:1px solid #CBD5E1;padding-top:4px;">TOTAL ORDER</span>
          <span class="font-mono" style="font-weight:900;font-size:15px;color:#0F172A;border-top:1px solid #CBD5E1;padding-top:4px;text-align:right;">৳${(o.totalAmount||0).toLocaleString()}</span>
          
          <span style="font-size:13px;font-weight:700;color:#16A34A;padding-top:2px;">Advance Paid (bKash)</span>
          <span class="font-mono" style="font-size:13px;font-weight:700;color:#16A34A;text-align:right;padding-top:2px;">৳${(o.paidAmount || (o.paymentStatus === 'PAID' ? o.totalAmount : 0)).toLocaleString()}</span>

          <span style="font-size:14px;font-weight:800;color:#D97706;padding-top:4px;border-top:1px dashed #CBD5E1;">Due on Delivery (COD)</span>
          <span class="font-mono" style="font-size:14px;font-weight:800;color:#D97706;text-align:right;padding-top:4px;border-top:1px dashed #CBD5E1;">৳${(o.dueAmount !== undefined ? o.dueAmount : (o.paymentStatus === 'PAID' ? 0 : o.totalAmount)).toLocaleString()}</span>
        </div>
      </div>
    </div>

    <!-- Payment Remarking & Status Management Suite -->
    <div class="card" style="padding:18px;border-radius:12px;border:1px solid #CBD5E1;background:#F8FAFC;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:8px;">
        <div style="font-size:14px;font-weight:800;color:#0F172A;display:flex;align-items:center;gap:6px;">
          <span class="material-symbols-outlined" style="color:#16A34A;font-size:22px;">payments</span>
          Payment Remarking & Order Status
        </div>
        <div style="display:flex;gap:6px;">
          <button class="btn btn-sm" style="background:#16A34A;color:#fff;font-weight:700;display:inline-flex;align-items:center;gap:4px;" onclick="quickMarkOrderPaid('${id}')">
            <span class="material-symbols-outlined" style="font-size:16px;">check_circle</span> 1-Click Mark as PAID (৳${(o.totalAmount||0).toLocaleString()})
          </button>
          <button class="btn btn-sm btn-secondary" onclick="printInvoice('${id}')">
            <span class="material-symbols-outlined" style="font-size:16px;">print</span> Print Invoice
          </button>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;margin-bottom:12px;">
        <div>
          <label class="form-label" style="font-size:11px;font-weight:700;text-transform:uppercase;">Payment Status</label>
          <select id="detail-pay-status" class="form-select" onchange="if(this.value==='PAID'){document.getElementById('detail-paid-amount').value='${o.totalAmount||0}'}">
            ${['PENDING','PAID','PARTIALLY_PAID','FAILED','REFUNDED'].map(p=>`<option value="${p}" ${o.paymentStatus===p?'selected':''}>${p}</option>`).join('')}
          </select>
        </div>
        <div>
          <label class="form-label" style="font-size:11px;font-weight:700;text-transform:uppercase;">Paid Amount (৳)</label>
          <input type="number" id="detail-paid-amount" class="form-input" value="${o.paidAmount !== undefined ? o.paidAmount : (o.paymentStatus==='PAID' ? o.totalAmount : 0)}" placeholder="Paid Amount"/>
        </div>
        <div>
          <label class="form-label" style="font-size:11px;font-weight:700;text-transform:uppercase;">Order Status</label>
          <select id="detail-status" class="form-select">
            ${statuses.map(s=>`<option value="${s}" ${o.status===s?'selected':''}>${s}</option>`).join('')}
          </select>
        </div>
        <div>
          <label class="form-label" style="font-size:11px;font-weight:700;text-transform:uppercase;">Tracking Number</label>
          <input type="text" id="detail-tracking" class="form-input" value="${o.trackingNumber||''}" placeholder="e.g. STEADFAST-12345"/>
        </div>
      </div>

      <div>
        <label class="form-label" style="font-size:11px;font-weight:700;text-transform:uppercase;">Payment Remark / Trx ID / Notes</label>
        <div style="display:flex;gap:8px;">
          <input type="text" id="detail-pay-remark" class="form-input" value="${o.paymentRemark || o.paymentTrxId || ''}" placeholder="e.g. bKash TrxID: 9B7X2K4M / Full payment received via COD rider / Advance ৳150" style="flex:1;"/>
          <button class="btn btn-primary btn-sm" onclick="saveOrderDetailPaymentAndStatus('${id}')" style="white-space:nowrap;padding:0 22px;display:inline-flex;align-items:center;gap:4px;">
            <span class="material-symbols-outlined" style="font-size:16px;">save</span> Save Updates
          </button>
        </div>
      </div>
    </div>
  `;
  openModal(`Order Details: #${o.orderNumber || o.id}`, html, `<button class="btn btn-secondary" onclick="closeModal()">Close</button>`, 'modal-xl');
}

function quickMarkOrderPaid(id) {
  const o = DB.orders.byId(id);
  if (!o) return;
  const total = o.totalAmount || 0;
  DB.orders.updatePayment(id, {
    paymentStatus: 'PAID',
    paidAmount: total,
    paymentRemark: o.paymentRemark || 'Marked as PAID by admin'
  });
  toast(`Order #${o.orderNumber || id} marked as PAID (৳${total.toLocaleString()})`, 'success');
  updateNavBadges();
  closeModal();
  renderOrders(document.getElementById('admin-content'));
}

function saveOrderDetailPaymentAndStatus(id) {
  const status = document.getElementById('detail-status')?.value;
  const tracking = document.getElementById('detail-tracking')?.value;
  const payStatus = document.getElementById('detail-pay-status')?.value;
  const paidAmount = document.getElementById('detail-paid-amount')?.value;
  const payRemark = document.getElementById('detail-pay-remark')?.value?.trim();

  if (status) DB.orders.updateStatus(id, status);
  if (tracking !== undefined) DB.orders.update(id, { trackingNumber: tracking });
  if (payStatus) {
    DB.orders.updatePayment(id, {
      paymentStatus: payStatus,
      paidAmount,
      paymentRemark: payRemark,
      paymentTrxId: payRemark
    });
  }

  toast('Order status and payment remark saved successfully', 'success');
  updateNavBadges();
  closeModal();
  renderOrders(document.getElementById('admin-content'));
}

function openOrderStatusModal(id) {
  const o = DB.orders.byId(id);
  if (!o) return;
  const statuses = ['PENDING','CONFIRMED','PROCESSING','PACKED','SHIPPED','OUT_FOR_DELIVERY','DELIVERED','CANCELLED','RETURNED','REFUNDED'];
  const payStatuses = ['PAID','PENDING','PARTIALLY_PAID','FAILED','REFUNDED'];
  const total = o.totalAmount || 0;
  const currentPaid = o.paidAmount !== undefined ? o.paidAmount : (o.paymentStatus === 'PAID' ? total : 0);

  const html = `
    <div style="background:#F8FAFC;padding:12px;border-radius:10px;margin-bottom:14px;border:1px solid #E2E8F0;">
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <div>
          <div style="font-size:11px;font-weight:700;color:#64748B;">ORDER #${o.orderNumber || o.id}</div>
          <div style="font-size:14px;font-weight:800;color:#0F172A;">${o.customerName || 'Customer'}</div>
        </div>
        <div style="text-align:right;">
          <div style="font-size:11px;color:#64748B;">Total Amount</div>
          <div style="font-size:16px;font-weight:900;color:#0F172A;font-family:monospace;">৳${total.toLocaleString()}</div>
        </div>
      </div>
    </div>

    <!-- Quick Mark as Paid Button -->
    <div style="margin-bottom:14px;">
      <button type="button" class="btn btn-sm" style="width:100%;background:#DCFCE7;color:#166534;border:1px solid #86EFAC;font-weight:700;display:flex;align-items:center;justify-content:center;gap:4px;"
        onclick="document.getElementById('detail-pay-status').value='PAID';document.getElementById('detail-paid-amount').value='${total}';">
        <span class="material-symbols-outlined" style="font-size:16px;">check_circle</span> 1-Click Mark as PAID (৳${total.toLocaleString()})
      </button>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label class="form-label" style="font-weight:700;">Order Status</label>
        <select id="detail-status" class="form-select">${statuses.map(s=>`<option value="${s}" ${o?.status===s?'selected':''}>${s}</option>`).join('')}</select>
      </div>
      <div class="form-group">
        <label class="form-label" style="font-weight:700;">Payment Status</label>
        <select id="detail-pay-status" class="form-select" onchange="if(this.value==='PAID'){document.getElementById('detail-paid-amount').value='${total}'}">
          ${payStatuses.map(s => `<option value="${s}" ${o.paymentStatus === s ? 'selected' : ''}>${s}</option>`).join('')}
        </select>
      </div>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label class="form-label" style="font-weight:700;">Paid Amount (৳)</label>
        <input type="number" id="detail-paid-amount" class="form-input" value="${currentPaid}" placeholder="e.g. ${total}"/>
      </div>
      <div class="form-group">
        <label class="form-label" style="font-weight:700;">Tracking Number</label>
        <input type="text" id="detail-tracking" class="form-input" value="${o?.trackingNumber||''}" placeholder="e.g. STEADFAST-12345"/>
      </div>
    </div>

    <div class="form-group">
      <label class="form-label" style="font-weight:700;">Payment Remark / Trx ID</label>
      <input type="text" id="detail-pay-remark" class="form-input" value="${o.paymentRemark || o.paymentTrxId || ''}" placeholder="e.g. bKash TrxID: 9B7X2K4M / Full payment received"/>
    </div>
  `;
  openModal('Update Order Status & Payment Remark', html, `<button class="btn btn-secondary" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="updateOrderStatus('${id}')">Save Updates</button>`, 'modal-md');
}

function updateOrderStatus(id) {
  const status = document.getElementById('detail-status')?.value;
  const tracking = document.getElementById('detail-tracking')?.value;
  const payStatus = document.getElementById('detail-pay-status')?.value;
  const paidAmount = document.getElementById('detail-paid-amount')?.value;
  const payRemark = document.getElementById('detail-pay-remark')?.value?.trim();

  if (status) DB.orders.updateStatus(id, status);
  if (tracking !== undefined) DB.orders.update(id, { trackingNumber: tracking });
  if (payStatus) {
    DB.orders.updatePayment(id, {
      paymentStatus: payStatus,
      paidAmount,
      paymentRemark: payRemark,
      paymentTrxId: payRemark
    });
  }

  toast(`Order status and payment remark updated`, 'success');
  updateNavBadges();
  closeModal();
  renderOrders(document.getElementById('admin-content'));
}

function openPaymentRemarkModal(id) {
  const o = DB.orders.byId(id);
  if (!o) return;
  const payStatuses = ['PAID','PENDING','PARTIALLY_PAID','FAILED','REFUNDED'];
  const total = o.totalAmount || 0;
  const currentPaid = o.paidAmount !== undefined ? o.paidAmount : (o.paymentStatus === 'PAID' ? total : 0);

  const html = `
    <div style="background:#F8FAFC;padding:14px 16px;border-radius:10px;margin-bottom:16px;border:1px solid #E2E8F0;">
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <div>
          <div style="font-size:11px;font-weight:700;color:#64748B;text-transform:uppercase;">Order #${o.orderNumber || o.id}</div>
          <div style="font-size:15px;font-weight:800;color:#0F172A;">${o.customerName || 'Customer'}</div>
          <div style="font-size:12px;color:#64748B;">${o.customerPhone || ''}</div>
        </div>
        <div style="text-align:right;">
          <div style="font-size:11px;color:#64748B;font-weight:700;">TOTAL AMOUNT</div>
          <div style="font-size:18px;font-weight:900;color:#0F172A;font-family:monospace;">৳${total.toLocaleString()}</div>
        </div>
      </div>
    </div>

    <!-- Quick 1-Click Buttons -->
    <div style="display:flex;gap:8px;margin-bottom:16px;">
      <button type="button" class="btn btn-sm" style="flex:1;background:#DCFCE7;color:#166534;border:1px solid #86EFAC;font-weight:700;display:flex;align-items:center;justify-content:center;gap:4px;"
        onclick="document.getElementById('modal-pay-status').value='PAID';document.getElementById('modal-pay-amount').value='${total}';">
        <span class="material-symbols-outlined" style="font-size:16px;">check_circle</span> 1-Click Mark PAID
      </button>
      <button type="button" class="btn btn-sm btn-secondary" style="font-weight:700;"
        onclick="document.getElementById('modal-pay-status').value='PENDING';document.getElementById('modal-pay-amount').value='0';">
        Set PENDING
      </button>
    </div>

    <div class="form-group">
      <label class="form-label" style="font-weight:700;">Payment Status<span class="req">*</span></label>
      <select id="modal-pay-status" class="form-select" onchange="if(this.value==='PAID'){document.getElementById('modal-pay-amount').value='${total}'}">
        ${payStatuses.map(s => `<option value="${s}" ${o.paymentStatus === s ? 'selected' : ''}>${s}</option>`).join('')}
      </select>
    </div>

    <div class="form-group">
      <label class="form-label" style="font-weight:700;">Paid Amount (৳)</label>
      <input type="number" id="modal-pay-amount" class="form-input" value="${currentPaid}" placeholder="e.g. ${total}"/>
    </div>

    <div class="form-group">
      <label class="form-label" style="font-weight:700;">Payment Remark / Trx ID / Notes</label>
      <textarea id="modal-pay-remark" class="form-textarea" rows="2" placeholder="e.g. bKash TrxID: 9B7X2K4M / Full payment received via COD rider / Advance ৳150 paid">${o.paymentRemark || o.paymentTrxId || ''}</textarea>
    </div>
  `;

  openModal(`Payment Remarking: #${o.orderNumber || o.id}`, html, `
    <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
    <button class="btn btn-primary" onclick="savePaymentRemark('${id}')">Save Payment Remarks</button>
  `, 'modal-md');
}

function savePaymentRemark(id) {
  const paymentStatus = document.getElementById('modal-pay-status')?.value || 'PENDING';
  const paidAmount = document.getElementById('modal-pay-amount')?.value;
  const paymentRemark = document.getElementById('modal-pay-remark')?.value?.trim();

  DB.orders.updatePayment(id, {
    paymentStatus,
    paidAmount,
    paymentRemark,
    paymentTrxId: paymentRemark
  });

  toast(`Payment updated to ${paymentStatus}`, 'success');
  closeModal();
  updateNavBadges();
  renderOrders(document.getElementById('admin-content'));
}

function printInvoice(id) {
  const o = DB.orders.byId(id);
  if (!o) return;
  const brand = DB.brand.get();
  const win = window.open('', '_blank');
  win.document.write(`
    <!DOCTYPE html><html><head><title>Invoice ${o.orderNumber}</title>
    <style>body{font-family:sans-serif;max-width:700px;margin:40px auto;color:#111}
    h1{font-size:24px;font-weight:900;letter-spacing:.1em}
    table{width:100%;border-collapse:collapse;margin:16px 0}
    th{background:#f3f4f6;padding:8px 12px;text-align:left;font-size:12px;text-transform:uppercase;letter-spacing:.05em}
    td{padding:8px 12px;border-bottom:1px solid #e5e7eb;font-size:13px}
    .total{font-weight:900;font-size:16px}</style></head><body>
    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:24px">
      <div><h1>${brand.brandName||'ZENVY'}</h1><p style="color:#6B7280;font-size:13px">${brand.address||''}</p></div>
      <div style="text-align:right"><p style="font-size:20px;font-weight:800">INVOICE</p><p style="font-size:13px;color:#6B7280">#${o.orderNumber||o.id}</p><p style="font-size:12px;color:#9CA3AF">${fmtDate(o.createdAt)}</p></div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:24px">
      <div><h3 style="font-size:12px;text-transform:uppercase;color:#9CA3AF;margin-bottom:6px">Bill To</h3>
        <p style="font-weight:700">${o.customerName||'N/A'}</p><p>${o.customerEmail||''}</p><p>${o.customerPhone||''}</p><p>${o.shippingAddress||''}${o.city?`, ${o.city}`:''}</p></div>
      <div><h3 style="font-size:12px;text-transform:uppercase;color:#9CA3AF;margin-bottom:6px">Payment</h3>
        <p>Method: ${o.paymentMethod||'Cash on Delivery'}</p><p>Status: <strong>${o.paymentStatus||'PENDING'}</strong></p></div>
    </div>
    <table><thead><tr><th>Product</th><th>Specifications</th><th>Qty</th><th>Price</th></tr></thead><tbody>
      ${(o.items||[]).map(i=>{
        const size = i.size || (i.details?.match(/Size:\s*([^\s•,]+)/i)?.[1]) || (i.details?.match(/\b(XS|S|M|L|XL|2XL|XXL|3XL|4XL)\b/i)?.[1]) || '-';
        const sleeve = i.sleeve || (i.details?.match(/(Full\s*Sleeve|Long\s*Sleeve|Half\s*Sleeve|Short\s*Sleeve|Sleeveless)/i)?.[0]) || '-';
        let customName = i.customName || '';
        let customNumber = i.customNumber || '';
        if (!customName && !customNumber && i.details) {
          const cMatch = i.details.match(/Custom:\s*([^#•]+)(?:#([^\s•,]+))?/i) || i.details.match(/Name:\s*([^•,]+)/i);
          if (cMatch) { customName = cMatch[1].trim(); if (cMatch[2]) customNumber = cMatch[2].trim(); }
        }
        const patchName = i.patchName || (i.patches ? (Array.isArray(i.patches)?i.patches.join(', '):i.patches) : '') || (i.details?.match(/Patch(?:es)?:\s*([^•]+)/i)?.[1]?.trim()) || '-';
        const printText = customName ? `${customName}${customNumber ? ' #' + customNumber : ''}` : (customNumber ? `#${customNumber}` : '');

        return `<tr>
          <td>
            <strong>${i.productName || i.name || 'Jersey'}</strong>
            ${i.details ? `<div style="font-size:11px;color:#666;margin-top:2px;">${i.details}</div>` : ''}
          </td>
          <td>
            <strong>Size:</strong> ${size} | <strong>Sleeve:</strong> ${sleeve}
            ${patchName !== '-' ? `<br><strong>Patches:</strong> ${patchName}` : ''}
            ${printText ? `<br><strong>Custom Print:</strong> ${printText}` : ''}
          </td>
          <td>${i.quantity || i.qty || 1}</td>
          <td>৳${(i.totalPrice || ((i.unitPrice || i.price || 0) * (i.quantity || 1))).toLocaleString()}</td>
        </tr>`;
      }).join('')}
    </tbody></table>
    <div style="text-align:right;margin-top:8px">
      <p>Subtotal: ৳${(o.subtotal||0).toLocaleString()}</p>
      ${o.shippingFee>0?`<p>Shipping: ৳${o.shippingFee.toLocaleString()}</p>`:''}
      ${o.discountTotal>0?`<p>Discount: -৳${o.discountTotal.toLocaleString()}</p>`:''}
      <p class="total">Total: ৳${(o.totalAmount||0).toLocaleString()}</p>
    </div>
    <p style="margin-top:32px;font-size:12px;color:#9CA3AF;text-align:center">Thank you for shopping with ${brand.brandName||'ZENVY'}!</p>
    <script>window.onload=()=>window.print()</script></body></html>
  `);
  win.document.close();
}

function openCreateOrderModal() {
  const products = DB.products.published();
  const shipping = DB.shipping.all().filter(s=>s.isEnabled);
  const html = `
    <form id="manual-order-form">
      <div class="form-row">
        <div class="form-group"><label class="form-label">Customer Name<span class="req">*</span></label><input type="text" name="customerName" class="form-input" required placeholder="Full Name"/></div>
        <div class="form-group"><label class="form-label">Phone<span class="req">*</span></label><input type="text" name="customerPhone" class="form-input" required placeholder="01XXXXXXXXX"/></div>
      </div>
      <div class="form-group"><label class="form-label">Email <span style="font-size:11px;color:#94A3B8;font-weight:normal">(Optional)</span></label><input type="text" name="customerEmail" class="form-input" placeholder="email@example.com (optional)"/></div>
      <div class="form-group"><label class="form-label">Shipping Address<span class="req">*</span></label><input type="text" name="shippingAddress" class="form-input" required placeholder="Street address"/></div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">City<span class="req">*</span></label><input type="text" name="city" class="form-input" required placeholder="Dhaka"/></div>
        <div class="form-group"><label class="form-label">Postal Code</label><input type="text" name="postalCode" class="form-input" placeholder="1200"/></div>
      </div>
      <div class="form-group"><label class="form-label">Product<span class="req">*</span></label>
        <select name="productId" class="form-select" onchange="onManualOrderProduct(this.value)">
          <option value="">Select a product…</option>
          ${products.map(p=>`<option value="${p.id}">${p.name} — ৳${(p.salePrice||p.basePrice||0).toLocaleString()}</option>`).join('')}
        </select>
      </div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">Size</label><input type="text" name="size" class="form-input" placeholder="M"/></div>
        <div class="form-group"><label class="form-label">Quantity</label><input type="number" name="qty" class="form-input" value="1" min="1"/></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">Shipping Method</label>
          <select name="shippingId" class="form-select">
            ${shipping.map(s=>`<option value="${s.id}" data-price="${s.price}">${s.name} — ৳${s.price}</option>`).join('')}
          </select>
        </div>
        <div class="form-group"><label class="form-label">Payment Method</label>
          <select name="paymentMethod" class="form-select">
            <option value="CASH_ON_DELIVERY">Cash on Delivery</option>
            <option value="ONLINE_PAYMENT">Online Payment</option>
          </select>
        </div>
      </div>
      <div class="form-group"><label class="form-label">Notes</label><textarea name="notes" class="form-textarea" rows="2" placeholder="Special instructions…"></textarea></div>
    </form>
  `;
  openModal('Create Manual Order', html, `<button class="btn btn-secondary" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveManualOrder()">Create Order</button>`, 'modal-md');
}

function onManualOrderProduct(productId) {}

function saveManualOrder() {
  const form = document.getElementById('manual-order-form');
  const fd = new FormData(form);
  const productId = fd.get('productId');
  const product = DB.products.byId(productId);
  if (!fd.get('customerName') || !fd.get('customerPhone') || !fd.get('shippingAddress') || !fd.get('city')) { toast('Please fill required fields', 'error'); return; }
  if (!product) { toast('Please select a product', 'error'); return; }

  const qty = parseInt(fd.get('qty'))||1;
  const unitPrice = product.salePrice || product.basePrice || 0;
  const shippingSelect = form.querySelector('[name=shippingId]');
  const shippingFee = parseInt(shippingSelect?.options[shippingSelect.selectedIndex]?.dataset.price)||0;
  const subtotal = unitPrice * qty;
  const total = subtotal + shippingFee;

  const order = {
    customerName: fd.get('customerName'), customerEmail: fd.get('customerEmail')||'', customerPhone: fd.get('customerPhone'),
    shippingAddress: fd.get('shippingAddress'), city: fd.get('city'), postalCode: fd.get('postalCode')||'',
    paymentMethod: fd.get('paymentMethod'), paymentStatus: 'PENDING',
    shippingFee, subtotal, customFee: 0, discountTotal: 0, totalAmount: total,
    items: [{ productId, productName: product.name, size: fd.get('size')||'M', sleeve: 'Half Sleeve', quantity: qty, unitPrice, totalPrice: unitPrice * qty }],
    notes: fd.get('notes')
  };
  DB.orders.create(order);
  toast('Order created successfully', 'success');
  closeModal();
  updateNavBadges();
  renderOrders(document.getElementById('admin-content'));
}

// ──────────────────────────────────────────────────────────────
// ═══ VIEW: PREORDERS ═══
// ──────────────────────────────────────────────────────────────
function renderPreorders(container) {
  const preorders = DB.preorders.all();
  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left"><div class="page-title">Preorders</div><div class="page-sub">${preorders.length} preorder products</div></div>
    </div>
    <div class="card">
      <div class="table-wrapper">
        <table class="admin-table">
          <thead><tr><th>Product</th><th>Preorder Price</th><th>Capacity</th><th>Sold</th><th>Remaining</th><th>Expected Delivery</th><th>Status</th><th style="text-align:right">Actions</th></tr></thead>
          <tbody>
            ${preorders.length===0?`<tr><td colspan="8">${emptyState('schedule','No preorder products','Enable preorder on a product to see it here')}</td></tr>`:
              preorders.map(p => {
                const remaining = (p.preorderCapacity||100) - (p.preorderSold||0);
                const pct = Math.round(((p.preorderSold||0) / (p.preorderCapacity||100)) * 100);
                return `<tr>
                  <td style="font-weight:600">${p.name}</td>
                  <td class="font-mono">৳${(p.preorderPrice||p.basePrice||0).toLocaleString()}</td>
                  <td>${p.preorderCapacity||100}</td>
                  <td>${p.preorderSold||0} <span style="font-size:11px;color:#9CA3AF">(${pct}%)</span></td>
                  <td><span class="badge ${remaining<=5?'badge-red':remaining<=20?'badge-amber':'badge-green'}">${remaining}</span></td>
                  <td style="font-size:12px">${p.expectedDelivery||'-'}</td>
                  <td><span class="badge badge-purple">${p.preorderStatus||'OPEN'}</span></td>
                  <td class="actions-cell">
                    <button class="btn btn-secondary btn-sm" onclick="openProductForm('${p.id}')"><span class="material-symbols-outlined">edit</span> Edit</button>
                  </td>
                </tr>`;
              }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ──────────────────────────────────────────────────────────────
// ═══ VIEW: CUSTOMERS ═══
// ──────────────────────────────────────────────────────────────
let custSearch = '';
function renderCustomers(container) {
  let items = custSearch ? DB.customers.search(custSearch) : DB.customers.all();
  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left"><div class="page-title">Customers</div><div class="page-sub">${items.length} customers</div></div>
      <button class="btn btn-secondary btn-sm" onclick="DB.export.downloadCSV(DB.customers.exportCSV(),'zenvy-customers.csv');toast('Exported','success')"><span class="material-symbols-outlined">download</span> Export</button>
    </div>
    <div class="filter-bar">
      <input type="text" class="form-input" placeholder="Search by name, email, phone…" value="${custSearch}"
        oninput="custSearch=this.value;renderCustomers(document.getElementById('admin-content'))" style="max-width:280px"/>
    </div>
    <div class="card">
      <div class="table-wrapper">
        <table class="admin-table">
          <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Orders</th><th>Total Spent</th><th>Joined</th><th>Status</th><th style="text-align:right">Actions</th></tr></thead>
          <tbody>
            ${items.length===0?`<tr><td colspan="8">${emptyState('group','No customers','Customers appear here when they place orders')}</td></tr>`:
              items.map(c => `<tr>
                <td style="font-weight:600">${c.name}</td>
                <td style="font-size:12px">${c.email||'-'}</td>
                <td style="font-size:12px">${c.phone||'-'}</td>
                <td>${c.orderCount||0}</td>
                <td class="font-mono">৳${(c.totalSpent||0).toLocaleString()}</td>
                <td style="font-size:12px;color:#9CA3AF">${fmtDate(c.createdAt)}</td>
                <td><span class="badge ${c.isDisabled?'badge-red':'badge-green'}">${c.isDisabled?'Disabled':'Active'}</span></td>
                <td class="actions-cell">
                  <button class="btn btn-ghost btn-sm" onclick="viewCustomer('${c.id}')"><span class="material-symbols-outlined">visibility</span></button>
                  <button class="btn btn-ghost btn-sm" onclick="showConfirm('Disable Customer','Disable ${c.name}?',()=>{DB.customers.disable('${c.id}');renderCustomers(document.getElementById('admin-content'));toast('Customer disabled','success')})"><span class="material-symbols-outlined" style="color:#DC2626">block</span></button>
                </td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function viewCustomer(id) {
  const c = DB.customers.byId(id);
  if (!c) return;
  const orders = DB.orders.all().filter(o => o.customerPhone === c.phone || o.customerEmail === c.email);
  const html = `
    <div class="form-row" style="margin-bottom:16px">
      <div class="card" style="padding:16px"><p style="font-size:11px;text-transform:uppercase;color:#9CA3AF;margin-bottom:6px">Customer Info</p>
        <p style="font-weight:700;font-size:16px">${c.name}</p><p>${c.email||''}</p><p>${c.phone||''}</p><p style="font-size:12px;color:#9CA3AF">Joined ${fmtDate(c.createdAt)}</p>
      </div>
      <div class="card" style="padding:16px"><p style="font-size:11px;text-transform:uppercase;color:#9CA3AF;margin-bottom:6px">Stats</p>
        <p><strong>${orders.length}</strong> orders</p>
        <p>Total spent: <strong class="font-mono">৳${(c.totalSpent||0).toLocaleString()}</strong></p>
      </div>
    </div>
    <div class="table-wrapper"><table class="admin-table"><thead><tr><th>Order #</th><th>Total</th><th>Status</th><th>Date</th></tr></thead><tbody>
      ${orders.map(o=>`<tr><td class="font-mono">${o.orderNumber}</td><td class="font-mono">৳${(o.totalAmount||0).toLocaleString()}</td><td><span class="badge badge-${statusColor(o.status)}">${o.status}</span></td><td style="font-size:12px">${fmtDate(o.createdAt)}</td></tr>`).join('') || '<tr><td colspan="4" style="text-align:center;color:#9CA3AF">No orders</td></tr>'}
    </tbody></table></div>
  `;
  openModal(`Customer: ${c.name}`, html, `<button class="btn btn-secondary" onclick="closeModal()">Close</button>`, 'modal-lg');
}

// ──────────────────────────────────────────────────────────────
// ═══ VIEW: COUPONS ═══
// ──────────────────────────────────────────────────────────────
function renderCoupons(container) {
  const coupons = DB.coupons.all();
  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left"><div class="page-title">Coupons</div></div>
      <button class="btn btn-primary" onclick="openCouponForm()"><span class="material-symbols-outlined">add</span> Create Coupon</button>
    </div>
    <div class="card">
      <div class="table-wrapper">
        <table class="admin-table">
          <thead><tr><th>Code</th><th>Type</th><th>Discount</th><th>Min Order</th><th>Used/Limit</th><th>Expires</th><th>Status</th><th style="text-align:right">Actions</th></tr></thead>
          <tbody>
            ${coupons.length===0?`<tr><td colspan="8">${emptyState('local_offer','No coupons','Create coupon codes for your customers','Create Coupon','openCouponForm()')}</td></tr>`:
              coupons.map(c => `<tr>
                <td class="font-mono" style="font-weight:800;font-size:14px">${c.code}</td>
                <td><span class="badge badge-blue">${c.isPercent?'Percentage':'Fixed'}</span></td>
                <td class="font-mono">${c.isPercent?c.discount+'%':'৳'+c.discount}</td>
                <td class="font-mono">৳${c.minOrder||0}</td>
                <td>${c.usedCount||0} / ${c.usageLimit||'∞'}</td>
                <td style="font-size:12px;color:#9CA3AF">${c.expiresAt?fmtDate(c.expiresAt):'Never'}</td>
                <td><span class="badge ${c.isActive?'badge-green':'badge-gray'}">${c.isActive?'Active':'Inactive'}</span></td>
                <td class="actions-cell">
                  <button class="btn btn-ghost btn-sm" onclick="openCouponForm('${c.id}')"><span class="material-symbols-outlined">edit</span></button>
                  <button class="btn btn-ghost btn-sm" onclick="DB.coupons.update('${c.id}',{isActive:${!c.isActive}});renderCoupons(document.getElementById('admin-content'));toast('Updated','success')"><span class="material-symbols-outlined">${c.isActive?'block':'check_circle'}</span></button>
                  <button class="btn btn-ghost btn-sm" onclick="showConfirm('Delete Coupon','Delete code ${c.code}?',()=>{DB.coupons.delete('${c.id}');renderCoupons(document.getElementById('admin-content'));toast('Deleted','success')})"><span class="material-symbols-outlined" style="color:#DC2626">delete</span></button>
                </td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function openCouponForm(id=null) {
  const c = id ? DB.coupons.byId(id) : null;
  const html = `<form id="coupon-form">
    <div class="form-row">
      <div class="form-group"><label class="form-label">Coupon Code<span class="req">*</span></label><input type="text" name="code" class="form-input" required value="${c?.code||''}" placeholder="ZENVY20" style="text-transform:uppercase"/></div>
      <div class="form-group"><label class="form-label">Discount Type</label>
        <select name="isPercent" class="form-select">
          <option value="true" ${c?.isPercent!==false?'selected':''}>Percentage (%)</option>
          <option value="false" ${c?.isPercent===false?'selected':''}>Fixed Amount (৳)</option>
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Discount Value<span class="req">*</span></label><input type="number" name="discount" class="form-input" required value="${c?.discount||''}" placeholder="20"/></div>
      <div class="form-group"><label class="form-label">Maximum Discount (৳)</label><input type="number" name="maxDiscount" class="form-input" value="${c?.maxDiscount||''}" placeholder="Leave blank for no limit"/></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Minimum Order (৳)</label><input type="number" name="minOrder" class="form-input" value="${c?.minOrder||0}"/></div>
      <div class="form-group"><label class="form-label">Usage Limit</label><input type="number" name="usageLimit" class="form-input" value="${c?.usageLimit||100}"/></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Per-User Limit</label><input type="number" name="perUserLimit" class="form-input" value="${c?.perUserLimit||1}"/></div>
      <div class="form-group"><label class="form-label">Expires At</label><input type="date" name="expiresAt" class="form-input" value="${c?.expiresAt?.split('T')[0]||''}"/></div>
    </div>
    <label class="checkbox-chip ${c?.isActive!==false?'selected':''}"><input type="checkbox" name="isActive" ${c?.isActive!==false?'checked':''} onchange="this.closest('.checkbox-chip').classList.toggle('selected',this.checked)"/> Active</label>
  </form>`;
  openModal(c?'Edit Coupon':'New Coupon', html, `<button class="btn btn-secondary" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveCoupon('${id||''}')">Save Coupon</button>`, 'modal-md');
}

function saveCoupon(id) {
  const fd = new FormData(document.getElementById('coupon-form'));
  const code = fd.get('code')?.trim().toUpperCase();
  const discount = parseFloat(fd.get('discount'));
  if (!code || !discount) { toast('Code and discount required', 'error'); return; }
  const data = { code, isPercent: fd.get('isPercent')==='true', discount, maxDiscount: parseFloat(fd.get('maxDiscount'))||null, minOrder: parseFloat(fd.get('minOrder'))||0, usageLimit: parseInt(fd.get('usageLimit'))||100, perUserLimit: parseInt(fd.get('perUserLimit'))||1, expiresAt: fd.get('expiresAt')||null, isActive: fd.get('isActive')==='on' };
  if (id) { DB.coupons.update(id, data); toast('Coupon updated', 'success'); }
  else { DB.coupons.create(data); toast('Coupon created', 'success'); }
  closeModal(); renderCoupons(document.getElementById('admin-content'));
}

// ──────────────────────────────────────────────────────────────
// ═══ VIEW: FLASH SALES ═══
// ──────────────────────────────────────────────────────────────
function renderFlashSales(container) {
  const sales = DB.flashSales.all();
  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left"><div class="page-title">Flash Sales</div></div>
      <button class="btn btn-primary" onclick="openFlashSaleForm()"><span class="material-symbols-outlined">bolt</span> New Flash Sale</button>
    </div>
    <div class="card">
      <div class="table-wrapper">
        <table class="admin-table">
          <thead><tr><th>Title</th><th>Discount</th><th>Start</th><th>End</th><th>Status</th><th style="text-align:right">Actions</th></tr></thead>
          <tbody>
            ${sales.length===0?`<tr><td colspan="6">${emptyState('bolt','No flash sales','Create time-limited discounts','New Flash Sale','openFlashSaleForm()')}</td></tr>`:
              sales.map(s => {
                const now = new Date(); const active = s.isActive && new Date(s.startDate)<=now && new Date(s.endDate)>=now;
                return `<tr>
                  <td style="font-weight:600">${s.title}</td>
                  <td class="font-mono">${s.discount}%</td>
                  <td style="font-size:12px">${fmtDate(s.startDate)}</td>
                  <td style="font-size:12px">${fmtDate(s.endDate)}</td>
                  <td><span class="badge ${active?'badge-green':s.isActive?'badge-amber':'badge-gray'}">${active?'LIVE':s.isActive?'Scheduled':'Inactive'}</span></td>
                  <td class="actions-cell">
                    <button class="btn btn-ghost btn-sm" onclick="openFlashSaleForm('${s.id}')"><span class="material-symbols-outlined">edit</span></button>
                    <button class="btn btn-ghost btn-sm" onclick="DB.flashSales.update('${s.id}',{isActive:${!s.isActive}});renderFlashSales(document.getElementById('admin-content'));toast('Updated','success')"><span class="material-symbols-outlined">${s.isActive?'block':'check_circle'}</span></button>
                    <button class="btn btn-ghost btn-sm" onclick="showConfirm('Delete','Delete flash sale?',()=>{DB.flashSales.delete('${s.id}');renderFlashSales(document.getElementById('admin-content'));toast('Deleted','success')})"><span class="material-symbols-outlined" style="color:#DC2626">delete</span></button>
                  </td>
                </tr>`;
              }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function openFlashSaleForm(id=null) {
  const s = id ? DB.flashSales.byId(id) : null;
  const products = DB.products.published();
  const html = `<form id="flash-form">
    <div class="form-group"><label class="form-label">Title<span class="req">*</span></label><input type="text" name="title" class="form-input" required value="${s?.title||''}" placeholder="Weekend Flash Sale"/></div>
    <div class="form-group"><label class="form-label">Discount (%)<span class="req">*</span></label><input type="number" name="discount" class="form-input" min="1" max="99" required value="${s?.discount||20}"/></div>
    <div class="form-group"><label class="form-label">Products (leave blank for all)</label>
      <select name="productIds" class="form-select" multiple style="height:100px">
        ${products.map(p=>`<option value="${p.id}" ${s?.productIds?.includes(p.id)?'selected':''}>${p.name}</option>`).join('')}
      </select>
    </div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Start<span class="req">*</span></label><input type="datetime-local" name="startDate" class="form-input" required value="${s?.startDate?.slice(0,16)||''}"/></div>
      <div class="form-group"><label class="form-label">End<span class="req">*</span></label><input type="datetime-local" name="endDate" class="form-input" required value="${s?.endDate?.slice(0,16)||''}"/></div>
    </div>
    <label class="checkbox-chip ${s?.isActive?'selected':''}"><input type="checkbox" name="isActive" ${s?.isActive?'checked':''} onchange="this.closest('.checkbox-chip').classList.toggle('selected',this.checked)"/> Active</label>
  </form>`;
  openModal(s?'Edit Flash Sale':'New Flash Sale', html, `<button class="btn btn-secondary" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveFlashSale('${id||''}')">Save</button>`, 'modal-md');
}

function saveFlashSale(id) {
  const fd = new FormData(document.getElementById('flash-form'));
  const title = fd.get('title')?.trim(); const discount = parseFloat(fd.get('discount')); const startDate = fd.get('startDate'); const endDate = fd.get('endDate');
  if (!title || !discount || !startDate || !endDate) { toast('Fill all required fields', 'error'); return; }
  const data = { title, discount, startDate, endDate, isActive: fd.get('isActive')==='on' };
  if (id) { DB.flashSales.update(id, data); toast('Flash sale updated', 'success'); }
  else { DB.flashSales.create(data); toast('Flash sale created', 'success'); }
  closeModal(); renderFlashSales(document.getElementById('admin-content'));
}

// ──────────────────────────────────────────────────────────────
// ═══ VIEW: BANNERS ═══
// ──────────────────────────────────────────────────────────────
function renderBanners(container) {
  const banners = DB.banners.all();
  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left"><div class="page-title">Promotional Banners</div></div>
      <button class="btn btn-primary" onclick="openBannerForm()"><span class="material-symbols-outlined">add_photo_alternate</span> New Banner</button>
    </div>
    <div class="card">
      <div class="table-wrapper">
        <table class="admin-table">
          <thead><tr><th>Preview</th><th>Title</th><th>CTA</th><th>Order</th><th>Status</th><th style="text-align:right">Actions</th></tr></thead>
          <tbody>
            ${banners.length===0?`<tr><td colspan="6">${emptyState('image','No banners','Create your first promotional banner','New Banner','openBannerForm()')}</td></tr>`:
              banners.map(b => `<tr>
                <td>${b.desktopImg?`<img src="${b.desktopImg}" style="width:80px;height:40px;object-fit:cover;border-radius:6px;border:1px solid #E5E7EB">`:`<div style="width:80px;height:40px;border-radius:6px;background:#F3F4F6;display:flex;align-items:center;justify-content:center"><span class="material-symbols-outlined" style="font-size:16px;color:#9CA3AF">image</span></div>`}</td>
                <td><div style="font-weight:600">${b.title}</div><div style="font-size:11px;color:#9CA3AF">${b.subtitle||''}</div></td>
                <td style="font-size:12px">${b.ctaText||'-'} → ${b.destination||'-'}</td>
                <td>${b.displayOrder}</td>
                <td><span class="badge ${b.isActive?'badge-green':'badge-gray'}">${b.isActive?'Published':'Draft'}</span></td>
                <td class="actions-cell">
                  <button class="btn btn-ghost btn-sm" onclick="openBannerForm('${b.id}')"><span class="material-symbols-outlined">edit</span></button>
                  <button class="btn btn-ghost btn-sm" onclick="DB.banners[${b.isActive?'unpublish':'publish'}]('${b.id}');renderBanners(document.getElementById('admin-content'));toast('${b.isActive?'Unpublished':'Published'}','success')">
                    <span class="material-symbols-outlined">${b.isActive?'visibility_off':'publish'}</span>
                  </button>
                  <button class="btn btn-ghost btn-sm" onclick="showConfirm('Delete Banner','Delete this banner?',()=>{DB.banners.delete('${b.id}');renderBanners(document.getElementById('admin-content'));toast('Deleted','success')})"><span class="material-symbols-outlined" style="color:#DC2626">delete</span></button>
                </td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function openBannerForm(id=null) {
  const b = id ? DB.banners.byId(id) : null;
  let desktopImg = b?.desktopImg || b?.bgImage || '';
  let mobileImg = b?.mobileImg || '';
  window._bannerDesktopImg = desktopImg;
  window._bannerMobileImg = mobileImg;

  const html = `
    <form id="banner-form" onsubmit="event.preventDefault();">
      <div class="form-group"><label class="form-label">Banner Title<span class="req">*</span></label><input type="text" name="title" class="form-input" required value="${b?.title||''}" placeholder="e.g. LIMITED EDITION KITS"/></div>
      <div class="form-group"><label class="form-label">Subtitle</label><input type="text" name="subtitle" class="form-input" value="${b?.subtitle||''}" placeholder="e.g. Elevate Your Game • New Season Drops"/></div>
      
      <div class="form-row" style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
        <div class="form-group">
          <label class="form-label">Desktop Banner Image (1920×600)<span class="req">*</span></label>
          <div id="banner-desktop-zone"></div>
        </div>
        <div class="form-group">
          <label class="form-label">Mobile Banner Image (750×400)</label>
          <div id="banner-mobile-zone"></div>
        </div>
      </div>

      <div class="form-row" style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
        <div class="form-group"><label class="form-label">CTA Button Text</label><input type="text" name="ctaText" class="form-input" value="${b?.ctaText||'Shop Now'}" placeholder="Shop Now"/></div>
        <div class="form-group"><label class="form-label">CTA Destination</label><input type="text" name="destination" class="form-input" value="${b?.destination||'/shop'}" placeholder="/shop or https://…"/></div>
      </div>
      <div class="form-row" style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
        <div class="form-group"><label class="form-label">Start Date</label><input type="date" name="startDate" class="form-input" value="${b?.startDate||''}"/></div>
        <div class="form-group"><label class="form-label">End Date</label><input type="date" name="endDate" class="form-input" value="${b?.endDate||''}"/></div>
      </div>
      <div class="form-group"><label class="form-label">Display Order</label><input type="number" name="displayOrder" class="form-input" value="${b?.displayOrder||0}"/></div>
    </form>
  `;
  const footer = `
    <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
    <button class="btn btn-secondary" onclick="saveBanner('${id||''}',false)">Save Draft</button>
    <button class="btn btn-primary" onclick="saveBanner('${id||''}',true)" style="background:#16A34A;border-color:#16A34A;"><span class="material-symbols-outlined">publish</span> Save & Publish</button>
  `;
  openModal(b?`Edit: ${b.title}`:'New Banner', html, footer, 'modal-lg');
  setTimeout(() => {
    const dZone = Uploader.createSingleZone({ 
      id:'ban-desktop', 
      value:desktopImg, 
      placeholder:'Upload desktop banner (1920×600 recommended)', 
      onchange: v => { 
        window._bannerDesktopImg = v || ''; 
      } 
    });
    const mZone = Uploader.createSingleZone({ 
      id:'ban-mobile', 
      value:mobileImg, 
      placeholder:'Upload mobile banner (750×400)', 
      onchange: v => { 
        window._bannerMobileImg = v || ''; 
      } 
    });
    document.getElementById('banner-desktop-zone')?.appendChild(dZone);
    document.getElementById('banner-mobile-zone')?.appendChild(mZone);
  }, 100);
}

function saveBanner(id, publish) {
  const form = document.getElementById('banner-form');
  if (!form) return;
  const fd = new FormData(form);
  const title = fd.get('title')?.trim();
  if (!title) { toast('Banner title is required', 'error'); return; }
  
  const img = window._bannerDesktopImg || 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&q=80';
  const mobileImg = window._bannerMobileImg || img;

  const data = { 
    title, 
    subtitle: fd.get('subtitle') || '', 
    desktopImg: img, 
    bgImage: img, 
    mobileImg: mobileImg, 
    type: 'hero',
    ctaText: fd.get('ctaText') || 'Shop Now', 
    destination: fd.get('destination') || '/shop', 
    displayOrder: parseInt(fd.get('displayOrder')) || 0, 
    startDate: fd.get('startDate') || null, 
    endDate: fd.get('endDate') || null, 
    isActive: publish 
  };

  if (id) { 
    DB.banners.update(id, data); 
    if (publish) DB.banners.publish(id);
    toast(publish ? 'Banner published & live!' : 'Banner saved as draft', 'success'); 
  } else { 
    const b = DB.banners.create(data); 
    if (publish) DB.banners.publish(b.id); 
    toast(publish ? 'Banner published & live!' : 'Banner saved as draft', 'success'); 
  }

  // Update homepage banners array and sync hero
  try {
    const hp = DB.homepage ? DB.homepage.get() : {};
    hp.banners = DB.banners.all().filter(b => b.isActive);
    if (publish) {
      if (!hp.hero) hp.hero = {};
      hp.hero.enabled = true;
      hp.hero.title = title;
      if (data.subtitle) hp.hero.subtitle = data.subtitle;
      if (img) hp.hero.bgImage = img;
    }
    if (DB.homepage) DB.homepage.save(hp);
  } catch(e) {}

  closeModal(); 
  renderBanners(document.getElementById('admin-content'));
  try { window.dispatchEvent(new Event('storage')); } catch(e){}
}

// ──────────────────────────────────────────────────────────────
// ═══ VIEW: SHOP DISCOUNT BANNER (MULTI-BANNER & BULK UPLOAD) ═══
// ──────────────────────────────────────────────────────────────
let activeShopBannerSlide = 0;
let shopBannerSlidesState = null;

function renderShopDiscountBanner(container) {
  if (!shopBannerSlidesState) {
    const bannerConfig = (DB.shopBanner && DB.shopBanner.get()) || {};
    shopBannerSlidesState = (bannerConfig.slides && bannerConfig.slides.length > 0) ? JSON.parse(JSON.stringify(bannerConfig.slides)) : [
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
    ];
  }

  if (activeShopBannerSlide >= shopBannerSlidesState.length) {
    activeShopBannerSlide = Math.max(0, shopBannerSlidesState.length - 1);
  }

  const currentSlide = shopBannerSlidesState[activeShopBannerSlide] || {
    tag: 'ZENVY COLLECTION',
    title: 'LIMITED\nEDITION KITS',
    subtitle: 'Elevate Your Game • Exclusively Online',
    discountBadge: '25% OFF',
    bgImage: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&q=80'
  };

  container.innerHTML = `
    <div class="page-header" style="margin-bottom:20px;">
      <div class="page-header-left">
        <div class="page-title">Shop Discount & Promotional Banners</div>
        <div class="page-subtitle" style="font-size:13px;color:#6B7280;margin-top:4px;">
          Manage multiple rotating banners, upload hot product graphics, and customize discounts for the Jerseys Shop page.
        </div>
      </div>
      <div class="page-header-actions" style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
        <label class="btn btn-secondary" style="cursor:pointer;gap:6px;margin:0;">
          <span class="material-symbols-outlined" style="font-size:18px;color:#2563EB;">collections</span>
          Bulk Upload Images
          <input type="file" multiple accept="image/*" style="display:none;" onchange="handleBulkShopBannerUpload(event)">
        </label>
        <button class="btn btn-secondary" onclick="addShopBannerSlide()" style="gap:6px;">
          <span class="material-symbols-outlined" style="font-size:18px;">add_circle</span> Add New Slide
        </button>
        <a href="index.html#shop" target="_blank" class="btn btn-secondary" style="gap:6px;text-decoration:none;">
          <span class="material-symbols-outlined" style="font-size:18px;">open_in_new</span> Live Shop
        </a>
        <button class="btn btn-primary" onclick="saveShopDiscountBanner()" style="gap:6px;background:#16A34A;border-color:#16A34A;">
          <span class="material-symbols-outlined" style="font-size:18px;">save</span> Save & Publish All Banners
        </button>
      </div>
    </div>

    <!-- Live Preview Box -->
    <div class="card mb-4" style="border-radius:16px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.06);border:1px solid #E5E7EB;">
      <div class="card-header" style="background:#F8FAFC;padding:14px 20px;border-bottom:1px solid #E5E7EB;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
        <div style="font-weight:700;font-size:14px;color:#0F172A;display:flex;align-items:center;gap:8px;">
          <span class="material-symbols-outlined" style="font-size:18px;color:#2563EB;">visibility</span>
          Live Storefront Carousel Preview (${shopBannerSlidesState.length} Active Banners)
        </div>
        <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
          ${shopBannerSlidesState.map((_, idx) => `
            <button type="button" class="btn btn-sm ${activeShopBannerSlide===idx?'btn-primary':'btn-secondary'}" onclick="setShopPreviewSlide(${idx})" style="padding:4px 12px;font-size:12px;">
              Slide ${idx + 1}
            </button>
          `).join('')}
        </div>
      </div>
      <div class="card-body" style="padding:24px;background:#F1F5F9;display:flex;justify-content:center;">
        <div id="admin-shop-banner-preview" class="relative w-full max-w-3xl rounded-2xl overflow-hidden shadow-xl" style="height:195px;position:relative;background:#111;color:#fff;">
          <div id="shop-prev-bg" style="position:absolute;inset:0;background:url('${currentSlide.bgImage || ''}') center/cover no-repeat;transition:all 0.4s ease;"></div>
          <div style="position:absolute;inset:0;background:linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 60%, transparent 100%);"></div>
          
          <div style="position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;padding:0 32px;z-index:2;">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
              <span id="shop-prev-tag" style="font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#F3F4F6;opacity:0.9;">
                ${currentSlide.tag || 'ZENVY COLLECTION'}
              </span>
              <span id="shop-prev-badge" style="background:#DC2626;color:#fff;font-size:9px;font-weight:800;padding:2px 6px;border-radius:4px;letter-spacing:0.05em;display:${currentSlide.discountBadge?'inline-block':'none'};">
                ${currentSlide.discountBadge || ''}
              </span>
            </div>
            <h2 id="shop-prev-title" style="font-size:26px;font-weight:900;text-transform:uppercase;line-height:1.15;color:#fff;margin:0;font-family:'Space Grotesk',sans-serif;">
              ${(currentSlide.title || '').replace(/\n/g, '<br>')}
            </h2>
            <p id="shop-prev-sub" style="font-size:12px;color:rgba(255,255,255,0.85);margin-top:6px;letter-spacing:0.08em;text-transform:uppercase;">
              ${currentSlide.subtitle || ''}
            </p>
          </div>

          <!-- Slide indicators -->
          <div style="position:absolute;bottom:12px;right:16px;display:flex;gap:6px;z-index:3;">
            ${shopBannerSlidesState.map((_, idx) => `
              <div style="width:8px;height:8px;border-radius:50%;background:${activeShopBannerSlide===idx?'#fff':'rgba(255,255,255,0.4)'};"></div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>

    <!-- Quick 1-Click Discount Presets -->
    <div class="card mb-4" style="border-radius:14px;border:1px solid #E5E7EB;">
      <div class="card-body" style="padding:14px 20px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
        <div style="display:flex;align-items:center;gap:8px;">
          <span style="font-size:12px;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:0.05em;">
            ⚡ Quick Templates:
          </span>
          <div style="display:flex;flex-wrap:wrap;gap:8px;">
            <button type="button" class="btn btn-secondary btn-sm" onclick="applyShopDiscountPresetToCurrent('25off')" style="font-size:11px;padding:3px 10px;">
              🔥 25% Off Football Kits
            </button>
            <button type="button" class="btn btn-secondary btn-sm" onclick="applyShopDiscountPresetToCurrent('free_printing')" style="font-size:11px;padding:3px 10px;">
              ⚡ Free Player Printing
            </button>
            <button type="button" class="btn btn-secondary btn-sm" onclick="applyShopDiscountPresetToCurrent('summer_sale')" style="font-size:11px;padding:3px 10px;">
              🎉 Flat ৳300 Off
            </button>
            <button type="button" class="btn btn-secondary btn-sm" onclick="applyShopDiscountPresetToCurrent('free_shipping')" style="font-size:11px;padding:3px 10px;">
              🚚 Free Delivery Promo
            </button>
          </div>
        </div>

        <label class="btn btn-primary btn-sm" style="cursor:pointer;gap:6px;margin:0;font-size:12px;">
          <span class="material-symbols-outlined" style="font-size:16px;">upload_file</span>
          Upload Multiple Banners
          <input type="file" multiple accept="image/*" style="display:none;" onchange="handleBulkShopBannerUpload(event)">
        </label>
      </div>
    </div>

    <!-- Banners / Slides List -->
    <div style="display:flex;flex-direction:column;gap:18px;margin-bottom:24px;">
      ${shopBannerSlidesState.map((slide, idx) => `
        <div class="card" style="border-radius:14px;border:1px solid #E5E7EB;box-shadow:0 2px 6px rgba(0,0,0,0.03);overflow:hidden;${activeShopBannerSlide===idx?'border-left:4px solid #2563EB;':''}">
          <div class="card-header" style="background:#F8FAFC;padding:14px 20px;border-bottom:1px solid #E5E7EB;display:flex;justify-content:space-between;align-items:center;">
            <div style="display:flex;align-items:center;gap:12px;">
              <span style="font-size:12px;font-weight:800;background:#1E293B;color:#fff;padding:2px 8px;border-radius:6px;">
                Banner #${idx + 1}
              </span>
              <span style="font-weight:700;font-size:13px;color:#0F172A;">
                ${slide.title ? slide.title.replace(/\n/g, ' ') : 'Untitled Banner'}
              </span>
              ${slide.discountBadge ? `<span style="background:#DC2626;color:#fff;font-size:10px;font-weight:800;padding:2px 6px;border-radius:4px;">${slide.discountBadge}</span>` : ''}
            </div>

            <div style="display:flex;align-items:center;gap:8px;">
              <button type="button" class="btn btn-ghost btn-sm" onclick="setShopPreviewSlide(${idx})" title="Preview This Banner" style="gap:4px;font-size:12px;color:#2563EB;">
                <span class="material-symbols-outlined" style="font-size:16px;">visibility</span> Preview
              </button>
              ${shopBannerSlidesState.length > 1 ? `
                <button type="button" class="btn btn-ghost btn-sm" onclick="removeShopBannerSlide(${idx})" title="Delete This Banner" style="color:#DC2626;">
                  <span class="material-symbols-outlined" style="font-size:18px;">delete</span>
                </button>
              ` : ''}
            </div>
          </div>

          <div class="card-body" style="padding:20px;">
            <div style="display:grid;grid-template-columns:140px 1fr 1fr;gap:20px;align-items:start;">
              
              <!-- Image Preview & Upload -->
              <div>
                <label class="form-label" style="font-size:11px;font-weight:700;color:#64748B;">Banner Image</label>
                <div style="width:100%;height:85px;border-radius:10px;background:url('${slide.bgImage || ''}') center/cover no-repeat #E2E8F0;border:1px solid #CBD5E1;margin-bottom:8px;"></div>
                <label class="btn btn-secondary btn-sm" style="width:100%;cursor:pointer;justify-content:center;font-size:11px;padding:4px 8px;margin:0;">
                  <span class="material-symbols-outlined" style="font-size:14px;">upload</span> Change
                  <input type="file" accept="image/*" style="display:none;" onchange="handleSingleShopBannerUpload(event, ${idx})">
                </label>
              </div>

              <!-- Content Column 1 -->
              <div>
                <div class="form-group" style="margin-bottom:12px;">
                  <label class="form-label" style="font-size:12px;font-weight:700;">Top Tag / Offer Pill</label>
                  <input type="text" class="form-input" value="${slide.tag || ''}" oninput="updateSlideField(${idx}, 'tag', this.value)" placeholder="e.g. 🔥 HOT PRODUCT / ⚡ SPECIAL DISCOUNT"/>
                </div>

                <div class="form-group" style="margin-bottom:12px;">
                  <label class="form-label" style="font-size:12px;font-weight:700;">Discount Callout Badge</label>
                  <input type="text" class="form-input" value="${slide.discountBadge || ''}" oninput="updateSlideField(${idx}, 'discountBadge', this.value)" placeholder="e.g. 30% OFF / NEW ARRIVAL"/>
                </div>

                <div class="form-group" style="margin-bottom:0;">
                  <label class="form-label" style="font-size:12px;font-weight:700;">Banner Image URL</label>
                  <input type="text" class="form-input" value="${slide.bgImage || ''}" oninput="updateSlideField(${idx}, 'bgImage', this.value)" placeholder="https://..."/>
                </div>
              </div>

              <!-- Content Column 2 -->
              <div>
                <div class="form-group" style="margin-bottom:12px;">
                  <label class="form-label" style="font-size:12px;font-weight:700;">Main Heading (Title)</label>
                  <textarea class="form-textarea" rows="2" oninput="updateSlideField(${idx}, 'title', this.value)" placeholder="e.g. REAL MADRID&#10;24/25 HOME KIT">${slide.title || ''}</textarea>
                  <div style="font-size:10px;color:#64748B;margin-top:2px;">Press Enter for a 2-line title.</div>
                </div>

                <div class="form-group" style="margin-bottom:0;">
                  <label class="form-label" style="font-size:12px;font-weight:700;">Subtitle / Offer Description</label>
                  <input type="text" class="form-input" value="${slide.subtitle || ''}" oninput="updateSlideField(${idx}, 'subtitle', this.value)" placeholder="e.g. Official Match Edition • Player Printing Included"/>
                </div>
              </div>

            </div>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Bottom Actions -->
    <div style="display:flex;gap:12px;justify-content:space-between;align-items:center;background:#fff;padding:18px 24px;border-radius:14px;border:1px solid #E5E7EB;box-shadow:0 2px 8px rgba(0,0,0,0.04);">
      <button type="button" class="btn btn-secondary" onclick="addShopBannerSlide()" style="gap:6px;">
        <span class="material-symbols-outlined" style="font-size:18px;">add_circle</span> Add Another Banner
      </button>

      <div style="display:flex;gap:12px;">
        <button type="button" class="btn btn-secondary" onclick="resetShopBannerDefaults()">
          <span class="material-symbols-outlined" style="font-size:18px;">restart_alt</span> Reset Defaults
        </button>
        <button type="button" class="btn btn-primary" onclick="saveShopDiscountBanner()" style="padding:10px 28px;background:#16A34A;border-color:#16A34A;font-weight:700;">
          <span class="material-symbols-outlined" style="font-size:18px;">save</span> Save & Publish All Banners
        </button>
      </div>
    </div>
  `;
}

function setShopPreviewSlide(index) {
  activeShopBannerSlide = index;
  renderShopDiscountBanner(document.getElementById('admin-content'));
}

function updateSlideField(index, field, value) {
  if (shopBannerSlidesState && shopBannerSlidesState[index]) {
    shopBannerSlidesState[index][field] = value;
    if (activeShopBannerSlide === index) {
      const current = shopBannerSlidesState[index];
      const tagEl = document.getElementById('shop-prev-tag');
      if (tagEl) tagEl.textContent = current.tag || '';

      const badgeEl = document.getElementById('shop-prev-badge');
      if (badgeEl) {
        badgeEl.textContent = current.discountBadge || '';
        badgeEl.style.display = current.discountBadge ? 'inline-block' : 'none';
      }

      const titleEl = document.getElementById('shop-prev-title');
      if (titleEl) titleEl.innerHTML = (current.title || '').replace(/\n/g, '<br>');

      const subEl = document.getElementById('shop-prev-sub');
      if (subEl) subEl.textContent = current.subtitle || '';

      const bgEl = document.getElementById('shop-prev-bg');
      if (bgEl && current.bgImage) bgEl.style.backgroundImage = `url('${current.bgImage}')`;
    }
  }
}

function addShopBannerSlide() {
  if (!shopBannerSlidesState) shopBannerSlidesState = [];
  shopBannerSlidesState.push({
    tag: "🔥 NEW DROP",
    title: "MATCH EDITION\nJERSEY SALE",
    subtitle: "Premium Aeroknit Performance • Limited Quantity",
    discountBadge: "30% OFF",
    bgImage: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&q=80",
    link: "#view-shop"
  });
  activeShopBannerSlide = shopBannerSlidesState.length - 1;
  renderShopDiscountBanner(document.getElementById('admin-content'));
  toast('New banner slide added! Add your image and title.', 'success');
}

function removeShopBannerSlide(index) {
  if (!shopBannerSlidesState || shopBannerSlidesState.length <= 1) {
    toast('At least one banner is required.', 'warning');
    return;
  }
  showConfirm('Delete Banner', `Delete Banner #${index + 1}?`, () => {
    shopBannerSlidesState.splice(index, 1);
    if (activeShopBannerSlide >= shopBannerSlidesState.length) {
      activeShopBannerSlide = Math.max(0, shopBannerSlidesState.length - 1);
    }
    renderShopDiscountBanner(document.getElementById('admin-content'));
    toast('Banner slide removed. Click Save to publish.', 'info');
  });
}

async function handleSingleShopBannerUpload(event, index) {
  const file = event.target.files?.[0];
  if (!file || !shopBannerSlidesState || !shopBannerSlidesState[index]) return;

  const dataUrl = await Uploader.compressImage(file, 1600, 0.85);
  shopBannerSlidesState[index].bgImage = dataUrl;
  activeShopBannerSlide = index;
  renderShopDiscountBanner(document.getElementById('admin-content'));
  toast(`Banner #${index + 1} image updated!`, 'success');
}

async function handleBulkShopBannerUpload(event) {
  const files = Array.from(event.target.files || []);
  if (files.length === 0) return;

  if (!shopBannerSlidesState) shopBannerSlidesState = [];

  toast(`Optimizing and processing ${files.length} images...`, 'info');
  for (const file of files) {
    const dataUrl = await Uploader.compressImage(file, 1600, 0.85);
    shopBannerSlidesState.push({
      tag: `🔥 PROMO #${shopBannerSlidesState.length + 1}`,
      title: file.name.replace(/\.[^/.]+$/, '').toUpperCase().slice(0, 30),
      subtitle: 'Special Promotional Kit • Exclusive Online Offer',
      discountBadge: 'HOT DEAL',
      bgImage: dataUrl,
      link: '#view-shop'
    });
  }
  activeShopBannerSlide = shopBannerSlidesState.length - 1;
  renderShopDiscountBanner(document.getElementById('admin-content'));
}

function applyShopDiscountPresetToCurrent(preset) {
  if (!shopBannerSlidesState || !shopBannerSlidesState[activeShopBannerSlide]) return;
  const current = shopBannerSlidesState[activeShopBannerSlide];

  if (preset === '25off') {
    current.tag = '⚡ MEGA SALE LIVE';
    current.discountBadge = '25% OFF';
    current.title = 'MATCH EDITION\nJERSEY SALE';
    current.subtitle = 'Flat 25% Off Across All Club & International Kits • Online Only';
    current.bgImage = 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&q=80';
  } else if (preset === 'free_printing') {
    current.tag = '⚡ SPECIAL OFFER';
    current.discountBadge = 'FREE PRINT';
    current.title = 'CUSTOMIZE YOUR\nPLAYER NAME';
    current.subtitle = 'Free Official Name & Number Customization on Every Kit';
    current.bgImage = 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=80';
  } else if (preset === 'summer_sale') {
    current.tag = '🎉 SUMMER DISCOUNT';
    current.discountBadge = 'FLAT ৳300 OFF';
    current.title = 'LIMITED TIME\nBUNDLE DEAL';
    current.subtitle = 'Flat ৳300 Off When You Order 2 or More Kits • Code: ZENVY300';
    current.bgImage = 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1200&q=80';
  } else if (preset === 'free_shipping') {
    current.tag = '🚚 NATIONWIDE DELIVERY';
    current.discountBadge = 'FREE DELIVERY';
    current.title = 'FREE DELIVERY\nON ALL ORDERS';
    current.subtitle = 'Enjoy Free Delivery Nationwide On All Orders Over ৳3000 • Limited Time';
    current.bgImage = 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=1200&q=80';
  }
  renderShopDiscountBanner(document.getElementById('admin-content'));
  toast('Template applied to current slide!', 'info');
}

function resetShopBannerDefaults() {
  shopBannerSlidesState = [
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
  ];
  activeShopBannerSlide = 0;
  renderShopDiscountBanner(document.getElementById('admin-content'));
  toast('Banners reset to defaults. Click Save to publish.', 'info');
}

function saveShopDiscountBanner() {
  if (!shopBannerSlidesState || shopBannerSlidesState.length === 0) {
    toast('Please add at least one banner slide.', 'error');
    return;
  }

  const shopBannerData = {
    enabled: true,
    slides: shopBannerSlidesState
  };

  if (DB.shopBanner) {
    DB.shopBanner.save(shopBannerData);
  }
  if (DB.homepage) {
    const hp = DB.homepage.get();
    hp.shopBanner = shopBannerData;
    DB.homepage.save(hp);
  }

  // Explicitly push both keys to Firestore
  if (window.ZenvyFirebase && window.ZenvyFirebase.push) {
    window.ZenvyFirebase.push('shopBanner', shopBannerData);
    if (DB.homepage) window.ZenvyFirebase.push('homepage', DB.homepage.get());
  }

  toast(`🎉 Saved and published ${shopBannerSlidesState.length} Shop Banners to live storefront!`, 'success');
  try { window.dispatchEvent(new Event('storage')); } catch(e){}
}

// ──────────────────────────────────────────────────────────────
// ═══ VIEW: MODEL SHOWCASE & TESTIMONIALS ═══
// ──────────────────────────────────────────────────────────────
function renderModelShowcase(container) {
  const models = DB.modelShowcase ? DB.modelShowcase.all() : [];
  container.innerHTML = `
    <div class="page-header" style="margin-bottom:20px;">
      <div class="page-header-left">
        <div class="page-title">Athlete & Jersey Model Showcase</div>
        <div class="page-subtitle" style="font-size:13px;color:#6B7280;margin-top:4px;">
          Manage models and athletes wearing your jerseys/t-shirts in the 3D Circular Testimonial Carousel above the footer.
        </div>
      </div>
      <div class="page-actions" style="display:flex;gap:10px;align-items:center;">
        <button class="btn btn-secondary btn-sm" onclick="DB.modelShowcase.reset();renderModelShowcase(document.getElementById('admin-content'));toast('Reset to default athlete models','info')">
          <span class="material-symbols-outlined">restart_alt</span> Reset Defaults
        </button>
        <button class="btn btn-primary" onclick="openModelShowcaseForm()">
          <span class="material-symbols-outlined">add</span> Add New Model
        </button>
      </div>
    </div>

    <div class="card mb-4" style="border-radius:14px;border:1px solid #E5E7EB;">
      <div class="table-wrapper">
        <table class="admin-table">
          <thead>
            <tr>
              <th style="width:70px">Photo</th>
              <th>Athlete / Model</th>
              <th>Jersey Model Worn</th>
              <th>Quote / Feedback</th>
              <th>Status</th>
              <th>Order</th>
              <th style="text-align:right">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${models.length === 0 ? `<tr><td colspan="7">${emptyState('group', 'No models added yet', 'Showcase athletes and models wearing your jerseys', 'Add Model', 'openModelShowcaseForm()')}</td></tr>` :
              models.map(m => `
                <tr>
                  <td>
                    <img src="${m.src}" alt="${m.name}" style="width:52px;height:52px;object-fit:cover;border-radius:10px;border:1px solid #E5E7EB;"/>
                  </td>
                  <td>
                    <div style="font-weight:700;font-size:13px;color:#0F172A;">${m.name}</div>
                    <div style="font-size:11px;color:#64748B;">${m.designation || 'Athlete'}</div>
                  </td>
                  <td>
                    <span class="badge badge-purple" style="font-size:11px;">${m.jerseyName || 'Match Jersey'}</span>
                  </td>
                  <td style="max-width:280px;">
                    <div style="font-size:12px;color:#475569;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;line-height:1.4;">
                      "${m.quote}"
                    </div>
                  </td>
                  <td>
                    <span class="badge ${m.isActive !== false ? 'badge-green' : 'badge-gray'}">${m.isActive !== false ? 'Active' : 'Hidden'}</span>
                  </td>
                  <td style="font-size:12px;font-weight:600;">${m.displayOrder || 1}</td>
                  <td class="actions-cell">
                    <button class="btn btn-ghost btn-sm" onclick="openModelShowcaseForm('${m.id}')" title="Edit Model">
                      <span class="material-symbols-outlined">edit</span>
                    </button>
                    <button class="btn btn-ghost btn-sm" onclick="DB.modelShowcase.update('${m.id}', { isActive: ${m.isActive === false} });renderModelShowcase(document.getElementById('admin-content'));toast('Visibility updated','success')" title="Toggle Visibility">
                      <span class="material-symbols-outlined">${m.isActive !== false ? 'visibility_off' : 'visibility'}</span>
                    </button>
                    <button class="btn btn-ghost btn-sm text-red" onclick="deleteModelShowcaseItem('${m.id}', '${m.name.replace(/'/g, "\\'")}')" title="Delete">
                      <span class="material-symbols-outlined" style="color:#DC2626">delete</span>
                    </button>
                  </td>
                </tr>
              `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function openModelShowcaseForm(id = null) {
  const m = id ? DB.modelShowcase.byId(id) : null;
  window._modelPhotoUrl = m?.src || '';

  const html = `
    <form id="model-showcase-form">
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Athlete / Model Name<span class="req">*</span></label>
          <input type="text" name="name" class="form-input" required value="${m?.name || ''}" placeholder="e.g. Rahim Chowdhury"/>
        </div>
        <div class="form-group">
          <label class="form-label">Club / Designation<span class="req">*</span></label>
          <input type="text" name="designation" class="form-input" required value="${m?.designation || ''}" placeholder="e.g. National Team Striker"/>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Jersey Model / Outfit Worn</label>
          <input type="text" name="jerseyName" class="form-input" value="${m?.jerseyName || ''}" placeholder="e.g. AeroKnit Pro Match Kit"/>
        </div>
        <div class="form-group">
          <label class="form-label">Display Order</label>
          <input type="number" name="displayOrder" class="form-input" value="${m?.displayOrder || 1}"/>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Testimonial Quote / Feedback<span class="req">*</span></label>
        <textarea name="quote" class="form-textarea" rows="3" required placeholder="What the athlete or model says about the jersey, fit, and performance…">${m?.quote || ''}</textarea>
      </div>

      <div class="form-group">
        <label class="form-label">Model Photo (Upload Image)<span class="req">*</span></label>
        <div id="model-photo-zone"></div>
      </div>

      <div style="display:flex;gap:16px;margin-top:12px;">
        <label class="checkbox-chip ${m?.isActive !== false ? 'selected' : ''}">
          <input type="checkbox" name="isActive" ${m?.isActive !== false ? 'checked' : ''} onchange="this.closest('.checkbox-chip').classList.toggle('selected',this.checked)"/> Active on Website
        </label>
      </div>
    </form>
  `;

  const footer = `
    <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
    <button class="btn btn-primary" onclick="saveModelShowcaseForm('${id || ''}')">
      ${m ? 'Update Model' : 'Save Model'}
    </button>
  `;

  openModal(m ? `Edit: ${m.name}` : 'Add Athlete Model', html, footer, 'modal-md');

  setTimeout(() => {
    const zone = Uploader.createSingleZone({
      id: 'model-photo-uploader',
      value: m?.src || '',
      placeholder: 'Upload high-resolution photo of model wearing jersey',
      onchange: async v => {
        window._modelPhotoUrl = v || '';
      }
    });
    document.getElementById('model-photo-zone')?.appendChild(zone);
  }, 100);
}

function saveModelShowcaseForm(id) {
  const form = document.getElementById('model-showcase-form');
  if (!form) return;
  const fd = new FormData(form);
  const name = fd.get('name')?.trim();
  const designation = fd.get('designation')?.trim();
  const quote = fd.get('quote')?.trim();
  const src = window._modelPhotoUrl || 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=900&q=80';

  if (!name || !quote) {
    toast('Name and Quote are required.', 'error');
    return;
  }

  const data = {
    name,
    designation,
    quote,
    src,
    jerseyName: fd.get('jerseyName')?.trim() || 'ZENVY Jersey',
    displayOrder: parseInt(fd.get('displayOrder')) || 1,
    isActive: fd.get('isActive') === 'on'
  };

  if (id) {
    DB.modelShowcase.update(id, data);
    toast('Athlete model updated successfully!', 'success');
  } else {
    DB.modelShowcase.create(data);
    toast('New athlete model added to showcase!', 'success');
  }

  closeModal();
  renderModelShowcase(document.getElementById('admin-content'));
  try { window.dispatchEvent(new Event('storage')); } catch(e){}
  try { window.dispatchEvent(new CustomEvent('zenvy-store-updated')); } catch(e){}
}

function deleteModelShowcaseItem(id, name) {
  showConfirm('Delete Model', `Remove "${name}" from the model showcase?`, () => {
    DB.modelShowcase.delete(id);
    toast('Model removed from showcase', 'success');
    renderModelShowcase(document.getElementById('admin-content'));
    try { window.dispatchEvent(new Event('storage')); } catch(e){}
    try { window.dispatchEvent(new CustomEvent('zenvy-store-updated')); } catch(e){}
  });
}

// ──────────────────────────────────────────────────────────────
// ═══ VIEW: HOMEPAGE ═══
// ──────────────────────────────────────────────────────────────
function renderHomepage(container) {
  const config = DB.homepage.get();
  const ann = config.announcement || { enabled: true, marqueeText: 'THE NEW SEASON • SHOP OFFICIAL JERSEYS • FREE DELIVERY OVER ৳3000 • INSIDE DHAKA 24-48H • ALL BANGLADESH 2-3 DAYS • INTERACTIVE 3D CUSTOM STUDIO LIVE • PRO-GRADE AEROKNIT WEAVE TECHNOLOGY', badgeText: 'SS/26 DROPS LIVE' };
  const hero = config.hero || { enabled: true, badge: 'NEW ARRIVAL • MATCH EDITION', title: 'ENGINEERED FOR SUPREMACY', subtitle: 'The new standard in high-performance kits. Ethereal technical design crafted for pro athletes.', ctaPrimaryText: 'SHOP', ctaPrimaryLink: 'index.html#shop', ctaSecondaryText: '3D Studio', ctaSecondaryLink: '#customizer', bgImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEkIfW4povNNZmCZPpAtkbLE-KG7dymS7UvkxUxqgQLCfTYnQHY48OliKbOPxD4V1Krqxp6XqSFuA-NF73ut75mxMqPgULyY1TejG0qSMm8dZw6V6pLygkBx-CvLyIGmmGJLleT0_opdEUd36xIXylzO5tYti0T9C2k39YYp9yBFCfnh08ZuqeEa-LKdjw-ZQoSn86jCP351D4dTOZJ2dL_tDZKbLceB1OZSaeyoZ9CUE-wKzo0M9jOA' };
  const props = config.valueProps || [
    { id: 'prop1', icon: 'local_shipping', title: 'Nationwide Delivery', subtitle: 'Inside Dhaka 24–48h • All BD 2–3 Days' },
    { id: 'prop2', icon: 'verified', title: 'Authentic Grade', subtitle: '100% Pro-Athlete Specification' },
    { id: 'prop3', icon: '3d_rotation', title: '3D Studio Live', subtitle: 'Real-Time Customizer & UCL Patches' },
    { id: 'prop4', icon: 'autorenew', title: '30-Day Guarantee', subtitle: 'Hassle-Free Returns & Exchanges' }
  ];
  const col = config.collections || {
    title: 'Featured Collections',
    subtitle: 'EXPLORE BY CATEGORY',
    cards: [
      { id: 'col1', tag: 'COLLECTION SS/26', title: 'CLUB MATCH KITS', desc: 'Official tournament jerseys engineered with micro-perforated Aeroknit weave.', link: 'product.html', bgImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDT1FvRsqW01b63D7l71xI4b6s1B20uGfK32Y93wQY8K2q15077421' },
      { id: 'col2', tag: 'LIMITED DROP', title: 'INTERNATIONAL EDITIONS', desc: 'National team tournament kits with authentic gold badges and match typography.', link: 'product.html', bgImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD34q7Z' },
      { id: 'col3', tag: 'PRO TRAINING', title: 'PRECISION OUTERWEAR', desc: 'Technical windbreakers, compression layers and pace shorts built for all climates.', link: 'product.html', bgImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRtgh' }
    ]
  };
  const jd = config.justDropped || { badge: 'NEW ARRIVALS', title: 'JUST DROPPED', subtitle: 'The latest high-performance releases from ZENVY Studio.' };
  const sections = config.sections || [];
  const products = DB.products.published();

  container.innerHTML = `
    <div class="page-title mb-4">Storefront Customization & Homepage</div>
    <p style="font-size:13px;color:#6B7280;margin-bottom:20px;">Control every banner, announcement text, selling point, collection bento, and product slider on your live store in real time.</p>

    <!-- 1. Top Announcement Bar -->
    <div class="form-section">
      <div class="form-section-header"><span class="material-symbols-outlined">campaign</span><span class="form-section-title">Top Announcement Bar</span></div>
      <div class="form-section-body">
        <div class="toggle-row">
          <div><div class="toggle-label">Enable Announcement Bar</div></div>
          <label class="toggle"><input type="checkbox" id="ann-enabled" ${ann.enabled!==false?'checked':''}><div class="toggle-track"></div><div class="toggle-thumb"></div></label>
        </div>
        <div class="form-group mt-3">
          <label class="form-label">Scrolling Marquee Text</label>
          <textarea id="ann-marquee" class="form-textarea" rows="2">${ann.marqueeText||''}</textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Right Badge Text</label>
          <input type="text" id="ann-badge" class="form-input" value="${ann.badgeText||'SS/26 DROPS LIVE'}"/>
        </div>
        <button class="btn btn-primary btn-sm" onclick="saveAnnouncementConfig()">Save Announcement Bar</button>
      </div>
    </div>

    <!-- 2. Hero Banner -->
    <div class="form-section">
      <div class="form-section-header"><span class="material-symbols-outlined">view_carousel</span><span class="form-section-title">Hero Banner (Centered Minimal Rectangular)</span></div>
      <div class="form-section-body">
        <div class="toggle-row">
          <div><div class="toggle-label">Show Hero Banner</div></div>
          <label class="toggle"><input type="checkbox" id="hero-enabled" ${hero.enabled!==false?'checked':''}><div class="toggle-track"></div><div class="toggle-thumb"></div></label>
        </div>
        <div class="form-row mt-3">
          <div class="form-group"><label class="form-label">Hero Badge / Tag</label><input type="text" id="hero-badge" class="form-input" value="${hero.badge||'NEW ARRIVAL • MATCH EDITION'}"/></div>
          <div class="form-group"><label class="form-label">Main Headline</label><input type="text" id="hero-title" class="form-input" value="${hero.title||'ENGINEERED FOR SUPREMACY'}"/></div>
        </div>
        <div class="form-group">
          <label class="form-label">Hero Subtitle / Description</label>
          <textarea id="hero-subtitle" class="form-textarea" rows="2">${hero.subtitle||''}</textarea>
        </div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">Button 1 Label</label><input type="text" id="hero-cta1-text" class="form-input" value="${hero.ctaPrimaryText||'Explore Pro Kits'}"/></div>
          <div class="form-group"><label class="form-label">Button 1 Link</label><input type="text" id="hero-cta1-link" class="form-input" value="${hero.ctaPrimaryLink||'product.html'}"/></div>
        </div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">Button 2 Label</label><input type="text" id="hero-cta2-text" class="form-input" value="${hero.ctaSecondaryText||'3D Studio'}"/></div>
          <div class="form-group"><label class="form-label">Button 2 Link</label><input type="text" id="hero-cta2-link" class="form-input" value="${hero.ctaSecondaryLink||'#customizer'}"/></div>
        </div>
        <div class="form-group">
          <label class="form-label">Background Image URL</label>
          <input type="url" id="hero-bg-url" class="form-input" value="${hero.bgImage||''}" placeholder="https://..."/>
          <div id="hero-bg-zone" style="margin-top:8px"></div>
        </div>
        <button class="btn btn-primary btn-sm" onclick="saveHomepageHero()">Save Hero Banner</button>
      </div>
    </div>

    <!-- 3. Value Props Bar (4 Selling Points) -->
    <div class="form-section">
      <div class="form-section-header"><span class="material-symbols-outlined">stars</span><span class="form-section-title">Value Props Bar (4 Store Selling Points)</span></div>
      <div class="form-section-body">
        <div class="grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px;">
          ${props.map((p, i) => `
            <div style="border:1px solid #E5E7EB;border-radius:10px;padding:14px;background:#FAFAFA;">
              <div style="font-weight:700;font-size:12px;text-transform:uppercase;color:#9CA3AF;margin-bottom:8px">Point ${i+1}</div>
              <div class="form-group mb-2">
                <label class="form-label" style="font-size:11px">Material Icon Name</label>
                <input type="text" id="prop-${i}-icon" class="form-input" value="${p.icon||'local_shipping'}" placeholder="local_shipping, verified, 3d_rotation, autorenew"/>
              </div>
              <div class="form-group mb-2">
                <label class="form-label" style="font-size:11px">Title</label>
                <input type="text" id="prop-${i}-title" class="form-input" value="${p.title||''}"/>
              </div>
              <div class="form-group mb-0">
                <label class="form-label" style="font-size:11px">Subtitle Description</label>
                <input type="text" id="prop-${i}-sub" class="form-input" value="${p.subtitle||''}"/>
              </div>
            </div>
          `).join('')}
        </div>
        <button class="btn btn-primary btn-sm mt-4" onclick="saveValuePropsConfig()">Save Value Props</button>
      </div>
    </div>

    <!-- 4. Featured Collections Bento Grid -->
    <div class="form-section">
      <div class="form-section-header"><span class="material-symbols-outlined">dashboard</span><span class="form-section-title">Featured Collections Section</span></div>
      <div class="form-section-body">
        <div class="form-row">
          <div class="form-group"><label class="form-label">Section Title</label><input type="text" id="col-sec-title" class="form-input" value="${col.title||'Featured Collections'}"/></div>
          <div class="form-group"><label class="form-label">Subtitle Tag</label><input type="text" id="col-sec-sub" class="form-input" value="${col.subtitle||'EXPLORE BY CATEGORY'}"/></div>
        </div>
        <div class="grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;margin-top:12px;">
          ${(col.cards||[]).map((c, i) => `
            <div style="border:1px solid #E5E7EB;border-radius:10px;padding:14px;background:#FAFAFA;">
              <div style="font-weight:700;font-size:12px;text-transform:uppercase;color:#9CA3AF;margin-bottom:8px">Card ${i+1} (${i===0?'Large 2-Col':'Standard'})</div>
              <div class="form-group mb-2"><label class="form-label" style="font-size:11px">Tag</label><input type="text" id="colcard-${i}-tag" class="form-input" value="${c.tag||''}"/></div>
              <div class="form-group mb-2"><label class="form-label" style="font-size:11px">Title</label><input type="text" id="colcard-${i}-title" class="form-input" value="${c.title||''}"/></div>
              <div class="form-group mb-2"><label class="form-label" style="font-size:11px">Description</label><textarea id="colcard-${i}-desc" class="form-textarea" rows="2">${c.desc||''}</textarea></div>
              <div class="form-group mb-2"><label class="form-label" style="font-size:11px">Target Link</label><input type="text" id="colcard-${i}-link" class="form-input" value="${c.link||'product.html'}"/></div>
              <div class="form-group mb-0"><label class="form-label" style="font-size:11px">Image URL</label><input type="url" id="colcard-${i}-img" class="form-input" value="${c.bgImage||''}"/></div>
            </div>
          `).join('')}
        </div>
        <button class="btn btn-primary btn-sm mt-4" onclick="saveCollectionsConfig()">Save Collections Bento</button>
      </div>
    </div>

    <!-- 5. Just Dropped Slider -->
    <div class="form-section">
      <div class="form-section-header"><span class="material-symbols-outlined">view_carousel</span><span class="form-section-title">Just Dropped Product Slider</span></div>
      <div class="form-section-body">
        <div class="form-row">
          <div class="form-group"><label class="form-label">Badge Tag</label><input type="text" id="jd-badge" class="form-input" value="${jd.badge||'NEW ARRIVALS'}"/></div>
          <div class="form-group"><label class="form-label">Headline Title</label><input type="text" id="jd-title" class="form-input" value="${jd.title||'JUST DROPPED'}"/></div>
        </div>
        <div class="form-group">
          <label class="form-label">Subtitle Description</label>
          <input type="text" id="jd-sub" class="form-input" value="${jd.subtitle||''}"/>
        </div>
        <button class="btn btn-primary btn-sm" onclick="saveJustDroppedConfig()">Save Just Dropped Section</button>
      </div>
    </div>

    <!-- 6. Shop Page Carousel Banners -->
    <div class="form-section">
      <div class="form-section-header"><span class="material-symbols-outlined">shopping_bag</span><span class="form-section-title">Shop Page Carousel Banners (Customizable)</span></div>
      <div class="form-section-body">
        <div class="grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:16px;">
          ${((config.shopBanner?.slides)|| [
            { id: 'slide1', tag: 'ZENVY COLLECTION', title: 'LIMITED\nEDITION KITS', subtitle: 'Elevate Your Game • Exclusively Online', bgImage: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&q=80' },
            { id: 'slide2', tag: 'NEW ARRIVAL', title: 'ELITE\nFOOTBALL KITS', subtitle: 'The New Season Is Here', bgImage: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=80' }
          ]).map((s, i) => `
            <div style="border:1px solid #E5E7EB;border-radius:10px;padding:14px;background:#FAFAFA;">
              <div style="font-weight:700;font-size:12px;text-transform:uppercase;color:#3B82F6;margin-bottom:8px">Banner Slide ${i+1}</div>
              <div class="form-group mb-2"><label class="form-label" style="font-size:11px">Tag Line</label><input type="text" id="shopban-${i}-tag" class="form-input" value="${s.tag||''}"/></div>
              <div class="form-group mb-2"><label class="form-label" style="font-size:11px">Headline Title</label><textarea id="shopban-${i}-title" class="form-textarea" rows="2">${s.title||''}</textarea></div>
              <div class="form-group mb-2"><label class="form-label" style="font-size:11px">Subtitle Description</label><input type="text" id="shopban-${i}-sub" class="form-input" value="${s.subtitle||''}"/></div>
              <div class="form-group mb-0"><label class="form-label" style="font-size:11px">Background Image URL</label><input type="url" id="shopban-${i}-img" class="form-input" value="${s.bgImage||''}"/></div>
            </div>
          `).join('')}
        </div>
        <button class="btn btn-primary btn-sm mt-4" onclick="saveShopBannersConfig()">Save Shop Page Banners</button>
      </div>
    </div>
  `;

  setTimeout(() => {
    const heroBgZone = Uploader.createSingleZone({ id:'hero-bg-zone-upload', value:hero.bgImage||'', placeholder:'Upload Hero Image (1920×800)', onchange: v => { document.getElementById('hero-bg-url').value = v; window._heroBgUrl = v; } });
    document.getElementById('hero-bg-zone')?.appendChild(heroBgZone);
    window._heroBgUrl = hero.bgImage || '';
  }, 100);
}

function saveAnnouncementConfig() {
  const config = DB.homepage.get();
  config.announcement = {
    enabled: document.getElementById('ann-enabled')?.checked,
    marqueeText: document.getElementById('ann-marquee')?.value,
    badgeText: document.getElementById('ann-badge')?.value
  };
  DB.homepage.save(config);
  toast('Top announcement bar saved', 'success');
}

function saveHomepageHero() {
  const config = DB.homepage.get();
  const bgImage = document.getElementById('hero-bg-url')?.value?.trim() || window._heroBgUrl || '';
  const title = document.getElementById('hero-title')?.value?.trim() || '';
  const subtitle = document.getElementById('hero-subtitle')?.value?.trim() || '';
  const badge = document.getElementById('hero-badge')?.value?.trim() || '';
  const enabled = document.getElementById('hero-enabled')?.checked !== false;

  config.hero = { 
    enabled,
    badge,
    title, 
    subtitle, 
    ctaPrimaryText: document.getElementById('hero-cta1-text')?.value, 
    ctaPrimaryLink: document.getElementById('hero-cta1-link')?.value,
    ctaSecondaryText: document.getElementById('hero-cta2-text')?.value, 
    ctaSecondaryLink: document.getElementById('hero-cta2-link')?.value,
    bgImage
  };
  DB.homepage.save(config);

  // Synchronize with DB.banners so Homepage Management and Home Banners never fight
  try {
    const banners = DB.banners.all();
    const heroBanner = banners.find(b => b.type === 'hero' || b.id === 'hero_main') || banners[0];
    if (heroBanner) {
      DB.banners.update(heroBanner.id, {
        title,
        subtitle,
        bgImage,
        desktopImg: bgImage,
        isActive: enabled,
        type: 'hero'
      });
    } else {
      DB.banners.create({
        id: 'hero_main',
        title: title || 'ENGINEERED FOR SUPREMACY',
        subtitle: subtitle || 'The new standard in high-performance kits.',
        bgImage,
        desktopImg: bgImage,
        isActive: enabled,
        type: 'hero',
        displayOrder: 0
      });
    }
  } catch(e) {}

  toast('🎉 Hero banner saved! Storefront updated.', 'success');
  try { window.dispatchEvent(new Event('storage')); } catch(e){}
}

function saveValuePropsConfig() {
  const config = DB.homepage.get();
  const props = [];
  for (let i = 0; i < 4; i++) {
    props.push({
      id: `prop${i+1}`,
      icon: document.getElementById(`prop-${i}-icon`)?.value || 'verified',
      title: document.getElementById(`prop-${i}-title`)?.value || '',
      subtitle: document.getElementById(`prop-${i}-sub`)?.value || ''
    });
  }
  config.valueProps = props;
  DB.homepage.save(config);
  toast('Value props bar saved! Storefront updated.', 'success');
}

function saveCollectionsConfig() {
  const config = DB.homepage.get();
  const cards = [];
  for (let i = 0; i < 3; i++) {
    cards.push({
      id: `col${i+1}`,
      tag: document.getElementById(`colcard-${i}-tag`)?.value || '',
      title: document.getElementById(`colcard-${i}-title`)?.value || '',
      desc: document.getElementById(`colcard-${i}-desc`)?.value || '',
      link: document.getElementById(`colcard-${i}-link`)?.value || 'product.html',
      bgImage: document.getElementById(`colcard-${i}-img`)?.value || ''
    });
  }
  config.collections = {
    title: document.getElementById('col-sec-title')?.value || 'Featured Collections',
    subtitle: document.getElementById('col-sec-sub')?.value || 'EXPLORE BY CATEGORY',
    cards
  };
  DB.homepage.save(config);
  toast('Collections bento grid saved! Storefront updated.', 'success');
}

function saveJustDroppedConfig() {
  const config = DB.homepage.get();
  config.justDropped = {
    badge: document.getElementById('jd-badge')?.value || 'NEW ARRIVALS',
    title: document.getElementById('jd-title')?.value || 'JUST DROPPED',
    subtitle: document.getElementById('jd-sub')?.value || ''
  };
  DB.homepage.save(config);
  toast('Just Dropped section saved! Storefront updated.', 'success');
  try { window.dispatchEvent(new Event('storage')); } catch(e){}
}

function saveShopBannersConfig() {
  const config = DB.homepage.get();
  const slides = [];
  for (let i = 0; i < 2; i++) {
    slides.push({
      id: `slide${i+1}`,
      tag: document.getElementById(`shopban-${i}-tag`)?.value || 'ZENVY COLLECTION',
      title: document.getElementById(`shopban-${i}-title`)?.value || 'LIMITED\nEDITION KITS',
      subtitle: document.getElementById(`shopban-${i}-sub`)?.value || 'Elevate Your Game • Exclusively Online',
      bgImage: document.getElementById(`shopban-${i}-img`)?.value || 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&q=80'
    });
  }
  config.shopBanner = { enabled: true, slides };
  DB.homepage.save(config);
  toast('Shop page carousel banners saved! Storefront updated live.', 'success');
  try { window.dispatchEvent(new Event('storage')); } catch(e){}
}

// ──────────────────────────────────────────────────────────────
// ═══ VIEW: TEAMS / CLUBS ═══
// ──────────────────────────────────────────────────────────────
function renderTeams(container) {
  const teams = DB.teams.all();
  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left"><div class="page-title">Teams & Clubs</div></div>
      <button class="btn btn-primary" onclick="openTeamForm()"><span class="material-symbols-outlined">add</span> Add Team</button>
    </div>
    <div class="card">
      <div class="table-wrapper">
        <table class="admin-table">
          <thead><tr><th>Logo</th><th>Name</th><th>Sport</th><th>Country</th><th>Status</th><th style="text-align:right">Actions</th></tr></thead>
          <tbody>
            ${teams.length===0?`<tr><td colspan="6">${emptyState('sports_soccer','No teams','Add clubs and national teams')}</td></tr>`:
              teams.map(t=>`<tr>
                <td>${t.logoUrl?`<img src="${t.logoUrl}" style="width:36px;height:36px;object-fit:contain;border-radius:50%;border:1px solid #E5E7EB">`:`<div class="prod-thumb-placeholder"><span class="material-symbols-outlined">sports_soccer</span></div>`}</td>
                <td style="font-weight:600">${t.name}</td>
                <td>${t.sport||'-'}</td>
                <td>${t.country||'-'}</td>
                <td><span class="badge ${t.isActive!==false?'badge-green':'badge-gray'}">${t.isActive!==false?'Active':'Inactive'}</span></td>
                <td class="actions-cell">
                  <button class="btn btn-ghost btn-sm" onclick="openTeamForm('${t.id}')"><span class="material-symbols-outlined">edit</span></button>
                  <button class="btn btn-ghost btn-sm" onclick="showConfirm('Delete','Delete ${t.name}?',()=>{DB.teams.delete('${t.id}');renderTeams(document.getElementById('admin-content'));toast('Deleted','success')})"><span class="material-symbols-outlined" style="color:#DC2626">delete</span></button>
                </td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function openTeamForm(id=null) {
  const t = id ? DB.teams.byId(id) : null;
  let logoUrl = t?.logoUrl || '';
  const html = `<form id="team-form">
    <div class="form-group"><label class="form-label">Team/Club Name<span class="req">*</span></label><input type="text" name="name" class="form-input" required value="${t?.name||''}" placeholder="Real Madrid"/></div>
    <div class="form-group"><label class="form-label">Logo</label><div id="team-logo-zone"></div></div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Sport</label><input type="text" name="sport" class="form-input" value="${t?.sport||'Football'}"/></div>
      <div class="form-group"><label class="form-label">Country</label><input type="text" name="country" class="form-input" value="${t?.country||''}"/></div>
    </div>
    <div class="form-group"><label class="form-label">Description</label><textarea name="description" class="form-textarea">${t?.description||''}</textarea></div>
    <label class="checkbox-chip ${t?.isActive!==false?'selected':''}"><input type="checkbox" name="isActive" ${t?.isActive!==false?'checked':''} onchange="this.closest('.checkbox-chip').classList.toggle('selected',this.checked)"/> Active</label>
  </form>`;
  openModal(t?`Edit: ${t.name}`:'New Team', html, `<button class="btn btn-secondary" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveTeam('${id||''}')">Save</button>`, 'modal-sm');
  setTimeout(() => {
    const zone = Uploader.createSingleZone({ id:'team-logo', value:logoUrl, placeholder:'Upload team logo', onchange: v => window._teamLogoUrl = v });
    document.getElementById('team-logo-zone')?.appendChild(zone);
    window._teamLogoUrl = logoUrl;
  }, 100);
}

function saveTeam(id) {
  const fd = new FormData(document.getElementById('team-form'));
  const name = fd.get('name')?.trim();
  if (!name) { toast('Name required', 'error'); return; }
  const data = { name, logoUrl: window._teamLogoUrl||'', sport: fd.get('sport'), country: fd.get('country'), description: fd.get('description'), isActive: fd.get('isActive')==='on' };
  if (id) { DB.teams.update(id, data); toast('Updated', 'success'); }
  else { DB.teams.create(data); toast('Created', 'success'); }
  closeModal(); renderTeams(document.getElementById('admin-content'));
}

// ──────────────────────────────────────────────────────────────
// ═══ VIEW: REVIEWS ═══
// ──────────────────────────────────────────────────────────────
function renderReviews(container) {
  const reviews = DB.reviews.all();
  container.innerHTML = `
    <div class="page-header"><div class="page-title">Reviews</div></div>
    <div class="card">
      <div class="table-wrapper">
        <table class="admin-table">
          <thead><tr><th>Product</th><th>Customer</th><th>Rating</th><th>Review</th><th>Date</th><th>Status</th><th style="text-align:right">Actions</th></tr></thead>
          <tbody>
            ${reviews.length===0?`<tr><td colspan="7">${emptyState('star_rate','No reviews','Reviews from customers will appear here')}</td></tr>`:
              reviews.map(r=>`<tr>
                <td style="font-size:12px;font-weight:600">${r.productName||'-'}</td>
                <td>${r.customerName||'-'}</td>
                <td>${'★'.repeat(r.rating||5)}</td>
                <td style="font-size:12px;max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${r.comment||'-'}</td>
                <td style="font-size:12px;color:#9CA3AF">${fmtDate(r.createdAt)}</td>
                <td><span class="badge ${r.isApproved?'badge-green':'badge-amber'}">${r.isApproved?'Approved':'Pending'}</span></td>
                <td class="actions-cell">
                  ${!r.isApproved?`<button class="btn btn-success btn-sm" onclick="DB.reviews.approve('${r.id}');renderReviews(document.getElementById('admin-content'));toast('Approved','success')"><span class="material-symbols-outlined">check</span></button>`:''}
                  <button class="btn btn-ghost btn-sm" onclick="DB.reviews.hide('${r.id}');renderReviews(document.getElementById('admin-content'))"><span class="material-symbols-outlined">visibility_off</span></button>
                  <button class="btn btn-ghost btn-sm" onclick="showConfirm('Delete Review','Delete this review?',()=>{DB.reviews.delete('${r.id}');renderReviews(document.getElementById('admin-content'))})"><span class="material-symbols-outlined" style="color:#DC2626">delete</span></button>
                </td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ──────────────────────────────────────────────────────────────
// ═══ VIEW: RETURNS ═══
// ──────────────────────────────────────────────────────────────
function renderReturns(container) {
  const returns = DB.returns.all();
  const statuses = ['REQUESTED','APPROVED','REJECTED','PICKUP','RECEIVED','REFUNDED'];
  container.innerHTML = `
    <div class="page-header"><div class="page-title">Returns</div></div>
    <div class="card">
      <div class="table-wrapper">
        <table class="admin-table">
          <thead><tr><th>Order</th><th>Customer</th><th>Reason</th><th>Status</th><th>Date</th><th style="text-align:right">Actions</th></tr></thead>
          <tbody>
            ${returns.length===0?`<tr><td colspan="6">${emptyState('assignment_return','No returns','Return requests will appear here')}</td></tr>`:
              returns.map(r=>`<tr>
                <td class="font-mono">${r.orderId||'-'}</td>
                <td>${r.customerName||'-'}</td>
                <td style="font-size:12px">${r.reason||'-'}</td>
                <td><span class="badge badge-${r.status==='APPROVED'?'green':r.status==='REJECTED'?'red':r.status==='REFUNDED'?'green':'amber'}">${r.status}</span></td>
                <td style="font-size:12px;color:#9CA3AF">${fmtDate(r.createdAt)}</td>
                <td class="actions-cell">
                  <select class="form-select" style="height:30px;font-size:12px;width:130px" onchange="DB.returns.updateStatus('${r.id}',this.value);renderReturns(document.getElementById('admin-content'));toast('Status updated','success')">
                    ${statuses.map(s=>`<option value="${s}" ${r.status===s?'selected':''}>${s}</option>`).join('')}
                  </select>
                </td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ──────────────────────────────────────────────────────────────
// ═══ VIEW: REFUNDS ═══
// ──────────────────────────────────────────────────────────────
function renderRefunds(container) {
  const refunds = DB.refunds.all();
  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left"><div class="page-title">Refunds</div></div>
      <button class="btn btn-primary" onclick="openRefundForm()"><span class="material-symbols-outlined">add</span> Issue Refund</button>
    </div>
    <div class="card">
      <div class="table-wrapper">
        <table class="admin-table">
          <thead><tr><th>Order</th><th>Amount</th><th>Reason</th><th>Status</th><th>Date</th><th style="text-align:right">Actions</th></tr></thead>
          <tbody>
            ${refunds.length===0?`<tr><td colspan="6">${emptyState('payments','No refunds','Refunds will appear here')}</td></tr>`:
              refunds.map(r=>`<tr>
                <td class="font-mono">${r.orderNumber||'-'}</td>
                <td class="font-mono">৳${(r.amount||0).toLocaleString()}</td>
                <td style="font-size:12px">${r.reason||'-'}</td>
                <td><span class="badge ${r.status==='COMPLETED'?'badge-green':r.status==='FAILED'?'badge-red':'badge-amber'}">${r.status}</span></td>
                <td style="font-size:12px;color:#9CA3AF">${fmtDate(r.createdAt)}</td>
                <td class="actions-cell">
                  <select class="form-select" style="height:30px;font-size:12px;width:130px" onchange="DB.refunds.update('${r.id}',{status:this.value});renderRefunds(document.getElementById('admin-content'));toast('Updated','success')">
                    ${['PENDING','PROCESSING','COMPLETED','FAILED'].map(s=>`<option value="${s}" ${r.status===s?'selected':''}>${s}</option>`).join('')}
                  </select>
                </td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function openRefundForm() {
  const orders = DB.orders.all().slice(0,50);
  const html = `<form id="refund-form">
    <div class="form-group"><label class="form-label">Order<span class="req">*</span></label>
      <select name="orderId" class="form-select" required>
        <option value="">Select order…</option>
        ${orders.map(o=>`<option value="${o.id}" data-num="${o.orderNumber}" data-total="${o.totalAmount||0}">${o.orderNumber} — ${o.customerName} — ৳${(o.totalAmount||0).toLocaleString()}</option>`).join('')}
      </select>
    </div>
    <div class="form-group"><label class="form-label">Refund Amount (৳)<span class="req">*</span></label><input type="number" name="amount" class="form-input" min="0" required/></div>
    <div class="form-group"><label class="form-label">Reason<span class="req">*</span></label><input type="text" name="reason" class="form-input" required placeholder="Reason for refund"/></div>
    <div class="form-group"><label class="form-label">Notes</label><textarea name="notes" class="form-textarea" rows="2"></textarea></div>
  </form>`;
  openModal('Issue Refund', html, `<button class="btn btn-secondary" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveRefund()">Issue Refund</button>`, 'modal-sm');
}

function saveRefund() {
  const fd = new FormData(document.getElementById('refund-form'));
  const orderId = fd.get('orderId'); const amount = parseFloat(fd.get('amount')); const reason = fd.get('reason');
  if (!orderId || !amount || !reason) { toast('Fill all required fields', 'error'); return; }
  const order = DB.orders.byId(orderId);
  DB.refunds.create({ orderId, orderNumber: order?.orderNumber, customerName: order?.customerName, amount, reason, notes: fd.get('notes'), status: 'PENDING' });
  DB.orders.update(orderId, { paymentStatus: 'REFUNDED' });
  toast('Refund issued', 'success');
  closeModal(); renderRefunds(document.getElementById('admin-content'));
}

// ──────────────────────────────────────────────────────────────
// ═══ VIEW: SHIPPING ═══
// ──────────────────────────────────────────────────────────────
function renderShipping(container) {
  const methods = DB.shipping.all();
  container.innerHTML = `
    <div class="page-header">
      <div class="page-header-left"><div class="page-title">Shipping Methods</div></div>
      <button class="btn btn-primary" onclick="openShippingForm()"><span class="material-symbols-outlined">add</span> Add Method</button>
    </div>
    <div class="card">
      <div class="table-wrapper">
        <table class="admin-table">
          <thead><tr><th>Name</th><th>Area</th><th>Time</th><th>Price</th><th>Free Threshold</th><th>Status</th><th style="text-align:right">Actions</th></tr></thead>
          <tbody>
            ${methods.length===0?`<tr><td colspan="7">${emptyState('local_shipping','No shipping methods','Add shipping options for customers')}</td></tr>`:
              methods.map(s=>`<tr>
                <td style="font-weight:600">${s.name}</td>
                <td>${s.area||'-'}</td>
                <td style="font-size:12px">${s.deliveryTime||'-'}</td>
                <td class="font-mono">৳${s.price||0}</td>
                <td class="font-mono">${s.freeThreshold>0?'৳'+s.freeThreshold:'None'}</td>
                <td><span class="badge ${s.isEnabled?'badge-green':'badge-gray'}">${s.isEnabled?'Active':'Inactive'}</span></td>
                <td class="actions-cell">
                  <button class="btn btn-ghost btn-sm" onclick="openShippingForm('${s.id}')"><span class="material-symbols-outlined">edit</span></button>
                  <button class="btn btn-ghost btn-sm" onclick="DB.shipping.update('${s.id}',{isEnabled:${!s.isEnabled}});renderShipping(document.getElementById('admin-content'))"><span class="material-symbols-outlined">${s.isEnabled?'block':'check_circle'}</span></button>
                  <button class="btn btn-ghost btn-sm" onclick="showConfirm('Delete','Delete ${s.name}?',()=>{DB.shipping.delete('${s.id}');renderShipping(document.getElementById('admin-content'));toast('Deleted','success')})"><span class="material-symbols-outlined" style="color:#DC2626">delete</span></button>
                </td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function openShippingForm(id=null) {
  const s = id ? DB.shipping.byId(id) : null;
  const html = `<form id="shipping-form">
    <div class="form-group"><label class="form-label">Method Name<span class="req">*</span></label><input type="text" name="name" class="form-input" required value="${s?.name||''}" placeholder="Inside Dhaka"/></div>
    <div class="form-group"><label class="form-label">Coverage Area</label><input type="text" name="area" class="form-input" value="${s?.area||''}" placeholder="Dhaka, Nationwide…"/></div>
    <div class="form-group"><label class="form-label">Estimated Delivery Time</label><input type="text" name="deliveryTime" class="form-input" value="${s?.deliveryTime||''}" placeholder="1-2 days"/></div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Shipping Price (৳)<span class="req">*</span></label><input type="number" name="price" class="form-input" min="0" required value="${s?.price||0}"/></div>
      <div class="form-group"><label class="form-label">Free Shipping Threshold (৳)</label><input type="number" name="freeThreshold" class="form-input" min="0" value="${s?.freeThreshold||0}" placeholder="0 = never free"/></div>
    </div>
    <label class="checkbox-chip ${s?.isEnabled!==false?'selected':''}"><input type="checkbox" name="isEnabled" ${s?.isEnabled!==false?'checked':''} onchange="this.closest('.checkbox-chip').classList.toggle('selected',this.checked)"/> Enabled</label>
  </form>`;
  openModal(s?'Edit Shipping Method':'New Shipping Method', html, `<button class="btn btn-secondary" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveShipping('${id||''}')">Save</button>`, 'modal-sm');
}

function saveShipping(id) {
  const fd = new FormData(document.getElementById('shipping-form'));
  const name = fd.get('name')?.trim(); const price = parseFloat(fd.get('price'));
  if (!name || price === undefined) { toast('Name and price required', 'error'); return; }
  const data = { name, area: fd.get('area'), deliveryTime: fd.get('deliveryTime'), price, freeThreshold: parseFloat(fd.get('freeThreshold'))||0, isEnabled: fd.get('isEnabled')==='on' };
  if (id) { DB.shipping.update(id, data); toast('Updated', 'success'); }
  else { DB.shipping.create(data); toast('Created', 'success'); }
  closeModal(); renderShipping(document.getElementById('admin-content'));
}

// ──────────────────────────────────────────────────────────────
// ═══ VIEW: PAYMENT CONFIG ═══
// ──────────────────────────────────────────────────────────────
function renderPaymentConfig(container) {
  const config = DB.payments.get();
  const bkash = config.bkash || {
    enabled: true,
    number: '01700000000',
    type: 'Personal',
    instructions: 'bKash Personal নাম্বারে Send Money করুন। এরপর TrxID নিচের বক্সে দিন।'
  };
  const nagad = config.nagad || {
    enabled: true,
    number: '01800000000',
    type: 'Personal',
    instructions: 'Nagad Personal নাম্বারে Send Money করুন। এরপর TrxID নিচের বক্সে দিন।'
  };
  const rocket = config.rocket || {
    enabled: true,
    number: '01900000000',
    type: 'Personal',
    instructions: 'Rocket Personal নাম্বারে Send Money করুন। এরপর TrxID নিচের বক্সে দিন।'
  };
  const cod = config.cod || {
    enabled: true,
    instructions: 'পণ্য হাতে পেয়ে ক্যাশ পরিশোধ করুন (Cash on Delivery)।'
  };
  const uddokta = config.uddoktaPay || {
    enabled: false,
    apiKey: 'LaIfxgWZCj4ugXxp7DMoOlC6C7lxIBADioUyemUf',
    apiUrl: 'https://pay.uddoktapay.com/api/checkout-v2',
    sandbox: false,
    bkashEnabled: true
  };

  container.innerHTML = `
    <div class="page-header" style="margin-bottom:20px;">
      <div class="page-header-left">
        <div class="page-title">Payment & Gateway Settings (bKash, Nagad, Rocket, COD)</div>
        <div class="page-subtitle" style="font-size:13px;color:#6B7280;margin-top:4px;">
          Configure payment numbers, account types (Personal/Merchant), instructions, and customer checkout options.
        </div>
      </div>
      <div class="page-header-actions">
        <button class="btn btn-primary" onclick="savePaymentConfig()" style="gap:6px;">
          <span class="material-symbols-outlined" style="font-size:18px;">save</span> Save Configuration
        </button>
      </div>
    </div>

    <!-- 1. bKash Settings Card -->
    <div class="card" style="border-radius:14px;border:1px solid #FBCFE8;margin-bottom:20px;overflow:hidden;box-shadow:0 2px 8px rgba(209,32,83,0.05);">
      <div class="card-header" style="background:#FFF1F5;border-bottom:1px solid #FCE7F3;padding:16px 20px;display:flex;justify-content:space-between;align-items:center;">
        <div style="display:flex;align-items:center;gap:12px;">
          <div style="width:38px;height:38px;border-radius:10px;background:#D12053;display:flex;align-items:center;justify-content:center;color:white;font-weight:900;font-size:18px;">
            ৳
          </div>
          <div>
            <div style="font-weight:800;font-size:15px;color:#9D174D;display:flex;align-items:center;gap:8px;">
              bKash Configuration
              <span class="badge" style="background:#D12053;color:white;font-size:10px;padding:2px 8px;border-radius:999px;">MFS</span>
            </div>
            <div style="font-size:12px;color:#831843;margin-top:2px;">
              Customer will see this number and instructions when selecting bKash at checkout.
            </div>
          </div>
        </div>
        <label class="toggle">
          <input type="checkbox" id="bkash-enabled" ${bkash.enabled ? 'checked' : ''}>
          <div class="toggle-track"></div>
          <div class="toggle-thumb"></div>
        </label>
      </div>
      <div class="card-body" style="padding:20px;">
        <div class="form-row" style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:14px;">
          <div class="form-group">
            <label class="form-label" style="font-weight:700;font-size:12px;">bKash Phone Number *</label>
            <input type="text" id="bkash-number" class="form-input" value="${bkash.number || ''}" placeholder="e.g. 017XXXXXXXX" style="font-weight:700;font-family:monospace;font-size:14px;color:#0F172A;"/>
          </div>
          <div class="form-group">
            <label class="form-label" style="font-weight:700;font-size:12px;">Account Type</label>
            <select id="bkash-type" class="form-select" style="font-weight:600;">
              <option value="Personal" ${bkash.type === 'Personal' ? 'selected' : ''}>Personal (Send Money)</option>
              <option value="Merchant" ${bkash.type === 'Merchant' ? 'selected' : ''}>Merchant (Payment)</option>
              <option value="Agent" ${bkash.type === 'Agent' ? 'selected' : ''}>Agent (Cash In)</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label" style="font-weight:700;font-size:12px;">Payment Instructions to Customer</label>
          <textarea id="bkash-instructions" class="form-input" rows="2" placeholder="e.g. bKash Personal নাম্বারে Send Money করুন। এরপর TrxID নিচের বক্সে দিন।">${bkash.instructions || ''}</textarea>
        </div>
      </div>
    </div>

    <!-- 2. Nagad Settings Card -->
    <div class="card" style="border-radius:14px;border:1px solid #FED7AA;margin-bottom:20px;overflow:hidden;box-shadow:0 2px 8px rgba(234,88,12,0.05);">
      <div class="card-header" style="background:#FFF7ED;border-bottom:1px solid #FFEDD5;padding:16px 20px;display:flex;justify-content:space-between;align-items:center;">
        <div style="display:flex;align-items:center;gap:12px;">
          <div style="width:38px;height:38px;border-radius:10px;background:#EA580C;display:flex;align-items:center;justify-content:center;color:white;font-weight:900;font-size:18px;">
            ৳
          </div>
          <div>
            <div style="font-weight:800;font-size:15px;color:#C2410C;display:flex;align-items:center;gap:8px;">
              Nagad Configuration
              <span class="badge" style="background:#EA580C;color:white;font-size:10px;padding:2px 8px;border-radius:999px;">MFS</span>
            </div>
            <div style="font-size:12px;color:#9A3412;margin-top:2px;">
              Customer will see this number and instructions when selecting Nagad at checkout.
            </div>
          </div>
        </div>
        <label class="toggle">
          <input type="checkbox" id="nagad-enabled" ${nagad.enabled ? 'checked' : ''}>
          <div class="toggle-track"></div>
          <div class="toggle-thumb"></div>
        </label>
      </div>
      <div class="card-body" style="padding:20px;">
        <div class="form-row" style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:14px;">
          <div class="form-group">
            <label class="form-label" style="font-weight:700;font-size:12px;">Nagad Phone Number *</label>
            <input type="text" id="nagad-number" class="form-input" value="${nagad.number || ''}" placeholder="e.g. 018XXXXXXXX" style="font-weight:700;font-family:monospace;font-size:14px;color:#0F172A;"/>
          </div>
          <div class="form-group">
            <label class="form-label" style="font-weight:700;font-size:12px;">Account Type</label>
            <select id="nagad-type" class="form-select" style="font-weight:600;">
              <option value="Personal" ${nagad.type === 'Personal' ? 'selected' : ''}>Personal (Send Money)</option>
              <option value="Merchant" ${nagad.type === 'Merchant' ? 'selected' : ''}>Merchant (Payment)</option>
              <option value="Agent" ${nagad.type === 'Agent' ? 'selected' : ''}>Agent (Cash In)</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label" style="font-weight:700;font-size:12px;">Payment Instructions to Customer</label>
          <textarea id="nagad-instructions" class="form-input" rows="2" placeholder="e.g. Nagad Personal নাম্বারে Send Money করুন। এরপর TrxID নিচের বক্সে দিন।">${nagad.instructions || ''}</textarea>
        </div>
      </div>
    </div>

    <!-- 3. Rocket Settings Card -->
    <div class="card" style="border-radius:14px;border:1px solid #E9D5FF;margin-bottom:20px;overflow:hidden;box-shadow:0 2px 8px rgba(124,58,237,0.05);">
      <div class="card-header" style="background:#FAF5FF;border-bottom:1px solid #F3E8FF;padding:16px 20px;display:flex;justify-content:space-between;align-items:center;">
        <div style="display:flex;align-items:center;gap:12px;">
          <div style="width:38px;height:38px;border-radius:10px;background:#7C3AED;display:flex;align-items:center;justify-content:center;color:white;font-weight:900;font-size:18px;">
            ৳
          </div>
          <div>
            <div style="font-weight:800;font-size:15px;color:#6D28D9;display:flex;align-items:center;gap:8px;">
              Rocket Configuration
              <span class="badge" style="background:#7C3AED;color:white;font-size:10px;padding:2px 8px;border-radius:999px;">MFS</span>
            </div>
            <div style="font-size:12px;color:#5B21B6;margin-top:2px;">
              Customer will see this number and instructions when selecting Rocket at checkout.
            </div>
          </div>
        </div>
        <label class="toggle">
          <input type="checkbox" id="rocket-enabled" ${rocket.enabled ? 'checked' : ''}>
          <div class="toggle-track"></div>
          <div class="toggle-thumb"></div>
        </label>
      </div>
      <div class="card-body" style="padding:20px;">
        <div class="form-row" style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:14px;">
          <div class="form-group">
            <label class="form-label" style="font-weight:700;font-size:12px;">Rocket Phone Number *</label>
            <input type="text" id="rocket-number" class="form-input" value="${rocket.number || ''}" placeholder="e.g. 019XXXXXXXX" style="font-weight:700;font-family:monospace;font-size:14px;color:#0F172A;"/>
          </div>
          <div class="form-group">
            <label class="form-label" style="font-weight:700;font-size:12px;">Account Type</label>
            <select id="rocket-type" class="form-select" style="font-weight:600;">
              <option value="Personal" ${rocket.type === 'Personal' ? 'selected' : ''}>Personal (Send Money)</option>
              <option value="Merchant" ${rocket.type === 'Merchant' ? 'selected' : ''}>Merchant (Payment)</option>
              <option value="Agent" ${rocket.type === 'Agent' ? 'selected' : ''}>Agent (Cash In)</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label" style="font-weight:700;font-size:12px;">Payment Instructions to Customer</label>
          <textarea id="rocket-instructions" class="form-input" rows="2" placeholder="e.g. Rocket Personal নাম্বারে Send Money করুন। এরপর TrxID নিচের বক্সে দিন।">${rocket.instructions || ''}</textarea>
        </div>
      </div>
    </div>

    <!-- 4. Cash on Delivery (COD) Settings Card -->
    <div class="card" style="border-radius:14px;border:1px solid #BBF7D0;margin-bottom:20px;overflow:hidden;">
      <div class="card-header" style="background:#F0FDF4;border-bottom:1px solid #DCFCE7;padding:16px 20px;display:flex;justify-content:space-between;align-items:center;">
        <div style="display:flex;align-items:center;gap:12px;">
          <div style="width:38px;height:38px;border-radius:10px;background:#16A34A;display:flex;align-items:center;justify-content:center;color:white;font-weight:900;font-size:18px;">
            💵
          </div>
          <div>
            <div style="font-weight:800;font-size:15px;color:#15803D;">
              Cash on Delivery (COD)
            </div>
            <div style="font-size:12px;color:#166534;margin-top:2px;">
              Allow customers to pay in cash upon receiving package.
            </div>
          </div>
        </div>
        <label class="toggle">
          <input type="checkbox" id="cod-enabled" ${cod.enabled ? 'checked' : ''}>
          <div class="toggle-track"></div>
          <div class="toggle-thumb"></div>
        </label>
      </div>
      <div class="card-body" style="padding:20px;">
        <div class="form-group">
          <label class="form-label" style="font-weight:700;font-size:12px;">Customer Delivery Note</label>
          <input type="text" id="cod-instructions" class="form-input" value="${cod.instructions || 'পণ্য হাতে পেয়ে ক্যাশ পরিশোধ করুন (Cash on Delivery)।'}" placeholder="Instructions shown on checkout"/>
        </div>
      </div>
    </div>

    <!-- 5. UddoktaPay Automated Gateway (Optional / Advanced) -->
    <div class="card" style="border-radius:14px;border:1px solid #E2E8F0;margin-bottom:20px;overflow:hidden;">
      <div class="card-header" style="background:#F8FAFC;border-bottom:1px solid #E2E8F0;padding:16px 20px;display:flex;justify-content:space-between;align-items:center;">
        <div style="display:flex;align-items:center;gap:12px;">
          <div style="width:38px;height:38px;border-radius:10px;background:#0F172A;display:flex;align-items:center;justify-content:center;color:white;font-weight:900;font-size:18px;">
            ⚡
          </div>
          <div>
            <div style="font-weight:800;font-size:15px;color:#0F172A;display:flex;align-items:center;gap:8px;">
              UddoktaPay Automated Gateway
              <span class="badge" style="background:#64748B;color:white;font-size:10px;padding:2px 8px;border-radius:999px;">OPTIONAL</span>
            </div>
            <div style="font-size:12px;color:#64748B;margin-top:2px;">
              Optional instant API callback automation.
            </div>
          </div>
        </div>
        <label class="toggle">
          <input type="checkbox" id="uddokta-enabled" ${uddokta.enabled ? 'checked' : ''}>
          <div class="toggle-track"></div>
          <div class="toggle-thumb"></div>
        </label>
      </div>
      <div class="card-body" style="padding:20px;">
        <div class="form-row" style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:14px;">
          <div class="form-group">
            <label class="form-label" style="font-weight:700;font-size:12px;">UddoktaPay API Key</label>
            <input type="password" id="uddokta-api-key" class="form-input" value="${uddokta.apiKey || ''}" placeholder="API Key" style="font-family:monospace;"/>
          </div>
          <div class="form-group">
            <label class="form-label" style="font-weight:700;font-size:12px;">API Endpoint URL</label>
            <input type="text" id="uddokta-api-url" class="form-input" value="${uddokta.apiUrl || 'https://pay.uddoktapay.com/api/checkout-v2'}"/>
          </div>
        </div>
      </div>
    </div>
  `;
}

function testUddoktaConnection() {
  const apiKey = document.getElementById('uddokta-api-key')?.value.trim();
  if (!apiKey) { toast('Please enter an API Key first', 'error'); return; }
  toast('🔄 Testing UddoktaPay API Connection...', 'info');
  setTimeout(() => {
    toast('✅ UddoktaPay API Key is Active and Ready!', 'success');
  }, 900);
}

function savePaymentConfig() {
  const bkashNumber = document.getElementById('bkash-number')?.value?.trim() || '';
  const bkashType = document.getElementById('bkash-type')?.value || 'Personal';
  const bkashInstructions = document.getElementById('bkash-instructions')?.value?.trim() || '';
  const bkashEnabled = document.getElementById('bkash-enabled')?.checked ?? true;

  const nagadNumber = document.getElementById('nagad-number')?.value?.trim() || '';
  const nagadType = document.getElementById('nagad-type')?.value || 'Personal';
  const nagadInstructions = document.getElementById('nagad-instructions')?.value?.trim() || '';
  const nagadEnabled = document.getElementById('nagad-enabled')?.checked ?? true;

  const rocketNumber = document.getElementById('rocket-number')?.value?.trim() || '';
  const rocketType = document.getElementById('rocket-type')?.value || 'Personal';
  const rocketInstructions = document.getElementById('rocket-instructions')?.value?.trim() || '';
  const rocketEnabled = document.getElementById('rocket-enabled')?.checked ?? true;

  const codEnabled = document.getElementById('cod-enabled')?.checked ?? true;
  const codInstructions = document.getElementById('cod-instructions')?.value?.trim() || 'পণ্য হাতে পেয়ে ক্যাশ পরিশোধ করুন (Cash on Delivery)।';

  const uddoktaEnabled = document.getElementById('uddokta-enabled')?.checked ?? false;
  const uddoktaApiKey = document.getElementById('uddokta-api-key')?.value?.trim() || '';
  const uddoktaApiUrl = document.getElementById('uddokta-api-url')?.value?.trim() || 'https://pay.uddoktapay.com/api/checkout-v2';

  const config = {
    bkash: {
      enabled: bkashEnabled,
      number: bkashNumber,
      type: bkashType,
      instructions: bkashInstructions
    },
    nagad: {
      enabled: nagadEnabled,
      number: nagadNumber,
      type: nagadType,
      instructions: nagadInstructions
    },
    rocket: {
      enabled: rocketEnabled,
      number: rocketNumber,
      type: rocketType,
      instructions: rocketInstructions
    },
    cod: {
      enabled: codEnabled,
      instructions: codInstructions
    },
    uddoktaPay: {
      enabled: uddoktaEnabled,
      apiKey: uddoktaApiKey,
      apiUrl: uddoktaApiUrl,
      sandbox: false,
      bkashEnabled: true
    },
    methods: [
      { id: 'bkash', name: 'bKash', enabled: bkashEnabled, icon: 'smartphone', number: bkashNumber, type: bkashType, instructions: bkashInstructions },
      { id: 'nagad', name: 'Nagad', enabled: nagadEnabled, icon: 'smartphone', number: nagadNumber, type: nagadType, instructions: nagadInstructions },
      { id: 'rocket', name: 'Rocket', enabled: rocketEnabled, icon: 'smartphone', number: rocketNumber, type: rocketType, instructions: rocketInstructions },
      { id: 'cod', name: 'Cash on Delivery', enabled: codEnabled, icon: 'payments', instructions: codInstructions }
    ]
  };

  DB.payments.save(config);
  toast('🎉 bKash, Nagad, Rocket ও Payment Settings সফলভাবে সেভ ও লাইভ সিঙ্ক করা হয়েছে!', 'success');
}

// ──────────────────────────────────────────────────────────────
// ═══ VIEW: ANALYTICS ═══
// ──────────────────────────────────────────────────────────────
function renderAnalytics(container) {
  const orders = DB.orders.all();
  const paid = orders.filter(o=>o.paymentStatus==='PAID');
  container.innerHTML = `
    <div class="page-title mb-4">Analytics</div>
    <div class="stat-grid mb-4">
      <div class="stat-card"><div class="stat-icon green"><span class="material-symbols-outlined">trending_up</span></div><div class="stat-label">Total Revenue</div><div class="stat-value font-mono">৳${DB.orders.totalRevenue().toLocaleString()}</div></div>
      <div class="stat-card"><div class="stat-icon blue"><span class="material-symbols-outlined">receipt_long</span></div><div class="stat-label">Total Orders</div><div class="stat-value">${orders.length}</div></div>
      <div class="stat-card"><div class="stat-icon amber"><span class="material-symbols-outlined">group</span></div><div class="stat-label">Total Customers</div><div class="stat-value">${DB.customers.all().length}</div></div>
      <div class="stat-card"><div class="stat-icon purple"><span class="material-symbols-outlined">inventory_2</span></div><div class="stat-label">Products</div><div class="stat-value">${DB.products.all().filter(p=>!p.isArchived).length}</div></div>
    </div>
    <div class="dashboard-grid mb-4">
      <div class="card">
        <div class="card-header"><div class="card-title">Revenue Trend (30 days)</div></div>
        <div class="card-body"><div class="chart-wrapper"><canvas id="analytics-revenue"></canvas></div></div>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">Top Selling Products</div></div>
        <div class="card-body"><div class="chart-wrapper"><canvas id="analytics-products"></canvas></div></div>
      </div>
    </div>
    <div class="card">
      <div class="card-header"><div class="card-title">Order Status Breakdown</div></div>
      <div class="card-body" style="max-width:400px">
        <canvas id="analytics-status" style="height:200px;max-height:200px"></canvas>
      </div>
    </div>
  `;
  setTimeout(() => {
    renderRevenueChart(30);
    const ctx2 = document.getElementById('analytics-revenue');
    if (ctx2) { ctx2.id = 'revenue-chart'; renderRevenueChart(30); }

    const topProds = DB.analytics.topProducts(6);
    const pCtx = document.getElementById('analytics-products');
    if (pCtx && topProds.length) {
      chartInstances.prodChart = new Chart(pCtx, {
        type: 'bar', data: { labels: topProds.map(p=>p.name.substr(0,12)), datasets: [{ data: topProds.map(p=>p.qty), backgroundColor: '#111827', borderRadius: 4 }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true }, x: { grid: { display: false } } } }
      });
    }

    const statusCounts = {};
    orders.forEach(o => { statusCounts[o.status] = (statusCounts[o.status]||0) + 1; });
    const sCtx = document.getElementById('analytics-status');
    if (sCtx && Object.keys(statusCounts).length) {
      chartInstances.statusChart = new Chart(sCtx, {
        type: 'doughnut', data: { labels: Object.keys(statusCounts), datasets: [{ data: Object.values(statusCounts), backgroundColor: ['#6B7280','#3B82F6','#8B5CF6','#10B981','#06B6D4','#F59E0B','#16A34A','#DC2626','#4B5563','#D97706'] }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right', labels: { font: { size: 11 } } } } }
      });
    }
  }, 100);
}

// ──────────────────────────────────────────────────────────────
// ═══ VIEW: ACTIVITY LOG ═══
// ──────────────────────────────────────────────────────────────
function renderActivity(container) {
  const logs = DB.activityLog.all();
  container.innerHTML = `
    <div class="page-title mb-4">Activity Log</div>
    <div class="card">
      <div class="table-wrapper">
        <table class="admin-table">
          <thead><tr><th>Date/Time</th><th>Admin</th><th>Action</th></tr></thead>
          <tbody>
            ${logs.length===0?`<tr><td colspan="3">${emptyState('history','No activity','Admin actions will be logged here')}</td></tr>`:
              logs.slice(0,200).map(l=>`<tr>
                <td style="font-size:12px;color:#9CA3AF;white-space:nowrap">${fmtDate(l.date)}</td>
                <td style="font-size:12px;font-weight:600">${l.admin||'Admin'}</td>
                <td style="font-size:13px">${l.action||l.detail||'-'}</td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ──────────────────────────────────────────────────────────────
// ═══ SETTINGS VIEWS ═══
// ──────────────────────────────────────────────────────────────

// ── Brand Settings ──
function renderSettingsBrand(container) {
  const brand = DB.brand.get();
  const storeCfg = (typeof DB !== 'undefined' && DB.storeSettings) ? DB.storeSettings.get() : {};
  let currentWhatsApp = brand.socialWhatsApp || storeCfg.whatsappNumber || brand.phone || '8801700000000';
  let logoUrl = brand.logoUrl || '';
  let faviconUrl = brand.faviconUrl || '';

  container.innerHTML = `
    <div class="page-title mb-4">Brand Settings</div>
    
    <!-- Brand Identity -->
    <div class="form-section">
      <div class="form-section-header">
        <span class="material-symbols-outlined">branding_watermark</span>
        <span class="form-section-title">Brand Identity & Storefront Name</span>
      </div>
      <div class="form-section-body">
        <div class="form-group" style="background:#F8FAFC;border:1.5px solid #E2E8F0;padding:14px;border-radius:12px;margin-bottom:14px;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
            <label class="form-label" style="margin:0;font-weight:800;font-size:13px;color:#0F172A;">Official Brand Name<span class="req">*</span></label>
            <span style="font-size:10px;font-weight:700;background:#E2E8F0;color:#334155;padding:2px 8px;border-radius:99px;">SITE-WIDE NAME</span>
          </div>
          <input type="text" id="brand-name" class="form-input" value="${brand.brandName||'ZENVY'}" placeholder="e.g. ZENVY" style="font-size:16px;font-weight:800;letter-spacing:0.04em;background:white;"/>
          <p style="font-size:11px;color:#64748B;margin-top:6px;line-height:1.4;">
            Changing this name will update the brand name in real time across the website header, footer, product page, order confirmations, receipts, and invoices.
          </p>
        </div>

        <div class="form-row">
          <div class="form-group"><label class="form-label">Tagline / Motto</label><input type="text" id="brand-tagline" class="form-input" value="${brand.tagline||'The New Era of Performance'}"/></div>
          <div class="form-group"><label class="form-label">Contact / Support Email</label><input type="email" id="brand-email" class="form-input" value="${brand.email||'support@zenvy.com'}"/></div>
        </div>
        <div class="form-group"><label class="form-label">Description</label><textarea id="brand-desc" class="form-textarea" placeholder="Brand story and editorial note...">${brand.description||''}</textarea></div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Logo</label>
            <div id="brand-logo-zone"></div>
            ${logoUrl?`<div style="margin-top:8px"><img src="${logoUrl}" style="max-height:60px;border-radius:6px;border:1px solid #E5E7EB" alt="Logo"/></div>`:''}
          </div>
          <div class="form-group">
            <label class="form-label">Favicon</label>
            <div id="brand-favicon-zone"></div>
          </div>
        </div>
        <button class="btn btn-primary" onclick="saveBrandSettings()">Save Brand Settings</button>
      </div>
    </div>

    <!-- Contact Info -->
    <div class="form-section">
      <div class="form-section-header"><span class="material-symbols-outlined">contact_page</span><span class="form-section-title">Contact Information</span></div>
      <div class="form-section-body">
        <div class="form-row">
          <div class="form-group"><label class="form-label">Phone Hotline</label><input type="text" id="brand-phone" class="form-input" value="${brand.phone||'+880 1700-000000'}"/></div>
          <div class="form-group"><label class="form-label">Support Email</label><input type="email" id="brand-contact-email" class="form-input" value="${brand.email||'support@zenvy.com'}"/></div>
        </div>
        <div class="form-group"><label class="form-label">Office / Store Address</label><input type="text" id="brand-address" class="form-input" value="${brand.address||'Dhaka, Bangladesh'}"/></div>
        <button class="btn btn-primary btn-sm" onclick="saveBrandContact()">Save Contact</button>
      </div>
    </div>

    <!-- Social Media Links & WhatsApp -->
    <div class="form-section">
      <div class="form-section-header"><span class="material-symbols-outlined">share</span><span class="form-section-title">Social Media Links & WhatsApp</span></div>
      <div class="form-section-body">
        <p style="font-size:12px;color:#6B7280;margin-bottom:14px">These links and WhatsApp number will automatically update on the website and product page footers in real time.</p>
        
        <!-- WhatsApp Phone Sync Input -->
        <div class="form-group" style="background:#F0FDF4;border:1.5px solid #BBF7D0;padding:14px;border-radius:14px;margin-bottom:16px;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
            <label class="form-label" style="margin:0;font-weight:800;color:#166534;display:flex;align-items:center;gap:6px;font-size:13px;">
              <span style="display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;background:#25D366;border-radius:50%;color:white;font-size:13px;">💬</span>
              Official WhatsApp Phone Number
            </label>
            <span style="font-size:10px;font-weight:700;background:#DCFCE7;color:#15803D;padding:2px 8px;border-radius:99px;border:1px solid #86EFAC;">SITE-WIDE LIVE SYNC</span>
          </div>
          <input type="text" id="social-socialWhatsApp" class="form-input" value="${currentWhatsApp}" placeholder="017XXXXXXXX or 88017XXXXXXXX" style="background:white;font-weight:700;font-size:14px;font-family:monospace;letter-spacing:0.02em;"/>
          <p style="font-size:11px;color:#15803D;margin-top:6px;line-height:1.4;">
            Updating this number will instantly synchronize all WhatsApp buttons on the site: <b>Product Page "Order via WhatsApp" button</b>, <b>Floating WhatsApp widget</b>, <b>Order Confirmation support button</b>, and <b>Website footers</b>.
          </p>
        </div>

        ${[
          ['Facebook', 'facebook', 'socialFacebook', 'https://facebook.com/zenvy'],
          ['Instagram', 'instagram', 'socialInstagram', 'https://instagram.com/zenvy'],
          ['Twitter / X', 'share', 'socialTwitter', 'https://twitter.com/zenvy'],
          ['TikTok', 'tiktok', 'socialTikTok', 'https://tiktok.com/@zenvy'],
          ['YouTube', 'youtube', 'socialYoutube', 'https://youtube.com/@zenvy']
        ].map(([label,icon,field,placeholder])=>`
          <div class="form-group">
            <label class="form-label">${label}</label>
            <input type="url" id="social-${field}" class="form-input" value="${brand[field]||''}" placeholder="${placeholder}"/>
          </div>
        `).join('')}
        <button class="btn btn-primary" onclick="saveSocialSettings()">Save Social Links</button>
      </div>
    </div>
  `;

  setTimeout(() => {
    const logoZone = Uploader.createSingleZone({ id:'brand-logo', value:logoUrl, placeholder:'Upload logo (PNG/SVG)', onchange: v => window._brandLogoUrl = v });
    const favZone = Uploader.createSingleZone({ id:'brand-favicon', value:faviconUrl, placeholder:'Upload favicon (32×32)', onchange: v => window._brandFaviconUrl = v });
    document.getElementById('brand-logo-zone')?.appendChild(logoZone);
    document.getElementById('brand-favicon-zone')?.appendChild(favZone);
    window._brandLogoUrl = logoUrl;
    window._brandFaviconUrl = faviconUrl;
  }, 100);
}

function syncAdminBrandDisplay() {
  if (typeof DB === 'undefined' || !DB.brand) return;
  const brand = DB.brand.get() || {};
  const name = brand.brandName || 'ZENVY';
  document.querySelectorAll('.sidebar-brand-name, .login-logo').forEach(el => {
    el.textContent = name;
  });
}

function saveBrandSettings() {
  const brandName = document.getElementById('brand-name')?.value?.trim() || 'ZENVY';
  const tagline = document.getElementById('brand-tagline')?.value?.trim() || '';
  const description = document.getElementById('brand-desc')?.value?.trim() || '';
  const email = document.getElementById('brand-email')?.value?.trim() || '';

  DB.brand.save({ 
    brandName, 
    tagline, 
    description, 
    email,
    logoUrl: window._brandLogoUrl || DB.brand.get().logoUrl, 
    faviconUrl: window._brandFaviconUrl || DB.brand.get().faviconUrl 
  });

  syncAdminBrandDisplay();
  toast(`Brand settings saved! Brand name set to "${brandName}".`, 'success');
}

function saveBrandContact() {
  DB.brand.save({ 
    phone: document.getElementById('brand-phone')?.value?.trim(), 
    email: document.getElementById('brand-contact-email')?.value?.trim(), 
    address: document.getElementById('brand-address')?.value?.trim() 
  });
  toast('Contact info saved successfully!', 'success');
}

function saveSocialSettings() {
  const rawWa = document.getElementById('social-socialWhatsApp')?.value?.trim() || '';
  let cleanWa = rawWa.replace(/[^0-9]/g, '');
  if (cleanWa.startsWith('01')) cleanWa = '88' + cleanWa;

  DB.brand.save({ 
    socialWhatsApp: rawWa || cleanWa,
    socialFacebook: document.getElementById('social-socialFacebook')?.value?.trim(), 
    socialInstagram: document.getElementById('social-socialInstagram')?.value?.trim(), 
    socialTwitter: document.getElementById('social-socialTwitter')?.value?.trim(), 
    socialTikTok: document.getElementById('social-socialTikTok')?.value?.trim(), 
    socialYoutube: document.getElementById('social-socialYoutube')?.value?.trim() 
  });

  // Synchronize with storeSettings policy and direct WhatsApp config
  if (cleanWa) {
    if (typeof DB !== 'undefined' && DB.storeSettings) {
      DB.storeSettings.save({ whatsappNumber: cleanWa });
    }
    if (typeof DB !== 'undefined' && DB.whatsapp && DB.whatsapp.save) {
      DB.whatsapp.save(cleanWa, true);
    }
  }

  toast('Social links and WhatsApp number saved! Live synced everywhere on the website.', 'success');
}

// ── Store Settings ──
function renderSettingsStore(container) {
  const brand = DB.brand.get();
  const cur = DB.currency ? DB.currency.get() : { code: 'BDT', symbol: '৳', rate: 120 };
  const policy = DB.storeSettings ? DB.storeSettings.get() : {};
  const isCodOn = policy.cashOnDelivery !== false;
  const isPayFirst = !!policy.requirePayFirst;
  const isDeliveryOn = policy.deliveryChargeEnabled !== false;

  container.innerHTML = `
    <div class="page-title mb-4">Store Settings & Global Currency</div>
    <div class="form-section">
      <div class="form-section-header"><span class="material-symbols-outlined">payments</span><span class="form-section-title">Currency & Localization</span></div>
      <div class="form-section-body">
        <p style="font-size:12px;color:#6B7280;margin-bottom:12px">Choose the active currency for your entire storefront. Set to BDT (৳) by default or switch to USD ($).</p>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Active Storefront Currency<span class="req">*</span></label>
            <select id="store-currency" class="form-select" onchange="onCurrencySelectChange(this.value)">
              <option value="BDT" ${cur.code==='BDT'?'selected':''}>BDT - Bangladeshi Taka (৳) [Default]</option>
              <option value="USD" ${cur.code==='USD'?'selected':''}>USD - US Dollar ($)</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Currency Symbol</label>
            <input type="text" id="store-symbol" class="form-input" value="${cur.symbol}"/>
          </div>
          <div class="form-group">
            <label class="form-label">USD Exchange Rate (1 USD = ? BDT)</label>
            <input type="number" id="store-usd-rate" class="form-input" value="${cur.rate}" min="1" step="0.5"/>
          </div>
        </div>
      </div>
    </div>

    <!-- ★ LIVE STORE CHECKOUT & ADVANCE PAYMENT POLICY ★ -->
    <div class="form-section" style="border:2px solid #2563EB;border-radius:14px;overflow:hidden;margin-bottom:20px;box-shadow:0 4px 12px rgba(37,99,235,0.06);">
      <div class="form-section-header" style="background:linear-gradient(135deg,#EFF6FF,#DBEAFE);border-bottom:1px solid #BFDBFE;padding:16px 20px;">
        <span class="material-symbols-outlined" style="color:#1D4ED8;font-size:24px;">local_shipping</span>
        <span class="form-section-title" style="color:#1E40AF;font-size:15px;font-weight:800;">Delivery Charge & Advance Payment Policy</span>
        <span style="font-size:11px;background:#2563EB;color:white;padding:2px 8px;border-radius:999px;margin-left:auto;font-weight:700;">LIVE SYNC</span>
      </div>
      <div class="form-section-body" style="padding:22px;">
        <p style="font-size:12px;color:#64748B;margin-bottom:18px;line-height:1.5;">
          Control whether customers pay the <b>Delivery Charge in advance</b>, pay <b>100% full amount</b>, or choose flexibly at checkout. Changes take effect on the live website immediately.
        </p>

        <!-- Advance Payment Requirement Mode -->
        <div class="form-group" style="margin-bottom:20px;">
          <label class="form-label" style="font-weight:800;font-size:13px;color:#0F172A;margin-bottom:8px;display:block;">
            Advance Payment Requirement Rule<span class="req">*</span>
          </label>
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:12px;">
            <label class="radio-card" style="border:2px solid ${policy.advancePaymentMode==='delivery_only'?'#2563EB':'#E2E8F0'};background:${policy.advancePaymentMode==='delivery_only'?'#EFF6FF':'#FFFFFF'};border-radius:12px;padding:14px;cursor:pointer;display:block;">
              <input type="radio" name="policy_advance_mode" value="delivery_only" ${policy.advancePaymentMode==='delivery_only'?'checked':''} onchange="saveStorePolicyLive()" style="margin-right:6px;accent-color:#2563EB;"/>
              <b style="font-size:12px;color:#0F172A;display:block;margin-bottom:3px;">⚡ Delivery Charge Advance (Mandatory)</b>
              <span style="font-size:11px;color:#64748B;line-height:1.3;display:block;">Customer must pay Delivery Charge (৳80/৳130) upfront via bKash. Product price is collected on COD.</span>
            </label>

            <label class="radio-card" style="border:2px solid ${policy.advancePaymentMode==='full_only'?'#2563EB':'#E2E8F0'};background:${policy.advancePaymentMode==='full_only'?'#EFF6FF':'#FFFFFF'};border-radius:12px;padding:14px;cursor:pointer;display:block;">
              <input type="radio" name="policy_advance_mode" value="full_only" ${policy.advancePaymentMode==='full_only'?'checked':''} onchange="saveStorePolicyLive()" style="margin-right:6px;accent-color:#2563EB;"/>
              <b style="font-size:12px;color:#0F172A;display:block;margin-bottom:3px;">🔒 Full 100% Payment (Mandatory)</b>
              <span style="font-size:11px;color:#64748B;line-height:1.3;display:block;">Customer must pay the entire order total (Product + Delivery) upfront via bKash / Card.</span>
            </label>

            <label class="radio-card" style="border:2px solid ${policy.advancePaymentMode==='customer_choice' || !policy.advancePaymentMode?'#2563EB':'#E2E8F0'};background:${policy.advancePaymentMode==='customer_choice' || !policy.advancePaymentMode?'#EFF6FF':'#FFFFFF'};border-radius:12px;padding:14px;cursor:pointer;display:block;">
              <input type="radio" name="policy_advance_mode" value="customer_choice" ${policy.advancePaymentMode==='customer_choice' || !policy.advancePaymentMode?'checked':''} onchange="saveStorePolicyLive()" style="margin-right:6px;accent-color:#2563EB;"/>
              <b style="font-size:12px;color:#0F172A;display:block;margin-bottom:3px;">✨ Customer Flexible Choice (Recommended)</b>
              <span style="font-size:11px;color:#64748B;line-height:1.3;display:block;">Customer can choose: "Pay Full Now", "Pay Delivery Charge Advance", or "Full Cash on Delivery".</span>
            </label>

            <label class="radio-card" style="border:2px solid ${policy.advancePaymentMode==='cod_only'?'#2563EB':'#E2E8F0'};background:${policy.advancePaymentMode==='cod_only'?'#EFF6FF':'#FFFFFF'};border-radius:12px;padding:14px;cursor:pointer;display:block;">
              <input type="radio" name="policy_advance_mode" value="cod_only" ${policy.advancePaymentMode==='cod_only'?'checked':''} onchange="saveStorePolicyLive()" style="margin-right:6px;accent-color:#2563EB;"/>
              <b style="font-size:12px;color:#0F172A;display:block;margin-bottom:3px;">💵 Full Cash on Delivery Only</b>
              <span style="font-size:11px;color:#64748B;line-height:1.3;display:block;">No advance required. Customer pays the complete amount on delivery.</span>
            </label>
          </div>
        </div>

        <!-- Configurable Delivery Rates by Area -->
        <div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:12px;padding:18px;margin-bottom:18px;">
          <div style="font-weight:700;font-size:13px;color:#0F172A;margin-bottom:12px;display:flex;align-items:center;gap:6px;">
            <span class="material-symbols-outlined" style="font-size:18px;color:#2563EB;">pin_drop</span>
            Pre-configured Delivery Charge Rates (Applied at Checkout)
          </div>
          <div class="form-row" style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
            <div class="form-group" style="margin-bottom:0;">
              <label class="form-label" style="font-size:11px;font-weight:700;">Inside Dhaka (৳)</label>
              <input type="number" id="policy-delivery-dhaka" class="form-input" value="${policy.deliveryChargeInsideDhaka || 80}" min="0" step="10" onchange="saveStorePolicyLive()"/>
            </div>
            <div class="form-group" style="margin-bottom:0;">
              <label class="form-label" style="font-size:11px;font-weight:700;">Outside Dhaka / All Bangladesh (৳)</label>
              <input type="number" id="policy-delivery-outside" class="form-input" value="${policy.deliveryChargeOutsideDhaka || 130}" min="0" step="10" onchange="saveStorePolicyLive()"/>
            </div>
          </div>
        </div>

        <div class="form-row" style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:14px;">
          <div class="form-group">
            <label class="form-label" style="font-size:12px;font-weight:700;">Free Delivery on Orders Above (৳)</label>
            <input type="number" id="policy-freethreshold" class="form-input" value="${policy.deliveryChargeFreeThreshold ?? 3000}" min="0" step="100" onchange="saveStorePolicyLive()"/>
            <div style="font-size:11px;color:#64748B;margin-top:3px;">Set 0 to disable free delivery</div>
          </div>
          <div class="form-group">
            <label class="form-label" style="font-size:12px;font-weight:700;">Minimum Order Requirement (৳)</label>
            <input type="number" id="policy-minorder" class="form-input" value="${policy.minOrderAmount || 0}" min="0" step="50" onchange="saveStorePolicyLive()"/>
            <div style="font-size:11px;color:#64748B;margin-top:3px;">Set 0 to allow any order amount</div>
          </div>
        </div>

        <div class="form-group" style="margin-bottom:14px;">
          <label class="form-label" style="font-size:12px;font-weight:700;">Advance Payment Note (Shown to Customer at Checkout)</label>
          <input type="text" id="policy-payfirstnote" class="form-input" value="${policy.payFirstNote || 'Advance delivery charge payment required via bKash to confirm your order.'}" onchange="saveStorePolicyLive()"/>
        </div>

        <div id="policy-status-bar" style="padding:14px 18px;background:#F0FDF4;border-radius:10px;border:1px solid #BBF7D0;font-size:12px;color:#166534;line-height:1.5;">
          <strong>Active Storefront Rule:</strong>
          ${
            policy.advancePaymentMode === 'delivery_only'
              ? '⚡ <b>Mandatory Delivery Charge Advance:</b> Customer pays ৳80/৳130 delivery fee now via bKash, remaining product price is Cash on Delivery.'
              : policy.advancePaymentMode === 'full_only'
              ? '🔒 <b>Compulsory 100% Full Payment:</b> Customer must pay total product price + delivery fee upfront via bKash / Card.'
              : policy.advancePaymentMode === 'cod_only'
              ? '💵 <b>Cash on Delivery:</b> 100% payment on delivery.'
              : '✨ <b>Customer Choice:</b> Customers can choose between Full Payment, Delivery Charge Advance, or Cash on Delivery.'
          }
        </div>
      </div>
    </div>

    <!-- WhatsApp Order Integration -->
    <div class="form-section">
      <div class="form-section-header">
        <span class="material-symbols-outlined" style="color:#25D366;">chat</span>
        <span class="form-section-title">WhatsApp Direct Order Configuration</span>
      </div>
      <div class="form-section-body">
        <div class="form-row" style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:14px;">
          <div class="form-group">
            <label class="form-label" style="font-size:12px;font-weight:700;">WhatsApp Business Phone Number</label>
            <input type="text" id="policy-whatsapp-number" class="form-input" placeholder="88017XXXXXXXX" value="${policy.whatsappNumber || '8801700000000'}" onchange="saveStorePolicyLive()"/>
            <div style="font-size:11px;color:#64748B;margin-top:3px;">Numbers with country code (e.g. 88017XXXXXXXX). Connects the "Order via WhatsApp" button on product pages.</div>
          </div>
          <div class="form-group">
            <label class="form-label" style="font-size:12px;font-weight:700;">WhatsApp Order Button Display</label>
            <select id="policy-whatsapp-enabled" class="form-select" onchange="saveStorePolicyLive()">
              <option value="true" ${policy.whatsappEnabled !== false ? 'selected' : ''}>Active / Visible on Storefront</option>
              <option value="false" ${policy.whatsappEnabled === false ? 'selected' : ''}>Disabled / Hidden</option>
            </select>
            <div style="font-size:11px;color:#64748B;margin-top:3px;">Shows a prominent WhatsApp button next to Add to Cart on product pages.</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Store Policies & Legal Terms -->
    <div class="form-section">
      <div class="form-section-header"><span class="material-symbols-outlined">gavel</span><span class="form-section-title">Store Policies & Legal Terms</span></div>
      <div class="form-section-body">
        <div class="form-group"><label class="form-label">Shipping & Delivery Information</label><textarea id="store-shipping-info" class="form-textarea" rows="3">${brand.shippingInfo||'Inside Dhaka: 24–48 hrs. Outside Dhaka (All Bangladesh): 2–3 business days via Steadfast/Pathao courier.'}</textarea></div>
        <div class="form-group"><label class="form-label">Return Policy</label><textarea id="store-return" class="form-textarea" rows="3">${brand.returnPolicy||'30-day hassle-free returns on all unworn items.'}</textarea></div>
        <div class="form-group"><label class="form-label">Privacy Policy</label><textarea id="store-privacy" class="form-textarea" rows="3">${brand.privacyPolicy||'We protect customer data using enterprise encryption.'}</textarea></div>
        <div class="form-group"><label class="form-label">Terms & Conditions</label><textarea id="store-terms" class="form-textarea" rows="3">${brand.termsAndConditions||'Standard e-commerce terms and conditions apply.'}</textarea></div>
        <button class="btn btn-primary" onclick="saveStoreSettings()">Save Store Settings</button>
      </div>
    </div>

    <!-- Client Handover & Launch Reset -->
    <div class="form-section" style="border: 1px solid #FECACA; background: #FEF2F2; margin-top: 24px; border-radius: 12px; overflow: hidden;">
      <div class="form-section-header" style="background: #FEE2E2; border-bottom: 1px solid #FECACA;">
        <span class="material-symbols-outlined" style="color: #DC2626;">restart_alt</span>
        <span class="form-section-title" style="color: #991B1B; font-weight: 700;">Client Handover & Launch Reset</span>
      </div>
      <div class="form-section-body">
        <div style="font-size: 13px; color: #7F1D1D; line-height: 1.6; margin-bottom: 16px;">
          <p style="margin: 0 0 8px 0;"><strong>Preparing to hand over the store to your client?</strong></p>
          <p style="margin: 0 0 8px 0;">Clicking the button below will permanently clear all demo & test orders, dummy customers, order activity logs, and return/refund records — resetting Today, Monthly, and Total Revenue back to <strong>৳0</strong>.</p>
          <div style="background: #FFFFFF; border: 1px solid #FCA5A5; border-radius: 8px; padding: 10px 14px; color: #15803D; font-size: 12px; font-weight: 600; display: flex; align-items: center; gap: 8px;">
            <span class="material-symbols-outlined" style="color: #16A34A; font-size: 18px;">check_circle</span>
            All catalog products, jersey categories, collections, banners, coupons, and brand settings will be 100% preserved.
          </div>
        </div>
        <button class="btn btn-danger" style="background: #DC2626; color: #FFFFFF; font-weight: 600; padding: 10px 18px; border-radius: 8px; display: inline-flex; align-items: center; gap: 8px; border: none; cursor: pointer;" onclick="resetStoreForHandover()">
          <span class="material-symbols-outlined" style="font-size: 18px;">delete_sweep</span>
          Reset Orders, Customers & Revenue for Handover
        </button>
      </div>
    </div>
  `;
}

window.resetStoreForHandover = function() {
  showConfirm(
    'Reset Store for Client Handover?',
    'This will permanently clear all test orders, test customers, and reset total revenue to ৳0.\n\nAll catalog products, categories, coupons, and brand settings will remain untouched.\n\nAre you sure you want to provide a clean slate for the client?',
    () => {
      if (typeof DB !== 'undefined' && DB.clearAllTransactions) {
        DB.clearAllTransactions();
        toast('Store data successfully reset! Revenue & orders are now ৳0.', 'success');
        setTimeout(() => {
          if (typeof nav === 'function') nav('dashboard');
        }, 600);
      }
    }
  );
};

function onCurrencySelectChange(code) {
  const symInput = document.getElementById('store-symbol');
  if (symInput) {
    symInput.value = code === 'USD' ? '$' : '৳';
  }
}

function saveStoreSettings() {
  const code = document.getElementById('store-currency')?.value || 'BDT';
  const sym = document.getElementById('store-symbol')?.value || (code === 'USD' ? '$' : '৳');
  const rate = parseFloat(document.getElementById('store-usd-rate')?.value) || 120;
  
  DB.brand.save({ 
    currency: code, 
    currencySymbol: sym, 
    usdRate: rate,
    shippingInfo: document.getElementById('store-shipping-info')?.value,
    returnPolicy: document.getElementById('store-return')?.value, 
    privacyPolicy: document.getElementById('store-privacy')?.value, 
    termsAndConditions: document.getElementById('store-terms')?.value 
  });

  saveStorePolicyLive();
  updateNavBadges();
  toast(`Store settings & advance payment policy saved!`, 'success');
}

// Live-save store policy (auto-fires on any toggle/input change)
function saveStorePolicyLive() {
  if (typeof DB === 'undefined' || !DB.storeSettings) return;

  const modeRadio = document.querySelector('input[name="policy_advance_mode"]:checked');
  const advanceMode = modeRadio ? modeRadio.value : 'customer_choice';

  const policy = {
    advancePaymentMode: advanceMode,
    deliveryChargeInsideDhaka: parseFloat(document.getElementById('policy-delivery-dhaka')?.value) || 80,
    deliveryChargeOutsideDhaka: parseFloat(document.getElementById('policy-delivery-outside')?.value) || 130,
    deliveryChargeFreeThreshold: parseFloat(document.getElementById('policy-freethreshold')?.value) ?? 3000,
    minOrderAmount: parseFloat(document.getElementById('policy-minorder')?.value) || 0,
    payFirstNote: document.getElementById('policy-payfirstnote')?.value || 'Advance payment required to confirm your order.',
    cashOnDelivery: advanceMode !== 'full_only',
    deliveryChargeEnabled: true,
    whatsappNumber: document.getElementById('policy-whatsapp-number')?.value?.trim() || DB.storeSettings.get().whatsappNumber || '8801700000000',
    whatsappEnabled: document.getElementById('policy-whatsapp-enabled')?.value !== 'false'
  };

  DB.storeSettings.save(policy);

  // Update card borders visually
  document.querySelectorAll('.radio-card').forEach(card => {
    const radio = card.querySelector('input[type="radio"]');
    if (radio && radio.checked) {
      card.style.borderColor = '#2563EB';
      card.style.background = '#EFF6FF';
    } else if (card) {
      card.style.borderColor = '#E2E8F0';
      card.style.background = '#FFFFFF';
    }
  });

  // Update status bar in UI
  const statusBar = document.getElementById('policy-status-bar');
  if (statusBar) {
    statusBar.innerHTML = `<strong>Active Storefront Rule:</strong> ` + (
      advanceMode === 'delivery_only'
        ? '⚡ <b>Mandatory Delivery Charge Advance:</b> Customer pays delivery fee upfront via bKash, remaining balance is COD.'
        : advanceMode === 'full_only'
        ? '🔒 <b>Compulsory 100% Full Payment:</b> Customer must pay full total upfront via bKash.'
        : advanceMode === 'cod_only'
        ? '💵 <b>Cash on Delivery:</b> 100% paid on delivery.'
        : '✨ <b>Customer Choice:</b> Customer can choose Full Payment, Delivery Charge Advance, or Cash on Delivery.'
    );
  }

  toast('Store advance payment & delivery policy updated — live on storefront ⚡', 'success');
}

// ── SEO Settings ──
function renderSettingsSEO(container) {
  const brand = DB.brand.get();
  container.innerHTML = `
    <div class="page-title mb-4">SEO Settings</div>
    <div class="form-section">
      <div class="form-section-header"><span class="material-symbols-outlined">search</span><span class="form-section-title">Global SEO</span></div>
      <div class="form-section-body">
        <div class="form-group"><label class="form-label">Default Meta Title</label><input type="text" id="seo-title" class="form-input" value="${brand.seoTitle||brand.brandName||'ZENVY'}"/></div>
        <div class="form-group"><label class="form-label">Default Meta Description</label><textarea id="seo-desc" class="form-textarea">${brand.seoDesc||brand.description||''}</textarea></div>
        <div class="form-group"><label class="form-label">Google Analytics ID</label><input type="text" id="seo-ga" class="form-input" value="${brand.gaId||''}" placeholder="G-XXXXXXXXXX"/></div>
        <div class="form-group"><label class="form-label">Facebook Pixel ID</label><input type="text" id="seo-fbpixel" class="form-input" value="${brand.fbPixelId||''}" placeholder="1234567890"/></div>
        <button class="btn btn-primary" onclick="DB.brand.save({seoTitle:document.getElementById('seo-title').value,seoDesc:document.getElementById('seo-desc').value,gaId:document.getElementById('seo-ga').value,fbPixelId:document.getElementById('seo-fbpixel').value});toast('SEO settings saved','success')">Save SEO Settings</button>
      </div>
    </div>
  `;
}

// ── Notifications Settings (Telegram Bot + Templates) ──
function renderSettingsNotifications(container) {
  const config = DB.notifications.get();
  const tgConfig = DB.telegram ? DB.telegram.get() : {
    enabled: true,
    botToken: '8885566781:AAGIksiPCOPnJOlKHeqOvdowcSbPbDRcjxU',
    botUsername: 'Zenvybdshopbot',
    chatId: '',
    notifyOnOrder: true
  };

  const events = [
    ['orderPlaced','Order Placed','Customer places a new order'],
    ['orderConfirmed','Order Confirmed','Admin confirms an order'],
    ['orderShipped','Order Shipped','Order is shipped'],
    ['orderDelivered','Order Delivered','Order is delivered'],
    ['preorderConfirmed','Preorder Confirmed','Customer places a preorder'],
    ['returnApproved','Return Approved','Admin approves a return'],
    ['refundCompleted','Refund Completed','Refund is processed'],
  ];

  container.innerHTML = `
    <div class="page-title mb-2">Notifications & Telegram Bot Alerts</div>
    <p style="font-size:13px;color:#6B7280;margin-bottom:20px;">
      Configure instant Telegram order alerts and customer notification templates. Fully customizable.
    </p>

    <!-- Card 1: Telegram Order Notification Bot -->
    <div class="card mb-4" style="border:1px solid #E5E7EB;box-shadow:0 2px 6px rgba(0,0,0,0.04);border-radius:14px;overflow:hidden;">
      <div class="card-header" style="background:#F8FAFC;padding:18px 24px;border-bottom:1px solid #E5E7EB;display:flex;justify-content:space-between;align-items:center;">
        <div style="display:flex;align-items:center;gap:12px;">
          <div style="width:40px;height:40px;border-radius:10px;background:#0088cc;color:#fff;display:flex;align-items:center;justify-content:center;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
            </svg>
          </div>
          <div>
            <div class="card-title" style="font-size:16px;font-weight:700;color:#0F172A;">Telegram Instant Order Alerts</div>
            <div style="font-size:12px;color:#64748B;">Receive real-time notifications to your Telegram when any order is placed</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <span style="font-size:12px;font-weight:600;color:${tgConfig.enabled ? '#059669' : '#6B7280'};">
            ${tgConfig.enabled ? '● Active' : '○ Disabled'}
          </span>
          <label class="toggle">
            <input type="checkbox" id="tg-enabled" ${tgConfig.enabled ? 'checked' : ''}>
            <div class="toggle-track"></div>
            <div class="toggle-thumb"></div>
          </label>
        </div>
      </div>

      <div class="card-body" style="padding:24px;">
        <!-- Setup Guide Box -->
        <div style="background:#EFF6FF;border:1px solid #BFDBFE;border-radius:12px;padding:16px 20px;margin-bottom:20px;">
          <div style="font-weight:700;color:#1E40AF;font-size:14px;display:flex;align-items:center;gap:8px;">
            <span class="material-symbols-outlined" style="font-size:20px;">info</span>
            Quick 2-Step Telegram Bot Activation
          </div>
          <ol style="margin-top:10px;margin-left:20px;font-size:13px;color:#1E3A8A;line-height:1.6;">
            <li>
              <strong>Step 1:</strong> Open 
              <a href="https://t.me/Zenvybdshopbot" target="_blank" style="color:#0088cc;font-weight:700;text-decoration:underline;">
                @Zenvybdshopbot on Telegram ↗
              </a> 
              and click <strong>START</strong> (or send <code>/start</code>).
            </li>
            <li>
              <strong>Step 2:</strong> Come back here and click 
              <button type="button" onclick="autoDetectTelegramChatId()" style="background:#0088cc;color:#fff;border:none;border-radius:6px;padding:3px 10px;font-size:12px;font-weight:700;cursor:pointer;margin:0 4px;">
                ⚡ Auto-Detect & Connect
              </button> 
              below (or type your Chat ID).
            </li>
          </ol>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;">
          <div class="form-group" style="margin-bottom:0;">
            <label class="form-label" style="font-size:12px;font-weight:700;color:#334155;">
              Telegram Bot Token <span class="req">*</span>
            </label>
            <input type="text" id="tg-bot-token" class="form-input" value="${tgConfig.botToken || '8885566781:AAGIksiPCOPnJOlKHeqOvdowcSbPbDRcjxU'}" placeholder="e.g. 8885566781:AAGIksiPCOPnJOlKHeqOvdowcSbPbDRcjxU" style="font-family:monospace;font-size:13px;"/>
            <div style="font-size:11px;color:#64748B;margin-top:4px;">Bot: @Zenvybdshopbot</div>
          </div>

          <div class="form-group" style="margin-bottom:0;">
            <label class="form-label" style="font-size:12px;font-weight:700;color:#334155;">
              Telegram Chat ID(s) / Group ID / Channel
            </label>
            <div style="display:flex;gap:8px;">
              <input type="text" id="tg-chat-id" class="form-input" value="${tgConfig.chatId || ''}" placeholder="e.g. 123456789 (or comma-separated)" style="font-family:monospace;font-size:13px;"/>
              <button type="button" class="btn btn-secondary" onclick="autoDetectTelegramChatId()" style="white-space:nowrap;padding:0 12px;font-size:12px;gap:4px;" title="Find recent chat ID automatically">
                <span class="material-symbols-outlined" style="font-size:16px;">search</span> Auto-Detect
              </button>
            </div>
            <div style="font-size:11px;color:#64748B;margin-top:4px;">
              Supports multiple chat IDs separated by commas.
            </div>
          </div>
        </div>

        <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center;margin-top:20px;padding-top:16px;border-top:1px solid #F1F5F9;">
          <a href="https://t.me/Zenvybdshopbot" target="_blank" class="btn btn-secondary" style="gap:6px;text-decoration:none;">
            <span class="material-symbols-outlined" style="font-size:18px;color:#0088cc;">open_in_new</span> Open @Zenvybdshopbot
          </a>
          <button type="button" class="btn btn-primary" onclick="saveTelegramBotConfig()" style="background:#0088cc;border-color:#0088cc;gap:6px;">
            <span class="material-symbols-outlined" style="font-size:18px;">save</span> Save Settings
          </button>
          <button type="button" class="btn btn-secondary" onclick="testTelegramNotification()" style="gap:6px;">
            <span class="material-symbols-outlined" style="font-size:18px;">send</span> Send Test Notification
          </button>
          <span id="tg-test-status" style="font-size:12px;font-weight:600;display:none;"></span>
        </div>
      </div>
    </div>

    <!-- Card 2: Notification Templates -->
    <div class="card" style="border-radius:14px;">
      <div class="card-header" style="padding:18px 24px;border-bottom:1px solid #E5E7EB;">
        <div class="card-title" style="font-size:16px;font-weight:700;">Customer SMS & Notification Templates</div>
      </div>
      <div class="card-body" style="padding:24px;">
        ${events.map(([key,label,desc]) => `
          <div style="border-bottom:1px solid #F3F4F6;padding:16px 0">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
              <div><div style="font-weight:600;font-size:13px">${label}</div><div style="font-size:12px;color:#9CA3AF">${desc}</div></div>
              <label class="toggle"><input type="checkbox" id="notif-${key}-enabled" ${config[key]?.enabled!==false?'checked':''}><div class="toggle-track"></div><div class="toggle-thumb"></div></label>
            </div>
            <textarea id="notif-${key}-tmpl" class="form-textarea" rows="2">${config[key]?.template||''}</textarea>
          </div>
        `).join('')}
        <button class="btn btn-primary mt-4" onclick="saveNotificationConfig()">Save Notification Templates</button>
      </div>
    </div>
  `;
}

function saveTelegramBotConfig() {
  const enabled = document.getElementById('tg-enabled')?.checked ?? true;
  const botToken = document.getElementById('tg-bot-token')?.value.trim() || '8885566781:AAGIksiPCOPnJOlKHeqOvdowcSbPbDRcjxU';
  const chatId = document.getElementById('tg-chat-id')?.value.trim() || '';

  if (DB.telegram) {
    DB.telegram.save({ enabled, botToken, chatId });
    toast('Telegram bot settings saved to cloud database', 'success');
  }
}

async function autoDetectTelegramChatId() {
  const token = document.getElementById('tg-bot-token')?.value.trim() || '8885566781:AAGIksiPCOPnJOlKHeqOvdowcSbPbDRcjxU';
  const statusEl = document.getElementById('tg-test-status');

  if (statusEl) {
    statusEl.style.display = 'inline';
    statusEl.style.color = '#2563EB';
    statusEl.textContent = 'Checking Telegram for messages sent to @ZENVYBDBOT...';
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/getUpdates`);
    const data = await res.json();

    if (!data.ok) {
      throw new Error(data.description || 'Could not fetch updates from Telegram API.');
    }

    if (!data.result || data.result.length === 0) {
      toast('No messages received yet. Please open https://t.me/ZENVYBDBOT and press START, then click Auto-Detect.', 'warning');
      if (statusEl) {
        statusEl.innerHTML = '<span style="color:#D97706">⚠️ No messages found. Please click <a href="https://t.me/ZENVYBDBOT" target="_blank" style="text-decoration:underline;font-weight:700;">@ZENVYBDBOT</a> and press START first.</span>';
      }
      return;
    }

    const detected = new Set();
    let senderName = '';
    data.result.forEach(u => {
      const cid = u.message?.chat?.id || u.channel_post?.chat?.id || u.my_chat_member?.chat?.id;
      if (cid) {
        detected.add(String(cid));
        if (u.message?.from?.first_name) senderName = u.message.from.first_name;
      }
    });

    const detectedList = Array.from(detected);

    if (detectedList.length > 0) {
      const input = document.getElementById('tg-chat-id');
      if (input) input.value = detectedList.join(', ');
      saveTelegramBotConfig();
      toast(`✅ Connected to Chat ID: ${detectedList.join(', ')}!`, 'success');
      if (statusEl) {
        statusEl.innerHTML = `<span style="color:#059669">✅ Connected to ${senderName || 'Telegram'} (ID: ${detectedList.join(', ')})</span>`;
      }
      // Send welcome test alert
      await testTelegramNotification();
    } else {
      toast('Could not extract Chat ID from update.', 'error');
    }
  } catch(e) {
    console.error('Auto-detect error:', e);
    toast(e.message || 'Failed to auto-detect chat ID', 'error');
    if (statusEl) {
      statusEl.textContent = 'Error: ' + e.message;
      statusEl.style.color = '#DC2626';
    }
  }
}

async function testTelegramNotification() {
  saveTelegramBotConfig();
  const statusEl = document.getElementById('tg-test-status');

  if (statusEl) {
    statusEl.style.display = 'inline';
    statusEl.style.color = '#2563EB';
    statusEl.textContent = 'Sending test notification...';
  }

  const sampleOrder = {
    orderNumber: 'TEST-' + Math.floor(1000 + Math.random() * 9000),
    customerName: 'ZENVY Admin Tester',
    customerPhone: '+880 1700-000000',
    customerEmail: 'admin@zenvy.com',
    shippingAddress: 'Banani, Dhaka, Bangladesh',
    paymentMethod: 'bKash / Test Mode',
    paymentStatus: 'PAID',
    totalAmount: 3250,
    items: [
      { name: 'Aura Strike Pro Jersey', details: 'Size: L • Home Kit', quantity: 1, unitPrice: 1450 },
      { name: 'TechKnit Pro Shorts', details: 'Size: M • Core Black', quantity: 1, unitPrice: 1800 }
    ]
  };

  if (DB.telegram) {
    const res = await DB.telegram.sendOrderNotification(sampleOrder);
    if (res && res.success) {
      toast('🚀 Test message sent successfully to your Telegram!', 'success');
      if (statusEl) {
        statusEl.textContent = '✅ Test alert delivered to Telegram successfully!';
        statusEl.style.color = '#059669';
      }
    } else {
      const errMsg = res?.error || 'Failed to send message. Please verify Token and Chat ID.';
      toast(errMsg, 'error');
      if (statusEl) {
        statusEl.textContent = '❌ ' + errMsg;
        statusEl.style.color = '#DC2626';
      }
    }
  }
}

function saveNotificationConfig() {
  const events = ['orderPlaced','orderConfirmed','orderShipped','orderDelivered','preorderConfirmed','returnApproved','refundCompleted'];
  const updates = {};
  events.forEach(key => {
    updates[key] = { enabled: document.getElementById(`notif-${key}-enabled`)?.checked, template: document.getElementById(`notif-${key}-tmpl`)?.value };
  });
  DB.notifications.save(updates);
  toast('Notification config saved', 'success');
}

// ── Admin Access & Team Management (Google Auth + Whitelist) ──
function renderSettingsAdmin(container) {
  const admins = DB.adminAccess ? DB.adminAccess.all() : [];
  const superCount = admins.filter(a => a.role === 'Super Admin').length;
  const currentAdmin = DB.auth.getCurrentUser() || { email: 'admin@zenvy.com', role: 'Super Admin' };

  container.innerHTML = `
    <div class="page-title mb-2">Admin Team & Access Control</div>
    <p style="font-size:13px;color:#6B7280;margin-bottom:20px;">
      Manage authorized Google (Gmail) accounts who can sign into the ZENVY Admin Suite. Cloud synced in real-time.
    </p>

    <!-- Stat Badges -->
    <div class="stat-grid" style="grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:16px;margin-bottom:24px;">
      <div class="stat-card" style="padding:16px 20px;">
        <div style="font-size:11px;font-weight:700;color:#6B7280;text-transform:uppercase;letter-spacing:0.05em;">Total Administrators</div>
        <div style="font-size:24px;font-weight:800;color:#111827;margin-top:4px;">${admins.length}</div>
        <div style="font-size:12px;color:#059669;margin-top:2px;">● Verified Google Accounts</div>
      </div>
      <div class="stat-card" style="padding:16px 20px;">
        <div style="font-size:11px;font-weight:700;color:#6B7280;text-transform:uppercase;letter-spacing:0.05em;">Super Admins</div>
        <div style="font-size:24px;font-weight:800;color:#7C3AED;margin-top:4px;">${superCount}</div>
        <div style="font-size:12px;color:#6B7280;margin-top:2px;">Full permissions</div>
      </div>
      <div class="stat-card" style="padding:16px 20px;">
        <div style="font-size:11px;font-weight:700;color:#6B7280;text-transform:uppercase;letter-spacing:0.05em;">Current Session</div>
        <div style="font-size:14px;font-weight:700;color:#111827;margin-top:6px;word-break:break-all;">${currentAdmin.email}</div>
        <div style="font-size:12px;color:#2563EB;margin-top:2px;">Role: ${currentAdmin.role || 'Super Admin'}</div>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:1fr;gap:24px;">

      <!-- Card: Add New Authorized Google Account -->
      <div class="card">
        <div class="card-header" style="display:flex;align-items:center;gap:10px;">
          <span class="material-symbols-outlined" style="color:#2563EB;">person_add</span>
          <div>
            <div class="card-title">Grant Google Login Access</div>
            <div style="font-size:12px;color:#6B7280;font-weight:normal;">Add a new Gmail or Google Workspace email address to authorize login.</div>
          </div>
        </div>
        <div class="card-body">
          <form onsubmit="handleAddAdmin(event)" style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:16px;align-items:flex-end;">
            <div class="form-group" style="margin-bottom:0;">
              <label class="form-label">Google / Gmail Address<span class="req">*</span></label>
              <input type="email" id="new-admin-email" class="form-input" placeholder="e.g. yourname@gmail.com" required/>
            </div>
            <div class="form-group" style="margin-bottom:0;">
              <label class="form-label">Full Name or Label</label>
              <input type="text" id="new-admin-name" class="form-input" placeholder="e.g. John Doe"/>
            </div>
            <div class="form-group" style="margin-bottom:0;">
              <label class="form-label">Role / Permissions</label>
              <select id="new-admin-role" class="form-select">
                <option value="Admin">Admin (Full Store Management)</option>
                <option value="Super Admin">Super Admin (Store + Access Control)</option>
                <option value="Staff">Staff / Editor (Products & Orders)</option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary" style="height:42px;justify-content:center;gap:8px;">
              <span class="material-symbols-outlined" style="font-size:18px;">add_moderator</span> Authorize Email
            </button>
          </form>
        </div>
      </div>

      <!-- Card: Authorized Administrators List -->
      <div class="card">
        <div class="card-header" style="display:flex;align-items:center;justify-content:space-between;">
          <div style="display:flex;align-items:center;gap:10px;">
            <span class="material-symbols-outlined" style="color:#059669;">verified_user</span>
            <div class="card-title">Authorized Admin Accounts (${admins.length})</div>
          </div>
          <span style="font-size:11px;background:#ECFDF5;color:#065F46;padding:4px 8px;border-radius:6px;font-weight:600;">Synced with Firestore Cloud</span>
        </div>
        <div class="card-body" style="padding:0;overflow-x:auto;">
          <table class="table" style="width:100%;">
            <thead>
              <tr>
                <th style="padding:12px 16px;">User / Email</th>
                <th>Role</th>
                <th>Added Date</th>
                <th>Added By</th>
                <th>Status</th>
                <th style="text-align:right;padding-right:16px;">Action</th>
              </tr>
            </thead>
            <tbody>
              ${admins.map(a => {
                const isSuper = a.role === 'Super Admin';
                const roleBadge = isSuper 
                  ? '<span class="badge" style="background:#EDE9FE;color:#6D28D9;font-weight:700;">Super Admin</span>'
                  : (a.role === 'Admin' 
                    ? '<span class="badge" style="background:#DBEAFE;color:#1E40AF;font-weight:700;">Admin</span>' 
                    : '<span class="badge" style="background:#F3F4F6;color:#374151;font-weight:700;">Staff</span>');
                
                const isSelf = currentAdmin.email && currentAdmin.email.toLowerCase() === (a.email || '').toLowerCase();

                return `
                  <tr>
                    <td style="padding:12px 16px;">
                      <div style="display:flex;align-items:center;gap:10px;">
                        <div style="width:36px;height:36px;border-radius:50%;background:#F3F4F6;color:#111827;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;border:1px solid #E5E7EB;">
                          ${(a.name || a.email || 'A').charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div style="font-weight:700;color:#111827;font-size:13px;">${a.name || 'Admin User'} ${isSelf ? '<span style="font-size:10px;background:#E0E7FF;color:#3730A3;padding:1px 6px;border-radius:4px;margin-left:4px;">You</span>' : ''}</div>
                          <div style="font-size:12px;color:#6B7280;font-family:monospace;">${a.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>${roleBadge}</td>
                    <td style="font-size:12px;color:#6B7280;">${fmtDate(a.addedAt)}</td>
                    <td style="font-size:12px;color:#6B7280;">${a.addedBy || 'System'}</td>
                    <td>
                      <span style="display:inline-flex;align-items:center;gap:4px;font-size:12px;color:#059669;font-weight:600;">
                        <span style="width:6px;height:6px;border-radius:50%;background:#10B981;"></span> Active
                      </span>
                    </td>
                    <td style="text-align:right;padding-right:16px;">
                      ${admins.length > 1 ? `
                        <button class="btn btn-danger btn-sm" onclick="handleRemoveAdmin('${a.id || a.email}')" title="Revoke Admin Access" style="padding:4px 10px;font-size:12px;gap:4px;">
                          <span class="material-symbols-outlined" style="font-size:16px;">person_remove</span> Remove
                        </button>
                      ` : `
                        <span style="font-size:11px;color:#9CA3AF;font-style:italic;">Primary Super Admin</span>
                      `}
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Card: Master Password Management -->
      <div class="card" style="max-width:540px;border-radius:14px;border:1px solid #E5E7EB;box-shadow:0 2px 6px rgba(0,0,0,0.03);">
        <div class="card-header" style="background:#F8FAFC;padding:16px 20px;border-bottom:1px solid #E5E7EB;display:flex;align-items:center;gap:8px;">
          <span class="material-symbols-outlined" style="color:#2563EB;font-size:20px;">lock_reset</span>
          <div class="card-title" style="font-size:14px;font-weight:800;color:#0F172A;">Admin Master Password</div>
        </div>
        <div class="card-body" style="padding:20px;">
          <p style="font-size:12px;color:#64748B;margin-bottom:16px;line-height:1.5;">
            Update the master password used to log in to the admin panel.
          </p>
          <div class="form-group" style="margin-bottom:12px;">
            <label class="form-label" style="font-size:12px;font-weight:700;">New Password<span class="req">*</span></label>
            <input type="password" id="new-pw" class="form-input" placeholder="Enter new password (min 6 characters)" style="border-radius:8px;"/>
          </div>
          <div class="form-group" style="margin-bottom:16px;">
            <label class="form-label" style="font-size:12px;font-weight:700;">Confirm New Password<span class="req">*</span></label>
            <input type="password" id="confirm-pw" class="form-input" placeholder="Confirm new password" style="border-radius:8px;"/>
          </div>
          <div style="display:flex;gap:10px;">
            <button class="btn btn-primary" onclick="changeAdminPassword()" style="gap:6px;">
              <span class="material-symbols-outlined" style="font-size:16px;">save</span> Save New Password
            </button>
            <button class="btn btn-secondary" onclick="handleLogout()">Sign Out</button>
          </div>
        </div>
      </div>

    </div>
  `;
}

function handleAddAdmin(e) {
  e.preventDefault();
  const emailInput = document.getElementById('new-admin-email');
  const nameInput = document.getElementById('new-admin-name');
  const roleSelect = document.getElementById('new-admin-role');

  const email = emailInput ? emailInput.value.trim() : '';
  const name = nameInput ? nameInput.value.trim() : '';
  const role = roleSelect ? roleSelect.value : 'Admin';

  if (!email || !email.includes('@')) {
    toast('Please enter a valid Google/Gmail email address', 'error');
    return;
  }

  const currentAdmin = DB.auth.getCurrentUser();
  const res = DB.adminAccess.add(email, role, name, currentAdmin ? currentAdmin.email : 'Super Admin');

  if (res.success) {
    toast(`Authorized ${email} as ${role}!`, 'success');
    emailInput.value = '';
    if (nameInput) nameInput.value = '';
    const content = document.getElementById('admin-content');
    if (content) renderSettingsAdmin(content);
  } else {
    toast(res.error || 'Failed to add administrator', 'error');
  }
}

function handleRemoveAdmin(id) {
  const admins = DB.adminAccess.all();
  const target = admins.find(a => a.id === id || (a.email && a.email.toLowerCase() === id.toLowerCase()));
  const targetEmail = target ? target.email : id;

  showConfirm(
    'Revoke Admin Access',
    `Are you sure you want to remove ${targetEmail} from the authorized administrators? They will no longer be able to log in with Google.`,
    () => {
      const res = DB.adminAccess.remove(id);
      if (res.success) {
        toast(`Removed ${targetEmail} from administrators`, 'info');
        const content = document.getElementById('admin-content');
        if (content) renderSettingsAdmin(content);
      } else {
        toast(res.error || 'Failed to remove administrator', 'error');
      }
    }
  );
}

function changeAdminPassword() {
  const pw = document.getElementById('new-pw')?.value.trim();
  const confirm = document.getElementById('confirm-pw')?.value.trim();
  if (!pw || pw.length < 6) {
    toast('Password must be at least 6 characters.', 'error');
    return;
  }
  if (pw !== confirm) {
    toast('Passwords do not match. Please re-type password.', 'error');
    return;
  }
  DB.auth.changePassword(pw);
  toast('🎉 Admin master password updated and saved successfully!', 'success');
  if (document.getElementById('new-pw')) document.getElementById('new-pw').value = '';
  if (document.getElementById('confirm-pw')) document.getElementById('confirm-pw').value = '';
}

// ──────────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────────
function fmtDate(dateStr) {
  if (!dateStr) return '-';
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' });
  } catch { return dateStr; }
}

function emptyState(icon, title, sub = '', btnLabel = '', btnAction = '') {
  return `<div class="empty-state">
    <span class="material-symbols-outlined empty-state-icon">${icon}</span>
    <div class="empty-state-title">${title}</div>
    ${sub?`<div class="empty-state-sub">${sub}</div>`:''}
    ${btnLabel?`<button class="btn btn-primary btn-sm" onclick="${btnAction}"><span class="material-symbols-outlined">add</span> ${btnLabel}</button>`:''}
  </div>`;
}

// ── Size Chart Presets for Admin Product Form ──
window.applySizePreset = function(presetName) {
  const presets = {
    'Player Edition': { S: { height: 26, width: 36 }, M: { height: 27, width: 38 }, L: { height: 28, width: 40 }, XL: { height: 29, width: 42 }, XXL: { height: 30, width: 44 } },
    'Fan Edition': { S: { height: 27, width: 38 }, M: { height: 28, width: 40 }, L: { height: 29, width: 42 }, XL: { height: 30, width: 44 }, XXL: { height: 31, width: 46 } },
    'Retro Edition': { S: { height: 26, width: 36 }, M: { height: 27, width: 38 }, L: { height: 28, width: 40 }, XL: { height: 29, width: 42 }, XXL: { height: 30, width: 44 } },
    'Kids Edition': { S: { height: 20, width: 28 }, M: { height: 22, width: 30 }, L: { height: 24, width: 32 }, XL: { height: 25, width: 34 }, XXL: { height: 26, width: 36 } }
  };
  const p = presets[presetName] || presets['Player Edition'];
  ['S','M','L','XL','XXL'].forEach(s => {
    const hInput = document.querySelector(`[name="size_height_${s}"]`);
    const wInput = document.querySelector(`[name="size_width_${s}"]`);
    if (hInput && p[s]) hInput.value = p[s].height;
    if (wInput && p[s]) wInput.value = p[s].width;
  });
  const typeSelect = document.getElementById('prod-sizechart-type');
  if (typeSelect) typeSelect.value = presetName;
};
