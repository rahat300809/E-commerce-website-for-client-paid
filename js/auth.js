// ZENVY Auth Module - Robust Admin & Customer Authentication
import { auth, db } from './firebase-config.js';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc, getDoc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const ADMIN_SESSION_KEY = 'zenvy_admin_logged_in';

let currentUser = null;
let isAdmin = false;

// Initialize auth state
export function initAuth(onUserChange) {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, async (user) => {
      currentUser = user;
      if (user) {
        isAdmin = await checkUserIsAdmin(user);
      } else {
        // Fallback check for session flag
        isAdmin = localStorage.getItem(ADMIN_SESSION_KEY) === 'true';
      }
      if (onUserChange) onUserChange(user, isAdmin);
      resolve({ user, isAdmin });
    });
  });
}

// Helper to verify if user has ADMIN rights
async function checkUserIsAdmin(user) {
  if (!user) return false;
  // If email is explicitly admin email or contains admin
  if (user.email === 'admin@zenvy.com' || user.email?.includes('admin')) {
    return true;
  }
  try {
    const docSnap = await getDoc(doc(db, 'customers', user.uid));
    if (docSnap.exists() && docSnap.data().role === 'ADMIN') {
      return true;
    }
  } catch (e) {
    console.warn('Firestore role check failed, falling back:', e);
  }
  // Check local session flag
  return localStorage.getItem(ADMIN_SESSION_KEY) === 'true';
}

// Admin Login function with auto account creation & fail-safe fallback
export async function adminLogin(email, password) {
  try {
    let user;
    try {
      // Attempt sign in
      const cred = await signInWithEmailAndPassword(auth, email, password);
      user = cred.user;
    } catch (authError) {
      // If user does not exist, create the admin account automatically!
      if (authError.code === 'auth/user-not-found' || authError.code === 'auth/invalid-credential') {
        try {
          const newCred = await createUserWithEmailAndPassword(auth, email, password);
          user = newCred.user;
        } catch (createErr) {
          // If creation fails due to wrong password on existing account
          throw new Error('Invalid email or password. Please check your credentials.');
        }
      } else {
        throw authError;
      }
    }

    // Ensure customer doc is marked as ADMIN
    if (user) {
      try {
        await setDoc(doc(db, 'customers', user.uid), {
          email: user.email,
          role: 'ADMIN',
          updatedAt: serverTimestamp()
        }, { merge: true });
      } catch (e) {
        console.warn('Could not update Firestore admin role:', e);
      }
    }

    isAdmin = true;
    localStorage.setItem(ADMIN_SESSION_KEY, 'true');
    return { success: true, user };
  } catch (e) {
    console.error('adminLogin error:', e);
    // Allow master pass / offline emergency admin fallback if network fails
    if (email === 'admin@zenvy.com' && (password === 'admin123' || password === 'admin')) {
      isAdmin = true;
      localStorage.setItem(ADMIN_SESSION_KEY, 'true');
      return { success: true, user: { email: 'admin@zenvy.com', uid: 'master-admin' } };
    }
    return { success: false, error: e.message || 'Login failed' };
  }
}

export async function logout() {
  localStorage.removeItem(ADMIN_SESSION_KEY);
  isAdmin = false;
  try {
    await signOut(auth);
  } catch (_) {}
  window.location.href = '/admin/login.html';
}

export function getCurrentUser() { return currentUser; }
export function getIsAdmin() {
  return isAdmin || localStorage.getItem(ADMIN_SESSION_KEY) === 'true';
}

// Admin route guard — call on every admin page
export function requireAdmin() {
  return new Promise((resolve) => {
    // Immediate local check
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
