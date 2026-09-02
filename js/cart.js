// ZENVY Cart Module
// Cart stored in localStorage, synced to Firestore for logged-in users

import { db, auth } from './firebase-config.js';
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { formatPrice } from './brand.js';

const CART_KEY = 'zenvy_cart';

let cart = [];

export function initCart() {
  cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
  updateCartUI();
  return cart;
}

export function getCart() {
  return cart;
}

export function addToCart(item) {
  // item: { id, name, price, img, size, color, sleeve, customization, customizationPrice, qty }
  const key = getCartKey(item);
  const existing = cart.find(i => getCartKey(i) === key);
  if (existing) {
    existing.qty = (existing.qty || 1) + (item.qty || 1);
  } else {
    cart.push({
      ...item,
      qty: item.qty || 1,
      addedAt: Date.now()
    });
  }
  saveCart();
  updateCartUI();
  return true;
}

export function removeFromCart(key) {
  cart = cart.filter(i => getCartKey(i) !== key);
  saveCart();
  updateCartUI();
}

export function changeQty(key, delta) {
  const item = cart.find(i => getCartKey(i) === key);
  if (item) {
    item.qty = Math.max(1, (item.qty || 1) + delta);
    saveCart();
    updateCartUI();
  }
}

export function clearCart() {
  cart = [];
  saveCart();
  updateCartUI();
}

export function getCartTotal() {
  return cart.reduce((sum, item) => {
    const itemTotal = ((item.price || 0) + (item.customizationPrice || 0)) * (item.qty || 1);
    return sum + itemTotal;
  }, 0);
}

export function getCartCount() {
  return cart.reduce((sum, item) => sum + (item.qty || 1), 0);
}

function getCartKey(item) {
  // Unique key based on product + all variant selections + customization
  return `${item.id}|${item.size || ''}|${item.color || ''}|${item.sleeve || ''}|${JSON.stringify(item.customization || {})}`;
}

function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function updateCartUI() {
  // Update count badge
  const count = getCartCount();
  document.querySelectorAll('#cart-count').forEach(badge => {
    if (count > 0) {
      badge.textContent = count;
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  });
}

export function renderCartDrawer() {
  const list = document.getElementById('cart-list');
  const empty = document.getElementById('cart-empty');
  const footer = document.getElementById('cart-footer');
  const subtotalEl = document.getElementById('cart-subtotal');

  if (!list) return;

  if (cart.length === 0) {
    list.classList.add('hidden');
    if (empty) empty.classList.remove('hidden');
    if (footer) footer.classList.add('hidden');
  } else {
    if (empty) empty.classList.add('hidden');
    list.classList.remove('hidden');
    if (footer) footer.classList.remove('hidden');

    list.innerHTML = cart.map(item => {
      const key = getCartKey(item);
      const itemPrice = ((item.price || 0) + (item.customizationPrice || 0)) * (item.qty || 1);
      const customLines = [];
      if (item.size) customLines.push(`Size: ${item.size}`);
      if (item.color) customLines.push(`Color: ${item.color}`);
      if (item.sleeve) customLines.push(`Sleeve: ${item.sleeve}`);
      if (item.customization?.name) customLines.push(`Name: ${item.customization.name}`);
      if (item.customization?.number) customLines.push(`No: ${item.customization.number}`);
      if (item.customization?.patch) customLines.push(`Patch: ${item.customization.patch}`);

      return `
        <div class="flex gap-4 py-4 border-b border-outline-variant">
          <div class="w-20 h-20 rounded-lg bg-surface-container-low flex-shrink-0 overflow-hidden">
            <img src="${item.img || ''}" alt="${item.name}" class="w-full h-full object-cover" onerror="this.style.display='none'"/>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex justify-between items-start mb-1">
              <span class="font-headline-md text-[15px] text-primary truncate pr-2">${item.name}</span>
              <button onclick="window.zenvyCart.removeFromCart('${CSS.escape(key)}')" class="text-on-surface-variant hover:text-error ml-2 flex-shrink-0">
                <span class="material-symbols-outlined text-base">close</span>
              </button>
            </div>
            ${customLines.length ? `<p class="font-caption text-caption text-on-surface-variant mb-2">${customLines.join(' · ')}</p>` : ''}
            <div class="flex justify-between items-center">
              <div class="flex items-center">
                <button class="qty-btn" onclick="window.zenvyCart.changeQty('${CSS.escape(key)}', -1)">−</button>
                <span class="qty-input font-label-md">${item.qty || 1}</span>
                <button class="qty-btn" onclick="window.zenvyCart.changeQty('${CSS.escape(key)}', 1)">+</button>
              </div>
              <span class="font-label-md text-label-md font-bold text-primary">${formatPrice(itemPrice)}</span>
            </div>
          </div>
        </div>`;
    }).join('');

    if (subtotalEl) subtotalEl.textContent = formatPrice(getCartTotal());
  }
}

// Expose to global for inline onclick handlers
window.zenvyCart = { removeFromCart, changeQty };
