// ZENVY Preorders Module
import { db } from './firebase-config.js';
import {
  collection, addDoc, updateDoc, doc, serverTimestamp,
  getDocs, getDoc, query, where, orderBy, limit, increment
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ---- Customer-facing ----

// Get all active preorder products from Firestore
export async function getPreorderProducts(limitCount = 10) {
  try {
    const q = query(
      collection(db, 'products'),
      where('status', '==', 'PREORDER'),
      where('isPublished', '==', true),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (e) {
    console.error('getPreorderProducts error:', e);
    return [];
  }
}

// Place a preorder
export async function placePreorder(orderData) {
  try {
    const preorder = {
      customerName: orderData.customerName,
      customerEmail: orderData.customerEmail,
      customerPhone: orderData.customerPhone,
      customerId: orderData.customerId || null,

      productId: orderData.productId,
      productName: orderData.productName,
      productImg: orderData.productImg || '',
      size: orderData.size || '',
      color: orderData.color || '',
      customization: orderData.customization || {},

      qty: orderData.qty || 1,
      basePrice: orderData.basePrice,
      customizationPrice: orderData.customizationPrice || 0,
      total: orderData.total,
      currency: '৳',

      shippingAddress: orderData.shippingAddress || {},
      paymentMethod: orderData.paymentMethod,
      advanceAmount: orderData.advanceAmount || 0,
      paymentStatus: orderData.advanceAmount > 0 ? 'ADVANCE_PAID' : 'PENDING',

      expectedDate: orderData.expectedDate || null,
      preorderNote: orderData.preorderNote || '',
      orderNumber: generatePreorderNumber(),

      status: 'PENDING',
      type: 'PREORDER',

      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    const ref = await addDoc(collection(db, 'orders'), preorder);

    // Decrement remaining preorder slots if applicable
    if (orderData.productId) {
      try {
        await updateDoc(doc(db, 'products', orderData.productId), {
          preorderSold: increment(orderData.qty || 1),
          updatedAt: serverTimestamp()
        });
      } catch (_) { /* non-critical */ }
    }

    return { success: true, orderId: ref.id, orderNumber: preorder.orderNumber };
  } catch (e) {
    console.error('placePreorder error:', e);
    return { success: false, error: e.message };
  }
}

// Check if a product is still accepting preorders
export async function checkPreorderAvailability(productId) {
  try {
    const snap = await getDoc(doc(db, 'products', productId));
    if (!snap.exists()) return { available: false, reason: 'Product not found' };
    const p = snap.data();
    if (p.status !== 'PREORDER') return { available: false, reason: 'Not a preorder product' };
    if (p.preorderClosingDate && p.preorderClosingDate.toDate() < new Date()) {
      return { available: false, reason: 'Preorder period has closed' };
    }
    const sold = p.preorderSold || 0;
    const max = p.preorderMaxQty || Infinity;
    if (sold >= max) return { available: false, reason: 'Preorder sold out' };
    return { available: true, remaining: max === Infinity ? null : max - sold, product: { id: snap.id, ...p } };
  } catch (e) {
    return { available: false, reason: 'Error checking availability' };
  }
}

// ---- Admin ----

export async function adminGetPreorders(statusFilter = null) {
  const constraints = [where('type', '==', 'PREORDER'), orderBy('createdAt', 'desc')];
  if (statusFilter) constraints.push(where('status', '==', statusFilter));
  const q = query(collection(db, 'orders'), ...constraints);
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function updatePreorderStatus(id, status) {
  await updateDoc(doc(db, 'orders', id), { status, updatedAt: serverTimestamp() });
}

// ---- Helpers ----

function generatePreorderNumber() {
  const date = new Date();
  const yy = date.getFullYear().toString().slice(-2);
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const rand = Math.floor(Math.random() * 9000) + 1000;
  return `ZPO-${yy}${mm}${dd}-${rand}`;
}

// Format a Firestore timestamp or ISO date string to readable BD format
export function formatExpectedDate(dateVal) {
  if (!dateVal) return 'TBA';
  let d;
  if (dateVal && typeof dateVal.toDate === 'function') {
    d = dateVal.toDate();
  } else {
    d = new Date(dateVal);
  }
  if (isNaN(d)) return 'TBA';
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

// Seed demo preorder products into Firestore (run once from admin)
export async function seedDemoPreorders() {
  const demos = [
    {
      name: 'Argentina 2026 World Cup Special Edition',
      slug: 'argentina-2026-wc-special',
      description: 'Exclusive 2026 FIFA World Cup special edition jersey. Light blue and white stripes with golden champion badge.',
      categoryId: 'national-jerseys',
      basePrice: 9500,
      preorderPrice: 8500,
      compareAtPrice: 11000,
      status: 'PREORDER',
      isPublished: true,
      isFeatured: true,
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuA1JwTdCYkkbAlMDWQnvcGsoH1_xejqEika1eBh9hKzncMJqkA-E_j9iJ4YxS_33YRwhy6hs7Ij64itm3UOWV9u5byfWZm-6GDDSxvsihpvcAOFCDxTSAgrivkSVmva0BrWhiGmrpk7SEzlV0WHlwqSp-B8UTuPmMCY6dDMgFFpET6PcIB7eHvHuvXXoimuWAUEjEBAp5CfojUli8_s-7Movyej_6NI4kcVltdm_VBh12fCnjCbo37H'],
      preorderMaxQty: 150,
      preorderSold: 38,
      expectedDeliveryDate: '2026-11-15',
      expectedShippingDate: '2026-11-10',
      preorderClosingDate: '2026-10-31',
      preorderBadge: 'PREORDER',
      preorderDescription: 'Reserve your Argentina 2026 World Cup jersey today. Limited to 150 units. Expected delivery: November 2026.',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Light Blue/White'],
      tags: ['argentina', 'world cup', '2026', 'national', 'special edition'],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    },
    {
      name: 'Barcelona x Zenvy Premium Home 2026/27',
      slug: 'barcelona-2026-27-home',
      description: 'Next-season Barcelona home jersey with innovative DryTech Pro fabric and updated crest.',
      categoryId: 'club-jerseys',
      basePrice: 8200,
      preorderPrice: 7200,
      compareAtPrice: 9500,
      status: 'PREORDER',
      isPublished: true,
      isFeatured: true,
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuCepIZHM8wJly735CyES_bkyiRjNmYVn4_r1yrpFSMZYyq9NCOW6sN9auKViuhLMz-WhQo-BpURR5DNmo6rs5xwkVrqHkjkRQqkHfAnwa4VVUuh6kMRQzVp7q6uioSOSohH1bfLavJfrg6Qmyf-mGvDzwhFYqXMH2OE_09K87jXXYpwJlzkBov5mcP7s17KAgCliJ79ao94bLYL8M6qXTASZyU8EWEqioPp2vGsfgCK9MqM3vZcWu_P'],
      preorderMaxQty: 100,
      preorderSold: 61,
      expectedDeliveryDate: '2026-09-20',
      expectedShippingDate: '2026-09-15',
      preorderClosingDate: '2026-09-01',
      preorderBadge: 'PREORDER',
      preorderDescription: 'Be first to own the 2026/27 Barça home kit. Limited preorder slots. Ships September 2026.',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Blue/Red'],
      tags: ['barcelona', 'club jersey', 'laliga', 'preorder'],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    },
    {
      name: 'Bangladesh Cricket ODI Jersey 2026',
      slug: 'bangladesh-cricket-odi-2026',
      description: 'Official Bangladesh cricket ODI jersey for the 2026 season. Green and red with tiger embroidery.',
      categoryId: 'cricket-jerseys',
      basePrice: 4500,
      preorderPrice: 3800,
      compareAtPrice: 5500,
      status: 'PREORDER',
      isPublished: true,
      isFeatured: false,
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuD3t1GmkG4f2Yo2QsqeOCXqOQpgQjsnXWWMaO2sU6VGnjZ32FCDY9d1WnMZaBDJZEkGLx4bWqB3ulfYu68fQ3bqMQMBjRAKD0JX9YLHfw62upw4tr0guup12oGHkfyv6RjbSJleZzbtB_N1JRqnJvfPuka-SFierW0EvYUZpypZS8UOEuq34oRquU9XqMv2t9N2aCdqRCYXyNgPCLUGEjleVG2B_OoRXaUayEhpOygAMti_T1BGlP5X'],
      preorderMaxQty: 200,
      preorderSold: 45,
      expectedDeliveryDate: '2026-10-05',
      expectedShippingDate: '2026-09-30',
      preorderClosingDate: '2026-09-15',
      preorderBadge: 'PREORDER',
      preorderDescription: 'Support Bangladesh Cricket! Reserve your official 2026 ODI jersey now. Deliveries from October 2026.',
      sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
      colors: ['Green/Red'],
      tags: ['bangladesh', 'cricket', 'odi', 'national', 'bcb'],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }
  ];

  for (const demo of demos) {
    await addDoc(collection(db, 'products'), demo);
  }
  console.log('✅ Demo preorder products seeded!');
}
