// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyBOd3SoRwMTih-rrC3zcuHgnLxP4omUpes",
  authDomain: "blogging-app-c72be.firebaseapp.com",
  projectId: "blogging-app-c72be",
  storageBucket: "blogging-app-c72be.appspot.com", // Ensure this is correct
  messagingSenderId: "53302743018",
  appId: "1:53302743018:web:11f40922af568b59526c93",
  measurementId: "G-N0EGWWWQ55", // Optional for Analytics
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const analytics = getAnalytics(app); // Optional: Only if Analytics is used
const auth = getAuth(app); // Authentication service
const db = getFirestore(app); // Firestore database service

// Export initialized services for use in other parts of your app
export { auth, db, analytics };
