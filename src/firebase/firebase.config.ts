import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDPcEBarYPUxYkiCIe5tiT0a_7GEuW0tKI",
  authDomain: "teller-app-92b55.firebaseapp.com",
  projectId: "teller-app-92b55",
  storageBucket: "teller-app-92b55.firebasestorage.app",
  messagingSenderId: "653029370185",
  appId: "1:653029370185:web:bf4a5a3b1ce96e7dd01298",
  measurementId: "G-FE1YK0Z2Y4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Optional: Initialize other Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
