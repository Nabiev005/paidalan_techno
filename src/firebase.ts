import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  setPersistence, 
  browserLocalPersistence 
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAqrYDeFW511svNRtnOZBU1qGWuZ_ILZPg",
  authDomain: "paidalan.firebaseapp.com",
  projectId: "paidalan",
  storageBucket: "paidalan.appspot.com",
  messagingSenderId: "63638234806",
  appId: "1:63638234806:web:e77382f06095afc6ace817",
  measurementId: "G-X8SGH4Q2E8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

// Киргенде localStorage'да сакталсын
setPersistence(auth, browserLocalPersistence);

export const signInWithGoogle = () => signInWithPopup(auth, provider);
export const logout = () => signOut(auth);
