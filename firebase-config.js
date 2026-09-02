// ZENVY Firebase Configuration
// NOTE: Firebase is initialized via the compat SDK scripts loaded in each HTML file:
//   <script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js">
//   <script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-auth-compat.js">
//   <script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore-compat.js">
//
// The actual firebase.initializeApp() call is done in firebase-sync.js (IIFE).
// This file was previously using ES module imports (import { initializeApp } ...) which
// caused a SyntaxError when loaded as a classic script. It has been replaced by the
// firebase-sync.js IIFE initialization which is the real initialization path.
//
// This file is kept for reference only and is NOT loaded by any HTML page.

const ZENVY_FIREBASE_CONFIG = {
  apiKey: "AIzaSyDXvVBkR0tFdqoQJfTOnApz2eDuu9YBRZ0",
  authDomain: "zenvy-storebd.firebaseapp.com",
  projectId: "zenvy-storebd",
  storageBucket: "zenvy-storebd.firebasestorage.app",
  messagingSenderId: "353374404315",
  appId: "1:353374404315:web:ca8a6592a016e4960096fe",
  measurementId: "G-69FXB715MZ"
};
