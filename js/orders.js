// ZENVY Orders Module
import { db } from './firebase-config.js';
import {
  collection, addDoc, updateDoc, doc, serverTimestamp, getDoc, getDocs, query, orderBy, where
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getBrand } from './brand.js';

// Create a new order from cart
export async function createOrder(orderData) {
  const brand = getBrand();
  try {
    const order = {
      // Customer
      customerName: orderData.customerName,
      customerEmail: orderData.customerEmail,
      customerPhone: orderData.customerPhone,
      customerId: orderData.customerId || null,

      // Items
      items: orderData.items.map(item => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        customizationPrice: item.customizationPrice || 0,
        img: item.img || '',
        qty: item.qty,
        size: item.size || '',
        color: item.color || '',
        sleeve: item.sleeve || '',
        customization: item.customization || {}
      })),

      // Shipping
      shippingAddress: orderData.shippingAddress,
      shippingMethod: orderData.shippingMethod || 'standard',
      shippingCost: orderData.shippingCost || 0,

      // Pricing
      subtotal: orderData.subtotal,
      couponCode: orderData.couponCode || null,
      discount: orderData.discount || 0,
      total: orderData.total,
      currency: brand.currencySymbol,

      // Payment
      paymentMethod: orderData.paymentMethod || 'Cash on Delivery',
      paymentTrxId: orderData.paymentTrxId || orderData.trxId || '',
      paymentSenderPhone: orderData.paymentSenderPhone || '',
      paymentRemark: orderData.paymentRemark || (orderData.paymentTrxId ? `${orderData.paymentMethod} TrxID: ${orderData.paymentTrxId}${orderData.paymentSenderPhone ? ' (Sender: ' + orderData.paymentSenderPhone + ')' : ''}` : ''),
      paymentStatus: orderData.paymentStatus || (orderData.paymentTrxId ? 'PAID_VERIFYING' : (orderData.paymentMethod === 'bkash_advance' ? 'PENDING_PAYMENT' : 'PENDING')),
      advancePayment: orderData.advancePayment || orderData.paidAmount || 0,
      paidAmount: orderData.paidAmount || (orderData.paymentTrxId ? (orderData.paidAmount || orderData.total || 0) : 0),
      dueAmount: orderData.dueAmount !== undefined ? orderData.dueAmount : (orderData.total || 0),

      // Order status
      status: 'PENDING',
      type: orderData.isPreorder ? 'PREORDER' : 'REGULAR',
      expectedDate: orderData.expectedDate || null,

      // Meta
      notes: orderData.notes || '',
      orderNumber: generateOrderNumber(),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    const ref = await addDoc(collection(db, 'orders'), order);

    try {
      const existingDbOrders = JSON.parse(localStorage.getItem('zenvy_db_orders') || '[]');
      const localOrderObj = {
        id: ref.id,
        orderNumber: order.orderNumber,
        customerName: order.customerName,
        customerPhone: order.customerPhone,
        customerEmail: order.customerEmail,
        shippingAddress: order.shippingAddress,
        items: order.items,
        totalAmount: order.total,
        subtotal: order.subtotal,
        paymentMethod: order.paymentMethod,
        paymentTrxId: order.paymentTrxId,
        paymentSenderPhone: order.paymentSenderPhone,
        paymentRemark: order.paymentRemark,
        paymentStatus: order.paymentStatus,
        paidAmount: order.paidAmount,
        dueAmount: order.dueAmount,
        status: order.status,
        createdAt: new Date().toISOString()
      };
      existingDbOrders.unshift(localOrderObj);
      localStorage.setItem('zenvy_db_orders', JSON.stringify(existingDbOrders));
    } catch (cacheErr) {
      console.warn('Local cache order sync error:', cacheErr);
    }

    return { success: true, orderId: ref.id, orderNumber: order.orderNumber };
  } catch (e) {
    console.error('createOrder error:', e);
    return { success: false, error: e.message };
  }
}

function generateOrderNumber() {
  const date = new Date();
  const yy = date.getFullYear().toString().slice(-2);
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const rand = Math.floor(Math.random() * 9000) + 1000;
  return `ZNV-${yy}${mm}${dd}-${rand}`;
}

export async function getOrder(id) {
  const snap = await getDoc(doc(db, 'orders', id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

export async function updateOrderStatus(id, status) {
  await updateDoc(doc(db, 'orders', id), {
    status,
    updatedAt: serverTimestamp()
  });
}

// Admin: get all orders
export async function adminGetOrders(statusFilter = null) {
  const constraints = [orderBy('createdAt', 'desc')];
  if (statusFilter) constraints.push(where('status', '==', statusFilter));
  const q = query(collection(db, 'orders'), ...constraints);
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

// Validate coupon
export async function validateCoupon(code, cartTotal) {
  try {
    const q = query(collection(db, 'coupons'), where('code', '==', code.toUpperCase()), where('isActive', '==', true));
    const snap = await getDocs(q);
    if (snap.empty) return { valid: false, error: 'Invalid coupon code' };

    const coupon = { id: snap.docs[0].id, ...snap.docs[0].data() };
    const now = new Date();

    if (coupon.startDate && coupon.startDate.toDate() > now) return { valid: false, error: 'Coupon not yet active' };
    if (coupon.endDate && coupon.endDate.toDate() < now) return { valid: false, error: 'Coupon has expired' };
    if (coupon.minOrder && cartTotal < coupon.minOrder) return { valid: false, error: `Minimum order ৳${coupon.minOrder.toLocaleString()} required` };
    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) return { valid: false, error: 'Coupon usage limit reached' };

    let discount = 0;
    if (coupon.type === 'PERCENTAGE') {
      discount = (cartTotal * coupon.value) / 100;
      if (coupon.maxDiscount) discount = Math.min(discount, coupon.maxDiscount);
    } else if (coupon.type === 'FIXED') {
      discount = coupon.value;
    } else if (coupon.type === 'FREE_SHIPPING') {
      discount = 0; // handled separately
    }

    return { valid: true, coupon, discount, freeShipping: coupon.type === 'FREE_SHIPPING' };
  } catch (e) {
    return { valid: false, error: 'Error validating coupon' };
  }
}
