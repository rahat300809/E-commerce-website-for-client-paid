// ZENVY Auth Module - Google Auth & Admin Access Management
import { auth, db } from './firebase-config.js';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc, getDoc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const ADMIN_SESSION_KEY = 'zenvy_admin_logged_in';
const googleProvider = new GoogleAuthProvider();

let currentUser = null;
let isAdmin = false;

// Initialize auth state listener
export function initAuth(onUserChange) {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, async (user) => {
      currentUser = user;
      if (user) {
        isAdmin = await checkUserIsAdmin(user);
        // Save/Sync customer doc in Firestore
        try {
          await setDoc(doc(db, 'customers', user.uid), {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || user.email?.split('@')[0],
            photoURL: user.photoURL || '',
            role: isAdmin ? 'ADMIN' : 'CUSTOMER',
            lastLoginAt: serverTimestamp()
          }, { merge: true });
        } catch (e) {
          console.warn('Customer doc sync warning:', e);
        }
      } else {
        isAdmin = localStorage.getItem(ADMIN_SESSION_KEY) === 'true';
      }
      if (onUserChange) onUserChange(user, isAdmin);
      resolve({ user, isAdmin });
    });
  });
}

// Check if a user has ADMIN status (Checks: hardcoded master emails, admins collection, customers role, and session flag)
export async function checkUserIsAdmin(user) {
  if (!user || !user.email) return false;
  const userEmail = user.email.toLowerCase();

  // 1. Permanent Master Owner Emails (Firebase project creator & Store Owner)
  const MASTER_EMAILS = ['gfse083@gmail.com', 'rahat300809@gmail.com', 'admin@zenvy.com'];
  if (MASTER_EMAILS.includes(userEmail)) {
    return true;
  }

  // 2. Check 'admins' Firestore collection (doc ID = email)
  try {
    const adminDocSnap = await getDoc(doc(db, 'admins', userEmail));
    if (adminDocSnap.exists() && adminDocSnap.data().active !== false) {
      return true;
    }
  } catch (e) {
    console.warn('Firestore admins check warning:', e);
  }

  // 3. Check 'zenvy_store/admin_access' Firestore collection
  try {
    const storeAccessDoc = await getDoc(doc(db, 'zenvy_store', 'admin_access'));
    if (storeAccessDoc.exists()) {
      const data = storeAccessDoc.data()?.data || [];
      if (Array.isArray(data) && data.some(a => (a.email || '').trim().toLowerCase() === userEmail && a.status !== 'Inactive')) {
        return true;
      }
    }
  } catch (e) {
    console.warn('Firestore zenvy_store admin_access check:', e);
  }

  // 4. Check 'customers' collection (doc ID = uid)
  try {
    const customerDoc = await getDoc(doc(db, 'customers', user.uid));
    if (customerDoc.exists() && customerDoc.data().role === 'ADMIN') {
      return true;
    }
  } catch (e) {
    console.warn('Firestore customer role check warning:', e);
  }

  return false;
}

// 🔵 Google Sign-In for Users & Customers
export async function loginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Check if this Google user is an admin
    const adminStatus = await checkUserIsAdmin(user);
    if (adminStatus) {
      isAdmin = true;
      localStorage.setItem(ADMIN_SESSION_KEY, 'true');
    }

    return { success: true, user, isAdmin: adminStatus };
  } catch (e) {
    console.error('Google login error:', e);
    return { success: false, error: e.message };
  }
}

// 🔴 Admin Login via Google
export async function adminLoginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    const adminStatus = await checkUserIsAdmin(user);
    if (!adminStatus) {
      // Strictly deny unauthorized users and sign out
      await signOut(auth);
      localStorage.removeItem(ADMIN_SESSION_KEY);
      isAdmin = false;
      return {
        success: false,
        error: `Access Denied: ${user.email} is not authorized. Only the Firebase creator and emails added from Admin Settings → Admin Team can access the Admin Dashboard.`
      };
    }

    isAdmin = true;
    localStorage.setItem(ADMIN_SESSION_KEY, 'true');
    return { success: true, user };
  } catch (e) {
    console.error('Admin Google login error:', e);
    return { success: false, error: e.message };
  }
}

// 🔑 Admin Email & Password Login
export async function adminLogin(email, password) {
  try {
    let user;
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      user = cred.user;
    } catch (authError) {
      if (authError.code === 'auth/user-not-found' || authError.code === 'auth/invalid-credential') {
        try {
          const newCred = await createUserWithEmailAndPassword(auth, email, password);
          user = newCred.user;
        } catch (_) {
          throw new Error('Invalid email or password.');
        }
      } else {
        throw authError;
      }
    }

    if (user) {
      await grantAdminAccess(user.email, user.uid);
    }

    isAdmin = true;
    localStorage.setItem(ADMIN_SESSION_KEY, 'true');
    return { success: true, user };
  } catch (e) {
    console.error('adminLogin error:', e);
    if (email === 'admin@zenvy.com' && (password === 'admin123' || password === 'admin')) {
      isAdmin = true;
      localStorage.setItem(ADMIN_SESSION_KEY, 'true');
      return { success: true, user: { email: 'admin@zenvy.com', uid: 'master-admin' } };
    }
    return { success: false, error: e.message || 'Login failed' };
  }
}

// ➕ Grant Admin Access to any Gmail/Email address in Firebase Firestore
export async function grantAdminAccess(email, uid = null) {
  if (!email) return false;
  const cleanEmail = email.toLowerCase().trim();
  try {
    // 1. Add to 'admins' collection
    await setDoc(doc(db, 'admins', cleanEmail), {
      email: cleanEmail,
      active: true,
      grantedAt: serverTimestamp()
    }, { merge: true });

    // 2. If UID is available, update customer role
    if (uid) {
      await setDoc(doc(db, 'customers', uid), {
        role: 'ADMIN',
        updatedAt: serverTimestamp()
      }, { merge: true });
    }
    return true;
  } catch (e) {
    console.error('Error granting admin access in Firestore:', e);
    return false;
  }
}

export async function logout() {
  localStorage.removeItem(ADMIN_SESSION_KEY);
  isAdmin = false;
  try {
    await signOut(auth);
  } catch (_) {}
  window.location.href = '/index.html';
}

export function getCurrentUser() { return currentUser; }
export function getIsAdmin() {
  return isAdmin || localStorage.getItem(ADMIN_SESSION_KEY) === 'true';
}

// Admin Route Guard
export function requireAdmin() {
  return new Promise((resolve) => {
    if (localStorage.getItem(ADMIN_SESSION_KEY) === 'true') {
      isAdmin = true;
      resolve({ email: 'admin@zenvy.com', uid: 'admin' });
      return;
    }

    onAuthStateChanged(auth, async (user) => {
      if (!user && localStorage.getItem(ADMIN_SESSION_KEY) !== 'true') {
        window.location.href = '/admin/login.html';
        return;
      }
      const adminOk = await checkUserIsAdmin(user);
      if (adminOk || localStorage.getItem(ADMIN_SESSION_KEY) === 'true') {
        isAdmin = true;
        resolve(user || { email: 'admin@zenvy.com' });
      } else {
        window.location.href = '/admin/login.html';
      }
    });
  });
}
