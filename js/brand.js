// ZENVY Brand & Settings Loader
// Loads brand settings from Firestore and enforces ZENVY branding
import { db } from './firebase-config.js';
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const DEFAULT_BRAND = {
  brandName: 'ZENVY',
  tagline: 'Premium Sportswear & Custom Jerseys',
  description: 'Premium sportswear and custom jerseys for football, cricket, basketball and more. Crafted for champions.',
  logoUrl: '',
  faviconUrl: '',
  contactEmail: 'support@zenvy.com',
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
      const data = snap.data();
      // Ensure legacy "APEX ELITE" name is replaced with ZENVY
      if (!data.brandName || data.brandName.includes('APEX') || data.brandName.includes('Apex')) {
        data.brandName = 'ZENVY';
        await setDoc(docRef, { brandName: 'ZENVY' }, { merge: true });
      }
      brandSettings = { ...DEFAULT_BRAND, ...data, brandName: 'ZENVY' };
    } else {
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
  // Update all brand name elements
  document.querySelectorAll('[data-brand-name], [data-brand-name-text]').forEach(el => {
    el.textContent = 'ZENVY';
  });

  // Update document title if it contains Apex Elite
  if (document.title.includes('Apex Elite') || document.title.includes('APEX ELITE')) {
    document.title = document.title.replace(/Apex Elite/g, 'ZENVY').replace(/APEX ELITE/g, 'ZENVY');
  }

  // Update tagline elements
  document.querySelectorAll('[data-brand-tagline]').forEach(el => {
    el.textContent = brand.tagline;
  });
}

export function formatPrice(amount) {
  const brand = getBrand();
  return `${brand.currencySymbol} ${Number(amount).toLocaleString('en-BD')}`;
}
