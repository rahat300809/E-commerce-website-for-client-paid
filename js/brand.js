// ZENVY Brand & Settings Loader
// Loads brand settings from Firestore and applies them to the page

import { db } from './firebase-config.js';
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Default brand settings (used if Firestore doesn't have data yet)
const DEFAULT_BRAND = {
  brandName: 'ZENVY',
  tagline: 'Premium Sportswear. Your Game. Your Style.',
  description: 'Premium sportswear and custom jerseys for football, cricket, basketball and more. Crafted for champions.',
  logoUrl: '',
  faviconUrl: '',
  contactEmail: 'hello@zenvy.com.bd',
  phone: '+880 1700-000000',
  address: 'Dhaka, Bangladesh',
  social: { instagram: '#', facebook: '#', youtube: '#', tiktok: '#' },
  currency: 'BDT',
  currencySymbol: '৳',
  freeShippingThreshold: 3000,
  standardShipping: 80,
  expressShipping: 150
};

let brandSettings = null;

export async function loadBrandSettings() {
  try {
    const docRef = doc(db, 'brandSettings', 'main');
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      brandSettings = { ...DEFAULT_BRAND, ...snap.data() };
    } else {
      // Initialize with defaults
      await setDoc(docRef, DEFAULT_BRAND);
      brandSettings = { ...DEFAULT_BRAND };
    }
  } catch (e) {
    console.warn('Could not load brand settings, using defaults:', e);
    brandSettings = { ...DEFAULT_BRAND };
  }
  applyBrandToPage(brandSettings);
  return brandSettings;
}

export function getBrand() {
  return brandSettings || DEFAULT_BRAND;
}

function applyBrandToPage(brand) {
  // Update page title
  const currentTitle = document.title;
  if (currentTitle.includes('Apex Elite') || currentTitle.includes('ZENVY') || !currentTitle) {
    // Keep page-specific part if present
  }

  // Update all brand name elements
  document.querySelectorAll('[data-brand-name]').forEach(el => {
    el.textContent = brand.brandName;
  });

  // Update logos (img elements with data-brand-logo)
  document.querySelectorAll('[data-brand-logo]').forEach(el => {
    if (brand.logoUrl) {
      el.src = brand.logoUrl;
      el.style.display = 'block';
      // Hide text logo sibling if present
      const textSibling = el.parentElement?.querySelector('[data-brand-name-text]');
      if (textSibling) textSibling.style.display = 'none';
    }
  });

  // Update text logos (links with brand name text)
  document.querySelectorAll('[data-brand-name-text]').forEach(el => {
    el.textContent = brand.brandName;
    if (brand.logoUrl) {
      el.style.display = 'none';
    }
  });

  // Update favicon
  if (brand.faviconUrl) {
    let favicon = document.querySelector("link[rel='icon']");
    if (!favicon) {
      favicon = document.createElement('link');
      favicon.rel = 'icon';
      document.head.appendChild(favicon);
    }
    favicon.href = brand.faviconUrl;
  }

  // Update tagline elements
  document.querySelectorAll('[data-brand-tagline]').forEach(el => {
    el.textContent = brand.tagline;
  });

  // Update social links
  document.querySelectorAll('[data-social-instagram]').forEach(el => el.href = brand.social?.instagram || '#');
  document.querySelectorAll('[data-social-facebook]').forEach(el => el.href = brand.social?.facebook || '#');
  document.querySelectorAll('[data-social-youtube]').forEach(el => el.href = brand.social?.youtube || '#');
  document.querySelectorAll('[data-social-tiktok]').forEach(el => el.href = brand.social?.tiktok || '#');
}

export function formatPrice(amount) {
  const brand = getBrand();
  return `${brand.currencySymbol} ${Number(amount).toLocaleString('en-BD')}`;
}
