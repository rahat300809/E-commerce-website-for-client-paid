// wishlist.js - Centralized Wishlist System for ZENVY E-Commerce
(function() {
  function getWishlist() {
    try {
      return JSON.parse(localStorage.getItem('zenvy_wishlist') || '[]');
    } catch(e) {
      return [];
    }
  }

  function saveWishlist(list) {
    try {
      localStorage.setItem('zenvy_wishlist', JSON.stringify(list));
    } catch(e) {}
    updateWishlistBadges();
    syncWishlistHeartButtons();
    renderWishlistDrawer();
    try {
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new CustomEvent('zenvy-wishlist-updated', { detail: { list } }));
    } catch(e) {}
  }

  function toggleWishlist(productOrName, price, image, category) {
    let item = null;
    if (typeof productOrName === 'object' && productOrName !== null) {
      item = {
        id: productOrName.id || ('wish_' + Date.now()),
        name: productOrName.name || productOrName.title || 'ZENVY Jersey',
        price: productOrName.salePrice || productOrName.basePrice || productOrName.price || 1450,
        image: (productOrName.images && productOrName.images[0]?.url) || productOrName.image || 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&q=80',
        category: productOrName.categoryName || productOrName.category || "Men's Football"
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

    const list = getWishlist();
    const index = list.findIndex(x => (x.id && String(x.id) === String(item.id)) || (x.name && x.name.toLowerCase() === item.name.toLowerCase()));

    if (index > -1) {
      list.splice(index, 1);
      saveWishlist(list);
      showWishlistToast(`Removed "${item.name}" from Wishlist`);
      return false; // removed
    } else {
      list.push(item);
      saveWishlist(list);
      showWishlistToast(`Saved "${item.name}" to your Wishlist ❤️`);
      return true; // added
    }
  }

  function updateWishlistBadges() {
    const list = getWishlist();
    const count = list.length;
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

    document.querySelectorAll('.favourite-btn, [data-wishlist-name], [data-wishlist-id], #product-wishlist-toggle-btn').forEach(btn => {
      const bName = (btn.getAttribute('data-wishlist-name') || '').toLowerCase();
      const bId = String(btn.getAttribute('data-wishlist-id') || '');
      let isFav = false;
      if (bId && ids.includes(bId)) isFav = true;
      if (bName && names.includes(bName)) isFav = true;

      // Special check for product page
      if (btn.id === 'product-wishlist-toggle-btn') {
        const pTitle = document.getElementById('pd-title')?.textContent?.trim().toLowerCase();
        if (pTitle && names.includes(pTitle)) isFav = true;
      }

      const icon = btn.querySelector('.material-symbols-outlined') || btn;
      if (isFav) {
        icon.classList.add('text-red-500', 'fill-1');
        icon.classList.remove('text-gray-400', 'text-gray-500', 'text-gray-700');
        if (btn.tagName === 'BUTTON') {
          btn.classList.add('border-red-300', 'bg-red-50/50');
        }
      } else {
        icon.classList.remove('text-red-500', 'fill-1');
        icon.classList.add('text-gray-400');
        if (btn.tagName === 'BUTTON') {
          btn.classList.remove('border-red-300', 'bg-red-50/50');
        }
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
          <a href="index.html#shop" onclick="toggleWishlistModal(false)" class="inline-block mt-4 px-5 py-2.5 bg-black text-white rounded-full text-xs font-bold hover:bg-neutral-800 transition-all cursor-pointer">
            Explore Jerseys
          </a>
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
            <button onclick="addWishlistItemToCart(${idx})" class="text-[11px] font-bold text-blue-900 hover:text-black flex items-center gap-1 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-full transition-colors cursor-pointer">
              <span class="material-symbols-outlined text-[14px]">add_shopping_cart</span> Add to Bag
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  function removeWishlistItem(idx) {
    const list = getWishlist();
    if (idx >= 0 && idx < list.length) {
      const removed = list.splice(idx, 1)[0];
      saveWishlist(list);
      showWishlistToast(`Removed "${removed.name}" from Wishlist`);
    }
  }

  function clearWishlist() {
    if (confirm('Are you sure you want to clear your wishlist?')) {
      saveWishlist([]);
      showWishlistToast('Wishlist cleared');
    }
  }

  function addWishlistItemToCart(idx) {
    const list = getWishlist();
    const item = list[idx];
    if (!item) return;

    try {
      const currentCart = JSON.parse(localStorage.getItem('zenvy_cart') || '[]');
      const existing = currentCart.find(i => (i.productId === item.id || i.name === item.name) && i.details === 'Size: M • Half Sleeve');
      if (existing) {
        existing.qty = (existing.qty || 1) + 1;
      } else {
        currentCart.push({
          id: 'cart_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
          productId: item.id,
          name: item.name,
          title: item.name,
          price: item.price,
          image: item.image,
          details: 'Size: M • Half Sleeve',
          qty: 1
        });
      }
      localStorage.setItem('zenvy_cart', JSON.stringify(currentCart));
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new CustomEvent('zenvy-store-updated'));
    } catch(e) {}

    showWishlistToast(`Added "${item.name}" to Bag!`);
    if (typeof window.toggleCartDrawer === 'function') {
      window.toggleCartDrawer(true);
    } else if (typeof window.toggleCart === 'function') {
      window.toggleCart(true);
    } else if (typeof window.openCart === 'function') {
      window.openCart();
    }
  }

  function addAllWishlistToCart() {
    const list = getWishlist();
    if (list.length === 0) return;

    try {
      const currentCart = JSON.parse(localStorage.getItem('zenvy_cart') || '[]');
      list.forEach(item => {
        currentCart.push({
          id: 'cart_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
          productId: item.id,
          name: item.name,
          title: item.name,
          price: item.price,
          image: item.image,
          details: 'Size: M • Half Sleeve',
          qty: 1
        });
      });
      localStorage.setItem('zenvy_cart', JSON.stringify(currentCart));
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new CustomEvent('zenvy-store-updated'));
    } catch(e) {}

    showWishlistToast(`Added all ${list.length} item(s) to Bag!`);
    toggleWishlistModal(false);
    if (typeof window.toggleCartDrawer === 'function') {
      window.toggleCartDrawer(true);
    } else if (typeof window.toggleCart === 'function') {
      window.toggleCart(true);
    } else if (typeof window.openCart === 'function') {
      window.openCart();
    }
  }

  function showWishlistToast(msg) {
    if (typeof window.showToast === 'function') {
      window.showToast(msg);
      return;
    }
    let toast = document.getElementById('wishlist-toast-pill');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'wishlist-toast-pill';
      toast.className = 'fixed bottom-8 left-1/2 -translate-x-1/2 z-[999] bg-black text-white px-5 py-3 rounded-full text-xs font-bold shadow-2xl flex items-center gap-2 transition-all duration-300 pointer-events-none opacity-0 translate-y-4';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<span class="material-symbols-outlined text-red-500 fill-1 text-base">favorite</span> <span>${msg}</span>`;
    toast.classList.remove('opacity-0', 'translate-y-4');
    toast.classList.add('opacity-100', 'translate-y-0');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.classList.remove('opacity-100', 'translate-y-0');
      toast.classList.add('opacity-0', 'translate-y-4');
    }, 2500);
  }

  // Export to window
  window.getWishlist = getWishlist;
  window.saveWishlist = saveWishlist;
  window.toggleWishlist = toggleWishlist;
  window.updateWishlistBadges = updateWishlistBadges;
  window.syncWishlistHeartButtons = syncWishlistHeartButtons;
  window.toggleWishlistModal = toggleWishlistModal;
  window.renderWishlistDrawer = renderWishlistDrawer;
  window.removeWishlistItem = removeWishlistItem;
  window.clearWishlist = clearWishlist;
  window.addWishlistItemToCart = addWishlistItemToCart;
  window.addAllWishlistToCart = addAllWishlistToCart;

  document.addEventListener('DOMContentLoaded', () => {
    updateWishlistBadges();
    syncWishlistHeartButtons();
  });
  window.addEventListener('storage', () => {
    updateWishlistBadges();
    syncWishlistHeartButtons();
    renderWishlistDrawer();
  });
})();
