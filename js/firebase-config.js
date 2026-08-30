// Firebase configuration for ZENVY
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyDXvVBkR0tFdqoQJfTOnApz2eDuu9YBRZ0",
  authDomain: "zenvy-storebd.firebaseapp.com",
  projectId: "zenvy-storebd",
  storageBucket: "zenvy-storebd.firebasestorage.app",
  messagingSenderId: "353374404315",
  appId: "1:353374404315:web:ca8a6592a016e4960096fe",
  measurementId: "G-69FXB715MZ"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);
export default app;
