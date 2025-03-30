import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import firebaseConfig from './config.json'

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Optional: Initialize other Firebase services
const auth = getAuth(app);
const database = getDatabase(app);

export { app, auth, ref, set, database };
