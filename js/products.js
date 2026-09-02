// ZENVY Products Data Layer
import { db } from './firebase-config.js';
import {
  collection, doc, getDocs, getDoc, query, where, orderBy, limit,
  addDoc, updateDoc, deleteDoc, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Fetch all published products
export async function getProducts(filters = {}) {
  try {
    let q = collection(db, 'products');
    const constraints = [where('isPublished', '==', true)];

    if (filters.categoryId) constraints.push(where('categoryId', '==', filters.categoryId));
    if (filters.isFeatured) constraints.push(where('isFeatured', '==', true));
    if (filters.isBestseller) constraints.push(where('isBestseller', '==', true));
    if (filters.isNewArrival) constraints.push(where('isNewArrival', '==', true));
    if (filters.status) constraints.push(where('status', '==', filters.status));

    constraints.push(orderBy('createdAt', 'desc'));
    if (filters.limit) constraints.push(limit(filters.limit));

    q = query(q, ...constraints);
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (e) {
    console.error('getProducts error:', e);
    return [];
  }
}

// Fetch single product by ID
export async function getProduct(id) {
  try {
    const snap = await getDoc(doc(db, 'products', id));
    if (!snap.exists()) return null;
    const product = { id: snap.id, ...snap.data() };
    // Load variants
    const variantsSnap = await getDocs(collection(db, 'products', id, 'variants'));
    product.variants = variantsSnap.docs.map(v => ({ id: v.id, ...v.data() }));
    return product;
  } catch (e) {
    console.error('getProduct error:', e);
    return null;
  }
}

// Fetch all categories
export async function getCategories(onlyActive = true) {
  try {
    let q = collection(db, 'categories');
    if (onlyActive) q = query(q, where('isActive', '==', true), orderBy('displayOrder', 'asc'));
    else q = query(q, orderBy('displayOrder', 'asc'));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (e) {
    console.error('getCategories error:', e);
    return [];
  }
}

// Fetch banners
export async function getBanners() {
  try {
    const now = new Date();
    const q = query(
      collection(db, 'banners'),
      where('isPublished', '==', true),
      orderBy('displayOrder', 'asc')
    );
    const snap = await getDocs(q);
    return snap.docs
      .map(d => ({ id: d.id, ...d.data() }))
      .filter(b => {
        if (b.startDate && b.startDate.toDate() > now) return false;
        if (b.endDate && b.endDate.toDate() < now) return false;
        return true;
      });
  } catch (e) {
    console.error('getBanners error:', e);
    return [];
  }
}

// Fetch customization options
export async function getCustomizationOptions(type = null) {
  try {
    let q = collection(db, 'customizationOptions');
    if (type) {
      q = query(q, where('type', '==', type), where('isEnabled', '==', true), orderBy('displayOrder', 'asc'));
    } else {
      q = query(q, where('isEnabled', '==', true), orderBy('displayOrder', 'asc'));
    }
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (e) {
    console.error('getCustomizationOptions error:', e);
    return [];
  }
}

// Search products
export async function searchProducts(searchTerm) {
  try {
    // Firestore doesn't support full-text search natively
    // We'll load all products and filter client-side (works for small catalogues)
    const snap = await getDocs(query(
      collection(db, 'products'),
      where('isPublished', '==', true)
    ));
    const term = searchTerm.toLowerCase();
    return snap.docs
      .map(d => ({ id: d.id, ...d.data() }))
      .filter(p =>
        (p.name || '').toLowerCase().includes(term) ||
        (p.description || '').toLowerCase().includes(term) ||
        (p.tags || []).some(t => t.toLowerCase().includes(term)) ||
        (p.sku || '').toLowerCase().includes(term)
      );
  } catch (e) {
    console.error('searchProducts error:', e);
    return [];
  }
}

// Admin: Get ALL products (including unpublished)
export async function adminGetProducts() {
  const snap = await getDocs(query(collection(db, 'products'), orderBy('createdAt', 'desc')));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function adminSaveProduct(id, data) {
  if (id) {
    await updateDoc(doc(db, 'products', id), { ...data, updatedAt: serverTimestamp() });
    return id;
  } else {
    const ref = await addDoc(collection(db, 'products'), { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
    return ref.id;
  }
}

export async function adminDeleteProduct(id) {
  await deleteDoc(doc(db, 'products', id));
}

export async function adminGetCategories() {
  const snap = await getDocs(query(collection(db, 'categories'), orderBy('displayOrder', 'asc')));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function adminSaveCategory(id, data) {
  if (id) {
    await updateDoc(doc(db, 'categories', id), { ...data, updatedAt: serverTimestamp() });
    return id;
  } else {
    const ref = await addDoc(collection(db, 'categories'), { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
    return ref.id;
  }
}

export async function adminDeleteCategory(id) {
  await deleteDoc(doc(db, 'categories', id));
}
