import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  // ← PASTE YOUR FIREBASE CONFIG OBJECT HERE
  apiKey: "AIzaSyBibZ87K-sx4nfk4DEJ5ACRj7EJbiuJpTE",
  authDomain: "jamboree-sat.firebaseapp.com",
  projectId: "jamboree-sat",
  storageBucket: "jamboree-sat.firebasestorage.app",
  messagingSenderId: "491883601678",
  appId: "1:491883601678:web:543522ba6af313a034c15f",
  measurementId: "G-GL8WD9LC8Z"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);