// ZENVY Auth Module
import { auth, db } from './firebase-config.js';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

let currentUser = null;
let isAdmin = false;

export function initAuth(onUserChange) {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, async (user) => {
      currentUser = user;
      if (user) {
        // Check if admin
        try {
          const customerDoc = await getDoc(doc(db, 'customers', user.uid));
          isAdmin = customerDoc.exists() && customerDoc.data().role === 'ADMIN';
        } catch (e) {
          isAdmin = false;
        }
      } else {
        isAdmin = false;
      }
      if (onUserChange) onUserChange(user, isAdmin);
      resolve({ user, isAdmin });
    });
  });
}

export async function adminLogin(email, password) {
  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    // Verify admin role
    const customerDoc = await getDoc(doc(db, 'customers', cred.user.uid));
    if (!customerDoc.exists() || customerDoc.data().role !== 'ADMIN') {
      await signOut(auth);
      throw new Error('You do not have admin access.');
    }
    return { success: true, user: cred.user };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

export async function logout() {
  await signOut(auth);
  window.location.href = '/admin/login.html';
}

export function getCurrentUser() { return currentUser; }
export function getIsAdmin() { return isAdmin; }

// Admin route guard — call on every admin page
export function requireAdmin() {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        window.location.href = '/admin/login.html';
        reject('Not authenticated');
        return;
      }
      try {
        const customerDoc = await getDoc(doc(db, 'customers', user.uid));
        if (!customerDoc.exists() || customerDoc.data().role !== 'ADMIN') {
          window.location.href = '/admin/login.html';
          reject('Not admin');
          return;
        }
        resolve(user);
      } catch (e) {
        window.location.href = '/admin/login.html';
        reject(e);
      }
    });
  });
}
