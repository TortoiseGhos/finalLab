// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCoBgoW9bD20wgxtdBZ35LpSRXl5XM9y4o",
  authDomain: "finallab-ef389.firebaseapp.com",
  projectId: "finallab-ef389",
  storageBucket: "finallab-ef389.firebasestorage.app",
  messagingSenderId: "117075780175",
  appId: "1:117075780175:web:f170d5967d81044bf0003a",
  measurementId: "G-F7CDPNPZE2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const fs = getFirestore(app);
