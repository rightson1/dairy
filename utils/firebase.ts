import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import "firebase/messaging";
const api = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "dairy-92d71.firebaseapp.com",
  projectId: "dairy-92d71",
  storageBucket: "dairy-92d71.appspot.com",
  messagingSenderId: "1061824436145",
  appId: "1:1061824436145:web:17d9a033059778623f4f90",
};

export const app = initializeApp(firebaseConfig, {});

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
